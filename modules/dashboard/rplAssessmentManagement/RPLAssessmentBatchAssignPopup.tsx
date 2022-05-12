import React, {FC, useEffect, useMemo, useState} from 'react';
import yup from '../../../@softbd/libs/yup';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {Grid} from '@mui/material';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {assessmentAssignBatch} from '../../../services/CertificateAuthorityManagement/YouthAssessmentService';
import {useFetchRTOBatches} from '../../../services/CertificateAuthorityManagement/hooks';
import {IAssessmentBatchAssign} from '../../../shared/Interface/assessmentManagement.interface';
import IconCourse from '../../../@softbd/icons/IconCourse';

interface RPLAssessmentBatchAssignPopup {
  itemId: number | null;
  batchId: number | string;
  sectorId: number | string;
  occupationId: number | string;
  onClose: () => void;
  refreshDataTable: () => void;
}

const AssignBatchPopup: FC<RPLAssessmentBatchAssignPopup> = ({
  itemId,
  batchId,
  sectorId,
  occupationId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack, errorStack} = useNotiStack();
  const [batchFilters] = useState<any>({
    rpl_sector_id: sectorId,
    rpl_occupation_id: occupationId,
  });

  const {data: rtoBatches, isLoading: isBatchesLoading} =
    useFetchRTOBatches(batchFilters);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      rto_batch_id: yup
        .string()
        .trim()
        .required()
        .label(messages['applicationManagement.batches'] as string),
    });
  }, [messages]);

  const {
    control,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (batchId) {
      reset({
        rto_batch_id: batchId,
      });
    } else {
      reset({
        rto_batch_id: '',
      });
    }
  }, [batchId]);

  const onSubmit: SubmitHandler<IAssessmentBatchAssign> = async (
    data: IAssessmentBatchAssign,
  ) => {
    try {
      await assessmentAssignBatch(data, itemId);
      successStack(
        <IntlMessages
          id='applicationManagement.batchAssigned'
          values={{subject: <IntlMessages id='common.label' />}}
        />,
      );
      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({error, validationSchema, setError, errorStack});
    }
  };

  return (
    <HookFormMuiModal
      {...props}
      open={true}
      title={
        <>
          <IconCourse />
          <IntlMessages
            id='common.add_new'
            values={{
              subject: <IntlMessages id='applicationManagement.label' />,
            }}
          />
        </>
      }
      maxWidth={'sm'}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} />
          <SubmitButton isSubmitting={isSubmitting} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <CustomFormSelect
            required
            id='rto_batch_id'
            label={messages['applicationManagement.batches']}
            isLoading={isBatchesLoading}
            control={control}
            options={rtoBatches}
            optionTitleProp={['title']}
            optionValueProp={'id'}
            optionGroupTitleProp={['title']}
            errorInstance={errors}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default AssignBatchPopup;
