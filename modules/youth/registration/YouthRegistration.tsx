import React, {useCallback, useEffect, useMemo, useState} from 'react';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useStyles from './Registration.style';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Chip, Container, Grid, Link, Paper, Typography} from '@mui/material';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import {useIntl} from 'react-intl';
import yup from '../../../@softbd/libs/yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {MOBILE_NUMBER_REGEX} from '../../../@softbd/common/patternRegex';
import {
  useFetchDistricts,
  useFetchDivisions,
  useFetchUpazilas,
} from '../../../services/locationManagement/hooks';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {
  filterDistrictsByDivisionId,
  filterUpazilasByDistrictId,
} from '../../../services/locationManagement/locationUtils';
import Genders from '../../../@softbd/utilities/Genders';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import {useFetchYouthSkills} from '../../../services/youthManagement/hooks';
import {youthRegistration} from '../../../services/youthManagement/YouthRegistrationService';
import {
  isResponseSuccess,
  isValidationError,
} from '../../../@softbd/utilities/helpers';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {setServerValidationErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {CheckCircle} from '@mui/icons-material';
import PhysicalDisabilities from '../../../@softbd/utilities/PhysicalDisabilities';
import PhysicalDisabilityStatus from '../../../@softbd/utilities/PhysicalDisabilityStatus';
import UserNameType from '../../../@softbd/utilities/UserNameType';
import MaritalStatus from '../../../@softbd/utilities/MaritalStatus';
import FreedomFighterStatus from '../../../@softbd/utilities/FreedomFighterStatus';
import Religions from '../../../@softbd/utilities/Religions';
import CustomCheckbox from '../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';
import IdentityNumberTypes from '../../../@softbd/utilities/IdentityNumberTypes';
import EthnicGroupStatus from '../../../@softbd/utilities/EthnicGroupStatus';

const initialValues = {
  first_name: '',
  last_name: '',
  date_of_birth: '',
  physical_disability_status: PhysicalDisabilityStatus.NO,
  physical_disabilities: [],
  email: '',
  mobile: '',
  gender: Genders.MALE,
  marital_status: MaritalStatus.SINGLE,
  freedom_fighter_status: FreedomFighterStatus.NO,
  religion: Religions.ISLAM,
  nationality: '',
  identity_number_type: IdentityNumberTypes.NID,
  identity_number: '',
  does_belong_to_ethnic_group: EthnicGroupStatus.NO,
  skills: [],
  loc_division_id: '',
  loc_district_id: '',
  loc_upazila_id: '',
  zip_or_postal_code: '',
};

const nationalities = [
  {
    id: 1,
    title: 'Bangladeshi',
    title_en: 'Bangladeshi',
  },
  {
    id: 2,
    title: 'Indian',
    title_en: 'Indian',
  },
  {
    id: 3,
    title: 'Pakistani',
    title_en: 'Pakistani',
  },
  {
    id: 4,
    title: 'Nepali',
    title_en: 'Nepali',
  },
];

const YouthRegistration = () => {
  const classes = useStyles();
  const {messages} = useIntl();
  const {successStack} = useNotiStack();

  const [filters] = useState({});
  const [youthSkillsFilter] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: skills} = useFetchYouthSkills(youthSkillsFilter);

  const {data: divisions, isLoading: isLoadingDivisions}: any =
    useFetchDivisions(filters);

  const [districtsFilter] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: districts} = useFetchDistricts(districtsFilter);

  const [upazilasFilter] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: upazilas} = useFetchUpazilas(upazilasFilter);
  const [districtList, setDistrictList] = useState<Array<District> | []>([]);
  const [upazilaList, setUpazilaList] = useState<Array<Upazila> | []>([]);
  const [disabilityStatus, setDisabilityStatus] = useState<number>(
    PhysicalDisabilityStatus.NO,
  );
  const [userNameType, setUserNameType] = useState<number>(UserNameType.MOBILE);
  const [isBelongToEthnicGroup, setIsBelongToEthnicGroup] =
    useState<boolean>(false);
  const [identityNumberType, setIdentityNumberType] = useState<
    string | undefined
  >(IdentityNumberTypes.NID);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      first_name: yup
        .string()
        .title('bn')
        .label(messages['common.first_name_bn'] as string),
      last_name: yup
        .string()
        .title('bn')
        .label(messages['common.last_name_bn'] as string),
      skills: yup
        .array()
        .of(yup.number())
        .min(1)
        .label(messages['common.skills'] as string),
      date_of_birth: yup
        .string()
        .trim()
        .required()
        .label(messages['common.date_of_birth'] as string),
      physical_disability_status: yup
        .string()
        .trim()
        .required()
        .label(messages['common.physical_disability'] as string),
      physical_disabilities:
        disabilityStatus == PhysicalDisabilityStatus.YES
          ? yup
              .array()
              .of(yup.number())
              .min(1)
              .label(messages['common.physical_disability'] as string)
          : yup.array().of(yup.number()),
      email: yup
        .string()
        .trim()
        .required()
        .email()
        .label(messages['common.email'] as string),
      mobile: yup
        .string()
        .trim()
        .required()
        .matches(MOBILE_NUMBER_REGEX)
        .label(messages['common.mobile'] as string),
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
      nationality: yup
        .string()
        .trim()
        .required()
        .label(messages['common.nationality'] as string),
      freedom_fighter_status: yup
        .string()
        .trim()
        .required()
        .label(messages['common.freedom_fighter_status'] as string),
      does_belong_to_ethnic_group: yup
        .string()
        .trim()
        .required()
        .label(messages['youth_registration.ethnic_group'] as string),
      /*village_or_area: yup
        .string()
        .nullable()
        .notRequired()
        .when('village_or_area', {
          is: (value: any) => value && value.length > 0,
          then: (rule: any) =>
            rule
              .matches(MOBILE_NUMBER_REGEX)
              .label(messages['common.village_or_area_bn'] as string),
        }),*/
      zip_or_postal_code: yup
        .string()
        .trim()
        .required()
        .label(messages['common.zip_or_postal_code'] as string),
      password: yup
        .string()
        .trim()
        .required()
        .label(messages['common.password'] as string),
      password_confirmation: yup
        .string()
        .oneOf([yup.ref('password')])
        .label(messages['common.password'] as string),
    });
  }, [messages]);

  const physicalDisabilities = useMemo(
    () => [
      {
        id: PhysicalDisabilities.VISUAL,
        label: messages['physical_disability.visual'],
      },
      {
        id: PhysicalDisabilities.HEARING,
        label: messages['physical_disability.hearing'],
      },
      {
        id: PhysicalDisabilities.MENTAL_HEALTH,
        label: messages['physical_disability.mental_health'],
      },
      {
        id: PhysicalDisabilities.INTELLECTUAL,
        label: messages['physical_disability.intellectual'],
      },
      {
        id: PhysicalDisabilities.SOCIAL,
        label: messages['physical_disability.social'],
      },
    ],
    [messages],
  );

  const maritalStatus = useMemo(
    () => [
      {
        id: MaritalStatus.SINGLE,
        label: messages['common.marital_status_single'],
      },
      {
        id: MaritalStatus.MARRIED,
        label: messages['common.marital_status_married'],
      },
      {
        id: MaritalStatus.WIDOWED,
        label: messages['common.marital_status_widowed'],
      },
      {
        id: MaritalStatus.DIVORCED,
        label: messages['common.marital_status_divorced'],
      },
    ],
    [messages],
  );

  const freedomFighterStatus = useMemo(
    () => [
      {
        id: FreedomFighterStatus.NO,
        label: messages['common.no'],
      },
      {
        id: FreedomFighterStatus.YES,
        label: messages['common.yes'],
      },
      {
        id: FreedomFighterStatus.CHILD,
        label: messages['freedom_fighter_status.child'],
      },
      {
        id: FreedomFighterStatus.GRAND_CHILD,
        label: messages['freedom_fighter_status.grand_child'],
      },
    ],
    [messages],
  );

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

  const {
    control,
    register,
    handleSubmit,
    reset,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    reset(initialValues);
  }, []);

  const onDivisionChange = useCallback(
    (divisionId: number) => {
      let filteredDistricts = filterDistrictsByDivisionId(
        districts,
        divisionId,
      );
      setDistrictList(filteredDistricts);
    },
    [districts],
  );

  const onDistrictChange = useCallback(
    (districtId: number) => {
      let filteredUpazilas = filterUpazilasByDistrictId(upazilas, districtId);
      setUpazilaList(filteredUpazilas);
    },
    [upazilas],
  );

  const onDisabilityStatusChange = useCallback((value: number) => {
    setDisabilityStatus(value);
  }, []);

  const onIdentityTypeChange = useCallback((value: string) => {
    setIdentityNumberType(value);
  }, []);

  const getIdentityNumberFieldCaption = () => {
    switch (identityNumberType) {
      case IdentityNumberTypes.NID:
        return messages['common.identity_type_nid'];
      case IdentityNumberTypes.BIRTH_CERT:
        return messages['common.identity_type_birth_cert'];
      case IdentityNumberTypes.PASSPORT:
        return messages['common.identity_type_passport'];
      default:
        return messages['common.identity_type_nid'];
    }
  };

  const handleEmailChipClick = () => {
    setUserNameType(UserNameType.EMAIL);
  };

  const handleMobileChipClick = () => {
    setUserNameType(UserNameType.MOBILE);
  };

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    data.user_name_type = userNameType;
    if (data.physical_disability_status == PhysicalDisabilityStatus.NO) {
      delete data.physical_disabilities;
    }
    data.does_belong_to_ethnic_group = isBelongToEthnicGroup
      ? EthnicGroupStatus.YES
      : EthnicGroupStatus.NO;

    const response = await youthRegistration(data);
    if (isResponseSuccess(response)) {
      successStack(<IntlMessages id='youth_registration.success' />);
    } else if (isValidationError(response)) {
      setServerValidationErrors(response.errors, setError, validationSchema);
    }
  };

  return (
    <Container maxWidth={'md'} className={classes.root}>
      <Paper className={classes.PaperBox}>
        <Typography variant={'h6'} style={{marginBottom: '10px'}}>
          {messages['common.registration']}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <Grid container spacing={3} maxWidth={'md'}>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='first_name'
                label={messages['common.first_name_bn']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='first_name_en'
                label={messages['common.first_name_en']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='last_name'
                label={messages['common.last_name_bn']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='last_name_en'
                label={messages['common.last_name_en']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6} sx={{textAlign: 'right'}}>
              <Chip
                icon={<CheckCircle />}
                label={messages['youth_registration.set_as_username']}
                color='primary'
                variant={
                  userNameType == UserNameType.EMAIL ? 'filled' : 'outlined'
                }
                sx={{marginBottom: '2px'}}
                onClick={handleEmailChipClick}
              />
              <CustomTextInput
                id='email'
                label={messages['common.email']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{textAlign: 'right'}}>
              <Chip
                icon={<CheckCircle />}
                label={messages['youth_registration.set_as_username']}
                color='primary'
                variant={
                  userNameType == UserNameType.MOBILE ? 'filled' : 'outlined'
                }
                sx={{marginBottom: '2px'}}
                clickable={true}
                onClick={handleMobileChipClick}
              />
              <CustomTextInput
                id='mobile'
                label={messages['common.mobile']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

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
                id='identity_number'
                label={getIdentityNumberFieldCaption()}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormRadioButtons
                id='gender'
                label={'common.gender'}
                radios={[
                  {
                    key: Genders.MALE,
                    label: messages['common.male'],
                  },
                  {
                    key: Genders.FEMALE,
                    label: messages['common.female'],
                  },
                  {
                    key: Genders.OTHERS,
                    label: messages['common.others'],
                  },
                ]}
                control={control}
                defaultValue={Genders.MALE}
                isLoading={false}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomDateTimeField
                id='date_of_birth'
                label={messages['common.date_of_birth']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={6}>
              <CustomFormSelect
                id='marital_status'
                label={messages['common.marital_status']}
                isLoading={false}
                control={control}
                options={maritalStatus}
                optionValueProp={'id'}
                optionTitleProp={['label']}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={6}>
              <CustomFormSelect
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

            <Grid item xs={6}>
              <CustomFormSelect
                id='freedom_fighter_status'
                label={messages['common.freedom_fighter_status']}
                isLoading={false}
                control={control}
                options={freedomFighterStatus}
                optionValueProp={'id'}
                optionTitleProp={['label']}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomFormSelect
                id='skills'
                label={messages['common.select_your_skills']}
                isLoading={false}
                control={control}
                options={skills}
                multiple={true}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title']}
                errorInstance={errors}
                defaultValue={[]}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormRadioButtons
                id='physical_disability_status'
                label={'common.physical_disability'}
                radios={[
                  {
                    key: PhysicalDisabilityStatus.YES,
                    label: messages['common.yes'],
                  },
                  {
                    key: PhysicalDisabilityStatus.NO,
                    label: messages['common.no'],
                  },
                ]}
                control={control}
                defaultValue={'0'}
                isLoading={false}
                onChange={onDisabilityStatusChange}
              />
            </Grid>

            {disabilityStatus == 1 && (
              <Grid item xs={12} md={6}>
                <CustomFormSelect
                  id='physical_disabilities'
                  label={messages['common.physical_disability_title']}
                  isLoading={false}
                  control={control}
                  options={physicalDisabilities}
                  optionValueProp={'id'}
                  optionTitleProp={['label']}
                  errorInstance={errors}
                  multiple={true}
                  defaultValue={[]}
                />
              </Grid>
            )}

            <Grid item xs={6}>
              <CustomFormSelect
                id='nationality'
                label={messages['common.nationality']}
                isLoading={false}
                control={control}
                options={nationalities}
                optionValueProp={'id'}
                optionTitleProp={['title', 'title_en']}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={6}>
              <CustomFormSelect
                id='loc_division_id'
                label={messages['divisions.label']}
                isLoading={isLoadingDivisions}
                control={control}
                options={divisions}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title']}
                errorInstance={errors}
                onChange={onDivisionChange}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomFormSelect
                id='loc_district_id'
                label={messages['districts.label']}
                isLoading={false}
                control={control}
                options={districtList}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title']}
                errorInstance={errors}
                onChange={onDistrictChange}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomFormSelect
                id='loc_upazila_id'
                label={messages['upazilas.label']}
                isLoading={false}
                control={control}
                options={upazilaList}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title']}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='village_or_area'
                label={messages['common.village_or_area_bn']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='village_or_area_en'
                label={messages['common.village_or_area_en']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='zip_or_postal_code'
                label={messages['common.zip_or_postal_code']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='password'
                label={messages['common.password']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='password_confirmation'
                label={messages['common.retype_password']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomCheckbox
                id='does_belong_to_ethnic_group'
                label={messages['youth_registration.ethnic_group']}
                register={register}
                errorInstance={errors}
                checked={isBelongToEthnicGroup}
                onChange={() => {
                  setIsBelongToEthnicGroup((prev) => !prev);
                }}
                isLoading={false}
              />
            </Grid>

            <Grid item xs={12} sx={{textAlign: 'right'}}>
              <SubmitButton isSubmitting={isSubmitting} isLoading={false} />
            </Grid>
          </Grid>
        </form>
        <Typography style={{marginTop: '5px', textAlign: 'right'}}>
          {messages['common.alreadyHaveAccount']}{' '}
          <Link>{messages['common.signInHere']}</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default YouthRegistration;
