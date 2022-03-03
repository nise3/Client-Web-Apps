import React, {useMemo, useState} from 'react';
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
import {styled} from '@mui/material/styles';
import {useIntl} from 'react-intl';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import AssessmentKeys from './AssessmentKeys';
import SectorAndOccupationForm from './SectorAndOccupationForm';
import yup from '../../@softbd/libs/yup';

const PREFIX = 'YouthCourseRegistrationPage';

const classes = {
  rootContainer: `${PREFIX}-rootContainer`,
  paperBox: `${PREFIX}-paperBox`,
  btnGroup: `${PREFIX}-btnGroup`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  marginTop: 20,
  marginBottom: 20,

  [`& .${classes.paperBox}`]: {
    padding: 15,
  },

  [`& .${classes.btnGroup}`]: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '15px 0px',
  },
  '& .MuiStepIcon-text': {
    fontSize: '1rem',
  },
}));
const AssessmentProcessPage = () => {
  const {messages} = useIntl();
  const [activeStep, setActiveStep] = useState(0);
  const [activeStepKey, setActiveStepKey] = useState<string>(
    AssessmentKeys.SECTOR_OCCUPATION.toString(),
  );
  const [stepKeys] = useState<Array<string>>([
    AssessmentKeys.SECTOR_OCCUPATION.toString(),
    AssessmentKeys.ASSESSMENT.toString(),
    AssessmentKeys.ASSESSMENT_RESULT.toString(),
  ]);
  const [isSuccessSubmit] = useState<boolean>(false);

  const getCurrentFormContent = () => {
    switch (activeStepKey) {
      case AssessmentKeys.SECTOR_OCCUPATION:
        return (
          <SectorAndOccupationForm
            register={register}
            errors={errors}
            control={control}
            getValues={getValues}
            setValue={setValue}
          />
        );
    }
  };
  const onSubmit: SubmitHandler<any> = async (formData: any) => {
    if (activeStep < stepKeys.length - 1) {
      handleNext();
    }
  };

  const handleNext = () => {
    setActiveStepKey(stepKeys[activeStep + 1]);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStepKey(stepKeys[activeStep - 1]);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({});
  }, []);
  const {
    handleSubmit,
    register,
    control,
    setValue,
    getValues,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });
  return (
    <StyledContainer maxWidth={'lg'}>
      <Paper className={classes.paperBox}>
        <Box sx={{textAlign: 'center', marginBottom: 5}}>
          <Typography variant={'h4'}>
            {messages['common.self_assessment']}
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
              <Box />
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
                    disabled={isSubmitting || isSuccessSubmit}>
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
    </StyledContainer>
  );
};

export default AssessmentProcessPage;
