import React, {useEffect, useMemo, useState} from 'react';
import {Box, Button, Grid, Typography} from '@mui/material';
import {useIntl} from 'react-intl';
import yup from '../../../../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {processServerSideErrors} from '../../../../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../../../../@softbd/hooks/useNotifyStack';
import CustomFormSelect from '../../../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import CustomFormSwitch from '../../../../../@softbd/elements/input/CustomFormSwitch';
import Tooltip from '@mui/material/Tooltip';
import {Help} from '@mui/icons-material';
import CustomTextInput from '../../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';

interface Props {
  jobId: string;
  onBack: () => void;
  onContinue: () => void;
}

const initialValue = {
  is_company_name_visible: false,
  is_company_address_visible: false,
  is_company_business_visible: false,
  company_industry_type: '',
  company_name: '',
  company_name_en: '',
};

const CompanyInfoVisibility = ({jobId, onBack, onContinue}: Props) => {
  const {messages} = useIntl();
  const {successStack, errorStack} = useNotiStack();
  const [isShowCompanyName, setIsShowCompanyName] = useState<boolean>(false);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      is_company_name_visible: yup
        .boolean()
        .required()
        .label(messages['common.company_name_bn'] as string),
      company_name: yup
        .mixed()
        .label(messages['common.company_name_bn'] as string)
        .when('is_company_name_visible', {
          is: true,
          then: yup.string().required(),
        }),
      company_industry_type: yup
        .string()
        .required()
        .label(messages['job_posting.company_type'] as string),
    });
  }, [messages]);

  const {
    register,
    control,
    setError,
    reset,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    reset(initialValue);
  }, []);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      console.log('data-->', data);
      data.job_id = jobId;
      //do data save work here
      //const response = await saveCompanyInfoVisibility(data);
      successStack('Data saved successfully');
      onContinue();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <Box mt={2}>
      <Typography mb={3} variant={'h5'} fontWeight={'bold'}>
        {messages['job_posting.company_info_visibility']}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <CustomFormSwitch
              required
              id={'is_company_name_visible'}
              label={messages['common.company_name_bn']}
              additionalInfo={
                <Tooltip
                  arrow
                  title={
                    messages['job_posting.company_info_name_tooltip'] as string
                  }>
                  <Help
                    sx={{
                      marginLeft: '8px',
                    }}
                  />
                </Tooltip>
              }
              yesLabel={messages['common.show'] as string}
              noLabel={messages['common.hide'] as string}
              register={register}
              defaultChecked={true}
              isLoading={false}
              onChange={(value: boolean) => {
                setIsShowCompanyName(!value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            {isShowCompanyName && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <CustomTextInput
                    required
                    id='company_name'
                    label={messages['common.company_name_bn']}
                    register={register}
                    errorInstance={errors}
                    isLoading={false}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomTextInput
                    required
                    id='company_name_en'
                    label={messages['common.company_name_en']}
                    register={register}
                    errorInstance={errors}
                    isLoading={false}
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid item xs={12}>
            <CustomFormSwitch
              required
              id={'is_company_address_visible'}
              label={messages['common.company_address']}
              additionalInfo={
                <Tooltip
                  arrow
                  title={
                    messages[
                      'job_posting.company_info_address_tooltip'
                    ] as string
                  }>
                  <Help
                    sx={{
                      marginLeft: '8px',
                    }}
                  />
                </Tooltip>
              }
              yesLabel={messages['common.show'] as string}
              noLabel={messages['common.hide'] as string}
              register={register}
              defaultChecked={true}
              isLoading={false}
            />
          </Grid>
          <Grid item xs={12} md={10}>
            <CustomFormSelect
              required
              id='company_industry_type'
              label={messages['job_posting.company_type']}
              isLoading={false}
              control={control}
              options={[]}
              optionValueProp={'id'}
              optionTitleProp={['title_en', 'title']}
              errorInstance={errors}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <CustomFormSwitch
              id={'is_company_business_visible'}
              label={messages['common.company_business']}
              additionalInfo={
                <Tooltip
                  arrow
                  title={
                    messages[
                      'job_posting.company_info_business_tooltip'
                    ] as string
                  }>
                  <Help
                    sx={{
                      marginLeft: '8px',
                    }}
                  />
                </Tooltip>
              }
              yesLabel={messages['common.show'] as string}
              noLabel={messages['common.hide'] as string}
              register={register}
              defaultChecked={true}
              isLoading={false}
            />
          </Grid>
        </Grid>

        <Box mt={3} display={'flex'} justifyContent={'space-between'}>
          <Button onClick={onBack} variant={'outlined'} color={'primary'}>
            {messages['common.previous']}
          </Button>
          <Button
            disabled={isSubmitting}
            type={'submit'}
            variant={'contained'}
            color={'primary'}>
            {messages['common.save_and_continue']}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CompanyInfoVisibility;