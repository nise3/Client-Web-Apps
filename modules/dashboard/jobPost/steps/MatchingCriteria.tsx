import React, {useEffect, useMemo, useState} from 'react';
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  linearProgressClasses,
  Typography,
} from '@mui/material';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import yup from '../../../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {processServerSideErrors} from '../../../../@softbd/utilities/validationErrorHandler';
import {styled} from '@mui/material/styles';
import {S2} from '../../../../@softbd/elements/common';
import CustomCheckbox from '../../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';
import MatchingCriteriaFormItem from './components/MatchingCriteriaFormItem';
import {Gender} from '../enums/Gender';
import {JobLevel} from '../enums/JobLevel';

interface Props {
  onBack: () => void;
  onContinue: () => void;
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

const data = {
  min_age: 24,
  max_age: 50,
  job_location: null,
  salary_min: 10,
  salary_max: 20,
  total_experience: null,
  gender: [1, 2],
  business_area: [],
  experience_area: [],
  job_level: [2, 3],
  skills: ['Computer Operator', 'Computer Operator related Skill is required'],
};

const MatchingCriteria = ({onBack, onContinue}: Props) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();

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

  const validationSchema = useMemo(() => {
    return yup.object().shape({});
  }, [messages]);

  const {
    register,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (data) {
      let criteria = {
        ageValue: getAge(),
        jobLocation: data.job_location,
        totalExperience: data.total_experience,
        salary: getSalary(),
        gender: getGender(),
        businessAreaValue: getBusinessArea(),
        experienceAreaValue: getExperienceArea(),
        jobLevelValue: getJobLevel(),
        skillValue: getSkills(),
      };
      setCriteriaValue(criteria);
    }
  }, [data]);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      console.log('data', data);

      //do data save work here

      onContinue();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  const getAge = () => {
    let ageText: any = '';
    if (data.min_age || data.max_age) {
      if (data.min_age) ageText = data.min_age;

      if (data.max_age) {
        ageText += ageText ? ' - ' : '';
        ageText += data.max_age;
      }
      ageText += ' years';
    }
    return ageText;
  };

  const getSalary = () => {
    let salaryText: any = '';
    if (data.salary_min || data.salary_max) {
      if (data.salary_min) salaryText = data.salary_min;

      if (data.salary_max) {
        salaryText += salaryText ? ' - ' : '';
        salaryText += data.salary_max;
      }
      salaryText = '৳ ' + salaryText + ' (monthly)';
    }
    return salaryText;
  };

  const getGender = () => {
    let genderTextArr: Array<any> = [];
    data.gender.map((gender: number) => {
      switch (gender) {
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

  const getBusinessArea = () => {
    let businessAreaTextArr: Array<any> = [];
    data.business_area.map((area: any) => {
      businessAreaTextArr.push(area);
    });

    return businessAreaTextArr.join(', ');
  };

  const getExperienceArea = () => {
    let experienceAreaTextArr: Array<any> = [];
    data.experience_area.map((area: any) => {
      experienceAreaTextArr.push(area);
    });

    return experienceAreaTextArr.join(', ');
  };

  const getJobLevel = () => {
    let jobLevelTextArr: Array<any> = [];
    data.job_level.map((level: any) => {
      switch (level) {
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
    data.skills.map((skill: any) => {
      skillsTextArr.push(skill);
    });

    return skillsTextArr.join(', ');
  };

  return (
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
              id={'age'}
              label={'Age'}
              tooltipText={
                'Select "Age" as matching criteria for more authentic/accurate matching.'
              }
              register={register}
              additionalValue={getAge()}
              linkAdd={''}
              linkEdit={''}
              isLoading={false}
              defaultChecked={false}
              checkBoxComponent={
                <CustomCheckbox
                  id='age_mandatory'
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
              id={'job_location'}
              label={'Job location (Current)'}
              tooltipText={
                'Select "Job Location(Current/ Permanent)" for more authentic/accurate matching.'
              }
              register={register}
              additionalValue={data?.job_location}
              linkAdd={''}
              linkEdit={''}
              isLoading={false}
              defaultChecked={false}
              checkBoxComponent={
                <CustomCheckbox
                  id='job_location_mandatory'
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
              id={'total_experience'}
              label={'Total year of experience'}
              tooltipText={
                'If you select "Total year of experience", it will match with applicant'
              }
              register={register}
              additionalValue={data?.job_location}
              linkAdd={''}
              linkEdit={''}
              isLoading={false}
              defaultChecked={false}
              checkBoxComponent={
                <CustomCheckbox
                  id='total_experience_mandatory'
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
              id={'salary'}
              label={'Salary'}
              tooltipText={
                'Select "Salary" as matching criteria for more authentic/accurate matching.'
              }
              register={register}
              additionalValue={getSalary()}
              linkAdd={''}
              linkEdit={''}
              isLoading={false}
              defaultChecked={false}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MatchingCriteriaFormItem
              id={'gender'}
              label={'Gender'}
              tooltipText={
                'Select "Gender" for more authentic/accurate matching.'
              }
              register={register}
              additionalValue={getGender()}
              linkAdd={''}
              linkEdit={''}
              isLoading={false}
              defaultChecked={false}
              checkBoxComponent={
                <CustomCheckbox
                  id='gender_mandatory'
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
              id={'business_area'}
              label={'Area of Business'}
              tooltipText={
                'Your selected business area will match with candidate`s current working "business area" or their preferable business area.'
              }
              register={register}
              additionalValue={getBusinessArea()}
              linkAdd={''}
              linkEdit={''}
              isLoading={false}
              defaultChecked={false}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MatchingCriteriaFormItem
              id={'experience_area'}
              label={'Area of Experience'}
              tooltipText={
                'Select "Work area" for more authentic/accurate matching.'
              }
              register={register}
              additionalValue={getExperienceArea()}
              linkAdd={''}
              linkEdit={''}
              isLoading={false}
              defaultChecked={false}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MatchingCriteriaFormItem
              id={'job_level'}
              label={'Job Level'}
              tooltipText={
                'Select "Job level" as matching criteria for more authentic/accurate matching.'
              }
              register={register}
              additionalValue={getJobLevel()}
              linkAdd={''}
              linkEdit={''}
              isLoading={false}
              defaultChecked={false}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MatchingCriteriaFormItem
              id={'skills'}
              label={'Skills'}
              tooltipText={
                'Select "Skills" for more authentic/accurate matching.'
              }
              register={register}
              additionalValue={getSkills()}
              linkAdd={''}
              linkEdit={''}
              isLoading={false}
              defaultChecked={false}
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
  );
};

export default MatchingCriteria;
