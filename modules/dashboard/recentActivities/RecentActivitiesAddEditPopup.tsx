import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {
  useFetchCMSGlobalConfig,
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
import {
  getAllIndustries,
  getAllInstitutes,
} from '../../../services/cmsManagement/FAQService';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import {Add, Delete} from '@mui/icons-material';

interface RecentActivitiesAddEditPopupProps {
  recentActivityId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const contentType = [
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
    label: 'Youtube Source',
  },
];

const collagePosition = [
  {
    id: 1,
    label: '1.1',
  },
  {
    id: 2,
    label: '1.2.1',
  },
  {
    id: 2,
    label: '1.2.2.1',
  },
  {
    id: 4,
    label: '1.2.2.2',
  },
];

const initialValues = {
  title: '',
  institute_id: '',
  organization_id: '',
  show_in: '',
  description: '',
  content_type: '',
  collage_image_path: '',
  collage_position: '',
  thumb_image_path: '',
  grid_image_path: '',
  image_alt_title: '',
  content_path: '',
  content_properties: '',
  embedded_id: '',
  embedded_url: '',
  row_status: '1',
};

const RecentActivitiesAddEditPopup: FC<RecentActivitiesAddEditPopupProps> = ({
  recentActivityId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const authUser = useAuthUser<CommonAuthUser>();
  const textEditorRef = useRef<any>(null);

  const isEdit = recentActivityId != null;
  const {
    data: recentActivityItem,
    isLoading,
    mutate: mutateRecentActivity,
  } = useFetchRecentActivity(recentActivityId);

  const {data: cmsGlobalConfig, isLoading: isFetching} =
    useFetchCMSGlobalConfig();

  const [instituteList, setInstituteList] = useState([]);
  const [industryList, setIndustryList] = useState([]);
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

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title()
        .required()
        .label(messages['common.title'] as string),
      content_type: yup
        .string()
        .required()
        .label(messages['common.content_type'] as string),
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
        .label(messages['common.organization_bn'] as string)
        .when('show_in', {
          is: (val: number) => {
            return val == ShowInTypes.INDUSTRY;
          },
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
            description: yup
              .string()
              .trim()
              .required()
              .label(messages['common.description'] as string),
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
            description: yup
              .string()
              .trim()
              .required()
              .label(messages['common.description'] as string),
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
            description: yup
              .string()
              .trim()
              .required()
              .label(messages['common.description'] as string),
          }),
    });
  }, [messages, selectedCodes, authUser]);

  const {
    register,
    control,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const isValidDescription = () => {
    if (textEditorRef.current?.editor?.getContent()?.length < 5) {
      setError('description', {
        // @ts-ignore
        message: {
          key: 'yup_validation_required_field',
          values: {path: messages['common.description']},
        },
      });

      return false;
    }
    return true;
  };

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
    if (isSubmitting) {
      isValidDescription();
    }
  }, [isSubmitting]);

  useEffect(() => {
    if (recentActivityItem) {
      let data: any = {
        title: recentActivityItem?.title,
        institute_id: recentActivityItem?.institute_id,
        organization_id: recentActivityItem?.organization_id,
        show_in: recentActivityItem?.show_in,
        content_type: recentActivityItem?.content_type,
        collage_image_path: recentActivityItem?.collage_image_path,
        collage_position: recentActivityItem?.collage_position,
        thumb_image_path: recentActivityItem?.thumb_image_path,
        grid_image_path: recentActivityItem?.grid_image_path,
        image_alt_title: recentActivityItem?.image_alt_title,
        content_path: recentActivityItem?.content_path,
        content_properties: recentActivityItem?.content_properties,
        embedded_id: recentActivityItem?.embedded_id,
        embedded_url: recentActivityItem?.embedded_url,
        row_status: recentActivityItem?.row_status,
        other_language_fields: recentActivityItem?.other_language_fields,
      };

      const otherLangData = recentActivityItem?.other_language_fields;

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
      setShowInId(recentActivityItem?.show_in);
      changeShowInAction(recentActivityItem?.show_in);
    } else {
      reset(initialValues);
    }
  }, [recentActivityItem, allLanguages, reset]);

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

  const onSubmit: SubmitHandler<any> = async (formData: any) => {
    if (!isValidDescription()) {
      return false;
    }

    try {
      formData.recentActivityId = formData.recentActivityId
        ? formData.recentActivityId
        : null;

      formData.other_language_fields = '';

      formData.description = textEditorRef.current?.editor?.getContent();

      formData.collage_image_path = 'http://lorempixel.com/400/200/';
      formData.thumb_image_path = 'http://lorempixel.com/400/200/';
      formData.grid_image_path = 'http://lorempixel.com/400/200/';

      if (authUser?.isInstituteUser) {
        formData.institute_id = authUser?.institute_id;
        formData.show_in = ShowInTypes.TSP;
      }

      if (authUser?.isOrganizationUser) {
        formData.organization_id = authUser?.organization_id;
        formData.show_in = ShowInTypes.INDUSTRY;
      }

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

      if (recentActivityId) {
        await updateRecentActivity(recentActivityId, data);
        updateSuccessMessage('recent_activities.institute');
        mutateRecentActivity();
      } else {
        await createRecentActivities(data);
        createSuccessMessage('recent_activities.institute');
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
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{
                subject: <IntlMessages id='recent_activities.institute' />,
              }}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{
                subject: <IntlMessages id='recent_activities.institute' />,
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
            options={contentType}
            optionValueProp={'id'}
            optionTitleProp={['label']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='collage_image_path'
            label={messages['common.collage_image_path']}
            control={control}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormSelect
            id='collage_position'
            label={messages['common.collage_position']}
            isLoading={false}
            control={control}
            options={collagePosition}
            optionValueProp={'label'}
            optionTitleProp={['label']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='thumb_image_path'
            label={messages['common.thumb_image_path']}
            control={control}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='grid_image_path'
            label={messages['common.grid_image_path']}
            control={control}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='image_alt_title'
            label={messages['common.image_alt_title']}
            control={control}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='content_path'
            label={messages['common.content_path']}
            control={control}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='content_properties'
            label={messages['common.content_properties']}
            control={control}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='embedded_id'
            label={messages['common.embedded_id']}
            control={control}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='embedded_url'
            label={messages['common.embedded_url']}
            control={control}
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
        <Grid item xs={12}>
          <TextEditor
            required
            id={'description'}
            label={messages['common.description']}
            errorInstance={errors}
            ref={textEditorRef}
            value={recentActivityItem?.description || initialValues.description}
            height={'300px'}
            key={1}
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
            {messages['faq.add_language']}
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
                      required
                      id={'language_' + language.code + '[image_alt_title]'}
                      label={messages['common.image_alt_title']}
                      register={register}
                      errorInstance={errors}
                      multiline={true}
                      rows={3}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextEditor
                      required
                      id={'language_' + language.code + ['description']}
                      label={messages['common.description']}
                      errorInstance={errors}
                      ref={textEditorRef}
                      value={
                        recentActivityItem?.other_language_fields?.[
                          language.code
                        ]?.description || initialValues.description
                      }
                      height={'300px'}
                      key={1}
                    />
                  </Grid>
                </Grid>
              </fieldset>
            </Box>
          ))}
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default RecentActivitiesAddEditPopup;
