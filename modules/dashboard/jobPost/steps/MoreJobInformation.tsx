import React, {useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import yup from '../../../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Box, Button, Grid, Typography} from '@mui/material';
import CustomTextInput from '../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {processServerSideErrors} from '../../../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import {Body1, Body2} from '../../../../@softbd/elements/common';
import CustomCheckbox from '../../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';
import CustomSelectAutoComplete from '../../../youth/registration/CustomSelectAutoComplete';
import ToggleButton from '@mui/material/ToggleButton';
import CheckIcon from '@mui/icons-material/Check';
import {HorizontalRule} from '@mui/icons-material';
import FormRadioButtons from '../../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';

interface Props {
  onBack: () => void;
  onContinue: () => void;
}

const MoreJobInformation = ({onBack, onContinue}: Props) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();

  const [isWorkAtOffice, setIsWorkAtOffice] = useState<boolean>(false);
  const [isWorkFromHome, setIsWorkFromHome] = useState<boolean>(false);
  const [isCompareProvidedExpectedSalary, setIsCompareProvidedExpectedSalary] =
    useState<boolean>(false);
  // const [isAlertSalaryRange, setIsAlertSalaryRange] = useState<boolean>(false);

  const validationSchema = useMemo(() => {
    return yup.object().shape({});
  }, [messages]);
  const {
    register,
    setError,
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      console.log('data', data);

      //do data save work here

      onContinue();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <Box mt={3} mb={3}>
      <Typography mb={2} variant={'h5'} fontWeight={'bold'}>
        {messages['job_posting.more_job_info']}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CustomTextInput
              id='job_context'
              label={messages['common.job_context']}
              register={register}
              errorInstance={errors}
              isLoading={false}
              multiline={true}
              rows={3}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextInput
              id='job_responsibility'
              label={messages['common.job_responsibility']}
              register={register}
              errorInstance={errors}
              isLoading={false}
              multiline={true}
              rows={3}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Body1>{messages['common.workplace']}</Body1>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
              <CustomCheckbox
                id='work_at_office'
                label={messages['common.work_at_office']}
                register={register}
                errorInstance={errors}
                checked={isWorkAtOffice}
                onChange={() => {
                  setIsWorkAtOffice((prev) => !prev);
                }}
                isLoading={false}
              />
              <CustomCheckbox
                id='work_from_home'
                label={messages['common.work_from_home']}
                register={register}
                errorInstance={errors}
                checked={isWorkFromHome}
                onChange={() => {
                  setIsWorkFromHome((prev) => !prev);
                }}
                isLoading={false}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Body1>{messages['common.job_location']}</Body1>
            <ToggleButton
              size={'small'}
              sx={{mb: '20px'}}
              value='check'
              selected={true}
              onChange={() => {
                console.log('selected!');
              }}>
              <CheckIcon sx={{mr: '10px'}} /> {messages['label.inside_bd']}
            </ToggleButton>
            <CustomSelectAutoComplete
              id='job_location'
              label=''
              control={control}
              options={[]}
              optionTitleProp={['title']}
              optionValueProp={'id'}
              errorInstance={errors}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Body1 sx={{mb: '10px'}}>{messages['industry.salary']}</Body1>
          <Box sx={{display: 'flex'}} justifyContent={'space-between'}>
            <CustomTextInput
              id='min_salary'
              label={messages['label.min_salary']}
              register={register}
              errorInstance={errors}
              isLoading={false}
            />
            <HorizontalRule fontSize={'small'} sx={{margin: 'auto'}} />
            <CustomTextInput
              id='max_salary'
              label={messages['label.max_salary']}
              register={register}
              errorInstance={errors}
              isLoading={false}
            />
            <Body2 sx={{ml: '10px', display: 'flex', alignItems: 'center'}}>
              Monthly
            </Body2>
          </Box>
          <Box sx={{mt: '20px'}}>
            <FormRadioButtons
              id='salary_details_option'
              label={'label.salary_details_option'}
              radios={[
                {
                  key: '1',
                  label: messages['label.show_salary'],
                },
                {
                  key: '2',
                  label: messages['label.show_nothing'],
                },
                {
                  key: '3',
                  label: messages['label.show_negotiable'],
                },
              ]}
              control={control}
              // defaultValue={'2'}
              isLoading={false}
            />
          </Box>
          <Body2 sx={{my: '10px'}}>
            {messages['label.compare_provided_expected_salary']}
            <CustomCheckbox
              id='alert_salary_range'
              label={messages['common.yes']}
              register={register}
              errorInstance={errors}
              checked={isCompareProvidedExpectedSalary}
              onChange={() => {
                setIsCompareProvidedExpectedSalary((prev) => !prev);
              }}
              isLoading={false}
            />
          </Body2>
          <Box sx={{my: '10px'}}>
            <FormRadioButtons
              id='alert_salary_range'
              label={'label.alert_salary_range'}
              radios={[
                {
                  key: '1',
                  label: messages['common.yes'],
                },
                {
                  key: '2',
                  label: messages['common.no'],
                },
              ]}
              control={control}
              // defaultValue={'1'}
              isLoading={false}
            />

            {/*{messages['label.alert_salary_range']}*/}
            {/*<CustomCheckbox*/}
            {/*  id='alert_salary_range'*/}
            {/*  label={messages['common.yes']}*/}
            {/*  register={register}*/}
            {/*  errorInstance={errors}*/}
            {/*  checked={isAlertSalaryRange}*/}
            {/*  onChange={() => {*/}
            {/*    setIsAlertSalaryRange((prev) => !prev);*/}
            {/*  }}*/}
            {/*  isLoading={false}*/}
            {/*/>*/}
          </Box>
        </Grid>

        <Box display={'flex'} justifyContent={'space-between'} mt={'15px'}>
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

export default MoreJobInformation;
