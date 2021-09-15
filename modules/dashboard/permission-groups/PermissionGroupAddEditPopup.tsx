import * as yup from 'yup';
import {Grid} from '@material-ui/core';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {TEXT_REGEX_BANGLA} from '../../../@softbd/common/patternRegex';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconRank from '../../../@softbd/icons/IconRank';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {isResponseSuccess} from '../../../@softbd/common/helpers';
import {useFetchPermissionGroup} from '../../../services/userManagement/hooks';
import {
  createPermissionGroup,
  updatePermissionGroup,
} from '../../../services/userManagement/PermissionGroupService';

interface PermissionGroupAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const validationSchema = yup.object().shape({
  title_en: yup.string().trim().required('Enter title (En)'),
  title_bn: yup
    .string()
    .trim()
    .required('Enter title (Bn)')
    .matches(TEXT_REGEX_BANGLA, 'Enter valid text'),
  key: yup.string(),
  row_status: yup.string(),
});

const initialValues = {
  id: 0,
  title_en: '',
  title_bn: '',
  key: '',
  row_status: '1',
};

const PermissionGroupAddEditPopup: FC<PermissionGroupAddEditPopupProps> = ({
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
    mutate: mutatePermissionGroup,
  } = useFetchPermissionGroup(itemId);

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<PermissionGroup>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        title_en: itemData?.title_en,
        title_bn: itemData?.title_bn,
        key: itemData?.key,
        row_status: String(itemData?.row_status),
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<PermissionGroup> = async (
    data: PermissionGroup,
  ) => {
    if (isEdit && itemId) {
      let response = await updatePermissionGroup(itemId, data);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_updated_successfully'
            values={{subject: <IntlMessages id='permission_group.label' />}}
          />,
        );
        mutatePermissionGroup();
        props.onClose();
        refreshDataTable();
      }
    } else {
      let response = await createPermissionGroup(data);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_created_successfully'
            values={{subject: <IntlMessages id='permission_group.label' />}}
          />,
        );
        props.onClose();
        refreshDataTable();
      }
    }
  };

  return (
    <HookFormMuiModal
      open={true}
      {...props}
      title={
        <>
          <IconRank />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='permission_group.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='permission_group.label' />}}
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
            id='title_en'
            label={messages['common.title_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextInput
            id='title_bn'
            label={messages['common.title_bn']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
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
export default PermissionGroupAddEditPopup;
