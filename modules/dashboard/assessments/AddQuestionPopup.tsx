import React, {FC, useEffect, useMemo} from 'react';
import yup from '../../../@softbd/libs/yup';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {Grid} from '@mui/material';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconOccupation from '../../../@softbd/icons/IconOccupation';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {useFetchApplicationDetails} from '../../../services/instituteManagement/hooks';
import {assignBatch} from '../../../services/instituteManagement/RegistrationService';
import TransferListComponent from './TransferListComponent';
import {isBreakPointUp} from '../../../@crema/utility/Utils';

interface AssignBatchPopup {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  batch_id: '',
};

const AssignBatchPopup: FC<AssignBatchPopup> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack, errorStack} = useNotiStack();
  const isEdit = itemId != null;
  const {data: itemData, isLoading} = useFetchApplicationDetails(itemId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      batch_id: yup
        .string()
        .trim()
        .required()
        .label(messages['applicationManagement.batches'] as string),
    });
  }, [messages]);

  const {
    // control,
    reset,
    setError,
    handleSubmit,
    // formState: {errors, isSubmitting},
    formState: {isSubmitting},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        batch_id: itemData?.batch_id,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      if (itemId) {
        await assignBatch(data, itemId);
        successStack(
          <IntlMessages
            id='assessment.questionsAdded'
            values={{subject: <IntlMessages id='assessment.addQuestion' />}}
          />,
        );
      }
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
          <IconOccupation />
          {isEdit ? (
            <IntlMessages
              id='assessment.addQuestion'
              values={{
                subject: <IntlMessages id='applicationManagement.label' />,
              }}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{
                subject: <IntlMessages id='applicationManagement.label' />,
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
          <TransferListComponent />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default AssignBatchPopup;
