import yup from '../../../@softbd/libs/yup';
import {Button, Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';

import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';

import {useFetchInstitutes} from '../../../services/instituteManagement/hooks';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import IconGallery from '../../../@softbd/icons/IconGallery';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {useFetchOrganizations} from '../../../services/organaizationManagement/hooks';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import {
  createGalleryAlbumContent,
  updateGalleryAlbumContent,
} from '../../../services/cmsManagement/GalleryAlbumContentService';
import {
  useFetchGalleryAlbumContent,
  useFetchGalleryAlbums,
} from '../../../services/cmsManagement/hooks';

interface ContentAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  id: '',
  gallery_album_id: '',
  content_type: '',
  video_type: '',
  content_title: '',
  content_description: '',
  institute_id: '',
  organization_id: '',
  alt_title: '',
  featured: '',
  published_at: '',
  archived_at: '',
  row_status: '1',
  image_url: 'http://lorempixel.com/400/200/',
  video_url: 'http://lorempixel.com/400/200/',
};
export const contentTypes = [
  {
    id: 1,
    label: 'Image',
  },
  {
    id: 2,
    label: 'Video',
  },
];
export const videoTypes = [
  {
    id: 1,
    label: 'Youtube',
  },
  {
    id: 2,
    label: 'Facebook',
  },
];
export const features = [
  {
    id: '0',
    label: 'No',
  },
  {
    id: '1',
    label: 'Yes',
  },
];

