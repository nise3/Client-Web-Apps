import React, {useEffect, useMemo, useState} from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import PersonalInfoForm from './PersonalInfoForm';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import AddressForm from './AddressForm';
import yup from '../../../@softbd/libs/yup';
import useStyles from './index.style';
import EducationalQualificationForm from './EducationalQualificationForm';
import OccupationalInfoForm from './OccupationalInfoForm';
import GuardiansInfoForm from './GuardiansInfoForm';
import OtherInfoForm from './OtherInfoForm';
import {useIntl} from 'react-intl';
import {MOBILE_NUMBER_REGEX} from '../../../@softbd/common/patternRegex';
import {useRouter} from 'next/router';
import {useFetchCourseDetails} from '../../../services/instituteManagement/hooks';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';

const tabKeys = [
  'education_info',
  'occupation_info',
  'guardian_info',
  'miscellaneous_info',
];

const YouthCourseRegistrationPage = () => {
  const classes = useStyles();
  const {messages} = useIntl();
  const router = useRouter();
  const {courseId} = router.query;
  const authUser = useAuthUser<YouthAuthUser>();
  const {data: course} = useFetchCourseDetails(Number(courseId));
  const [visibleFormConfigKeys, setVisibleFormConfigKeys] = useState<any>([]);
  const [requiredFormConfigKeys, setRequiredFormConfigKeys] = useState<any>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [stepKeys, setStepKeys] = useState<Array<string>>([
    'personal_info',
    'address_info',
  ]);

  useEffect(() => {
    if (course && authUser?.isYouthUser) {
      setFormSettings(course.application_form_settings);
    }
  }, [course, authUser]);

  const setFormSettings = (config: string | undefined | null) => {
    try {
      const steps = [...stepKeys];
      let configJson = JSON.parse(config || '{}');
      let itemsState: any = [];
      let itemsRequiredState: any = [];
      Object.keys(configJson || {}).map((key: string) => {
        let value = configJson[key];
        if (value[0]) {
          itemsState.push(key);
          if (tabKeys.includes(key)) {
            steps.push(key);
          }
        }
        if (value[1]) {
          itemsRequiredState.push(key);
        }
      });
      setStepKeys(steps);
      setVisibleFormConfigKeys(itemsState);
      setRequiredFormConfigKeys(itemsRequiredState);
    } catch (e) {
      console.log('Failed to parse config data', e);
    }
  };

  console.log('visible', visibleFormConfigKeys);
  console.log('required', requiredFormConfigKeys);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getCurrentFormContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <PersonalInfoForm
            register={register}
            errors={errors}
            control={control}
            visibleFieldKeys={visibleFormConfigKeys}
            requiredFieldKeys={requiredFormConfigKeys}
          />
        );
      case 1:
        return (
          <AddressForm register={register} errors={errors} control={control} />
        );
      case 2:
        return (
          <EducationalQualificationForm
            register={register}
            errors={errors}
            control={control}
          />
        );
      case 3:
        return (
          <OccupationalInfoForm
            register={register}
            errors={errors}
            control={control}
          />
        );
      case 4:
        return (
          <GuardiansInfoForm
            register={register}
            errors={errors}
            control={control}
          />
        );
      case 5:
        return (
          <OtherInfoForm
            register={register}
            errors={errors}
            control={control}
          />
        );
      default:
        return <></>;
    }
  };

  const validationSchema = useMemo(() => {
    switch (activeStep) {
      case 0:
        return yup.object().shape({
          name_en: yup
            .string()
            .title('en')
            .label(messages['common.name_en'] as string),
          name: yup
            .string()
            .title()
            .label(messages['common.name_bn'] as string),
          mobile: yup
            .string()
            .trim()
            .required()
            .matches(MOBILE_NUMBER_REGEX)
            .label(messages['common.mobile'] as string),
          email: yup
            .string()
            .trim()
            .required()
            .email()
            .label(messages['common.email'] as string),
          date_of_birth: yup
            .string()
            .trim()
            .required()
            .matches(/(19|20)\d\d-[01]\d-[0123]\d/)
            .label(messages['common.date_of_birth'] as string),
        });
      case 1:
        return yup.object().shape({
          present_division: yup
            .string()
            .trim()
            .required()
            .label(messages['divisions.label'] as string),
          present_district: yup
            .string()
            .trim()
            .required()
            .label(messages['districts.label'] as string),
          present_area: yup
            .string()
            .trim()
            .required()
            .label(messages['common.area'] as string),
          present_road: yup
            .string()
            .trim()
            .required()
            .label(messages['common.road'] as string),
          present_upazila: yup
            .string()
            .trim()
            .required()
            .label(messages['post_office.label'] as string),
          present_post_office: yup
            .string()
            .trim()
            .required()
            .label(messages['common.road'] as string),
        });
      case 2:
        return yup.object().shape({});
      case 3:
        return yup.object().shape({});
      case 4:
        return yup.object().shape({});
      case 5:
        return yup.object().shape({});
      default:
        return yup.object().shape({});
    }
  }, [activeStep]);

  const {
    control,
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    if (activeStep < stepKeys.length - 1) {
      handleNext();
    } else if (activeStep == stepKeys.length - 1) {
      console.log('final submit', data);
    }
  };

  return (
    <Container maxWidth={'xl'} className={classes.rootContainer}>
      <Paper className={classes.paperBox}>
        <Box sx={{textAlign: 'center', marginBottom: 5}}>
          <Typography variant={'h4'}>
            {messages['course_registration.title']}
          </Typography>
        </Box>

        <Box sx={{width: '100%'}}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {stepKeys.map((key, index) => {
              const stepProps: {completed?: boolean} = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              return (
                <Step key={key as string} {...stepProps}>
                  <StepLabel {...labelProps}>
                    {messages['common.' + key]}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === stepKeys.length ? (
            <React.Fragment>
              <Box>Done</Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                <Box sx={{p: '10px 0px', marginTop: 3}}>
                  {getCurrentFormContent()}
                </Box>
                <Box className={classes.btnGroup}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    variant={'outlined'}
                    color={'primary'}>
                    {messages['common.previous']}
                  </Button>
                  <Button
                    sx={{marginLeft: 3}}
                    type={'submit'}
                    variant={'contained'}
                    color={'primary'}
                    disabled={isSubmitting}>
                    {activeStep == stepKeys.length - 1
                      ? messages['common.submit']
                      : messages['common.next']}
                  </Button>
                </Box>
              </form>
            </React.Fragment>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default YouthCourseRegistrationPage;
