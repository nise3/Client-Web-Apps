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
import {useRouter} from 'next/router';
import {useFetchCourseDetails} from '../../../services/instituteManagement/hooks';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';
import CourseConfigKeys from '../../../@softbd/utilities/CourseConfigKeys';
import PhysicalDisabilityStatus from '../../../@softbd/utilities/PhysicalDisabilityStatus';
import Genders from '../../../@softbd/utilities/Genders';
import MaritalStatus from '../../../@softbd/utilities/MaritalStatus';
import FreedomFighterStatus from '../../../@softbd/utilities/FreedomFighterStatus';
import Religions from '../../../@softbd/utilities/Religions';
import EthnicGroupStatus from '../../../@softbd/utilities/EthnicGroupStatus';
import {MOBILE_NUMBER_REGEX} from '../../../@softbd/common/patternRegex';

const tabKeys = [
  CourseConfigKeys.EDUCATION_KEY.toString(),
  CourseConfigKeys.OCCUPATION_KEY.toString(),
  CourseConfigKeys.GUARDIAN_KEY.toString(),
  CourseConfigKeys.MISCELLANEOUS_KEY.toString(),
];

const initialValues = {
  first_name: '',
  last_name: '',
  date_of_birth: '',
  physical_disability_status: PhysicalDisabilityStatus.NO,
  physical_disabilities: [],
  gender: Genders.MALE,
  marital_status: MaritalStatus.SINGLE,
  freedom_fighter_status: FreedomFighterStatus.NO,
  religion: Religions.ISLAM,
  nationality: '',
  does_belong_to_ethnic_group: EthnicGroupStatus.NO,
  present_address: {
    loc_division_id: '',
    loc_district_id: '',
    loc_upazila_id: '',
  },
  is_permanent_address: '0',
  permanent_address: {
    loc_division_id: '',
    loc_district_id: '',
    loc_upazila_id: '',
  },
  main_profession: '',
  monthly_income: '',
  is_currently_employed: '0',
  years_of_experiences: '',
  father_name: '',
  mother_name: '',
  has_own_family_home: '1',
  has_own_family_land: '1',
  number_of_siblings: '0',
  recommended_by_any_organization: '1',
};

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
  const [activeStepKey, setActiveStepKey] = useState<string>(
    CourseConfigKeys.PERSONAL_KEY.toString(),
  );
  const [stepKeys, setStepKeys] = useState<Array<string>>([]);
  const [hasDisabilities, setHasDisabilities] = useState<boolean>(false);
  const [isPhysicalDisabilitiesRequired, setIsPhysicalDisabilitiesRequired] =
    useState<boolean>(false);

  const validationSchema = useMemo(() => {
    switch (activeStepKey) {
      case CourseConfigKeys.PERSONAL_KEY:
        return yup.object().shape({
          /*first_name: yup
            .string()
            .title()
            .label(messages['common.first_name_bn'] as string),
          last_name: yup
            .string()
            .title()
            .label(messages['common.last_name_bn'] as string),
          date_of_birth: yup
            .string()
            .trim()
            .required()
            .label(messages['common.date_of_birth'] as string),
          physical_disability_status: isPhysicalDisabilitiesRequired
            ? yup
                .string()
                .trim()
                .required()
                .label(messages['common.physical_disability'] as string)
            : yup.string(),
          physical_disabilities:
            hasDisabilities && isPhysicalDisabilitiesRequired
              ? yup
                  .array()
                  .of(yup.string())
                  .min(1)
                  .label(messages['common.physical_disability'] as string)
              : yup.array().of(yup.string()),*/
        });
      case CourseConfigKeys.ADDRESS_KEY:
        return yup.object().shape({
          /*is_permanent_address: yup
            .string()
            .trim()
            .required()
            .label(messages['course_registration.is_permanent'] as string),
          present_address: yup.object().shape({
            loc_division_id: yup
              .string()
              .trim()
              .required()
              .label(messages['divisions.label'] as string),
            loc_district_id: yup
              .string()
              .trim()
              .required()
              .label(messages['districts.label'] as string),
            village_or_area: yup
              .string()
              .trim()
              .required()
              .label(messages['common.village_or_area_bn'] as string),
            zip_or_postal_code: yup
              .string()
              .trim()
              .required()
              .label(messages['common.zip_or_postal_code'] as string),
          }),
          permanent_address: yup.object().shape({
            loc_division_id: yup
              .string()
              .trim()
              .required()
              .label(messages['divisions.label'] as string),
            loc_district_id: yup
              .string()
              .trim()
              .required()
              .label(messages['districts.label'] as string),
            village_or_area: yup
              .string()
              .trim()
              .required()
              .label(messages['common.village_or_area_bn'] as string),
            zip_or_postal_code: yup
              .string()
              .trim()
              .required()
              .label(messages['common.zip_or_postal_code'] as string),
          }),*/
        });
      case CourseConfigKeys.EDUCATION_KEY:
        return yup.object().shape({});
      case CourseConfigKeys.OCCUPATION_KEY:
        return yup.object().shape({
          main_profession: yup
            .string()
            .trim()
            .required()
            .label(messages['common.main_occupation'] as string),
          monthly_income: yup
            .string()
            .trim()
            .required()
            .label(messages['common.monthly_income'] as string),
          years_of_experiences: yup
            .string()
            .trim()
            .required()
            .label(messages['common.year_of_experience'] as string),
          is_currently_employed: yup
            .string()
            .trim()
            .required()
            .label(messages['common.currently_working'] as string),
        });
      case CourseConfigKeys.GUARDIAN_KEY:
        return yup.object().shape({
          father_name: yup
            .string()
            .trim()
            .required()
            .label(messages['common.name_bn'] as string),
          father_mobile: yup
            .string()
            .trim()
            .nullable()
            .matches(MOBILE_NUMBER_REGEX)
            .label(messages['common.mobile'] as string),
          mother_name: yup
            .string()
            .trim()
            .required()
            .label(messages['common.name_bn'] as string),
          mother_mobile: yup
            .string()
            .trim()
            .nullable()
            .matches(MOBILE_NUMBER_REGEX)
            .label(messages['common.mobile'] as string),
        });
      case CourseConfigKeys.MISCELLANEOUS_KEY:
        return yup.object().shape({
          has_own_family_home: yup
            .string()
            .trim()
            .required()
            .label(messages['common.has_own_family_home'] as string),
          has_own_family_land: yup
            .string()
            .trim()
            .required()
            .label(messages['common.has_own_family_land'] as string),
          number_of_siblings: yup
            .string()
            .trim()
            .required()
            .label(messages['common.number_of_siblings'] as string),
          recommended_by_any_organization: yup
            .string()
            .trim()
            .required()
            .label(
              messages['common.recommended_by_any_organization'] as string,
            ),
        });
      default:
        return yup.object().shape({});
    }
  }, [activeStepKey, hasDisabilities, isPhysicalDisabilitiesRequired]);

  const {
    control,
    register,
    watch,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const watchFields: any = watch(['physical_disability_status']);

  //resetting initial value
  useEffect(() => {
    reset(initialValues);
  }, []);

  console.log('errors', errors);

  useEffect(() => {
    if (watchFields[0] && watchFields[0] == PhysicalDisabilityStatus.YES) {
      setHasDisabilities(true);
    }
  }, [watchFields]);

  useEffect(() => {
    if (course && authUser?.isYouthUser) {
      setFormSettings(course.application_form_settings);
    }
  }, [course, authUser]);

  const setFormSettings = (config: string | undefined | null) => {
    try {
      const steps = [
        CourseConfigKeys.PERSONAL_KEY.toString(),
        CourseConfigKeys.ADDRESS_KEY.toString(),
      ];
      let configJson = JSON.parse(config || '{}');
      console.log('form settings', configJson);
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

      //physical disabilities visible and required
      if (
        visibleFormConfigKeys.includes(CourseConfigKeys.DISABILITY_KEY) &&
        requiredFormConfigKeys.includes(CourseConfigKeys.DISABILITY_KEY)
      ) {
        setIsPhysicalDisabilitiesRequired(true);
      } else {
        setIsPhysicalDisabilitiesRequired(false);
      }
    } catch (e) {
      console.log('Failed to parse config data', e);
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

  const getCurrentFormContent = () => {
    switch (activeStepKey) {
      case CourseConfigKeys.PERSONAL_KEY:
        return (
          <PersonalInfoForm
            course={course}
            register={register}
            errors={errors}
            control={control}
            visibleFieldKeys={visibleFormConfigKeys}
          />
        );
      case CourseConfigKeys.ADDRESS_KEY:
        return (
          <AddressForm register={register} errors={errors} control={control} />
        );
      case CourseConfigKeys.EDUCATION_KEY:
        return (
          <EducationalQualificationForm
            register={register}
            errors={errors}
            control={control}
            visibleFieldKeys={visibleFormConfigKeys}
          />
        );
      case CourseConfigKeys.OCCUPATION_KEY:
        return <OccupationalInfoForm register={register} errors={errors} />;
      case CourseConfigKeys.GUARDIAN_KEY:
        return <GuardiansInfoForm register={register} errors={errors} />;
      case CourseConfigKeys.MISCELLANEOUS_KEY:
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

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    console.log('submit', data);
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
