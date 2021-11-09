import {Box, Button, Grid, IconButton} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconInstitute from '../../../@softbd/icons/IconInstitute';
import {useFetchFAQ} from '../../../services/instituteManagement/hooks';
import yup from '../../../@softbd/libs/yup';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import {useFetchCMSGlobalConfig} from '../../../services/cmsManagement/hooks';
import {
  createFAQ,
  getAllIndustries,
  getAllInstitutes,
  updateFAQ,
} from '../../../services/cmsManagement/FAQService';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import {Add, Delete} from '@mui/icons-material';

interface FAQAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  show_in: '',
  institute_id: '',
  organization_id: '',
  question: '',
  answer: '',
  row_status: '1',
};

const FAQAddEditPopup: FC<FAQAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const isEdit = itemId != null;
  const {data: itemData, isLoading, mutate: mutateFAQ} = useFetchFAQ(itemId);

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
      show_in: yup
        .string()
        .trim()
        .required()
        .label(messages['faq.show_in'] as string),
      question: yup
        .string()
        .trim()
        .required()
        .label(messages['faq.question'] as string),
      answer: yup
        .string()
        .trim()
        .required()
        .label(messages['faq.answer'] as string),
      language_en: !selectedCodes.includes('en')
        ? yup.object().shape({})
        : yup.object().shape({
            question: yup
              .string()
              .trim()
              .required()
              .label(messages['faq.question'] as string),
            answer: yup
              .string()
              .trim()
              .required()
              .label(messages['faq.answer'] as string),
          }),
      language_hi: !selectedCodes.includes('hi')
        ? yup.object().shape({})
        : yup.object().shape({
            question: yup
              .string()
              .trim()
              .required()
              .label(messages['faq.question'] as string),
            answer: yup
              .string()
              .trim()
              .required()
              .label(messages['faq.answer'] as string),
          }),
      language_te: !selectedCodes.includes('te')
        ? yup.object().shape({})
        : yup.object().shape({
            question: yup
              .string()
              .trim()
              .required()
              .label(messages['faq.question'] as string),
            answer: yup
              .string()
              .trim()
              .required()
              .label(messages['faq.answer'] as string),
          }),
    });
  }, [messages, selectedCodes]);

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

  useEffect(() => {
    if (cmsGlobalConfig) {
      const filteredLanguage = cmsGlobalConfig.language_configs?.filter(
        (item: any) => item.code != 'bn',
      );

      setAllLanguages(filteredLanguage);
      setLanguageList(filteredLanguage);
    }
  }, [cmsGlobalConfig]);

  useEffect(() => {
    if (itemData) {
      let data: any = {
        show_in: itemData?.show_in,
        institute_id: itemData?.institute_id,
        organization_id: itemData?.organization_id,
        industry_association_id: itemData?.industry_association_id,
        question: itemData?.question,
        answer: itemData?.answer,
        row_status: itemData?.row_status,
      };

      const otherLangData = itemData?.other_language_fields;

      if (otherLangData) {
        let keys: any = Object.keys(otherLangData);
        keys.map((key: string) => {
          data['language_' + key] = {
            code: key,
            question: otherLangData[key].question,
            answer: otherLangData[key].answer,
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
  }, [itemData, allLanguages]);

  const changeShowInAction = useCallback((id: number) => {
    (async () => {
      setIsLoadingSectionNameList(true);
      if (id === 3) {
        const institutes = await getAllInstitutes();
        setIndustryList([]);
        setInstituteList(institutes);
      } else if (id == 4) {
        const industries = await getAllIndustries();
        setInstituteList([]);
        setIndustryList(industries);
      } else {
        setIndustryList([]);
        setInstituteList([]);
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
    try {
      let data = {...formData};

      let otherLanguagesFields: any = {};
      delete data.language_list;

      selectedLanguageList.map((language: any) => {
        const langObj = formData['language_' + language.code];

        otherLanguagesFields[language.code] = {
          question: langObj.question,
          answer: langObj.answer,
        };
      });
      delete data['language_en'];
      delete data['language_hi'];
      delete data['language_te'];

      if (selectedLanguageList.length > 0)
        data.other_language_fields = otherLanguagesFields;

      //console.log('submitted data: ', data);

      if (itemId) {
        await updateFAQ(itemId, data);
        updateSuccessMessage('institute.label');
        mutateFAQ();
      } else {
        await createFAQ(data);
        createSuccessMessage('institute.label');
      }
      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <HookFormMuiModal
      {...props}
      open={true}
      title={
        <>
          <IconInstitute />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='institute.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='institute.label' />}}
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
            required
            id={'show_in'}
            label={messages['faq.show_in']}
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
          {showInId == 3 && (
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
          {showInId == 4 && (
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
        <Grid item xs={12}>
          <CustomTextInput
            required
            id={'question'}
            label={messages['faq.question']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextInput
            required
            id={'answer'}
            label={messages['faq.answer']}
            register={register}
            errorInstance={errors}
            multiline={true}
            rows={3}
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
            Add FAQ in Other Language
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
                      id={'language_' + language.code + '[question]'}
                      label={messages['faq.question']}
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
                      id={'language_' + language.code + '[answer]'}
                      label={messages['faq.answer']}
                      register={register}
                      errorInstance={errors}
                      multiline={true}
                      rows={3}
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
export default FAQAddEditPopup;
