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
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconOccupation from '../../../@softbd/icons/IconOccupation';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {
  useFetchApplicationDetails,
  useFetchLocalizedBatchesToAssign,
} from '../../../services/instituteManagement/hooks';
import {assignBatch} from '../../../services/instituteManagement/RegistrationService';
import {IBatchAssign} from '../../../shared/Interface/organization.interface';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';

interface AssignBatchPopup {
  itemId: number | null;
  onClose: () => void;
  courseId: number | null;
  refreshDataTable: () => void;
}

const initialValues = {
  batch_id: '',
};

const AssignBatchPopup: FC<AssignBatchPopup> = ({
  itemId,
  refreshDataTable,
  courseId,
  ...props
}) => {
  const {messages, locale} = useIntl();
  const {successStack, errorStack} = useNotiStack();
  const isEdit = itemId != null;
  const {data: itemData, isLoading} = useFetchApplicationDetails(itemId);

  const {data: trainingCenters, isLoading: isBatchesLoading} =
    useFetchLocalizedBatchesToAssign(courseId);

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
    control,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
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

  const onSubmit: SubmitHandler<IBatchAssign> = async (data: IBatchAssign) => {
    try {
      if (itemId) {
        await assignBatch(data, itemId);
        successStack(
          <IntlMessages
            id='applicationManagement.batchAssigned'
            values={{subject: <IntlMessages id='common.label' />}}
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
              id='applicationManagement.assignBatch'
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
      maxWidth={'sm'}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <div>
            {messages['common.preferred_training_center']}:{' '}
            {locale == LocaleLanguage.BN
              ? itemData?.training_center_title
              : itemData?.training_center_title_en}
          </div>
        </Grid>
        <Grid item xs={12}>
          <CustomFormSelect
            required
            id='batch_id'
            label={messages['applicationManagement.batches']}
            isLoading={isBatchesLoading}
            control={control}
            options={trainingCenters}
            optionTitleProp={['title']}
            isGroupData={true}
            groupDataKey={'batches'}
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
