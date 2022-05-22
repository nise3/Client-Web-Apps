import yup from '../../../@softbd/libs/yup';
import {Chip, Grid, Typography} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {MOBILE_NUMBER_REGEX} from '../../../@softbd/common/patternRegex';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {
  createOrganization,
  updateOrganization,
} from '../../../services/organaizationManagement/OrganizationService';
import {useIntl} from 'react-intl';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconOrganization from '../../../@softbd/icons/IconOrganization';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {
  useFetchLocalizedPublicOrganizationTypes,
  useFetchOrganization,
} from '../../../services/organaizationManagement/hooks';
import {
  useFetchLocalizedPermissionGroups,
  useFetchLocalizedPermissionSubGroups,
} from '../../../services/userManagement/hooks';
import {
  FORM_PLACEHOLDER,
  isLatLongValid,
  PERMISSION_GROUP_ORGANIZATION_KEY,
} from '../../../@softbd/common/constants';
import {
  useFetchLocalizedDistricts,
  useFetchLocalizedDivisions,
  useFetchLocalizedUpazilas,
} from '../../../services/locationManagement/hooks';
import {
  filterDistrictsByDivisionId,
  filterUpazilasByDistrictId,
} from '../../../services/locationManagement/locationUtils';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {IOrganization} from '../../../shared/Interface/organization.interface';
import {District, Upazila} from '../../../shared/Interface/location.interface';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import {
  useFetchLocalizedIndustryAssociations,
  useFetchLocalizedIndustryAssociationSubTrades,
  useFetchLocalizedIndustryAssociationTrades,
} from '../../../services/IndustryAssociationManagement/hooks';
import CustomSelectAutoComplete from '../../youth/registration/CustomSelectAutoComplete';
import {Box} from '@mui/system';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {cloneDeep} from 'lodash';
import {isBreakPointUp} from '../../../@crema/utility/Utils';

interface MemberAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title_en: '',
  title: '',
  // domain: '',
  email: '',
  mobile: '',
  fax_no: '',
  contact_person_name: '',
  contact_person_name_en: '',
  contact_person_mobile: '',
  contact_person_email: '',
  contact_person_designation: '',
  contact_person_designation_en: '',
  organization_type_id: '',
  membership_id: '',
  permission_sub_group_id: '',
  loc_division_id: '',
  loc_district_id: '',
  loc_upazila_id: '',
  location_latitude: '',
  location_longitude: '',
  google_map_src: '',
  address: '',
  address_en: '',
  name_of_the_office_head: '',
  name_of_the_office_head_en: '',
  name_of_the_office_head_designation: '',
  name_of_the_office_head_designation_en: '',
  description: '',
  description_en: '',
  logo: '',
  row_status: '1',
  industry_association_trade_id: '',
  sub_trades: [],
};

