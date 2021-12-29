import React, {useEffect, useMemo, useState} from 'react';
import {Box, Button, Chip, Divider, Grid, Typography} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import yup from '../../../../@softbd/libs/yup';
import {useIntl} from 'react-intl';
import CustomTextInput from '../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {processServerSideErrors} from '../../../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import FormRadioButtons from '../../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import {ServiceTypes} from '../enums/ServiceTypes';
import CustomCheckbox from '../../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';
import CustomFilterableFormSelect from '../../../../@softbd/elements/input/CustomFilterableFormSelect';
import CustomFormToggleButtonGroup from '../../../../@softbd/elements/input/CustomFormToggleButtonGroup';
import {EmploymentStatus} from '../enums/EmploymentStatus';
import CustomDateTimeField from '../../../../@softbd/elements/input/CustomDateTimeField';
import {
  addMonths,
  getMomentDateFormat,
} from '../../../../@softbd/utilities/helpers';
import {Error} from '@mui/icons-material';
import {ResumeReceivingOptions} from '../enums/ResumeReceivingOptions';
import CustomFormSwitch from '../../../../@softbd/elements/input/CustomFormSwitch';

interface Props {
  onContinue: () => void;
}

const initialValue = {
  service_type: ServiceTypes.BASIC_LISTING,
  job_title: '',
  employment_status: [],
  vacancy: '',
  not_applicable: false,
  job_sector_id: '',
  occupation_id: '',
  resume_receiving_status: ResumeReceivingOptions.EMAIL,
  email: '',
  use_nise3_email: true,
  hard_copy: '',
  walk_in_interview: '',
  special_instruction: '',
};

