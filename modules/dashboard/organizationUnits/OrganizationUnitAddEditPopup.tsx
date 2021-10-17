import yup from '../../../@softbd/libs/yup';
import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {MOBILE_NUMBER_REGEX} from '../../../@softbd/common/patternRegex';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconOrganization from '../../../@softbd/icons/IconOrganization';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {
  assignServiceToOrganizationUnit,
  createOrganizationUnit,
  updateOrganizationUnit,
} from '../../../services/organaizationManagement/OrganizationUnitService';
import {
  isNeedToSelectOrganization,
  isResponseSuccess,
  isValidationError,
} from '../../../@softbd/utilities/helpers';
import {
  useFetchOrganizations,
  useFetchOrganizationServices,
  useFetchOrganizationUnit,
  useFetchOrganizationUnitTypes,
} from '../../../services/organaizationManagement/hooks';
import {
  useFetchDistricts,
  useFetchDivisions,
  useFetchUpazilas,
} from '../../../services/locationManagement/hooks';
import {setServerValidationErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {useAuthUser} from '../../../@crema/utility/AppHooks';

interface OrganizationAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title_en: '',
  title: '',
  organization_id: '',
  organization_unit_type_id: '',
  loc_division_id: '',
  loc_district_id: '',
  loc_upazila_id: '',
  email: '',
  mobile: '',
  fax_no: '',
  contact_person_name: '',
  contact_person_mobile: '',
  contact_person_email: '',
  contact_person_designation: '',
  employee_size: '',
  services: [],
  row_status: '1',
};

