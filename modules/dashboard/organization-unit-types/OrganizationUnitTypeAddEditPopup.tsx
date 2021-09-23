import yup from '../../../@softbd/libs/yup';
import {Grid} from '@material-ui/core';
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
  createOrganizationUnitType,
  updateOrganizationUnitType,
} from '../../../services/organaizationManagement/OrganizationUnitTypeService';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconOrganizationUnitType from '../../../@softbd/icons/IconOrganizationUnitType';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {
  isResponseSuccess,
  isValidationError,
} from '../../../@softbd/utilities/helpers';
import {
  useFetchOrganizations,
  useFetchOrganizationUnitType,
} from '../../../services/organaizationManagement/hooks';
import {setServerValidationErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {useAuthUser} from '../../../@crema/utility/AppHooks';

interface OrganizationUnitTypeAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title_en: '',
  title_bn: '',
  organization_id: '',
  row_status: '1',
};

const OrganizationUnitTypeAddEditPopup: FC<OrganizationUnitTypeAddEditPopupProps> =
  ({itemId, refreshDataTable, ...props}) => {
    const authUser = useAuthUser();
    const {messages} = useIntl();
    const {successStack} = useNotiStack();
    const isEdit = itemId != null;
    const [organizationFilters] = useState({row_status: RowStatus.ACTIVE});
    const {
      data: itemData,
      isLoading,
      mutate: mutateOrganizationUnitType,
    } = useFetchOrganizationUnitType(itemId);
    const {data: organizations, isLoading: isOrganizationLoading} =
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
        organization_id:
          authUser && authUser.isSystemUser
            ? yup
                .string()
                .trim()
                .required()
                .label(messages['organization.label'] as string)
            : yup.string().label(messages['organization.label'] as string),
      });
    }, []);

    const {
      control,
      register,
      reset,
      setError,
      handleSubmit,
      formState: {errors, isSubmitting},
    } = useForm({
      resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
      if (itemData) {
        reset({
          title_en: itemData?.title_en,
          title_bn: itemData?.title_bn,
          organization_id: itemData?.organization_id,
          row_status: String(itemData?.row_status),
        });
      } else {
        reset(initialValues);
      }
    }, [itemData]);

    const onSubmit: SubmitHandler<OrganizationUnitType> = async (
      data: OrganizationUnitType,
    ) => {
      if (authUser?.isOrganizationUser && authUser.organization?.id) {
        data.organization_id = authUser.organization.id;
      }

      const response = itemId
        ? await updateOrganizationUnitType(itemId, data)
        : await createOrganizationUnitType(data);
      if (isResponseSuccess(response) && isEdit) {
        successStack(
          <IntlMessages
            id='common.subject_updated_successfully'
            values={{
              subject: <IntlMessages id='organization_unit_type.label' />,
            }}
          />,
        );
        mutateOrganizationUnitType();
        props.onClose();
        refreshDataTable();
      } else if (isResponseSuccess(response) && !isEdit) {
        successStack(
          <IntlMessages
            id='common.subject_created_successfully'
            values={{
              subject: <IntlMessages id='organization_unit_type.label' />,
            }}
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
            <IconOrganizationUnitType />
            {isEdit ? (
              <IntlMessages
                id='common.edit'
                values={{
                  subject: <IntlMessages id='organization_unit_type.label' />,
                }}
              />
            ) : (
              <IntlMessages
                id='common.add_new'
                values={{
                  subject: <IntlMessages id='organization_unit_type.label' />,
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
          {!authUser?.isOrganizationUser && (
            <Grid item xs={12}>
              <CustomFormSelect
                id='organization_id'
                label={messages['organization.label']}
                isLoading={isOrganizationLoading}
                control={control}
                options={organizations}
                optionValueProp='id'
                optionTitleProp={['title_en', 'title_bn']}
                errorInstance={errors}
              />
            </Grid>
          )}

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
export default OrganizationUnitTypeAddEditPopup;