const PrimaryJobInformation = ({onContinue}: Props) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const [isNotApplicable, setIsNotApplicable] = useState<boolean>(false);
  const [resumeReceivingOption, setResumeReceivingOption] = useState<
    number | null
  >(ResumeReceivingOptions.EMAIL);
  const [useNise3Email, setUseNise3Email] = useState<boolean>(true);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      job_title: yup
        .string()
        .required()
        .label(messages['job_posting.job_title'] as string),
      employment_status: yup
        .array()
        .of(yup.number())
        .min(1)
        .label(messages['job_posting.employment_status'] as string),
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
      console.log('data', data);

      //do data save work here

      onContinue();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <Box mt={2}>
      <Typography mb={3} variant={'h5'} fontWeight={'bold'}>
        {messages['job_posting.primary_job_info']}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormRadioButtons
              id='service_type'
              label={'job_posting.service_type'}
              radios={[
                {
                  key: ServiceTypes.BASIC_LISTING,
                  label: messages['job_posting.service_type_basic'],
                },
                {
                  key: ServiceTypes.STAND_OUT_LISTING,
                  label: messages['job_posting.service_type_st_out_listing'],
                },
                {
                  key: ServiceTypes.STAND_OUT_PREMIUM,
                  label: messages['job_posting.service_type_st_out_premium'],
                },
              ]}
              control={control}
              defaultValue={ServiceTypes.BASIC_LISTING}
              isLoading={false}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextInput
              required
              id='job_title'
              label={messages['job_posting.job_title']}
              register={register}
              errorInstance={errors}
              isLoading={false}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={5}>
                <CustomTextInput
                  required={!isNotApplicable}
                  id='vacancy'
                  type={'number'}
                  label={messages['job_posting.no_of_vacancy']}
                  register={register}
                  errorInstance={errors}
                  isLoading={false}
                  disabled={isNotApplicable}
                />
              </Grid>
              <Grid item xs={12} md={7} alignItems={'center'} display={'flex'}>
                <CustomCheckbox
                  id='not_applicable'
                  label={messages['job_posting.not_applicable']}
                  register={register}
                  errorInstance={errors}
                  checked={isNotApplicable}
                  onChange={() => {
                    setIsNotApplicable((prev) => !prev);
                  }}
                  isLoading={false}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomFilterableFormSelect
              required
              id='job_sector_id'
              label={messages['job_sectors.label']}
              isLoading={false}
              control={control}
              options={[]}
              optionValueProp={'id'}
              optionTitleProp={['title_en', 'title']}
              errorInstance={errors}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomFilterableFormSelect
              required
              id='occupation_id'
              label={messages['occupations.label']}
              isLoading={false}
              control={control}
              options={[]}
              optionValueProp={'id'}
              optionTitleProp={['title_en', 'title']}
              errorInstance={errors}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomFormToggleButtonGroup
              required
              id={'employment_status'}
              label={messages['job_posting.employment_status']}
              buttons={[
                {
                  value: EmploymentStatus.FULL_TIME,
                  label: messages['job_posting.employment_status_full_time'],
                },
                {
                  value: EmploymentStatus.PART_TIME,
                  label: messages['job_posting.employment_status_part_time'],
                },
                {
                  value: EmploymentStatus.INTERNSHIP,
                  label: messages['job_posting.employment_status_internship'],
                },
                {
                  value: EmploymentStatus.CONTRACTUAL,
                  label: messages['job_posting.employment_status_contractual'],
                },
                {
                  value: EmploymentStatus.FREELANCE,
                  label: messages['job_posting.employment_status_freelance'],
                },
              ]}
              control={control}
              errorInstance={errors}
              multiSelect={true}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <CustomDateTimeField
                  required
                  id='deadline'
                  label={messages['job_posting.application_deadline']}
                  isLoading={false}
                  register={register}
                  errorInstance={errors}
                  inputProps={{
                    min: getMomentDateFormat(new Date(), 'YYYY-MM-DD'),
                    max: getMomentDateFormat(
                      addMonths(new Date(), 1),
                      'YYYY-MM-DD',
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={8} display={'flex'} alignItems={'center'}>
                <Chip
                  sx={{
                    backgroundColor: 'warning.light',
                    color: 'common.white',
                    borderRadius: '5px',
                  }}
                  icon={
                    <Error
                      sx={{
                        color: '#fff !important',
                      }}
                    />
                  }
                  label={messages['job_posting.application_deadline_warning']}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              {messages['job_posting.resume_receiving_option']}
            </Typography>
            <Box display={'flex'}>
              <CustomFormToggleButtonGroup
                id={'apply_online'}
                label={''}
                buttons={[
                  {
                    value: 1,
                    label: messages['common.apply_online'],
                  },
                ]}
                control={control}
                errorInstance={errors}
              />

              <Divider
                orientation={'vertical'}
                sx={{
                  height: '35px',
                  margin: 'auto 20px 6px',
                  borderWidth: '1px',
                }}
              />

              <CustomFormToggleButtonGroup
                required
                id={'resume_receiving_status'}
                label={''}
                buttons={[
                  {
                    value: ResumeReceivingOptions.EMAIL,
                    label: messages['common.email'],
                  },
                  {
                    value: ResumeReceivingOptions.HARD_COPY,
                    label: messages['job_posting.hard_copy'],
                  },
                  {
                    value: ResumeReceivingOptions.WALK_IN_INTERVIEW,
                    label: messages['job_posting.walk_in_interview'],
                  },
                ]}
                defaultValue={ResumeReceivingOptions.EMAIL}
                control={control}
                errorInstance={errors}
                space={false}
                onChange={(value: number) => {
                  setResumeReceivingOption(value);
                }}
              />
            </Box>
          </Grid>
          {resumeReceivingOption == ResumeReceivingOptions.EMAIL && (
            <Grid item xs={12}>
              <CustomTextInput
                required
                id='email'
                label={messages['common.email']}
                register={register}
                errorInstance={errors}
                isLoading={false}
                sx={{
                  marginBottom: '10px',
                }}
              />
              <CustomCheckbox
                id='use_nise3_email'
                label={messages['job_posting.use_nise3_email']}
                register={register}
                errorInstance={errors}
                checked={useNise3Email}
                onChange={() => {
                  setUseNise3Email((prev) => !prev);
                }}
                isLoading={false}
              />
            </Grid>
          )}

          {resumeReceivingOption == ResumeReceivingOptions.HARD_COPY && (
            <Grid item xs={12}>
              <CustomTextInput
                required
                id='hard_copy'
                label={messages['job_posting.hard_copy']}
                register={register}
                errorInstance={errors}
                isLoading={false}
                multiline={true}
                rows={3}
              />
            </Grid>
          )}

          {resumeReceivingOption ==
            ResumeReceivingOptions.WALK_IN_INTERVIEW && (
            <Grid item xs={12}>
              <CustomTextInput
                required
                id='walk_in_interview'
                label={messages['job_posting.walk_in_interview']}
                register={register}
                errorInstance={errors}
                isLoading={false}
                multiline={true}
                rows={3}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <CustomTextInput
              required
              id='special_instruction'
              label={messages['job_posting.special_instruction']}
              register={register}
              errorInstance={errors}
              isLoading={false}
              multiline={true}
              rows={3}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomFormSwitch
              id={'is_photograph_enclosed'}
              label={messages['job_posting.enclose_photograph']}
              yesLabel={messages['common.yes'] as string}
              noLabel={messages['common.no'] as string}
              register={register}
              defaultChecked={true}
              isLoading={false}
            />
          </Grid>
        </Grid>
        <Box mt={3} display={'flex'} justifyContent={'flex-end'}>
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

export default PrimaryJobInformation;
