import yup from '../../../@softbd/libs/yup';
import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {
  createOrganizationType,
  updateOrganizationType,
} from '../../../services/organaizationManagement/OrganizationTypeService';
import {useIntl} from 'react-intl';
import CustomCheckbox from '../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconOrganizationType from '../../../@softbd/icons/IconOrganizationType';
import {useFetchOrganizationType} from '../../../services/organaizationManagement/hooks';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {IOrganizationType} from '../../../shared/Interface/organizationType.interface';
import {isBreakPointUp} from '../../../@crema/utility/Utils';

interface OrganizationTypeAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title_en: '',
  title: '',
  is_government: 0,
  row_status: '1',
};

const OrganizationTypeAddEditPopup: FC<OrganizationTypeAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const isEdit = itemId != null;
  const {
    data: itemData,
    isLoading,
    mutate: mutateOrganizationType,
  } = useFetchOrganizationType(itemId);
  const [checkedIsGovernment, setCheckedIsGovernment] = useState<number>(0);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title_en: yup.string(),
      title: yup
        .string()
        .title()
        .label(messages['common.title'] as string),
    });
  }, [messages]);
  const {
    control,
    register,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<IOrganizationType>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        title_en: itemData?.title_en,
        title: itemData?.title,
        row_status: String(itemData?.row_status),
      });
      setCheckedIsGovernment(itemData?.is_government);
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<IOrganizationType> = async (
    data: IOrganizationType,
  ) => {
    data.is_government = data.is_government ? 1 : 0;

    try {
      if (itemId) {
        await updateOrganizationType(itemId, data);
        updateSuccessMessage('organization_type.label');
        mutateOrganizationType();
      } else {
        await createOrganizationType(data);
        createSuccessMessage('organization_type.label');
      }
      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <HookFormMuiModal
      {...props}
      open={true}
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      title={
        <>
          <IconOrganizationType />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='organization_type.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='organization_type.label' />}}
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
        <Grid item xs={12}>
          <CustomTextInput
            required
            id='title'
            label={messages['common.title']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
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
          <CustomCheckbox
            id='is_government'
            label={messages['organization_type.is_government']}
            register={register}
            errorInstance={errors}
            checked={!!checkedIsGovernment}
            onChange={() => {
              setCheckedIsGovernment((prevState) => {
                if (prevState == 0) {
                  return 1;
                } else {
                  return 0;
                }
              });
            }}
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
export default OrganizationTypeAddEditPopup;
