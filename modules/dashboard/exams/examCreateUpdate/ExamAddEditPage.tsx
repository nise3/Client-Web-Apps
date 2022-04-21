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
import {ExamTypes} from '../ExamEnums';
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
import {cloneDeep} from 'lodash';
import {S2} from '../../../../@softbd/elements/common';
import {ExamPurposeNames} from '../../../../@softbd/utilities/ExamPurposeNames';

interface ExamAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title: '',
  title_en: '',
  subject_id: '',
  purpose_id: '',
  type: '',
  row_status: '1',
};

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

  const isEdit = examId != null;

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
  const {data: coursesData, isLoading: isLoadingCourse} =
    useFetchCourses(courseFilters);

  const [totalMarks] = useState<number>(0);
  const [examType, setExamType] = useState<any>(null);
  const [courses, setCourses] = useState<Array<any>>([]);
  const [trainingCenters, setTrainingCenters] = useState<Array<any>>([]);
  const [batches, setBatches] = useState<Array<any>>([]);
  const [subjectId, setSubjectId] = useState<any>(null);

  const [courseId, setCourseId] = useState<any>(null);
  const {
    data: trainingCentersWithBatches,
    isLoading: isTrainingCentersLoading,
  } = useFetchTrainingCentersWithBatches(courseId);

  useEffect(() => {
    setCourses(coursesData);
  }, [coursesData]);

  useEffect(() => {
    setTrainingCenters(trainingCentersWithBatches);
  }, [trainingCentersWithBatches]);

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
      purpose_id: yup
        .string()
        .required()
        .label(messages['batches.label'] as string),
      type: yup
        .string()
        .required()
        .label(messages['common.exam_type'] as string),
      exam_date:
        examType == ExamTypes.MIXED
          ? yup.string()
          : yup
              .mixed()
              .required()
              .label(messages['common.exam_date'] as string),
      duration:
        examType == ExamTypes.MIXED
          ? yup.string()
          : yup
              .mixed()
              .required()
              .label(messages['common.duration_min'] as string),
      total_set:
        examType == ExamTypes.OFFLINE
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
        examType == ExamTypes.MIXED
          ? yup.object().shape({
              exam_date: yup
                .mixed()
                .required()
                .label(messages['common.exam_date'] as string),
              duration: yup
                .mixed()
                .required()
                .label(messages['common.duration_min'] as string),
              exam_questions: examQuestionsSchema,
            })
          : yup.object().shape({}),
      offline:
        examType == ExamTypes.MIXED
          ? yup.object().shape({
              exam_date: yup
                .mixed()
                .required()
                .label(messages['common.exam_date'] as string),
              duration: yup
                .mixed()
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
        examType == ExamTypes.OFFLINE
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
        examType == ExamTypes.MIXED
          ? yup.object().shape({})
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

  useEffect(() => {
    if (itemData) {
      let data: any = {
        title: itemData?.title,
        title_en: itemData?.title_en,
        subject_id: itemData?.subject_id,
        purpose_id: itemData?.purpose_id,
        type: itemData?.type,
        row_status: itemData?.row_status,
        exam_date:
          itemData?.type == ExamTypes.ONLINE
            ? itemData?.exams[0].exam_date.replace(' ', 'T')
            : null,
        duration:
          itemData?.type == ExamTypes.ONLINE
            ? itemData?.exams[0].duration
            : null,
      };

      console.log('data->', data);
      setExamType(String(itemData?.type));
      setSubjectId(itemData?.subject_id);

      reset(data);
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onChangeExamType = useCallback((value) => {
    setExamType(String(value));
  }, []);

  const onSubjectChange = useCallback((value) => {
    setSubjectId(value);
  }, []);

  console.log('error', errors);

  const onSubmit: SubmitHandler<any> = async (formData: any) => {
    console.log('submitted data', formData);

    let data = cloneDeep(formData);

    data.purpose_name = ExamPurposeNames.BATCH;

    data.exam_date =
      data.exam_date
        .replace(/T(\d\d):(\d\d):\d\d/, 'T$1:$2')
        .replace('T', ' ') + ':00';

    if (examType !== ExamTypes.MIXED) {
      let arr: any = data.exam_questions.filter(
        (item: any) => item.is_question_checked != false,
      );

      data.exam_questions = arr.map(
        ({is_question_checked, ...rest}: any) => rest,
      );
    }

    if (examType == ExamTypes.MIXED) {
      let arrOnline: any = data.online.exam_questions.filter(
        (item: any) => item.is_question_checked != false,
      );

      data.online.exam_questions = arrOnline.map(
        ({is_question_checked, ...rest}: any) => rest,
      );

      let arrOffline: any = data.offline?.exam_questions.filter(
        (item: any) => item.is_question_checked != false,
      );

      data.offline.exam_questions = arrOffline.map(
        ({is_question_checked, ...rest}: any) => rest,
      );
    }

    // total_marks total_marks
    data.total_marks = (data.exam_questions || [])
      .map((item: any) => Number(item?.total_marks))
      .reduce((prev: any, curr: any) => {
        return prev + curr;
      }, 0);

    console.log('formdata->', data);

    try {
      if (examId) {
        await updateExam(examId, data);
        updateSuccessMessage('exam.label');
        mutateExam();
        router.back();
      } else {
        await createExam(data);
        createSuccessMessage('exam.label');
        router.back();
      }
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

  const onChangeCourse = useCallback(
    (courseId: any) => {
      setCourseId(courseId);
      setTrainingCenters([]);
      setBatches([]);
    },
    [courses],
  );

  const onChangeTrainingCenter = useCallback(
    (trainingCenterId: any) => {
      let arr = trainingCenters.filter(
        (item: any) => item.id == trainingCenterId,
      );
      setBatches(arr[0]?.batches);
    },
    [trainingCenters],
  );

  return (
    <>
      <PageBlock
        title={
          <>
            <IconExam />
            {isEdit ? (
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
                id='title'
                label={messages['common.title']}
                register={register}
                errorInstance={errors}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                id={'title_en'}
                label={messages['common.title_en']}
                register={register}
                errorInstance={errors}
                isLoading={false}
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

            <Grid item xs={12} md={6}>
              <S2>
                {messages['common.total_marks']}: {totalMarks}
              </S2>
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
                defaultValue={initialValues.row_status}
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
