import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {styled} from '@mui/material/styles';
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
import EducationalQualificationForm from './EducationalQualificationForm';
import OccupationalInfoForm from './OccupationalInfoForm';
import GuardiansInfoForm from './GuardiansInfoForm';
import OtherInfoForm from './OtherInfoForm';
import {useIntl} from 'react-intl';
import {useRouter} from 'next/router';
import {useFetchPublicCourseDetails} from '../../../services/instituteManagement/hooks';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';
import CourseConfigKeys from '../../../@softbd/utilities/CourseConfigKeys';
import PhysicalDisabilityStatus from '../../../@softbd/utilities/PhysicalDisabilityStatus';
import Genders from '../../../@softbd/utilities/Genders';
import MaritalStatus from '../../../@softbd/utilities/MaritalStatus';
import FreedomFighterStatus from '../../../@softbd/utilities/FreedomFighterStatus';
import Religions from '../../../@softbd/utilities/Religions';
import {MOBILE_NUMBER_REGEX} from '../../../@softbd/common/patternRegex';
import {getMomentDateFormat} from '../../../@softbd/utilities/helpers';
import {courseEnroll} from '../../../services/youthManagement/YouthService';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT_SUBMITTED} from '../../../@softbd/common/appLinks';
import {
  EducationLevelId,
  ResultCodeAppearedId,
  ResultCodeDivisionIds,
  ResultCodeGradeId,
} from '../profile/utilities/EducationEnums';
import EthnicGroupStatus from '../../../@softbd/utilities/EthnicGroupStatus';
import {AddressTypeId} from '../profile/utilities/AddressType';
import moment from 'moment';
import {DATE_OF_BIRTH_MIN_AGE} from '../../../@softbd/common/constants';

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
  signature_image_path: '',
  passport_photo_path: '',
  physical_disability_status: PhysicalDisabilityStatus.NO,
  physical_disabilities: [],
  gender: Genders.MALE,
  marital_status: MaritalStatus.SINGLE,
  freedom_fighter_status: FreedomFighterStatus.NO,
  religion: Religions.ISLAM,
  nationality: '',
  training_center_id: '',
  does_belong_to_ethnic_group: false,
  present_address: {
    loc_division_id: '',
    loc_district_id: '',
    loc_upazila_id: '',
  },
  is_permanent_address: false,
  permanent_address: {
    loc_division_id: '',
    loc_district_id: '',
    loc_upazila_id: '',
  },
  professional_info: {
    main_profession: '',
    monthly_income: '',
    is_currently_employed: false,
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
    is_foreign_institute: false,
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
    is_foreign_institute: false,
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
    is_foreign_institute: false,
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
    is_foreign_institute: false,
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
    is_foreign_institute: false,
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
    is_foreign_institute: false,
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
    is_foreign_institute: false,
    foreign_institute_country_id: '',
    result: '',
    marks_in_percentage: '',
    cgpa_scale: '',
    cgpa: '',
    year_of_passing: '',
    expected_year_of_passing: '',
  },
  phd_info: {
    exam_degree_name: '',
    exam_degree_name_en: '',
    major_or_concentration: '',
    major_or_concentration_en: '',
    institute_name: '',
    institute_name_en: '',
    is_foreign_institute: false,
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
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const router = useRouter();
  const {courseId} = router.query;
  const authUser = useAuthUser<YouthAuthUser>();
  const {data: course} = useFetchPublicCourseDetails(Number(courseId));

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
  const [isSuccessSubmit, setIsSuccessSubmit] = useState<boolean>(false);

  // const postalCodeRegex = /^([1-9]{1})[0-9]{3}$/g;

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
          date_of_birth: yup
            .string()
            .trim()
            .required()
            .matches(/(19|20)\d\d-[01]\d-[0123]\d/)
            .label(messages['common.date_of_birth'] as string)
            .test(
              'DOB',
              messages['common.invalid_date_of_birth'] as string,
              (value) =>
                moment().diff(moment(value), 'years') >= DATE_OF_BIRTH_MIN_AGE,
            ),
          physical_disability_status: isPhysicalDisabilitiesRequired
            ? yup
                .string()
                .trim()
                .required()
                .label(
                  messages['common.physical_disabilities_status'] as string,
                )
            : yup.string(),
          physical_disabilities:
            hasDisabilities && isPhysicalDisabilitiesRequired
              ? yup
                  .array()
                  .of(yup.string())
                  .min(1)
                  .label(messages['common.physical_disability'] as string)
              : yup.array().of(yup.string()),
          does_belong_to_ethnic_group: yup
            .boolean()
            .required()
            .label(messages['youth_registration.ethnic_group'] as string),
          marital_status: yup
            .string()
            .trim()
            .required()
            .label(messages['common.marital_status'] as string),
          religion: yup
            .string()
            .trim()
            .required()
            .label(messages['common.religion'] as string),
          freedom_fighter_status: yup
            .string()
            .trim()
            .required()
            .label(messages['common.freedom_fighter_status'] as string),
        });
      case CourseConfigKeys.ADDRESS_KEY:
        return yup.object().shape({
          is_permanent_address: yup
            .boolean()
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
            zip_or_postal_code: yup
              .string()
              .label(messages['common.zip_or_postal_code'] as string)
              .test(
                'min_max_check',
                messages['common.four_digit'] as string,
                (value) => !value || Boolean(value.length === 4),
              ),
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
                zip_or_postal_code: yup
                  .string()
                  .label(messages['common.zip_or_postal_code'] as string)
                  .test(
                    'min_max_check',
                    messages['common.four_digit'] as string,
                    (value) => !value || Boolean(value.length === 4),
                  ),
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
                is_foreign_institute: yup
                  .boolean()
                  .required()
                  .label(messages['education.is_foreign_institute'] as string),
                foreign_institute_country_id: yup
                  .mixed()
                  .label(
                    messages['education.foreign_institute_country'] as string,
                  )
                  .when('is_foreign_institute', {
                    is: true,
                    then: yup.string().required(),
                  }),
                result: yup
                  .string()
                  .required()
                  .label(messages['education.result'] as string),
                marks_in_percentage: yup
                  .mixed()
                  .label(messages['education.marks'] as string)
                  .when('result', {
                    is: (value: any) => ResultCodeDivisionIds.includes(value),
                    then: yup.string().max(3).required(),
                  }),
                cgpa_scale: yup
                  .mixed()
                  .label(messages['education.cgpa_scale'] as string)
                  .when('result', {
                    is: (value: any) => value == ResultCodeGradeId,
                    then: yup.string().max(1).required(),
                  })
                  .test(
                    'cgpa_scale_validation',
                    messages['common.cgpa_scale'] as string,
                    (value) => Boolean(value <= 5),
                  ),
                cgpa: yup
                  .mixed()
                  .label(messages['education.cgpa'] as string)
                  .when('result', {
                    is: (value: any) => value == ResultCodeGradeId,
                    then: yup.string().max(4).required(),
                  })
                  .test(
                    'cgpa_scale_validation',
                    messages['common.cgpa_scale'] as string,
                    (value) => Boolean(value <= 5),
                  ),
                year_of_passing: yup
                  .mixed()
                  .label(messages['education.passing_year'] as string)
                  .when('result', {
                    is: (value: any) => value != ResultCodeAppearedId,
                    then: yup.string().required(),
                  }),
                expected_year_of_passing: yup
                  .mixed()
                  .label(messages['education.expected_passing_year'] as string)
                  .when('result', {
                    is: (value: any) => value == ResultCodeAppearedId,
                    then: yup.string().required(),
                  }),
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
                is_foreign_institute: yup
                  .boolean()
                  .required()
                  .label(messages['education.is_foreign_institute'] as string),
                foreign_institute_country_id: yup
                  .mixed()
                  .label(
                    messages['education.foreign_institute_country'] as string,
                  )
                  .when('is_foreign_institute', {
                    is: true,
                    then: yup.string().required(),
                  }),
                result: yup
                  .string()
                  .required()
                  .label(messages['education.result'] as string),
                marks_in_percentage: yup
                  .mixed()
                  .label(messages['education.marks'] as string)
                  .when('result', {
                    is: (value: any) => ResultCodeDivisionIds.includes(value),
                    then: yup.string().max(3).required(),
                  }),
                cgpa_scale: yup
                  .mixed()
                  .label(messages['education.cgpa_scale'] as string)
                  .when('result', {
                    is: (value: any) => value == ResultCodeGradeId,
                    then: yup.string().max(1).required(),
                  })
                  .test(
                    'cgpa_scale_validation',
                    messages['common.cgpa_scale'] as string,
                    (value) => Boolean(value <= 5),
                  ),
                cgpa: yup
                  .mixed()
                  .label(messages['education.cgpa'] as string)
                  .when('result', {
                    is: (value: any) => value == ResultCodeGradeId,
                    then: yup.string().max(4).required(),
                  })
                  .test(
                    'cgpa_scale_validation',
                    messages['common.cgpa_scale'] as string,
                    (value) => Boolean(value <= 5),
                  ),
                year_of_passing: yup
                  .mixed()
                  .label(messages['education.passing_year'] as string)
                  .when('result', {
                    is: (value: any) => value != ResultCodeAppearedId,
                    then: yup.string().required(),
                  }),
                expected_year_of_passing: yup
                  .mixed()
                  .label(messages['education.expected_passing_year'] as string)
                  .when('result', {
                    is: (value: any) => value == ResultCodeAppearedId,
                    then: yup.string().required(),
                  }),
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
                is_foreign_institute: yup
                  .boolean()
                  .required()
                  .label(messages['education.is_foreign_institute'] as string),
                foreign_institute_country_id: yup
                  .mixed()
                  .label(
                    messages['education.foreign_institute_country'] as string,
                  )
                  .when('is_foreign_institute', {
                    is: true,
                    then: yup.string().required(),
                  }),
                result: yup
                  .string()
                  .required()
                  .label(messages['education.result'] as string),
                marks_in_percentage: yup
                  .mixed()
                  .label(messages['education.marks'] as string)
                  .when('result', {
                    is: (value: any) => ResultCodeDivisionIds.includes(value),
                    then: yup.string().max(3).required(),
                  }),
                cgpa_scale: yup
                  .mixed()
                  .label(messages['education.cgpa_scale'] as string)
                  .when('result', {
                    is: (value: any) => value == ResultCodeGradeId,
                    then: yup.string().max(1).required(),
                  })
                  .test(
                    'cgpa_scale_validation',
                    messages['common.cgpa_scale'] as string,
                    (value) => Boolean(value <= 5),
                  ),
                cgpa: yup
                  .mixed()
                  .label(messages['education.cgpa'] as string)
                  .when('result', {
                    is: (value: any) => value == ResultCodeGradeId,
                    then: yup.string().max(4).required(),
                  })
                  .test(
                    'cgpa_scale_validation',
                    messages['common.cgpa_scale'] as string,
                    (value) => Boolean(value <= 5),
                  ),
                year_of_passing: yup
                  .mixed()
                  .label(messages['education.passing_year'] as string)
                  .when('result', {
                    is: (value: any) => value != ResultCodeAppearedId,
                    then: yup.string().required(),
                  }),
                expected_year_of_passing: yup
                  .mixed()
                  .label(messages['education.expected_passing_year'] as string)
                  .when('result', {
                    is: (value: any) => value == ResultCodeAppearedId,
                    then: yup.string().required(),
                  }),
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
                is_foreign_institute: yup
                  .boolean()
                  .required()
                  .label(messages['education.is_foreign_institute'] as string),
                foreign_institute_country_id: yup
                  .mixed()
                  .label(
                    messages['education.foreign_institute_country'] as string,
                  )
                  .when('is_foreign_institute', {
                    is: true,
                    then: yup.string().required(),
                  }),
                result: yup
                  .string()
                  .required()
                  .label(messages['education.result'] as string),
                marks_in_percentage: yup
                  .mixed()
                  .label(messages['education.marks'] as string)
                  .when('result', {
                    is: (value: any) => ResultCodeDivisionIds.includes(value),
                    then: yup.string().max(3).required(),
                  }),
                cgpa_scale: yup
                  .mixed()
                  .label(messages['education.cgpa_scale'] as string)
                  .when('result', {
                    is: (value: any) => value == ResultCodeGradeId,
                    then: yup.string().max(1).required(),
                  })
                  .test(
                    'cgpa_scale_validation',
                    messages['common.cgpa_scale'] as string,
                    (value) => Boolean(value <= 5),
                  ),
                cgpa: yup
                  .mixed()
                  .label(messages['education.cgpa'] as string)
                  .when('result', {
                    is: (value: any) => value == ResultCodeGradeId,
                    then: yup.string().max(4).required(),
                  })
                  .test(
                    'cgpa_scale_validation',
                    messages['common.cgpa_scale'] as string,
                    (value) => Boolean(value <= 5),
                  ),
                year_of_passing: yup
                  .mixed()
                  .label(messages['education.passing_year'] as string)
                  .when('result', {
                    is: (value: any) => value != ResultCodeAppearedId,
                    then: yup.string().required(),
                  }),
                expected_year_of_passing: yup
                  .mixed()
                  .label(messages['education.expected_passing_year'] as string)
                  .when('result', {
                    is: (value: any) => value == ResultCodeAppearedId,
                    then: yup.string().required(),
                  }),
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
                is_foreign_institute: yup
                  .boolean()
                  .required()
                  .label(messages['education.is_foreign_institute'] as string),
                foreign_institute_country_id: yup
                  .mixed()
                  .label(
                    messages['education.foreign_institute_country'] as string,
                  )
                  .when('is_foreign_institute', {
                    is: true,
                    then: yup.string().required(),
                  }),
                result: yup
                  .string()
                  .required()
                  .label(messages['education.result'] as string),
                marks_in_percentage: yup
                  .mixed()
                  .label(messages['education.marks'] as string)
                  .when('result', {
                    is: (value: any) => ResultCodeDivisionIds.includes(value),
                    then: yup.string().max(3).required(),
                  }),
                cgpa_scale: yup
                  .mixed()
                  .label(messages['education.cgpa_scale'] as string)
                  .when('result', {
                    is: (value: any) => value == ResultCodeGradeId,
                    then: yup.string().max(1).required(),
                  })
                  .test(
                    'cgpa_scale_validation',
                    messages['common.cgpa_scale'] as string,
                    (value) => Boolean(value <= 5),
                  ),
                cgpa: yup
                  .mixed()
                  .label(messages['education.cgpa'] as string)
                  .when('result', {
                    is: (value: any) => value == ResultCodeGradeId,
                    then: yup.string().max(4).required(),
                  })
                  .test(
                    'cgpa_scale_validation',
                    messages['common.cgpa_scale'] as string,
                    (value) => Boolean(value <= 5),
                  ),
                year_of_passing: yup
                  .mixed()
                  .label(messages['education.passing_year'] as string)
                  .when('result', {
                    is: (value: any) => value != ResultCodeAppearedId,
                    then: yup.string().required(),
                  }),
                expected_year_of_passing: yup
                  .mixed()
                  .label(messages['education.expected_passing_year'] as string)
                  .when('result', {
                    is: (value: any) => value == ResultCodeAppearedId,
                    then: yup.string().required(),
                  }),
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
                is_foreign_institute: yup
                  .boolean()
                  .required()
                  .label(messages['education.is_foreign_institute'] as string),
                foreign_institute_country_id: yup
                  .mixed()
                  .label(
                    messages['education.foreign_institute_country'] as string,
                  )
                  .when('is_foreign_institute', {
                    is: true,
                    then: yup.string().required(),
                  }),
                result: yup
                  .string()
                  .required()
                  .label(messages['education.result'] as string),
                marks_in_percentage: yup
                  .mixed()
                  .label(messages['education.marks'] as string)
                  .when('result', {
                    is: (value: any) => ResultCodeDivisionIds.includes(value),
                    then: yup.string().max(3).required(),
                  }),
                cgpa_scale: yup
                  .mixed()
                  .label(messages['education.cgpa_scale'] as string)
                  .when('result', {
                    is: (value: any) => value == ResultCodeGradeId,
                    then: yup.string().max(1).required(),
                  })
                  .test(
                    'cgpa_scale_validation',
                    messages['common.cgpa_scale'] as string,
                    (value) => Boolean(value <= 5),
                  ),
                cgpa: yup
                  .mixed()
                  .label(messages['education.cgpa'] as string)
                  .when('result', {
                    is: (value: any) => value == ResultCodeGradeId,
                    then: yup.string().max(4).required(),
                  })
                  .test(
                    'cgpa_scale_validation',
                    messages['common.cgpa_scale'] as string,
                    (value) => Boolean(value <= 5),
                  ),
                year_of_passing: yup
                  .mixed()
                  .label(messages['education.passing_year'] as string)
                  .when('result', {
                    is: (value: any) => value != ResultCodeAppearedId,
                    then: yup.string().required(),
                  }),
                expected_year_of_passing: yup
                  .mixed()
                  .label(messages['education.expected_passing_year'] as string)
                  .when('result', {
                    is: (value: any) => value == ResultCodeAppearedId,
                    then: yup.string().required(),
                  }),
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
                is_foreign_institute: yup
                  .boolean()
                  .required()
                  .label(messages['education.is_foreign_institute'] as string),
                foreign_institute_country_id: yup
                  .mixed()
                  .label(
                    messages['education.foreign_institute_country'] as string,
                  )
                  .when('is_foreign_institute', {
                    is: true,
                    then: yup.string().required(),
                  }),
                result: yup
                  .string()
                  .required()
                  .label(messages['education.result'] as string),
                marks_in_percentage: yup
                  .mixed()
                  .label(messages['education.marks'] as string)
                  .when('result', {
                    is: (value: any) => ResultCodeDivisionIds.includes(value),
                    then: yup.string().max(3).required(),
                  }),
                cgpa_scale: yup
                  .mixed()
                  .label(messages['education.cgpa_scale'] as string)
                  .when('result', {
                    is: (value: any) => value == ResultCodeGradeId,
                    then: yup.string().max(1).required(),
                  })
                  .test(
                    'cgpa_scale_validation',
                    messages['common.cgpa_scale'] as string,
                    (value) => Boolean(value <= 5),
                  ),
                cgpa: yup
                  .mixed()
                  .label(messages['education.cgpa'] as string)
                  .when('result', {
                    is: (value: any) => value == ResultCodeGradeId,
                    then: yup.string().max(4).required(),
                  })
                  .test(
                    'cgpa_scale_validation',
                    messages['common.cgpa_scale'] as string,
                    (value) => Boolean(value <= 5),
                  ),
                year_of_passing: yup
                  .mixed()
                  .label(messages['education.passing_year'] as string)
                  .when('result', {
                    is: (value: any) => value != ResultCodeAppearedId,
                    then: yup.string().required(),
                  }),
                expected_year_of_passing: yup
                  .mixed()
                  .label(messages['education.expected_passing_year'] as string)
                  .when('result', {
                    is: (value: any) => value == ResultCodeAppearedId,
                    then: yup.string().required(),
                  }),
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
                is_foreign_institute: yup
                  .boolean()
                  .required()
                  .label(messages['education.is_foreign_institute'] as string),
                foreign_institute_country_id: yup
                  .mixed()
                  .label(
                    messages['education.foreign_institute_country'] as string,
                  )
                  .when('is_foreign_institute', {
                    is: true,
                    then: yup.string().required(),
                  }),
                result: yup
                  .string()
                  .required()
                  .label(messages['education.result'] as string),
                marks_in_percentage: yup
                  .mixed()
                  .label(messages['education.marks'] as string)
                  .when('result', {
                    is: (value: any) => ResultCodeDivisionIds.includes(value),
                    then: yup.string().max(3).required(),
                  }),
                cgpa_scale: yup
                  .mixed()
                  .label(messages['education.cgpa_scale'] as string)
                  .when('result', {
                    is: (value: any) => value == ResultCodeGradeId,
                    then: yup.string().max(1).required(),
                  })
                  .test(
                    'cgpa_scale_validation',
                    messages['common.cgpa_scale'] as string,
                    (value) => Boolean(value <= 5),
                  ),
                cgpa: yup
                  .mixed()
                  .label(messages['education.cgpa'] as string)
                  .when('result', {
                    is: (value: any) => value == ResultCodeGradeId,
                    then: yup.string().max(4).required(),
                  })
                  .test(
                    'cgpa_scale_validation',
                    messages['common.cgpa_scale'] as string,
                    (value) => Boolean(value <= 5),
                  ),
                year_of_passing: yup
                  .mixed()
                  .label(messages['education.passing_year'] as string)
                  .when('result', {
                    is: (value: any) => value != ResultCodeAppearedId,
                    then: yup.string().required(),
                  }),
                expected_year_of_passing: yup
                  .mixed()
                  .label(messages['education.expected_passing_year'] as string)
                  .when('result', {
                    is: (value: any) => value == ResultCodeAppearedId,
                    then: yup.string().required(),
                  }),
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
              .boolean()
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
              .label(messages['common.mobile'] as string)
              .test(
                'mobile_number_validation',
                messages['common.invalid_mobile'] as string,
                (value) => !value || Boolean(value.match(MOBILE_NUMBER_REGEX)),
              ),
            mother_name: yup
              .string()
              .trim()
              .required()
              .label(messages['common.name_bn'] as string),
            mother_mobile: yup
              .string()
              .trim()
              .label(messages['common.mobile'] as string)
              .test(
                'mobile_number_validation',
                messages['common.invalid_mobile'] as string,
                (value) => !value || Boolean(value.match(MOBILE_NUMBER_REGEX)),
              ),
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
    handleSubmit,
    reset,
    setError,
    getValues,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const physicalDisabilityStatus: any = getValues(
      'physical_disability_status',
    );

    setHasDisabilities(
      physicalDisabilityStatus == PhysicalDisabilityStatus.YES,
    );
  }, [getValues]);
  const getEducationDataByLevel = (education: any) => {
    switch (Number(education?.education_level_id)) {
      case EducationLevelId.PSC:
        return {
          cgpa: education.cgpa,
          cgpa_scale: education?.cgpa_scale,
          edu_board_id: education?.edu_board_id,
          exam_degree_id: education?.exam_degree_id,
          expected_year_of_passing: String(
            String(education?.expected_year_of_passing),
          ),
          foreign_institute_country_id: education?.foreign_institute_country_id,
          institute_name: education?.institute_name,
          institute_name_en: education?.institute_name_en,
          is_foreign_institute: education?.is_foreign_institute,
          marks_in_percentage: education?.marks_in_percentage,
          result: education?.result?.id,
          year_of_passing: String(education?.year_of_passing),
        };
      case EducationLevelId.JSC:
        return {
          cgpa: education.cgpa,
          cgpa_scale: education?.cgpa_scale,
          edu_board_id: education?.edu_board_id,
          exam_degree_id: education?.exam_degree_id,
          expected_year_of_passing: String(education?.expected_year_of_passing),
          foreign_institute_country_id: education?.foreign_institute_country_id,
          institute_name: education?.institute_name,
          institute_name_en: education?.institute_name_en,
          is_foreign_institute: education?.is_foreign_institute,
          marks_in_percentage: education?.marks_in_percentage,
          result: education?.result?.id,
          year_of_passing: String(education?.year_of_passing),
        };
      case EducationLevelId.SSC:
        return {
          cgpa: education.cgpa,
          cgpa_scale: education?.cgpa_scale,
          edu_board_id: education?.edu_board_id,
          edu_group_id: education?.edu_group_id,
          exam_degree_id: education?.exam_degree_id,
          expected_year_of_passing: String(education?.expected_year_of_passing),
          foreign_institute_country_id: education?.foreign_institute_country_id,
          institute_name: education?.institute_name,
          institute_name_en: education?.institute_name_en,
          is_foreign_institute: education?.is_foreign_institute,
          marks_in_percentage: education?.marks_in_percentage,
          result: education?.result?.id,
          year_of_passing: String(education?.year_of_passing),
        };
      case EducationLevelId.HSC:
        return {
          cgpa: education.cgpa,
          cgpa_scale: education?.cgpa_scale,
          edu_board_id: education?.edu_board_id,
          edu_group_id: education?.edu_group_id,
          exam_degree_id: education?.exam_degree_id,
          expected_year_of_passing: String(education?.expected_year_of_passing),
          foreign_institute_country_id: education?.foreign_institute_country_id,
          institute_name: education?.institute_name,
          institute_name_en: education?.institute_name_en,
          is_foreign_institute: education?.is_foreign_institute,
          marks_in_percentage: education?.marks_in_percentage,
          result: education?.result?.id,
          year_of_passing: String(education?.year_of_passing),
        };
      case EducationLevelId.DIPLOMA:
        return {
          major_or_concentration: education?.major_or_concentration,
          major_or_concentration_en: education?.major_or_concentration_en,
          cgpa: education.cgpa,
          cgpa_scale: education?.cgpa_scale,
          exam_degree_id: education?.exam_degree_id,
          expected_year_of_passing: String(education?.expected_year_of_passing),
          foreign_institute_country_id: education?.foreign_institute_country_id,
          institute_name: education?.institute_name,
          institute_name_en: education?.institute_name_en,
          is_foreign_institute: education?.is_foreign_institute,
          marks_in_percentage: education?.marks_in_percentage,
          result: education?.result?.id,
          year_of_passing: String(education?.year_of_passing),
        };
      case EducationLevelId.HONOURS:
        return {
          major_or_concentration: education?.major_or_concentration,
          major_or_concentration_en: education?.major_or_concentration_en,
          cgpa: education.cgpa,
          cgpa_scale: education?.cgpa_scale,
          exam_degree_id: education?.exam_degree_id,
          expected_year_of_passing: String(education?.expected_year_of_passing),
          foreign_institute_country_id: education?.foreign_institute_country_id,
          institute_name: education?.institute_name,
          institute_name_en: education?.institute_name_en,
          is_foreign_institute: education?.is_foreign_institute,
          marks_in_percentage: education?.marks_in_percentage,
          result: education?.result?.id,
          year_of_passing: String(education?.year_of_passing),
        };
      case EducationLevelId.MASTERS:
        return {
          major_or_concentration: education?.major_or_concentration,
          major_or_concentration_en: education?.major_or_concentration_en,
          cgpa: education.cgpa,
          cgpa_scale: education?.cgpa_scale,
          exam_degree_id: education?.exam_degree_id,
          expected_year_of_passing: String(education?.expected_year_of_passing),
          foreign_institute_country_id: education?.foreign_institute_country_id,
          institute_name: education?.institute_name,
          institute_name_en: education?.institute_name_en,
          is_foreign_institute: education?.is_foreign_institute,
          marks_in_percentage: education?.marks_in_percentage,
          result: education?.result?.id,
          year_of_passing: String(education?.year_of_passing),
        };
      case EducationLevelId.PHD:
        return {
          exam_degree_name: education?.exam_degree_name,
          exam_degree_name_en: education?.exam_degree_name_en,
          major_or_concentration: education?.major_or_concentration,
          major_or_concentration_en: education?.major_or_concentration_en,
          cgpa: education.cgpa,
          cgpa_scale: education?.cgpa_scale,
          expected_year_of_passing: String(education?.expected_year_of_passing),
          foreign_institute_country_id: education?.foreign_institute_country_id,
          institute_name: education?.institute_name,
          institute_name_en: education?.institute_name_en,
          is_foreign_institute: education?.is_foreign_institute,
          marks_in_percentage: education?.marks_in_percentage,
          result: education?.result?.id,
          year_of_passing: String(education?.year_of_passing),
        };
      default:
        return {};
    }
  };
  const getAddressDataByLevel = (address: any) => {
    if (address.address_type == AddressTypeId.PRESENT) {
      return {
        loc_division_id: address?.loc_division_id,
        loc_upazila_id: address?.loc_upazila_id,
        loc_district_id: address?.loc_district_id,
        zip_or_postal_code: address?.zip_or_postal_code,
        village_or_area: address?.village_or_area,
        house_n_road: address?.house_n_road,
      };
    } else if (address.address_type == AddressTypeId.PERMANENT) {
      return {
        loc_division_id: address?.loc_division_id,
        loc_upazila_id: address?.loc_upazila_id,
        loc_district_id: address?.loc_district_id,
        zip_or_postal_code: address?.zip_or_postal_code,
        village_or_area: address?.village_or_area,
        house_n_road: address?.house_n_road,
      };
    }
  };
  useEffect(() => {
    if (course && authUser?.isYouthUser) {
      setFormSettings(course.application_form_settings);
      const youthData: any = {
        first_name: authUser?.first_name,
        last_name: authUser?.last_name,
        first_name_en: authUser?.first_name_en,
        last_name_en: authUser?.last_name_en,
        passport_photo_path: authUser?.photo,
        signature_image_path: authUser?.signature_image_path,
        date_of_birth: getMomentDateFormat(
          authUser?.date_of_birth,
          'YYYY-MM-DD',
        ),
        physical_disability_status: authUser?.physical_disability_status,
        physical_disabilities: getPhysicalDisabilityIds(
          authUser?.physical_disabilities,
        ),
        gender: authUser?.gender,
        mobile: authUser?.mobile,
        email: authUser?.email,
        marital_status: authUser?.marital_status,
        freedom_fighter_status: authUser?.freedom_fighter_status
          ? authUser?.freedom_fighter_status
          : FreedomFighterStatus.NO,
        religion: authUser?.religion,
        nationality: authUser?.nationality,
        does_belong_to_ethnic_group:
          String(authUser?.does_belong_to_ethnic_group) ==
          EthnicGroupStatus.YES,
      };

      (authUser.educations || []).forEach((education: any) => {
        if (education.education_level_id == EducationLevelId.PSC) {
          youthData.psc_info = getEducationDataByLevel(education);
        } else if (education.education_level_id == EducationLevelId.JSC) {
          youthData.jsc_info = getEducationDataByLevel(education);
        } else if (education.education_level_id == EducationLevelId.SSC) {
          youthData.ssc_info = getEducationDataByLevel(education);
        } else if (education.education_level_id == EducationLevelId.HSC) {
          youthData.hsc_info = getEducationDataByLevel(education);
        } else if (education.education_level_id == EducationLevelId.DIPLOMA) {
          youthData.diploma_info = getEducationDataByLevel(education);
        } else if (education.education_level_id == EducationLevelId.HONOURS) {
          youthData.honours_info = getEducationDataByLevel(education);
        } else if (education.education_level_id == EducationLevelId.MASTERS) {
          youthData.masters_info = getEducationDataByLevel(education);
        } else if (education.education_level_id == EducationLevelId.PHD) {
          youthData.phd_info = getEducationDataByLevel(education);
        }
      });

      (authUser?.addresses || []).forEach((address: any) => {
        if (address.address_type == AddressTypeId.PRESENT) {
          youthData.present_address = getAddressDataByLevel(address);
        } else if (address.address_type == AddressTypeId.PERMANENT) {
          youthData.permanent_address = getAddressDataByLevel(address);
        }
      });

      reset({
        ...initialValues,
        ...youthData,
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
            register={register}
            errors={errors}
            control={control}
            getValues={getValues}
            setValue={setValue}
            visibleFieldKeys={visibleFormConfigKeys}
            courseId={courseId}
          />
        );
      case CourseConfigKeys.ADDRESS_KEY:
        return (
          <AddressForm
            register={register}
            errors={errors}
            control={control}
            getValues={getValues}
            onChangeSameAsPresentCheck={onChangeSameAsPresentCheck}
          />
        );
      case CourseConfigKeys.EDUCATION_KEY:
        return (
          <EducationalQualificationForm
            register={register}
            errors={errors}
            control={control}
            getValues={getValues}
            visibleFieldKeys={visibleFormConfigKeys}
          />
        );
      case CourseConfigKeys.OCCUPATION_KEY:
        return (
          <OccupationalInfoForm
            register={register}
            errors={errors}
            getValues={getValues}
          />
        );
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

  console.log('errors', errors);

  const onSubmit: SubmitHandler<any> = async (formData: any) => {
    try {
      console.log('submit', formData);
      if (activeStep < stepKeys.length - 1) {
        handleNext();
      } else if (activeStep == stepKeys.length - 1) {
        let data: any = {...formData};
        data.youth_id = authUser?.youthId;
        data.youth_code = authUser?.youthCode;
        data.course_id = course?.id;
        data.does_belong_to_ethnic_group = formData.does_belong_to_ethnic_group
          ? 1
          : 0;
        data.address_info = {};
        data.address_info.present_address = formData.present_address;
        data.address_info.is_permanent_address =
          formData.is_permanent_address == true ? 1 : 0;
        data.address_info.permanent_address = formData.is_permanent_address
          ? formData.present_address
          : formData.permanent_address;

        if (
          !visibleFormConfigKeys.includes(CourseConfigKeys.FREEDOM_FIGHTER_KEY)
        ) {
          delete data.freedom_fighter_status;
        }

        if (!data?.physical_disability_status) {
          data.physical_disability_status = PhysicalDisabilityStatus.NO;
          delete data.physical_disabilities;
        }

        if (visibleFormConfigKeys.includes(CourseConfigKeys.EDUCATION_KEY)) {
          data.education_info = {};

          if (
            visibleFormConfigKeys.includes(CourseConfigKeys.EDUCATION_PSC_KEY)
          ) {
            data.psc_info.is_foreign_institute = formData.psc_info
              .is_foreign_institute
              ? 1
              : 0;
            data.education_info['1'] = data.psc_info;
          }

          if (
            visibleFormConfigKeys.includes(CourseConfigKeys.EDUCATION_JSC_KEY)
          ) {
            data.jsc_info.is_foreign_institute = formData.jsc_info
              .is_foreign_institute
              ? 1
              : 0;
            data.education_info['2'] = data.jsc_info;
          }

          if (
            visibleFormConfigKeys.includes(CourseConfigKeys.EDUCATION_SSC_KEY)
          ) {
            data.ssc_info.is_foreign_institute = formData.ssc_info
              .is_foreign_institute
              ? 1
              : 0;
            data.education_info['3'] = data.ssc_info;
          }

          if (
            visibleFormConfigKeys.includes(CourseConfigKeys.EDUCATION_HSC_KEY)
          ) {
            data.hsc_info.is_foreign_institute = formData.hsc_info
              .is_foreign_institute
              ? 1
              : 0;
            data.education_info['4'] = data.hsc_info;
          }

          if (
            visibleFormConfigKeys.includes(
              CourseConfigKeys.EDUCATION_DIPLOMA_KEY,
            )
          ) {
            data.diploma_info.is_foreign_institute = formData.diploma_info
              .is_foreign_institute
              ? 1
              : 0;
            data.education_info['5'] = data.diploma_info;
          }

          if (
            visibleFormConfigKeys.includes(
              CourseConfigKeys.EDUCATION_HONOURS_KEY,
            )
          ) {
            data.honours_info.is_foreign_institute = formData.honours_info
              .is_foreign_institute
              ? 1
              : 0;
            data.education_info['6'] = data.honours_info;
          }

          if (
            visibleFormConfigKeys.includes(
              CourseConfigKeys.EDUCATION_MASTERS_KEY,
            )
          ) {
            data.masters_info.is_foreign_institute = formData.masters_info
              .is_foreign_institute
              ? 1
              : 0;
            data.education_info['7'] = data.masters_info;
          }

          if (
            visibleFormConfigKeys.includes(CourseConfigKeys.EDUCATION_PHD_KEY)
          ) {
            data.phd_info.is_foreign_institute = formData.phd_info
              .is_foreign_institute
              ? 1
              : 0;
            data.education_info['8'] = data.phd_info;
          }
        }

        if (!visibleFormConfigKeys.includes(CourseConfigKeys.GUARDIAN_KEY))
          delete data.guardian_info;

        if (!visibleFormConfigKeys.includes(CourseConfigKeys.OCCUPATION_KEY))
          delete data.professional_info;
        else {
          data.professional_info.is_currently_employed = formData
            .professional_info.is_currently_employed
            ? 1
            : 0;
        }

        if (!visibleFormConfigKeys.includes(CourseConfigKeys.MISCELLANEOUS_KEY))
          delete data.miscellaneous_info;

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

        console.log('data ', data);
        const response = await courseEnroll(data);
        setIsSuccessSubmit(true);

        router
          .push({
            pathname:
              LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT_SUBMITTED + course.id,
            query: {enrollment_id: response?.data?.id},
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
    <StyledContainer maxWidth={'lg'}>
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

export default YouthCourseRegistrationPage;
