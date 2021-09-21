import yup from '../../../@softbd/libs/yup';
import {Grid} from '@material-ui/core';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {
  DOMAIN_REGEX,
  MOBILE_NUMBER_REGEX,
} from '../../../@softbd/common/patternRegex';
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
import {
  isResponseSuccess,
  isValidationError,
} from '../../../@softbd/utilities/helpers';
import {setServerValidationErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {
  useFetchOrganization,
  useFetchOrganizationTypes,
} from '../../../services/organaizationManagement/hooks';
import {
  useFetchPermissionGroups,
  useFetchPermissionSubGroups,
} from '../../../services/userManagement/hooks';
import {PERMISSION_GROUP_ORGANIZATION_KEY} from '../../../@softbd/common/constants';

interface OrganizationAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title_en: '',
  title_bn: '',
  domain: '',
  email: '',
  mobile: '',
  fax_no: '',
  contact_person_name: '',
  contact_person_mobile: '',
  contact_person_email: '',
  contact_person_designation: '',
  organization_type_id: '',
  permission_sub_group_id: '',
  address: '',
  description: '',
  row_status: '1',
};

const OrganizationAddEditPopup: FC<OrganizationAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const isEdit = itemId != null;
  const [organizationTypeFilters] = useState({
    row_status: RowStatus.ACTIVE,
  });
  const [permissionGroupFilters] = useState({
    row_status: RowStatus.ACTIVE,
    key: PERMISSION_GROUP_ORGANIZATION_KEY,
  });

  const [permissionSubGroupFilters, setPermissionSubGroupFilters] =
    useState<any>({
      row_status: RowStatus.ACTIVE,
    });
  const {
    data: itemData,
    isLoading,
    mutate: mutateOrganization,
  } = useFetchOrganization(itemId);
  const {data: organizationTypes, isLoading: isOrganizationTypeLoading} =
    useFetchOrganizationTypes(organizationTypeFilters);

  const {data: permissionGroups} = useFetchPermissionGroups(
    permissionGroupFilters,
  );
  const {data: permissionSubGroups, isLoading: isLoadingPermissionSubGroups} =
    useFetchPermissionSubGroups(permissionSubGroupFilters);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title_en: yup
        .string()
        .title('en')
        .label(messages['common.title_en'] as string),
      title_bn: yup
        .string()
        .title('bn')
        .label(messages['common.title_bn'] as string),
      domain: yup
        .string()
        .trim()
        .required()
        .matches(DOMAIN_REGEX)
        .label(messages['common.domain'] as string),
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
      organization_type_id: yup
        .string()
        .required()
        .label(messages['common.organization_type'] as string),
      permission_sub_group_id: yup
        .string()
        .required()
        .label(messages['permission_sub_group.label'] as string),
      address: yup
        .string()
        .trim()
        .required()
        .label(messages['common.address'] as string),
      row_status: yup
        .string()
        .trim()
        .required()
        .label(messages['common.row_status'] as string),
    });
  }, [messages]);

  const {
    control,
    register,
    reset,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm({
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
    if (itemData) {
      reset({
        title_en: itemData?.title_en,
        title_bn: itemData?.title_bn,
        domain: itemData?.domain,
        email: itemData?.email,
        mobile: itemData?.mobile,
        fax_no: itemData?.fax_no,
        contact_person_name: itemData?.contact_person_name,
        contact_person_mobile: itemData?.contact_person_mobile,
        contact_person_email: itemData?.contact_person_email,
        contact_person_designation: itemData?.contact_person_designation,
        organization_type_id: itemData?.organization_type_id,
        address: itemData?.address,
        description: itemData?.description,
        row_status: String(itemData?.row_status),
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<Organization> = async (data: Organization) => {
    const response = itemId
      ? await updateOrganization(itemId, data)
      : await createOrganization(data);

    if (isResponseSuccess(response) && isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='organization.label' />}}
        />,
      );
      mutateOrganization();
      props.onClose();
      refreshDataTable();
    } else if (isResponseSuccess(response) && !isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_created_successfully'
          values={{subject: <IntlMessages id='organization.label' />}}
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
            id='permission_sub_group_id'
            label={messages['permission_sub_group.label']}
            isLoading={isLoadingPermissionSubGroups}
            control={control}
            options={permissionSubGroups}
            optionValueProp='id'
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='organization_type_id'
            label={messages['common.organization_type']}
            isLoading={isOrganizationTypeLoading}
            control={control}
            options={organizationTypes}
            optionValueProp='id'
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='domain'
            label={messages['common.domain']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
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
            id='description'
            label={messages['common.description']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={4}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='address'
            label={messages['common.address']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={4}
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
export default OrganizationAddEditPopup;
