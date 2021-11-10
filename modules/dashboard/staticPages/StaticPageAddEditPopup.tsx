import yup from '../../../@softbd/libs/yup';
import Grid from '@mui/material/Grid';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {Add, Delete, WorkOutline} from '@mui/icons-material';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {
  useFetchCMSGlobalConfigs,
  useFetchStaticPage,
} from '../../../services/cmsManagement/hooks';
import {
  createStaticPage,
  updateStaticPage,
} from '../../../services/cmsManagement/StaticPageService';
import ShowInTypes from '../../../@softbd/utilities/ShowInTypes';
import LanguageCodes from '../../../@softbd/utilities/LanguageCodes';
import {
  getAllIndustries,
  getAllInstitutes,
} from '../../../services/cmsManagement/FAQService';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import {Box, Button, IconButton} from '@mui/material';
import TextEditor from '../../../@softbd/components/editor/TextEditor';

interface StaticPageAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title: '',
  sub_title: '',
  show_in: '',
  content_slug_or_id: '',
  institute_id: '',
  organization_id: '',
  content_type: '',
  contents: '',
  row_status: '1',
};

const StaticPageAddEditPopup: FC<StaticPageAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const isEdit = itemId != null;
  const authUser = useAuthUser();
  const [globalConfigFilters] = useState<any>({});
  const {data: cmsGlobalConfig, isLoading: isLoadingConfigData} =
    useFetchCMSGlobalConfigs(globalConfigFilters);
  let showIns = useRef(cmsGlobalConfig?.show_in);

  useEffect(() => {
    showIns.current = cmsGlobalConfig?.show_in;
  }, [cmsGlobalConfig]);

  const {
    data: itemData,
    isLoading,
    mutate: mutateStaticPage,
  } = useFetchStaticPage(itemId);

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
  const textEditorRef = useRef<any>(null);
  const contentRefs = useRef<Array<any | null>>([]);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      show_in:
        authUser && authUser.isSystemUser
          ? yup
              .string()
              .required()
              .label(messages['common.show_in'] as string)
          : yup.string(),
      content_slug_or_id: yup
        .string()
        .required()
        .label(messages['common.content_slug_or_id'] as string),
      title: yup
        .string()
        .title()
        .label(messages['common.title'] as string),
      sub_title: yup.string(),
      institute_id: yup
        .string()
        .label(messages['common.institute'] as string)
        .when('show_in', {
          is: (val: number) => {
            return val == ShowInTypes.TSP;
          },
          then: yup.string().required(),
        }),
      organization_id: yup
        .string()
        .label(messages['common.organization_bn'] as string)
        .when('show_in', {
          is: (val: number) => {
            return val == ShowInTypes.INDUSTRY;
          },
          then: yup.string().required(),
        }),
      content_type: yup
        .string()
        .required()
        .label(messages['common.content_type'] as string),
      contents: yup.string(),
      row_status: yup.string().trim().required(),
      language_en: !selectedCodes.includes(LanguageCodes.ENGLISH)
        ? yup.object().shape({})
        : yup.object().shape({
            title: yup
              .string()
              .trim()
              .required()
              .label(messages['common.title'] as string),
            sub_title: yup
              .string()
              .trim()
              .required()
              .label(messages['common.sub_title'] as string),
            contents: yup
              .string()
              .trim()
              .required()
              .label(messages['faq.contents'] as string),
          }),
      language_hi: !selectedCodes.includes(LanguageCodes.HINDI)
        ? yup.object().shape({})
        : yup.object().shape({
            title: yup
              .string()
              .trim()
              .required()
              .label(messages['common.title'] as string),
            sub_title: yup
              .string()
              .trim()
              .required()
              .label(messages['common.sub_title'] as string),
            contents: yup
              .string()
              .trim()
              .required()
              .label(messages['faq.contents'] as string),
          }),
      language_te: !selectedCodes.includes(LanguageCodes.TELEGU)
        ? yup.object().shape({})
        : yup.object().shape({
            title: yup
              .string()
              .trim()
              .required()
              .label(messages['common.title'] as string),
            sub_title: yup
              .string()
              .trim()
              .required()
              .label(messages['common.sub_title'] as string),
            contents: yup
              .string()
              .trim()
              .required()
              .label(messages['faq.contents'] as string),
          }),
    });
  }, [messages, selectedCodes, authUser]);

  const {
    register,
    reset,
    control,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<StaticPage>({
    resolver: yupResolver(validationSchema),
  });

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
        show_in: itemData?.show_in,
        content_slug_or_id: itemData?.content_slug_or_id,
        title: itemData?.title,
        sub_title: itemData?.sub_title,
        organization_id: itemData?.organization_id,
        institute_id: itemData?.institute_id,
        content_type: itemData?.content_type,
        contents: itemData?.contents,
        row_status: String(itemData?.row_status),
      };

      const otherLangData = itemData?.other_language_fields;

      if (otherLangData) {
        let keys: any = Object.keys(otherLangData);
        keys.map((key: string) => {
          data['language_' + key] = {
            code: key,
            title: otherLangData[key].title,
            sub_title: otherLangData[key].sub_title,
            contents: otherLangData[key].contents,
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
      changeShowInAction(itemData?.show_in);
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const CONTENT_TYPES = useMemo(
    () => [
      {id: 1, title: 'Image', title_en: 'Image'},
      {id: 2, title: 'Video', title_en: 'Video'},
      {id: 3, title: 'Youtube', title_en: 'Youtube'},
    ],
    [],
  );

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

  const onLanguageListChange = useCallback((selected: any) => {
    setSelectedLanguageCode(selected);
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

  const isValidContents = () => {
    contentRefs.current.map((refs: any) => {
      console.log('refs:', refs);
      if (refs?.editor?.getContent()?.length < 5) {
        setError(refs.id, {
          // @ts-ignore
          message: {
            key: 'yup_validation_required_field',
            values: {path: messages['common.contents']},
          },
        });

        return false;
      }
      return true;
    });
  };

  const onSubmit: SubmitHandler<StaticPage> = async (data: StaticPage) => {
    try {
      if (authUser?.isInstituteUser) {
        data.institute_id = authUser?.institute_id;
        data.show_in = ShowInTypes.TSP;
      }

      if (authUser?.isOrganizationUser) {
        data.organization_id = authUser?.organization_id;
        data.show_in = ShowInTypes.INDUSTRY;
      }

      let formData = {...data};

      let otherLanguagesFields: any = {};
      delete formData.language_list;

      selectedLanguageList.map((language: any) => {
        const langObj = formData['language_' + language.code];

        otherLanguagesFields[language.code] = {
          question: langObj.question,
          answer: langObj.answer,
        };
      });
      delete formData['language_en'];
      delete formData['language_hi'];
      delete formData['language_te'];

      if (selectedLanguageList.length > 0)
        formData.other_language_fields = otherLanguagesFields;

      if (itemId) {
        await updateStaticPage(itemId, data);
        updateSuccessMessage('static_page.label');
        mutateStaticPage();
      } else {
        await createStaticPage(data);
        createSuccessMessage('static_page.label');
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
          <WorkOutline />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='static_page.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='static_page.label' />}}
            />
          )}
        </>
      }
      maxWidth={'md'}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
        </>
      }>
      <Grid container spacing={2}>
        {authUser && authUser.isSystemUser && (
          <Grid item xs={12} md={6}>
            <CustomFormSelect
              id='show_in'
              label={messages['common.show_in']}
              control={control}
              isLoading={isLoadingConfigData}
              options={showIns.current}
              optionValueProp={'id'}
              optionTitleProp={['title_en', 'title']}
              errorInstance={errors}
              onChange={changeShowInAction}
            />
          </Grid>
        )}
        {authUser && authUser.isSystemUser && showInId == ShowInTypes.TSP && (
          <Grid item xs={12} md={6}>
            <CustomFormSelect
              id='institute_id'
              label={messages['institute.label']}
              isLoading={isLoadingSectionNameList}
              control={control}
              options={instituteList}
              optionValueProp={'id'}
              optionTitleProp={['title_en', 'title']}
              errorInstance={errors}
            />
          </Grid>
        )}
        {authUser && authUser.isSystemUser && showInId == ShowInTypes.INDUSTRY && (
          <Grid item xs={12} md={6}>
            <CustomFormSelect
              id='organization_id'
              label={messages['organization.label']}
              isLoading={isLoadingSectionNameList}
              control={control}
              options={industryList}
              optionValueProp={'id'}
              optionTitleProp={['title_en', 'title']}
              errorInstance={errors}
            />
          </Grid>
        )}
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='content_slug_or_id'
            label={messages['common.content_slug_or_id']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
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
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='sub_title'
            label={messages['common.sub_title']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomFormSelect
            id='content_type'
            label={messages['common.content_type']}
            isLoading={isLoading}
            control={control}
            options={CONTENT_TYPES}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <TextEditor
            id='contents'
            label={messages['common.contents']}
            errorInstance={errors}
            ref={(el) => (contentRefs.current[0] = el?.editor)}
            initialValue={initialValues.contents}
            height={'200px'}
            key={1}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomFilterableFormSelect
            id={'language_list'}
            label={messages['common.language']}
            isLoading={isLoadingConfigData}
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
          {selectedLanguageList.map((language: any, index: number) => (
            <Box key={language.code} sx={{marginTop: '10px'}}>
              <fieldset style={{border: '1px solid #7e7e7e'}}>
                <legend style={{color: '#0a8fdc'}}>
                  {language.native_name}
                </legend>
                <Grid container spacing={5}>
                  <Grid item xs={5}>
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
                      required
                      id={'language_' + language.code + '[sub_title]'}
                      label={messages['common.sub_title']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                  <Grid item xs={1} md={1}>
                    <IconButton
                      aria-label='delete'
                      color={'error'}
                      onClick={() => {
                        onDeleteLanguage(language);
                      }}>
                      <Delete color={'error'} />
                    </IconButton>
                  </Grid>

                  <Grid item xs={12}>
                    <TextEditor
                      id={'language_' + language.code + '[contents]'}
                      label={messages['common.contents']}
                      errorInstance={errors}
                      ref={(el) => {
                        console.log('el', el?.editor?.id);
                        return (contentRefs.current[index + 1] = el?.editor);
                      }}
                      initialValue={initialValues.contents}
                      height={'200px'}
                      key={language.code}
                    />
                  </Grid>
                </Grid>
              </fieldset>
            </Box>
          ))}
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

export default StaticPageAddEditPopup;
