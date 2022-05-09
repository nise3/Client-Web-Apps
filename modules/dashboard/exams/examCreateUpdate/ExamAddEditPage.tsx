import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import yup from '../../../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {processServerSideErrors} from '../../../../@softbd/utilities/validationErrorHandler';
import PageBlock from '../../../../@softbd/utilities/PageBlock';
import IconExam from '../../../../@softbd/icons/IconExam';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import Grid from '@mui/material/Grid';
import CustomTextInput from '../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomFormSelect from '../../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {ExamTypes, QuestionSelectionType} from '../ExamEnums';
import {Button} from '@mui/material';
import {
  useFetchCourses,
  useFetchExam,
  useFetchSubjects,
  useFetchTrainingCentersWithBatches,
} from '../../../../services/instituteManagement/hooks';
import CustomFilterableFormSelect from '../../../../@softbd/elements/input/CustomFilterableFormSelect';
import RowStatus from '../../../../@softbd/utilities/RowStatus';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import FormRowStatus from '../../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import {
  createExam,
  updateExam,
} from '../../../../services/instituteManagement/ExamService';
import useSuccessMessage from '../../../../@softbd/hooks/useSuccessMessage';
import OnlineExam from './onlineExam';
import OffLineExam from './offLineExam';
import {ArrowBack} from '@mui/icons-material';
import {useRouter} from 'next/router';
import _, {cloneDeep} from 'lodash';
import {ExamPurposeNames} from '../../../../@softbd/utilities/ExamPurposeNames';
import {questionTypesArray} from '../../questionsBank/QuestionBanksEnums';

