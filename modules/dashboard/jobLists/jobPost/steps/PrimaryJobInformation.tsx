import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Box, Button, Chip, Divider, Grid, Typography} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import yup from '../../../../../@softbd/libs/yup';
import {useIntl} from 'react-intl';
import CustomTextInput from '../../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {processServerSideErrors} from '../../../../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../../../../@softbd/hooks/useNotifyStack';
import FormRadioButtons from '../../../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import CustomCheckbox from '../../../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';
import CustomFilterableFormSelect from '../../../../../@softbd/elements/input/CustomFilterableFormSelect';
import CustomFormToggleButtonGroup from '../../../../../@softbd/elements/input/CustomFormToggleButtonGroup';
import CustomDateTimeField from '../../../../../@softbd/elements/input/CustomDateTimeField';
import {
  addMonths,
  getMomentDateFormat,
} from '../../../../../@softbd/utilities/helpers';
import {Error} from '@mui/icons-material';
import {
  EmploymentStatus,
  ResumeReceivingOptions,
  ServiceTypes,
} from '../enums/JobPostEnums';
import CustomFormSwitch from '../../../../../@softbd/elements/input/CustomFormSwitch';
import {useFetchPublicJobSectors} from '../../../../../services/organaizationManagement/hooks';
import RowStatus from '../../../../../@softbd/utilities/RowStatus';
import {IOccupation} from '../../../../../shared/Interface/occupation.interface';
import {getAllPublicOccupations} from '../../../../../services/organaizationManagement/OccupationService';
import {
  useFetchIndustryMembers,
  useFetchJobPrimaryInformation,
} from '../../../../../services/IndustryManagement/hooks';
import {savePrimaryJobInformation} from '../../../../../services/IndustryManagement/JobService';
import {useAuthUser} from '../../../../../@crema/utility/AppHooks';

interface Props {
  jobId: string;
  onContinue: () => void;
  setLatestStep: (step: number) => void;
}

const initialValue = {
  service_type: ServiceTypes.BASIC_LISTING,
  job_title: '',
  job_title_en: '',
  employment_types: [],
  no_of_vacancies: '',
  is_number_of_vacancy_na: false,
  job_sector_id: '',
  occupation_id: '',
  application_deadline: '',
  resume_receiving_option: ResumeReceivingOptions.EMAIL,
  email: '',
  /*is_use_nise3_mail_system: true,*/
  instruction_for_hard_copy: '',
  instruction_for_hard_copy_en: '',
  instruction_for_walk_in_interview: '',
  instruction_for_walk_in_interview_en: '',
  special_instruction_for_job_seekers: '',
  special_instruction_for_job_seekers_en: '',
  is_photograph_enclose_with_resume: false,
};

