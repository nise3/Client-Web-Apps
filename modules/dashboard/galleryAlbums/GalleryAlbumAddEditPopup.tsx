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
  useFetchCourses,
  useFetchPrograms,
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
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import {Add, Delete} from '@mui/icons-material';
import LanguageCodes from '../../../@softbd/utilities/LanguageCodes';
import ShowInTypes from '../../../@softbd/utilities/ShowInTypes';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';
import AlbumTypes from './AlbumTypes';
import {getMomentDateFormat} from '../../../@softbd/utilities/helpers';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import {getAllOrganizations} from '../../../services/organaizationManagement/OrganizationService';
import {getAllIndustryAssociations} from '../../../services/IndustryAssociationManagement/IndustryAssociationService';
import {getAllInstitutes} from '../../../services/instituteManagement/InstituteService';
import {isBreakPointUp} from '../../../@crema/utility/Utils';

interface GalleryAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  id: '',
  title: '',
  title_en: '',
  institute_id: '',
  parent_gallery_album_id: '',
  organization_id: '',
  industry_association_id: '',
  course_id: '',
  program_id: '',
  image_alt_title: '',
  featured: '',
  show_in: '',
  album_type: '',
  published_at: '',
  archived_at: '',
  main_image_path: '',
  grid_image_path: '',
  thumb_image_path: '',
  row_status: '1',
};
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
  const [industryAssociationList, setIndustryAssociationList] = useState([]);
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

  const [programFilters] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: programmes, isLoading: isLoadingProgramme} =
    useFetchPrograms(programFilters);

  const [courseFilters] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: courses, isLoading: isLoadingCourse} =
    useFetchCourses(courseFilters);

  const [galleryAlbumFilters] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
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
      featured: yup
        .string()
        .required()
        .label(messages['gallery_album.featured_status'] as string),
      album_type: yup
        .string()
        .required()
        .label(messages['gallery_album.album_type'] as string),
      /*image_path: yup
           .mixed()
           .label(messages['common.image_path'] as string)
           .when('content_type', {
             is: (value: number) => value == GalleryAlbumContentTypes.IMAGE,
             then: yup.string().required(),
           }),*/
      show_in: authUser?.isSystemUser
        ? yup
            .string()
            .required()
            .label(messages['common.show_in'] as string)
        : yup.string(),
      institute_id: yup
        .mixed()
        .label(messages['institute.label'] as string)
        .when('show_in', {
          is: (value: number) => value == ShowInTypes.TSP,
          then: yup.string().required(),
        }),
      organization_id: yup
        .mixed()
        .label(messages['organization.label'] as string)
        .when('show_in', {
          is: (value: number) => value == ShowInTypes.INDUSTRY,
          then: yup.string().required(),
        }),
      industry_association_id: yup
        .mixed()
        .label(messages['common.industry_association'] as string)
        .when('show_in', {
          is: (val: number) => {
            return val == ShowInTypes.INDUSTRY_ASSOCIATION;
          },
          then: yup.string().required(),
        }),
      language_en: !selectedCodes.includes(LanguageCodes.ENGLISH)
        ? yup.object().shape({})
        : yup.object().shape({
            title: yup
              .string()
              .title(
                'bn',
                true,
                messages['common.special_character_error'] as string,
              )
              .label(messages['common.title'] as string),
          }),
      language_hi: !selectedCodes.includes(LanguageCodes.HINDI)
        ? yup.object().shape({})
        : yup.object().shape({
            title: yup
              .string()
              .title(
                'bn',
                true,
                messages['common.special_character_error'] as string,
              )
              .label(messages['common.title'] as string),
          }),
      language_te: !selectedCodes.includes(LanguageCodes.TELEGU)
        ? yup.object().shape({})
        : yup.object().shape({
            title: yup
              .string()
              .title(
                'bn',
                true,
                messages['common.special_character_error'] as string,
              )
              .label(messages['common.title'] as string),
          }),
      main_image_path: yup
        .string()
        .required()
        .label(messages['common.main_image_path'] as string),
    });
  }, [messages, authUser]);
  const {
    register,
    reset,
    setError,
    control,
    handleSubmit,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const albumTypes = useMemo(
    () => [
      {
        id: AlbumTypes.IMAGE,
        label: messages['album_type.image'],
      },
      {
        id: AlbumTypes.VIDEO,
        label: messages['album_type.video'],
      },
      {
        id: AlbumTypes.MIXED,
        label: messages['common.mixed'],
      },
    ],
    [messages],
  );

  const features = useMemo(
    () => [
      {
        id: 0,
        label: messages['common.no'],
      },
      {
        id: 1,
        label: messages['common.yes'],
      },
    ],
    [messages],
  );

  useEffect(() => {
    if (itemData) {
      let data: any = {
        title: itemData?.title,
        institute_id: itemData?.institute_id,
        parent_gallery_album_id: itemData?.parent_gallery_album_id,
        organization_id: itemData?.organization_id,
        industry_association_id: itemData?.industry_association_id,
        course_id: itemData?.course_id,
        program_id: itemData?.program_id,
        image_alt_title: itemData?.image_alt_title,
        featured: String(itemData?.featured),
        show_in: itemData?.show_in,
        album_type: itemData?.album_type,
        main_image_path: itemData?.main_image_path,
        grid_image_path: itemData?.grid_image_path,
        thumb_image_path: itemData?.thumb_image_path,
        published_at: itemData?.published_at
          ? getMomentDateFormat(itemData.published_at, 'YYYY-MM-DD')
          : '',
        archived_at: itemData?.archived_at
          ? getMomentDateFormat(itemData.archived_at, 'YYYY-MM-DD')
          : '',
        row_status: String(itemData?.row_status),
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
      if (authUser?.isSystemUser) {
        changeShowInAction(itemData?.show_in);
      }
    } else {
      reset(initialValues);
    }
  }, [itemData, allLanguages]);

  const changeShowInAction = useCallback((id: number) => {
    (async () => {
      setIsLoadingSectionNameList(true);

      if (id != ShowInTypes.TSP) {
        setValue('institute_id', '');
      }
      if (id != ShowInTypes.INDUSTRY) {
        setValue('organization_id', '');
      }

      if (id != ShowInTypes.INDUSTRY_ASSOCIATION) {
        setValue('industry_association_id', '');
      }

      try {
        if (id === ShowInTypes.TSP && instituteList.length == 0) {
          const response = await getAllInstitutes({
            row_status: RowStatus.ACTIVE,
          });
          if (response && response?.data) {
            setInstituteList(response.data);
          }
        } else if (id == ShowInTypes.INDUSTRY && industryList.length == 0) {
          const response = await getAllOrganizations({
            row_status: RowStatus.ACTIVE,
          });
          if (response && response?.data) {
            setIndustryList(response.data);
          }
        } else if (
          id == ShowInTypes.INDUSTRY_ASSOCIATION &&
          industryAssociationList.length == 0
        ) {
          const response = await getAllIndustryAssociations({
            row_status: RowStatus.ACTIVE,
          });
          if (response && response?.data) {
            setIndustryAssociationList(response.data);
          }
        }
      } catch (e) {}

      setShowInId(id);
      setIsLoadingSectionNameList(false);
    })();
  }, []);

  /*  console.log('selected codes', selectedCodes);*/

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

  const onSubmit: SubmitHandler<any> = async (formData: any) => {
    try {
      console.log('formData: ', formData);
      if (!authUser?.isSystemUser) {
        delete formData.show_in;
        delete formData.institute_id;
        delete formData.organization_id;
        delete formData.industry_association_id;
      }

      if (formData.show_in != ShowInTypes.TSP) {
        delete formData.institute_id;
      }
      if (formData.show_in != ShowInTypes.INDUSTRY) {
        delete formData.organization_id;
      }
      if (formData.show_in != ShowInTypes.INDUSTRY_ASSOCIATION) {
        delete formData.industry_association_id;
      }

      let data = {...formData};

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
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
        </>
      }>
      <Grid container spacing={5}>
        {authUser?.isSystemUser && (
          <React.Fragment>
            <Grid item xs={12} md={6}>
              <CustomFilterableFormSelect
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
            {showInId == ShowInTypes.INDUSTRY_ASSOCIATION && (
              <Grid item xs={12} md={6}>
                <CustomFilterableFormSelect
                  required
                  id={'industry_association_id'}
                  label={messages['common.industry_association']}
                  isLoading={isLoadingSectionNameList}
                  control={control}
                  options={industryAssociationList}
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
            required
            id='title'
            label={messages['common.title']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
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
          <CustomFilterableFormSelect
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
          <CustomFilterableFormSelect
            id='program_id'
            label={messages['programme.label']}
            isLoading={isLoadingProgramme}
            control={control}
            options={programmes}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            id='course_id'
            label={messages['course.label']}
            isLoading={isLoadingCourse}
            control={control}
            options={courses}
            optionValueProp={'id'}
            optionTitleProp={['title', 'title_en']}
            errorInstance={errors}
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
          <CustomFilterableFormSelect
            required
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
        <Grid item xs={12} md={6}>
          <FileUploadComponent
            id='main_image_path'
            defaultFileUrl={itemData?.main_image_path}
            errorInstance={errors}
            setValue={setValue}
            register={register}
            label={messages['common.main_image_path']}
            required={true}
            height={'400'}
            width={'1080'}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FileUploadComponent
            id='grid_image_path'
            defaultFileUrl={itemData?.grid_image_path}
            errorInstance={errors}
            setValue={setValue}
            register={register}
            label={messages['common.grid_image_path']}
            required={false}
          />
        </Grid>
        <Grid item xs={12}>
          <FileUploadComponent
            id='thumb_image_path'
            defaultFileUrl={itemData?.thumb_image_path}
            errorInstance={errors}
            setValue={setValue}
            register={register}
            label={messages['common.thumb_image_path']}
            required={false}
          />
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
            {messages['gallery_album.add_language']}
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
