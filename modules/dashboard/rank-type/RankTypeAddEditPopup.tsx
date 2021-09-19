import {Grid} from '@material-ui/core';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {
  createRankType,
  updateRankType,
} from '../../../services/organaizationManagement/RankTypeService';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {useIntl} from 'react-intl';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconRankType from '../../../@softbd/icons/IconRankType';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {
  useFetchOrganizations,
  useFetchRankType,
} from '../../../services/organaizationManagement/hooks';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {
  isResponseSuccess,
  isValidationError,
} from '../../../@softbd/utilities/helpers';
import {setServerValidationErrors} from '../../../@softbd/utilities/validationErrorHandler';
import yup from '../../../@softbd/libs/yup';
import {useAuthUser} from '../../../@crema/utility/AppHooks';

interface RankTypeAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  id: 0,
  title_en: '',
  title_bn: '',
  organization_id: 0,
  description: '',
  row_status: '1',
};

const RankTypeAddEditPopup: FC<RankTypeAddEditPopupProps> = ({
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
    mutate: mutateRankType,
  } = useFetchRankType(itemId);
  const [organizationFilters] = useState({row_status: RowStatus.ACTIVE});
  const {data: organizations, isLoading: isLoadingOrganizations} =
    useFetchOrganizations(organizationFilters);

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
      organization_id: yup.string(),
      description: yup.string(),
      row_status: yup.string(),
    });
  }, [messages]);

  const {
    control,
    register,
    reset,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<RankType>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        title_en: itemData?.title_en,
        title_bn: itemData?.title_bn,
        organization_id: itemData?.organization_id,
        description: itemData?.description,
        row_status: String(itemData?.row_status),
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<RankType> = async (data: RankType) => {
    if (authUser?.isOrganizationUser && authUser.organization?.id) {
      data.organization_id = authUser.organization.id;
    }
    const response = itemId
      ? await updateRankType(itemId, data)
      : await createRankType(data);
    if (isResponseSuccess(response) && isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='rank_types.label' />}}
        />,
      );
      mutateRankType();
      props.onClose();
      refreshDataTable();
    } else if (isResponseSuccess(response) && !isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_created_successfully'
          values={{subject: <IntlMessages id='rank_types.label' />}}
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
          <IconRankType />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='rank_types.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='rank_types.label' />}}
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
        {!authUser?.isOrganizationUser && (
          <Grid item xs={6}>
            <CustomFormSelect
              id='organization_id'
              label={messages['organization.label']}
              isLoading={isLoadingOrganizations}
              control={control}
              options={organizations}
              optionValueProp={'id'}
              optionTitleProp={['title_en', 'title_bn']}
              errorInstance={errors}
            />
          </Grid>
        )}

        <Grid item xs={6}>
          <CustomTextInput
            id='description'
            label={messages['common.description']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={3}
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

export default RankTypeAddEditPopup;
