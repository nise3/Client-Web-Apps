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
import {ISkill} from '../../../shared/Interface/organization.interface';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {
  useFetchAssessmentQuestionSets,
  useFetchAssessments,
} from '../../../services/CertificateAuthorityManagement/hooks';
import {ISubject} from '../../../shared/Interface/institute.interface';
import IconCourse from '../../../@softbd/icons/IconCourse';
import CustomSelectAutoComplete from '../../youth/registration/CustomSelectAutoComplete';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import {
  createAssessmentQuestionSet,
  updateAssessmentQuestionSet,
} from '../../../services/CertificateAuthorityManagement/AssessmentQuestionSetService';

interface SubjectAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title_en: '',
  title: '',
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
  } = useFetchAssessmentQuestionSets(itemId);

  const [assessmentFilters] = useState<any>({});

  const {data: assessmentData, isLoading: isLoadingAssessment} =
    useFetchAssessments(assessmentFilters);

  const [selectedAssessmentList, setSelectedAssessmentList] = useState<any>([]);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      assessment_id: yup
        .string()
        .title()
        .label(messages['assessment.label'] as string),
      title: yup
        .string()
        .title()
        .label(messages['questionSet.title'] as string),
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
  } = useForm<ISkill>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        title_en: itemData?.title_en,
        title: itemData?.title,
      });
      setSelectedAssessmentList(itemData?.assessment_id);
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onAssessmentChange = useCallback((options) => {
    setSelectedAssessmentList(options);
  }, []);

  const onSubmit: SubmitHandler<ISubject> = async (data: ISubject) => {
    console.log('submitted data: ', data);
    try {
      if (itemId) {
        await updateAssessmentQuestionSet(itemId, data);
        updateSuccessMessage('questionSet.label');
        mutateSubject();
      } else {
        await createAssessmentQuestionSet(data);
        createSuccessMessage('questionSet.label');
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
          <CustomSelectAutoComplete
            required
            id='assessment_id'
            label={messages['assessment.label']}
            isLoading={isLoadingAssessment}
            control={control}
            options={assessmentData}
            optionValueProp='id'
            optionTitleProp={['title']}
            defaultValue={selectedAssessmentList}
            errorInstance={errors}
            onChange={onAssessmentChange}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextInput
            required
            id='title'
            label={messages['questionSet.title']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextInput
            id='title_en'
            label={messages['questionSet.title_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomChipRowStatus
            label={messages['common.status']}
            value={itemData?.row_status}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default QuestionSetAddEditPopup;
