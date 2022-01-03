import React, {useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import yup from '../../../../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Box, Button, Grid, Tooltip, Typography} from '@mui/material';
import CustomTextInput from '../../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {processServerSideErrors} from '../../../../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../../../../@softbd/hooks/useNotifyStack';
import {Body1, Body2, S2} from '../../../../../@softbd/elements/common';
import CustomCheckbox from '../../../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';
import CustomSelectAutoComplete from '../../../../youth/registration/CustomSelectAutoComplete';
import {HelpOutlined, HorizontalRule} from '@mui/icons-material';
import FormRadioButtons from '../../../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import CustomFormToggleButtonGroup from '../../../../../@softbd/elements/input/CustomFormToggleButtonGroup';
import {
  JobLevel,
  LunchFacilityType,
  OtherBenefit,
  SalaryReviewType,
  SalaryShowOption,
} from '../enums/JobPostEnums';
import CustomFilterableFormSelect from '../../../../../@softbd/elements/input/CustomFilterableFormSelect';

interface Props {
  jobId: string;
  onBack: () => void;
  onContinue: () => void;
}

const numberOfFestivalBonus: Array<any> = [];
for (let i = 1; i <= 4; i++) numberOfFestivalBonus.push({id: i, title: i});
const facilities = [
  {
    id: 1,
    title: 'T/A',
  },
  {
    id: 2,
    title: 'Mobile  bill',
  },
  {
    id: 3,
    title: 'Pension Policy',
  },
  {
    id: 4,
    title: 'Tour allowance',
  },
  {
    id: 5,
    title: 'Credit card',
  },
  {
    id: 6,
    title: 'Medical allowance',
  },
  {
    id: 7,
    title: 'Performance bonus',
  },
  {
    id: 8,
    title: 'Profit share',
  },
  {
    id: 9,
    title: 'Provident fund',
  },
  {
    id: 10,
    title: 'Weekly 2 holidays',
  },
  {
    id: 11,
    title: 'Insurance',
  },
  {
    id: 12,
    title: 'Gratuity',
  },
  {
    id: 13,
    title: 'Over time allowance',
  },
];

const initialValue = {};

const MoreJobInformation = ({jobId, onBack, onContinue}: Props) => {
  const {messages} = useIntl();
  const {successStack, errorStack} = useNotiStack();

  const [isWorkAtOffice, setIsWorkAtOffice] = useState<boolean>(false);
  const [isWorkFromHome, setIsWorkFromHome] = useState<boolean>(false);
  const [isCompareProvidedExpectedSalary, setIsCompareProvidedExpectedSalary] =
    useState<boolean>(false);
  // const [isAlertSalaryRange, setIsAlertSalaryRange] = useState<boolean>(false);
  const [hasOtherBenefits, setHasOtherBenefits] = useState<boolean>(true);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      job_level: yup
        .array()
        .of(yup.number())
        .min(1)
        .label(messages['label.job_level'] as string),
      job_responsibilities: yup
        .string()
        .required()
        .label(messages['common.job_responsibility'] as string),
      job_location: yup
        .array()
        .of(yup.number())
        .min(1)
        .label(messages['common.job_location'] as string),
      salary_min: yup
        .number()
        .required()
        .label(messages['label.min_salary'] as string),
      salary_max: yup
        .number()
        .required()
        .label(messages['label.max_salary'] as string),
    });
  }, [messages]);
  const {
    register,
    setError,
    control,
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
      //const response = await saveAdditionalJobInformation(data);
      successStack('Data saved successfully');
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
          <Grid item xs={12}>
            <CustomFormToggleButtonGroup
              required
              id={'job_level'}
              label={messages['label.job_level']}
              buttons={[
                {
                  value: JobLevel.ENTRY,
                  label: messages['label.job_level_entry'],
                },
                {
                  value: JobLevel.MID,
                  label: messages['label.job_level_mid'],
                },
                {
                  value: JobLevel.TOP,
                  label: messages['label.job_level_top'],
                },
              ]}
              control={control}
              errorInstance={errors}
              multiSelect={true}
            />
          </Grid>

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
              id='job_context_en'
              label={messages['common.job_context_en']}
              register={register}
              errorInstance={errors}
              isLoading={false}
              multiline={true}
              rows={3}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextInput
              id='job_responsibilities'
              label={messages['common.job_responsibility']}
              register={register}
              errorInstance={errors}
              isLoading={false}
              multiline={true}
              rows={3}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextInput
              id='job_responsibilities_en'
              label={messages['common.job_responsibility_en']}
              register={register}
              errorInstance={errors}
              isLoading={false}
              multiline={true}
              rows={3}
            />
          </Grid>
          <Grid item xs={12}>
            <Body1>{messages['common.workplace']}</Body1>
            <Box display={'flex'}>
              <CustomCheckbox
                id='work_place[0]'
                label={messages['common.work_from_home']}
                register={register}
                errorInstance={errors}
                checked={isWorkFromHome}
                onChange={() => {
                  setIsWorkFromHome((prev) => !prev);
                }}
                isLoading={false}
              />
              <CustomCheckbox
                id='work_place[1]'
                label={messages['common.work_at_office']}
                register={register}
                errorInstance={errors}
                checked={isWorkAtOffice}
                onChange={() => {
                  setIsWorkAtOffice((prev) => !prev);
                }}
                isLoading={false}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomFormToggleButtonGroup
              id={'job_place_type'}
              label={''}
              buttons={[
                {
                  value: 1,
                  label: messages['label.inside_bd'],
                },
              ]}
              control={control}
              errorInstance={errors}
              defaultValue={1}
            />
            <CustomSelectAutoComplete
              id='job_location'
              label={messages['common.job_location']}
              control={control}
              options={[]}
              optionTitleProp={['title']}
              optionValueProp={'id'}
              errorInstance={errors}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'flex-end'}>
            <Body1 sx={{mb: '10px'}}>{messages['industry.salary']}</Body1>
            <Box sx={{display: 'flex'}} justifyContent={'space-between'}>
              <CustomTextInput
                id='salary_min'
                label={messages['label.min_salary']}
                register={register}
                errorInstance={errors}
                isLoading={false}
              />
              <HorizontalRule fontSize={'small'} sx={{margin: 'auto'}} />
              <CustomTextInput
                id='salary_max'
                label={messages['label.max_salary']}
                register={register}
                errorInstance={errors}
                isLoading={false}
              />
              <Body2 sx={{ml: '10px', display: 'flex', alignItems: 'center'}}>
                Monthly
              </Body2>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <FormRadioButtons
              id='is_salary_info_show'
              label={'label.salary_details_option'}
              radios={[
                {
                  key: SalaryShowOption.SALARY,
                  label: messages['label.show_salary'],
                },
                {
                  key: SalaryShowOption.NOTHING,
                  label: messages['label.show_nothing'],
                },
                {
                  key: SalaryShowOption.NEGOTIABLE,
                  label: messages['label.show_negotiable'],
                },
              ]}
              control={control}
              defaultValue={SalaryShowOption.SALARY}
              isLoading={false}
            />
          </Grid>

          <Grid item xs={12}>
            <S2
              color={'grey.500'}
              sx={{
                fontWeight: '400',
              }}>
              {messages['label.compare_provided_expected_salary']}
            </S2>
            <CustomCheckbox
              id='is_salary_compare_to_expected_salary'
              label={messages['common.yes']}
              register={register}
              errorInstance={errors}
              checked={isCompareProvidedExpectedSalary}
              onChange={() => {
                setIsCompareProvidedExpectedSalary((prev) => !prev);
              }}
              isLoading={false}
            />
          </Grid>

          <Grid item xs={12}>
            <FormRadioButtons
              id='is_salary_alert_excessive_than_given_salary_range'
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
            <Tooltip
              title={messages['label.alert_salary_range_tooltips_text']}
              placement='top'>
              <HelpOutlined />
            </Tooltip>
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextInput
              id='additional_salary_info'
              label={messages['label.additional_salary_info']}
              register={register}
              errorInstance={errors}
              isLoading={false}
              multiline={true}
              rows={3}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextInput
              id='additional_salary_info_en'
              label={messages['label.additional_salary_info_en']}
              register={register}
              errorInstance={errors}
              isLoading={false}
              multiline={true}
              rows={3}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomFormToggleButtonGroup
              id={'is_other_benefits'}
              label={messages['common.compensation_other_benefits']}
              buttons={[
                {
                  value: OtherBenefit.NO,
                  label: messages['common.no'],
                },
                {
                  value: OtherBenefit.YES,
                  label: messages['common.yes'],
                },
              ]}
              control={control}
              errorInstance={errors}
              multiSelect={false}
              defaultValue={OtherBenefit.YES}
              onChange={(value: number) => {
                setHasOtherBenefits(value == OtherBenefit.YES);
              }}
            />
          </Grid>

          {hasOtherBenefits && (
            <React.Fragment>
              <Grid item xs={12}>
                <CustomSelectAutoComplete
                  id='other_benefits'
                  label={messages['common.facilities']}
                  control={control}
                  options={facilities}
                  optionTitleProp={['title']}
                  optionValueProp={'id'}
                  errorInstance={errors}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomFormToggleButtonGroup
                  id={'salary_review'}
                  label={messages['common.salary_review']}
                  buttons={[
                    {
                      value: SalaryReviewType.HALF_YEARLY,
                      label: messages['common.half_yearly'],
                    },
                    {
                      value: SalaryReviewType.YEARLY,
                      label: messages['common.yearly'],
                    },
                  ]}
                  control={control}
                  errorInstance={errors}
                  multiSelect={false}
                  defaultValue={SalaryReviewType.YEARLY}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomFormToggleButtonGroup
                  id={'lunch_facilities'}
                  label={messages['common.lunch_facilities']}
                  buttons={[
                    {
                      value: LunchFacilityType.PARTIALLY_SUBSIDIZE,
                      label: messages['common.partially_subsidize'],
                    },
                    {
                      value: LunchFacilityType.FULL_SUBSIDIZE,
                      label: messages['common.full_subsidize'],
                    },
                  ]}
                  control={control}
                  errorInstance={errors}
                  multiSelect={false}
                  defaultValue={LunchFacilityType.FULL_SUBSIDIZE}
                />
              </Grid>

              <Grid item xs={12}>
                <CustomFilterableFormSelect
                  isLoading={false}
                  id='festival_bonus'
                  label={messages['common.festival_bonus']}
                  options={numberOfFestivalBonus}
                  optionValueProp={'id'}
                  optionTitleProp={['title', 'title_en']}
                  control={control}
                  errorInstance={errors}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextInput
                  id='others'
                  label={messages['common.others']}
                  register={register}
                  errorInstance={errors}
                  multiline={true}
                  rows={3}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextInput
                  id='others_en'
                  label={messages['common.others_en']}
                  register={register}
                  errorInstance={errors}
                  multiline={true}
                  rows={3}
                />
              </Grid>
            </React.Fragment>
          )}
        </Grid>
        <Box display={'flex'} justifyContent={'space-between'} mt={3}>
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