import React, {FC, useEffect, useMemo, useState} from 'react';
import yup from '../../../@softbd/libs/yup';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
/*import {useFetchOrganizations} from '../../../services/organaizationManagement/hooks';*/
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  isResponseSuccess,
  isValidationError,
} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {Grid} from '@mui/material';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import {
  useFetchPermissionSubGroups,
  useFetchRole,
} from '../../../services/userManagement/hooks';
import {
  createRole,
  updateRole,
} from '../../../services/userManagement/RoleService';
/*import {useFetchInstitutes} from '../../../services/instituteManagement/hooks';*/
import {setServerValidationErrors} from '../../../@softbd/utilities/validationErrorHandler';
import IconRole from '../../../@softbd/icons/IconRole';
import {useAuthUser} from '../../../@crema/utility/AppHooks';

interface RoleAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title_en: '',
  title: '',
  key: '',
  permission_sub_group_id: '',
  /*organization_id: '',
  institute_id: '',*/
  row_status: '1',
};

const RoleAddEditPopup: FC<RoleAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const isEdit = itemId != null;
  const authUser = useAuthUser();

  const {data: itemData, isLoading, mutate: mutateRole} = useFetchRole(itemId);

  const [permissionSubGroupFilters] = useState({row_status: RowStatus.ACTIVE});

  const {data: permissionSubGroups, isLoading: isLoadingPermissionSubGroups} =
    useFetchPermissionSubGroups(permissionSubGroupFilters);

  /*const [instituteFilters] = useState({row_status: RowStatus.ACTIVE});

  const {data: institutes, isLoading: isLoadingInstitute} =
    useFetchInstitutes(instituteFilters);

  const [organizationFilters] = useState({row_status: RowStatus.ACTIVE});

  const {data: organizations, isLoading: isLoadingOrganizations} =
    useFetchOrganizations(organizationFilters);*/

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title_en: yup
        .string()
        .title('en')
        .label(messages['common.title_en'] as string),
      title: yup
        .string()
        .title()
        .label(messages['common.title'] as string),
      key: yup
        .string()
        .trim()
        .required()
        .label(messages['common.key'] as string),
      permission_sub_group_id: authUser?.isSystemUser
        ? yup
            .string()
            .required()
            .label(messages['permission_sub_group.label'] as string)
        : yup.string().label(messages['permission_sub_group.label'] as string),
      /*institute_id: yup.string().nullable(),
      organization_id: yup.string().nullable(),*/
      row_status: yup.string(),
    });
  }, [messages]);
  const {
    control,
    register,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<Role>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        title_en: itemData?.title_en,
        title: itemData?.title,
        key: itemData?.key,
        permission_sub_group_id: itemData?.permission_sub_group_id,
        organization_id: itemData?.organization_id,
        institute_id: itemData?.institute_id,
        row_status: String(itemData?.row_status),
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<Role> = async (data: Role) => {
    if (authUser?.isInstituteUser) {
      data.institute_id = authUser?.institute_id;
      data.permission_sub_group_id = authUser?.role?.permission_sub_group_id;
    }

    if (authUser?.isOrganizationUser) {
      data.organization_id = authUser?.organization_id;
      data.permission_sub_group_id = authUser?.role?.permission_sub_group_id;
    }

    const response = itemId
      ? await updateRole(itemId, data)
      : await createRole(data);
    if (isResponseSuccess(response) && isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='role.label' />}}
        />,
      );
      mutateRole();
      props.onClose();
      refreshDataTable();
    } else if (isResponseSuccess(response) && !isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_created_successfully'
          values={{subject: <IntlMessages id='role.label' />}}
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
      open={true}
      {...props}
      title={
        <>
          <IconRole />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='role.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='role.label' />}}
            />
          )}
        </>
      }
      maxWidth={'sm'}
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
        <Grid item xs={6}>
          <CustomTextInput
            id='key'
            label={messages['role.unique_value']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        {authUser?.isSystemUser && (
          <Grid item xs={6}>
            <CustomFormSelect
              id='permission_sub_group_id'
              label={messages['permission_sub_group.label']}
              isLoading={isLoadingPermissionSubGroups}
              control={control}
              options={permissionSubGroups}
              optionValueProp={'id'}
              optionTitleProp={['title_en', 'title']}
              errorInstance={errors}
            />
          </Grid>
        )}
        {/*<Grid item xs={6}>
          <CustomFormSelect
            id='organization_id'
            label={messages['organization.label']}
            isLoading={isLoadingOrganizations}
            control={control}
            options={organizations}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='institute_id'
            label={messages['institute.label']}
            isLoading={isLoadingInstitute}
            control={control}
            options={institutes}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
          />
        </Grid>*/}
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

export default RoleAddEditPopup;
