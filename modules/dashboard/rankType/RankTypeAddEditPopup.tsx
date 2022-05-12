import {Grid} from '@mui/material';
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
import {useFetchRankType} from '../../../services/organaizationManagement/hooks';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {isNeedToSelectOrganization} from '../../../@softbd/utilities/helpers';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import yup from '../../../@softbd/libs/yup';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {IRankType} from '../../../shared/Interface/rankType.interface';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {getAllOrganizations} from '../../../services/organaizationManagement/OrganizationService';
import {isBreakPointUp} from '../../../@crema/utility/Utils';

interface RankTypeAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title_en: '',
  title: '',
  organization_id: '',
  description: '',
  description_en: '',
  row_status: '1',
};

const RankTypeAddEditPopup: FC<RankTypeAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const authUser = useAuthUser<CommonAuthUser>();
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const isEdit = itemId != null;
  const {
    data: itemData,
    isLoading,
    mutate: mutateRankType,
  } = useFetchRankType(itemId);
  const [organizations, setOrganizations] = useState<Array<any>>([]);
  const [isLoadingOrganizations, setIsLoadingOrganizations] =
    useState<boolean>(false);

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

      organization_id:
        authUser && authUser.isSystemUser
          ? yup
              .string()
              .trim()
              .required()
              .label(messages['organization.label'] as string)
          : yup.string().label(messages['organization.label'] as string),
      description: yup
        .string()
        .trim()
        .max(300)
        .label(messages['common.description'] as string),
      description_en: yup
        .string()
        .trim()
        .max(300)
        .label(messages['common.description_en'] as string),
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
  } = useForm<IRankType>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (authUser?.isSystemUser) {
      setIsLoadingOrganizations(true);
      (async () => {
        try {
          let response = await getAllOrganizations({
            row_status: RowStatus.ACTIVE,
          });
          setIsLoadingOrganizations(false);
          if (response && response?.data) {
            setOrganizations(response.data);
          }
        } catch (e) {}
      })();
    }
  }, []);

  useEffect(() => {
    if (itemData) {
      reset({
        title_en: itemData?.title_en,
        title: itemData?.title,
        organization_id: itemData?.organization_id,
        description: itemData?.description,
        description_en: itemData?.description_en,
        row_status: String(itemData?.row_status),
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<IRankType> = async (data: IRankType) => {
    if (!authUser?.isSystemUser) {
      delete data.organization_id;
    }
    try {
      if (itemId) {
        await updateRankType(itemId, data);
        updateSuccessMessage('rank_types.label');
        mutateRankType();
      } else {
        await createRankType(data);
        createSuccessMessage('rank_types.label');
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
            id='title_en'
            label={messages['common.title_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        {authUser && isNeedToSelectOrganization(authUser) && (
          <Grid item xs={12}>
            <CustomFormSelect
              required
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
        <Grid item xs={6}>
          <CustomTextInput
            id='description_en'
            label={messages['common.description_en']}
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
