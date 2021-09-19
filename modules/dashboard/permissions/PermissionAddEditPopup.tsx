import yup from '../../../@softbd/libs/yup';
import {Grid} from '@material-ui/core';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {
  isResponseSuccess,
  isValidationError,
} from '../../../@softbd/utilities/helpers';
import {useFetchPermission} from '../../../services/userManagement/hooks';
import {
  createPermission,
  updatePermission,
} from '../../../services/userManagement/PermissionService';
import IconPermission from '../../../@softbd/icons/IconPermission';
import {setServerValidationErrors} from '../../../@softbd/utilities/validationErrorHandler';

interface PermissionGroupAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  id: 0,
  name: '',
  uri: '',
  method: '',
};

const PermissionAddEditPopup: FC<PermissionGroupAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const isEdit = itemId != null;

  const {
    data: itemData,
    isLoading,
    mutate: mutatePermission,
  } = useFetchPermission(itemId);
  const validationSchema = useMemo(() => {
    return yup.object().shape({
      name: yup
        .string()
        .trim()
        .required()
        .label(messages['common.name'] as string),
      uri: yup
        .string()
        .required()
        .label('URI')
        .label(messages['permission.uri'] as string),
      method: yup
        .string()
        .required()
        .label(messages['permission.method'] as string),
    });
  }, [messages]);
  const {
    register,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<Permission>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        name: itemData?.name,
        uri: itemData?.uri,
        method: itemData?.method,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<Permission> = async (data: Permission) => {
    const response = itemId
      ? await updatePermission(itemId, data)
      : await createPermission(data);

    if (isResponseSuccess(response) && isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='permission.label' />}}
        />,
      );
      mutatePermission();
      props.onClose();
      refreshDataTable();
    } else if (isResponseSuccess(response) && !isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_created_successfully'
          values={{subject: <IntlMessages id='permission.label' />}}
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
          <IconPermission />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='permission.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='permission.label' />}}
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
        <Grid item xs={12}>
          <CustomTextInput
            id='name'
            label={messages['common.name']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextInput
            id='uri'
            label={messages['permission.uri']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextInput
            id='method'
            label={messages['permission.method']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default PermissionAddEditPopup;