const ContentAddEditPopup: FC<ContentAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const [instituteFilters] = useState({row_status: RowStatus.ACTIVE});
  const {data: institutes, isLoading: isLoadingInstitutes} =
    useFetchInstitutes(instituteFilters);

  const [organizationFilters] = useState({row_status: RowStatus.ACTIVE});
  const [galleryAlbumFilters] = useState({row_status: RowStatus.ACTIVE});
  const [contentStatus, setContentStatus] = useState<any>(null);
  const onContentChange = (value: number) => {
    setContentStatus(value);
  };
  const {data: organizations, isLoading: isLoadingOrganization} =
    useFetchOrganizations(organizationFilters);

  const {data: galleryAlbums, isLoading: isLoadingGalleryAlbums} =
    useFetchGalleryAlbums(galleryAlbumFilters);

  const isEdit = itemId != null;
  const {
    data: itemData,
    isLoading,
    mutate: mutateGalleryAlbumContent,
  } = useFetchGalleryAlbumContent(itemId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      gallery_album_id: yup
        .string()
        .required()
        .label(messages['common.gallery_album'] as string),
      featured: yup
        .string()
        .required()
        .label(messages['gallery_album.featured_status'] as string),
      content_type: yup
        .string()
        .required()
        .label(messages['common.content_type'] as string),
      content_title: yup
        .string()
        .required()
        .label(messages['common.content_title'] as string),
      image_url: yup
        .string()
        .label(messages['common.image'] as string)
        .when('content_type', {
          is: (value: any) => value === '1',
          then: yup.string().required(),
        }),
      video_url: yup
        .string()
        .label(messages['common.video'] as string)
        .when('content_type', {
          is: (value: any) => value === '2',
          then: yup.string().required(),
        }),
    });
  }, [messages]);
  const {
    register,
    reset,
    setError,
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });
  console.log(errors);
  useEffect(() => {
    if (itemData) {
      reset({
        gallery_album_id: itemData?.gallery_album_id,
        content_type: itemData?.content_type,
        video_type: itemData?.video_type,
        content_title: itemData?.content_title,
        content_description: itemData?.content_description,
        institute_id: itemData?.institute_id,
        organization_id: itemData?.organization_id,
        alt_title: itemData?.alt_title,
        featured: String(itemData?.featured),
        published_at: itemData?.published_at,
        archived_at: itemData?.archived_at,
        row_status: itemData?.row_status,
        image_url: 'http://lorempixel.com/400/200/',
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);
  const onSubmit: SubmitHandler<any> = async (data: any) => {
    //demo file url
    data.content_cover_image_url = 'http://lorempixel.com/400/200/';
    if (data.content_type == 1) {
      data.image_url = 'http://lorempixel.com/400/200/';
      data.video_url = '';
    }

    if (data.content_type == 2) {
      data.video_url = 'http://lorempixel.com/400/200/';
      data.image_url = '';
    }
    data.content_grid_image_url = 'http://lorempixel.com/400/200/';
    data.content_thumb_image_url = 'http://lorempixel.com/200/100/';
    try {
      if (itemId) {
        await updateGalleryAlbumContent(itemId, data);
        updateSuccessMessage('common.gallery_album');
        mutateGalleryAlbumContent();
      } else {
        await createGalleryAlbumContent(data);
        createSuccessMessage('common.gallery_album');
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
          <IconGallery />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{
                subject: <IntlMessages id='gallery_album_content.label' />,
              }}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{
                subject: <IntlMessages id='gallery_album_content.label' />,
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
          <CustomFormSelect
            id='gallery_album_id'
            label={messages['common.gallery_album']}
            isLoading={isLoadingGalleryAlbums}
            control={control}
            options={galleryAlbums}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormSelect
            isLoading={false}
            id='featured'
            label={messages['gallery_album.featured_status']}
            control={control}
            options={features}
            optionValueProp={'id'}
            optionTitleProp={['label']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormSelect
            isLoading={false}
            id='content_type'
            label={messages['common.content_type']}
            control={control}
            options={contentTypes}
            optionValueProp={'id'}
            optionTitleProp={['label']}
            errorInstance={errors}
            onChange={onContentChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='content_title'
            label={messages['common.content_title']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormSelect
            isLoading={false}
            id='video_type'
            label={messages['common.video_type']}
            control={control}
            options={videoTypes}
            optionValueProp={'id'}
            optionTitleProp={['label']}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomFormSelect
            id='institute_id'
            label={messages['institute.label']}
            isLoading={isLoadingInstitutes}
            control={control}
            options={institutes}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomFormSelect
            id='organization_id'
            label={messages['organization.label']}
            isLoading={isLoadingOrganization}
            control={control}
            options={organizations}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomDateTimeField
            id='published_at'
            label={messages['common.publish_at']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomDateTimeField
            id='archived_at'
            label={messages['common.archived_at']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        {contentStatus === 1 && (
          <Grid item xs={12} md={6}>
            <Button className='btn-choose' variant='outlined' component='label'>
              {messages['common.image_url']}
              <input id='image_url' type='file' hidden />
            </Button>
            {/* <CustomTextInput
              id='image_url'
              label={messages['common.image_url']}
              type={'file'}
              register={register}
              errorInstance={errors}
            />*/}
          </Grid>
        )}
        {contentStatus === 2 && (
          <Grid item xs={12} md={6}>
            <Button className='btn-choose' variant='outlined' component='label'>
              {messages['common.video_url']}
              <input id='video_url' type='file' hidden />
            </Button>
            {/*<CustomTextInput
              id='video_url'
              label={messages['common.video_url']}
              type={'file'}
              register={register}
              errorInstance={errors}
            />*/}
          </Grid>
        )}
        <Grid item xs={12} md={6}>
          <Button className='btn-choose' variant='outlined' component='label'>
            {messages['gallery_album_content.content_cover_image_url']}
            <input id='content_cover_image_url' type='file' hidden />
          </Button>
          {/*<CustomTextInput
            id='content_cover_image_url'
            label={messages['gallery_album_content.content_cover_image_url']}
            type={'file'}
            register={register}
            errorInstance={errors}
          />*/}
        </Grid>
        <Grid item xs={12} md={6}>
          <Button className='btn-choose' variant='outlined' component='label'>
            {messages['gallery_album_content.content_grid_image_url']}
            <input id='content_grid_image_url' type='file' hidden />
          </Button>
          {/*<CustomTextInput
            id='content_grid_image_url'
            label={messages['gallery_album_content.content_grid_image_url']}
            type={'file'}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />*/}
        </Grid>
        <Grid item xs={12} md={6}>
          <Button className='btn-choose' variant='outlined' component='label'>
            {messages['gallery_album_content.content_thumb_image_url']}
            <input id='content_thumb_image_url' type='file' hidden />
          </Button>
          {/* <CustomTextInput
            id='content_thumb_image_url'
            label={messages['gallery_album_content.content_thumb_image_url']}
            type={'file'}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />*/}
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='alt_title'
            label={messages['gallery_album.image_alt_title']}
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
export default ContentAddEditPopup;
