import React, {FC, useEffect, useMemo, useState} from 'react';
import IconGallery from '../../../@softbd/icons/IconGallery';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import {useIntl} from 'react-intl';
import {useFetchHrDemand} from '../../../services/instituteManagement/hooks';
import {updateHrDemand} from '../../../services/instituteManagement/HrDemandService';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {Grid} from '@mui/material';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import yup from '../../../@softbd/libs/yup';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';

interface HumanResourceDemandMangePopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const HumanResourceDemandMangePopup: FC<HumanResourceDemandMangePopupProps> = ({
  itemId,
  refreshDataTable,
  onClose,
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const [disableProvidedVacancy, setDisableProvidedVacancy] =
    useState<boolean>(false);
  const {updateSuccessMessage} = useSuccessMessage();
  const {data: itemData} = useFetchHrDemand(itemId);
  const validationSchema = useMemo(() => {
    return yup.object().shape({
      vacancy_provided_by_institute: yup
        .string()
        .trim()
        .required()
        .label(messages['common.vacancy_provided_by_institute'] as string),
    });
  }, [messages]);
  const {
    register,
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
        vacancy_provided_by_institute: itemData?.vacancy,
        vacancy: itemData?.vacancy,
      });
      if (itemData?.rejected_by_industry_association == 1) {
        setDisableProvidedVacancy(true);
      }
    }
  }, [itemData]);
  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      if (itemId) {
        await updateHrDemand(itemId, data);
        updateSuccessMessage('hr_demand.label');
      }
      onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };
  /* const onApproveClick = async () => {
    try {
      let submitData = {
        vacancy_provided_by_institute: itemData?.vacancy,
      };
      await updateHrDemand(itemId, submitData);
      updateSuccessMessage('hr_demand.label');
      refreshDataTable();
    } catch (error) {
      console.log('error: ', error);
    }
  };*/
  return (
    <HookFormMuiModal
      open={true}
      title={
        <>
          <IconGallery />

          <IntlMessages
            id='common.manage'
            values={{subject: <IntlMessages id='hr_demand.label' />}}
          />
        </>
      }
      onClose={onClose}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={onClose} />
          <SubmitButton
            label={messages['common.approve'] as string}
            isSubmitting={isSubmitting}
          />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='vacancy'
            label={messages['common.vacancy']}
            register={register}
            errorInstance={errors}
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='vacancy_provided_by_institute'
            label={messages['common.vacancy_provided_by_institute']}
            register={register}
            errorInstance={errors}
            disabled={disableProvidedVacancy}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default HumanResourceDemandMangePopup;
