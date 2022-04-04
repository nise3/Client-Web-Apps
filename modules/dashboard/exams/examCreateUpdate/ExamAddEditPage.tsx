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

  const isEdit = itemId != null;

  const {
    data: itemData,
    isLoading: isLoadingExam,
    mutate: mutateExam,
  } = useFetchExam(itemId);

  const [subjectFilters] = useState({});
  const {data: subjects, isLoading: isLoadingSubjects} =
    useFetchSubjects(subjectFilters);

  const [courseFilters] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: courses, isLoading: isLoadingCourse} =
    useFetchCourses(courseFilters);

  const [examType, setExamType] = useState<any>(null);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .required()
        .label(messages['exam.label'] as string),
    });
  }, [messages]);

  const {
    register,
    control,
    setError,
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
      };
      reset(data);
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onChangeExamType = useCallback((value) => {
    setExamType(String(value));
    console.log('value->', String(value));
  }, []);

  const onSubmit: SubmitHandler<any> = async (formData: any) => {
    formData.purpose_name = 'COURSE';

    try {
      if (itemId) {
        await updateExam(itemId, formData);
        updateSuccessMessage('exam.label');
        mutateExam();
      } else {
        await createExam(formData);
        createSuccessMessage('exam.label');
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
        id: ExamTypes.OFF_ONLINE,
        label: messages['common.off_online'],
      },
      {
        id: ExamTypes.MIXED,
        label: messages['album_type.mixed'],
      },
    ],
    [messages],
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
        // extra={[
        //   <AddButton
        //     key={1}
        //     onClick={() => openAddEditModal(null)}
        //     isLoading={loading}
        //     tooltip={
        //       <IntlMessages
        //         id={'common.add_new'}
        //         values={{
        //           exam: messages['exam.label'],
        //         }}
        //       />
        //     }
        //   />,
        // ]}
      >
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <Grid container spacing={3}>
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
              />
            </Grid>
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
            <Grid item xs={12} md={6}>
              <CustomFilterableFormSelect
                id='purpose_id'
                label={messages['common.exam_purpose']}
                isLoading={isLoadingCourse}
                control={control}
                options={courses}
                optionValueProp={'id'}
                optionTitleProp={['title']}
                errorInstance={errors}
              />
            </Grid>

            {(examType == ExamTypes.ONLINE || examType == ExamTypes.MIXED) && (
              <Grid item xs={12}>
                <OnlineExam useFrom={{register, errors}} />
              </Grid>
            )}

            {(examType == ExamTypes.OFF_ONLINE ||
              examType == ExamTypes.MIXED) && (
              <Grid item xs={12}>
                <OffLineExam useFrom={{register, errors}} />
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
            {messages['common.save_and_continue']}
          </Button>
        </form>
      </PageBlock>
    </>
  );
};

export default ExamAddEditPage;
