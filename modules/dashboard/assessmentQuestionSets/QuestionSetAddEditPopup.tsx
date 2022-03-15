import yup from '../../../@softbd/libs/yup';
import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {
  useFetchAssessmentQuestionSet,
  useFetchAssessments,
} from '../../../services/CertificateAuthorityManagement/hooks';
import {IQuestionSet} from '../../../shared/Interface/institute.interface';
import IconCourse from '../../../@softbd/icons/IconCourse';
import {
  createAssessmentQuestionSet,
  updateAssessmentQuestionSet,
} from '../../../services/CertificateAuthorityManagement/AssessmentQuestionSetService';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';

interface SubjectAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title_en: '',
  title: '',
  row_status: '1',
  assessment_id: '',
};

const QuestionSetAddEditPopup: FC<SubjectAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const isEdit = itemId != null;
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const {
    data: itemData,
    isLoading,
    mutate: mutateSubject,
  } = useFetchAssessmentQuestionSet(itemId);

  const [assessmentFilters] = useState<any>({});

  const {data: assessmentData, isLoading: isLoadingAssessment} =
    useFetchAssessments(assessmentFilters);

  const [selectedAssessment, setSelectedAssessment] = useState<any>([]);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title()
        .required()
        .label(messages['question_set.title'] as string),
      assessment_id: yup
        .string()
        .trim()
        .required()
        .label(messages['assessment.label'] as string),
      row_status: yup.string(),
    });
  }, [messages]);

  const {
    register,
    reset,
    control,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<IQuestionSet>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        title_en: itemData?.title_en,
        title: itemData?.title,
        row_status: itemData?.row_status,
        assessment_id: itemData?.assessment_id,
      });
      console.log('(itemData?.assessment_id: ', itemData?.assessment_id);
      setSelectedAssessment(itemData?.assessment_id);
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onAssessmentChange = useCallback((options) => {
    setSelectedAssessment(options);
  }, []);

  const onSubmit: SubmitHandler<IQuestionSet> = async (data: IQuestionSet) => {
    try {
      if (itemId) {
        await updateAssessmentQuestionSet(itemId, data);
        updateSuccessMessage('question_set.label');
        mutateSubject();
      } else {
        await createAssessmentQuestionSet(data);
        createSuccessMessage('question_set.label');
      }
      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <HookFormMuiModal
      open={true}
      {...props}
      title={
        <>
          <IconCourse />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{
                subject: <IntlMessages id='assessment_question_set.label' />,
              }}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{
                subject: <IntlMessages id='assessment_question_set.label' />,
              }}
            />
          )}
        </>
      }
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <CustomFilterableFormSelect
            required
            id='assessment_id'
            label={messages['assessment.label']}
            isLoading={isLoadingAssessment}
            control={control}
            options={assessmentData}
            optionValueProp='id'
            optionTitleProp={['title']}
            defaultValue={selectedAssessment}
            errorInstance={errors}
            onChange={onAssessmentChange}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextInput
            required
            id='title'
            label={messages['question_set.title']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextInput
            id='title_en'
            label={messages['question_set.title_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <FormRowStatus
            id='row_status'
            control={control}
            defaultValue={initialValues.row_status}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default QuestionSetAddEditPopup;
