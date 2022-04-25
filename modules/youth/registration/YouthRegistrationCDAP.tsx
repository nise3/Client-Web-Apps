import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {styled} from '@mui/material/styles';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomSelectAutoComplete from './CustomSelectAutoComplete';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Container, Grid, Paper, Typography} from '@mui/material';
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
import {useFetchPublicSkills} from '../../../services/youthManagement/hooks';
import {youthRegistrationCDAP} from '../../../services/youthManagement/YouthRegistrationService';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import PhysicalDisabilities from '../../../@softbd/utilities/PhysicalDisabilities';
import PhysicalDisabilityStatus from '../../../@softbd/utilities/PhysicalDisabilityStatus';
import UserNameType from '../../../@softbd/utilities/UserNameType';
import {useRouter} from 'next/router';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import {District, Upazila} from '../../../shared/Interface/location.interface';
import moment from 'moment';
import {
  DATE_OF_BIRTH_MIN_AGE,
  youthDomain,
} from '../../../@softbd/common/constants';
import {
  getBrowserCookie,
  removeBrowserCookie,
  setBrowserCookie,
} from '../../../@softbd/libs/cookieInstance';
import {
  COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
  COOKIE_KEY_AUTH_ID_TOKEN,
  COOKIE_KEY_CALLBACK_INFO,
  COOKIE_KEY_CDAP_SESSION_STATE,
  COOKIE_KEY_CDAP_USER_DATA,
} from '../../../shared/constants/AppConst';
import {LINK_FRONTEND_YOUTH_FEED} from '../../../@softbd/common/appLinks';

const PREFIX = 'YouthRegistrationCDAP';

const classes = {
  rootContainer: `${PREFIX}-rootContainer`,
  PaperBox: `${PREFIX}-PaperBox`,
  signInStyle: `${PREFIX}-signInStyle`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  display: 'flex',
  [theme.breakpoints.only('xs')]: {
    height: 'calc(100vh - 56px)',
  },
  [theme.breakpoints.only('sm')]: {
    height: 'calc(100vh - 75px)',
  },

  [`& .${classes.PaperBox}`]: {
    padding: 40,
    margin: '70px auto',
  },

  [`& .${classes.signInStyle}`]: {
    color: theme.palette.primary.main + ' !important',
  },
}));

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
  const {messages} = useIntl();
  const {errorStack, successStack} = useNotiStack();
  const router = useRouter();

  const CDAPUser = getBrowserCookie(COOKIE_KEY_CDAP_USER_DATA);
  const callbackInfo = getBrowserCookie(COOKIE_KEY_CALLBACK_INFO);
  const [CDAPUserData] = useState(CDAPUser?.data);
  console.log('CDAPUserData: ', CDAPUserData);

  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [filters] = useState({});
  const [youthSkillsFilter] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: skills} = useFetchPublicSkills(youthSkillsFilter);

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
        .min(1, messages['common.must_have_one_skill'] as string)
        .label(messages['common.skills'] as string)
        .required(),
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
      physical_disability_status: yup
        .string()
        .trim()
        .required()
        .label(messages['common.physical_disabilities_status'] as string),
      physical_disabilities:
        disabilityStatus == PhysicalDisabilityStatus.YES
          ? yup
              .array()
              .of(yup.object())
              .min(
                1,
                messages['common.must_have_one_physical_disability'] as string,
              )
              .label(messages['common.physical_disability'] as string)
          : yup.array().of(yup.object()),
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

  console.log('form errors: ', errors);
  useEffect(() => {
    if (CDAPUserData) {
      reset({
        first_name: CDAPUserData?.name || CDAPUserData?.name_en,
        gender: CDAPUserData?.gender || Genders.MALE,
        date_of_birth: CDAPUserData?.date_of_birth,
        email: CDAPUserData?.email,
        mobile:
          String(CDAPUserData?.mobile).length == 10
            ? '0' + CDAPUserData?.mobile
            : CDAPUserData?.mobile,
      });
    } else {
      reset(initialValues);
    }
  }, [CDAPUserData]);

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

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      data.user_name_type = UserNameType.MOBILE;
      if (data.physical_disability_status == PhysicalDisabilityStatus.NO) {
        delete data.physical_disabilities;
      } else {
        let physicalDisabilityIds: any = [];
        data.physical_disabilities.map((physical_disability: any) => {
          physicalDisabilityIds.push(physical_disability.id);
        });
        data.physical_disabilities = physicalDisabilityIds;
      }

      let skillIds: any = [];
      (data?.skills || []).map((skill: any) => {
        skillIds.push(skill.id);
      });
      data.skills = skillIds;

      data.user_name_type = 2;

      const response = await youthRegistrationCDAP(data, callbackInfo);
      console.log('the CDAP REG response: ', response);

      let expireDate = new Date();
      expireDate.setTime(
        new Date().getTime() + Number(callbackInfo?.expires_in) * 10000,
      );

      await setBrowserCookie(
        COOKIE_KEY_CDAP_SESSION_STATE,
        callbackInfo?.session_state,
        {
          expires: expireDate,
        },
      );

      await setBrowserCookie(
        COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
        JSON.stringify({
          access_token: callbackInfo?.access_token,
          expires_in: callbackInfo?.expires_in,
          refresh_token: callbackInfo?.refresh_token,
        }),
        {expires: expireDate},
      );

      await setBrowserCookie(COOKIE_KEY_AUTH_ID_TOKEN, callbackInfo?.id_token, {
        expires: expireDate,
      });

      successStack(<IntlMessages id='youth_registration.success' />);
      setIsFormSubmitted(true);

      removeBrowserCookie(COOKIE_KEY_CDAP_USER_DATA);
      removeBrowserCookie(COOKIE_KEY_CALLBACK_INFO);
      router.push(youthDomain() + LINK_FRONTEND_YOUTH_FEED).then((r) => {});
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <StyledContainer maxWidth={'md'}>
      <Paper className={classes.PaperBox}>
        <Typography
          variant={'h6'}
          style={{marginBottom: '20px', fontSize: '25px', fontWeight: 'bold'}}>
          {messages['cdap.required_info']}
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
              <CustomSelectAutoComplete
                required
                id='skills'
                label={messages['common.skills']}
                control={control}
                options={skills}
                optionTitleProp={['title', 'title_en']}
                optionValueProp={'id'}
                errorInstance={errors}
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
            {disabilityStatus == PhysicalDisabilityStatus.YES && (
              <Grid item xs={12} md={6}>
                <CustomSelectAutoComplete
                  required
                  id='physical_disabilities'
                  label={messages['common.physical_disability']}
                  control={control}
                  options={physicalDisabilities}
                  optionTitleProp={['label']}
                  optionValueProp={'id'}
                  errorInstance={errors}
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
                disabled={CDAPUserData?.email}
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
                disabled={CDAPUserData?.mobile}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomFilterableFormSelect
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
              <CustomFilterableFormSelect
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
              <CustomFilterableFormSelect
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

            <Grid item xs={12} sx={{textAlign: 'center', mt: 2}}>
              <SubmitButton
                startIcon={false}
                isSubmitting={isSubmitting}
                label={messages['common.submit'] as string}
                size='large'
                isDisable={isSubmitting || isFormSubmitted}
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </StyledContainer>
  );
};

export default YouthRegistration;
