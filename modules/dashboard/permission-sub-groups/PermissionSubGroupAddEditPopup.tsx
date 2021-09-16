import yup from '../../../@softbd/libs/yup';
import {Grid} from '@material-ui/core';
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
  isResponseSuccess,
  isValidationError,
} from '../../../@softbd/utilities/helpers';
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
import {setServerValidationErrors} from '../../../@softbd/utilities/validationErrorHandler';

interface PermissionGroupAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  id: 0,
  title_en: '',
  title_bn: '',
  key: '',
  row_status: '1',
};

const PermissionSubGroupAddEditPopup: FC<PermissionGroupAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
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
      title_bn: yup
        .string()
        .trim()
        .label(messages['common.title_en'] as string),
      permission_group_id: yup
        .string()
        .required()
        .label(messages['permission_group.label'] as string),
      key: yup.string(),
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
  } = useForm<PermissionSubGroup>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        title_en: itemData?.title_en,
        title_bn: itemData?.title_bn,
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

  const onSubmit: SubmitHandler<PermissionSubGroup> = async (
    data: PermissionSubGroup,
  ) => {
    const response = itemId
      ? await updatePermissionSubGroup(itemId, data)
      : await createPermissionSubGroup(data);
    if (isResponseSuccess(response) && isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='permission_sub_group.label' />}}
        />,
      );
      mutatePermissionSubGroup();
      props.onClose();
      refreshDataTable();
    } else if (isResponseSuccess(response) && !isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_created_successfully'
          values={{subject: <IntlMessages id='permission_sub_group.label' />}}
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
            id='title_bn'
            label={messages['common.title_bn']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='permission_group_id'
            label={messages['permission_group.label']}
            isLoading={isLoadingPermissionGroups && isLoading}
            control={control}
            options={permissionGroups}
            optionValueProp='id'
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='key'
            label={messages['permission_group.key']}
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
export default PermissionSubGroupAddEditPopup;
