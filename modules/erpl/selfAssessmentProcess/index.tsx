import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
import yup from '../../../@softbd/libs/yup';
import AssessmentForm from './AssessmentForm';
import {useFetchPublicYouthAssessmentQuestions} from '../../../services/CertificateAuthorityManagement/hooks';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {createRplAssessment} from '../../../services/CertificateAuthorityManagement/YouthAssessmentService';
import AssessmentResult from './AssessmentResult';

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
  const authUser = useAuthUser<YouthAuthUser>();
  const [activeStep, setActiveStep] = useState(0);
  const [activeStepKey, setActiveStepKey] = useState<string>(
    AssessmentKeys.SECTOR_OCCUPATION.toString(),
  );
  const [stepKeys] = useState<Array<string>>([
    AssessmentKeys.SECTOR_OCCUPATION.toString(),
    AssessmentKeys.ASSESSMENT.toString(),
    AssessmentKeys.ASSESSMENT_RESULT.toString(),
  ]);

  const [hasCountryId, setHasCountryId] = useState<any>(null);
  const [hasSectorId, setHasSectorId] = useState<any>(null);
  const [hasOccupationId, setHasOccupationId] = useState<any>(null);
  const [hasLevelId, setHasLevelId] = useState<any>(null);
  const [hasRtoCountryId, setHasRtoCountryId] = useState<any>(null);
  const [assessmentFilter, setAssessmentFilter] = useState<any>(null);
  const [responseData, setResponseData] = useState<any>({});
  const {data: assessments, isLoading: isLoadingAssessments} =
    useFetchPublicYouthAssessmentQuestions(assessmentFilter);

  const validationSchema: any = useMemo(() => {
    switch (activeStepKey) {
      case AssessmentKeys.SECTOR_OCCUPATION:
        return yup.object().shape({
          target_country_id: yup
            .string()
            .trim()
            .required()
            .label(messages['common.country'] as string),
          rpl_sector_id: hasCountryId
            ? yup
                .string()
                .trim()
                .required()
                .label(messages['rpl_sector.label'] as string)
            : yup.string().trim().nullable(),
          rpl_occupation_id: hasSectorId
            ? yup
                .string()
                .trim()
                .required()
                .label(messages['rpl_occupation.label'] as string)
            : yup.string().trim().nullable(),
          rpl_level_id: hasOccupationId
            ? yup
                .string()
                .trim()
                .required()
                .label(messages['rpl_level.label'] as string)
            : yup.string().trim().nullable(),
          rto_country_id: hasLevelId
            ? yup
                .string()
                .trim()
                .required()
                .label(messages['rto_country.label'] as string)
            : yup.string().trim().nullable(),
          rto_id: hasRtoCountryId
            ? yup
                .string()
                .trim()
                .required()
                .label(messages['rto.label'] as string)
            : yup.string().trim().nullable(),
        });
      case AssessmentKeys.ASSESSMENT:
        return yup.object().shape({
          answers: yup.array().of(
            yup.object().shape({
              answer: yup
                .string()
                .trim()
                .required()
                .label(messages['common.answer'] as string),
            }),
          ),
        });
      default:
        return yup.object().shape({});
    }
  }, [
    activeStepKey,
    hasCountryId,
    hasSectorId,
    hasOccupationId,
    hasLevelId,
    hasRtoCountryId,
  ]);
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

  useEffect(() => {
    if (hasLevelId && hasOccupationId) {
      setAssessmentFilter({
        rpl_occupation_id: hasOccupationId,
        rpl_level_id: hasLevelId,
      });
    }
  }, [hasLevelId, hasOccupationId]);

  const getCurrentFormContent = () => {
    switch (activeStepKey) {
      case AssessmentKeys.SECTOR_OCCUPATION:
        return (
          <SectorAndOccupationForm
            onChanged={onChanged}
            register={register}
            errors={errors}
            control={control}
            getValues={getValues}
            setValue={setValue}
          />
        );
      case AssessmentKeys.ASSESSMENT:
        return (
          <AssessmentForm
            isLoadingAssessments={isLoadingAssessments}
            assessments={assessments}
            control={control}
            register={register}
            getValues={getValues}
            errors={errors}
          />
        );
      case AssessmentKeys.ASSESSMENT_RESULT:
        return <AssessmentResult responseData={responseData} />;
      default:
        return <></>;
    }
  };

  console.log('errors: ', errors);
  const onSubmit: SubmitHandler<any> = async (formData: any) => {
    console.log('formData: ', formData);

    try {
      if (activeStep < stepKeys.length - 2) {
        handleNext();
      } else {
        formData.youth_id = authUser?.youthId;
        const response = await createRplAssessment(formData);
        setResponseData(response);
        handleNext();
      }
    } catch (error: any) {}
  };

  const handleNext = () => {
    setActiveStepKey(stepKeys[activeStep + 1]);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStepKey(stepKeys[activeStep - 1]);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [changedState, setChangedState] = useState(0);
  const onChanged = useCallback(() => {
    setChangedState(Math.random() * 1e6);
  }, []);

  useEffect(() => {
    let countryId = getValues('target_country_id');
    let sectorId = getValues('rpl_sector_id');
    let occupationId = getValues('rpl_occupation_id');
    let levelId = getValues('rpl_level_id');
    let rtoCountryId = getValues('rto_country_id');

    if (countryId) {
      setHasCountryId(countryId);
    }
    if (sectorId) {
      setHasSectorId(sectorId);
    }
    if (occupationId) {
      setHasOccupationId(occupationId);
    }
    if (levelId) {
      setHasLevelId(levelId);
    }
    if (rtoCountryId) {
      setHasRtoCountryId(rtoCountryId);
    }
  }, [
    getValues,
    hasCountryId,
    hasRtoCountryId,
    hasSectorId,
    hasLevelId,
    hasOccupationId,
    changedState,
  ]);

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
                <Container maxWidth={'md'}>
                  <Box className={classes.btnGroup}>
                    {activeStep > 0 && activeStep < stepKeys.length - 1 && (
                      <Button
                        onClick={handleBack}
                        variant={'outlined'}
                        color={'primary'}>
                        {messages['common.previous']}
                      </Button>
                    )}
                    {activeStep < stepKeys.length - 1 && (
                      <Button
                        sx={{marginLeft: 'auto'}}
                        type={'submit'}
                        variant={'contained'}
                        color={'primary'}
                        disabled={isSubmitting}>
                        {activeStep == stepKeys.length - 2
                          ? messages['common.submit']
                          : messages['common.next']}
                      </Button>
                    )}
                  </Box>
                </Container>
              </form>
            </React.Fragment>
          )}
        </Box>
      </Paper>
    </StyledContainer>
  );
};

export default AssessmentProcessPage;
