import {Grid, Card, CardContent, Zoom} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {
  isResponseSuccess,
  isValidationError,
} from '../../../@softbd/utilities/helpers';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {setServerValidationErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {
  createRankType,
  updateRankType,
} from '../../../services/organaizationManagement/RankTypeService';
import yup from '../../../@softbd/libs/yup';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import {DialogTitle} from '../../../@softbd/modals/CustomMuiModal/CustomMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';

interface CertificateAddEditPageProps {
  itemId: number | null;
  onClose: () => void;
}

const initialValues = {
  certification: '',
  institution: '',
  location: '',
  start_date: '',
  end_date: '',
  certificate_file: '',
};

const CertificateAddEditPage: FC<CertificateAddEditPageProps> = ({
  itemId,
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  console.log('certificate id :', itemId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      certification: yup
        .string()
        .label(messages['certification.label'] as string),
      institute: yup.string().label(messages['common.institute'] as string),
      location: yup.string().label(messages['common.location'] as string),
      start_date: yup.string().label(messages['common.start_date'] as string),
      end_date: yup.string().label(messages['common.end_date'] as string),
      certificate_file: yup
        .string()
        .label(messages['certificate.upload_certificate'] as string),
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

  const [itemData, setItemData] = useState<any>(null);
  const isEdit = itemId != null;

  useEffect(() => {
    if (itemId) {
      setItemData({
        certification: 'ML',
        institute: 'h20.io',
        location: 'australia',
        start_date: '2021-10-10',
        end_date: '2021-12-12',
        certificate_file: '',
      });
    }
  }, [itemId]);

  useEffect(() => {
    if (itemData) {
      reset({
        certification: itemData.certification,
        institute: itemData?.institute,
        location: itemData?.location,
        start_date: itemData?.start_date,
        end_date: itemData?.end_date,
        certification_date: itemData?.certification_date,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<any> = async (data) => {
    const response = itemId
      ? await updateRankType(itemId, data)
      : await createRankType(data);
    if (isResponseSuccess(response) && isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='rank_types.label' />}}
        />,
      );
      props.onClose();
    } else if (isResponseSuccess(response) && !isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_created_successfully'
          values={{subject: <IntlMessages id='rank_types.label' />}}
        />,
      );
      props.onClose();
    } else if (isValidationError(response)) {
      setServerValidationErrors(response.errors, setError, validationSchema);
    }
  };

  return (
    <Zoom in={true}>
      <Grid container justifyContent={'center'} spacing={2}>
        <Grid item>
          <Card>
            <CardContent sx={{position: 'relative'}}>
              <DialogTitle onClose={props.onClose}>
                {messages['common.certificate']}
              </DialogTitle>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
                <Grid container spacing={5}>
                  <Grid item md={6}>
                    <CustomTextInput
                      id='certification'
                      label={messages['certification.label']}
                      register={register}
                      errorInstance={errors}
                      isLoading={false}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <CustomTextInput
                      id='institute'
                      label={messages['institute.label']}
                      register={register}
                      errorInstance={errors}
                      isLoading={false}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <CustomTextInput
                      id='location'
                      label={messages['common.location']}
                      register={register}
                      errorInstance={errors}
                      isLoading={false}
                    />
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <CustomDateTimeField
                      id='start_date'
                      label={messages['job_experience.start_date']}
                      register={register}
                      errorInstance={errors}
                      isLoading={false}
                    />
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <CustomDateTimeField
                      id='end_date'
                      label={messages['job_experience.end_date']}
                      register={register}
                      errorInstance={errors}
                      isLoading={false}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <CustomTextInput
                      id='certificate_file'
                      label={messages['common.certificate']}
                      type={'file'}
                      register={register}
                      errorInstance={errors}
                      isLoading={false}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={4} justifyContent={'flex-end'}>
                      <Grid item>
                        <CancelButton
                          onClick={props.onClose}
                          isLoading={false}
                        />
                      </Grid>
                      <Grid item>
                        <SubmitButton
                          isSubmitting={isSubmitting}
                          isLoading={false}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Zoom>
  );
};

export default CertificateAddEditPage;
