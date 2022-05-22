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
  useFetchEducationLevels,
  useFetchExamDegrees,
  useFetchExperienceAreas,
  useFetchJobCandidateRequirements,
} from '../../../../../services/IndustryManagement/hooks';
import {saveCandidateRequirements} from '../../../../../services/IndustryManagement/JobService';
import RowStatus from '../../../../../@softbd/utilities/RowStatus';
import CustomSelectAutoComplete from '../../../../youth/registration/CustomSelectAutoComplete';
import {useFetchLocalizedSkills} from '../../../../../services/youthManagement/hooks';
import usePageLoadToTop from './usePageLoadToTop';

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

const initialValue = {
  degrees: [],
  preferred_educational_institutions: [],
  other_educational_qualification: '',
  other_educational_qualification_en: '',
  trainings: [],
  professional_certifications: [],
  is_experience_needed: 1,
  minimum_year_of_experience: '',
  maximum_year_of_experience: '',
  is_freshers_encouraged: 1,
  area_of_experiences: [],
  area_of_businesses: [],
  skills: [],
  additional_requirements: '',
  additional_requirements_en: '',
  genders: [],
  age_minimum: '',
  age_maximum: '',
  person_with_disability: 0,
  preferred_retired_army_officer: 0,
};

const CandidateRequirements = ({
  jobId,
  onBack,
  onContinue,
  setLatestStep,
}: Props) => {
  const {messages} = useIntl();
  const {successStack, errorStack} = useNotiStack();
  const [isFresherApplicable, setIsFresherApplicable] =
    useState<boolean>(false);
  const [notExperienced, setNotExperienced] = useState<boolean>(true);
  const {data: candidateRequirements} = useFetchJobCandidateRequirements(jobId);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [defaultEduLevelIdTrack, setDefaultEduLevelIdTrack] = useState<any>({});

  const id = 'top';
  usePageLoadToTop({id, dependency: isReady});

  const {
    data: educationalInstitutes,
    isLoading: isLoadingEducationalInstitutes,
  } = useFetchEducationalInstitutes();
  const {data: businessAreas, isLoading: isLoadingBusinessAreas} =
    useFetchBusinessAreas();
  const {data: experienceAreas, isLoading: isLoadingExperienceAreas} =
    useFetchExperienceAreas();

  const [skillFilters] = useState<any>({row_status: RowStatus.ACTIVE});
  const {data: skills, isLoading: isLoadingSkills} =
    useFetchLocalizedSkills(skillFilters);

  const {data: educationLevels} = useFetchEducationLevels();
  const {data: examDegrees} = useFetchExamDegrees();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      degrees: yup.array().of(
        yup.object().shape({
          education_level_id: yup
            .mixed()
            .required()
            .label(messages['education.education_level'] as string),
          exam_degree_id: yup
            .mixed()
            .required()
            .label(messages['education.education_exam_degree'] as string),
        }),
      ),
    });
  }, [messages]);
  const {
    register,
    setError,
    control,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (candidateRequirements && candidateRequirements?.latest_step) {
      const latestStep = candidateRequirements.latest_step;
      delete candidateRequirements?.latest_step;

      if (latestStep >= 3) {
        setIsReady(true);

        let data: any = {
          degrees: getDegrees(candidateRequirements?.degrees),
          preferred_educational_institutions:
            candidateRequirements?.preferred_educational_institutions,
          other_educational_qualification:
            candidateRequirements?.other_educational_qualification,
          other_educational_qualification_en:
            candidateRequirements?.other_educational_qualification_en,
          trainings: getTrainings(candidateRequirements?.trainings),
          professional_certifications: getProfessionalCertification(
            candidateRequirements?.professional_certifications,
          ),
          is_experience_needed: candidateRequirements?.is_experience_needed,
          minimum_year_of_experience:
            candidateRequirements?.minimum_year_of_experience,
          maximum_year_of_experience:
            candidateRequirements?.maximum_year_of_experience,
          is_freshers_encouraged: candidateRequirements?.is_freshers_encouraged,
          area_of_experiences: candidateRequirements?.area_of_experiences,
          area_of_businesses: candidateRequirements?.area_of_business,
          skills: candidateRequirements?.skills,
          additional_requirements:
            candidateRequirements?.additional_requirements,
          additional_requirements_en:
            candidateRequirements?.additional_requirements_en,
          genders: getGenders(candidateRequirements?.genders),
          age_minimum: candidateRequirements?.age_minimum,
          age_maximum: candidateRequirements?.age_maximum,
          person_with_disability:
            candidateRequirements?.person_with_disability == 1,
          preferred_retired_army_officer:
            candidateRequirements?.preferred_retired_army_officer == 1,
        };

        setNotExperienced(candidateRequirements?.is_experience_needed != 1);
        setIsFresherApplicable(
          candidateRequirements?.is_freshers_encouraged == 1,
        );
        reset(data);
      }
      setLatestStep(latestStep);
    } else {
      reset(initialValue);
    }
  }, [candidateRequirements]);

  const getDegrees = (degrees: any) => {
    if (!degrees || degrees.length < 1) return [];

    let eduLevelIds: any = {};

    const eduDegrees = (degrees || []).map((item: any, index: number) => {
      eduLevelIds['level' + index] = item.education_level_id;

      return {
        education_level_id: item.education_level_id,
        exam_degree_id: item.exam_degree_id,
        major_subject: item.major_subject,
      };
    });

    setDefaultEduLevelIdTrack(eduLevelIds);

    return eduDegrees;
  };

  const getTrainings = (trainings: any) => {
    return (trainings || []).map((item: any) => item.title);
  };

  const getProfessionalCertification = (certifications: any) => {
    return (certifications || []).map((item: any) => item.title);
  };

  const getGenders = (certifications: any) => {
    return (certifications || []).map((item: any) => item.gender_id);
  };

  const onChangeIsExperienced = (value: any) => {
    setNotExperienced((prev) => !prev);
  };

  console.log('error', errors);
  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      data.job_id = jobId;

      data.is_freshers_encouraged = data.is_freshers_encouraged ? 1 : 0;
      data.person_with_disability = data.person_with_disability ? 1 : 0;
      data.preferred_retired_army_officer = data.preferred_retired_army_officer
        ? 1
        : 0;

      if (data.preferred_educational_institutions) {
        data.preferred_educational_institutions =
          data.preferred_educational_institutions.map(
            (edu_ins: any) => edu_ins.id,
          );
      }

      if (data.is_experience_needed != 1) {
        delete data.minimum_year_of_experience;
        delete data.maximum_year_of_experience;
        delete data.is_freshers_encouraged;
        delete data.area_of_experiences;
        delete data.area_of_businesses;
        delete data.skills;
        delete data.additional_requirements;
        delete data.additional_requirements_en;
      }

      if (data.area_of_experiences) {
        data.area_of_experiences = data.area_of_experiences.map(
          (experience: any) => experience.id,
        );
      }

      if (data.area_of_businesses) {
        data.area_of_businesses = data.area_of_businesses.map(
          (business: any) => business.id,
        );
      }

      if (data.skills) {
        data.skills = data.skills.map((skill: any) => skill.id);
      }

      //console.log('data', data);
      await saveCandidateRequirements(data);

      successStack('Data saved successfully');
      onContinue();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return isReady ? (
    <Box mt={3} id={id}>
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
              isLoading={false}
              control={control}
              register={register}
              errors={errors}
              educationLevelOptions={educationLevels || []}
              examDegreeOptions={examDegrees || []}
              defaultEduLevelIdTrack={defaultEduLevelIdTrack}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomSelectAutoComplete
              id='preferred_educational_institutions'
              label={messages['common.preferred_educational_institute']}
              isLoading={isLoadingEducationalInstitutes}
              control={control}
              optionValueProp={'id'}
              errorInstance={errors}
              optionTitleProp={['name']}
              options={educationalInstitutes || []}
            />
          </Grid>
          <Grid item xs={12} md={6}>
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
            <CustomTextInput
              id='other_educational_qualification_en'
              label={messages['common.other_educational_qualification_en']}
              register={register}
              errorInstance={errors}
              isLoading={false}
              multiline={true}
              rows={3}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomAddFilterableFormSelect
              id='trainings'
              label={messages['common.training_courses']}
              control={control}
              optionTitleProp={['title']}
              options={[]}
              errorInstance={errors}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomAddFilterableFormSelect
              id='professional_certifications'
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
                <CustomSelectAutoComplete
                  id={'area_of_experiences'}
                  label={messages['common.area_of_experience']}
                  isLoading={isLoadingExperienceAreas}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                  options={experienceAreas || []}
                  control={control}
                  errorInstance={errors}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomSelectAutoComplete
                  id={'area_of_businesses'}
                  label={messages['common.area_of_business']}
                  isLoading={isLoadingBusinessAreas}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                  options={businessAreas || []}
                  control={control}
                  errorInstance={errors}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomSelectAutoComplete
                  id={'skills'}
                  label={messages['common.skills']}
                  isLoading={isLoadingSkills}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                  options={skills || []}
                  control={control}
                  errorInstance={errors}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextInput
                  id={'additional_requirements'}
                  label={messages['job_posts.additional_requirements']}
                  isLoading={false}
                  register={register}
                  multiline={true}
                  rows={3}
                  errorInstance={errors}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextInput
                  id={'additional_requirements_en'}
                  label={messages['job_posts.additional_requirements_en']}
                  isLoading={false}
                  register={register}
                  multiline={true}
                  rows={3}
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
              id={'genders'}
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
              defaultChecked={
                candidateRequirements?.person_with_disability == 1
              }
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
              defaultChecked={
                candidateRequirements?.preferred_retired_army_officer == 1
              }
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