const MemberAddEditPopup: FC<MemberAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const authUser = useAuthUser();
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const isEdit = itemId != null;

  const [permissionGroupFilters] = useState({
    row_status: RowStatus.ACTIVE,
    key: PERMISSION_GROUP_ORGANIZATION_KEY,
  });

  const [permissionSubGroupFilters, setPermissionSubGroupFilters] =
    useState<any>({
      row_status: RowStatus.ACTIVE,
    });

  const {data: permissionGroups} = useFetchLocalizedPermissionGroups(
    permissionGroupFilters,
  );
  const {data: permissionSubGroups, isLoading: isLoadingPermissionSubGroups} =
    useFetchLocalizedPermissionSubGroups(permissionSubGroupFilters);

  const [divisionsFilter] = useState({
    row_status: RowStatus.ACTIVE,
  });
  const [districtsFilter] = useState({
    row_status: RowStatus.ACTIVE,
  });
  const [upazilasFilter] = useState({
    row_status: RowStatus.ACTIVE,
  });

  const {data: divisions, isLoading: isLoadingDivisions} =
    useFetchLocalizedDivisions(divisionsFilter);
  const {data: districts, isLoading: isLoadingDistricts} =
    useFetchLocalizedDistricts(districtsFilter);
  const {data: upazilas, isLoading: isLoadingUpazilas} =
    useFetchLocalizedUpazilas(upazilasFilter);
  const [districtsList, setDistrictsList] = useState<Array<District> | []>([]);
  const [upazilasList, setUpazilasList] = useState<Array<Upazila> | []>([]);

  const [organizationTypeFilters] = useState({
    row_status: RowStatus.ACTIVE,
  });
  const {
    data: itemData,
    isLoading,
    mutate: mutateOrganization,
  } = useFetchOrganization(itemId);
  const {data: organizationTypes, isLoading: isOrganizationTypeLoading} =
    useFetchLocalizedPublicOrganizationTypes(organizationTypeFilters);

  const [industryAssociationFilter, setIndustryAssociationFilter] =
    useState<any>(null);

  const {data: industryAssociations, isLoading: isLoadingIndustryAssociation} =
    useFetchLocalizedIndustryAssociations(industryAssociationFilter);

  const [tradeFilter] = useState({});
  const {
    data: industryAssociationTrades,
    isLoading: isLoadingIndustryAssociationTrades,
  } = useFetchLocalizedIndustryAssociationTrades(tradeFilter);

  const [subTradeFilter, setSubTradeFilter] = useState({});
  const {
    data: industryAssociationSubTrades,
    isLoading: isLoadingIndustryAssociationSubTrades,
  } = useFetchLocalizedIndustryAssociationSubTrades(subTradeFilter);

  const [selectedTradeId, setSelectedTradeId] = useState<any>(null);
  const [selectedAllSubTrades, setSelectedAllSubTrades] = useState<any>([]);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title('bn', true, messages['common.special_character_error'] as string)
        .label(messages['common.title'] as string),
      title_en: yup
        .string()
        .title(
          'en',
          false,
          messages['common.special_character_error'] as string,
        )
        .label(messages['common.title_en'] as string),

      email: yup
        .string()
        .email()
        .trim()
        .required()
        .label(messages['common.email'] as string),
      mobile: yup
        .string()
        .trim()
        .required()
        .label(messages['common.mobile'] as string)
        .matches(MOBILE_NUMBER_REGEX),
      industry_association_id: authUser?.isSystemUser
        ? yup
            .string()
            .trim()
            .required()
            .label(messages['institute.label'] as string)
        : yup.string(),
      contact_person_name: yup
        .string()
        .trim()
        .required()
        .label(messages['common.contact_person_name'] as string),
      contact_person_mobile: yup
        .string()
        .trim()
        .required()
        .label(messages['common.contact_person_mobile'] as string)
        .matches(MOBILE_NUMBER_REGEX),
      sub_trades:
        selectedAllSubTrades.length != 0
          ? yup.array()
          : yup
              .array()
              .of(yup.object())
              .min(1, messages['common.must_have_one_sub_trade'] as string)
              .required()
              .label(
                messages['common.industry_association_sub_trade'] as string,
              ),
      membership_id: yup
        .string()
        .trim()
        .required()
        .label(messages['common.memberId'] as string),
      contact_person_email: yup
        .string()
        .email()
        .trim()
        .required()
        .label(messages['common.contact_person_email'] as string),
      contact_person_designation: yup
        .string()
        .trim()
        .required()
        .label(messages['common.contact_person_designation'] as string),
      organization_type_id: yup
        .string()
        .required()
        .label(messages['menu.organization_type'] as string),
      permission_sub_group_id: isEdit
        ? yup.string().nullable()
        : yup
            .string()
            .required()
            .label(messages['permission_sub_group.label'] as string),
      address: yup
        .string()
        .trim()
        .required()
        .label(messages['common.address'] as string),
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
      row_status: yup.string().label(messages['common.status'] as string),
      location_latitude: yup
        .string()
        .nullable()
        .test(
          'lat-err',
          `${messages['common.location_latitude']} ${messages['common.not_valid']}`,
          (value) => isLatLongValid(value as string),
        ),
      location_longitude: yup
        .string()
        .nullable()
        .test(
          'long-err',
          `${messages['common.location_longitude']} ${messages['common.not_valid']}`,
          (value) => isLatLongValid(value as string),
        ),
    });
  }, [messages, selectedAllSubTrades]);

  const {
    control,
    register,
    reset,
    getValues,
    handleSubmit,
    setError,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm<IOrganization>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (permissionGroups && permissionGroups.length > 0) {
      setPermissionSubGroupFilters({
        permission_group_id: permissionGroups[0]?.id,
        row_status: RowStatus.ACTIVE,
      });
    }
  }, [permissionGroups]);

  useEffect(() => {
    if (authUser?.isSystemUser) {
      setIndustryAssociationFilter({row_status: RowStatus.ACTIVE});
    }
  }, [authUser]);

  useEffect(() => {
    if (itemData) {
      reset({
        title_en: itemData?.title_en,
        title: itemData?.title,
        // domain: itemData?.domain,
        email: itemData?.email,
        mobile: itemData?.mobile,
        fax_no: itemData?.fax_no,
        contact_person_name: itemData?.contact_person_name,
        contact_person_name_en: itemData?.contact_person_name_en,
        contact_person_mobile: itemData?.contact_person_mobile,
        contact_person_email: itemData?.contact_person_email,
        contact_person_designation: itemData?.contact_person_designation,
        contact_person_designation_en: itemData?.contact_person_designation_en,
        name_of_the_office_head: itemData?.name_of_the_office_head,
        name_of_the_office_head_en: itemData?.name_of_the_office_head_en,
        name_of_the_office_head_designation:
          itemData?.name_of_the_office_head_designation,
        name_of_the_office_head_designation_en:
          itemData?.name_of_the_office_head_designation_en,
        organization_type_id: itemData?.organization_type_id,
        loc_division_id: itemData?.loc_division_id,
        industry_association_id: itemData?.industry_association_id,
        membership_id:
          itemData?.industry_associations[0]?.pivot?.organization_id,
        loc_district_id: itemData?.loc_district_id,
        loc_upazila_id: itemData?.loc_upazila_id,
        location_latitude: itemData?.location_latitude,
        location_longitude: itemData?.location_longitude,
        google_map_src: itemData?.google_map_src,
        address: itemData?.address,
        address_en: itemData?.address_en,
        logo: itemData?.logo,
        description: itemData?.description,
        description_en: itemData?.description_en,
        row_status: String(itemData?.row_status),
        sub_trades: itemData.sub_trades,
      });

      setDistrictsList(
        filterDistrictsByDivisionId(districts, itemData?.loc_division_id),
      );
      setUpazilasList(
        filterUpazilasByDistrictId(upazilas, itemData?.loc_district_id),
      );
      setSelectedAllSubTrades(itemData?.sub_trades);
    } else {
      reset(initialValues);
    }
  }, [itemData, districts, upazilas]);

  /** Methods called on changing the division and districts in dropdown */
  const changeDivisionAction = useCallback(
    (divisionId: number) => {
      setDistrictsList(filterDistrictsByDivisionId(districts, divisionId));
      setUpazilasList([]);
    },
    [districts],
  );

  const changeDistrictAction = useCallback(
    (districtId: number) => {
      setUpazilasList(filterUpazilasByDistrictId(upazilas, districtId));
    },
    [upazilas],
  );

  const onTradeChange = useCallback(
    (industryAssociationTradeId: number) => {
      let selectedForTrades: Array<any> = [...selectedAllSubTrades];

      if (industryAssociationTradeId) {
        selectedForTrades = selectedAllSubTrades.filter(
          (subTrade: any) => subTrade.trade_id == industryAssociationTradeId,
        );

        reset({
          ...getValues(),
          sub_trades: selectedForTrades,
          industry_association_trade_id: industryAssociationTradeId,
        });

        setSubTradeFilter({
          trade_id: industryAssociationTradeId,
        });
        setSelectedTradeId(industryAssociationTradeId);
      } else {
        reset({
          ...getValues(),
          sub_trades: selectedForTrades,
          industry_association_trade_id: '',
        });

        setSubTradeFilter({});
        setSelectedTradeId(null);
      }
    },
    [selectedAllSubTrades],
  );

  const onSubTradeChange = useCallback(
    (options: any) => {
      let selectedSubTrades: Array<any> = [...selectedAllSubTrades];

      if (selectedTradeId) {
        selectedSubTrades = selectedSubTrades.filter(
          (subTrade: any) => subTrade.trade_id != selectedTradeId,
        );

        selectedSubTrades = [...selectedSubTrades, ...options];
      } else {
        selectedSubTrades = options;
      }

      setSelectedAllSubTrades(selectedSubTrades);
    },
    [selectedTradeId, selectedAllSubTrades],
  );
  const onTradeDelete = useCallback(
    (deletedTrade) => () => {
      if (deletedTrade) {
        let selectedSubTrades: Array<any> = [...selectedAllSubTrades];
        selectedSubTrades = selectedSubTrades.filter(
          (subTrade: any) => subTrade.id != deletedTrade.id,
        );
        setSelectedAllSubTrades(selectedSubTrades);

        if (selectedTradeId) {
          let subTrades = selectedSubTrades.filter(
            (subTrade: any) => subTrade.trade_id == selectedTradeId,
          );
          reset({
            ...getValues(),
            sub_trades: subTrades,
          });
        } else {
          reset({
            ...getValues(),
            sub_trades: selectedSubTrades,
          });
        }
      }
    },
    [selectedAllSubTrades, selectedTradeId],
  );

  console.log('errors', errors);
  const onSubmit: SubmitHandler<any> = async (data: IOrganization) => {
    const formData = cloneDeep(data);

    delete formData.industry_association_trade_id;

    formData.sub_trades = (selectedAllSubTrades || []).map(
      (subTrade: any) => subTrade.id,
    );

    try {
      if (itemId) {
        await updateOrganization(itemId, formData);
        updateSuccessMessage('common.member_list');
        mutateOrganization();
      } else {
        await createOrganization(formData);
        createSuccessMessage('common.member_list');
      }
      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <HookFormMuiModal
      {...props}
      open={true}
      title={
        <>
          <IconOrganization />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='common.member_list' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='common.member_list' />}}
            />
          )}
        </>
      }
      handleSubmit={handleSubmit(onSubmit)}
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='title'
            label={messages['common.title']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='title_en'
            label={messages['common.title_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        {!isEdit && (
          <Grid item xs={!isEdit ? 12 : 6}>
            <CustomFormSelect
              required
              id='permission_sub_group_id'
              label={messages['permission_sub_group.label']}
              isLoading={isLoadingPermissionSubGroups}
              control={control}
              options={permissionSubGroups}
              optionValueProp='id'
              optionTitleProp={['title']}
              errorInstance={errors}
            />
          </Grid>
        )}
        <Grid item xs={12} md={6}>
          <CustomFormSelect
            required
            id='organization_type_id'
            label={messages['menu.organization_type']}
            isLoading={isOrganizationTypeLoading}
            control={control}
            options={organizationTypes}
            optionValueProp='id'
            optionTitleProp={['title']}
            errorInstance={errors}
          />
        </Grid>
        {authUser?.isSystemUser && (
          <Grid item xs={12} md={6}>
            <CustomFormSelect
              required
              id='industry_association_id'
              label={messages['common.industry_association']}
              isLoading={isLoadingIndustryAssociation}
              control={control}
              options={industryAssociations}
              optionValueProp={'id'}
              optionTitleProp={['title']}
              errorInstance={errors}
            />
          </Grid>
        )}
        <Grid item xs={12} md={6}>
          <CustomFormSelect
            id='industry_association_trade_id'
            label={messages['common.industry_association_trade']}
            isLoading={isLoadingIndustryAssociationTrades}
            control={control}
            options={industryAssociationTrades}
            optionValueProp='id'
            optionTitleProp={['title']}
            errorInstance={errors}
            onChange={onTradeChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomSelectAutoComplete
            required
            id='sub_trades'
            label={messages['common.industry_association_sub_trade']}
            isLoading={isLoadingIndustryAssociationSubTrades}
            control={control}
            options={industryAssociationSubTrades}
            optionValueProp='id'
            optionTitleProp={['title']}
            errorInstance={errors}
            onChange={onSubTradeChange}
          />
        </Grid>

        {selectedAllSubTrades.length > 0 && (
          <Grid item xs={12}>
            <Typography>Selected Trades</Typography>
            <Box>
              {selectedAllSubTrades.map((trade: any) => {
                return (
                  <React.Fragment key={trade.id}>
                    <Chip
                      label={trade.title}
                      sx={{marginLeft: '5px', marginBottom: '5px'}}
                      onDelete={onTradeDelete(trade)}
                    />
                  </React.Fragment>
                );
              })}
            </Box>
          </Grid>
        )}
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='membership_id'
            label={messages['common.memberId']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        {/*<Grid item xs={12} md={6}>*/}
        {/*  <CustomTextInput*/}
        {/*    id='domain'*/}
        {/*    label={messages['common.domain']}*/}
        {/*    register={register}*/}
        {/*    errorInstance={errors}*/}
        {/*    isLoading={isLoading}*/}
        {/*  />*/}
        {/*</Grid>*/}
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='email'
            label={messages['common.email']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            placeholder='example@gmail.com'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='fax_no'
            label={messages['common.fax_no']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        {!isEdit && <Grid item xs={12} md={6} />}
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='name_of_the_office_head'
            label={messages['common.name_of_the_office_head']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='name_of_the_office_head_en'
            label={messages['common.name_of_the_office_head_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='name_of_the_office_head_designation'
            label={messages['common.name_of_the_office_head_designation']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='name_of_the_office_head_designation_en'
            label={messages['common.name_of_the_office_head_designation_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='description'
            label={messages['common.description']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={3}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='description_en'
            label={messages['common.description_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={3}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='address'
            label={messages['common.address']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={3}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='address_en'
            label={messages['common.address_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={3}
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
            optionTitleProp={['title']}
            errorInstance={errors}
            onChange={changeDivisionAction}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormSelect
            required
            id='loc_district_id'
            label={messages['districts.label']}
            isLoading={isLoadingDistricts}
            control={control}
            options={districtsList}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            errorInstance={errors}
            onChange={changeDistrictAction}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormSelect
            id='loc_upazila_id'
            label={messages['upazilas.label']}
            isLoading={isLoadingUpazilas}
            control={control}
            options={upazilasList}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='location_latitude'
            label={messages['common.location_latitude']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            placeholder={FORM_PLACEHOLDER.LATITUDE}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='location_longitude'
            label={messages['common.location_longitude']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            placeholder={FORM_PLACEHOLDER.LONGITUDE}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='google_map_src'
            label={messages['common.google_map_src']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6' marginBottom={1}>
            {messages['common.contact_person_info']}
          </Typography>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='contact_person_name'
                label={messages['common.contact_person_name']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='contact_person_name_en'
                label={messages['common.contact_person_name_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='contact_person_designation'
                label={messages['common.contact_person_designation']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='contact_person_designation_en'
                label={messages['common.contact_person_designation_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='contact_person_mobile'
                label={messages['common.contact_person_mobile']}
                helperText={messages['common.registration_username_note']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
                placeholder='017xxxxxxxx'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='contact_person_email'
                label={messages['common.contact_person_email']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
                placeholder='example@gmail.com'
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <FileUploadComponent
            id='logo'
            defaultFileUrl={itemData?.logo}
            errorInstance={errors}
            setValue={setValue}
            register={register}
            label={messages['common.logo']}
            required={false}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormRowStatus
            id='row_status'
            control={control}
            defaultValue={initialValues.row_status}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default MemberAddEditPopup;