const OrganizationUnitAddEditPopup: FC<OrganizationAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const authUser = useAuthUser();
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const isEdit = itemId != null;
  const {
    data: itemData,
    isLoading,
    mutate: mutateOrganizationUnit,
  } = useFetchOrganizationUnit(itemId);

  const [organizationFilters] = useState({row_status: RowStatus.ACTIVE});
  const [organizationUnitTypeFilters, setOrganizationUnitTypeFilters] =
    useState<any>({
      row_status: RowStatus.ACTIVE,
    });
  const [serviceFilters] = useState({row_status: RowStatus.ACTIVE});
  const [divisionsFilter] = useState({row_status: RowStatus.ACTIVE});
  const [districtsFilter, setDistrictsFilter] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const [upazilasFilter, setUpazilasFilter] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: organizations, isLoading: isLoadingOrganization} =
    useFetchOrganizations(organizationFilters);
  const {
    data: organizationUnitTypes,
    isLoading: isLoadingOrganizationUnitTypes,
  } = useFetchOrganizationUnitTypes(organizationUnitTypeFilters);

  const {data: divisions, isLoading: isLoadingDivisions} =
    useFetchDivisions(divisionsFilter);
  const {data: districts, isLoading: isLoadingDistricts} =
    useFetchDistricts(districtsFilter);
  const {data: upazilas, isLoading: isLoadingUpazilas} =
    useFetchUpazilas(upazilasFilter);

  const {data: services, isLoading: isLoadingServices} =
    useFetchOrganizationServices(serviceFilters);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title_en: yup
        .string()
        .title('en')
        .label(messages['common.title_en'] as string),
      title: yup.string().titlee.label(messages['common.title'] as string),
      organization_id:
        authUser && authUser.isSystemUser
          ? yup
              .string()
              .trim()
              .required()
              .label(messages['organization.label'] as string)
          : yup.string().label(messages['organization.label'] as string),
      organization_unit_type_id: yup
        .string()
        .required()
        .label(messages['organization_unit_type.label'] as string),
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
      employee_size: yup
        .string()
        .trim()
        .required()
        .label(messages['organization_unit.employee_size'] as string),
    });
  }, [messages]);

  const {
    control,
    register,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        title_en: itemData?.title_en,
        title: itemData?.title,
        organization_id: itemData?.organization_id,
        organization_unit_type_id: itemData?.organization_unit_type_id,
        loc_division_id: itemData?.loc_division_id,
        loc_district_id: itemData?.loc_district_id,
        loc_upazila_id: itemData?.loc_upazila_id,
        email: itemData?.email,
        mobile: itemData?.mobile,
        fax_no: itemData?.fax_no,
        contact_person_name: itemData?.contact_person_name,
        contact_person_mobile: itemData?.contact_person_mobile,
        contact_person_email: itemData?.contact_person_email,
        contact_person_designation: itemData?.contact_person_designation,
        employee_size: itemData?.employee_size,
        services: getServiceIds(itemData?.services),
        row_status: String(itemData?.row_status),
      });
      setDistrictsFilter({
        division_id: itemData?.loc_division_id,
        row_status: RowStatus.ACTIVE,
      });
      setUpazilasFilter({
        district_id: itemData?.loc_district_id,
        row_status: RowStatus.ACTIVE,
      });
      setOrganizationUnitTypeFilters({
        organization_id: itemData?.organization_id,
        row_status: RowStatus.ACTIVE,
      });
    } else {
      if (authUser && authUser.isOrganizationUser) {
        setOrganizationUnitTypeFilters({
          organization_id: authUser?.organization?.id,
          row_status: RowStatus.ACTIVE,
        });
      }
      reset(initialValues);
    }
  }, [itemData]);

  const onOrganizationChange = useCallback(
    (organizationId: number | null) => {
      setOrganizationUnitTypeFilters({
        organization_id: organizationId,
        row_status: RowStatus.ACTIVE,
      });
    },
    [organizationFilters],
  );

  const onDivisionChange = useCallback(
    (divisionId: number | null) => {
      if (divisionId) {
        setDistrictsFilter({
          division_id: divisionId,
          row_status: RowStatus.ACTIVE,
        });
      } else {
      }
    },
    [districtsFilter],
  );

  const onDistrictChange = useCallback((districtId: number | null) => {
    setUpazilasFilter({
      district_id: itemData?.loc_district_id,
      row_status: RowStatus.ACTIVE,
    });
  }, []);

  const getServiceIds = (services: Array<Service>) => {
    return services.map((item: Service) => item.id);
  };

  const onSubmit: SubmitHandler<OrganizationUnit> = async (
    data: OrganizationUnit,
  ) => {
    if (authUser?.isOrganizationUser && authUser.organization?.id) {
      data.organization_id = authUser.organization.id;
    }

    const response = itemId
      ? await updateOrganizationUnit(itemId, data)
      : await createOrganizationUnit(data);
    let assignServicesResponse;
    if (itemId && isEdit) {
      assignServicesResponse = await assignServiceToOrganizationUnit(
        itemId,
        data.services,
      );
    } else {
      assignServicesResponse = await assignServiceToOrganizationUnit(
        response.data.id,
        data.services,
      );
    }

    if (isResponseSuccess(response) && assignServicesResponse && isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='organization_unit.label' />}}
        />,
      );
      mutateOrganizationUnit();
      props.onClose();
      refreshDataTable();
    } else if (
      isResponseSuccess(response) &&
      assignServicesResponse &&
      !isEdit
    ) {
      successStack(
        <IntlMessages
          id='common.subject_created_successfully'
          values={{subject: <IntlMessages id='organization_unit.label' />}}
        />,
      );
      props.onClose();
      refreshDataTable();
    } else if (isValidationError(response)) {
      setServerValidationErrors(response.errors, setError, validationSchema);
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
              values={{subject: <IntlMessages id='organization_unit.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='organization_unit.label' />}}
            />
          )}
        </>
      }
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <CustomTextInput
            id='title_en'
            label={messages['common.title_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='title'
            label={messages['common.title']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        {isNeedToSelectOrganization(authUser) && (
          <Grid item xs={6}>
            <CustomFormSelect
              id='organization_id'
              label={messages['organization.label']}
              isLoading={isLoadingOrganization}
              control={control}
              options={organizations}
              optionValueProp='id'
              optionTitleProp={['title_en', 'title']}
              errorInstance={errors}
              onChange={onOrganizationChange}
            />
          </Grid>
        )}
        <Grid item xs={6}>
          <CustomFormSelect
            id='organization_unit_type_id'
            label={messages['organization_unit_type.label']}
            isLoading={isLoadingOrganizationUnitTypes}
            control={control}
            options={organizationUnitTypes}
            optionValueProp='id'
            optionTitleProp={['title_en', 'title']}
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
            optionValueProp='id'
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
            onChange={onDivisionChange}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='loc_district_id'
            label={messages['districts.label']}
            isLoading={isLoadingDistricts}
            control={control}
            options={districts}
            optionValueProp='id'
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
            onChange={onDistrictChange}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='loc_upazila_id'
            label={messages['upazilas.label']}
            isLoading={isLoadingUpazilas}
            control={control}
            options={upazilas}
            optionValueProp='id'
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='email'
            label={messages['common.email']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='fax_no'
            label={messages['common.fax_no']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='mobile'
            label={messages['common.mobile']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='contact_person_name'
            label={messages['common.contact_person_name']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='contact_person_mobile'
            label={messages['common.contact_person_mobile']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='contact_person_email'
            label={messages['common.contact_person_email']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='contact_person_designation'
            label={messages['common.contact_person_designation']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='employee_size'
            label={messages['organization_unit.employee_size']}
            register={register}
            type='number'
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='services'
            label={messages['service.label']}
            isLoading={isLoadingServices}
            control={control}
            options={services}
            optionValueProp='id'
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
            multiple={true}
            defaultValue={initialValues.services}
          />
        </Grid>
        <Grid item xs={6}>
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
export default OrganizationUnitAddEditPopup;
