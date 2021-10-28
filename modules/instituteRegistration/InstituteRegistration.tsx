import React, {useCallback, useMemo, useState} from 'react';
import useStyles from '../youth/registration/Registration.style';
import {useIntl} from 'react-intl';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Container, Grid, Paper, Typography} from '@mui/material';
import CustomTextInput from '../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../@softbd/elements/button/SubmitButton/SubmitButton';
import yup from '../../@softbd/libs/yup';
import {MOBILE_NUMBER_REGEX} from '../../@softbd/common/patternRegex';
import {yupResolver} from '@hookform/resolvers/yup';
import IntlMessages from '../../@crema/utility/IntlMessages';
import {processServerSideErrors} from '../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../@softbd/hooks/useNotifyStack';
import {createRegistration} from '../../services/instituteManagement/RegistrationService';
import FormRadioButtons from '../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import CustomFormSelect from '../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
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

const InstituteRegistration = () => {
  const classes = useStyles();
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const isLoading = false;
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

  const instituteType = {
    GOVT: '1',
    NON_GOVT: '2',
    OTHERS: '3',
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title()
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
        .label(messages['common.name_of_the_office_head'] as string),
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
        .label(messages['common.password'] as string),
      password_confirmation: yup
        .string()
        .trim()
        .required()
        .oneOf(
          [yup.ref('password'), null],
          messages['common.password_must_match'] as string,
        )
        .label(messages['common.password_confirmation'] as string),
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
    <Container maxWidth={'md'}>
      <Paper className={classes.PaperBox}>
        <Typography
          align={'center'}
          variant={'h6'}
          style={{marginBottom: '10px'}}>
          {messages['common.institute_registration']}
        </Typography>
        <Typography variant={'h6'} style={{marginBottom: '10px'}}>
          {messages['common.instituteInfoText']}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <Grid container spacing={3} maxWidth={'md'}>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='title_en'
                label={messages['common.title_en']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='title'
                label={messages['common.title']}
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
                    key: instituteType.GOVT,
                    label: messages['common.government'],
                  },
                  {
                    key: instituteType.NON_GOVT,
                    label: messages['common.non_government'],
                  },
                  {
                    key: instituteType.OTHERS,
                    label: messages['common.others'],
                  },
                ]}
                control={control}
                defaultValue={instituteType.GOVT}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='email'
                label={messages['common.email']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='primary_mobile'
                label={messages['common.mobile']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='name_of_the_office_head'
                label={messages['common.name_of_the_office_head']}
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
                id='address'
                label={messages['common.institute_address']}
                register={register}
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
                id='contact_person_name'
                label={messages['common.contact_person_name']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='contact_person_designation'
                label={messages['common.contact_person_designation']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='contact_person_email'
                label={messages['common.contact_person_email']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='contact_person_mobile'
                label={messages['common.contact_person_mobile']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='password'
                type={'password'}
                label={messages['common.password']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='password_confirmation'
                type={'password'}
                label={messages['common.retype_password']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{display: 'flex', justifyContent: 'flex-end'}}>
              <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default InstituteRegistration;