const PrimaryJobInformation = ({jobId, onContinue, setLatestStep}: Props) => {
  const {messages} = useIntl();
  const {successStack, errorStack} = useNotiStack();
  const authUser = useAuthUser();

  const [isNotApplicable, setIsNotApplicable] = useState<boolean>(false);
  const [resumeReceivingOption, setResumeReceivingOption] = useState<
    number | null
  >(ResumeReceivingOptions.EMAIL);
  //const [useNise3Email, setUseNise3Email] = useState<boolean>(true);
  const [jobSectorFilters] = useState({row_status: RowStatus.ACTIVE});
  const {data: jobSectors, isLoading: isLoadingJobSector}: any =
    useFetchPublicJobSectors(jobSectorFilters);
  const [occupations, setOccupations] = useState<Array<IOccupation>>([]);

  const {data: primaryJobInfo} = useFetchJobPrimaryInformation(jobId);
  const [isReady, setIsReady] = useState<boolean>(false);

  const [latestStepValue, setLatestStepValue] = useState(1);

  const [industryAssociationMembersFilter] = useState({});
  const {
    data: industryAssociationMembers,
    isLoading: isLoadingIndustryAssocMembers,
  } = useFetchIndustryMembers(industryAssociationMembersFilter);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      service_type: yup
        .number()
        .required()
        .label(messages['job_posting.service_type'] as string),
      job_title: yup
        .string()
        .required()
        .label(messages['job_posting.job_title'] as string),
      is_number_of_vacancy_na: yup
        .boolean()
        .required()
        .label(messages['job_posting.not_applicable'] as string),
      no_of_vacancies: yup
        .mixed()
        .label(messages['job_posting.no_of_vacancy'] as string)
        .when('is_number_of_vacancy_na', {
          is: (value: boolean) => {
            return !value;
          },
          then: yup.string().required(),
        }),
      job_sector_id: yup
        .string()
        .required()
        .label(messages['job_sectors.label'] as string),
      occupation_id: yup
        .string()
        .required()
        .label(messages['occupations.label'] as string),
      employment_types: yup
        .array()
        .of(yup.number())
        .min(1)
        .label(messages['job_posting.employment_status'] as string),
      application_deadline: yup
        .string()
        .required()
        .label(messages['job_posting.application_deadline'] as string),
      resume_receiving_option: yup.number(),
      email: yup
        .mixed()
        .label(messages['common.email'] as string)
        .when('resume_receiving_option', {
          is: (value: any) => value == ResumeReceivingOptions.EMAIL,
          then: yup.string().trim().email().required(),
        }),
      instruction_for_hard_copy: yup
        .mixed()
        .label(messages['job_posting.hard_copy'] as string)
        .when('resume_receiving_option', {
          is: (value: any) => value == ResumeReceivingOptions.HARD_COPY,
          then: yup.string().trim().required(),
        }),
      instruction_for_walk_in_interview: yup
        .mixed()
        .label(messages['job_posting.walk_in_interview'] as string)
        .when('resume_receiving_option', {
          is: (value: any) => value == ResumeReceivingOptions.WALK_IN_INTERVIEW,
          then: yup.string().trim().required(),
        }),
      is_photograph_enclose_with_resume: yup
        .boolean()
        .required()
        .label(messages['job_posting.enclose_photograph'] as string),
    });
  }, [messages]);
  const {
    register,
    control,
    setError,
    reset,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const getEmploymentType = (employment_types: any) => {
    const ids: any = [];
    (employment_types || []).map((type: any) => {
      ids.push(type.id);
    });

    return ids;
  };

  useEffect(() => {
    if (primaryJobInfo && primaryJobInfo?.latest_step) {
      const latestStep = primaryJobInfo.latest_step;
      delete primaryJobInfo?.latest_step;
      setLatestStepValue(latestStep);

      if (latestStep >= 1) {
        setIsReady(true);
        reset({
          service_type: primaryJobInfo?.service_type,
          job_title: primaryJobInfo?.job_title,
          job_title_en: primaryJobInfo?.job_title_en,
          employment_types: getEmploymentType(primaryJobInfo?.employment_types),
          no_of_vacancies: primaryJobInfo?.no_of_vacancies,
          is_number_of_vacancy_na: primaryJobInfo?.is_number_of_vacancy_na == 1,
          job_sector_id: primaryJobInfo?.job_sector_id,
          occupation_id: primaryJobInfo?.occupation_id,
          application_deadline: primaryJobInfo?.application_deadline,
          resume_receiving_option: primaryJobInfo?.resume_receiving_option,
          email: primaryJobInfo?.email,
          is_apply_online: primaryJobInfo?.is_apply_online == 1 ? 1 : '',
          /*is_use_nise3_mail_system:
            primaryJobInfo?.is_use_nise3_mail_system == 1,*/
          instruction_for_hard_copy: primaryJobInfo?.instruction_for_hard_copy,
          instruction_for_hard_copy_en:
            primaryJobInfo?.instruction_for_hard_copy_en,
          instruction_for_walk_in_interview:
            primaryJobInfo?.instruction_for_walk_in_interview,
          instruction_for_walk_in_interview_en:
            primaryJobInfo?.instruction_for_walk_in_interview_en,
          special_instruction_for_job_seekers:
            primaryJobInfo?.special_instruction_for_job_seekers,
          special_instruction_for_job_seekers_en:
            primaryJobInfo?.special_instruction_for_job_seekers_en,
          is_photograph_enclose_with_resume:
            primaryJobInfo?.is_photograph_enclose_with_resume == 1,
          organization_id: primaryJobInfo?.organization_id,
        });
        onJobSectorChange(primaryJobInfo?.job_sector_id);
      }
      setLatestStep(latestStep);
    } else {
      reset(initialValue);
    }
  }, [primaryJobInfo]);

  console.log('errors: ', errors);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      data.job_id = jobId;

      if (data.resume_receiving_option != ResumeReceivingOptions.EMAIL) {
        delete data.email;
        //delete data.is_use_nise3_mail_system;
      }
      if (data.resume_receiving_option != ResumeReceivingOptions.HARD_COPY) {
        delete data.instruction_for_hard_copy;
        delete data.instruction_for_hard_copy_en;
      }
      if (
        data.resume_receiving_option != ResumeReceivingOptions.WALK_IN_INTERVIEW
      ) {
        delete data.instruction_for_walk_in_interview;
        delete data.instruction_for_walk_in_interview_en;
      }

      data.is_number_of_vacancy_na = data.is_number_of_vacancy_na ? 1 : 0;
      data.is_photograph_enclose_with_resume =
        data.is_photograph_enclose_with_resume ? 1 : 0;
      /*data.is_use_nise3_mail_system = data.is_use_nise3_mail_system ? 1 : 0;*/

      if (Number(data.is_apply_online) != 1) {
        delete data.is_apply_online;
      }

      if (!authUser?.isIndustryAssociationUser) {
        delete data.organization_id;
      }

      //console.log('data', data);
      await savePrimaryJobInformation(data);

      successStack('Data saved successfully');
      onContinue();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  const onJobSectorChange = useCallback(async (jobSectorId: number | null) => {
    if (jobSectorId) {
      try {
        const response = await getAllPublicOccupations({
          row_status: RowStatus.ACTIVE,
          job_sector_id: jobSectorId,
        });
        setOccupations(response.data);
      } catch (e) {
        setOccupations([]);
      }
    } else {
      setOccupations([]);
    }
  }, []);

  return isReady ? (
    <Box mt={2}>
      <Typography mb={3} variant={'h5'} fontWeight={'bold'}>
        {messages['job_posting.primary_job_info']}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <Grid container spacing={3}>
          {authUser?.isIndustryAssociationUser && (
            <Grid item xs={12} md={6}>
              <CustomFilterableFormSelect
                id='organization_id'
                label={messages['common.create_job_for_member']}
                isLoading={isLoadingIndustryAssocMembers}
                control={control}
                options={industryAssociationMembers}
                optionValueProp={'id'}
                optionTitleProp={['title']}
                errorInstance={errors}
                isDisabled={latestStepValue > 1}
              />
            </Grid>
          )}

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
              required={true}
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
            <CustomTextInput
              id='job_title_en'
              label={messages['job_posting.job_title_en']}
              register={register}
              errorInstance={errors}
              isLoading={false}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={5}>
                <CustomTextInput
                  required={!isNotApplicable}
                  id='no_of_vacancies'
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
                  id='is_number_of_vacancy_na'
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
              isLoading={isLoadingJobSector}
              control={control}
              options={jobSectors}
              optionValueProp={'id'}
              optionTitleProp={['title_en', 'title']}
              errorInstance={errors}
              onChange={onJobSectorChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomFilterableFormSelect
              required
              id='occupation_id'
              label={messages['occupations.label']}
              isLoading={false}
              control={control}
              options={occupations}
              optionValueProp={'id'}
              optionTitleProp={['title_en', 'title']}
              errorInstance={errors}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomFormToggleButtonGroup
              required
              id={'employment_types'}
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
                  id='application_deadline'
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
                id={'is_apply_online'}
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
                id={'resume_receiving_option'}
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
              {/* <CustomCheckbox
                id='is_use_nise3_mail_system'
                label={messages['job_posting.use_nise3_email']}
                register={register}
                errorInstance={errors}
                checked={useNise3Email}
                onChange={() => {
                  setUseNise3Email((prev) => !prev);
                }}
                isLoading={false}
              />*/}
            </Grid>
          )}

          {resumeReceivingOption == ResumeReceivingOptions.HARD_COPY && (
            <React.Fragment>
              <Grid item xs={12} md={6}>
                <CustomTextInput
                  required
                  id='instruction_for_hard_copy'
                  label={messages['job_posting.hard_copy']}
                  register={register}
                  errorInstance={errors}
                  isLoading={false}
                  multiline={true}
                  rows={3}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextInput
                  id='instruction_for_hard_copy_en'
                  label={messages['job_posting.hard_copy_en']}
                  register={register}
                  errorInstance={errors}
                  isLoading={false}
                  multiline={true}
                  rows={3}
                />
              </Grid>
            </React.Fragment>
          )}

          {resumeReceivingOption ==
            ResumeReceivingOptions.WALK_IN_INTERVIEW && (
            <React.Fragment>
              <Grid item xs={12} md={6}>
                <CustomTextInput
                  required
                  id='instruction_for_walk_in_interview'
                  label={messages['job_posting.walk_in_interview']}
                  register={register}
                  errorInstance={errors}
                  isLoading={false}
                  multiline={true}
                  rows={3}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextInput
                  id='instruction_for_walk_in_interview_en'
                  label={messages['job_posting.walk_in_interview_en']}
                  register={register}
                  errorInstance={errors}
                  isLoading={false}
                  multiline={true}
                  rows={3}
                />
              </Grid>
            </React.Fragment>
          )}

          <Grid item xs={12} md={6}>
            <CustomTextInput
              id='special_instruction_for_job_seekers'
              label={messages['job_posting.special_instruction']}
              register={register}
              errorInstance={errors}
              isLoading={false}
              multiline={true}
              rows={3}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTextInput
              id='special_instruction_for_job_seekers_en'
              label={messages['job_posting.special_instruction_en']}
              register={register}
              errorInstance={errors}
              isLoading={false}
              multiline={true}
              rows={3}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomFormSwitch
              id={'is_photograph_enclose_with_resume'}
              label={messages['job_posting.enclose_photograph']}
              yesLabel={messages['common.yes'] as string}
              noLabel={messages['common.no'] as string}
              register={register}
              defaultChecked={
                primaryJobInfo?.is_photograph_enclose_with_resume == 1
              }
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
  ) : (
    <></>
  );
};

export default PrimaryJobInformation;
