import yup from '../../../@softbd/libs/yup';
import {Box, Button, Grid, IconButton} from '@mui/material';
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

import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import IconGallery from '../../../@softbd/icons/IconGallery';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import {
  createGalleryAlbumContent,
  updateGalleryAlbumContent,
} from '../../../services/cmsManagement/GalleryAlbumContentService';
import {
  useFetchCMSGlobalConfig,
  useFetchGalleryAlbumContent,
  useFetchGalleryAlbums,
} from '../../../services/cmsManagement/hooks';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import {Add, Delete} from '@mui/icons-material';
import LanguageCodes from '../../../@softbd/utilities/LanguageCodes';
import GalleryAlbumContentTypes from './GalleryAlbumContentTypes';
import {getMomentDateFormat} from '../../../@softbd/utilities/helpers';
import TextEditor from '../../../@softbd/components/editor/TextEditor';
import AlbumTypes from '../galleryAlbums/AlbumTypes';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import {isBreakPointUp} from '../../../@crema/utility/Utils';

interface GalleryAlbumContentsPageAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  gallery_album_id: '',
  content_type: '',
  video_type: '',
  title: '',
  description: '',
  image_alt_title: '',
  featured: '',
  published_at: '',
  archived_at: '',
  row_status: '1',
  video_id: '',
  image_path: '',
  video_url: '',
};

const GalleryAlbumContentsPageAddEditPopup: FC<
  GalleryAlbumContentsPageAddEditPopupProps
