import yup from '../../../@softbd/libs/yup';
import {Button, Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';

import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';

import {
  useFetchBatches,
  useFetchInstitutes,
  useFetchProgrammes,
} from '../../../services/instituteManagement/hooks';
import {
  useFetchGalleryAlbum,
  useFetchGalleryAlbums,
} from '../../../services/cmsManagement/hooks';
import {
  createGalleryAlbum,
  updateGalleryAlbum,
} from '../../../services/cmsManagement/GalleryAlbumService';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import IconGallery from '../../../@softbd/icons/IconGallery';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {useFetchOrganizations} from '../../../services/organaizationManagement/hooks';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';

interface GalleryAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  id: '',
  title: '',
  institute_id: '',
  parent_gallery_album_id: '',
  organization_id: '',
  batch_id: '',
  programme_id: '',
  image_alt_title: '',
  featured: '',
  show_in: '',
  album_type: '',
  published_at: '',
  archived_at: '',
  row_status: '1',
};
export const showIns = [
  {
    id: 1,
    label: 'Nise3',
  },
  {
    id: 2,
    label: 'Youth',
  },
  {
    id: 3,
    label: 'TSP',
  },
  {
    id: 4,
    label: 'Industry',
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
export const albumTypes = [
  {
    id: 1,
    label: 'Image',
  },
  {
    id: 2,
    label: 'Video',
  },
  {
    id: 3,
    label: 'Mixed',
  },
];
const GalleryAlbumAddEditPopup: FC<GalleryAddEditPopupProps> = ({
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
  const {data: organizations, isLoading: isLoadingOrganization} =
    useFetchOrganizations(organizationFilters);

  const [programFilters] = useState({row_status: RowStatus.ACTIVE});
  const {data: programmes, isLoading: isLoadingProgramme} =
    useFetchProgrammes(programFilters);

  const [batchFilters, setBatchFilters] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: batches, isLoading: isLoadingBatch} =
    useFetchBatches(batchFilters);

  const [galleryAlbumFilters] = useState({row_status: RowStatus.ACTIVE});
  const [filteredGalleryAlbums, setFilteredGalleryAlbums] = useState([]);
  const {data: galleryAlbums, isLoading: isLoadingGalleryAlbums} =
    useFetchGalleryAlbums(galleryAlbumFilters);
  const [showInStatus, setShowInStatus] = useState<number>();
  const onShowInChange = (value: number) => {
    setShowInStatus(value);
  };
  useEffect(() => {
    if (galleryAlbums) {
      const filteredGalleryAlbums = itemId
        ? galleryAlbums.filter(
            (galleryAlbum: any) => galleryAlbum?.id != itemId,
          )
        : galleryAlbums;
      setFilteredGalleryAlbums(filteredGalleryAlbums);
    }
  }, [galleryAlbums]);
  const isEdit = itemId != null;
  const {
    data: itemData,
    isLoading,
    mutate: mutateGalleryAlbum,
  } = useFetchGalleryAlbum(itemId);

  const onProgrammeChange = useCallback((programmeId: number) => {
    setBatchFilters({
      row_status: RowStatus.ACTIVE,
      program_id: programmeId,
    });
  }, []);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title()
        .label(messages['common.title'] as string),
      featured: yup
        .string()
        .required()
        .label(messages['gallery_album.featured_status'] as string),
      album_type: yup
        .string()
        .required()
        .label(messages['gallery_album.album_type'] as string),
      show_in: yup
        .string()
        .required()
        .label(messages['common.show_in'] as string),
      institute_id: yup
        .mixed()
        .label(messages['institute.label'] as string)
        .when('show_in', {
          is: (value: any) => value === '3',
          then: yup.string().required(),
        }),
      organization_id: yup
        .mixed()
        .label(messages['organization.label'] as string)
        .when('show_in', {
          is: (value: any) => value === '4',
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
        title: itemData?.title,
        institute_id: itemData?.institute_id,
        //institute_id: itemData.institute_id ? itemData.institute_id : '',
        parent_gallery_album_id: itemData?.parent_gallery_album_id,
        organization_id: itemData?.organization_id,
        batch_id: itemData?.batch_id,
        programme_id: itemData?.programme_id,
        image_alt_title: itemData?.image_alt_title,
        featured: String(itemData?.featured),
        show_in: String(itemData?.show_in),
        album_type: itemData?.album_type,
        published_at: itemData?.published_at,
        archived_at: itemData?.archived_at,
        row_status: itemData?.row_status,
      });
      setShowInStatus(itemData?.show_in);
    } else {
      reset(initialValues);
    }
  }, [itemData]);
  const onSubmit: SubmitHandler<any> = async (data: any) => {
    data.itemId = data.itemId ? data.itemId : null;
    //demo file url
    data.main_image_path = 'http://lorempixel.com/400/200/';
    data.thumb_image_path = 'http://lorempixel.com/400/200/';
    data.grid_image_path = 'http://lorempixel.com/400/200/';
    try {
      if (itemId) {
        await updateGalleryAlbum(itemId, data);
        updateSuccessMessage('common.gallery_album');
        mutateGalleryAlbum();
      } else {
        await createGalleryAlbum(data);
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
              values={{subject: <IntlMessages id='common.gallery_album' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='common.gallery_album' />}}
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
            id='show_in'
            label={messages['common.show_in']}
            isLoading={isLoading}
            control={control}
            options={showIns}
            optionValueProp={'id'}
            optionTitleProp={['label']}
            errorInstance={errors}
            onChange={onShowInChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='title'
            label={messages['common.title']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
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
            id='album_type'
            label={messages['gallery_album.album_type']}
            control={control}
            options={albumTypes}
            optionValueProp={'id'}
            optionTitleProp={['label']}
            errorInstance={errors}
          />
        </Grid>

        {showInStatus === 3 && (
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
        )}
        {showInStatus === 4 && (
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
        )}
        <Grid item xs={12} md={6}>
          <CustomFormSelect
            id='programme_id'
            label={messages['programme.label']}
            isLoading={isLoadingProgramme}
            control={control}
            options={programmes}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
            onChange={onProgrammeChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormSelect
            id='batch_id'
            label={messages['batches.label']}
            isLoading={isLoadingBatch}
            control={control}
            options={batches}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormSelect
            id='parent_gallery_album_id'
            label={messages['gallery_album.parent_gallery_album']}
            isLoading={isLoadingGalleryAlbums}
            control={control}
            options={filteredGalleryAlbums}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='image_alt_title'
            label={messages['gallery_album.image_alt_title']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
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
        <Grid item xs={12} md={6}>
          <Button className='btn-choose' variant='outlined' component='label'>
            {messages['gallery_album.main_image_path']}
            <input id='main_image_path' type='file' hidden />
          </Button>
          {/*<CustomTextInput
            id='main_image_path'
            label={messages['gallery_album.main_image_path']}
            type={'file'}
            register={register}
            errorInstance={errors}
          />*/}
        </Grid>
        <Grid item xs={12} md={6}>
          <Button className='btn-choose' variant='outlined' component='label'>
            {messages['gallery_album.grid_image_path']}
            <input id='grid_image_path' type='file' hidden />
          </Button>
          {/* <CustomTextInput
            id='grid_image_path'
            label={messages['gallery_album.grid_image_path']}
            type={'file'}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />*/}
        </Grid>
        <Grid item xs={12} md={6}>
          <Button className='btn-choose' variant='outlined' component='label'>
            {messages['gallery_album.thumb_image_path']}
            <input id='thumb_image_path' type='file' hidden />
          </Button>
          {/*<CustomTextInput
            id='thumb_image_path'
            label={messages['gallery_album.thumb_image_path']}
            type={'file'}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />*/}
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
export default GalleryAlbumAddEditPopup;
