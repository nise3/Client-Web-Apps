import yup from '../../../@softbd/libs/yup';
import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {
  useFetchPermissionGroups,
  useFetchPermissionSubGroup,
} from '../../../services/userManagement/hooks';
import {
  createPermissionSubGroup,
  updatePermissionSubGroup,
} from '../../../services/userManagement/PermissionSubGroupService';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import IconPermissionSubGroup from '../../../@softbd/icons/IconPermissionSubGroup';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {IPermissionSubGroup} from '../../../shared/Interface/userManagement.interface';
import {isBreakPointUp} from '../../../@crema/utility/Utils';

interface PermissionGroupAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title_en: '',
  title: '',
  key: '',
  row_status: '1',
};

const PermissionSubGroupAddEditPopup: FC<PermissionGroupAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const isEdit = itemId != null;
  const [permissionGroupsFilter, setPermissionGroupsFilter] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });

  const {
    data: itemData,
    isLoading,
    mutate: mutatePermissionSubGroup,
  } = useFetchPermissionSubGroup(itemId);

  const {data: permissionGroups, isLoading: isLoadingPermissionGroups} =
    useFetchPermissionGroups(permissionGroupsFilter);

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
      permission_group_id: yup
        .string()
        .required()
        .label(messages['permission_group.label'] as string),
      key: yup
        .string()
        .required()
        .label(messages['permission.key'] as string),
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
  } = useForm<IPermissionSubGroup>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        title_en: itemData?.title_en,
        title: itemData?.title,
        key: itemData?.key,
        permission_group_id: itemData?.permission_group_id,
        row_status: String(itemData?.row_status),
      });
      setPermissionGroupsFilter({
        row_status: RowStatus.ACTIVE,
        permission_group_id: itemData?.permission_group_id,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<IPermissionSubGroup> = async (
    data: IPermissionSubGroup,
  ) => {
    try {
      if (itemId) {
        await updatePermissionSubGroup(itemId, data);
        updateSuccessMessage('permission_sub_group.label');
        mutatePermissionSubGroup();
      } else {
        await createPermissionSubGroup(data);
        createSuccessMessage('permission_sub_group.label');
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
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      title={
        <>
          <IconPermissionSubGroup />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{
                subject: <IntlMessages id='permission_sub_group.label' />,
              }}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{
                subject: <IntlMessages id='permission_sub_group.label' />,
              }}
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
            required
            id='title_en'
            label={messages['common.title_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomFormSelect
            required
            id='permission_group_id'
            label={messages['permission_group.label']}
            isLoading={isLoadingPermissionGroups && isLoading}
            control={control}
            options={permissionGroups}
            optionValueProp='id'
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='key'
            label={messages['permission_group.key']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
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
export default PermissionSubGroupAddEditPopup;
