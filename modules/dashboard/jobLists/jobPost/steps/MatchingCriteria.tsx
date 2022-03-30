import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  linearProgressClasses,
  Typography,
} from '@mui/material';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../../../@softbd/hooks/useNotifyStack';
import yup from '../../../../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {processServerSideErrors} from '../../../../../@softbd/utilities/validationErrorHandler';
import {styled} from '@mui/material/styles';
import {S2} from '../../../../../@softbd/elements/common';
import CustomCheckbox from '../../../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';
import MatchingCriteriaFormItem from './components/MatchingCriteriaFormItem';
import {Gender, JobLevel} from '../enums/JobPostEnums';
import {useFetchJobMatchingCriteria} from '../../../../../services/IndustryManagement/hooks';
import {saveMatchingCriteria} from '../../../../../services/IndustryManagement/JobService';
import {LINK_JOB_CREATE_OR_UPDATE} from '../../../../../@softbd/common/appLinks';

interface Props {
  jobId: string;
  onBack: () => void;
  onContinue: () => void;
  setLatestStep: (step: number) => void;
}

const BorderLinearProgress = styled(LinearProgress)(({theme}) => ({
  height: 10,
  borderRadius: 5,
  width: '100%',
  marginRight: '10px',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const initialValue = {
  is_age_enabled: false,
  is_area_of_business_enabled: false,
  is_area_of_experience_enabled: false,
  is_gender_enabled: false,
  is_job_level_enabled: false,
  is_job_location_enabled: false,
  is_salary_enabled: false,
  is_skills_enabled: false,
  is_total_year_of_experience_enabled: false,
};

const MatchingCriteria = ({
  jobId,
  onBack,
  onContinue,
  setLatestStep,
}: Props) => {
  const {messages} = useIntl();
  const {errorStack, successStack} = useNotiStack();

  const [fieldsMandatoryValue, setFieldsMandatoryValue] = useState<any>({
    age: false,
    job_location: false,
    total_experience: false,
    gender: false,
  });
  const [criteriaValue, setCriteriaValue] = useState<any>({
    ageValue: null,
    jobLocation: null,
    totalExperience: null,
    salary: null,
    gender: null,
    businessAreaValue: null,
    experienceAreaValue: null,
    jobLevelValue: null,
    skillValue: null,
  });
  const [progress, setProgress] = useState<number>(0);
  const totalField = useRef<number>(9);
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const {data: matchingCriteria} = useFetchJobMatchingCriteria(jobId);
  const [isReady, setIsReady] = useState<boolean>(false);

  const validationSchema = useMemo(() => {
    return yup.object().shape({});
  }, [messages]);

  const {
    register,
    setError,
    reset,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (matchingCriteria && matchingCriteria?.latest_step) {
      const latestStep = matchingCriteria.latest_step;
      delete matchingCriteria.latest_step;

      if (latestStep >= 5) {
        setIsReady(true);
        const data: any = {
          is_age_enabled: matchingCriteria?.is_age_enabled,
          is_area_of_business_enabled:
            matchingCriteria?.is_area_of_business_enabled,
          is_area_of_experience_enabled:
            matchingCriteria?.is_area_of_experience_enabled,
          is_gender_enabled: matchingCriteria?.is_gender_enabled,
          is_job_level_enabled: matchingCriteria?.is_job_level_enabled,
          is_job_location_enabled: matchingCriteria?.is_job_location_enabled,
          is_salary_enabled: matchingCriteria?.is_salary_enabled,
          is_skills_enabled: matchingCriteria?.is_skills_enabled,
          is_total_year_of_experience_enabled:
            matchingCriteria?.is_total_year_of_experience_enabled,
        };

        reset(data);

        let count = 0;
        Object.keys(data).map((key: string) => {
          if (data[key] == 1) {
            count++;
          }
        });
        setSelectedCount(count);

        setFieldsMandatoryValue({
          age: matchingCriteria?.is_age_mandatory,
          job_location: matchingCriteria?.is_job_location_mandatory,
          total_experience:
            matchingCriteria?.is_total_year_of_experience_mandatory,
          gender: matchingCriteria?.is_gender_mandatory,
        });
      }
      setLatestStep(latestStep);
    } else {
      reset(initialValue);
    }
  }, [matchingCriteria]);

  useEffect(() => {
    if (matchingCriteria) {
      let criteria = {
        ageValue: getAge(),
        jobLocation: getLocation(),
        totalExperience: getExperienceText(),
        salary: getSalary(),
        gender: getGender(),
        businessAreaValue: getBusinessArea(),
        experienceAreaValue: getExperienceArea(),
        jobLevelValue: getJobLevel(),
        skillValue: getSkills(),
      };
      setCriteriaValue(criteria);
    }
  }, [matchingCriteria]);

  useEffect(() => {
    setProgress(Math.floor((selectedCount * 100) / totalField.current));
  }, [selectedCount]);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      Object.keys(data).map((key: string) => {
        data[key] = data[key] ? 1 : 0;
      });
      data.job_id = jobId;

      //console.log('data', data);
      await saveMatchingCriteria(data);

      successStack('Data saved successfully');
      onContinue();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  const getAge = () => {
    let ageText: any = '';
    if (
      matchingCriteria?.candidate_requirement?.age_maximum ||
      matchingCriteria?.candidate_requirement?.age_minimum
    ) {
      if (matchingCriteria?.candidate_requirement?.age_maximum)
        ageText = matchingCriteria?.candidate_requirement?.age_maximum;

      if (matchingCriteria?.candidate_requirement?.age_minimum) {
        ageText += ageText ? ' - ' : '';
        ageText += matchingCriteria?.candidate_requirement?.age_minimum;
      }
      ageText += ' years';
    }
    return ageText;
  };

  const getSalary = () => {
    let salaryText: any = '';
    if (
      matchingCriteria?.additional_job_information?.salary_min ||
      matchingCriteria?.additional_job_information?.salary_max
    ) {
      if (matchingCriteria?.additional_job_information?.salary_min)
        salaryText = matchingCriteria?.additional_job_information?.salary_min;

      if (matchingCriteria?.additional_job_information?.salary_max) {
        salaryText += salaryText ? ' - ' : '';
        salaryText += matchingCriteria?.additional_job_information?.salary_max;
      }
      salaryText = '৳ ' + salaryText + ' (monthly)';
    }
    return salaryText;
  };

  const getGender = () => {
    let genderTextArr: Array<any> = [];
    (matchingCriteria?.genders || []).map((gender: any) => {
      switch (gender.gender_id) {
        case Gender.MALE:
          genderTextArr.push(messages['common.male']);
          break;
        case Gender.FEMALE:
          genderTextArr.push(messages['common.female']);
          break;
        case Gender.OTHERS:
          genderTextArr.push(messages['common.others']);
          break;
      }
    });

    return genderTextArr.join(', ');
  };

  const getLocation = () => {
    let locationTextArr: Array<any> = [];
    (matchingCriteria?.job_locations || []).map((location: any) => {
      locationTextArr.push(location.title);
    });

    return locationTextArr.join(', ');
  };

  const getExperienceText = () => {
    let experienceText: any = '';
    if (
      matchingCriteria?.candidate_requirement?.maximum_year_of_experience ||
      matchingCriteria?.candidate_requirement?.minimum_year_of_experience
    ) {
      if (matchingCriteria?.candidate_requirement?.maximum_year_of_experience)
        experienceText =
          matchingCriteria?.candidate_requirement?.maximum_year_of_experience;

      if (matchingCriteria?.candidate_requirement?.minimum_year_of_experience) {
        experienceText += experienceText ? ' - ' : '';
        experienceText +=
          matchingCriteria?.candidate_requirement?.minimum_year_of_experience;
      }
      experienceText += ' years';
    }
    return experienceText;
  };

  const getBusinessArea = () => {
    let businessAreaTextArr: Array<any> = [];
    (matchingCriteria?.area_of_business || []).map((area: any) => {
      businessAreaTextArr.push(area?.title);
    });

    return businessAreaTextArr.join(', ');
  };

  const getExperienceArea = () => {
    let experienceAreaTextArr: Array<any> = [];
    (matchingCriteria?.area_of_experiences || []).map((area: any) => {
      experienceAreaTextArr.push(area?.title);
    });

    return experienceAreaTextArr.join(', ');
  };

  const getJobLevel = () => {
    let jobLevelTextArr: Array<any> = [];
    (matchingCriteria?.job_levels || []).map((level: any) => {
      switch (level.job_level_id) {
        case JobLevel.ENTRY:
          jobLevelTextArr.push(messages['label.job_level_entry']);
          break;
        case JobLevel.MID:
          jobLevelTextArr.push(messages['label.job_level_mid']);
          break;
        case JobLevel.TOP:
          jobLevelTextArr.push(messages['label.job_level_top']);
          break;
      }
    });

    return jobLevelTextArr.join(', ');
  };
  const getSkills = () => {
    let skillsTextArr: Array<any> = [];
    (matchingCriteria?.skills || []).map((skill: any) => {
      skillsTextArr.push(skill.title);
    });

    return skillsTextArr.join(', ');
  };

  return isReady ? (
    <Box mt={2}>
      <Typography mb={3} variant={'h5'} fontWeight={'bold'}>
        {messages['job_posting.matching_criteria']}
      </Typography>

      <Box
        sx={{
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #d1d1d1',
        }}>
        <S2 fontWeight={'bold'}>Matching Strength</S2>
        <Typography
          color={'grey.600'}
          sx={{
            fontSize: '14px !important',
          }}>
          Suggestion: To get the relevant candidates, matching strength will be
          increased if you add job requirements from the following items.
        </Typography>
        <Box display={'flex'} alignItems={'center'}>
          <BorderLinearProgress variant='determinate' value={progress} />
          <Typography fontWeight={'bold'} color={'primary.main'}>
            {progress}%
          </Typography>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography fontWeight={'bold'} color={'grey.600'}>
            Low
          </Typography>
          <Typography fontWeight={'bold'} color={'grey.600'}>
            High
          </Typography>
        </Box>
      </Box>

      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete='off'
        style={{marginTop: '20px'}}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <MatchingCriteriaFormItem
              id={'is_age_enabled'}
              label={'Age'}
              tooltipText={
                'Select "Age" as matching criteria for more authentic/accurate matching.'
              }
              register={register}
              additionalValue={criteriaValue.ageValue}
              linkAdd={LINK_JOB_CREATE_OR_UPDATE + 'step3?jobId=' + jobId}
              linkEdit={LINK_JOB_CREATE_OR_UPDATE + 'step3?jobId=' + jobId}
              isLoading={false}
              defaultChecked={matchingCriteria?.is_age_enabled}
              onChange={(value: boolean) => {
                setSelectedCount((prev) => {
                  return value ? prev + 1 : prev - 1;
                });
              }}
              checkBoxComponent={
                <CustomCheckbox
                  id='is_age_mandatory'
                  label={'Set mandatory'}
                  register={register}
                  errorInstance={errors}
                  checked={fieldsMandatoryValue.age}
                  onChange={() => {
                    setFieldsMandatoryValue((prev: any) => {
                      return {...prev, ...{age: !prev.age}};
                    });
                  }}
                  isLoading={false}
                />
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MatchingCriteriaFormItem
              id={'is_job_location_enabled'}
              label={'Job location (Current)'}
              tooltipText={
                'Select "Job Location(Current/ Permanent)" for more authentic/accurate matching.'
              }
              register={register}
              additionalValue={criteriaValue.jobLocation}
              linkAdd={LINK_JOB_CREATE_OR_UPDATE + 'step2?jobId=' + jobId}
              linkEdit={LINK_JOB_CREATE_OR_UPDATE + 'step2?jobId=' + jobId}
              isLoading={false}
              defaultChecked={matchingCriteria?.is_job_location_enabled}
              onChange={(value: boolean) => {
                setSelectedCount((prev) => {
                  return value ? prev + 1 : prev - 1;
                });
              }}
              checkBoxComponent={
                <CustomCheckbox
                  id='is_job_location_mandatory'
                  label={'Set mandatory'}
                  register={register}
                  errorInstance={errors}
                  checked={fieldsMandatoryValue.job_location}
                  onChange={() => {
                    setFieldsMandatoryValue((prev: any) => {
                      return {...prev, ...{job_location: !prev.job_location}};
                    });
                  }}
                  isLoading={false}
                />
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MatchingCriteriaFormItem
              id={'is_total_year_of_experience_enabled'}
              label={'Total year of experience'}
              tooltipText={
                'If you select "Total year of experience", it will match with applicant'
              }
              register={register}
              additionalValue={criteriaValue.totalExperience}
              linkAdd={LINK_JOB_CREATE_OR_UPDATE + 'step3?jobId=' + jobId}
              linkEdit={LINK_JOB_CREATE_OR_UPDATE + 'step3?jobId=' + jobId}
              isLoading={false}
              defaultChecked={
                matchingCriteria?.is_total_year_of_experience_enabled
              }
              onChange={(value: boolean) => {
                setSelectedCount((prev) => {
                  return value ? prev + 1 : prev - 1;
                });
              }}
              checkBoxComponent={
                <CustomCheckbox
                  id='is_total_year_of_experience_mandatory'
                  label={'Set mandatory'}
                  register={register}
                  errorInstance={errors}
                  checked={fieldsMandatoryValue.total_experience}
                  onChange={() => {
                    setFieldsMandatoryValue((prev: any) => {
                      return {
                        ...prev,
                        ...{total_experience: !prev.total_experience},
                      };
                    });
                  }}
                  isLoading={false}
                />
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MatchingCriteriaFormItem
              id={'is_salary_enabled'}
              label={'Salary'}
              tooltipText={
                'Select "Salary" as matching criteria for more authentic/accurate matching.'
              }
              register={register}
              additionalValue={criteriaValue.salary}
              linkAdd={LINK_JOB_CREATE_OR_UPDATE + 'step2?jobId=' + jobId}
              linkEdit={LINK_JOB_CREATE_OR_UPDATE + 'step2?jobId=' + jobId}
              isLoading={false}
              defaultChecked={matchingCriteria?.is_salary_enabled}
              onChange={(value: boolean) => {
                setSelectedCount((prev) => {
                  return value ? prev + 1 : prev - 1;
                });
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MatchingCriteriaFormItem
              id={'is_gender_enabled'}
              label={'Gender'}
              tooltipText={
                'Select "Gender" for more authentic/accurate matching.'
              }
              register={register}
              additionalValue={criteriaValue.gender}
              linkAdd={LINK_JOB_CREATE_OR_UPDATE + 'step3?jobId=' + jobId}
              linkEdit={LINK_JOB_CREATE_OR_UPDATE + 'step3?jobId=' + jobId}
              isLoading={false}
              defaultChecked={matchingCriteria?.is_gender_enabled}
              onChange={(value: boolean) => {
                setSelectedCount((prev) => {
                  return value ? prev + 1 : prev - 1;
                });
              }}
              checkBoxComponent={
                <CustomCheckbox
                  id='is_gender_mandatory'
                  label={'Set mandatory'}
                  register={register}
                  errorInstance={errors}
                  checked={fieldsMandatoryValue.gender}
                  onChange={() => {
                    setFieldsMandatoryValue((prev: any) => {
                      return {...prev, ...{gender: !prev.gender}};
                    });
                  }}
                  isLoading={false}
                />
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MatchingCriteriaFormItem
              id={'is_area_of_business_enabled'}
              label={'Area of Business'}
              tooltipText={
                'Your selected business area will match with candidate`s current working "business area" or their preferable business area.'
              }
              register={register}
              additionalValue={criteriaValue.businessAreaValue}
              linkAdd={LINK_JOB_CREATE_OR_UPDATE + 'step3?jobId=' + jobId}
              linkEdit={LINK_JOB_CREATE_OR_UPDATE + 'step3?jobId=' + jobId}
              isLoading={false}
              defaultChecked={matchingCriteria?.is_area_of_business_enabled}
              onChange={(value: boolean) => {
                setSelectedCount((prev) => {
                  return value ? prev + 1 : prev - 1;
                });
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MatchingCriteriaFormItem
              id={'is_area_of_experience_enabled'}
              label={'Area of Experience'}
              tooltipText={
                'Select "Work area" for more authentic/accurate matching.'
              }
              register={register}
              additionalValue={criteriaValue.experienceAreaValue}
              linkAdd={LINK_JOB_CREATE_OR_UPDATE + 'step3?jobId=' + jobId}
              linkEdit={LINK_JOB_CREATE_OR_UPDATE + 'step3?jobId=' + jobId}
              isLoading={false}
              defaultChecked={matchingCriteria?.is_area_of_experience_enabled}
              onChange={(value: boolean) => {
                setSelectedCount((prev) => {
                  return value ? prev + 1 : prev - 1;
                });
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MatchingCriteriaFormItem
              id={'is_job_level_enabled'}
              label={'Job Level'}
              tooltipText={
                'Select "Job level" as matching criteria for more authentic/accurate matching.'
              }
              register={register}
              additionalValue={criteriaValue.jobLevelValue}
              linkAdd={LINK_JOB_CREATE_OR_UPDATE + 'step2?jobId=' + jobId}
              linkEdit={LINK_JOB_CREATE_OR_UPDATE + 'step2?jobId=' + jobId}
              isLoading={false}
              defaultChecked={matchingCriteria?.is_job_level_enabled}
              onChange={(value: boolean) => {
                setSelectedCount((prev) => {
                  return value ? prev + 1 : prev - 1;
                });
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MatchingCriteriaFormItem
              id={'is_skills_enabled'}
              label={'Skills'}
              tooltipText={
                'Select "Skills" for more authentic/accurate matching.'
              }
              register={register}
              additionalValue={criteriaValue.skillValue}
              linkAdd={LINK_JOB_CREATE_OR_UPDATE + 'step3?jobId=' + jobId}
              linkEdit={LINK_JOB_CREATE_OR_UPDATE + 'step3?jobId=' + jobId}
              isLoading={false}
              defaultChecked={matchingCriteria?.is_skills_enabled}
              onChange={(value: boolean) => {
                setSelectedCount((prev) => {
                  return value ? prev + 1 : prev - 1;
                });
              }}
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

export default MatchingCriteria;