interface ExamAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const ExamAddEditPage: FC<ExamAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const router = useRouter();
  const examId = Number(router.query.id);

  const [examParams] = useState<any>({
    purpose_name: ExamPurposeNames.BATCH,
  });
  const {
    data: itemData,
    isLoading: isLoadingExam,
    mutate: mutateExam,
  } = useFetchExam(examId, examParams);

  const [subjectFilters] = useState({});
  const {data: subjects, isLoading: isLoadingSubjects} =
    useFetchSubjects(subjectFilters);

  const [courseFilters] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: courses, isLoading: isLoadingCourse} =
    useFetchCourses(courseFilters);

  const [examType, setExamType] = useState<number | null>(null);
  const [batches, setBatches] = useState<Array<any>>([]);
  const [subjectId, setSubjectId] = useState<any>(null);

  const [courseId, setCourseId] = useState<any>(null);
  const {data: trainingCenters, isLoading: isTrainingCentersLoading} =
    useFetchTrainingCentersWithBatches(courseId);

  const examQuestionsSchema = useMemo(() => {
    return yup.array().of(
      yup.object().shape({
        is_question_checked: yup.boolean(),
        number_of_questions: yup
          .mixed()
          .label(messages['common.number_of_questions'] as string)
          .when('is_question_checked', {
            is: (value: any) => value,
            then: yup.string().required(),
          }),
        total_marks: yup
          .mixed()
          .label(messages['common.total_marks'] as string)
          .when('is_question_checked', {
            is: (value: any) => value,
            then: yup.string().required(),
          }),
        question_selection_type: yup
          .mixed()
          .label(messages['common.question_selection_type'] as string)
          .when('is_question_checked', {
            is: (value: any) => value,
            then: yup.string().required(),
          }),
      }),
    );
  }, []);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .required()
        .label(messages['exam.label'] as string),
      subject_id: yup
        .string()
        .required()
        .label(messages['subject.label'] as string),
      course_id: yup
        .string()
        .required()
        .label(messages['course.label'] as string),
      training_center_id: yup
        .string()
        .required()
        .label(messages['training_center.label'] as string),
      purpose_id: yup
        .string()
        .required()
        .label(messages['batches.label'] as string),
      type: yup
        .string()
        .required()
        .label(messages['common.exam_type'] as string),
      exam_date:
        Number(examType) == ExamTypes.MIXED
          ? yup.string()
          : yup
              .string()
              .label(messages['common.exam_date'] as string)
              .required(),
      duration:
        Number(examType) == ExamTypes.MIXED
          ? yup.string()
          : yup
              .string()
              .label(messages['common.duration_min'] as string)
              .required(),
      total_set:
        Number(examType) == ExamTypes.OFFLINE
          ? yup
              .mixed()
              .required()
              .label(messages['common.number_of_sets'] as string)
              .test(
                'total_set_validation',
                messages['common.number_of_sets_min_max'] as string,
                (value) => Boolean(Number(value) >= 2 && Number(value) <= 5),
              )
          : yup.string(),
      online:
        Number(examType) == ExamTypes.MIXED
          ? yup.object().shape({
              exam_date: yup
                .string()
                .required()
                .label(messages['common.exam_date'] as string),
              duration: yup
                .string()
                .required()
                .label(messages['common.duration_min'] as string),
              exam_questions: examQuestionsSchema,
            })
          : yup.object().shape({}),
      offline:
        Number(examType) == ExamTypes.MIXED
          ? yup.object().shape({
              exam_date: yup
                .string()
                .required()
                .label(messages['common.exam_date'] as string),
              duration: yup
                .string()
                .required()
                .label(messages['common.duration_min'] as string),
              total_set: yup
                .mixed()
                .required()
                .label(messages['common.number_of_sets'] as string)
                .test(
                  'total_set_validation',
                  messages['common.number_of_sets_min_max'] as string,
                  (value) => Boolean(Number(value) >= 1 && Number(value) <= 5),
                ),
              sets: yup.array().of(
                yup.object().shape({
                  title: yup
                    .string()
                    .required()
                    .label(messages['common.set_name'] as string),
                }),
              ),
              exam_questions: examQuestionsSchema,
            })
          : yup.object().shape({}),
      sets:
        Number(examType) == ExamTypes.OFFLINE
          ? yup.array().of(
              yup.object().shape({
                title: yup
                  .string()
                  .required()
                  .label(messages['common.set_name'] as string),
              }),
            )
          : yup.array(),
      exam_questions:
        Number(examType) == ExamTypes.MIXED
          ? yup.array().of(yup.object().shape({}))
          : examQuestionsSchema,
    });
  }, [messages, examType]);

  const {
    register,
    control,
    setError,
    setValue,
    getValues,
    reset,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const setFormValues = (data: any, exam: any) => {
    data.exam_date = exam?.exam_date.replace(' ', 'T');
    data.duration = exam?.duration;

    if (exam?.type == ExamTypes.OFFLINE) {
      data.venue = exam.venue;
      if (exam.exam_sets) {
        data.total_set = exam.exam_sets.length;
        data.sets = exam.exam_sets.map((set: any) => {
          return {
            title: set.title,
            title_en: set.title_en,
          };
        });
      }
    }

    let exam_questions: Array<any> = [];

    if (exam?.exam_sections) {
      questionTypesArray.map((type) => {
        let section = exam.exam_sections.find(
          (sec: any) => sec.question_type == Number(type),
        );

        (section?.questions || []).map((qu: any) => {
          qu.id = qu.question_id;
        });

        let secQuestions: any = {
          is_question_checked: section != undefined,
          question_type: type,
          number_of_questions: section?.number_of_questions
            ? section?.number_of_questions
            : '',
          total_marks: section?.total_marks ? Number(section?.total_marks) : '',
          question_selection_type: section?.question_selection_type
            ? section?.question_selection_type
            : '',
          questions: section?.questions ? section?.questions : [],
        };

        if (exam?.type == ExamTypes.OFFLINE && section?.questions) {
          let grouped = _.mapValues(
            _.groupBy(section.questions, 'exam_set_uuid'),
          );
          let ques: any = [];
          Object.keys(grouped).map((key, i) => {
            ques.push({id: 'SET##' + (i + 1), questions: grouped[key]});
          });
          secQuestions.question_sets = ques;
        }

        exam_questions.push(secQuestions);
      });
    }

    data.exam_questions = exam_questions;
  };

  useEffect(() => {
    if (itemData) {
      let data: any = {
        title: itemData?.title,
        title_en: itemData?.title_en,
        subject_id: itemData?.subject_id,
        course_id: itemData?.course_id,
        training_center_id: itemData?.training_center_id,
        purpose_id: itemData?.purpose_id,
        type: itemData?.type,
        row_status: itemData?.row_status,
      };

      if (itemData?.type != ExamTypes.MIXED) {
        setFormValues(data, itemData?.exams[0]);
      } else {
        if (Number(itemData?.exams[0]?.type) == ExamTypes.ONLINE) {
          data.online = {};
          data.offline = {};
          setFormValues(data.online, itemData?.exams[0]);
          setFormValues(data.offline, itemData?.exams[1]);
        } else {
          data.online = {};
          data.offline = {};
          setFormValues(data.online, itemData?.exams[1]);
          setFormValues(data.offline, itemData?.exams[0]);
        }
      }

      onChangeCourse(itemData?.course_id);
      onChangeTrainingCenter(itemData?.training_center_id);

      setExamType(itemData?.type);
      setSubjectId(itemData?.subject_id);

      reset(data);
    }
  }, [itemData, trainingCenters]);

  const onChangeExamType = useCallback((value) => {
    setExamType(Number(value));
  }, []);

  const onSubjectChange = useCallback((value) => {
    setSubjectId(value);
  }, []);

  console.log('error', errors);

  const getTotalCount = (questions: any) => {
    let count = 0;
    (questions || []).map((item: any) => {
      if (item?.total_marks && !isNaN(item?.total_marks)) {
        count += Number(item?.total_marks);
      }
    });
    return count;
  };

  const onSubmit: SubmitHandler<any> = async (formData: any) => {
    console.log('submitted data', formData);

    let data = cloneDeep(formData);

    data.purpose_name = ExamPurposeNames.BATCH;

    if (examType !== ExamTypes.MIXED) {
      delete data.online;
      delete data.offline;
      if (examType == ExamTypes.ONLINE) delete data.total_set;

      data.exam_date =
        data.exam_date
          .replace(/T(\d\d):(\d\d):\d\d/, 'T$1:$2')
          .replace('T', ' ') + ':00';

      let arr: any = data.exam_questions.filter(
        (item: any) => item.is_question_checked != false,
      );

      data.exam_questions = arr.map(({is_question_checked, ...rest}: any) => {
        if (
          String(rest.question_selection_type) == QuestionSelectionType.RANDOM
        ) {
          delete rest.questions;
          delete rest.question_sets;
        }
        if (examType == ExamTypes.OFFLINE) {
          delete rest.questions;
        }

        return rest;
      });
    }

    if (examType == ExamTypes.MIXED) {
      delete data.exam_date;
      delete data.duration;
      delete data.exam_questions;

      data.online.exam_date =
        data.online.exam_date
          .replace(/T(\d\d):(\d\d):\d\d/, 'T$1:$2')
          .replace('T', ' ') + ':00';

      data.offline.exam_date =
        data.offline.exam_date
          .replace(/T(\d\d):(\d\d):\d\d/, 'T$1:$2')
          .replace('T', ' ') + ':00';

      let arrOnline: any = data.online.exam_questions.filter(
        (item: any) => item.is_question_checked != false,
      );

      data.online.exam_questions = arrOnline.map(
        ({is_question_checked, ...rest}: any) => {
          if (
            String(rest.question_selection_type) == QuestionSelectionType.RANDOM
          ) {
            delete rest.questions;
          }
          return rest;
        },
      );

      let arrOffline: any = data.offline?.exam_questions.filter(
        (item: any) => item.is_question_checked != false,
      );

      data.offline.exam_questions = arrOffline.map(
        ({is_question_checked, ...rest}: any) => {
          delete rest.questions;
          if (
            String(rest.question_selection_type) == QuestionSelectionType.RANDOM
          ) {
            delete rest.question_sets;
          }
          return rest;
        },
      );
    }

    if (examType != ExamTypes.MIXED) {
      // total_marks total_marks
      data.total_marks = getTotalCount(data.exam_questions);
    } else {
      data.online.total_marks = getTotalCount(data.online.exam_questions);
      data.offline.total_marks = getTotalCount(data.offline.exam_questions);
    }

    if (examId && examType == ExamTypes.MIXED) {
      if (itemData.exams[0].type == ExamTypes.ONLINE) {
        data.online.exam_id = itemData.exams[0].id;
        data.offline.exam_id = itemData.exams[1].id;
      } else if (itemData.exams[0].type == ExamTypes.OFFLINE) {
        data.online.exam_id = itemData.exams[1].id;
        data.offline.exam_id = itemData.exams[0].id;
      }
    } else if (examId) {
      data.exam_id = itemData.exams[0].id;
    }

    console.log('formdata->', data);

    try {
      if (examId) {
        await updateExam(examId, data);
        updateSuccessMessage('exam.label');
        mutateExam();
      } else {
        await createExam(data);
        createSuccessMessage('exam.label');
      }
      router.back();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  const examTypes = useMemo(
    () => [
      {
        id: ExamTypes.ONLINE,
        label: messages['common.online'],
      },
      {
        id: ExamTypes.OFFLINE,
        label: messages['common.offline'],
      },
      {
        id: ExamTypes.MIXED,
        label: messages['common.mixed'],
      },
    ],
    [messages],
  );

  const onChangeCourse = useCallback((courseId: any) => {
    setCourseId(courseId);
    setBatches([]);
  }, []);

  const onChangeTrainingCenter = useCallback(
    (trainingCenterId: any) => {
      let arr = (trainingCenters || []).filter(
        (item: any) => item.id == trainingCenterId,
      );
      if (arr && arr.length > 0) setBatches(arr[0]?.batches);
      else setBatches([]);
    },
    [trainingCenters],
  );

  return (
    <>
      <PageBlock
        title={
          <>
            <IconExam />
            {examId ? (
              <IntlMessages
                id='common.edit'
                values={{subject: <IntlMessages id='exam.label' />}}
              />
            ) : (
              <IntlMessages
                id='common.add_new'
                values={{subject: <IntlMessages id='exam.label' />}}
              />
            )}
          </>
        }
        extra={[
          <Button
            key={1}
            variant={'contained'}
            color={'primary'}
            size={'small'}
            onClick={() => router.back()}>
            <ArrowBack />
            {messages['common.back']}
          </Button>,
        ]}>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id={'title'}
                label={messages['common.title']}
                register={register}
                errorInstance={errors}
                isLoading={false}
                InputLabelProps={{
                  shrink: !isNaN(examId),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                id={'title_en'}
                label={messages['common.title_en']}
                register={register}
                errorInstance={errors}
                isLoading={false}
                InputLabelProps={{
                  shrink: !isNaN(examId),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomFilterableFormSelect
                required
                id={'subject_id'}
                label={messages['subject.label']}
                isLoading={isLoadingSubjects}
                control={control}
                options={subjects}
                optionValueProp={'id'}
                optionTitleProp={['title']}
                errorInstance={errors}
                onChange={onSubjectChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomFilterableFormSelect
                required
                id='course_id'
                label={messages['course.label']}
                isLoading={isLoadingCourse}
                control={control}
                options={courses}
                optionValueProp={'id'}
                optionTitleProp={['title']}
                errorInstance={errors}
                onChange={onChangeCourse}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomFilterableFormSelect
                required
                id='training_center_id'
                label={messages['training_center.label']}
                isLoading={isTrainingCentersLoading}
                control={control}
                options={trainingCenters}
                optionValueProp={'id'}
                optionTitleProp={['title']}
                errorInstance={errors}
                onChange={onChangeTrainingCenter}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomFilterableFormSelect
                required
                id='purpose_id'
                label={messages['batches.label']}
                isLoading={isTrainingCentersLoading}
                control={control}
                options={batches}
                optionValueProp={'id'}
                optionTitleProp={['title']}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomFormSelect
                required
                id={'type'}
                label={messages['common.exam_type']}
                isLoading={false}
                control={control}
                options={examTypes}
                optionValueProp={'id'}
                optionTitleProp={['label']}
                errorInstance={errors}
                onChange={onChangeExamType}
              />
            </Grid>

            {(examType == ExamTypes.ONLINE || examType == ExamTypes.MIXED) &&
              subjectId && (
                <Grid item xs={12}>
                  <OnlineExam
                    useFrom={{register, errors, control, setValue, getValues}}
                    examType={examType}
                    subjectId={subjectId}
                  />
                </Grid>
              )}

            {(examType == ExamTypes.OFFLINE || examType == ExamTypes.MIXED) &&
              subjectId && (
                <Grid item xs={12}>
                  <OffLineExam
                    useFrom={{register, errors, control, setValue, getValues}}
                    examType={examType}
                    subjectId={subjectId}
                  />
                </Grid>
              )}

            <Grid item xs={6}>
              <FormRowStatus
                id='row_status'
                control={control}
                defaultValue={RowStatus.ACTIVE}
                isLoading={isLoadingExam}
              />
            </Grid>
          </Grid>

          <Button
            sx={{marginTop: 3}}
            disabled={isSubmitting}
            type={'submit'}
            variant={'contained'}
            color={'primary'}>
            {messages['common.submit']}
          </Button>
        </form>
      </PageBlock>
    </>
  );
};

export default ExamAddEditPage;
