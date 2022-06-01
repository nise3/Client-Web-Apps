import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {
  useFetchLocalizedCMSGlobalConfig,
  useFetchRecentActivity,
} from '../../../services/cmsManagement/hooks';
import yup from '../../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  createRecentActivities,
  updateRecentActivity,
} from '../../../services/cmsManagement/RecentActivityService';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {Box, Button, Grid, IconButton} from '@mui/material';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import TextEditor from '../../../@softbd/components/editor/TextEditor';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';
import ShowInTypes from '../../../@softbd/utilities/ShowInTypes';
import LanguageCodes from '../../../@softbd/utilities/LanguageCodes';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import {Add, Delete} from '@mui/icons-material';
import ContentTypes from './ContentTypes';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import {getMomentDateFormat} from '../../../@softbd/utilities/helpers';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import {getAllOrganizations} from '../../../services/organaizationManagement/OrganizationService';
import {getAllIndustryAssociations} from '../../../services/IndustryAssociationManagement/IndustryAssociationService';
import {getAllInstitutes} from '../../../services/instituteManagement/InstituteService';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import IconVideo from '../../../@softbd/icons/IconVideo';

interface RecentActivitiesAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title: '',
  title_en: '',
  institute_id: '',
  organization_id: '',
  industry_association_id: '',
  show_in: '',
  description: '',
  content_type: '',
  collage_image_path: '',
  collage_position: '',
  thumb_image_path: '',
  grid_image_path: '',
  image_alt_title: '',
  image_path: '',
  video_id: '',
  video_url: '',
  row_status: '1',
};

