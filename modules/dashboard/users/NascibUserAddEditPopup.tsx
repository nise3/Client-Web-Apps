import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useFetchUser} from '../../../services/userManagement/hooks';
import RowStatus from './RowStatus';
import yup from '../../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {FormLabel, Grid, Typography} from '@mui/material';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {
  createUser,
  updateUser,
} from '../../../services/userManagement/UserService';
import IconUser from '../../../@softbd/icons/IconUser';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {
  MOBILE_NUMBER_REGEX,
  TEXT_REGEX_PASSWORD,
} from '../../../@softbd/common/patternRegex';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {
  useFetchDistricts,
  useFetchUpazilas,
} from '../../../services/locationManagement/hooks';
import {filterUpazilasByDistrictId} from '../../../services/locationManagement/locationUtils';
import {IUser} from '../../../shared/Interface/userManagement.interface';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import {getUserType} from '../../../@softbd/utilities/helpers';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {styled} from '@mui/material/styles';
import {Gender} from '../jobLists/jobPost/enums/JobPostEnums';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import CustomChipTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomChipTextInput';
import {DynamicForm} from '@mui/icons-material';
import FormFiller from './FormFiller';
import HasWorkshopConstant from './HasWorkshopConstant';

interface UserAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
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

const UserAddEditPopup: FC<UserAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const authUser = useAuthUser();

  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const isEdit = itemId != null;
  const {data: itemData, isLoading, mutate: mutateUser} = useFetchUser(itemId);

  const [districtsFilter] = useState({});
  const [upazilasFilter] = useState({});

  const {data: districts, isLoading: isLoadingDistricts} =
    useFetchDistricts(districtsFilter);
  const {data: upazilas, isLoading: isLoadingUpazilas} =
    useFetchUpazilas(upazilasFilter);

  const [upazilasList, setUpazilasList] = useState<Array<any> | []>([]);
  const [formFiller, setFormFiller] = useState<any>(null);
  const [hasWorkshop, setHasWorkshop] = useState<boolean>(false);

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
      mobile: yup
        .string()
        .trim()
        .required()
        .matches(MOBILE_NUMBER_REGEX)
        .label(messages['common.mobile'] as string),
      nid: yup
        .string()
        .required()
        .label(messages['common.identity_type_nid'] as string),
      nid_file: yup
        .string()
        .required()
        .label(messages['common.national_identity'] as string),
      username: yup
        .string()
        .trim()
        .required()
        .min(3)
        .label(messages['user.username'] as string),
      email: yup
        .string()
        .trim()
        .required()
        .email()
        .label(messages['common.email'] as string),
      factory: yup
        .boolean()
        .required()
        .label(messages['common.workshop'] as string),
    });
  }, [itemId, messages]);

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

  console.log(errors);

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

  const onSubmit: SubmitHandler<IUser> = async (data: IUser) => {
    if (authUser?.isInstituteUser) {
      data.user_type = String(getUserType(authUser));
      data.institute_id = authUser?.institute_id;
    } else if (authUser?.isOrganizationUser) {
      data.organization_id = authUser?.organization_id;
    }

    try {
      if (itemId) {
        data.user_type = String(itemData?.user_type); //this will be removed after backend refactor user creation
        await updateUser(itemId, data);
        updateSuccessMessage('user.label');
        mutateUser();
      } else {
        data.user_type = String(getUserType(authUser)); //this will be removed after backend refactor user creation
        await createUser(data);
        createSuccessMessage('user.label');
      }
      props.onClose();
      refreshDataTable();
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
          <IconUser />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='user.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='user.label' />}}
            />
          )}
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
            id='organization_domain'
            label={messages['common.website']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <FormRadioButtons
            id={'factory'}
            label={'common.has_workshop'}
            radios={[
              {key: '1', label: messages['common.yes']},
              {key: '2', label: messages['common.no']},
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
                id={'office_or_showroom'}
                label={'factory.office_or_showroom'}
                radios={[
                  {
                    key: '1',
                    label: messages['common.yes'],
                  },
                  {
                    key: '2',
                    label: messages['common.no'],
                  },
                ]}
                control={control}
              />
            </Grid>

            <Grid item xs={6}>
              <FormRadioButtons
                id={'factory_land_own_or_rent'}
                label={'factory.factory_land_own_or_rent'}
                radios={[
                  {
                    key: '1',
                    label: messages['common.yes'],
                  },
                  {
                    key: '2',
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
            id={'proprietorship'}
            radios={[
              {
                key: '1',
                label: messages['business_ownership.single'],
              },
              {
                key: '2',
                label: messages['business_ownership.partnership'],
              },
              {
                key: '3',
                label: messages['business_ownership.joint'],
              },
            ]}
            control={control}
            label={'common.business_ownership'}
          />
        </Grid>

        <Grid item xs={6}>
          <FormRadioButtons
            id={'trade_licensing_authority'}
            label={'institute.trade_license_provider_authority'}
            radios={[
              {
                key: '2',
                label: messages['municipality.label'],
              },
              {
                key: '3',
                label: messages['union_council.label'],
              },
              {
                key: '1',
                label: messages['city_corporation.label'],
              },
            ]}
            control={control}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
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
            id={'industry_last_renew_year'}
            label={messages['institute.last_renewal_year']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <FormRadioButtons
            id={'tin'}
            radios={[
              {key: '1', label: messages['common.yes']},
              {key: '2', label: messages['common.no']},
            ]}
            control={control}
            label={'institute.is_tin'}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
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
            id={'registered_under_authority'}
            label={'institute.is_registered_under_authority'}
            radios={[
              {
                key: '1',
                label: messages['common.yes'],
              },
              {
                key: '2',
                label: messages['common.no'],
              },
            ]}
            control={control}
          />
        </Grid>

        <Grid item xs={6}>
          <FormRadioButtons
            id={'authorized_under_authority'}
            label={'institute.is_under_any_approved_authority'}
            radios={[
              {
                key: '1',
                label: messages['common.yes'],
              },
              {
                key: '2',
                label: messages['common.no'],
              },
            ]}
            control={control}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            id='authorized_authority'
            label={messages['institute.authorized_authority']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <FormRadioButtons
            id={'specialized_area'}
            label={'institute.is_under_any_special_region'}
            radios={[
              {
                key: '1',
                label: messages['common.yes'],
              },
              {
                key: '2',
                label: messages['common.no'],
              },
            ]}
            control={control}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            id='specialized_area_name'
            label={messages['institute.specialized_area_name']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <FormRadioButtons
            id={'under_sme_cluster'}
            label={'institute.is_under_any_sme_cluster'}
            radios={[
              {
                key: '1',
                label: messages['common.yes'],
              },
              {
                key: '2',
                label: messages['common.no'],
              },
            ]}
            control={control}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            id='under_sme_cluster_name'
            label={messages['institute.under_sme_cluster_name']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <FormRadioButtons
            id={'member_of_association_or_chamber'}
            label={'institute.is_association_member'}
            radios={[
              {
                key: '1',
                label: messages['common.yes'],
              },
              {
                key: '2',
                label: messages['common.no'],
              },
            ]}
            control={control}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            id='member_of_association_or_chamber_name'
            label={messages['institute.member_of_association_or_chamber_name']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomFormSelect
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
            id={'business_type'}
            label={'business_type.label'}
            radios={[
              {
                key: 1,
                label: messages['business_type.manufacturing'],
              },
              {
                key: 2,
                label: messages['business_type.service'],
              },
              {
                key: 3,
                label: messages['business_type.trading'],
              },
            ]}
            control={control}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            id='main_product_name'
            label={messages['institute.main_product']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={12}>
          <CustomTextInput
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
            id={'export_abroad'}
            label={'institute.is_export_product'}
            radios={[
              {
                key: 1,
                label: messages['common.yes'],
              },
              {
                key: 2,
                label: messages['common.no'],
              },
            ]}
            control={control}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            id='export_abroad_by'
            label={messages['institute.exporter']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <FormRadioButtons
            id={'import'}
            label={'institute.is_import_product'}
            radios={[
              {
                key: 1,
                label: messages['common.yes'],
              },
              {
                key: 2,
                label: messages['common.no'],
              },
            ]}
            control={control}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            id='import_by'
            label={messages['institute.importer']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            id='industry_irc_no'
            label={messages['industry.import_export_irc_no']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

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
            id={'has_bank_account'}
            label={'institute.has_bank_account'}
            radios={[
              {
                key: 1,
                label: messages['common.yes'],
              },
              {
                key: 2,
                label: messages['common.no'],
              },
            ]}
            control={control}
          />
        </Grid>

        <Grid item xs={6}>
          <FormRadioButtons
            id={'is_keep_daily_debit_credit'}
            label={'institute.is_keep_daily_debit_credit'}
            radios={[
              {
                key: 1,
                label: messages['common.yes'],
              },
              {
                key: 2,
                label: messages['common.no'],
              },
            ]}
            control={control}
          />
        </Grid>

        <Grid item xs={6}>
          <FormRadioButtons
            id={'is_use_computer'}
            label={'institute.is_use_computer'}
            radios={[
              {
                key: 1,
                label: messages['common.yes'],
              },
              {
                key: 2,
                label: messages['common.no'],
              },
            ]}
            control={control}
          />
        </Grid>

        <Grid item xs={6}>
          <FormRadioButtons
            id={'has_internet_connection'}
            label={'institute.has_internet_connection'}
            radios={[
              {
                key: 1,
                label: messages['common.yes'],
              },
              {
                key: 2,
                label: messages['common.no'],
              },
            ]}
            control={control}
          />
        </Grid>

        <Grid item xs={6}>
          <FormRadioButtons
            id={'has_online_business'}
            label={'institute.has_online_business'}
            radios={[
              {
                key: 1,
                label: messages['common.yes'],
              },
              {
                key: 2,
                label: messages['common.no'],
              },
            ]}
            control={control}
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

export default UserAddEditPopup;
