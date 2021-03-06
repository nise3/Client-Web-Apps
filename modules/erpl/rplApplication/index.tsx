import {Button, ButtonGroup, Container, FormLabel, Grid} from '@mui/material';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import yup from '../../../@softbd/libs/yup';
import {Body1, H3, H4} from '../../../@softbd/elements/common';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import CustomCheckbox from '../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import AcademicQualificationFieldArray from './AcademicQualificationFieldArray';
import {
  useFetchLocalizedDistricts,
  useFetchLocalizedDivisions,
  useFetchLocalizedUpazilas,
} from '../../../services/locationManagement/hooks';
import {
  filterDistrictsByDivisionId,
  filterUpazilasByDistrictId,
} from '../../../services/locationManagement/locationUtils';
import Religions from '../../../@softbd/utilities/Religions';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import IdentityNumberTypes from '../../../@softbd/utilities/IdentityNumberTypes';
import {
  useFetchEducationExamsBoardsEduGroupsAndSubjects,
  useFetchPublicRplApplication,
} from '../../../services/youthManagement/hooks';
import {AddCircleOutline, RemoveCircleOutline} from '@mui/icons-material';
import {InstituteTypes} from '../../../@softbd/utilities/InstituteTypes';
import {nationalities} from '../../../@softbd/utilities/Nationalities';
import {
  EducationLevelId,
  ResultCodeAppearedId,
  ResultCodeDivisionIds,
  ResultCodeGradeId,
} from '../../youth/profile/utilities/EducationEnums';
import {useRouter} from 'next/router';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {
  DATE_OF_BIRTH_MIN_AGE,
  erplDomain,
} from '../../../@softbd/common/constants';
import {MOBILE_NUMBER_REGEX} from '../../../@softbd/common/patternRegex';
import moment from 'moment';
import JobExperienceFieldArray from './JobExperienceFieldArray';
import {useFetchLocalizedPublicRTOCountries} from '../../../services/CertificateAuthorityManagement/hooks';
import {getMomentDateFormat} from '../../../@softbd/utilities/helpers';
import {AddressTypeId} from '../../youth/profile/utilities/AddressType';
import {LINK_CHOOSE_SELF_ASSESSMENT_PAYMENT_METHOD_PAGE} from '../../../@softbd/common/appLinks';
import {createRPLApplication} from '../../../services/CertificateAuthorityManagement/YouthAssessmentService';

