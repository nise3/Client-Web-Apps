import React, {FC, useEffect, useMemo, useState} from 'react';
import yup from '../../../@softbd/libs/yup';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
/*import {useFetchOrganizations} from '../../../services/organaizationManagement/hooks';*/
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {Grid} from '@mui/material';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import {
  useFetchLocalizedPermissionGroups,
  useFetchLocalizedPermissionSubGroups,
  useFetchRole,
} from '../../../services/userManagement/hooks';
import {
  createRole,
  updateRole,
} from '../../../services/userManagement/RoleService';
/*import {useFetchInstitutes} from '../../../services/instituteManagement/hooks';*/
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import IconRole from '../../../@softbd/icons/IconRole';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {IRole} from '../../../shared/Interface/userManagement.interface';
import {isBreakPointUp} from '../../../@crema/utility/Utils';

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
  permission_group_id: '',
  description: '',
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
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const isEdit = itemId != null;
  const authUser = useAuthUser();

  const {data: itemData, isLoading, mutate: mutateRole} = useFetchRole(itemId);

  const [permissionSubGroupFilters, setPermissionSubGroupFilters] =
    useState<any>({
      row_status: RowStatus.ACTIVE,
    });
  const [permissionGroupFilters] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });

  const {data: permissionSubGroups, isLoading: isLoadingPermissionSubGroups} =
    useFetchLocalizedPermissionSubGroups(permissionSubGroupFilters);

  const {data: permissionGroups, isLoading: isLoadingPermissionGroups} =
    useFetchLocalizedPermissionGroups(permissionGroupFilters);

  const changePermissionGroupAction = (value: number) => {
    setPermissionSubGroupFilters({
      permission_group_id: value,
      row_status: RowStatus.ACTIVE,
    });
  };

  /*const [instituteFilters] = useState({row_status: RowStatus.ACTIVE});

  const {data: institutes, isLoading: isLoadingInstitute} =
    useFetchInstitutes(instituteFilters);

  const [organizationFilters] = useState({row_status: RowStatus.ACTIVE});

  const {data: organizations, isLoading: isLoadingOrganizations} =
    useFetchOrganizations(organizationFilters);*/

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

      key: yup
        .string()
        .trim()
        .required()
        .label(messages['common.key'] as string),
    });
  }, [messages]);
  const {
    control,
    register,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<IRole>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        title_en: itemData?.title_en,
        title: itemData?.title,
        key: itemData?.key,
        description: itemData?.description,
        permission_sub_group_id: itemData?.permission_sub_group_id,
        permission_group_id: itemData?.permission_group_id,
        organization_id: itemData?.organization_id,
        institute_id: itemData?.institute_id,
        row_status: String(itemData?.row_status),
      });
      setPermissionSubGroupFilters({
        permission_group_id: itemData?.permission_group_id,
        row_status: RowStatus.ACTIVE,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<IRole> = async (data: IRole) => {
    if (authUser?.isInstituteUser) {
      data.institute_id = authUser?.institute_id;
      data.permission_sub_group_id = authUser?.role?.permission_sub_group_id;
    }

    if (authUser?.isOrganizationUser) {
      data.organization_id = authUser?.organization_id;
      data.permission_sub_group_id = authUser?.role?.permission_sub_group_id;
    }
    try {
      if (itemId) {
        await updateRole(itemId, data);
        updateSuccessMessage('role.label');
      } else {
        await createRole(data);
        createSuccessMessage('role.label');
      }
      props.onClose();
      refreshDataTable();
      mutateRole();
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
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
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
            required
            id='title'
            label={messages['common.title']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            required
            id='title_en'
            label={messages['common.title_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            required
            id='key'
            label={messages['common.key']}
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
          />
        </Grid>

        {authUser?.isSystemUser && (
          <>
            <Grid item xs={6}>
              <CustomFormSelect
                id='permission_group_id'
                label={messages['permission_group.label']}
                isLoading={isLoadingPermissionGroups}
                control={control}
                options={permissionGroups}
                onChange={changePermissionGroupAction}
                optionValueProp={'id'}
                optionTitleProp={['title']}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomFormSelect
                id='permission_sub_group_id'
                label={messages['permission_sub_group.label']}
                isLoading={isLoadingPermissionSubGroups}
                control={control}
                options={permissionSubGroups}
                optionValueProp={'id'}
                optionTitleProp={['title']}
                errorInstance={errors}
              />
            </Grid>
          </>
        )}
        {/*<Grid item xs={6}>
          <CustomFormSelect
            id='organization_id'
            label={messages['organization.label']}
            isLoading={isLoadingOrganizations}
            control={control}
            options={organizations}
            optionValueProp={'id'}
            optionTitleProp={[ 'title']}
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
            optionTitleProp={[ 'title']}
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
