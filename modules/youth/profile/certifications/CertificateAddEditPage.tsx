import {Box, Grid, Zoom} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import CustomTextInput from '../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {getMomentDateFormat} from '../../../../@softbd/utilities/helpers';
import SubmitButton from '../../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {processServerSideErrors} from '../../../../@softbd/utilities/validationErrorHandler';

import yup from '../../../../@softbd/libs/yup';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import CustomDateTimeField from '../../../../@softbd/elements/input/CustomDateTimeField';
import CancelButton from '../../../../@softbd/elements/button/CancelButton/CancelButton';
import {YouthCertificate} from '../../../../services/youthManagement/typing';
import {
  createCertificate,
  updateCertificate,
} from '../../../../services/youthManagement/CertificateService';
import {useFetchYouthCertificate} from '../../../../services/youthManagement/hooks';
import CustomHookForm from '../component/CustomHookForm';
import useSuccessMessage from '../../../../@softbd/hooks/useSuccessMessage';
import FileUploadComponent from '../../../filepond/FileUploadComponent';

interface CertificateAddEditPageProps {
  itemId: number | null;
  onClose: () => void;
}

const initialValues = {
  certification_name: '',
  institute_name: '',
  location: '',
  start_date: '',
  end_date: '',
  certificate_file_path: '',
};

const CertificateAddEditPage: FC<CertificateAddEditPageProps> = ({
  itemId,
  onClose: onCertificationAddEditPageClose,
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const {
    data: itemData,
    mutate: certificateMutate,
    isLoading,
  } = useFetchYouthCertificate(itemId);

  const [isStartOrEndDateGiven, setIsStartOrEndDateGiven] =
    useState<boolean>(false);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      certification_name: yup
        .string()
        .required()
        .label(messages['certification.label'] as string),
      institute_name: yup
        .string()
        .required()
        .label(messages['common.institute_name_bn'] as string),
      location: yup
        .string()
        .required()
        .label(messages['common.location_bn'] as string),
      start_date: isStartOrEndDateGiven
        ? yup
            .string()
            .required()
            .matches(/(19|20)\d\d-[01]\d-[0123]\d/)
            .label(messages['common.start_date'] as string)
        : yup.string(),
      end_date: isStartOrEndDateGiven
        ? yup
            .string()
            .required()
            .matches(/(19|20)\d\d-[01]\d-[0123]\d/)
            .label(messages['common.end_date'] as string)
        : yup.string(),
      certificate_file_path: yup
        .string()
        .required()
        .label(messages['certificate.upload'] as string),
    });
  }, [messages, isStartOrEndDateGiven]);

  const {
    register,
    reset,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });
  const watchStartDate: any = watch(['start_date', 'end_date']);

  useEffect(() => {
    if (itemData) {
      reset({
        certification_name: itemData.certification_name,
        certification_name_en: itemData?.certification_name_en,
        institute_name: itemData?.institute_name,
        institute_name_en: itemData?.institute_name_en,
        location: itemData?.location,
        location_en: itemData?.location_en,
        start_date: itemData?.start_date
          ? getMomentDateFormat(itemData.start_date, 'YYYY-MM-DD')
          : '',
        end_date: itemData?.end_date
          ? getMomentDateFormat(itemData?.end_date, 'YYYY-MM-DD')
          : '',
        certificate_file_path: itemData?.certificate_file_path,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  useEffect(() => {
    if (watchStartDate[0] || watchStartDate[0]) {
      setIsStartOrEndDateGiven(true);
    } else {
      setIsStartOrEndDateGiven(false);
    }
  }, [watchStartDate]);

  const onSubmit: SubmitHandler<YouthCertificate> = async (
    data: YouthCertificate,
  ) => {
    try {
      if (itemId) {
        await updateCertificate(itemId, data);
        updateSuccessMessage('certificate.label');
      } else {
        await createCertificate(data);
        createSuccessMessage('certificate.label');
      }
      certificateMutate();
      onCertificationAddEditPageClose();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <Zoom in={true}>
      <Box>
        <CustomHookForm
          title={messages['common.certificate']}
          handleSubmit={handleSubmit(onSubmit)}
          actions={
            <React.Fragment>
              <CancelButton
                onClick={onCertificationAddEditPageClose}
                isLoading={isLoading}
              />
              <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
            </React.Fragment>
          }
          onClose={onCertificationAddEditPageClose}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='certification_name'
                label={messages['certificate.name_bn']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='certification_name_en'
                label={messages['certificate.name_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='institute_name'
                label={messages['common.institute_name_bn']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='institute_name_en'
                label={messages['common.institute_name_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='location'
                label={messages['common.location_bn']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='location_en'
                label={messages['common.location_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <CustomDateTimeField
                id='start_date'
                label={messages['common.start_date']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <CustomDateTimeField
                id='end_date'
                label={messages['common.end_date']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FileUploadComponent
                id='certificate_file_path'
                defaultFileUrl={itemData?.certificate_file_path}
                acceptedFileTypes={['image/*', 'application/pdf']}
                errorInstance={errors}
                setValue={setValue}
                register={register}
                label={messages['common.certificate']}
                required={true}
              />
            </Grid>
          </Grid>
        </CustomHookForm>
      </Box>
    </Zoom>
  );
};

export default CertificateAddEditPage;
