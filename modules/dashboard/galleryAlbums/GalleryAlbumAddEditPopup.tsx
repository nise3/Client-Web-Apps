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

import {
  useFetchBatches,
  useFetchProgrammes,
} from '../../../services/instituteManagement/hooks';
import {
  useFetchCMSGlobalConfig,
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
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import {Add, Delete} from '@mui/icons-material';
import LanguageCodes from '../../../@softbd/utilities/LanguageCodes';
import ShowInTypes from '../../../@softbd/utilities/ShowInTypes';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {
  getAllIndustries,
  getAllInstitutes,
} from '../../../services/cmsManagement/FAQService';
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
  const authUser = useAuthUser<CommonAuthUser>();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const {data: cmsGlobalConfig, isLoading: isFetching} =
    useFetchCMSGlobalConfig();
  const [instituteList, setInstituteList] = useState([]);
  const [industryList, setIndustryList] = useState([]);
  const [isLoadingSectionNameList, setIsLoadingSectionNameList] =
    useState<boolean>(false);
  const [languageList, setLanguageList] = useState<any>([]);
  const [allLanguages, setAllLanguages] = useState<any>([]);
  const [showInId, setShowInId] = useState<number | null>(null);
  const [selectedLanguageList, setSelectedLanguageList] = useState<any>([]);
  const [selectedLanguageCode, setSelectedLanguageCode] = useState<
    string | null
  >(null);
  const [selectedCodes, setSelectedCodes] = useState<Array<string>>([]);

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

  useEffect(() => {
    if (cmsGlobalConfig) {
      const filteredLanguage = cmsGlobalConfig.language_configs?.filter(
        (item: any) => item.code != LanguageCodes.BANGLA,
      );

      setAllLanguages(filteredLanguage);
      setLanguageList(filteredLanguage);
    }
  }, [cmsGlobalConfig]);
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
      language_en: !selectedCodes.includes(LanguageCodes.ENGLISH)
        ? yup.object().shape({})
        : yup.object().shape({
            title: yup
              .string()
              .trim()
              .required()
              .label(messages['common.title'] as string),
            image_alt_title: yup
              .string()
              .trim()
              .required()
              .label(messages['common.image_alt_title'] as string),
          }),
      language_hi: !selectedCodes.includes(LanguageCodes.HINDI)
        ? yup.object().shape({})
        : yup.object().shape({
            title: yup
              .string()
              .trim()
              .required()
              .label(messages['common.title'] as string),
            image_alt_title: yup
              .string()
              .trim()
              .required()
              .label(messages['common.image_alt_title'] as string),
          }),
      language_te: !selectedCodes.includes(LanguageCodes.TELEGU)
        ? yup.object().shape({})
        : yup.object().shape({
            title: yup
              .string()
              .trim()
              .required()
              .label(messages['common.title'] as string),
            image_alt_title: yup
              .string()
              .trim()
              .required()
              .label(messages['common.image_alt_title'] as string),
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
      let data: any = {
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
      };

      const otherLangData = itemData?.other_language_fields;

      if (otherLangData) {
        let keys: any = Object.keys(otherLangData);
        keys.map((key: string) => {
          data['language_' + key] = {
            code: key,
            title: otherLangData[key].title,
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
      setShowInId(itemData?.show_in);
      changeShowInAction(itemData?.show_in);
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const changeShowInAction = useCallback((id: number) => {
    (async () => {
      setIsLoadingSectionNameList(true);
      if (id === ShowInTypes.TSP && instituteList.length == 0) {
        const institutes = await getAllInstitutes();
        setInstituteList(institutes);
      } else if (id == ShowInTypes.INDUSTRY && industryList.length == 0) {
        const industries = await getAllIndustries();
        setIndustryList(industries);
      }

      setShowInId(id);
      setIsLoadingSectionNameList(false);
    })();
  }, []);

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
  const onSubmit: SubmitHandler<any> = async (formdata: any) => {
    formdata.itemId = formdata.itemId ? formdata.itemId : null;
    //demo file url
    formdata.main_image_path = 'http://lorempixel.com/400/200/';
    formdata.thumb_image_path = 'http://lorempixel.com/400/200/';
    formdata.grid_image_path = 'http://lorempixel.com/400/200/';
    try {
      if (authUser?.isInstituteUser) {
        formdata.institute_id = authUser?.institute_id;
        formdata.show_in = ShowInTypes.TSP;
      }

      if (authUser?.isOrganizationUser) {
        formdata.organization_id = authUser?.organization_id;
        formdata.show_in = ShowInTypes.INDUSTRY;
      }

      let data = {...formdata};

      let otherLanguagesFields: any = {};
      delete data.language_list;

      selectedLanguageList.map((language: any) => {
        const langObj = data['language_' + language.code];

        otherLanguagesFields[language.code] = {
          title: langObj.title,
          image_alt_title: langObj.image_alt_title,
        };
      });
      delete data['language_en'];
      delete data['language_hi'];
      delete data['language_te'];

      if (selectedLanguageList.length > 0)
        data.other_language_fields = otherLanguagesFields;
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
        {authUser && authUser.isSystemUser && (
          <React.Fragment>
            <Grid item xs={12} md={6}>
              <CustomFormSelect
                required
                id={'show_in'}
                label={messages['common.show_in']}
                isLoading={isFetching}
                control={control}
                options={cmsGlobalConfig?.show_in}
                optionValueProp={'id'}
                optionTitleProp={['title']}
                errorInstance={errors}
                onChange={changeShowInAction}
              />
            </Grid>

            {showInId == ShowInTypes.TSP && (
              <Grid item xs={12} md={6}>
                <CustomFilterableFormSelect
                  required
                  id={'institute_id'}
                  label={messages['institute.label']}
                  isLoading={isLoadingSectionNameList}
                  control={control}
                  options={instituteList}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                  errorInstance={errors}
                />
              </Grid>
            )}
            {showInId == ShowInTypes.INDUSTRY && (
              <Grid item xs={12} md={6}>
                <CustomFilterableFormSelect
                  required
                  id={'organization_id'}
                  label={messages['organization.label']}
                  isLoading={isLoadingSectionNameList}
                  control={control}
                  options={industryList}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                  errorInstance={errors}
                />
              </Grid>
            )}
          </React.Fragment>
        )}

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
        <Grid item xs={12}>
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
            {messages['common.add_language']}
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
                  <Grid item md={5}>
                    <CustomTextInput
                      required
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
export default GalleryAlbumAddEditPopup;
