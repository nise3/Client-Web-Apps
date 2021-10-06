import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import CustomTextInput from '../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {
  isResponseSuccess,
  isValidationError,
} from '../../@softbd/utilities/helpers';
import SubmitButton from '../../@softbd/elements/button/SubmitButton/SubmitButton';
import IntlMessages from '../../@crema/utility/IntlMessages';
import {setServerValidationErrors} from '../../@softbd/utilities/validationErrorHandler';
import {
  createRankType,
  updateRankType,
} from '../../services/organaizationManagement/RankTypeService';
import yup from '../../@softbd/libs/yup';
import useNotiStack from '../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import CustomDateTimeField from '../../@softbd/elements/input/CustomDateTimeField';
import {Box, Card, CardContent, Typography} from '@mui/material';
import YouthProfileNavigationSidebar from './component/YouthProfileNavigationSidebar';
import {useRouter} from 'next/router';

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

const CertificateAddEditPage: FC<CertificateAddEditPageProps> = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();

  const router = useRouter();
  const {certificateId} = router.query;

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
  const itemId = Number(certificateId);
  const isEdit = itemId != null;

  useEffect(() => {
    if (Number(certificateId)) {
      setItemData({
        certification: 'ML',
        institution: 'h20.io',
        location: 'australia',
        start_date: '16 oct 2021',
        end_date: '30 dec 2021',
        certificate_file: '',
      });
    }
  }, [certificateId]);

  useEffect(() => {
    if (itemData) {
      reset({
        exam: itemData.exam,
        board: itemData?.board,
        institution: itemData?.institution,
        roll_no: itemData?.roll_no,
        reg_no: itemData?.reg_no,
        group: itemData?.group,
        result_type: itemData?.result_type,
        result: itemData?.result,
        passing_year: itemData?.passing_year,
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
    } else if (isResponseSuccess(response) && !isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_created_successfully'
          values={{subject: <IntlMessages id='rank_types.label' />}}
        />,
      );
    } else if (isValidationError(response)) {
      setServerValidationErrors(response.errors, setError, validationSchema);
    }
  };

  return (
    <Box mt={4} mb={2}>
      <Grid container justifyContent={'center'} spacing={2}>
        <Grid item xs={3}>
          <YouthProfileNavigationSidebar />
        </Grid>
        <Grid item xs={5}>
          <Card>
            <CardContent>
              <Typography variant={'h6'} mb={4}>
                {messages['certification.label']}
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <CustomTextInput
                      id='certification'
                      label={messages['certification.label']}
                      register={register}
                      errorInstance={errors}
                      isLoading={false}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextInput
                      id='institute'
                      label={messages['institute.label']}
                      register={register}
                      errorInstance={errors}
                      isLoading={false}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextInput
                      id='location'
                      label={messages['common.location']}
                      register={register}
                      errorInstance={errors}
                      isLoading={false}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomDateTimeField
                      id='start_date'
                      label={messages['job_experience.start_date']}
                      register={register}
                      errorInstance={errors}
                      isLoading={false}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <CustomDateTimeField
                      id='end_date'
                      label={messages['job_experience.end_date']}
                      register={register}
                      errorInstance={errors}
                      isLoading={false}
                    />
                  </Grid>
                  <Grid item xs={12}>
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
                    <SubmitButton
                      isSubmitting={isSubmitting}
                      isLoading={false}
                    />
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CertificateAddEditPage;
