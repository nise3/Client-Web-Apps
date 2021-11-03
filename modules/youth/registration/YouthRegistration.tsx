import React, {useCallback, useEffect, useMemo, useState} from 'react';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import CustomSelectAutoComplete from './CustomSelectAutoComplete';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useStyles from './Registration.style';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Container, Grid, Paper, Typography} from '@mui/material';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import {useIntl} from 'react-intl';
import yup from '../../../@softbd/libs/yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  MOBILE_NUMBER_REGEX,
  TEXT_REGEX_PASSWORD,
} from '../../../@softbd/common/patternRegex';
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
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import PhysicalDisabilities from '../../../@softbd/utilities/PhysicalDisabilities';
import PhysicalDisabilityStatus from '../../../@softbd/utilities/PhysicalDisabilityStatus';
import UserNameType from '../../../@softbd/utilities/UserNameType';
import {useRouter} from 'next/router';
import {LINK_YOUTH_REGISTRATION_VERIFICATION} from '../../../@softbd/common/appLinks';
import {Link} from '../../../@softbd/elements/common';
import {getSSOLoginUrl} from '../../../@softbd/common/SSOConfig';

const initialValues = {
  first_name: '',
  last_name: '',
  date_of_birth: '',
  physical_disability_status: PhysicalDisabilityStatus.NO,
  physical_disabilities: [],
  email: '',
  mobile: '',
  gender: Genders.MALE,
  skills: [],
  loc_division_id: '',
  loc_district_id: '',
  loc_upazila_id: '',
  zip_or_postal_code: '',
};

const YouthRegistration = () => {
  const classes = useStyles();
  const {messages} = useIntl();
  const {errorStack, successStack} = useNotiStack();
  const router = useRouter();

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
  //const [userNameType, setUserNameType] = useState<number>(UserNameType.MOBILE);

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
        .of(yup.object())
        .required()
        .label(messages['common.skills'] as string),
      date_of_birth: yup
        .string()
        .trim()
        .required()
        .matches(/(19|20)\d\d-[01]\d-[0123]\d/)
        .label(messages['common.date_of_birth'] as string),
      physical_disability_status: yup
        .string()
        .trim()
        .required()
        .label(messages['common.physical_disabilities_status'] as string),
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
      password: yup
        .string()
        .trim()
        .min(8)
        .required()
        .label(messages['common.password'] as string)
        .matches(TEXT_REGEX_PASSWORD),
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

  /*const handleEmailChipClick = () => {
    setUserNameType(UserNameType.EMAIL);
  };

  const handleMobileChipClick = () => {
    setUserNameType(UserNameType.MOBILE);
  };*/

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      const queryParam = {mobile: data.mobile};
      /*const queryParam =
      userNameType == UserNameType.MOBILE
          ? {mobile: data.mobile}
          : {email: data.email};*/

      // data.user_name_type = userNameType;

      data.user_name_type = UserNameType.MOBILE;
      if (data.physical_disability_status == PhysicalDisabilityStatus.NO) {
        delete data.physical_disabilities;
      }

      let skillIds: any = [];
      data.skills.map((skill: any) => {
        skillIds.push(skill.id);
      });
      data.skills = skillIds;

      await youthRegistration(data);
      successStack(<IntlMessages id='youth_registration.success' />);
      router
        .push({
          pathname: LINK_YOUTH_REGISTRATION_VERIFICATION,
          query: queryParam,
        })
        .then((r) => {});
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };
  const redirectToSSO = useCallback(() => {
    window.location.href = getSSOLoginUrl();
  }, []);
  return (
    <Container maxWidth={'md'} className={classes.rootContainer}>
      <Paper className={classes.PaperBox}>
        <Typography
          variant={'h6'}
          style={{marginBottom: '20px', fontSize: '25px', fontWeight: 'bold'}}>
          {messages['common.registration']}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <Grid container spacing={4} maxWidth={'md'}>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='first_name'
                label={messages['common.first_name_bn']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='last_name'
                label={messages['common.last_name_bn']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormRadioButtons
                required
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
              {/*  <CustomFormSelect
                required
                id='skills'
                label={messages['common.skills']}
                isLoading={false}
                control={control}
                options={skills}
                multiple={true}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title']}
                errorInstance={errors}
                defaultValue={[]}
              />*/}

              <CustomSelectAutoComplete
                id='skills'
                label={messages['common.skills']}
                control={control}
                options={skills}
                optionTitleProp='title'
                errorInstance={errors}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormRadioButtons
                required
                id='physical_disability_status'
                label={'common.physical_disabilities_status'}
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
                  required
                  id='physical_disabilities'
                  label={messages['common.physical_disability']}
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

            <Grid item xs={12} sm={6} md={6}>
              <CustomDateTimeField
                required
                id='date_of_birth'
                label={messages['common.date_of_birth']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='email'
                label={messages['common.email']}
                register={register}
                errorInstance={errors}
                placeholder='example@gmail.com'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='mobile'
                label={messages['common.mobile']}
                register={register}
                errorInstance={errors}
                placeholder='017xxxxxxxx'
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomFormSelect
                required
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
            <Grid item xs={12} md={6}>
              <CustomFormSelect
                required
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
            <Grid item xs={12} md={6}>
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
                required
                id='password'
                label={messages['common.password']}
                register={register}
                errorInstance={errors}
                type={'password'}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='password_confirmation'
                label={messages['common.retype_password']}
                register={register}
                errorInstance={errors}
                type={'password'}
              />
            </Grid>

            <Grid item xs={12}>
              <SubmitButton
                isSubmitting={isSubmitting}
                label={messages['common.create_account'] as string}
                size='large'
              />
              <Typography style={{marginTop: '15px'}} variant={'body1'}>
                {messages['common.already_have_account']}{' '}
                <Link
                  href={''}
                  onClick={redirectToSSO}
                  className={classes.signInStyle}>
                  {messages['common.signin_here']}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default YouthRegistration;
