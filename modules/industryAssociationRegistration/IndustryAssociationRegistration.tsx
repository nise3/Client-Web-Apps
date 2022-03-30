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
import {useFetchAssociationTrades} from '../../services/organaizationManagement/hooks';
import {
  useFetchDistricts,
  useFetchDivisions,
} from '../../services/locationManagement/hooks';
import {Link} from '../../@softbd/elements/common';
import {getSSOLoginUrl} from '../../@softbd/common/SSOConfig';
import {useRouter} from 'next/router';
import CustomFilterableFormSelect from '../../@softbd/elements/input/CustomFilterableFormSelect';
import {classes, StyledContainer} from './Registration.style';
import {filterDistrictsByDivisionId} from '../../services/locationManagement/locationUtils';
import {industryAssociationRegistration} from '../../services/IndustryAssociationManagement/IndustryAssociationRegistrationService';
import {District} from '../../shared/Interface/location.interface';

const IndustryAssociationRegistration = () => {
  const router = useRouter();

  const {messages} = useIntl();
  const {successStack, errorStack} = useNotiStack();
  const isLoading = false;
  const [filters] = useState({});
  const [districtFilters] = useState({});
  const {data: divisions, isLoading: isLoadingDivisions}: any =
    useFetchDivisions(filters);

  const {data: districts, isLoading: isLoadingDistricts}: any =
    useFetchDistricts(districtFilters);

  const [associationTradeFilter] = useState({});

  const {data: associationTrades} = useFetchAssociationTrades(
    associationTradeFilter,
  );

  const [districtsList, setDistrictsList] = useState<Array<District> | []>([]);
  const onchangeDivision = useCallback(
    (divisionId: number) => {
      setDistrictsList(filterDistrictsByDivisionId(districts, divisionId));
    },
    [districts],
  );

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title()
        .label(messages['association.association_name'] as string),
      mobile: yup
        .string()
        .trim()
        .required()
        .matches(MOBILE_NUMBER_REGEX)
        .label(messages['common.mobile'] as string),
      email: yup
        .string()
        .trim()
        .email()
        .required()
        .label(messages['common.email'] as string),
      trade_id: yup
        .string()
        .trim()
        .required()
        .label(messages['association.association_trades'] as string),
      name_of_the_office_head: yup
        .string()
        .trim()
        .required()
        .label(messages['association.head_of_office_or_chairman'] as string),
      trade_number: yup
        .string()
        .trim()
        .required()
        .label(messages['association.trade_no'] as string),
      name_of_the_office_head_designation: yup
        .string()
        .trim()
        .required()
        .label(messages['association.designation'] as string),
      contact_person_name: yup
        .string()
        .trim()
        .required()
        .label(messages['common.contact_person_name_en'] as string),
      address: yup
        .string()
        .trim()
        .required()
        .label(messages['association.association_address'] as string),
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
        .label(messages['common.retype_password'] as string)
        .oneOf(
          [yup.ref('password'), null],
          messages['password.not_matched'] as string,
        ),
    });
  }, []);
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<any>({resolver: yupResolver(validationSchema)});

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      await industryAssociationRegistration(data);
      successStack(<IntlMessages id='youth_registration.success' />);
      router
        .push({
          pathname: '/registration-success',
        })
        .then((r) => {});
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <StyledContainer maxWidth={'md'}>
      <Paper className={classes.PaperBox}>
        <Typography
          align={'center'}
          variant={'h6'}
          data-test-id='heading'
          style={{
            marginBottom: '10px',
            fontWeight: 'bold',
            fontSize: '1.563rem',
          }}>
          {messages['common.registration']}
        </Typography>
        <Typography variant={'h6'} style={{marginBottom: '10px'}}>
          {messages['association.association_information']}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <Grid container spacing={4} maxWidth={'md'}>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='title'
                label={messages['association.association_name']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomFilterableFormSelect
                required
                id='trade_id'
                isLoading={isLoading}
                label={messages['association.association_trades']}
                control={control}
                options={associationTrades}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title']}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='trade_number'
                label={messages['association.trade_no']}
                register={register}
                errorInstance={errors}
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
                onChange={onchangeDivision}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomFilterableFormSelect
                required
                id='loc_district_id'
                label={messages['districts.label']}
                isLoading={isLoadingDistricts}
                control={control}
                options={districtsList}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title']}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='name_of_the_office_head'
                label={messages['association.head_of_office_or_chairman']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='name_of_the_office_head_designation'
                label={messages['association.designation']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='mobile'
                label={messages['common.mobile']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='email'
                inputProps={{'data-test-id': 'email'}}
                label={messages['common.email']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='address'
                label={messages['association.association_address']}
                register={register}
                errorInstance={errors}
                multiline={true}
                rows={3}
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
                label={messages['common.contact_person_name_bn']}
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
                inputProps={{'data-test-id': 'contact_person_email'}}
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
                inputProps={{'data-test-id': 'contact_person_mobile'}}
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

export default IndustryAssociationRegistration;
