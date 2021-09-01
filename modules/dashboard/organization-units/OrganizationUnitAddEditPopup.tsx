import * as yup from 'yup';
import {Grid} from '@material-ui/core';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  MOBILE_NUMBER_REGEX,
  TEXT_REGEX_BANGLA,
} from '../../../@softbd/common/patternRegex';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {getAllOrganizations} from '../../../services/organaizationManagement/OrganizationService';
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
import {getAllDivisions} from '../../../services/locationManagement/DivisionService';
import {getAllDistricts} from '../../../services/locationManagement/DistrictService';
import {getAllOrganizationUnitTypes} from '../../../services/organaizationManagement/OrganizationUnitTypeService';
import {getAllUpazilas} from '../../../services/locationManagement/UpazilaService';
import {
  assignServiceToOrganizationUnit,
  createOrganizationUnit,
  getOrganizationUnit,
  updateOrganizationUnit,
} from '../../../services/organaizationManagement/OrganizationUnitService';
import {getAllServices} from '../../../services/organaizationManagement/OrganizationServiceService';

interface OrganizationAddEditPopupProps {
  itemId: number | null;
  open: boolean;
  onClose: () => void;
  refreshDataTable: () => void;
}

const validationSchema = yup.object().shape({
  title_en: yup.string().trim().required().label('Title(En)'),
  title_bn: yup
    .string()
    .trim()
    .required()
    .label('Title(Bn)')
    .matches(TEXT_REGEX_BANGLA, 'Enter valid text'),
  organization_id: yup.string().required().label('Organization'),
  organization_unit_type_id: yup
    .string()
    .required()
    .label('Organization Unit Type'),
  email: yup
    .string()
    .email('Enter valid email')
    .trim()
    .required()
    .label('Email'),
  mobile: yup
    .string()
    .trim()
    .required()
    .label('Mobile Number')
    .matches(MOBILE_NUMBER_REGEX, 'Enter valid mobile number'),
  contact_person_name: yup
    .string()
    .trim()
    .required()
    .label('Contact person name'),
  contact_person_mobile: yup
    .string()
    .trim()
    .required()
    .label('Contact person mobile')
    .matches(MOBILE_NUMBER_REGEX, 'Enter valid mobile number'),
  contact_person_email: yup
    .string()
    .email()
    .trim()
    .required()
    .label('Contact person email'),
  contact_person_designation: yup
    .string()
    .trim()
    .required()
    .label('Contact person designation'),
  employee_size: yup.string().trim().required().label('Employee Size'),
});

