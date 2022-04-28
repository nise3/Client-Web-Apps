import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {getMomentDateFormat} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import Grid from '@mui/material/Grid';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import yup from '../../../@softbd/libs/yup';
import {
  assignTrainersToBatch,
  createBatch,
  updateBatch,
} from '../../../services/instituteManagement/BatchService';
import IconBatch from '../../../@softbd/icons/IconBatch';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import {
  useFetchBatch,
  useFetchBatches,
  useFetchBranches,
  useFetchCourses,
  useFetchInstitute,
  useFetchTrainers,
  useFetchTrainingCenters,
} from '../../../services/instituteManagement/hooks';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {IBatch, ITrainer} from '../../../shared/Interface/institute.interface';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import { useFetchResultTypes } from '../../../services/CertificateAuthorityManagement/hooks';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import { ICertificate } from '../../../shared/Interface/certificates';

interface CertificateTemplatePopupProps {
  itemId: string,
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  // certificate_type: '',
  certificate_id: ''
};

const CerrtificateTemplatePopup: FC<CertificateTemplatePopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  console.log('item id', itemId)
  const {messages} = useIntl();
  const {errorStack, successStack} = useNotiStack();
  const { data: certificateTypes, isLoading: isLoadingTypes } = useFetchResultTypes();
  const [certificateTypeId, setCertificateTypeId] = useState<string>();
  const [certificateId, setCertificateId] = useState<string>();
  const [certificatesList, setCertificatesList] = useState<
    Array<ICertificate> | []
  >([]);

  const {
    data: itemData,
    isLoading,
    mutate: mutateBatch,
  } = useFetchBatches(itemId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      certificate_type: yup
        .string()
        .trim()
        // .required()
        .label(messages['certificate.certificate_type'] as string),
      certificate_Id: yup
        .string()
        .trim()
        // .required()
        .label(messages['common.certificate'] as string),
    });
  // }, [messages, authUser]);
  }, [messages]);

  const {
    register,
    control,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<IBatch>({
    resolver: yupResolver(validationSchema),
  });

  const changeCertificateTypeAction = useCallback((typeid: string) => {
    setCertificateTypeId(typeid);
  }, []);
  const changeCertificatesAction = useCallback((certificateId: string) => {
    setCertificateId(certificateId);
  }, []);

  // useEffect(async () => {
  //   const {data: certificate} = await getCertificateByResultType({
  //     result_type: certificateTypeId,
  //   });
  //   setCertificatesList(certificate);
  // }, [certificateTypeId]);

  const onSubmit: SubmitHandler<IBatch> = async (data: IBatch) => {
    console.log(data);
    data.certificate_Id = '2';
    try {
      if (itemId) {
        await updateBatch(itemId, data);
        mutateBatch();
      }
      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <HookFormMuiModal
      {...props}
      open={true}
      title={
        <>
          <IconBatch />
          <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='batches.label' />}}
            />
        </>
      }
      handleSubmit={handleSubmit(onSubmit)}
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoadingTypes} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoadingTypes} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
        <CustomFilterableFormSelect
            key={1}
            required
            id='certificate_type'
            label={messages['certificate.certificate_type']}
            isLoading={isLoadingTypes}
            control={control}
            options={certificateTypes}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            errorInstance={errors}
            onChange={changeCertificateTypeAction}
          />
        </Grid>
        <Grid item xs={12} md={6}>
        <CustomFilterableFormSelect
            key={2}
            required
            id='certificate_Id'
            label={messages['common.certificate']}
            isLoading={isLoadingTypes}
            control={control}
            options={certificatesList}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
            onChange={changeCertificatesAction}
            />
        </Grid>
    
        <Grid item xs={12} md={6}>
          <FormRowStatus
            id='row_status'
            control={control}
            isLoading={isLoadingTypes}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default CerrtificateTemplatePopup;
