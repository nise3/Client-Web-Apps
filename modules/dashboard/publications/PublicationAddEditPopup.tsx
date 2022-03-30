import yup from '../../../@softbd/libs/yup';
import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {useIntl} from 'react-intl';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import IconPublication from '../../../@softbd/icons/IconPublication';
import {useFetchPublication} from '../../../services/instituteManagement/hooks';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {
  createPublication,
  updatePublication,
} from '../../../services/IndustryManagement/PublicationService';
import {IPublication} from '../../../shared/Interface/publication.interface';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {useFetchIndustryAssociations} from '../../../services/IndustryAssociationManagement/hooks';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';

interface PublicationAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title: '',
  title_en: '',
  author: '',
  author_en: '',
  description: '',
  description_en: '',
  industry_association_id: '',
  image_path: '',
  row_status: '1',
};

const PublicationAddEditPopup: FC<PublicationAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const authUser = useAuthUser<CommonAuthUser>();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const isEdit = itemId != null;

  const {
    data: itemData,
    isLoading,
    mutate: mutatePublication,
  } = useFetchPublication(itemId);

  const [industryAssociationsFilters, setIndustryAssociationsFilters] =
    useState<any>(null);

  const {data: industryAssociations, isLoading: isLoadingAssociations} =
    useFetchIndustryAssociations(industryAssociationsFilters);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title()
        .required()
        .label(messages['common.title'] as string),
      author: yup
        .string()
        .required()
        .label(messages['publication.author'] as string),
      description: yup
        .string()
        .required()
        .label(messages['common.description'] as string),
      image_path: yup
        .string()
        .required()
        .label(messages['common.logo'] as string),
      industry_association_id: authUser?.isSystemUser
        ? yup
            .string()
            .trim()
            .required()
            .label(messages['common.association'] as string)
        : yup.string(),
    });
  }, []);

  const {
    control,
    register,
    reset,
    setError,
    setValue,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<IPublication>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (authUser && authUser?.isSystemUser) {
      setIndustryAssociationsFilters({
        row_status: RowStatus.ACTIVE,
      });
    }
  }, [authUser]);

  useEffect(() => {
    if (itemData) {
      reset({
        title: itemData?.title,
        title_en: itemData?.title_en,
        author: itemData?.author,
        author_en: itemData?.author_en,
        description: itemData?.description,
        description_en: itemData?.description_en,
        industry_association_id: itemData?.industry_association_id,
        image_path: itemData?.image_path,
        row_status: String(itemData?.row_status),
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<IPublication> = async (data: IPublication) => {
    try {
      if (!authUser?.isSystemUser) {
        delete data.industry_association_id;
      }

      if (itemId) {
        await updatePublication(itemId, data);
        updateSuccessMessage('menu.publication');
        mutatePublication();
      } else {
        await createPublication(data);
        createSuccessMessage('menu.publication');
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
          <IconPublication />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='menu.publication' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='menu.publication' />}}
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
        <Grid item xs={6}>
          <CustomTextInput
            required
            id='author'
            label={messages['publication.author']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='author_en'
            label={messages['publication.author_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            required
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
        {authUser?.isSystemUser && (
          <Grid item xs={6}>
            <CustomFormSelect
              required
              id='industry_association_id'
              label={messages['common.association']}
              isLoading={isLoadingAssociations}
              control={control}
              options={industryAssociations}
              optionValueProp={'id'}
              optionTitleProp={['title_en', 'title']}
              errorInstance={errors}
            />
          </Grid>
        )}
        <Grid item xs={6}>
          <FileUploadComponent
            id='image_path'
            defaultFileUrl={itemData?.image_path}
            errorInstance={errors}
            setValue={setValue}
            register={register}
            label={messages['common.logo']}
            required={true}
          />
        </Grid>
        <Grid item xs={6}>
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
export default PublicationAddEditPopup;
