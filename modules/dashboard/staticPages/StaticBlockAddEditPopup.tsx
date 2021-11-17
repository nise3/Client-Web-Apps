import yup from '../../../@softbd/libs/yup';
import Grid from '@mui/material/Grid';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
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
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {useFetchCMSGlobalConfig} from '../../../services/cmsManagement/hooks';
import ShowInTypes from '../../../@softbd/utilities/ShowInTypes';
import LanguageCodes from '../../../@softbd/utilities/LanguageCodes';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import {Box, Button, IconButton} from '@mui/material';
import TextEditor from '../../../@softbd/components/editor/TextEditor';
import {
  getStaticPageOrBlockByPageCode,
  updateStaticPage,
} from '../../../services/cmsManagement/StaticPageService';
import ContentTypes from '../recentActivities/ContentTypes';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import PageBlockTemplateTypes from './PageBlockTemplateTypes';

interface StaticBlockAddEditPopupProps {
  pageCode: string;
  onClose: () => void;
}

const initialValues = {
  title: '',
  content: '',
  is_attachment_available: '0',
  attachment_type: '',
  template_code: '',
  is_button_available: '0',
  row_status: '1',
};

const StaticBlockAddEditPopup: FC<StaticBlockAddEditPopupProps> = ({
  pageCode,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {updateSuccessMessage} = useSuccessMessage();
  const authUser = useAuthUser();
  const {data: cmsGlobalConfig, isLoading: isLoadingConfigData} =
    useFetchCMSGlobalConfig();

  const [allLanguages, setAllLanguages] = useState<any>([]);
  const [languageList, setLanguageList] = useState<any>([]);
  const [selectedLanguageList, setSelectedLanguageList] = useState<any>([]);
  const [selectedLanguageCode, setSelectedLanguageCode] = useState<
    string | null
  >(null);
  const [selectedCodes, setSelectedCodes] = useState<Array<string>>([]);
  const [itemData, setItemData] = useState<any>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAttachmentAvailable, setIsAttachmentAvailable] =
    useState<boolean>(false);
  const [isButtonAvailable, setIsButtonAvailable] = useState<boolean>(true);
  const [selectedAttachmentType, setSelectedAttachmentType] = useState<
    number | null
  >(null);

  const templateCodes = useMemo(
    () => [
      {
        code: PageBlockTemplateTypes.PBT_CB,
        title: messages['page_block.template_code_pbt_cb'],
      },
      {
        code: PageBlockTemplateTypes.PBT_LR,
        title: messages['page_block.template_code_pbt_lr'],
      },
      {
        code: PageBlockTemplateTypes.PBT_RL,
        title: messages['page_block.template_code_pbt_rl'],
      },
    ],
    [messages],
  );

  const attachmentTypes = useMemo(
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

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title()
        .label(messages['common.title'] as string),
      is_button_available: yup
        .string()
        .required()
        .label('common.is_button_available'),
      link: yup
        .string()
        .label(messages['common.link'] as string)
        .when('is_button_available', {
          is: (val: number) => {
            return val == 1;
          },
          then: yup.string().required(),
        }),
      button_text: yup
        .string()
        .label(messages['common.button_text'] as string)
        .when('is_button_available', {
          is: (val: number) => {
            return val == 1;
          },
          then: yup.string().required(),
        }),
      is_attachment_available: yup
        .string()
        .required()
        .label(messages['common.is_attachment_available'] as string),
      attachment_type: yup
        .string()
        .label(messages['common.attachment_type'] as string)
        .when('is_attachment_available', {
          is: (val: number) => {
            return val == 1;
          },
          then: yup.string().required(),
        }),
      /*image_path: yup
        .mixed()
        .label(messages['common.image_path'] as string)
        .when('attachment_type', {
          is: (val: number) => isAttachmentAvailable && val == ContentTypes.IMAGE,
          then: yup.string().required(),
        }),*/
      video_id: yup
        .mixed()
        .label(messages['common.video_id'] as string)
        .when('attachment_type', {
          is: (val: number) =>
            isAttachmentAvailable && val != ContentTypes.IMAGE,
          then: yup.string().required(),
        }),
      video_url: yup
        .mixed()
        .label(messages['common.video_url'] as string)
        .when('attachment_type', {
          is: (val: number) =>
            isAttachmentAvailable && val != ContentTypes.IMAGE,
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
  }, [messages, selectedCodes, authUser]);

  const {
    register,
    reset,
    control,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<StaticPage>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (authUser) {
      (async () => {
        setIsLoading(true);
        try {
          const response = await getStaticPageOrBlockByPageCode(pageCode, {
            show_in: ShowInTypes.NICE3,
          });
          if (response && response.data) setItemData(response.data);
        } catch (e) {}
        setIsLoading(false);
      })();
    }
  }, [authUser]);

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
        content: itemData?.content,
        is_attachment_available: itemData?.is_attachment_available,
        attachment_type: itemData?.attachment_type,
        template_code: itemData?.template_code,
        is_button_available: itemData?.is_button_available,
        button_text: itemData?.button_text,
        link: itemData?.link,
        video_url: itemData?.video_url,
        video_id: itemData?.video_id,
        image_alt_title: itemData?.image_alt_title,
        row_status: String(itemData?.row_status),
      };

      const otherLangData = itemData?.other_language_fields;

      if (otherLangData) {
        let keys: any = Object.keys(otherLangData);
        keys.map((key: string) => {
          data['language_' + key] = {
            code: key,
            title: otherLangData[key].title,
            button_text: otherLangData[key].button_text,
            alt_image_title: otherLangData[key].alt_image_title,
            content: otherLangData[key].content,
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
      setIsAttachmentAvailable(itemData?.is_attachment_available == 1);
      setIsButtonAvailable(itemData?.is_button_available == 1);
    } else {
      reset(initialValues);
      setIsAttachmentAvailable(false);
      setIsButtonAvailable(false);
    }
  }, [itemData, allLanguages]);

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

  const onSubmit: SubmitHandler<any> = async (formData: any) => {
    try {
      formData.image_path = 'http://lorempixel.com/400/200/';

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
          button_text: langObj.button_text,
          alt_image_title: langObj.alt_image_title,
          content: langObj.content,
        };
      });
      delete data['language_en'];
      delete data['language_hi'];
      delete data['language_te'];

      if (selectedLanguageList.length > 0)
        data.other_language_fields = otherLanguagesFields;

      await updateStaticPage(pageCode, data);
      updateSuccessMessage('static_page.label');
      props.onClose();
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
          <IntlMessages
            id='common.edit'
            values={{subject: <IntlMessages id='static_page.label' />}}
          />
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
      <Grid container spacing={5}>
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

        <Grid item container xs={12} md={6}>
          <CustomFilterableFormSelect
            id={'template_code'}
            label={messages['static_page.template_code']}
            isLoading={false}
            control={control}
            options={templateCodes}
            optionValueProp={'code'}
            optionTitleProp={['title']}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormRadioButtons
            id='is_attachment_available'
            label={'common.is_attachment_available'}
            control={control}
            radios={[
              {
                label: messages['common.yes'],
                key: 1,
              },
              {
                label: messages['common.no'],
                key: 0,
              },
            ]}
            defaultValue={initialValues.is_attachment_available}
            onChange={useCallback(() => {
              setIsAttachmentAvailable((prev) => !prev);
            }, [])}
          />
        </Grid>

        {isAttachmentAvailable && (
          <React.Fragment>
            <Grid item xs={12} md={6}>
              <CustomFilterableFormSelect
                required
                isLoading={false}
                id='attachment_type'
                label={messages['common.attachment_type']}
                control={control}
                options={attachmentTypes}
                optionValueProp={'id'}
                optionTitleProp={['title']}
                errorInstance={errors}
                onChange={(attachmentType: number) => {
                  setSelectedAttachmentType(attachmentType);
                }}
              />
            </Grid>

            {selectedAttachmentType &&
              selectedAttachmentType == ContentTypes.IMAGE && (
                <React.Fragment>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      required
                      id='image_path'
                      label={messages['common.image_path']}
                      type={'file'}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      control={control}
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
                </React.Fragment>
              )}

            {selectedAttachmentType &&
              selectedAttachmentType != ContentTypes.IMAGE && (
                <React.Fragment>
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
          </React.Fragment>
        )}

        <Grid item xs={12}>
          <FormRadioButtons
            id='is_button_available'
            label={'common.is_button_available'}
            control={control}
            radios={[
              {
                label: messages['common.yes'],
                key: 1,
              },
              {
                label: messages['common.no'],
                key: 0,
              },
            ]}
            defaultValue={initialValues.is_button_available}
            onChange={useCallback(() => {
              setIsButtonAvailable((prev) => !prev);
            }, [])}
          />
        </Grid>

        {isButtonAvailable && (
          <React.Fragment>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='link'
                label={messages['common.link']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='button_text'
                label={messages['common.button_text']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
          </React.Fragment>
        )}

        <Grid item xs={12} md={12}>
          <TextEditor
            id={'content'}
            label={messages['common.content']}
            errorInstance={errors}
            value={itemData?.content || initialValues.content}
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
                  <Grid item xs={10} md={11}>
                    <CustomTextInput
                      required
                      id={'language_' + language.code + '[title]'}
                      label={messages['common.title']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={2} md={1}>
                    <IconButton
                      aria-label='delete'
                      color={'error'}
                      onClick={() => {
                        onDeleteLanguage(language);
                      }}>
                      <Delete color={'error'} />
                    </IconButton>
                  </Grid>

                  {isAttachmentAvailable &&
                    selectedAttachmentType == ContentTypes.IMAGE && (
                      <Grid item xs={12} md={6}>
                        <CustomTextInput
                          id={'language_' + language.code + '[image_alt_title]'}
                          label={messages['common.image_alt_title']}
                          register={register}
                          errorInstance={errors}
                        />
                      </Grid>
                    )}

                  {isButtonAvailable && (
                    <Grid item xs={12} md={6}>
                      <CustomTextInput
                        required
                        id={'language_' + language.code + '[button_text]'}
                        label={messages['common.button_text']}
                        register={register}
                        errorInstance={errors}
                      />
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <TextEditor
                      id={'language_' + language.code + '[content]'}
                      label={messages['common.content']}
                      errorInstance={errors}
                      value={
                        itemData?.other_language_fields?.[language.code]
                          ?.content || initialValues.content
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

export default StaticBlockAddEditPopup;
