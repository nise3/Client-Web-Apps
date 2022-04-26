import React, {useCallback, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Grid, Paper, Typography} from '@mui/material';
import CustomTextInput from '../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../@softbd/elements/button/SubmitButton/SubmitButton';
import yup from '../../@softbd/libs/yup';
import {
  MOBILE_NUMBER_REGEX,
  TEXT_REGEX_PASSWORD,
} from '../../@softbd/common/patternRegex';
import {yupResolver} from '@hookform/resolvers/yup';
import IntlMessages from '../../@crema/utility/IntlMessages';
import {processServerSideErrors} from '../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../@softbd/hooks/useNotifyStack';
import {createRegistration} from '../../services/instituteManagement/RegistrationService';
import FormRadioButtons from '../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import {
  useFetchDistricts,
  useFetchDivisions,
  useFetchUpazilas,
} from '../../services/locationManagement/hooks';
import RowStatus from '../../@softbd/utilities/RowStatus';
import {
  filterDistrictsByDivisionId,
  filterUpazilasByDistrictId,
} from '../../services/locationManagement/locationUtils';
import {Link} from '../../@softbd/elements/common';
import {getSSOLoginUrl} from '../../@softbd/common/SSOConfig';
import {useRouter} from 'next/router';
import CustomFilterableFormSelect from '../../@softbd/elements/input/CustomFilterableFormSelect';
import {classes, StyledContainer} from './Registration.style';
import {District, Upazila} from '../../shared/Interface/location.interface';
import {InstituteTypes} from '../../@softbd/utilities/InstituteTypes';

const InstituteRegistration = () => {
  const router = useRouter();
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const [filters] = useState({});
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

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title('bn', true, messages['common.special_character_error'] as string)
        .label(messages['common.title'] as string),
      email: yup
        .string()
        .trim()
        .required()
        .email()
        .label(messages['common.email'] as string),
      primary_mobile: yup
        .string()
        .trim()
        .required()
        .matches(MOBILE_NUMBER_REGEX)
        .label(messages['common.mobile'] as string),
      name_of_the_office_head: yup
        .string()
        .trim()
        .required()
        .label(messages['institute.head_of_office'] as string),
      address: yup
        .string()
        .trim()
        .required()
        .label(messages['common.institute_address'] as string),
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
      contact_person_name: yup
        .string()
        .trim()
        .required()
        .label(messages['common.contact_person_name'] as string),
      contact_person_designation: yup
        .string()
        .trim()
        .required()
        .label(messages['common.contact_person_designation'] as string),
      contact_person_email: yup
        .string()
        .trim()
        .email()
        .required()
        .label(messages['common.contact_person_email'] as string),
      contact_person_mobile: yup
        .string()
        .trim()
        .required()
        .matches(MOBILE_NUMBER_REGEX)
        .label(messages['common.contact_person_mobile'] as string),
      password: yup
        .string()
        .trim()
        .min(8)
        .required()
        .matches(TEXT_REGEX_PASSWORD)
        .label(messages['common.password'] as string),
      password_confirmation: yup
        .string()
        .trim()
        .required()
        .oneOf(
          [yup.ref('password'), null],
          messages['common.password_must_match'] as string,
        )
        .label(messages['common.retype_password'] as string),
    });
  }, [messages]);
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<any>({resolver: yupResolver(validationSchema)});

  const {successStack} = useNotiStack();

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      await createRegistration(data);
      successStack(
        <IntlMessages
          id='common.subject_created_successfully'
          values={{
            subject: <IntlMessages id='common.institute_registration' />,
          }}
        />,
      );
      router
        .push({
          pathname: '/registration-success',
        })
        .then((r) => {});
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  const onDivisionChange = useCallback(
    (divisionId: number) => {
      let filteredDistricts = filterDistrictsByDivisionId(
        districts,
        divisionId,
      );
      setDistrictList(filteredDistricts);
      setUpazilaList([]);
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

  return (
    <StyledContainer maxWidth={'md'}>
      <Paper className={classes.PaperBox}>
        <Typography
          align={'center'}
          variant={'h6'}
          style={{
            marginBottom: '10px',
            fontWeight: 'bold',
            fontSize: '1.563rem',
          }}>
          {messages['common.registration']}
        </Typography>
        <Typography variant={'h6'} style={{marginBottom: '10px'}}>
          {messages['common.instituteInfoText']}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <Grid container spacing={4} maxWidth={'md'}>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='title'
                label={messages['common.institute_name']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormRadioButtons
                id='institute_type_id'
                label={'common.institute_type'}
                radios={[
                  {
                    key: InstituteTypes.GOVERNMENT,
                    label: messages['common.government'],
                  },
                  {
                    key: InstituteTypes.NON_GOVERNMENT,
                    label: messages['common.non_government'],
                  },
                ]}
                control={control}
                defaultValue={InstituteTypes.GOVERNMENT}
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
                id='primary_mobile'
                label={messages['common.mobile']}
                register={register}
                errorInstance={errors}
                placeholder='017xxxxxxxx'
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='name_of_the_office_head'
                label={messages['institute.head_of_office']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='name_of_the_office_head_designation'
                label={messages['common.name_of_the_office_head_designation']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='address'
                label={messages['common.institute_address']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
            <Grid item xs={12}>
              <Typography variant={'h6'}>
                {messages['common.userInfoText']}
                <Typography
                  sx={{
                    color: 'red',
                    marginLeft: '10px',
                    fontStyle: 'italic',
                    verticalAlign: 'middle',
                  }}
                  variant={'caption'}>
                  *({messages['common.registration_username_note']})
                </Typography>
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='contact_person_name'
                label={messages['common.contact_person_name']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='contact_person_designation'
                label={messages['common.contact_person_designation']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='contact_person_email'
                label={messages['common.contact_person_email']}
                register={register}
                errorInstance={errors}
                placeholder='example@gmail.com'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='contact_person_mobile'
                label={messages['common.contact_person_mobile']}
                register={register}
                errorInstance={errors}
                placeholder='017xxxxxxxx'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='password'
                type={'password'}
                helperText={messages['common.passwordHint']}
                label={messages['common.password']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='password_confirmation'
                type={'password'}
                label={messages['common.retype_password']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <SubmitButton
                startIcon={false}
                isSubmitting={isSubmitting}
                label={messages['common.registration'] as string}
                size='large'
              />
              <Typography variant={'body1'} style={{marginTop: '15px'}}>
                {messages['common.already_have_account']}{' '}
                <Link href={getSSOLoginUrl()} className={classes.signInStyle}>
                  {messages['common.signin_here']}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </StyledContainer>
  );
};

export default InstituteRegistration;
