import * as yup from 'yup';
import {Grid} from '@material-ui/core';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import {
  MOBILE_NUMBER_REGEX,
  TEXT_REGEX_BANGLA,
} from '../../../@softbd/common/patternRegex';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {
  createOrganization,
  getAllOrganizations,
  getOrganization,
  updateOrganization,
} from '../../../services/organaizationManagement/OrganizationService';
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
  const [divisions, setDivisions] = useState<Array<Division>>([]);
  const [districts, setDistricts] = useState<Array<District>>([]);
  const [upazilas, setUpazilas] = useState<Array<Upazila>>([]);
  const [selectedOrganizationId, setSelectedOrganizationId] =
    useState<number>();
  const [selectedDivisionId, setSelectedDivisionId] = useState<number>();

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
        let item = await getOrganization(itemId);
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
          row_status: String(item.row_status),
        });
      } else {
        reset(initialValues);
      }
      setIsLoading(false);
    })();
  }, [itemId]);

  useEffect(() => {
    setIsLoading(true);
    loadOrganizations();
    loadDivisions();
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

  useMemo(async () => {
    if (selectedDivisionId) {
      console.log('load district', selectedDivisionId);
      let districts = await getAllDistricts({
        division_id: selectedDivisionId,
        row_status: RowStatus.ACTIVE,
      });
      console.log('districts', districts);
      if (districts) setDistricts(districts);
    }
  }, [selectedDivisionId]);

  const changeDivisionAction = (value: any) => {
    setSelectedDivisionId(value);
  };

  const loadDivisions = async () => {
    let divisions = await getAllDivisions({row_status: RowStatus.ACTIVE});
    if (divisions) setDivisions(divisions);
  };

  const onSubmit: SubmitHandler<Organization> = async (data: Organization) => {
    if (itemId) {
      let response = await updateOrganization(itemId, data);
      if (response) {
        successStack(
          <IntlMessages
            id='common.subject_updated_successfully'
            values={{subject: <IntlMessages id='organization.label' />}}
          />,
        );
        props.onClose();
        refreshDataTable();
      }
    } else {
      let response = await createOrganization(data);
      if (response) {
        successStack(
          <IntlMessages
            id='common.subject_created_successfully'
            values={{subject: <IntlMessages id='organization.label' />}}
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
              values={{subject: <IntlMessages id='organization.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='organization.label' />}}
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
            id='title_bn'
            label={messages['common.title_bn']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='organization_type_id'
            label={messages['organization.label']}
            isLoading={isLoading}
            control={control}
            options={organizations}
            optionValueProp='id'
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='organization_unit_type_id'
            label={messages['organization_unit_type.label']}
            isLoading={isLoading}
            control={control}
            options={organizations}
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
            onChange={changeDivisionAction}
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
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='loc_upazila_id'
            label={messages['upazilas.label']}
            isLoading={isLoading}
            control={control}
            options={districts}
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
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
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
