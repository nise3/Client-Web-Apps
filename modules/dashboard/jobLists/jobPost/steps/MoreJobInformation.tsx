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
  WorkPlaceTypes,
} from '../enums/JobPostEnums';
import CustomFilterableFormSelect from '../../../../../@softbd/elements/input/CustomFilterableFormSelect';
import {
  useFetchJobAdditionalInformation,
  useFetchJobLocations,
} from '../../../../../services/IndustryManagement/hooks';
import {saveAdditionalJobInformation} from '../../../../../services/IndustryManagement/JobService';

interface Props {
  jobId: string;
  onBack: () => void;
  onContinue: () => void;
  setLatestStep: (step: number) => void;
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

const initialValue = {
  job_levels: [],
  job_context: '',
  job_context_en: '',
  job_responsibilities: '',
  job_responsibilities_en: '',
  work_places: [],
  job_place_type: 1,
  is_other_benefits: OtherBenefit.YES,
  salary_min: '',
  salary_max: '',
  is_salary_info_show: SalaryShowOption.SALARY,
  is_salary_compare_to_expected_salary: '',
  is_salary_alert_excessive_than_given_salary_range: 0,
  salary_review: '',
  festival_bonus: '',
  additional_salary_info: '',
  additional_salary_info_en: '',
  other_benefits: [],
  lunch_facilities: '',
  others: '',
};

const MoreJobInformation = ({
  jobId,
  onBack,
  onContinue,
  setLatestStep,
}: Props) => {
  const {messages} = useIntl();
  const {successStack, errorStack} = useNotiStack();

  const [isWorkAtOffice, setIsWorkAtOffice] = useState<boolean>(false);
  const [isWorkFromHome, setIsWorkFromHome] = useState<boolean>(false);
  const [isCompareProvidedExpectedSalary, setIsCompareProvidedExpectedSalary] =
    useState<boolean>(false);
  const [hasOtherBenefits, setHasOtherBenefits] = useState<boolean>(true);
  const {data: additionalInfo} = useFetchJobAdditionalInformation(jobId);
  const [isReady, setIsReady] = useState<boolean>(false);

  const {data: jobLocations, isLoading: isLoadingJobLocations} =
    useFetchJobLocations();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      job_levels: yup
        .array()
        .of(yup.number())
        .min(1)
        .label(messages['label.job_level'] as string),
      job_responsibilities: yup
        .string()
        .required()
        .label(messages['common.job_responsibility'] as string),
      job_locations: yup
        .array()
        .of(yup.object().shape({}))
        .min(1)
        .label(messages['common.job_location'] as string),
      is_other_benefits: yup
        .string()
        .required()
        .label(messages['common.compensation_other_benefits'] as string),
      other_benefits: yup
        .mixed()
        .label(messages['common.facilities'] as string)
        .when('is_other_benefits', {
          is: (value: any) => value == 1,
          then: yup.array().of(yup.object().shape({})).min(1),
        }),
      is_salary_info_show: yup
        .number()
        .required()
        .label(messages['label.salary_details_option'] as string),
      salary_min: yup
        .mixed()
        .label(messages['label.min_salary'] as string)
        .when('is_salary_info_show', {
          is: (value: any) => value == SalaryShowOption.SALARY,
          then: yup.string().trim().required(),
        }),
      salary_max: yup
        .mixed()
        .label(messages['label.max_salary'] as string)
        .when('is_salary_info_show', {
          is: (value: any) => value == SalaryShowOption.SALARY,
          then: yup.string().trim().required(),
        }),
      work_places: yup
        .array()
        .of(yup.boolean())
        .min(1)
        .label(messages['common.workplace'] as string),
    });
  }, [messages]);
  const {
    register,
    setError,
    control,
    reset,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (additionalInfo && additionalInfo?.latest_step) {
      const latestStep = additionalInfo.latest_step;
      delete additionalInfo?.latest_step;

      if (latestStep >= 2) {
        let data = {
          job_levels: getJobLevelIds(additionalInfo?.job_levels),
          job_context: additionalInfo?.job_context,
          job_context_en: additionalInfo?.job_context_en,
          job_responsibilities: additionalInfo?.job_responsibilities,
          job_responsibilities_en: additionalInfo?.job_responsibilities_en,
          job_locations: getJobLocations(additionalInfo?.job_locations),
          job_place_type: additionalInfo?.job_place_type,
          is_other_benefits: additionalInfo?.is_other_benefits,
          salary_min: additionalInfo?.salary_min,
          salary_max: additionalInfo?.salary_max,
          is_salary_info_show: additionalInfo?.is_salary_info_show,
          is_salary_alert_excessive_than_given_salary_range:
            additionalInfo?.is_salary_alert_excessive_than_given_salary_range,
          salary_review: additionalInfo?.salary_review,
          festival_bonus: additionalInfo?.festival_bonus,
          lunch_facilities: additionalInfo?.lunch_facilities,
          additional_salary_info: additionalInfo?.additional_salary_info,
          additional_salary_info_en: additionalInfo?.additional_salary_info_en,
          other_benefits: additionalInfo?.other_benefits,
          others: additionalInfo?.others,
          others_en: additionalInfo?.others_en,
          work_places: [false, false],
        };
        (additionalInfo?.work_places || []).map((workPlace: any) => {
          if (workPlace.work_place_id == WorkPlaceTypes.HOME) {
            data.work_places[0] = true;
            setIsWorkFromHome(true);
          } else if (workPlace.work_place_id == WorkPlaceTypes.OFFICE) {
            data.work_places[1] = true;
            setIsWorkAtOffice(true);
          }
        });

        setIsReady(true);
        reset(data);

        setIsCompareProvidedExpectedSalary(
          additionalInfo?.is_salary_compare_to_expected_salary == 1,
        );
        setHasOtherBenefits(
          additionalInfo?.is_other_benefits == OtherBenefit.YES,
        );
      }
      setLatestStep(latestStep);
    } else {
      reset(initialValue);
    }
  }, [additionalInfo]);

  const getJobLevelIds = (job_levels: any) => {
    let ids: any = [];
    (job_levels || []).map((level: any) => {
      ids.push(level.job_level_id);
    });
    return ids;
  };

  const getJobLocations = (locations: any) => {
    let ids: any = locations?.map((location: any) => location.location_id);

    return (jobLocations || []).filter((location: any) =>
      ids?.includes(location.location_id),
    );
  };

  console.log('errors: ', errors);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      data.job_id = jobId;

      let workPlace = [...data.work_places];
      data.work_places = [];
      if (workPlace[0]) {
        data.work_places.push(WorkPlaceTypes.HOME);
      }
      if (workPlace[1]) {
        data.work_places.push(WorkPlaceTypes.OFFICE);
      }

      data.is_salary_compare_to_expected_salary =
        data.is_salary_compare_to_expected_salary ? 1 : 0;
      data.is_salary_alert_excessive_than_given_salary_range =
        data.is_salary_alert_excessive_than_given_salary_range ? 1 : 0;

      data.is_other_benefits = Number(data.is_other_benefits);

      if (data.is_other_benefits == 1) {
        const benefits: any = [];
        (data.other_benefits || []).map((benefit: any) => {
          benefits.push(benefit.id);
        });
        data.other_benefits = benefits;
      } else {
        delete data.other_benefits;
        delete data.salary_review;
        delete data.festival_bonus;
        delete data.lunch_facilities;
        delete data.others;
        delete data.others_en;
      }

      if (data.job_place_type != 1) {
        data.job_place_type = 1;
      }

      const locationIds: any = [];
      data.job_locations.map((location: any) => {
        locationIds.push(location.location_id);
      });
      data.job_locations = locationIds;

      //console.log('data-->', data);
      await saveAdditionalJobInformation(data);

      successStack('Data saved successfully');
      onContinue();
    } catch (error: any) {
      console.log(': ', error);
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return isReady ? (
    <Box mt={3} mb={3}>
      <Typography mb={2} variant={'h5'} fontWeight={'bold'}>
        {messages['job_posting.more_job_info']}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CustomFormToggleButtonGroup
              required
              id={'job_levels'}
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
              required
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
            <Body1>
              {messages['common.workplace']}{' '}
              <span style={{color: 'red'}}> *</span>
            </Body1>
            <Box display={'flex'}>
              <CustomCheckbox
                id='work_places[0]'
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
                id='work_places[1]'
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
              required
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
            <div style={{marginTop: '15px'}} />
            <CustomSelectAutoComplete
              required
              id='job_locations'
              label={messages['common.job_location']}
              isLoading={isLoadingJobLocations}
              control={control}
              options={jobLocations || []}
              optionTitleProp={['title']}
              optionValueProp={'location_id'}
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
                required
                id='salary_min'
                type={'number'}
                label={messages['label.min_salary']}
                register={register}
                errorInstance={errors}
                isLoading={false}
              />
              <HorizontalRule fontSize={'small'} sx={{margin: 'auto'}} />
              <CustomTextInput
                required
                id='salary_max'
                type={'number'}
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
                  key: 1,
                  label: messages['common.yes'],
                },
                {
                  key: 0,
                  label: messages['common.no'],
                },
              ]}
              control={control}
              defaultValue={0}
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
              defaultValue={
                hasOtherBenefits ? OtherBenefit.YES : OtherBenefit.NO
              }
              onChange={(value: number) => {
                setHasOtherBenefits(value == OtherBenefit.YES);
              }}
            />
          </Grid>

          {hasOtherBenefits && (
            <React.Fragment>
              <Grid item xs={12}>
                <CustomSelectAutoComplete
                  required
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
  ) : (
    <></>
  );
};

export default MoreJobInformation;
