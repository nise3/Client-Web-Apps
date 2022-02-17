import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import RowStatus from './RowStatus';
import yup from '../../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {FormLabel, Grid, Typography} from '@mui/material';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {createUser} from '../../../services/userManagement/UserService';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {MOBILE_NUMBER_REGEX} from '../../../@softbd/common/patternRegex';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {
  useFetchDistricts,
  useFetchUpazilas,
} from '../../../services/locationManagement/hooks';
import {filterUpazilasByDistrictId} from '../../../services/locationManagement/locationUtils';
import {IUser} from '../../../shared/Interface/userManagement.interface';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {styled} from '@mui/material/styles';
import {Gender} from '../jobLists/jobPost/enums/JobPostEnums';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import CustomChipTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomChipTextInput';
import {DynamicForm} from '@mui/icons-material';
import FormFiller from './FormFiller';
import HasWorkshopConstant from './HasWorkshopConstant';
import CustomCheckboxTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomCheckboxTextInput';
import HasRegisteredAuthority from './constants/HasRegisteredAuthority';
import BusinessType from './constants/BusinessTypes';
import TradeLicensingAuthority from './constants/TradeLicensingAuthority';
import BankAccountType from './constants/BankAccountType';
import Boolean from './constants/Boolean';
import BusinessOwnership from './constants/BusinessOwnership';
import {Body1, H1, H2} from '../../../@softbd/elements/common';

interface NASCIBMemberRegistrationFormProps {
  onClose: () => void;
}

const PREFIX = 'NascibUserAddEdit';

const classes = {
  headerText: `${PREFIX}-headerText`,
};

const StyledHeader = styled(Grid)(({theme}) => ({
  background: theme.palette.primary.main,
  padding: '10px !important',
  color: '#fff',
  margin: '25px 0 0 0',

  [`& .${classes.headerText}`]: {
    margin: '0 0 0 28px',
  },
}));

const registeredAuthors = [
  {id: 1, title: 'author-1'},
  {id: 2, title: 'author-2'},
  {id: 3, title: 'author-3'},
  {id: 4, title: 'author-4'},
  {id: 5, title: 'author-5'},
  {id: 6, title: 'author-6'},
];

const initialValues = {
  form_filler: '',
  association_name: '',
  nascib_cluster_name: '',
  association_district: '',
  association_union: '',
  association_code_number: '',
  name_en: '',
  name: '',
  gender: '',
  date_of_birth: '',
  academic_qualification: '',
  nid_no: '',
  nid: '',
  mobile: '',
  email: '',
  entrepreneur_pic: '',
  institute_trade_license: '',
  institute_name: '',
  institute_district: '',
  institute_upazila: '',
  institute_website: '',
  workshop: '',
  factory_address: '',
  factory_loc_district_id: '',
  factory_loc_upazila_id: '',
  factory_website: '',
  factory_land_own_or_rent: '',
  office_or_showroom: '',
  institute_business_owner_type: '',
  institute_inauguration_date: '',
  trade_license_provider: '',
  trade_license_file: '',
  trade_license_renewal_year: '',
  is_TIN: '',
  institutional_investment: '',
  institute_total_asset: '',
  is_institute_registered_by_authority: '',
  is_institute_have_approved_authority: '',
  is_institute_jurisdiction_specialized_are: '',
  is_institute_in_cluster: '',
  is_institute_association_member: '',
  institute_sector: '',
  institute_business_type: '',
  institute_produce_product_name: '',
  institute_raw_materials: '',
  is_institute_export_product: '',
  is_institute_import_product: '',
  institute_total_employee: '',
  has_institute_bank_account: '',
  has_institute_account_daily_debit_credit: '',
  is_institute_use_computer: '',
  is_institute_internet_connected: '',
  has_institute_online_business: '',
  info_provider_name: '',
  info_provider_mobile: '',
  info_collector_name: '',
  info_collector_mobile: '',
};

