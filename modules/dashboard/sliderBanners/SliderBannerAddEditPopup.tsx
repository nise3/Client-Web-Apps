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
import {Add, Delete} from '@mui/icons-material';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import {
  useFetchCMSGlobalConfig,
  useFetchSliderBanner,
  useFetchSliders,
} from '../../../services/cmsManagement/hooks';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import LanguageCodes from '../../../@softbd/utilities/LanguageCodes';
import {Box, Button, IconButton} from '@mui/material';
import SliderTemplateShowTypes from '../sliderBanners/SliderTemplateShowTypes';
import {
  createSliderBanner,
  updateSliderBanner,
} from '../../../services/cmsManagement/SliderBannerService';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import IconSliderBanner from '../../../@softbd/icons/IconSliderBanner';

interface SliderBannerAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  slider_id: '',
  title: '',
  sub_title: '',
  banner_template_code: '',
  link: '',
  button_text: '',
  image_alt_title: '',
  is_button_available: '1',
  row_status: '1',
};

const SliderBannerAddEditPopup: FC<SliderBannerAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const authUser = useAuthUser();

  const isEdit = itemId != null;
  const {
    data: itemData,
    isLoading,
    mutate: mutateSliderBanner,
  } = useFetchSliderBanner(itemId);

  const {data: cmsGlobalConfig, isLoading: isFetching} =
    useFetchCMSGlobalConfig();

  const [sliderFilters, setSliderFilters] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: sliders, isLoading: isSliderLoading} =
    useFetchSliders(sliderFilters);

  const [allLanguages, setAllLanguages] = useState<any>([]);
  const [languageList, setLanguageList] = useState<any>([]);
  const [selectedLanguageList, setSelectedLanguageList] = useState<any>([]);
  const [selectedLanguageCode, setSelectedLanguageCode] = useState<
    string | null
  >(null);
  const [selectedCodes, setSelectedCodes] = useState<Array<string>>([]);

  const [isButtonAvailable, setIsButtonAvailable] = useState<boolean>(true);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      slider_id: yup
        .string()
        .trim()
        .required()
        .label(messages['slider.label'] as string),
      title: yup
        .string()
        .trim()
        .required()
        .label(messages['common.title'] as string),
      /*banner_image_path: yup
        .string()
        .required()
        .label(messages['common.image_path'] as string),*/
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
        .max(20)
        .label(messages['common.button_text'] as string)
        .when('is_button_available', {
          is: (val: number) => {
            return val == 1;
          },
          then: yup.string().required(),
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
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const templateCodes = useMemo(
    () => [
      {
        code: SliderTemplateShowTypes.BT_CB,
        title: messages['slider.template_code_bt_cb'],
      },
      {
        code: SliderTemplateShowTypes.BT_LR,
        title: messages['slider.template_code_bt_lr'],
      },
      {
        code: SliderTemplateShowTypes.BT_RL,
        title: messages['slider.template_code_bt_rl'],
      },
    ],
    [messages],
  );

  useEffect(() => {
    if (authUser) {
      if (authUser.isInstituteUser) {
        setSliderFilters({
          institute_id: authUser.institute_id,
        });
      } else if (authUser.isOrganizationUser) {
        setSliderFilters({
          organization_id: authUser.organization_id,
        });
      }
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
        slider_id: itemData?.slider_id,
        title: itemData?.title,
        sub_title: itemData?.sub_title,
        is_button_available: itemData?.is_button_available,
        button_text: itemData?.button_text,
        link: itemData?.link,
        image_alt_title: itemData?.image_alt_title,
        banner_template_code: itemData?.banner_template_code,
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
            image_alt_title: otherLangData[key].image_alt_title,
            button_text: otherLangData[key].button_text,
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
      setIsButtonAvailable(itemData?.is_button_available == 1);
    } else {
      reset(initialValues);
      setIsButtonAvailable(true);
    }
  }, [itemData, allLanguages]);

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
      formData.banner_image_path = 'http://lorempixel.com/400/200/';

      let data = {...formData};

      let otherLanguagesFields: any = {};
      delete data.language_list;

      selectedLanguageList.map((language: any) => {
        const langObj = formData['language_' + language.code];

        otherLanguagesFields[language.code] = {
          title: langObj.title,
          sub_title: langObj.sub_title,
          alt_title: langObj.alt_title,
          button_text: langObj.button_text,
        };
      });

      delete data['language_en'];
      delete data['language_hi'];
      delete data['language_te'];

      if (selectedLanguageList.length > 0)
        data.other_language_fields = otherLanguagesFields;

      if (itemId) {
        await updateSliderBanner(itemId, data);
        updateSuccessMessage('banners.label');
        mutateSliderBanner();
      } else {
        await createSliderBanner(data);
        createSuccessMessage('banners.label');
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
          <IconSliderBanner />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='banners.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='banners.label' />}}
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
      <Grid container spacing={5}>
        <Grid item container xs={12} md={6}>
          <CustomFilterableFormSelect
            required
            id={'slider_id'}
            label={messages['slider.label']}
            isLoading={isSliderLoading}
            control={control}
            options={sliders}
            optionValueProp={'id'}
            optionTitleProp={['title']}
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
          <CustomTextInput
            id='banner_image_path'
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

        <Grid item xs={12} md={6}>
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

        <Grid item container xs={12} md={6}>
          <CustomFilterableFormSelect
            id={'banner_template_code'}
            label={messages['slider.banner_template_code']}
            isLoading={false}
            control={control}
            options={templateCodes}
            optionValueProp={'code'}
            optionTitleProp={['title']}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={5}>
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

            <Grid item xs={12} md={6}>
              <Button
                variant={'outlined'}
                color={'primary'}
                onClick={onAddOtherLanguageClick}
                disabled={!selectedLanguageCode}>
                <Add />
                {messages['faq.add_language']}
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {selectedLanguageList.map((language: any) => (
            <Box key={language.code} sx={{marginTop: '10px'}}>
              <fieldset style={{border: '1px solid #7e7e7e'}}>
                <legend style={{color: '#0a8fdc'}}>
                  {language.native_name}
                </legend>
                <Grid container spacing={5}>
                  <Grid item xs={10} md={6}>
                    <CustomTextInput
                      required
                      id={'language_' + language.code + '[title]'}
                      label={messages['common.title']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                  <Grid item xs={12} md={5} order={{xs: 3, md: 2}}>
                    <CustomTextInput
                      id={'language_' + language.code + '[sub_title]'}
                      label={messages['common.sub_title']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                  <Grid item xs={2} md={1} order={{xs: 2, md: 3}}>
                    <IconButton
                      aria-label='delete'
                      color={'error'}
                      onClick={(event) => {
                        onDeleteLanguage(language);
                      }}>
                      <Delete color={'error'} />
                    </IconButton>
                  </Grid>

                  <Grid item xs={12} md={6} order={{xs: 4}}>
                    <CustomTextInput
                      id={'language_' + language.code + '[image_alt_title]'}
                      label={messages['common.image_alt_title']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                  {isButtonAvailable && (
                    <Grid item xs={12} md={6} order={{xs: 5}}>
                      <CustomTextInput
                        required
                        id={'language_' + language.code + '[button_text]'}
                        label={messages['common.button_text']}
                        register={register}
                        errorInstance={errors}
                      />
                    </Grid>
                  )}
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

export default SliderBannerAddEditPopup;
