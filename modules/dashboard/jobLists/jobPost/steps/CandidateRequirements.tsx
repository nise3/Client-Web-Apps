import React, {useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../../../@softbd/hooks/useNotifyStack';
import yup from '../../../../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {processServerSideErrors} from '../../../../../@softbd/utilities/validationErrorHandler';
import {Box, Button, Grid, Typography} from '@mui/material';
import CustomEducationalQualificationFieldArray from './components/CustomFieldArrayJobRequirements';
import CustomTextInput from '../../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import FormRadioButtons from '../../../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import CustomFilterableFormSelect from '../../../../../@softbd/elements/input/CustomFilterableFormSelect';
import CustomCheckbox from '../../../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';
import CustomFormToggleButtonGroup from '../../../../../@softbd/elements/input/CustomFormToggleButtonGroup';
import {Gender} from '../enums/JobPostEnums';
import CustomAddFilterableFormSelect from './components/CustomAddFilterableFormSelect';
import Tooltip from '@mui/material/Tooltip';
import {Help} from '@mui/icons-material';
import CustomFormSwitch from '../../../../../@softbd/elements/input/CustomFormSwitch';
import {
  useFetchBusinessAreas,
  useFetchEducationalInstitutes,
  useFetchJobCandidateRequirements,
} from '../../../../../services/IndustryManagement/hooks';
import {saveCandidateRequirements} from '../../../../../services/IndustryManagement/JobService';
import {useFetchSkills} from '../../../../../services/organaizationManagement/hooks';
import RowStatus from '../../../../../@softbd/utilities/RowStatus';

interface Props {
  jobId: string;
  onBack: () => void;
  onContinue: () => void;
  setLatestStep: (step: number) => void;
}

const experienceYears: Array<any> = [];
const ages: Array<any> = [];

for (let i = 1; i <= 50; i++) experienceYears.push({id: i, title: i});
for (let i = 14; i <= 90; i++) ages.push({id: i, title: i});

const demoOptions = [
  {id: 1, title: 'BGC Trust'},
  {id: 2, title: 'Test 1'},
  {id: 3, title: 'Test 2'},
  {id: 4, title: 'Test 3'},
];

const initialValue = {};

const CandidateRequirements = ({
  jobId,
  onBack,
  onContinue,
  setLatestStep,
}: Props) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const [isFresherApplicable, setIsFresherApplicable] =
    useState<boolean>(false);
  const [notExperienced, setNotExperienced] = useState<boolean>(true);
  const {data: candidateRequirements} = useFetchJobCandidateRequirements(jobId);
  const [isReady, setIsReady] = useState<boolean>(false);

  const {
    data: educationalInstitutes,
    isLoading: isLoadingEducationalInstitutes,
  } = useFetchEducationalInstitutes();
  const {data: businessAreas, isLoading: isLoadingBusinessAreas} =
    useFetchBusinessAreas();

  const [skillFilters] = useState<any>({row_status: RowStatus.ACTIVE});
  const {data: skills, isLoading: isLoadingSkills} =
    useFetchSkills(skillFilters);

  const validationSchema = useMemo(() => {
    return yup.object().shape({});
  }, [messages]);
  const {
    register,
    setError,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (candidateRequirements && candidateRequirements?.latest_step) {
      const latestStep = candidateRequirements.latest_step;
      delete candidateRequirements?.latest_step;

      if (latestStep >= 3) {
        setIsReady(true);
        reset({});
      }
      setLatestStep(latestStep);
    } else {
      reset(initialValue);
    }
  }, [candidateRequirements]);

  useEffect(() => {
    setValue('degrees', [
      {education_level: '', education_exam_degree: '', major_group_name: ''},
    ]);
  }, []);

  const onChangeIsExperienced = (value: any) => {
    setNotExperienced((prev) => !prev);
  };

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      console.log('data', data);

      //do data save work here

      const response = await saveCandidateRequirements(data);
      console.log('response', response);

      onContinue();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return isReady ? (
    <Box mt={3}>
      <Typography mb={2} variant={'h5'} fontWeight={'bold'}>
        {messages['job_posting.candidates_requirement']}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant={'h6'}>
              {messages['common.educational_qualification']}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <CustomEducationalQualificationFieldArray
              id='degrees'
              labelLanguageId={[
                'education.education_level',
                'education.education_exam_degree',
                'education.major_group_name_bn',
              ]}
              isLoading={false}
              control={control}
              register={register}
              errors={errors}
              options={[]}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomAddFilterableFormSelect
              id='preferred_educational_institute'
              label={messages['common.preferred_educational_institute']}
              isLoading={isLoadingEducationalInstitutes}
              control={control}
              errorInstance={errors}
              optionTitleProp={['name']}
              options={educationalInstitutes || []}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextInput
              id='other_educational_qualification'
              label={messages['common.other_educational_qualification']}
              register={register}
              errorInstance={errors}
              isLoading={false}
              multiline={true}
              rows={3}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomAddFilterableFormSelect
              id='training'
              label={messages['common.training_courses']}
              control={control}
              optionTitleProp={['title']}
              options={demoOptions}
              errorInstance={errors}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomAddFilterableFormSelect
              id='professional_certification'
              label={messages['common.professional_certification']}
              control={control}
              optionTitleProp={['title']}
              options={[]}
              errorInstance={errors}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant={'h6'}>
              {messages['common.experience_business_area']}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormRadioButtons
              id='is_experience_needed'
              label={'common.experience_required'}
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
              onChange={onChangeIsExperienced}
            />
          </Grid>
          {!notExperienced && (
            <>
              <Grid item xs={12} md={6}>
                <CustomFilterableFormSelect
                  id={'minimum_year_of_experience'}
                  label={messages['common.min_year_of_experience']}
                  isLoading={false}
                  control={control}
                  options={experienceYears}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                  errorInstance={errors}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomFilterableFormSelect
                  id={'maximum_year_of_experience'}
                  label={messages['common.max_years_of_experience']}
                  isLoading={false}
                  control={control}
                  options={experienceYears}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                  errorInstance={errors}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomCheckbox
                  id='is_freshers_encouraged'
                  label={messages['job_post.is_fresher_applicable']}
                  register={register}
                  errorInstance={errors}
                  checked={isFresherApplicable}
                  onChange={() => {
                    setIsFresherApplicable((prev) => !prev);
                  }}
                  isLoading={false}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomAddFilterableFormSelect
                  id={'area_of_experience'}
                  label={messages['common.area_of_experience']}
                  isLoading={false}
                  control={control}
                  optionTitleProp={['title']}
                  options={[]}
                  errorInstance={errors}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomAddFilterableFormSelect
                  id={'area_of_business'}
                  label={messages['common.area_of_business']}
                  isLoading={isLoadingBusinessAreas}
                  control={control}
                  optionTitleProp={['title']}
                  options={businessAreas || []}
                  errorInstance={errors}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomAddFilterableFormSelect
                  id={'skills'}
                  label={messages['common.skills']}
                  isLoading={isLoadingSkills}
                  control={control}
                  optionTitleProp={['title']}
                  options={skills || []}
                  errorInstance={errors}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextInput
                  id={'additional_requirements'}
                  label={messages['job_posts.additional_requirements']}
                  isLoading={false}
                  register={register}
                  multiline={true}
                  rows={3}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                  errorInstance={errors}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <Typography variant={'h6'}>
              {messages['personal_info.label']}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CustomFormToggleButtonGroup
              id={'gender'}
              label={messages['common.gender']}
              buttons={[
                {
                  value: Gender.MALE,
                  label: messages['common.male'],
                },
                {
                  value: Gender.FEMALE,
                  label: messages['common.female'],
                },
                {
                  value: Gender.OTHERS,
                  label: messages['common.others'],
                },
              ]}
              control={control}
              errorInstance={errors}
              multiSelect={true}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomFilterableFormSelect
              id={'age_minimum'}
              label={messages['common.minimum_age']}
              isLoading={false}
              control={control}
              options={ages}
              optionValueProp={'id'}
              optionTitleProp={['title']}
              errorInstance={errors}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomFilterableFormSelect
              id={'age_maximum'}
              label={messages['common.maximum_age']}
              isLoading={false}
              control={control}
              options={ages}
              optionValueProp={'id'}
              optionTitleProp={['title']}
              errorInstance={errors}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomFormSwitch
              id={'person_with_disability'}
              label={messages['common.person_with_disability']}
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
          <Grid item xs={12}>
            <CustomFormSwitch
              id={'preferred_retired_army_officer'}
              label={messages['common.preferred_retired_army']}
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

export default CandidateRequirements;