const NASCIBMemberRegistrationForm: FC<NASCIBMemberRegistrationFormProps> = ({
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();

  const {createSuccessMessage} = useSuccessMessage();
  const [districtsFilter] = useState({});
  const [upazilasFilter] = useState({});

  const {data: districts, isLoading: isLoadingDistricts} =
    useFetchDistricts(districtsFilter);
  const {data: upazilas, isLoading: isLoadingUpazilas} =
    useFetchUpazilas(upazilasFilter);
  const isLoading = false;

  const [upazilasList, setUpazilasList] = useState<Array<any> | []>([]);
  const [formFiller, setFormFiller] = useState<any>(null);
  const [hasWorkshop, setHasWorkshop] = useState<boolean>(false);

  const [checkedRegisteredAuthority, setCheckedRegisteredAuthority] = useState<
    Array<number> | []
  >([]);

  const [checkedAuthorizedAuthority, setCheckedAuthorizedAuthority] = useState<
    Array<number> | []
  >([]);

  const [checkedSpecializedArea, setCheckedSpecializedArea] = useState<
    Array<number> | []
  >([]);

  const [hasAuthorizedAuthority, setHasAuthorizedAuthority] =
    useState<any>(null);

  const [isIndustryUnderSpecializedArea, setIsIndustryUnderSpecializedArea] =
    useState<any>(null);

  const [hasRegisteredAuthority, setHasRegisteredAuthority] =
    useState<any>(null);

  const [isUnderSMECluster, setIsUnderSMECluster] = useState<any>(null);
  const [isAssociationMember, setIsAssociationMember] =
    useState<boolean>(false);

  const [isIndustryDoExport, setIsIndustryDoExport] = useState<boolean>(false);

  const [isIndustryDoImport, setIsIndustryDoImport] = useState<boolean>(false);
  const [hasBankAccount, setHasBankAccount] = useState<boolean>(false);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      form_fill_up_by: yup
        .string()
        .required()
        .label(messages['common.form_filler'] as string),
      udc_name:
        formFiller == FormFiller.NASCIB_CLUSTER
          ? yup
              .string()
              .required()
              .label(messages['common.name_en'] as string)
          : yup.string(),
      udc_loc_district:
        formFiller == FormFiller.NASCIB_CLUSTER
          ? yup
              .string()
              .required()
              .label(messages['common.district'] as string)
          : yup.string(),
      udc_union:
        formFiller == FormFiller.NASCIB_CLUSTER
          ? yup
              .string()
              .required()
              .label(messages['common.union'] as string)
          : yup.string(),
      udc_code:
        formFiller == FormFiller.NASCIB_CLUSTER
          ? yup
              .string()
              .required()
              .label(messages['common.code'] as string)
          : yup.string(),

      chamber_or_association_name:
        formFiller == FormFiller.CHAMBER_ASSOCIATION
          ? yup
              .string()
              .required()
              .label(messages['common.name_en'] as string)
          : yup.string(),
      chamber_or_association_loc_district_id:
        formFiller == FormFiller.CHAMBER_ASSOCIATION
          ? yup
              .string()
              .required()
              .label(messages['common.district'] as string)
          : yup.string(),
      chamber_or_association_union:
        formFiller == FormFiller.CHAMBER_ASSOCIATION
          ? yup
              .string()
              .required()
              .label(messages['common.union'] as string)
          : yup.string(),
      chamber_or_association_code:
        formFiller == FormFiller.CHAMBER_ASSOCIATION
          ? yup
              .string()
              .required()
              .label(messages['common.code'] as string)
          : yup.string(),
      name: yup
        .string()
        .title('en')
        .min(2)
        .label(messages['common.name_en'] as string),
      name_bn: yup
        .string()
        .title()
        .min(2)
        .label(messages['common.name'] as string),
      gender: yup
        .string()
        .required()
        .label(messages['common.gender'] as string),
      date_of_birth: yup
        .date()
        .required()
        .label(messages['common.date_of_birth'] as string),
      academic_qualification: yup
        .string()
        .required()
        .label(messages['common.academic_qualification'] as string),
      nid: yup
        .string()
        .required()
        .label(messages['common.identity_type_nid'] as string),
      nid_file: yup
        .string()
        .required()
        .label(messages['common.national_identity'] as string),
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
      entrepreneur_photo: yup
        .string()
        .required()
        .label(messages['common.entrepreneur_pic'] as string),
      organization_trade_license_no: yup
        .string()
        .required()
        .label(messages['institute.trade_licence_number'] as string),
      organization_identification_no: yup
        .string()
        .required()
        .label(messages['common.organization_identification_number'] as string),
      organization_name: yup
        .string()
        .required()
        .label(messages['common.institute'] as string),
      organization_address: yup
        .string()
        .required()
        .label(messages['common.institute_address'] as string),
      organization_loc_district_id: yup
        .string()
        .label(messages['districts.label'] as string),
      organization_loc_upazila_id: yup
        .string()
        .label(messages['upazilas.label'] as string),
      organization_domain: yup
        .string()
        .label(messages['common.domain'] as string),
      factory: yup
        .string()
        .required()
        .label(messages['common.workshop'] as string),
      factory_address: yup.string().label(messages['common.address'] as string),
      factory_loc_district_id: yup
        .string()
        .label(messages['districts.label'] as string),
      factory_loc_upazila_id: yup
        .string()
        .label(messages['upazilas.label'] as string),
      factory_web_site: yup
        .string()
        .label(messages['common.website'] as string),
      office_or_showroom: hasWorkshop
        ? yup
            .string()
            .required()
            .label(messages['common.website'] as string)
        : yup.string(),
      factory_land_own_or_rent: hasWorkshop
        ? yup
            .string()
            .required()
            .label(messages['common.website'] as string)
        : yup.string(),
      proprietorship: yup
        .string()
        .required()
        .label(messages['common.workshop'] as string),
      industry_establishment_year: yup
        .string()
        .required()
        .label(messages['institute.establish_year'] as string),
      trade_licensing_authority: yup
        .string()
        .required()
        .label(
          messages['institute.trade_license_provider_authority'] as string,
        ),
      trade_license: yup
        .string()
        .label(messages['trade_license.label'] as string),
      industry_last_renew_year: yup
        .string()
        .required()
        .label(messages['institute.last_renewal_year'] as string),
      tin: yup
        .string()
        .required()
        .label(messages['common.tin'] as string),
      investment_amount: yup
        .string()
        .required()
        .label(messages['invested_amount_in_institute.label'] as string),
      current_total_asset: yup.string(),
      registered_under_authority: yup
        .string()
        .required()
        .label(messages['institute.is_registered_under_authority'] as string),
      registered_authority: yup.string(),
      authorized_under_authority: yup
        .string()
        .required()
        .label(messages['institute.is_under_any_approved_authority'] as string),
      authorized_authority: yup
        .string()
        .label(messages['institute.authorized_authority'] as string),
      specialized_area: yup
        .string()
        .required()
        .label(messages['institute.is_under_any_special_region'] as string),
      specialized_area_name:
        isIndustryUnderSpecializedArea == HasRegisteredAuthority.YES
          ? yup
              .string()
              .required()
              .label(messages['industry.specialized_areas'] as string)
          : yup.string(),
      under_sme_cluster: yup
        .string()
        .required()
        .label(messages['institute.is_under_any_sme_cluster'] as string),
      under_sme_cluster_name:
        isUnderSMECluster == HasRegisteredAuthority.YES
          ? yup
              .string()
              .required()
              .label(messages['industry.under_sme_cluster_name'] as string)
          : yup.string(),
      member_of_association_or_chamber: yup
        .string()
        .required()
        .label(messages['institute.is_association_member'] as string),
      member_of_association_or_chamber_name: isAssociationMember
        ? yup
            .string()
            .required()
            .label(messages['industry.under_sme_cluster_name'] as string)
        : yup.string(),
      sector: yup
        .string()
        .required()
        .label(messages['institute.sector'] as string),
      sector_other_name: yup.string(),
      business_type: yup
        .string()
        .required()
        .label(messages['business_type.label'] as string),
      main_product_name: yup
        .string()
        .required()
        .label(messages['institute.main_product'] as string),
      main_material_description: yup
        .string()
        .required()
        .label(messages['institute.raw_materials_details'] as string),
      import: yup
        .string()
        .required()
        .label(messages['institute.is_import_product'] as string),
      import_by: yup.string(),
      export_abroad: yup
        .string()
        .required()
        .label(messages['institute.is_export_product'] as string),
      export_abroad_by: yup.string(),
      industry_irc_no: yup.string(),
      salaried_manpower: yup.object(),
      have_bank_account: yup
        .string()
        .required()
        .label(messages['institute.has_bank_account'] as string),
      bank_account_type: hasBankAccount
        ? yup
            .string()
            .required()
            .label(messages['bank_account_type.label'] as string)
        : yup.string(),
      accounting_system: yup
        .string()
        .required()
        .label(messages['institute.is_keep_daily_credit_debit'] as string),
      use_computer: yup
        .string()
        .required()
        .label(messages['institute.is_use_computer'] as string),
      internet_connection: yup
        .string()
        .required()
        .label(messages['institute.has_internet_connection'] as string),
      online_business: yup
        .string()
        .required()
        .label(messages['institute.has_online_business'] as string),
      info_provider_name: yup.string(),
      info_provider_mobile: yup.string(),
      info_collector_name: yup.string(),
      info_collector_mobile: yup.string(),
    });
  }, [
    messages,
    formFiller,
    hasBankAccount,
    hasWorkshop,
    isAssociationMember,
    isIndustryUnderSpecializedArea,
    isUnderSMECluster,
  ]);

  const {
    register,
    control,
    reset,
    setError,
    handleSubmit,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm<IUser>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    reset(initialValues);
  }, [districts, upazilas]);

  const changeDistrictAction = useCallback(
    (districtId: number) => {
      setUpazilasList(filterUpazilasByDistrictId(upazilas, districtId));
    },
    [upazilas],
  );

  const onChangeFormFiller = useCallback(
    (key: number) => {
      setFormFiller(key);
    },
    [formFiller],
  );

  const onChangeHasWorkshop = useCallback(
    (key: number) => {
      setHasWorkshop(key == HasWorkshopConstant.YES);
    },
    [hasWorkshop],
  );

  const handleRegisteredAuthorityCheck = useCallback(
    (registeredAuthorityId: number) => {
      const newAuthority = [...checkedRegisteredAuthority];

      const index = newAuthority.indexOf(registeredAuthorityId);
      newAuthority.includes(registeredAuthorityId)
        ? newAuthority.splice(index, 1)
        : newAuthority.push(registeredAuthorityId);

      setCheckedRegisteredAuthority(newAuthority);
    },
    [checkedRegisteredAuthority],
  );

  const handleAuthorizedAuthorityCheck = useCallback(
    (authorizedAuthorityId: number) => {
      const newAuthorityArr = [...checkedAuthorizedAuthority];

      const index = newAuthorityArr.indexOf(authorizedAuthorityId);
      newAuthorityArr.includes(authorizedAuthorityId)
        ? newAuthorityArr.splice(index, 1)
        : newAuthorityArr.push(authorizedAuthorityId);

      setCheckedAuthorizedAuthority(newAuthorityArr);
    },
    [checkedAuthorizedAuthority],
  );

  const handleSpecializedAreaCheck = useCallback(
    (areaId: number) => {
      const newSpecializedAreaArr = [...checkedSpecializedArea];

      const index = newSpecializedAreaArr.indexOf(areaId);
      newSpecializedAreaArr.includes(areaId)
        ? newSpecializedAreaArr.splice(index, 1)
        : newSpecializedAreaArr.push(areaId);

      setCheckedSpecializedArea(newSpecializedAreaArr);
    },
    [checkedSpecializedArea],
  );

  const handleHasRegisteredAuthorityChange = useCallback(
    (key: number) => {
      setHasRegisteredAuthority(key);
    },
    [hasRegisteredAuthority],
  );

  const handleHasAuthorizedAuthorityCheck = useCallback(
    (key: number) => {
      setHasAuthorizedAuthority(key);
    },
    [hasAuthorizedAuthority],
  );

  const handleInstituteIsUnderSpecializedArea = useCallback(
    (key: number) => {
      setIsIndustryUnderSpecializedArea(key);
    },
    [isIndustryUnderSpecializedArea],
  );

  const handleIsUnderSMECluster = useCallback(
    (key: number) => {
      setIsUnderSMECluster(key);
    },
    [isUnderSMECluster],
  );

  const handleIsAssociationMember = useCallback(
    (key: number | string) => {
      setIsAssociationMember(key == Boolean.YES);
    },
    [isAssociationMember],
  );

  const handleIsIndustryDoExport = useCallback(
    (key: number | string) => {
      setIsIndustryDoExport(key == Boolean.YES);
    },
    [isIndustryDoExport],
  );

  const handleIsIndustryDoImport = useCallback(
    (key: number | string) => {
      setIsIndustryDoImport(key == Boolean.YES);
    },
    [isIndustryDoImport],
  );

  const handleHasBankAccount = useCallback(
    (key: number | string) => {
      setHasBankAccount(key == Boolean.YES);
    },
    [hasBankAccount],
  );

  const onSubmit: SubmitHandler<IUser> = async (data: IUser) => {
    try {
      await createUser(data);
      createSuccessMessage('user.label');
      props.onClose();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <HookFormMuiModal
      open={true}
      {...props}
      title={
        <>
          <Grid container alignItems={'center'} justifyContent={'center'}>
            <Grid item>
              <H1 centered={true} sx={{color: 'red'}}>
                ক্ষুদ্র ও মাঝারি শিল্প ফাউন্ডেশন
              </H1>
              <H2 centered={true}>এসএমই উদ্যোক্তা ই-ডেটাবেজ</H2>
              <Body1 centered={true}>
                নানাবিধ নীতিগত সুবিধার জন্য সিএমএসএমই ই-ডাটাবেজ তৈরি করা হচ্ছে।
                গণপ্রজাতন্ত্রী বাংলাদেশ সরকারকে এই ডাটাবেজ তৈরিতে সহযোগিতা করার
                লক্ষ্যে আপনার প্রতিষ্ঠানকে তালিকাভুক্ত করার জন্য অনুরোধ করা হলো।
              </Body1>
            </Grid>
          </Grid>
        </>
      }
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
        </>
      }>
      <Grid container spacing={5}>
        <StyledHeader item xs={12}>
          <Typography variant={'body1'} className={classes.headerText}>
            <DynamicForm />
            {messages['common.who_will_fill_form']}
          </Typography>
        </StyledHeader>

        <Grid item xs={12}>
          <FormRadioButtons
            id={'form_fill_up_by'}
            label={'form_filler'}
            radios={[
              {
                key: FormFiller.SELF,
                label: messages['common.self'],
              },
              {
                key: FormFiller.CHAMBER_ASSOCIATION,
                label: messages['common.chamber_association'],
              },
              {
                key: FormFiller.NASCIB_CLUSTER,
                label: 'Nascib cluster',
              },
            ]}
            control={control}
            onChange={onChangeFormFiller}
            errorInstance={errors}
          />
        </Grid>

        {formFiller == FormFiller.NASCIB_CLUSTER && (
          <StyledHeader item xs={12}>
            <p className={classes.headerText}>
              {messages['institute.nascib_cluster_information']}
            </p>
          </StyledHeader>
        )}

        {formFiller == FormFiller.CHAMBER_ASSOCIATION && (
          <StyledHeader item xs={12}>
            <p className={classes.headerText}>
              {messages['institute.chamber_association_information']}
            </p>
          </StyledHeader>
        )}

        {formFiller == FormFiller.NASCIB_CLUSTER && (
          <>
            <Grid item xs={6}>
              <CustomTextInput
                required
                id='udc_name'
                label={messages['common.name']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomFormSelect
                id='udc_loc_district'
                label={messages['districts.label']}
                isLoading={isLoadingDistricts}
                control={control}
                options={districts}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title']}
                errorInstance={errors}
                onChange={changeDistrictAction}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                required
                id='udc_union'
                label={messages['union.label']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                required
                id='udc_code'
                label={messages['common.code']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
          </>
        )}

        {formFiller == FormFiller.CHAMBER_ASSOCIATION && (
          <>
            <Grid item xs={6}>
              <CustomTextInput
                required
                id='chamber_or_association_name'
                label={messages['common.name']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomFormSelect
                id='chamber_or_association_loc_district_id'
                label={messages['districts.label']}
                isLoading={isLoadingDistricts}
                control={control}
                options={districts}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title']}
                errorInstance={errors}
                onChange={changeDistrictAction}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                required
                id='chamber_or_association_union'
                label={messages['union.label']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                required
                id='chamber_or_association_code'
                label={messages['common.code']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
          </>
        )}

        <StyledHeader item xs={12}>
          <p className={classes.headerText}>
            {messages['entrepreneur_introduction.label']}
          </p>
        </StyledHeader>
        <Grid item xs={6}>
          <CustomTextInput
            required
            id='name'
            label={messages['common.name_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            required
            id='name_bn'
            label={messages['common.name_bn']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <FormRadioButtons
            required
            id={'gender'}
            radios={[
              {
                key: Gender.MALE,
                label: messages['common.male'],
              },
              {
                key: Gender.FEMALE,
                label: messages['common.female'],
              },
              {
                key: Gender.OTHERS,
                label: messages['common.others'],
              },
            ]}
            control={control}
            label={'common.gender'}
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

        <Grid item xs={6}>
          <CustomTextInput
            required
            id='academic_qualification'
            label={messages['user.academic_qualification']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            required
            id='nid'
            label={messages['common.identity_type_nid']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <FileUploadComponent
            required
            id={'nid_file'}
            errorInstance={errors}
            setValue={setValue}
            register={register}
            label={messages['common.national_identity']}
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
            placeholder='017xxxxxxxx'
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            required
            id='email'
            label={messages['common.email']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <FileUploadComponent
            required
            id={'entrepreneur_photo'}
            errorInstance={errors}
            setValue={setValue}
            register={register}
            label={messages['common.entrepreneur_pic']}
          />
        </Grid>

        <StyledHeader item xs={12}>
          <p className={classes.headerText}>
            {messages['common.institute_information']}
          </p>
        </StyledHeader>

        <Grid item xs={6}>
          <CustomTextInput
            required
            id='organization_trade_license_no'
            label={messages['institute.trade_licence_number']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            required
            id='organization_identification_no'
            label={messages['common.organization_identification_number']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            required
            id='organization_name'
            label={messages['common.institute']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            required
            id='organization_address'
            label={messages['common.address']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomFormSelect
            id='organization_loc_district_id'
            label={messages['districts.label']}
            isLoading={isLoadingDistricts}
            control={control}
            options={districts}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
            onChange={changeDistrictAction}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='organization_loc_upazila_id'
            label={messages['upazilas.label']}
            isLoading={isLoadingUpazilas}
            control={control}
            options={upazilasList}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            id='organization_domain'
            label={messages['common.website']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <FormRadioButtons
            required
            id='factory'
            label={'common.has_workshop'}
            radios={[
              {key: Boolean.YES, label: messages['common.yes']},
              {key: Boolean.NO, label: messages['common.no']},
            ]}
            control={control}
            onChange={onChangeHasWorkshop}
            errorInstance={errors}
          />
        </Grid>

        {hasWorkshop && (
          <>
            <Grid item xs={6}>
              <CustomTextInput
                required
                id='factory_address'
                label={messages['common.factory_address']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>

            <Grid item xs={6}>
              <CustomFormSelect
                id='factory_loc_district_id'
                label={messages['districts.label']}
                isLoading={isLoadingDistricts}
                control={control}
                options={districts}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title']}
                errorInstance={errors}
                onChange={changeDistrictAction}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomFormSelect
                id='factory_loc_upazila_id'
                label={messages['upazilas.label']}
                isLoading={isLoadingUpazilas}
                control={control}
                options={upazilasList}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title']}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={6}>
              <CustomTextInput
                id='factory_web_site'
                label={messages['common.website']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>

            <Grid item xs={6}>
              <FormRadioButtons
                required
                id={'office_or_showroom'}
                label={'factory.office_or_showroom'}
                radios={[
                  {
                    key: Boolean.YES,
                    label: messages['common.yes'],
                  },
                  {
                    key: Boolean.NO,
                    label: messages['common.no'],
                  },
                ]}
                control={control}
              />
            </Grid>

            <Grid item xs={6}>
              <FormRadioButtons
                required
                id={'factory_land_own_or_rent'}
                label={'factory.factory_land_own_or_rent'}
                radios={[
                  {
                    key: Boolean.YES,
                    label: messages['common.yes'],
                  },
                  {
                    key: Boolean.NO,
                    label: messages['common.no'],
                  },
                ]}
                control={control}
              />
            </Grid>
          </>
        )}

        <StyledHeader item xs={12}>
          <Typography variant={'body1'} className={classes.headerText}>
            {messages['common.institute_others_information']}
          </Typography>
        </StyledHeader>

        <Grid item xs={6}>
          <FormRadioButtons
            required
            id={'proprietorship'}
            radios={[
              {
                key: BusinessOwnership.SINGLE,
                label: messages['business_ownership.single'],
              },
              {
                key: BusinessOwnership.PARTNERSHIP,
                label: messages['business_ownership.partnership'],
              },
              {
                key: BusinessOwnership.JOINT,
                label: messages['business_ownership.joint'],
              },
            ]}
            control={control}
            errorInstance={errors}
            label={'common.business_ownership'}
          />
        </Grid>

        <Grid item xs={6}>
          <FormRadioButtons
            required
            id={'trade_licensing_authority'}
            label={'institute.trade_license_provider_authority'}
            radios={[
              {
                key: TradeLicensingAuthority.MUNICIPALITY,
                label: messages['municipality.label'],
              },
              {
                key: TradeLicensingAuthority.UNION_COUNCIL,
                label: messages['union_council.label'],
              },
              {
                key: TradeLicensingAuthority.CITY_CORPORATION,
                label: messages['city_corporation.label'],
              },
            ]}
            control={control}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            required
            id={'industry_establishment_year'}
            label={messages['institute.establish_year']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <FileUploadComponent
            id={'trade_license'}
            errorInstance={errors}
            setValue={setValue}
            register={register}
            label={messages['trade_license.upload']}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            required
            id={'industry_last_renew_year'}
            label={messages['institute.last_renewal_year']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <FormRadioButtons
            required
            id={'tin'}
            radios={[
              {key: Boolean.YES, label: messages['common.yes']},
              {key: Boolean.NO, label: messages['common.no']},
            ]}
            control={control}
            label={'institute.is_tin'}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            required
            id='investment_amount'
            label={messages['invested_amount_in_institute.label']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='current_total_asset'
            label={messages['institute.total_asset_amount']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <FormRadioButtons
            required
            id={'registered_under_authority'}
            label={'institute.is_registered_under_authority'}
            radios={[
              {
                key: Boolean.YES,
                label: messages['common.yes'],
              },
              {
                key: Boolean.NO,
                label: messages['common.no'],
              },
            ]}
            control={control}
            errorInstance={errors}
            onChange={handleHasRegisteredAuthorityChange}
          />
          {hasRegisteredAuthority == HasRegisteredAuthority.YES && (
            <CustomCheckboxTextInput
              id={'registered_authority'}
              data={registeredAuthors}
              label={messages['industry.registered_authority']}
              checkedDataArray={checkedRegisteredAuthority}
              onChange={handleRegisteredAuthorityCheck}
              register={register}
              errors={errors}
              isLoading={isLoading}
              textFieldPlaceholder={messages['common.registered_no']}
            />
          )}
        </Grid>

        <Grid item xs={6}>
          <FormRadioButtons
            required
            id={'authorized_under_authority'}
            label={'institute.is_under_any_approved_authority'}
            radios={[
              {
                key: Boolean.YES,
                label: messages['common.yes'],
              },
              {
                key: Boolean.NO,
                label: messages['common.no'],
              },
            ]}
            control={control}
            errorInstance={errors}
            onChange={handleHasAuthorizedAuthorityCheck}
          />

          {hasAuthorizedAuthority == Boolean.YES && (
            <CustomCheckboxTextInput
              id={'authorized_authority'}
              data={registeredAuthors}
              label={messages['industry.authorized_authority']}
              checkedDataArray={checkedAuthorizedAuthority}
              onChange={handleAuthorizedAuthorityCheck}
              register={register}
              errors={errors}
              isLoading={isLoading}
              textFieldPlaceholder={messages['common.approved_no']}
            />
          )}
        </Grid>

        <Grid item xs={6}>
          <FormRadioButtons
            required
            id={'specialized_area'}
            label={'institute.is_under_any_special_region'}
            radios={[
              {
                key: Boolean.YES,
                label: messages['common.yes'],
              },
              {
                key: Boolean.NO,
                label: messages['common.no'],
              },
            ]}
            control={control}
            errorInstance={errors}
            onChange={handleInstituteIsUnderSpecializedArea}
          />
          {isIndustryUnderSpecializedArea == HasRegisteredAuthority.YES && (
            <CustomCheckboxTextInput
              id={'specialized_area_name'}
              data={registeredAuthors}
              label={messages['industry.specialized_areas']}
              checkedDataArray={checkedSpecializedArea}
              onChange={handleSpecializedAreaCheck}
              register={register}
              errors={errors}
              isLoading={isLoading}
              isTextFieldExist={false}
            />
          )}
        </Grid>

        <Grid item xs={6}>
          <FormRadioButtons
            required
            id={'under_sme_cluster'}
            label={'institute.is_under_any_sme_cluster'}
            radios={[
              {
                key: Boolean.YES,
                label: messages['common.yes'],
              },
              {
                key: Boolean.NO,
                label: messages['common.no'],
              },
            ]}
            control={control}
            errorInstance={errors}
            onChange={handleIsUnderSMECluster}
          />
          {isUnderSMECluster == HasRegisteredAuthority.YES && (
            <CustomFormSelect
              id='under_sme_cluster_name'
              label={messages['institute.under_sme_cluster_name']}
              isLoading={isLoadingDistricts}
              control={control}
              options={districts}
              optionValueProp={'id'}
              optionTitleProp={['title_en', 'title']}
              errorInstance={errors}
              onChange={changeDistrictAction}
            />
          )}
        </Grid>

        <Grid item xs={6}>
          <FormRadioButtons
            required
            id={'member_of_association_or_chamber'}
            label={'institute.is_association_member'}
            radios={[
              {
                key: Boolean.YES,
                label: messages['common.yes'],
              },
              {
                key: Boolean.NO,
                label: messages['common.no'],
              },
            ]}
            control={control}
            errorInstance={errors}
            onChange={handleIsAssociationMember}
          />
          {isAssociationMember && (
            <CustomTextInput
              required
              id='member_of_association_or_chamber_name'
              label={
                messages['institute.member_of_association_or_chamber_name']
              }
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
              onChange={handleIsAssociationMember}
            />
          )}
        </Grid>

        <Grid item xs={6}>
          <CustomFormSelect
            required
            id='sector'
            label={messages['institute.sector']}
            isLoading={isLoading}
            control={control}
            options={[{id: 1, title: 'cloths'}]}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            id='sector_other_name'
            label={messages['institute.sector_other_name']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <FormRadioButtons
            required
            id={'business_type'}
            label={'business_type.label'}
            radios={[
              {
                key: BusinessType.MANUFACTURING,
                label: messages['business_type.manufacturing'],
              },
              {
                key: BusinessType.SERVICE,
                label: messages['business_type.service'],
              },
              {
                key: BusinessType.TRADING,
                label: messages['business_type.trading'],
              },
            ]}
            control={control}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            required
            id='main_product_name'
            label={messages['institute.main_product']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={12}>
          <CustomTextInput
            required
            multiline={true}
            rows={3}
            id='main_material_description'
            label={messages['institute.raw_materials_details']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <FormRadioButtons
            required
            id={'export_abroad'}
            label={'institute.is_export_product'}
            radios={[
              {
                key: Boolean.YES,
                label: messages['common.yes'],
              },
              {
                key: Boolean.NO,
                label: messages['common.no'],
              },
            ]}
            control={control}
            errorInstance={errors}
            onChange={handleIsIndustryDoExport}
          />
          {isIndustryDoExport && (
            <CustomTextInput
              required
              id='export_abroad_by'
              label={messages['institute.exporter']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          )}
        </Grid>

        <Grid item xs={6}>
          <FormRadioButtons
            required
            id={'import'}
            label={'institute.is_import_product'}
            radios={[
              {
                key: Boolean.YES,
                label: messages['common.yes'],
              },
              {
                key: Boolean.NO,
                label: messages['common.no'],
              },
            ]}
            control={control}
            onChange={handleIsIndustryDoImport}
            errorInstance={errors}
          />
          {isIndustryDoImport && (
            <CustomTextInput
              required
              id='import_by'
              label={messages['institute.importer']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          )}
        </Grid>

        {(isIndustryDoImport || isIndustryDoExport) && (
          <Grid item xs={6}>
            <CustomTextInput
              id='industry_irc_no'
              label={messages['industry.import_export_irc_no']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <FormLabel>{messages['institute.total_employee']}</FormLabel>
        </Grid>

        <Grid item xs={6}>
          <CustomChipTextInput
            fields={[
              {
                id: 'salaried_manpower.temporary.male',
                label: messages['common.male'],
              },
              {
                id: 'salaried_manpower.temporary.female',
                label: messages['common.female'],
              },
            ]}
            chipLabel={messages['total_employee.temporary']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomChipTextInput
            fields={[
              {
                id: 'salaried_manpower.permanent_employee.male',
                label: messages['common.male'],
              },
              {
                id: 'salaried_manpower.permanent_employee.female',
                label: messages['common.female'],
              },
            ]}
            chipLabel={messages['total_employee.permanent']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={12}>
          <CustomChipTextInput
            fields={[
              {
                id: 'salaried_manpower.seasonal.male',
                label: messages['common.male'],
              },
              {
                id: 'salaried_manpower.seasonal.female',
                label: messages['common.female'],
              },
            ]}
            chipLabel={messages['total_employee.seasonal']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <FormRadioButtons
            required
            id={'have_bank_account'}
            label={'institute.has_bank_account'}
            radios={[
              {
                key: Boolean.YES,
                label: messages['common.yes'],
              },
              {
                key: Boolean.NO,
                label: messages['common.no'],
              },
            ]}
            control={control}
            errorInstance={errors}
            onChange={handleHasBankAccount}
          />

          {hasBankAccount && (
            <Grid item xs={6}>
              <FormRadioButtons
                required
                id={'bank_account_type'}
                label={'bank_account_type.label'}
                radios={[
                  {
                    key: BankAccountType.PERSONAL,
                    label: messages['bank_account_type.personal'],
                  },
                  {
                    key: BankAccountType.OF_THE_ORGANIZATION,
                    label: messages['bank_account_type.of_the_organization'],
                  },
                ]}
                control={control}
                errorInstance={errors}
              />
            </Grid>
          )}
        </Grid>

        <Grid item xs={6}>
          <FormRadioButtons
            required
            id={'accounting_system'}
            label={'institute.is_keep_daily_debit_credit'}
            radios={[
              {
                key: Boolean.YES,
                label: messages['common.yes'],
              },
              {
                key: Boolean.NO,
                label: messages['common.no'],
              },
            ]}
            control={control}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={6}>
          <FormRadioButtons
            required
            id={'use_computer'}
            label={'institute.is_use_computer'}
            radios={[
              {
                key: Boolean.YES,
                label: messages['common.yes'],
              },
              {
                key: Boolean.NO,
                label: messages['common.no'],
              },
            ]}
            control={control}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={6}>
          <FormRadioButtons
            required
            id={'internet_connection'}
            label={'institute.has_internet_connection'}
            radios={[
              {
                key: Boolean.YES,
                label: messages['common.yes'],
              },
              {
                key: Boolean.NO,
                label: messages['common.no'],
              },
            ]}
            control={control}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={6}>
          <FormRadioButtons
            required
            id={'online_business'}
            label={'institute.has_online_business'}
            radios={[
              {
                key: Boolean.YES,
                label: messages['common.yes'],
              },
              {
                key: Boolean.NO,
                label: messages['common.no'],
              },
            ]}
            control={control}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            id='info_provider_name'
            label={messages['institute.info_provider_name']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            id='info_provider_mobile'
            label={messages['institute.info_provider_mobile']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            id='info_collector_name'
            label={messages['institute.info_collector_name']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            id='info_collector_mobile'
            label={messages['institute.info_collector_mobile']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <FormRadioButtons
            id={'row_status'}
            label={'common.status'}
            radios={[
              {
                key: RowStatus.PENDING,
                label: messages['common.pending'],
              },
              {
                key: RowStatus.ACTIVE,
                label: messages['common.active'],
              },
              {
                key: RowStatus.INACTIVE,
                label: messages['common.inactive'],
              },
            ]}
            control={control}
            defaultValue={RowStatus.ACTIVE}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default NASCIBMemberRegistrationForm;
