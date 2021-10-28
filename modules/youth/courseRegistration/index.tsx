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
import {getMomentDateFormat} from '../../../@softbd/utilities/helpers';
import {courseEnroll} from '../../../services/youthManagement/YouthService';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT_SUCCESS} from '../../../@softbd/common/appLinks';

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
  professional_info: {
    main_profession: '',
    monthly_income: '',
    is_currently_employed: '0',
    years_of_experiences: '',
  },
  guardian_info: {
    father_name: '',
    mother_name: '',
  },
  miscellaneous_info: {
    has_own_family_home: '1',
    has_own_family_land: '1',
    number_of_siblings: '0',
    recommended_by_any_organization: '1',
  },
  psc_info: {
    exam_degree_id: '',
    edu_board_id: '',
    institute_name: '',
    institute_name_en: '',
    is_foreign_institute: '0',
    foreign_institute_country_id: '',
    result: '',
    marks_in_percentage: '',
    cgpa_scale: '',
    cgpa: '',
    year_of_passing: '',
    expected_year_of_passing: '',
  },
  jsc_info: {
    exam_degree_id: '',
    edu_board_id: '',
    institute_name: '',
    institute_name_en: '',
    is_foreign_institute: '0',
    foreign_institute_country_id: '',
    result: '',
    marks_in_percentage: '',
    cgpa_scale: '',
    cgpa: '',
    year_of_passing: '',
    expected_year_of_passing: '',
  },
  ssc_info: {
    exam_degree_id: '',
    edu_board_id: '',
    edu_group_id: '',
    institute_name: '',
    institute_name_en: '',
    is_foreign_institute: '0',
    foreign_institute_country_id: '',
    result: '',
    marks_in_percentage: '',
    cgpa_scale: '',
    cgpa: '',
    year_of_passing: '',
    expected_year_of_passing: '',
  },
  hsc_info: {
    exam_degree_id: '',
    edu_board_id: '',
    edu_group_id: '',
    institute_name: '',
    institute_name_en: '',
    is_foreign_institute: '0',
    foreign_institute_country_id: '',
    result: '',
    marks_in_percentage: '',
    cgpa_scale: '',
    cgpa: '',
    year_of_passing: '',
    expected_year_of_passing: '',
  },
  diploma_info: {
    exam_degree_id: '',
    major_or_concentration: '',
    major_or_concentration_en: '',
    institute_name: '',
    institute_name_en: '',
    is_foreign_institute: '0',
    foreign_institute_country_id: '',
    result: '',
    marks_in_percentage: '',
    cgpa_scale: '',
    cgpa: '',
    year_of_passing: '',
    expected_year_of_passing: '',
  },
  honours_info: {
    exam_degree_id: '',
    major_or_concentration: '',
    major_or_concentration_en: '',
    institute_name: '',
    institute_name_en: '',
    is_foreign_institute: '0',
    foreign_institute_country_id: '',
    result: '',
    marks_in_percentage: '',
    cgpa_scale: '',
    cgpa: '',
    year_of_passing: '',
    expected_year_of_passing: '',
  },
  masters_info: {
    exam_degree_id: '',
    major_or_concentration: '',
    major_or_concentration_en: '',
    institute_name: '',
    institute_name_en: '',
    is_foreign_institute: '0',
    foreign_institute_country_id: '',
    result: '',
    marks_in_percentage: '',
    cgpa_scale: '',
    cgpa: '',
    year_of_passing: '',
    expected_year_of_passing: '',
  },
  phd_info: {
    exam_degree_id: '',
    major_or_concentration: '',
    major_or_concentration_en: '',
    institute_name: '',
    institute_name_en: '',
    is_foreign_institute: '0',
    foreign_institute_country_id: '',
    result: '',
    marks_in_percentage: '',
    cgpa_scale: '',
    cgpa: '',
    year_of_passing: '',
    expected_year_of_passing: '',
  },
};

