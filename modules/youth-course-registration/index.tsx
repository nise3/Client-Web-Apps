import React, {useMemo, useState} from 'react';
import {
  Box,
  Button,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import PersonalInfoForm from './PersonalInfoForm';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import AddressForm from './AddressForm';
import yup from '../../@softbd/libs/yup';
import useStyles from './index.style';
import EducationalQualificationForm from './EducationalQualificationForm';
import OccupationalInfoForm from './OccupationalInfoForm';
import GuardiansInfoForm from './GuardiansInfoForm';
import OtherInfoForm from './OtherInfoForm';

const YouthCourseRegistrationPage = () => {
  const classes = useStyles();

  const steps = useMemo(
    () => [
      'Personal Information',
      'Address',
      'Educational Qualification',
      'Occupational Information',
      'Guardians Information',
      'Other Information',
    ],
    [],
  );

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getCurrentFormContent = () => {
    switch (activeStep) {
      case 0:
        return <PersonalInfoForm register={register} errors={errors} />;
      case 1:
        return <AddressForm register={register} errors={errors} />;
      case 2:
        return (
          <EducationalQualificationForm register={register} errors={errors} />
        );
      case 3:
        return <OccupationalInfoForm register={register} errors={errors} />;
      case 4:
        return <GuardiansInfoForm register={register} errors={errors} />;
      case 5:
        return <OtherInfoForm register={register} errors={errors} />;
      default:
        return <></>;
    }
  };

  const validationSchema = useMemo(() => {
    switch (activeStep) {
      case 0:
        return yup.object().shape({
          first_name: yup.string().trim().required().label('First Name'),
        });
      case 1:
        return yup.object().shape({
          address: yup.string().trim().required().label('Address'),
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
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    console.log('submit', data);
    if (activeStep < steps.length - 1) {
      handleNext();
    } else if (activeStep == steps.length - 1) {
      console.log('final submit', data);
    }
  };

  console.log('render', errors);

  return (
    <Container className={classes.rootContainer}>
      <Box sx={{textAlign: 'center', marginBottom: 5}}>
        <Typography variant={'h4'}>Course Registration</Typography>
      </Box>

      <Box sx={{width: '100%'}}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            const stepProps: {completed?: boolean} = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Box>Done</Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
              <Box sx={{p: '10px 0px'}}>{getCurrentFormContent()}</Box>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant={'outlined'}
                color={'primary'}>
                Previous
              </Button>
              <Button
                sx={{marginLeft: 3}}
                type={'submit'}
                variant={'contained'}
                color={'primary'}
                disabled={isSubmitting}>
                {activeStep == steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </form>
          </React.Fragment>
        )}
      </Box>
    </Container>
  );
};

export default YouthCourseRegistrationPage;