const RPLApplicationForm = () => {
  const {messages, locale} = useIntl();
  const {errorStack, successStack} = useNotiStack();
  const [isCurrentlyEmployed, setIsCurrentlyEmployed] =
    useState<boolean>(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const router = useRouter();
  const {application_id} = router.query;
  const {data: rplApplication, isLoading: isLoadingRPLApplication} =
    useFetchPublicRplApplication(Number(application_id));
  const [showApplicationForm, setShowApplicationForm] =
    useState<boolean>(false);

  const authUser = useAuthUser<YouthAuthUser>();

  const [rtoCountryFilters] = useState<any>({});
  const {data: rtoCountries} =
    useFetchLocalizedPublicRTOCountries(rtoCountryFilters);

  const [jobExperiences, setJobExperiences] = useState<any>([1]);

  const [divisionFilter] = useState({});
  const [districtsFilter] = useState({});
  const [upazilasFilter] = useState({});

  const {data: divisions, isLoading: isLoadingDivisions} =
    useFetchLocalizedDivisions(divisionFilter);
  const {data: districts, isLoading: isLoadingDistricts} =
    useFetchLocalizedDistricts(districtsFilter);
  const {data: upazilas, isLoading: isLoadingUpazilas} =
    useFetchLocalizedUpazilas(upazilasFilter);

  const [presentAddressDistrictList, setPresentAddressDistrictList] = useState<
    Array<any> | []
  >([]);
  const [permanentAddressDistrictList, setPermanentAddressDistrictList] =
    useState<Array<any> | []>([]);

  const [presentAddressUplazilaList, setPresentAddressUplazilaList] = useState<
    Array<any> | []
  >([]);

  const [permanentAddressUpazilaList, setPermanentAddressUpazilaList] =
    useState<Array<any> | []>([]);

  useEffect(() => {
    if (
      !application_id ||
      (!isLoadingRPLApplication && !rplApplication) ||
      (rplApplication && rplApplication?.youth_id != authUser?.youthId)
    ) {
      router.push({pathname: erplDomain()}).then((r) => {});
    }

    setShowApplicationForm(
      !!application_id && rplApplication?.youth_id == authUser?.youthId,
    );
  }, [rplApplication, isLoadingRPLApplication]);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      registration_number: yup
        .string()
        .label(messages['common.registration_number'] as string),
      first_name: yup
        .string()
        .required()
        .label(messages['common.first_name'] as string),
      last_name: yup
        .string()
        .required()
        .label(messages['common.last_name'] as string),
      father_name: yup
        .string()
        .required()
        .label(messages['common.father_name'] as string),
      father_name_en: yup
        .string()
        .label(messages['common.father_name_en'] as string),
      mother_name: yup
        .string()
        .required()
        .label(messages['common.mother_name'] as string),
      mother_name_en: yup
        .string()
        .label(messages['common.mother_name_en'] as string),
      guardian_name: yup
        .string()
        .required()
        .label(messages['common.guardian_name'] as string),
      guardian_name_en: yup
        .string()
        .label(messages['common.guardian_name_en'] as string),
      mobile: yup
        .string()
        .required()
        .matches(MOBILE_NUMBER_REGEX)
        .label(messages['common.mobile'] as string),
      nationality: yup
        .string()
        .required()
        .label(messages['common.nationality'] as string),
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
      identity_number_type: yup
        .string()
        .required()
        .label(messages['common.identity_number_type'] as string),
      identity_number: yup
        .number()
        .required()
        .label(messages['common.identity_number'] as string),
      religion: yup
        .string()
        .required()
        .label(messages['common.religion'] as string),
      photo: yup
        .string()
        .required()
        .label(messages['common.photo'] as string),
      company_name: isCurrentlyEmployed
        ? yup
            .string()
            .trim()
            .required()
            .label(messages['common.company_name_bn'] as string)
        : yup.string(),
      position: isCurrentlyEmployed
        ? yup
            .string()
            .trim()
            .required()
            .label(messages['common.designation'] as string)
        : yup.string(),
      company_type: isCurrentlyEmployed
        ? yup
            .string()
            .trim()
            .required()
            .label(messages['common.institute_type'] as string)
        : yup.string(),
      education_info: yup.array().of(
        yup.object().shape({
          education_level_id: yup
            .string()
            .required()
            .label(messages['education.education_level'] as string),
          exam_degree_id: yup
            .mixed()
            .label(messages['education.education_exam_degree'] as string)
            .when('education_level_id', {
              is: (value: any) =>
                value && Number(value) != EducationLevelId.PHD,
              then: yup.string().required(),
            }),
          exam_degree_name: yup
            .mixed()
            .label(
              messages['education.education_exam_degree_name_bn'] as string,
            )
            .when('education_level_id', {
              is: (value: any) =>
                value && Number(value) == EducationLevelId.PHD,
              then: yup.string().required(),
            }),
          major_or_concentration: yup
            .string()
            .label(messages['education.major_group_name_bn'] as string)
            .when('education_level_id', {
              is: (educationLevelId: any) => {
                const DEGREE_ARR = [
                  EducationLevelId.DIPLOMA,
                  EducationLevelId.HONOURS,
                  EducationLevelId.MASTERS,
                  EducationLevelId.PHD,
                ];
                return (
                  educationLevelId &&
                  DEGREE_ARR.includes(Number(educationLevelId))
                );
              },
              then: yup.string().required(),
            }),
          edu_group_id: yup
            .mixed()
            .label(messages['education.group'] as string)
            .when('education_level_id', {
              is: (value: any) =>
                value &&
                [
                  EducationLevelId.SSC,
                  EducationLevelId.HSC,
                  EducationLevelId.DIPLOMA,
                ].includes(Number(value)),
              then: yup.string().required(),
            }),
          edu_board_id: yup
            .mixed()
            .label(messages['education.board'] as string)
            .when('education_level_id', {
              is: (value: any) =>
                value &&
                [
                  EducationLevelId.JSC,
                  EducationLevelId.SSC,
                  EducationLevelId.HSC,
                  EducationLevelId.DIPLOMA,
                ].includes(Number(value)),
              then: yup.string().required(),
            }),
          institute_name: yup
            .string()
            .title(
              'bn',
              true,
              messages['common.special_character_error'] as string,
            )
            .label(messages['common.institute_name'] as string),
          result: yup
            .string()
            .required()
            .label(messages['education.result'] as string),
          marks_in_percentage: yup
            .mixed()
            .label(messages['education.marks'] as string)
            .when('result', {
              is: (value: any) => ResultCodeDivisionIds.includes(String(value)),
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
              (value) =>
                value == undefined ||
                value == '' ||
                Boolean(Number(value) <= 5),
            ),
          cgpa: yup
            .mixed()
            .label(messages['education.cgpa'] as string)
            .when('result', {
              is: (value: any) => value == ResultCodeGradeId,
              then: yup.string().max(4).required(),
            })
            .test(
              'cgpa_validation',
              messages['validation.cgpa_range'] as string,
              (value) =>
                value == undefined ||
                value == '' ||
                Boolean(Number(value) <= 5),
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
        }),
      ),
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
        loc_upazila_id: yup
          .string()
          .trim()
          .required()
          .label(messages['upazilas.label'] as string),
        village_or_area: yup
          .string()
          .trim()
          .required()
          .label(messages['common.village_or_area_bn'] as string),
        house_n_road: yup
          .string()
          .trim()
          .required()
          .label(messages['common.house_n_road_bn'] as string),
        zip_or_postal_code: yup
          .string()
          .label(messages['common.zip_or_postal_code'] as string)
          .required()
          .test(
            'min_max_check',
            messages['common.four_digit'] as string,
            (value) => !value || Boolean(value.length === 4),
          ),
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
        loc_upazila_id: yup
          .string()
          .trim()
          .required()
          .label(messages['upazilas.label'] as string),
        village_or_area: yup
          .string()
          .trim()
          .required()
          .label(messages['common.village_or_area_bn'] as string),
        house_n_road: yup
          .string()
          .trim()
          .required()
          .label(messages['common.house_n_road_bn'] as string),
        zip_or_postal_code: yup
          .string()
          .required()
          .label(messages['common.zip_or_postal_code'] as string)
          .test(
            'min_max_check',
            messages['common.four_digit'] as string,
            (value) => !value || Boolean(value.length === 4),
          ),
      }),
      professional_qualifications: yup.array().of(
        yup.object().shape({
          rpl_level_id: yup
            .string()
            .trim()
            .required()
            .label(messages['rpl_level.name'] as string),
          rpl_sector_id: yup
            .string()
            .trim()
            .required()
            .label(messages['rpl_sector.name'] as string),
          rpl_occupation_id: yup
            .string()
            .trim()
            .required()
            .label(messages['rpl_occupation.label'] as string),
          rto_country_id: yup
            .string()
            .trim()
            .required()
            .label(messages['rto_country.label'] as string),
        }),
      ),
    });
  }, [locale, isCurrentlyEmployed]);
  const isLoading = false;

  const {
    register,
    control,
    setError,
    getValues,
    reset,
    handleSubmit,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const religions = useMemo(
    () => [
      {
        id: Religions.ISLAM,
        label: messages['common.religion_islam'],
      },
      {
        id: Religions.HINDUISM,
        label: messages['common.religion_hinduism'],
      },
      {
        id: Religions.CHRISTIANITY,
        label: messages['common.religion_christianity'],
      },
      {
        id: Religions.BUDDHISM,
        label: messages['common.religion_buddhism'],
      },
      {
        id: Religions.JUDAISM,
        label: messages['common.religion_judaism'],
      },
      {
        id: Religions.SIKHISM,
        label: messages['common.religion_sikhism'],
      },
      {
        id: Religions.ETHNIC,
        label: messages['common.religion_ethnic'],
      },
      {
        id: Religions.ATHEIST,
        label: messages['common.religion_atheist'],
      },
    ],
    [messages],
  );

  const instituteTypes = useMemo(() => {
    return [
      {id: InstituteTypes.GOVERNMENT, title: messages['common.government']},
      {
        id: InstituteTypes.NON_GOVERNMENT,
        title: messages['common.non_government'],
      },
      {
        id: InstituteTypes.OTHERS,
        title: messages['common.others'],
      },
    ];
  }, [messages]);

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
    if (showApplicationForm && authUser) {
      let data: any = {
        first_name: authUser?.first_name,
        last_name: authUser?.last_name,
        first_name_en: authUser?.first_name_en,
        last_name_en: authUser?.last_name_en,
        photo: authUser?.photo,
        date_of_birth: getMomentDateFormat(
          authUser?.date_of_birth,
          'YYYY-MM-DD',
        ),
        mobile: authUser?.mobile,
        identity_number: authUser?.identity_number,
        identity_number_type: authUser?.identity_number_type
          ? authUser?.identity_number_type
          : '1',
        religion: authUser?.religion,
        nationality: authUser?.nationality,
        is_currently_working: 0,
        registration_number: '',
        education_info: [],
      };

      (authUser?.addresses || []).forEach((address: any) => {
        if (address.address_type == AddressTypeId.PRESENT) {
          data.present_address = getAddressDataByLevel(address);
        } else if (address.address_type == AddressTypeId.PERMANENT) {
          data.permanent_address = getAddressDataByLevel(address);
        }
      });

      if (data?.present_address?.loc_division_id) {
        handlePresentAddressDivisionChange(
          data.present_address.loc_division_id,
        );
      }

      if (data?.present_address?.loc_district_id) {
        handlePresentAddressDistrictChange(
          data.present_address.loc_district_id,
        );
      }

      if (data?.permanent_address?.loc_division_id) {
        handlePermanentAddressDivisionChange(
          data.permanent_address.loc_division_id,
        );
      }

      if (data?.permanent_address?.loc_district_id) {
        handlePermanentAddressDistrictChange(
          data.permanent_address.loc_district_id,
        );
      }

      reset(data);
    }
  }, [showApplicationForm, authUser]);

  const handlePresentAddressDivisionChange = useCallback(
    (divisionId: number) => {
      setPresentAddressDistrictList(
        filterDistrictsByDivisionId(districts, divisionId),
      );
    },
    [upazilas],
  );

  const handlePresentAddressDistrictChange = useCallback(
    (districtId: number) => {
      setPresentAddressUplazilaList(
        filterUpazilasByDistrictId(upazilas, districtId),
      );
    },
    [upazilas],
  );

  const handlePermanentAddressDivisionChange = useCallback(
    (divisionId: number) => {
      setPermanentAddressDistrictList(
        filterDistrictsByDivisionId(districts, divisionId),
      );
    },
    [districts],
  );

  const handlePermanentAddressDistrictChange = useCallback(
    (districtId: number) => {
      setPermanentAddressUpazilaList(
        filterUpazilasByDistrictId(upazilas, districtId),
      );
    },
    [upazilas],
  );

  const [identityNumberType, setIdentityNumberType] = useState<
    string | undefined
  >(IdentityNumberTypes.NID);

  const onIdentityTypeChange = useCallback((value: string) => {
    setIdentityNumberType(value);
  }, []);

  const {data: educationsData, isLoading: isLoadingEducationsData} =
    useFetchEducationExamsBoardsEduGroupsAndSubjects();

  const [educations, setEducations] = useState<any>([1]);

  const getIdentityNumberFieldCaption = useCallback(() => {
    switch (String(identityNumberType)) {
      case IdentityNumberTypes.NID:
        return messages['common.identity_type_nid'];
      case IdentityNumberTypes.BIRTH_CERT:
        return messages['common.identity_type_birth_cert'];
      case IdentityNumberTypes.PASSPORT:
        return messages['common.identity_type_passport'];
      default:
        return messages['common.identity_type_nid'];
    }
  }, [identityNumberType]);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      let formData: any = {...data};
      formData.id = rplApplication?.id;
      formData.rpl_sector_id = rplApplication?.rpl_sector_id;
      formData.rpl_occupation_id = rplApplication?.rpl_occupation_id;
      formData.rpl_level_id = rplApplication?.rpl_level_id;
      formData.rto_country_id = rplApplication?.rto_country_id;
      formData.rto_id = rplApplication?.rto_id;
      formData.target_country_id = rplApplication?.target_country_id;
      formData.youth_id = rplApplication?.youth_id;
      formData.assessment_id = rplApplication?.assessment_id;

      formData.is_currently_working = data.is_currently_working ? 1 : 0;

      formData.identity_number = String(formData.identity_number);

      const response = await createRPLApplication(formData);
      successStack(messages['rpl.application_submitted_successfully']);
      setIsFormSubmitted(true);
      router
        .push({
          pathname:
            LINK_CHOOSE_SELF_ASSESSMENT_PAYMENT_METHOD_PAGE +
            response?.data?.id,
        })
        .then((r) => {});
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  const addNewEducation = useCallback(() => {
    setEducations((prev: any) => [...prev, prev.length + 1]);
  }, []);

  const removeEducation = useCallback(() => {
    let educationInfos = getValues('education_info');

    let array = [...educations];
    if (educations.length > 1) {
      educationInfos.splice(educations.length - 1, 1);
      setValue('education_info', educationInfos);
      array.splice(educations.length - 1, 1);
      setEducations(array);
    }
  }, [educations]);

  const addJobExperience = useCallback(() => {
    setJobExperiences((prev: any) => [...prev, prev.length + 1]);
    let jobExperienceInfos = getValues('professional_qualifications');
    jobExperienceInfos.push({});
    setValue('professional_qualifications', jobExperienceInfos);
  }, []);

  const removeJobExperience = useCallback(() => {
    let jobExperienceInfos = getValues('professional_qualifications');

    let array = [...jobExperiences];
    if (jobExperiences.length > 0) {
      jobExperienceInfos.splice(jobExperiences.length - 1, 1);
      setValue('professional_qualifications', jobExperienceInfos);
      array.splice(jobExperiences.length - 1, 1);
      setJobExperiences(array);
    }
  }, [jobExperiences]);

  return !showApplicationForm ? (
    <></>
  ) : (
    <Container maxWidth={'md'}>
      <Grid container spacing={2} my={2} justifyContent={'center'}>
        <Grid item xs={12}>
          <Grid container justifyContent={'center'}>
            <img
              src='/images/bteb_logo.jpg'
              alt='RPL logo'
              height={75}
              width={75}
            />
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <H3 centered={true}>
            {messages['common.bangladesh_technical_education_board_dhaka']}
          </H3>
          <H4 centered={true}>{messages['common.application_header_text']}</H4>
          <Body1 centered={true}>
            {'(' +
              messages['common.fill_according_to_educational_certificate'] +
              ')'}
          </Body1>
        </Grid>
      </Grid>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextInput
              id='registration_number'
              type={'number'}
              label={messages['common.registration_number']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={6}>
            <CustomTextInput
              required
              id='first_name'
              label={messages['common.first_name']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id='first_name_en'
              label={messages['common.first_name_en']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={6}>
            <CustomTextInput
              required
              id='last_name'
              label={messages['common.last_name']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id='last_name_en'
              label={messages['common.last_name_en']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={6}>
            <CustomTextInput
              required
              id='father_name'
              label={messages['common.father_name']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={6}>
            <CustomTextInput
              id='father_name_en'
              label={messages['common.father_name_en']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={6}>
            <CustomTextInput
              required
              id='mother_name'
              label={messages['common.mother_name']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id='mother_name_en'
              label={messages['common.mother_name_en']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={6}>
            <CustomTextInput
              required
              id='guardian_name'
              label={
                messages['common.guardian_name'] +
                '(' +
                messages['common.in_the_absence_of_father'] +
                ')'
              }
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={6}>
            <CustomTextInput
              required
              id='mobile'
              label={messages['common.mobile']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} my={2}>
            <FormLabel required={true}>
              {messages['common.present_address']}
            </FormLabel>
            <Grid container spacing={2} sx={{marginTop: '3px'}}>
              <Grid item xs={6}>
                <CustomFormSelect
                  required
                  id='present_address[loc_division_id]'
                  label={messages['divisions.label']}
                  isLoading={isLoadingDivisions}
                  control={control}
                  options={divisions}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                  errorInstance={errors}
                  onChange={handlePresentAddressDivisionChange}
                />
              </Grid>

              <Grid item xs={6}>
                <CustomFormSelect
                  required
                  id='present_address[loc_district_id]'
                  label={messages['districts.label']}
                  isLoading={isLoadingDistricts}
                  control={control}
                  options={presentAddressDistrictList}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                  errorInstance={errors}
                  onChange={handlePresentAddressDistrictChange}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomFormSelect
                  required
                  id='present_address[loc_upazila_id]'
                  label={messages['upazilas.label']}
                  isLoading={isLoadingUpazilas}
                  control={control}
                  options={presentAddressUplazilaList}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                  errorInstance={errors}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextInput
                  required
                  id={'present_address[village_or_area]'}
                  label={messages['common.village_or_area_bn']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextInput
                  id={'present_address[village_or_area_en]'}
                  label={messages['common.village_or_area_en']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextInput
                  required
                  id={'present_address[house_n_road]'}
                  label={messages['common.house_n_road_bn']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextInput
                  id={'present_address[house_n_road_en]'}
                  label={messages['common.house_n_road_en']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextInput
                  required
                  type={'number'}
                  id={'present_address[zip_or_postal_code]'}
                  label={messages['common.zip_or_postal_code']}
                  register={register}
                  isLoading={isLoading}
                  errorInstance={errors}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} mb={2}>
            <FormLabel required={true}>
              {messages['common.permanent_address']}
            </FormLabel>
            <Grid container spacing={2} sx={{marginTop: '3px'}}>
              <Grid item xs={6}>
                <CustomFormSelect
                  required
                  id='permanent_address[loc_division_id]'
                  label={messages['divisions.label']}
                  isLoading={isLoadingDivisions}
                  control={control}
                  options={divisions}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                  errorInstance={errors}
                  onChange={handlePermanentAddressDivisionChange}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomFormSelect
                  required
                  id='permanent_address[loc_district_id]'
                  label={messages['districts.label']}
                  isLoading={isLoadingDistricts}
                  control={control}
                  options={permanentAddressDistrictList}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                  errorInstance={errors}
                  onChange={handlePermanentAddressDistrictChange}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomFormSelect
                  required
                  id='permanent_address[loc_upazila_id]'
                  label={messages['upazilas.label']}
                  isLoading={isLoadingUpazilas}
                  control={control}
                  options={permanentAddressUpazilaList}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                  errorInstance={errors}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextInput
                  required
                  id={'permanent_address[village_or_area]'}
                  label={messages['common.village_or_area_bn']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextInput
                  id={'permanent_address[village_or_area_en]'}
                  label={messages['common.village_or_area_en']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextInput
                  required
                  id={'permanent_address[house_n_road]'}
                  label={messages['common.house_n_road_bn']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextInput
                  id={'permanent_address[house_n_road_en]'}
                  label={messages['common.house_n_road_en']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextInput
                  required
                  type={'number'}
                  id={'permanent_address[zip_or_postal_code]'}
                  label={messages['common.zip_or_postal_code']}
                  register={register}
                  isLoading={isLoading}
                  errorInstance={errors}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <CustomFilterableFormSelect
              required
              id='nationality'
              label={messages['common.nationality']}
              isLoading={false}
              control={control}
              options={nationalities}
              optionValueProp={'id'}
              optionTitleProp={['title']}
              errorInstance={errors}
            />
          </Grid>

          <Grid item xs={6}>
            <CustomDateTimeField
              required
              id='date_of_birth'
              label={messages['common.date_of_birth']}
              register={register}
              errorInstance={errors}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomFilterableFormSelect
              required
              id='religion'
              label={messages['common.religion']}
              isLoading={false}
              control={control}
              options={religions}
              optionValueProp={'id'}
              optionTitleProp={['label']}
              errorInstance={errors}
            />
          </Grid>

          <Grid item xs={12}>
            <FormLabel required={true}>
              {
                ((messages['user.academic_qualification'] as string) +
                  messages['academic_qualification.fill_up_hint']) as string
              }
            </FormLabel>

            <Grid container spacing={2} sx={{marginTop: '3px'}}>
              {educations.map((education: any, index: number) => (
                <AcademicQualificationFieldArray
                  id={`education_info[${index}]`}
                  key={index}
                  register={register}
                  errors={errors}
                  control={control}
                  educationsData={educationsData}
                  isLoading={isLoadingEducationsData}
                />
              ))}
              <Grid item xs={12} display={'flex'} justifyContent='flex-end'>
                <ButtonGroup
                  color='primary'
                  aria-label='outlined primary button group'>
                  <Button onClick={addNewEducation}>
                    <AddCircleOutline />
                  </Button>
                  <Button
                    onClick={removeEducation}
                    disabled={educations.length < 2}>
                    <RemoveCircleOutline />
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              <FormLabel>{messages['common.job_experience']}</FormLabel>
              <Grid item xs={12} sx={{marginTop: '6px'}}>
                {jobExperiences.map((jobExperience: any, index: number) => (
                  <JobExperienceFieldArray
                    key={index}
                    formKey={`professional_qualifications`}
                    index={index}
                    register={register}
                    errors={errors}
                    control={control}
                    countries={rtoCountries}
                  />
                ))}

                <Grid item xs={12} display={'flex'} justifyContent='flex-end'>
                  <ButtonGroup
                    color='primary'
                    aria-label='outlined primary button group'>
                    <Button onClick={addJobExperience}>
                      <AddCircleOutline />
                    </Button>
                    <Button
                      onClick={removeJobExperience}
                      disabled={jobExperiences.length < 1}>
                      <RemoveCircleOutline />
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <CustomCheckbox
              id='is_currently_working'
              label={messages['common.currently_working'] + '?'}
              register={register}
              errorInstance={errors}
              checked={isCurrentlyEmployed}
              onChange={() => {
                setIsCurrentlyEmployed((prev) => !prev);
              }}
              isLoading={false}
            />
          </Grid>

          {isCurrentlyEmployed && (
            <>
              <Grid item xs={4}>
                <CustomFormSelect
                  required
                  id='company_type'
                  label={messages['common.institute_type']}
                  isLoading={false}
                  control={control}
                  options={instituteTypes}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                  errorInstance={errors}
                />
              </Grid>

              <Grid item xs={4}>
                <CustomTextInput
                  required
                  id='company_name'
                  label={messages['common.company_name_bn']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>

              <Grid item xs={4}>
                <CustomTextInput
                  required
                  id='position'
                  label={messages['common.designation']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>
            </>
          )}

          <Grid item xs={12} md={6}>
            <FormRadioButtons
              id='identity_number_type'
              label={'common.identity_number_type'}
              radios={[
                {
                  key: IdentityNumberTypes.NID,
                  label: messages['common.identity_type_nid'],
                },
                {
                  key: IdentityNumberTypes.BIRTH_CERT,
                  label: messages['common.identity_type_birth_cert'],
                },
                {
                  key: IdentityNumberTypes.PASSPORT,
                  label: messages['common.identity_type_passport'],
                },
              ]}
              control={control}
              defaultValue={IdentityNumberTypes.NID}
              isLoading={false}
              onChange={onIdentityTypeChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextInput
              required
              type={'number'}
              id='identity_number'
              label={getIdentityNumberFieldCaption()}
              isLoading={false}
              register={register}
              errorInstance={errors}
            />
          </Grid>

          <Grid item xs={12}>
            <FileUploadComponent
              required
              id={'photo'}
              errorInstance={errors}
              setValue={setValue}
              register={register}
              label={messages['common.candidate_photo']}
              defaultFileUrl={authUser?.photo}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container justifyContent={'center'}>
              <Button
                type={'submit'}
                disabled={isSubmitting || isFormSubmitted}
                variant='contained'>
                {messages['common.submit']}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default RPLApplicationForm;
