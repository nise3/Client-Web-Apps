import { yupResolver } from '@hookform/resolvers/yup';
import Grid from '@mui/material/Grid';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import { isBreakPointUp } from '../../../@crema/utility/Utils';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import IconBatch from '../../../@softbd/icons/IconBatch';
import yup from '../../../@softbd/libs/yup';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import { getCertificateByResultType } from '../../../services/CertificateAuthorityManagement/CertificateService';
import { useFetchResultTypes } from '../../../services/CertificateAuthorityManagement/hooks';
import {
  updateBatch
} from '../../../services/instituteManagement/BatchService';
import { ICertificate, ICertificateBatchSetting } from '../../../shared/Interface/certificates';
import { IBatch } from '../../../shared/Interface/institute.interface';



interface CertificateTemplatePopupProps {
  // itemId: number,
  batch: ICertificateBatchSetting,
  onClose: () => void;
  refreshDataTable: () => void;
}

// const initialValues = {
//   // certificate_type: '',
//   certificate_id: ''
// };

const CerrtificateTemplatePopup: FC<CertificateTemplatePopupProps> = ({
  batch,
  refreshDataTable,
  ...props
}) => {
  // console.log('item id', itemId)
  const { messages } = useIntl();
  //@ts-ignore
  const { data: certificateTypes, isLoading: isLoadingTypes } = useFetchResultTypes();
  const [certificateTypeId, setCertificateTypeId] = useState<number>();
  const [certificateId, setCertificateId] = useState<number>();
  const [isTemplateEditable, setIsTemplateEditable] = useState<boolean>();
  const [certificatesList, setCertificatesList] = useState<
    Array<ICertificate> | []
  >([]);

  // const {
  //   data: itemData,
  //   isLoading,
  //   mutate: mutateBatch,
  // } = useFetchBatch(itemId);

  console.log('batch data ', batch)

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      certificate_type: yup
        .string()
        .trim()
        .required()
        .label(messages['certificate.certificate_type'] as string),
      certificate_id: yup
        .string()
        .trim()
        .required()
        .label(messages['common.certificate'] as string),
    });
    // }, [messages, authUser]);
  }, [messages]);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ICertificateBatchSetting>({
    resolver: yupResolver(validationSchema),
  });



  useEffect(() => {
    if (batch) {
      setCertificateId(batch.certificate_id);
      reset({
        certificate_type: batch.certificate_type,
        certificate_id: batch.certificate_id
      })
    }
  }, [batch])

  useEffect(() => {
    if (certificateId) {
      const certificateOne: ICertificate | undefined = certificatesList.find(e => e.id === certificateId);
      const isExist = certificateOne?.issued_at !== null;
      // console.log('existance ', isExist)
      setIsTemplateEditable(isExist)
    }
  }, [certificateId, certificatesList])



  const changeCertificateTypeAction = useCallback((typeid: number) => {
    setCertificateTypeId(typeid);
  }, []);
  const changeCertificatesAction = useCallback((certificateId: number) => {
    setCertificateId(certificateId);
  }, []);

  useEffect(() => {
    getCertificateByResultType({
      result_type: certificateTypeId,
    }).then((res: any) => {
      setCertificatesList(res.data);
    });
  }, [certificateTypeId]);

  const onSubmit: SubmitHandler<IBatch> = async (data: IBatch) => {
    data.certificate_id = data.certificate_id;
    const datawithcetificateid = { ...batch, ...data };
    // try {
      if (batch.id) {
        await updateBatch(batch.id, datawithcetificateid);
        // mutateBatch();
      }
      props.onClose();
      refreshDataTable();
    // } catch (error: any) {
    //   processServerSideErrors({ error, setError, validationSchema, errorStack });
    // }
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
            values={{ subject: <IntlMessages id='common.certificate_template' /> }}
          />
        </>
      }
      handleSubmit={handleSubmit(onSubmit)}
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoadingTypes} />
          {
            !isTemplateEditable && 
            <SubmitButton isSubmitting={isSubmitting} isLoading={isLoadingTypes} />
          }
          
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
            id='certificate_id'
            label={messages['common.certificate']}
            isLoading={isLoadingTypes}
            control={control}
            options={certificatesList}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
            // isDisabled={certificatesList.find(e=>e.id === certificateId)?.issued_at !== null}
            onChange={changeCertificatesAction}
          />
        </Grid>

        {/* <Grid item xs={12} md={6}>
          <FormRowStatus
            id='row_status'
            control={control}
            isLoading={isLoadingTypes}
          />
        </Grid> */}
      </Grid>
    </HookFormMuiModal>
  );
};

export default CerrtificateTemplatePopup;
