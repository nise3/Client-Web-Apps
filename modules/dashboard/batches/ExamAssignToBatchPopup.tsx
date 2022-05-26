import React, {FC, useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import Grid from '@mui/material/Grid';
import yup from '../../../@softbd/libs/yup';
import {
  useFetchBatchExams,
  useFetchExams,
} from '../../../services/instituteManagement/hooks';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import CustomSelectAutoComplete from '../../youth/registration/CustomSelectAutoComplete';
import IconExam from '../../../@softbd/icons/IconExam';
import {ExamTypes} from '../exams/ExamEnums';
import {assignExamsToBatch} from '../../../services/instituteManagement/BatchService';
import {S1} from '../../../@softbd/elements/common';

interface ExamAssignToBatchPopupProps {
  batchId: number;
  onClose: () => void;
}

const ExamAssignToBatchPopup: FC<ExamAssignToBatchPopupProps> = ({
  batchId,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack, successStack} = useNotiStack();

  const [examFilters] = useState<any>({
    batch_id: batchId,
    is_result_config_courses: 1,
  });
  const {data: batchExams} = useFetchBatchExams(batchId);
  const {data: exams, isLoading} = useFetchExams(examFilters);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      exams: yup
        .array()
        .of(yup.object())
        .required()
        .min(1)
        .label(messages['exam.label'] as string),
    });
  }, [messages]);

  const {
    control,
    setError,
    reset,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (
      exams &&
      exams.error_code &&
      exams.error_code != 'no_config' &&
      batchExams
    ) {
      let ids = (batchExams || []).map((exam_type: any) => exam_type.id);
      reset({
        exams: exams
          .filter((exam: any) => ids.includes(exam.id))
          .map((ex: any) => ({
            ...ex,
            type_label: getTypeLabel(ex.type),
          })),
      });
    } else {
      reset({
        exams: [],
      });
    }
  }, [batchExams, exams]);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      let formData: any = {};
      formData.exam_type_ids = (data?.exams || []).map((exam: any) => exam.id);

      await assignExamsToBatch(batchId, formData);
      successStack(messages['batch.exam_assign_success']);
      props.onClose();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  const getTypeLabel = (type: any) => {
    switch (Number(type)) {
      case ExamTypes.ONLINE:
        return messages['common.online'];
      case ExamTypes.OFFLINE:
        return messages['common.offline'];
      case ExamTypes.MIXED:
        return messages['common.mixed'];
      case ExamTypes.PRACTICAL:
        return messages['common.practical'];
      case ExamTypes.FIELDWORK:
        return messages['common.field_work'];
      case ExamTypes.PRESENTATION:
        return messages['common.presentation'];
      case ExamTypes.ASSIGNMENT:
        return messages['common.assignment'];
      default:
        return '';
    }
  };

  return (
    <HookFormMuiModal
      {...props}
      open={true}
      title={
        <>
          <IconExam />
          <IntlMessages id='batch.assign_exam' />
        </>
      }
      handleSubmit={handleSubmit(onSubmit)}
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
        </>
      }>
      <Grid container spacing={5}>
        {exams && exams.error_code == 'no_config' ? (
          <Grid item xs={12} sx={{textAlign: 'center'}}>
            <S1>{messages['batch.result_failed_no_config']}</S1>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <CustomSelectAutoComplete
              required
              id='exams'
              label={messages['exam.label']}
              control={control}
              options={(exams || []).map((exam: any) => ({
                ...exam,
                type_label: getTypeLabel(exam.type),
              }))}
              optionTitleProp={['title', 'type_label']}
              optionValueProp={'id'}
              errorInstance={errors}
            />
          </Grid>
        )}
      </Grid>
    </HookFormMuiModal>
  );
};

export default ExamAssignToBatchPopup;
