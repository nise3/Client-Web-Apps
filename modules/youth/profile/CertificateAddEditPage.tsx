import {Grid, Card, CardContent, Zoom} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo} from 'react';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {
  isResponseSuccess,
  isValidationError,
} from '../../../@softbd/utilities/helpers';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {setServerValidationErrors} from '../../../@softbd/utilities/validationErrorHandler';

import yup from '../../../@softbd/libs/yup';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import {DialogTitle} from '../../../@softbd/modals/CustomMuiModal/CustomMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {YouthCertificate} from '../../../services/youthManagement/typing';
import {
  createCertificate,
  updateCertificate,
} from '../../../services/youthManagement/CertificateService';
import {useFetchYouthCertificate} from '../../../services/youthManagement/hooks';

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
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      certification_name: yup
        .string()
        .required()
        .label(messages['certification.label'] as string),
      certification_name_en: yup
        .string()
        .nullable()
        .label(messages['certification.label'] as string),
      institute_name: yup
        .string()
        .required()
        .label(messages['common.institute_name_bn'] as string),
      institute_name_en: yup
        .string()
        .nullable()
        .label(messages['common.institute_name_en'] as string),
      location: yup
        .string()
        .required()
        .label(messages['common.location_bn'] as string),
      location_en: yup
        .string()
        .nullable()
        .label(messages['common.location_en'] as string),
      start_date: yup
        .string()
        .nullable()
        .label(messages['common.start_date'] as string),
      end_date: yup
        .string()
        .nullable()
        .label(messages['common.end_date'] as string),
      certificate_file_path: yup
        .string()
        .required(messages['certificate.upload'] as string)
        .label(messages['certificate.upload'] as string),
    });
  }, [messages]);

  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const isEdit = itemId != null;
  const {
    data: itemData,
    mutate: certificateMutate,
    isLoading,
  } = useFetchYouthCertificate(itemId);

  useEffect(() => {
    if (itemData) {
      reset({
        certification_name: itemData.certification_name,
        certification_name_en: itemData?.certification_name_en,
        institute_name: itemData?.institute_name,
        institute_name_en: itemData?.institute_name_en,
        location: itemData?.location,
        location_en: itemData?.location_en,
        start_date: itemData?.start_date,
        end_date: itemData?.end_date,
        certificate_file_path: itemData.certification_file_path,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<YouthCertificate> = async (
    data: YouthCertificate,
  ) => {
    const response = itemId
      ? await updateCertificate(itemId, data)
      : await createCertificate(data);
    if (isResponseSuccess(response) && isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='certificate.label' />}}
        />,
      );
      certificateMutate();
      props.onClose();
    } else if (isResponseSuccess(response) && !isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_created_successfully'
          values={{subject: <IntlMessages id='certificate.label' />}}
        />,
      );
      certificateMutate();
      props.onClose();
    } else if (isValidationError(response)) {
      setServerValidationErrors(response.errors, setError, validationSchema);
    }
  };

  return (
    <Zoom in={true}>
      <Card>
        <CardContent sx={{position: 'relative'}}>
          <DialogTitle onClose={props.onClose}>
            {messages['common.certificate']}
          </DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <CustomTextInput
                  id='certification_name'
                  label={messages['certificate.name_bn']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item md={6}>
                <CustomTextInput
                  id='certification_name_en'
                  label={messages['certificate.name_en']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item md={6}>
                <CustomTextInput
                  id='institute_name'
                  label={messages['common.institute_name_bn']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item md={6}>
                <CustomTextInput
                  id='institute_name_en'
                  label={messages['common.institute_name_en']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item md={6}>
                <CustomTextInput
                  id='location'
                  label={messages['common.location_bn']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item md={6}>
                <CustomTextInput
                  id='location_en'
                  label={messages['common.location_en']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item md={3} xs={12}>
                <CustomDateTimeField
                  id='start_date'
                  label={messages['common.start_date']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item md={3} xs={12}>
                <CustomDateTimeField
                  id='end_date'
                  label={messages['common.end_date']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item md={6}>
                <CustomTextInput
                  id='certificate_file_path'
                  label={messages['common.certificate']}
                  type={'file'}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={4} justifyContent={'flex-end'}>
                  <Grid item>
                    <CancelButton
                      onClick={props.onClose}
                      isLoading={isLoading}
                    />
                  </Grid>
                  <Grid item>
                    <SubmitButton
                      isSubmitting={isSubmitting}
                      isLoading={isLoading}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Zoom>
  );
};

export default CertificateAddEditPage;
