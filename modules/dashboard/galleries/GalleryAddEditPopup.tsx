import yup from '../../../@softbd/libs/yup';
import {Button, Grid} from '@mui/material';
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

import {useFetchGallery} from '../../../services/instituteManagement/hooks';
import {
  createGallery,
  updateGallery,
} from '../../../services/instituteManagement/GalleryService';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import IconGallery from '../../../@softbd/icons/IconGallery';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';

interface GalleryAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  id: '',
  title_en: '',
  title: '',
};

const GalleryAddEditPopup: FC<GalleryAddEditPopupProps> = ({
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
    mutate: mutateGallery,
  } = useFetchGallery(itemId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title()
        .label(messages['common.title'] as string),
    });
  }, [messages]);
  const {
    register,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        title_en: itemData?.title_en,
        title: itemData?.title,
        content: itemData?.content,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    data.itemId = data.itemId ? data.itemId : null;
    try {
      if (itemId) {
        await updateGallery(itemId, data);
        updateSuccessMessage('galleries.institute');
        mutateGallery();
      } else {
        await createGallery(data);
        createSuccessMessage('galleries.institute');
      }
      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  /*const onSubmit: SubmitHandler<any> = async (data: any) => {
    const response = itemId
      ? await updateGallery(itemId, data)
      : await createGallery(data);

    if (isResponseSuccess(response) && isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='galleries.institute' />}}
        />,
      );
      mutateGallery();
      props.onClose();
      refreshDataTable();
    } else if (isResponseSuccess(response) && !isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_created_successfully'
          values={{subject: <IntlMessages id='galleries.institute' />}}
        />,
      );
      props.onClose();
      refreshDataTable();
    } else if (isValidationError(response)) {
      setServerValidationErrors(response.errors, setError, validationSchema);
    }
  };*/

  return (
    <HookFormMuiModal
      open={true}
      {...props}
      title={
        <>
          <IconGallery />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='galleries.institute' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='galleries.institute' />}}
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
            id='title'
            label={messages['common.title']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='content'
            label={messages['common.content']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={12}>
          <input
            id='cover_image'
            name='btn-upload'
            style={{display: 'none'}}
            type='file'
          />
          <Button className='btn-choose' variant='outlined' component='span'>
            Cover Image
          </Button>
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default GalleryAddEditPopup;