const initialValues = {
  title_en: '',
  title_bn: '',
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
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const isEdit = itemId != null;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [organizations, setOrganizations] = useState<Array<OrganizationType>>(
    [],
  );
  const [services, setServices] = useState<Array<Service>>([]);
  const [divisions, setDivisions] = useState<Array<Division>>([]);
  const [districts, setDistricts] = useState<Array<District>>([]);
  const [upazilas, setUpazilas] = useState<Array<Upazila>>([]);
  const [organizationUnitTypes, setOrganizationUnitTypes] = useState<
    Array<OrganizationUnitType>
  >([]);
  const [selectedOrganizationId, setSelectedOrganizationId] =
    useState<number>();
  const [selectedDivisionId, setSelectedDivisionId] = useState<number>();
  const [selectedDistrictId, setSelectedDistrictId] = useState<number>();

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (itemId) {
        let item = await getOrganizationUnit(itemId);

        reset({
          title_en: item.title_en,
          title_bn: item.title_bn,
          organization_id: item.organization_id,
          organization_unit_type_id: item.organization_unit_type_id,
          loc_division_id: item.loc_division_id,
          loc_district_id: item.loc_district_id,
          loc_upazila_id: item.loc_upazila_id,
          email: item.email,
          mobile: item.mobile,
          fax_no: item.fax_no,
          contact_person_name: item.contact_person_name,
          contact_person_mobile: item.contact_person_mobile,
          contact_person_email: item.contact_person_email,
          contact_person_designation: item.contact_person_designation,
          employee_size: item.employee_size,
          services: getServiceIds(item.services),
          row_status: String(item.row_status),
        });
        setSelectedOrganizationId(item.organization_id);
        setSelectedDivisionId(item.loc_division_id);
        setSelectedDistrictId(item.loc_district_id);
      } else {
        reset(initialValues);
      }
      setIsLoading(false);
    })();
  }, [itemId]);

  const getServiceIds = (services: Array<Service>) => {
    let ids = services.map((item: Service) => item.id);
    return ids;
  };

  useEffect(() => {
    setIsLoading(true);
    loadOrganizations();
    loadDivisions();
    loadServices();
    setIsLoading(false);
  }, []);

  const loadOrganizations = async () => {
    let organizations = await getAllOrganizations({
      row_status: RowStatus.ACTIVE,
    });
    if (organizations) {
      setOrganizations(organizations);
    }
  };

  const loadDivisions = async () => {
    let divisions = await getAllDivisions({row_status: RowStatus.ACTIVE});
    if (divisions) setDivisions(divisions);
  };

  const loadServices = async () => {
    let services = await getAllServices({row_status: RowStatus.ACTIVE});
    if (services) setServices(services);
  };

  useEffect(() => {
    (async () => {
      if (selectedDivisionId) {
        let districts = await getAllDistricts({
          division_id: selectedDivisionId,
          row_status: RowStatus.ACTIVE,
        });
        if (districts) setDistricts(districts);
      }
    })();
  }, [selectedDivisionId]);

  useEffect(() => {
    (async () => {
      if (selectedDistrictId) {
        let upazilas = await getAllUpazilas({
          district_id: selectedDistrictId,
          row_status: RowStatus.ACTIVE,
        });
        if (upazilas) setUpazilas(upazilas);
      }
    })();
  }, [selectedDistrictId]);

  useEffect(() => {
    (async () => {
      if (selectedOrganizationId) {
        let unitTypes = await getAllOrganizationUnitTypes({
          organization_id: selectedOrganizationId,
          row_status: RowStatus.ACTIVE,
        });
        if (unitTypes) setOrganizationUnitTypes(unitTypes);
      }
    })();
  }, [selectedOrganizationId]);

  const onSubmit: SubmitHandler<OrganizationUnit> = async (
    data: OrganizationUnit,
  ) => {
    if (itemId) {
      let response = await updateOrganizationUnit(itemId, data);
      let assignServicesResponse = await assignServiceToOrganizationUnit(
        itemId,
        data.services,
      );
      if (response && assignServicesResponse) {
        successStack(
          <IntlMessages
            id='common.subject_updated_successfully'
            values={{subject: <IntlMessages id='organization_unit.label' />}}
          />,
        );
        props.onClose();
        refreshDataTable();
      }
    } else {
      let response = await createOrganizationUnit(data);
      let assignServicesResponse = await assignServiceToOrganizationUnit(
        response.data.id,
        data.services,
      );
      if (response && assignServicesResponse) {
        successStack(
          <IntlMessages
            id='common.subject_created_successfully'
            values={{subject: <IntlMessages id='organization_unit.label' />}}
          />,
        );
        props.onClose();
        refreshDataTable();
      }
    }
  };

  return (
    <HookFormMuiModal
      {...props}
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
            defaultValue={''}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='title_bn'
            label={messages['common.title_bn']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='organization_id'
            label={messages['organization.label']}
            isLoading={isLoading}
            control={control}
            options={organizations}
            optionValueProp='id'
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
            onChange={useCallback((value) => {
              setSelectedOrganizationId(value);
            }, [])}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='organization_unit_type_id'
            label={messages['organization_unit_type.label']}
            isLoading={isLoading}
            control={control}
            options={organizationUnitTypes}
            optionValueProp='id'
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='loc_division_id'
            label={messages['divisions.label']}
            isLoading={isLoading}
            control={control}
            options={divisions}
            optionValueProp='id'
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
            onChange={useCallback((value) => {
              setSelectedDivisionId(value);
            }, [])}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='loc_district_id'
            label={messages['districts.label']}
            isLoading={isLoading}
            control={control}
            options={districts}
            optionValueProp='id'
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
            onChange={useCallback((value) => {
              setSelectedDistrictId(value);
            }, [])}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='loc_upazila_id'
            label={messages['upazilas.label']}
            isLoading={isLoading}
            control={control}
            options={upazilas}
            optionValueProp='id'
            optionTitleProp={['title_en', 'title_bn']}
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
            isLoading={isLoading}
            control={control}
            options={services}
            optionValueProp='id'
            optionTitleProp={['title_en', 'title_bn']}
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