const YouthCourseRegistrationPage = () => {
  const classes = useStyles();
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
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
  const [isPermanentAddressSameAsPresent, setIsPermanentAddressSameAsPresent] =
    useState<boolean>(false);

  const validationSchema = useMemo(() => {
    switch (activeStepKey) {
      case CourseConfigKeys.PERSONAL_KEY:
        return yup.object().shape({
          first_name: yup
            .string()
            .title()
            .label(messages['common.first_name_bn'] as string),
          last_name: yup
            .string()
            .title()
            .label(messages['common.last_name_bn'] as string),
          training_center_id: yup
            .string()
            .trim()
            .required()
            .label(messages['training_center.label'] as string),
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
              : yup.array().of(yup.string()),
        });
      case CourseConfigKeys.ADDRESS_KEY:
        return yup.object().shape({
          is_permanent_address: yup
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
          }),
          permanent_address: !isPermanentAddressSameAsPresent
            ? yup.object().shape({
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
              })
            : yup.object().shape({}),
        });
      case CourseConfigKeys.EDUCATION_KEY:
        return yup.object().shape({
          psc_info: visibleFormConfigKeys.includes(
            CourseConfigKeys.EDUCATION_PSC_KEY,
          )
            ? yup.object().shape({
                exam_degree_id: yup
                  .string()
                  .required()
                  .label(messages['education.education_exam_degree'] as string),
                edu_board_id: yup
                  .string()
                  .required()
                  .label(messages['education.board'] as string),
                institute_name: yup
                  .string()
                  .title()
                  .label(messages['common.institute_name_bn'] as string),
                result: yup
                  .string()
                  .required()
                  .label(messages['education.result'] as string),
                year_of_passing: yup
                  .string()
                  .required()
                  .label(messages['education.passing_year'] as string),
              })
            : yup.object().shape({}),
          jsc_info: visibleFormConfigKeys.includes(
            CourseConfigKeys.EDUCATION_JSC_KEY,
          )
            ? yup.object().shape({
                exam_degree_id: yup
                  .string()
                  .required()
                  .label(messages['education.education_exam_degree'] as string),
                edu_board_id: yup
                  .string()
                  .required()
                  .label(messages['education.board'] as string),
                institute_name: yup
                  .string()
                  .title()
                  .label(messages['common.institute_name_bn'] as string),
                result: yup
                  .string()
                  .required()
                  .label(messages['education.result'] as string),
                year_of_passing: yup
                  .string()
                  .required()
                  .label(messages['education.passing_year'] as string),
              })
            : yup.object().shape({}),
          ssc_info: visibleFormConfigKeys.includes(
            CourseConfigKeys.EDUCATION_SSC_KEY,
          )
            ? yup.object().shape({
                exam_degree_id: yup
                  .string()
                  .required()
                  .label(messages['education.education_exam_degree'] as string),
                edu_group_id: yup
                  .string()
                  .required()
                  .label(messages['education.group'] as string),
                edu_board_id: yup
                  .string()
                  .required()
                  .label(messages['education.board'] as string),
                institute_name: yup
                  .string()
                  .title()
                  .label(messages['common.institute_name_bn'] as string),
                result: yup
                  .string()
                  .required()
                  .label(messages['education.result'] as string),
                year_of_passing: yup
                  .string()
                  .required()
                  .label(messages['education.passing_year'] as string),
              })
            : yup.object().shape({}),
          hsc_info: visibleFormConfigKeys.includes(
            CourseConfigKeys.EDUCATION_HSC_KEY,
          )
            ? yup.object().shape({
                exam_degree_id: yup
                  .string()
                  .required()
                  .label(messages['education.education_exam_degree'] as string),
                edu_group_id: yup
                  .string()
                  .required()
                  .label(messages['education.group'] as string),
                edu_board_id: yup
                  .string()
                  .required()
                  .label(messages['education.board'] as string),
                institute_name: yup
                  .string()
                  .title()
                  .label(messages['common.institute_name_bn'] as string),
                result: yup
                  .string()
                  .required()
                  .label(messages['education.result'] as string),
                year_of_passing: yup
                  .string()
                  .required()
                  .label(messages['education.passing_year'] as string),
              })
            : yup.object().shape({}),
          diploma_info: visibleFormConfigKeys.includes(
            CourseConfigKeys.EDUCATION_DIPLOMA_KEY,
          )
            ? yup.object().shape({
                exam_degree_id: yup
                  .string()
                  .required()
                  .label(messages['education.education_exam_degree'] as string),
                major_or_concentration: yup
                  .string()
                  .required()
                  .label(messages['education.major_group_name_bn'] as string),
                institute_name: yup
                  .string()
                  .title()
                  .label(messages['common.institute_name_bn'] as string),
                result: yup
                  .string()
                  .required()
                  .label(messages['education.result'] as string),
                year_of_passing: yup
                  .string()
                  .required()
                  .label(messages['education.passing_year'] as string),
              })
            : yup.object().shape({}),
          honours_info: visibleFormConfigKeys.includes(
            CourseConfigKeys.EDUCATION_HONOURS_KEY,
          )
            ? yup.object().shape({
                exam_degree_id: yup
                  .string()
                  .required()
                  .label(messages['education.education_exam_degree'] as string),
                major_or_concentration: yup
                  .string()
                  .required()
                  .label(messages['education.major_group_name_bn'] as string),
                institute_name: yup
                  .string()
                  .title()
                  .label(messages['common.institute_name_bn'] as string),
                result: yup
                  .string()
                  .required()
                  .label(messages['education.result'] as string),
                year_of_passing: yup
                  .string()
                  .required()
                  .label(messages['education.passing_year'] as string),
              })
            : yup.object().shape({}),
          masters_info: visibleFormConfigKeys.includes(
            CourseConfigKeys.EDUCATION_MASTERS_KEY,
          )
            ? yup.object().shape({
                exam_degree_id: yup
                  .string()
                  .required()
                  .label(messages['education.education_exam_degree'] as string),
                major_or_concentration: yup
                  .string()
                  .required()
                  .label(messages['education.major_group_name_bn'] as string),
                institute_name: yup
                  .string()
                  .title()
                  .label(messages['common.institute_name_bn'] as string),
                result: yup
                  .string()
                  .required()
                  .label(messages['education.result'] as string),
                year_of_passing: yup
                  .string()
                  .required()
                  .label(messages['education.passing_year'] as string),
              })
            : yup.object().shape({}),
          phd_info: visibleFormConfigKeys.includes(
            CourseConfigKeys.EDUCATION_PHD_KEY,
          )
            ? yup.object().shape({
                exam_degree_name: yup
                  .string()
                  .required()
                  .label(
                    messages[
                      'education.education_exam_degree_name_bn'
                    ] as string,
                  ),
                major_or_concentration: yup
                  .string()
                  .required()
                  .label(messages['education.major_group_name_bn'] as string),
                institute_name: yup
                  .string()
                  .title()
                  .label(messages['common.institute_name_bn'] as string),
                result: yup
                  .string()
                  .required()
                  .label(messages['education.result'] as string),
                year_of_passing: yup
                  .string()
                  .required()
                  .label(messages['education.passing_year'] as string),
              })
            : yup.object().shape({}),
        });
      case CourseConfigKeys.OCCUPATION_KEY:
        return yup.object().shape({
          professional_info: yup.object().shape({
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
          }),
        });
      case CourseConfigKeys.GUARDIAN_KEY:
        return yup.object().shape({
          guardian_info: yup.object().shape({
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
          }),
        });
      case CourseConfigKeys.MISCELLANEOUS_KEY:
        return yup.object().shape({
          miscellaneous_info: yup.object().shape({
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
          }),
        });
      default:
        return yup.object().shape({});
    }
  }, [
    activeStepKey,
    hasDisabilities,
    isPhysicalDisabilitiesRequired,
    requiredFormConfigKeys,
    isPermanentAddressSameAsPresent,
  ]);

  const {
    control,
    register,
    watch,
    handleSubmit,
    reset,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const watchFields: any = watch(['physical_disability_status']);

  useEffect(() => {
    if (watchFields[0] && watchFields[0] == PhysicalDisabilityStatus.YES) {
      setHasDisabilities(true);
    }
  }, [watchFields]);

  useEffect(() => {
    if (course && authUser?.isYouthUser) {
      setFormSettings(course.application_form_settings);
      reset({
        ...initialValues,
        ...{
          first_name: authUser?.first_name,
          last_name: authUser?.last_name,
          date_of_birth: getMomentDateFormat(authUser?.date_of_birth),
          physical_disability_status: authUser?.physical_disability_status,
          physical_disabilities: getPhysicalDisabilityIds(
            authUser?.physical_disabilities,
          ),
          gender: authUser?.gender,
          mobile: authUser?.mobile,
          email: authUser?.email,
          marital_status: authUser?.marital_status,
          freedom_fighter_status: authUser?.freedom_fighter_status,
          religion: authUser?.religion,
          nationality: authUser?.nationality,
          does_belong_to_ethnic_group: authUser?.does_belong_to_ethnic_group,
        },
      });
    }
  }, [course, authUser]);

  const getPhysicalDisabilityIds = (physicalDisabilities: any) => {
    return (physicalDisabilities || []).map(
      (physicalDisability: any) => physicalDisability.id,
    );
  };

  const setFormSettings = (config: string | undefined | null) => {
    try {
      const steps = [
        CourseConfigKeys.PERSONAL_KEY.toString(),
        CourseConfigKeys.ADDRESS_KEY.toString(),
      ];
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

  const onChangeSameAsPresentCheck = useCallback((checked: boolean) => {
    setIsPermanentAddressSameAsPresent((prev) => !prev);
  }, []);

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
          <AddressForm
            register={register}
            errors={errors}
            control={control}
            onChangeSameAsPresentCheck={onChangeSameAsPresentCheck}
          />
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

  const onSubmit: SubmitHandler<any> = async (formData: any) => {
    try {
      console.log('submit', formData);
      if (activeStep < stepKeys.length - 1) {
        handleNext();
      } else if (activeStep == stepKeys.length - 1) {
        let data: any = {...formData};
        data.youth_id = authUser?.youthId;
        data.course_id = course?.id;
        data.address_info = {};
        data.address_info.present_address = formData.present_address;
        data.address_info.is_permanent_address = formData.is_permanent_address;
        data.address_info.permanent_address = formData.is_permanent_address
          ? formData.present_address
          : formData.permanent_address;

        if (visibleFormConfigKeys.includes(CourseConfigKeys.EDUCATION_KEY)) {
          data.education_info = {};

          if (
            visibleFormConfigKeys.includes(CourseConfigKeys.EDUCATION_PSC_KEY)
          )
            data.education_info['1'] = data.psc_info;

          if (
            visibleFormConfigKeys.includes(CourseConfigKeys.EDUCATION_JSC_KEY)
          )
            data.education_info['2'] = data.jsc_info;

          if (
            visibleFormConfigKeys.includes(CourseConfigKeys.EDUCATION_SSC_KEY)
          )
            data.education_info['3'] = data.ssc_info;

          if (
            visibleFormConfigKeys.includes(CourseConfigKeys.EDUCATION_HSC_KEY)
          )
            data.education_info['4'] = data.hsc_info;

          if (
            visibleFormConfigKeys.includes(
              CourseConfigKeys.EDUCATION_DIPLOMA_KEY,
            )
          )
            data.education_info['5'] = data.diploma_info;

          if (
            visibleFormConfigKeys.includes(
              CourseConfigKeys.EDUCATION_HONOURS_KEY,
            )
          )
            data.education_info['6'] = data.honours_info;

          if (
            visibleFormConfigKeys.includes(
              CourseConfigKeys.EDUCATION_MASTERS_KEY,
            )
          )
            data.education_info['7'] = data.masters_info;

          if (
            visibleFormConfigKeys.includes(CourseConfigKeys.EDUCATION_PHD_KEY)
          )
            data.education_info['8'] = data.phd_info;
        }

        delete data.psc_info;
        delete data.jsc_info;
        delete data.ssc_info;
        delete data.hsc_info;
        delete data.diploma_info;
        delete data.honours_info;
        delete data.masters_info;
        delete data.phd_info;
        delete data.present_address;
        delete data.is_permanent_address;
        delete data.permanent_address;
        delete data.email;
        delete data.mobile;

        console.log('data ', data);
        await courseEnroll(data);

        router
          .push({
            pathname: LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT_SUCCESS + course.id,
          })
          .then((r) => {});
      }
    } catch (error: any) {
      processServerSideErrors({
        setError,
        validationSchema,
        errorStack,
        error,
      });
    }
  };

  return (
    <Container maxWidth={'lg'} className={classes.rootContainer}>
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