const RecentActivitiesAddEditPopup: FC<RecentActivitiesAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const authUser = useAuthUser<CommonAuthUser>();

  const isEdit = itemId != null;
  const {
    data: itemData,
    isLoading,
    mutate: mutateRecentActivity,
  } = useFetchRecentActivity(itemId);

  const {data: cmsGlobalConfig, isLoading: isFetching} =
    useFetchLocalizedCMSGlobalConfig();

  const [instituteList, setInstituteList] = useState([]);
  const [industryList, setIndustryList] = useState([]);
  const [industryAssociationList, setIndustryAssociationList] = useState([]);
  const [isLoadingSectionNameList, setIsLoadingSectionNameList] =
    useState<boolean>(false);
  const [showInId, setShowInId] = useState<number | null>(null);
  const [allLanguages, setAllLanguages] = useState<any>([]);
  const [languageList, setLanguageList] = useState<any>([]);
  const [selectedLanguageList, setSelectedLanguageList] = useState<any>([]);
  const [selectedLanguageCode, setSelectedLanguageCode] = useState<
    string | null
  >(null);
  const [selectedCodes, setSelectedCodes] = useState<Array<string>>([]);
  const [selectedContentType, setSelectedContentType] = useState<number | null>(
    null,
  );
  const [hasCollagePosition, setHasCollagePosition] = useState<boolean>(false);

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

      content_type: yup
        .string()
        .required()
        .label(messages['common.content_type'] as string),
      image_path: yup
        .mixed()
        .label(messages['common.image_path'] as string)
        .when('content_type', {
          is: (val: number) => val == ContentTypes.IMAGE,
          then: yup.string().required(),
        }),
      collage_position: yup
        .mixed()
        .label(messages['common.collage_position'] as string)
        .test('collage_position', (value) => !value || value),
      collage_image_path: yup
        .mixed()
        .label(messages['common.collage_image_path'] as string)
        .when('collage_position', {
          is: () => {
            return hasCollagePosition;
          },
          then: yup.string().required(),
        }),
      video_id: yup
        .mixed()
        .label(messages['common.video_id'] as string)
        .when('content_type', {
          is: (val: number) => val != ContentTypes.IMAGE,
          then: yup.string().required(),
        }),
      video_url: yup
        .mixed()
        .label(messages['common.video_url'] as string)
        .when('content_type', {
          is: (val: number) => val != ContentTypes.IMAGE,
          then: yup.string().required(),
        }),
      show_in:
        authUser && authUser.isSystemUser
          ? yup
              .string()
              .trim()
              .required()
              .label(messages['common.show_in'] as string)
          : yup.string(),
      institute_id: yup
        .mixed()
        .label(messages['common.institute'] as string)
        .when('show_in', {
          is: (val: number) => {
            return val == ShowInTypes.TSP;
          },
          then: yup.string().required(),
        }),
      organization_id: yup
        .mixed()
        .label(messages['organization.label'] as string)
        .when('show_in', {
          is: (val: number) => {
            return val == ShowInTypes.INDUSTRY;
          },
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
    });
  }, [messages, selectedCodes, authUser, hasCollagePosition]);

  const {
    register,
    control,
    reset,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const CONTENT_TYPES = useMemo(
    () => [
      {id: ContentTypes.IMAGE, title: messages['content_type.image']},
      {
        id: ContentTypes.FACEBOOK_SOURCE,
        title: messages['content_type.facebook_video'],
      },
      {
        id: ContentTypes.YOUTUBE_SOURCE,
        title: messages['content_type.youtube_video'],
      },
    ],
    [messages],
  );

  const collagePosition = useMemo(
    () => [
      {
        id: 1,
        label: messages['collage_position.left'],
      },
      {
        id: 2,
        label: messages['collage_position.right_top'],
      },
      {
        id: 3,
        label: messages['collage_position.right_bottom_1'],
      },
      {
        id: 4,
        label: messages['collage_position.right_bottom_2'],
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

  useEffect(() => {
    if (itemData) {
      let data: any = {
        title: itemData?.title,
        institute_id: itemData?.institute_id,
        organization_id: itemData?.organization_id,
        industry_association_id: itemData?.industry_association_id,
        show_in: itemData?.show_in,
        content_type: itemData?.content_type,
        collage_position: itemData?.collage_position,
        image_alt_title: itemData?.image_alt_title,
        video_id: itemData?.video_id,
        video_url: itemData?.video_url,
        image_path: itemData?.image_path,
        grid_image_path: itemData?.grid_image_path,
        collage_image_path: itemData?.collage_image_path,
        thumb_image_path: itemData?.thumb_image_path,
        published_at: itemData?.published_at
          ? getMomentDateFormat(itemData.published_at, 'YYYY-MM-DD')
          : '',
        archived_at: itemData?.archived_at
          ? getMomentDateFormat(itemData.archived_at, 'YYYY-MM-DD')
          : '',
        row_status: itemData?.row_status,
        description: itemData?.description,
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
      setShowInId(itemData?.show_in);
      if (authUser?.isSystemUser) {
        changeShowInAction(itemData?.show_in);
      }
      setHasCollagePosition(!!itemData?.collage_position);
      setSelectedContentType(itemData?.content_type);
    } else {
      reset(initialValues);
    }
  }, [itemData, allLanguages, reset]);

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

      formData.other_language_fields = '';

      let data = {...formData};

      let otherLanguagesFields: any = {};
      delete data.language_list;

      selectedLanguageList.map((language: any) => {
        const langObj = formData['language_' + language.code];

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

      if (!data.archived_at) {
        data.archived_at = '';
      }
      if (itemId) {
        await updateRecentActivity(itemId, data);
        updateSuccessMessage('recent_activities.label');
        mutateRecentActivity();
      } else {
        await createRecentActivities(data);
        createSuccessMessage('recent_activities.label');
        mutateRecentActivity();
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
          <IconVideo />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{
                subject: <IntlMessages id='recent_activities.label' />,
              }}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{
                subject: <IntlMessages id='recent_activities.label' />,
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

            <Grid item xs={12} md={6}>
              {showInId == ShowInTypes.TSP && (
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
              )}
              {showInId == ShowInTypes.INDUSTRY && (
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
              )}
            </Grid>
          </React.Fragment>
        )}
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='title'
            label={messages['common.title']}
            control={control}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormSelect
            required
            id='content_type'
            isLoading={false}
            label={messages['common.content_type']}
            control={control}
            options={CONTENT_TYPES}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            errorInstance={errors}
            onChange={(id: number) => {
              setSelectedContentType(id);
            }}
          />
        </Grid>

        {selectedContentType && selectedContentType == ContentTypes.IMAGE && (
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
              height={'550'}
              width={'1080'}
            />
          </Grid>
        )}

        {selectedContentType && selectedContentType != ContentTypes.IMAGE && (
          <React.Fragment>
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
          </React.Fragment>
        )}

        <Grid item xs={12} md={6}>
          <CustomFormSelect
            id='collage_position'
            label={messages['common.collage_position']}
            isLoading={false}
            control={control}
            options={collagePosition}
            optionValueProp={'id'}
            optionTitleProp={['label']}
            errorInstance={errors}
            onChange={(position: number) => {
              setHasCollagePosition(!!position);
            }}
          />
        </Grid>

        {hasCollagePosition && (
          <Grid item xs={12} md={6}>
            <FileUploadComponent
              id='collage_image_path'
              defaultFileUrl={itemData?.collage_image_path}
              errorInstance={errors}
              setValue={setValue}
              register={register}
              label={messages['common.collage_image_path']}
              required={true}
              acceptedFileTypes={['image/*']}
              height={'500'}
              width={'500'}
            />
          </Grid>
        )}

        <Grid item xs={12} md={6}>
          <FileUploadComponent
            id='grid_image_path'
            defaultFileUrl={itemData?.grid_image_path}
            errorInstance={errors}
            setValue={setValue}
            register={register}
            label={messages['common.grid_image_path']}
            required={false}
            acceptedFileTypes={['image/*']}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FileUploadComponent
            id='thumb_image_path'
            defaultFileUrl={itemData?.thumb_image_path}
            errorInstance={errors}
            setValue={setValue}
            register={register}
            label={messages['common.thumb_image_path']}
            required={false}
            acceptedFileTypes={['image/*']}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='image_alt_title'
            label={messages['common.image_alt_title']}
            control={control}
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
            {messages['recent_activities.add_language']}
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
                  <Grid item xs={11}>
                    <CustomTextInput
                      required
                      id={'language_' + language.code + '[title]'}
                      label={messages['common.title']}
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
                    <CustomTextInput
                      id={'language_' + language.code + '[image_alt_title]'}
                      label={messages['common.image_alt_title']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={12}>
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

export default RecentActivitiesAddEditPopup;