> = ({itemId, refreshDataTable, ...props}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const [galleryAlbumFilters] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: galleryAlbums, isLoading: isLoadingGalleryAlbums} =
    useFetchGalleryAlbums(galleryAlbumFilters);

  const {data: cmsGlobalConfig, isLoading: isFetching} =
    useFetchCMSGlobalConfig();
  const [languageList, setLanguageList] = useState<any>([]);
  const [allLanguages, setAllLanguages] = useState<any>([]);

  const [selectedLanguageList, setSelectedLanguageList] = useState<any>([]);
  const [selectedLanguageCode, setSelectedLanguageCode] = useState<
    string | null
  >(null);
  const [selectedCodes, setSelectedCodes] = useState<Array<string>>([]);
  const [selectedContentType, setSelectedContentType] = useState<number | null>(
    null,
  );

  const [galleryAlbum, setGalleryAlbum] = useState<any>(null);

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
      content_type:
        galleryAlbum && galleryAlbum.album_type == AlbumTypes.MIXED
          ? yup
              .string()
              .required()
              .label(messages['common.content_type'] as string)
          : yup.string(),
      title: yup
        .string()
        .required()
        .label(messages['common.title'] as string),
      image_path: yup
        .mixed()
        .label(messages['common.image_path'] as string)
        .when('content_type', {
          is: (value: number) => value == GalleryAlbumContentTypes.IMAGE,
          then: yup.string().required(),
        }),
      video_type: yup
        .mixed()
        .label(messages['common.video_type'] as string)
        .when('content_type', {
          is: (value: number) =>
            galleryAlbum &&
            galleryAlbum.album_type != AlbumTypes.IMAGE &&
            value != GalleryAlbumContentTypes.IMAGE,
          then: yup.string().required(),
        }),
      video_id: yup
        .mixed()
        .label(messages['common.video_id'] as string)
        .when('content_type', {
          is: (value: number) =>
            galleryAlbum &&
            galleryAlbum.album_type != AlbumTypes.IMAGE &&
            value != GalleryAlbumContentTypes.IMAGE,
          then: yup.string().required(),
        }),
      video_url: yup
        .mixed()
        .label(messages['common.video_url'] as string)
        .when('content_type', {
          is: (value: number) =>
            galleryAlbum &&
            galleryAlbum.album_type != AlbumTypes.IMAGE &&
            value != GalleryAlbumContentTypes.IMAGE,
          then: yup.string().required(),
        }),
      language_en: !selectedCodes.includes(LanguageCodes.ENGLISH)
        ? yup.object().shape({})
        : yup.object().shape({
            title: yup
              .string()
              .trim()
              .required()
              .label(messages['common.title'] as string),
          }),
      language_hi: !selectedCodes.includes(LanguageCodes.HINDI)
        ? yup.object().shape({})
        : yup.object().shape({
            title: yup
              .string()
              .trim()
              .required()
              .label(messages['common.title'] as string),
          }),
      language_te: !selectedCodes.includes(LanguageCodes.TELEGU)
        ? yup.object().shape({})
        : yup.object().shape({
            title: yup
              .string()
              .trim()
              .required()
              .label(messages['common.title'] as string),
          }),
    });
  }, [messages, selectedCodes, galleryAlbum]);

  const features = useMemo(
    () => [
      {
        id: 2,
        label: messages['common.no'],
      },
      {
        id: 1,
        label: messages['common.yes'],
      },
    ],
    [messages],
  );

  const contentTypes = useMemo(
    () => [
      {
        id: GalleryAlbumContentTypes.IMAGE,
        label: messages['common.image'],
      },
      {
        id: GalleryAlbumContentTypes.VIDEO,
        label: messages['common.video'],
      },
    ],
    [messages],
  );

  const videoTypes = useMemo(
    () => [
      {
        id: 1,
        label: messages['common.youtube'],
      },
      {
        id: 2,
        label: messages['common.facebook'],
      },
    ],
    [messages],
  );

  useEffect(() => {
    if (cmsGlobalConfig) {
      const filteredLanguage = cmsGlobalConfig.language_configs?.filter(
        (item: any) => item.code != LanguageCodes.BANGLA,
      );

      setAllLanguages(filteredLanguage);
      setLanguageList(filteredLanguage);
    }
  }, [cmsGlobalConfig]);

  const onAddOtherLanguageClick = useCallback(() => {
    if (selectedLanguageCode) {
      let lists = [...selectedLanguageList];
      const lang = allLanguages.find(
        (item: any) => item.code == selectedLanguageCode,
      );

      if (lang) {
        lists.push(lang);
        setSelectedLanguageList(lists);
        setSelectedCodes((prev) => [...prev, lang.code]);

        setLanguageList((prevState: any) =>
          prevState.filter((item: any) => item.code != selectedLanguageCode),
        );
        setSelectedLanguageCode(null);
      }
    }
  }, [selectedLanguageCode, selectedLanguageList]);

  const onLanguageListChange = useCallback((selected: any) => {
    setSelectedLanguageCode(selected);
  }, []);

  const {
    register,
    reset,
    setValue,
    setError,
    clearErrors,
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      let data: any = {
        gallery_album_id: itemData?.gallery_album_id,
        content_type: itemData?.content_type,
        video_type: itemData?.video_type,
        title: itemData?.title,
        video_url: itemData?.video_url,
        video_id: itemData?.video_id,
        image_path: itemData?.image_path,
        description: itemData?.description,
        image_alt_title: itemData?.image_alt_title,
        featured: String(itemData?.featured),
        published_at: itemData?.published_at
          ? getMomentDateFormat(itemData.published_at, 'YYYY-MM-DD')
          : '',
        archived_at: itemData?.archived_at
          ? getMomentDateFormat(itemData.archived_at, 'YYYY-MM-DD')
          : '',
        row_status: itemData?.row_status,
      };
      const otherLangData = itemData?.other_language_fields;

      if (otherLangData) {
        let keys: any = Object.keys(otherLangData);
        keys.map((key: string) => {
          data['language_' + key] = {
            code: key,
            title: otherLangData[key].title,
            description: otherLangData[key].description,
            image_alt_title: otherLangData[key].image_alt_title,
          };
        });
        setSelectedCodes(keys);

        setSelectedLanguageList(
          allLanguages.filter((item: any) => keys.includes(item.code)),
        );

        setLanguageList(
          allLanguages.filter((item: any) => !keys.includes(item.code)),
        );
      }
      reset(data);
      setSelectedContentType(itemData?.content_type);
      onGalleryAlbumChange(itemData?.gallery_album_id);
    } else {
      reset(initialValues);
    }
  }, [itemData, allLanguages, galleryAlbums]);

  const onDeleteLanguage = useCallback(
    (language: any) => {
      if (language) {
        setSelectedLanguageList((prevState: any) =>
          prevState.filter((item: any) => item.code != language.code),
        );

        let languages = [...languageList];
        languages.push(language);
        setLanguageList(languages);

        setSelectedCodes((prev) =>
          prev.filter((code: any) => code != language.code),
        );
      }
    },
    [selectedLanguageList, languageList, selectedCodes],
  );

  const onGalleryAlbumChange = useCallback(
    (albumId: number) => {
      if (albumId && galleryAlbums) {
        const galleryAlbum = galleryAlbums.find(
          (album: any) => album.id == albumId,
        );
        if (galleryAlbum?.album_type != AlbumTypes.MIXED) {
          setSelectedContentType(galleryAlbum?.album_type);
        }

        setGalleryAlbum(galleryAlbum);
      } else {
        setGalleryAlbum(null);
        setSelectedContentType(null);
      }
    },
    [galleryAlbums],
  );

  const onSubmit: SubmitHandler<any> = async (formData: any) => {
    try {
      if (formData?.featured == 2) {
        formData.featured = 0;
      }
      if (galleryAlbum.album_type == AlbumTypes.IMAGE) {
        formData.content_type = GalleryAlbumContentTypes.IMAGE;
      } else if (galleryAlbum.album_type == AlbumTypes.VIDEO) {
        formData.content_type = GalleryAlbumContentTypes.VIDEO;
      }

      let data = {...formData};
      let otherLanguagesFields: any = {};

      delete data.language_list;
      if (data.content_type == GalleryAlbumContentTypes.IMAGE) {
        delete data.video_type;
        delete data.video_id;
        delete data.video_url;
      }
      selectedLanguageList.map((language: any) => {
        const langObj = data['language_' + language.code];

        otherLanguagesFields[language.code] = {
          title: langObj.title,
          description: langObj.description,
          image_alt_title: langObj.image_alt_title,
        };
      });
      delete data['language_en'];
      delete data['language_hi'];
      delete data['language_te'];

      if (selectedLanguageList.length > 0)
        data.other_language_fields = otherLanguagesFields;
      if (itemId) {
        await updateGalleryAlbumContent(itemId, data);
        updateSuccessMessage('gallery_album_content.label');
        mutateGalleryAlbumContent();
      } else {
        await createGalleryAlbumContent(data);
        createSuccessMessage('gallery_album_content.label');
      }
      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({
        error,
        setError,
        validationSchema,
        errorStack,
      });
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
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            required
            id='gallery_album_id'
            label={messages['common.gallery_album']}
            isLoading={isLoadingGalleryAlbums}
            control={control}
            options={galleryAlbums}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            errorInstance={errors}
            onChange={onGalleryAlbumChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            required
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
          <CustomTextInput
            required
            id='title'
            label={messages['common.title']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        {galleryAlbum && galleryAlbum.album_type == AlbumTypes.MIXED && (
          <Grid item xs={12} md={6}>
            <CustomFilterableFormSelect
              required
              isLoading={false}
              id='content_type'
              label={messages['common.content_type']}
              control={control}
              options={contentTypes}
              optionValueProp={'id'}
              optionTitleProp={['label']}
              errorInstance={errors}
              onChange={(contentType: number) => {
                setSelectedContentType(contentType);
              }}
            />
          </Grid>
        )}

        {selectedContentType &&
          selectedContentType == GalleryAlbumContentTypes.IMAGE && (
            <Grid item xs={12} md={6}>
              <FileUploadComponent
                id='image_path'
                defaultFileUrl={itemData?.image_path}
                errorInstance={errors}
                setValue={setValue}
                register={register}
                label={messages['common.image_path']}
                required={true}
                acceptedFileTypes={['image/*']}
              />
            </Grid>
          )}
        {selectedContentType &&
          selectedContentType == GalleryAlbumContentTypes.VIDEO && (
            <React.Fragment>
              <Grid item xs={12} md={6}>
                <CustomFilterableFormSelect
                  required
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
                <CustomTextInput
                  required
                  id='video_url'
                  label={messages['common.video_url']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomTextInput
                  required
                  id='video_id'
                  label={messages['common.video_id']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>
            </React.Fragment>
          )}

        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='image_alt_title'
            label={messages['common.image_alt_title']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FileUploadComponent
            id='content_thumb_image_path'
            defaultFileUrl={itemData?.content_thumb_image_path}
            errorInstance={errors}
            setValue={setValue}
            register={register}
            label={messages['common.thumb_image_path']}
            required={false}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FileUploadComponent
            id='content_grid_image_path'
            defaultFileUrl={itemData?.content_grid_image_path}
            errorInstance={errors}
            setValue={setValue}
            register={register}
            label={messages['common.grid_image_path']}
            required={false}
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
          <Box sx={{fontStyle: 'italic', fontWeight: 'bold', marginTop: '6px'}}>
            {messages['common.give_publish_date']}
          </Box>
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

        <Grid item xs={12}>
          <TextEditor
            id={'description'}
            label={messages['common.description']}
            errorInstance={errors}
            value={itemData?.description || initialValues.description}
            height={'300px'}
            key={1}
            register={register}
            setValue={setValue}
            clearErrors={clearErrors}
            setError={setError}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomFilterableFormSelect
            id={'language_list'}
            label={messages['common.language']}
            isLoading={isFetching}
            control={control}
            options={languageList}
            optionValueProp={'code'}
            optionTitleProp={['native_name']}
            errorInstance={errors}
            onChange={onLanguageListChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            variant={'outlined'}
            color={'primary'}
            onClick={onAddOtherLanguageClick}
            disabled={!selectedLanguageCode}>
            <Add />
            {messages['gallery_album_content.add_language']}
          </Button>
        </Grid>

        <Grid item xs={12}>
          {selectedLanguageList.map((language: any) => (
            <Box key={language.code} sx={{marginTop: '10px'}}>
              <fieldset style={{border: '1px solid #7e7e7e'}}>
                <legend style={{color: '#0a8fdc'}}>
                  {language.native_name}
                </legend>
                <Grid container spacing={5}>
                  <Grid item xs={6}>
                    <CustomTextInput
                      required
                      id={'language_' + language.code + '[title]'}
                      label={messages['common.title']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <CustomTextInput
                      id={'language_' + language.code + '[image_alt_title]'}
                      label={messages['common.image_alt_title']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                  <Grid item xs={1} md={1}>
                    <IconButton
                      aria-label='delete'
                      color={'error'}
                      onClick={(event) => {
                        onDeleteLanguage(language);
                      }}>
                      <Delete color={'error'} />
                    </IconButton>
                  </Grid>
                  <Grid item md={12}>
                    <TextEditor
                      id={'language_' + language.code + '[description]'}
                      label={messages['common.description']}
                      errorInstance={errors}
                      value={
                        itemData?.other_language_fields?.[language.code]
                          ?.description || initialValues.description
                      }
                      height={'300px'}
                      key={1}
                      register={register}
                      setValue={setValue}
                      clearErrors={clearErrors}
                      setError={setError}
                    />
                  </Grid>
                </Grid>
              </fieldset>
            </Box>
          ))}
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
export default GalleryAlbumContentsPageAddEditPopup;
