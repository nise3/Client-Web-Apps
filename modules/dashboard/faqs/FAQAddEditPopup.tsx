import {Button, Divider, Grid} from '@mui/material';
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
import {Add} from '@mui/icons-material';

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
  const [otherLanguages, setOtherLanguages] = useState<Array<string>>([]);
  const [languageList, setLanguageList] = useState<any>([]);

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
    });
  }, [messages]);

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
      setLanguageList(
        cmsGlobalConfig.language_configs?.filter(
          (item: any) => item.code != 'bn',
        ),
      );
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
        let languageKeys: any = [];

        Object.keys(otherLangData).map((key: string, index: number) => {
          data['language_' + index] = {
            code: key,
            question: otherLangData[key].question,
            answer: otherLangData[key].answer,
          };
          languageKeys.push('language_' + index);
        });
        setOtherLanguages(languageKeys);
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
    let languageKeys = [...otherLanguages];
    languageKeys.push('language_' + languageKeys.length);
    setOtherLanguages(languageKeys);
  }, [otherLanguages]);

  const onSubmit: SubmitHandler<any> = async (formData: any) => {
    try {
      let data = {...formData};

      let otherLanguagesFields: any = {};
      otherLanguages.map((langKey: string) => {
        const langObj = formData[langKey];

        if (langObj.code) {
          otherLanguagesFields[langObj.code] = {
            question: langObj.question,
            answer: langObj.answer,
          };
        }

        delete data[langKey];
      });

      if (otherLanguages.length > 0)
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
      <Grid container spacing={5} style={{marginBottom: '55px'}}>
        <Grid item xs={12} md={6}>
          <CustomFormSelect
            required
            id='show_in'
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
              id='institute_id'
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
              id='organization_id'
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
        {/*)}*/}
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='question'
            label={messages['faq.question']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='answer'
            label={messages['faq.answer']}
            register={register}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant={'outlined'}
            color={'primary'}
            onClick={onAddOtherLanguageClick}>
            <Add />
            Add FAQ in Other Language
          </Button>
        </Grid>

        {otherLanguages.map((langKey: string) => (
          <React.Fragment key={langKey}>
            <Divider
              orientation={'horizontal'}
              sx={{
                width: 'calc(100% + 28px)',
                marginLeft: '-4px',
                marginTop: '20px',
              }}
            />
            <Grid item xs={12}>
              <Grid container spacing={5}>
                <Grid item xs={12} md={6}>
                  <CustomFilterableFormSelect
                    required
                    id={langKey + '[code]'}
                    label={messages['common.language']}
                    isLoading={isFetching}
                    control={control}
                    options={languageList}
                    optionValueProp={'code'}
                    optionTitleProp={['native_name']}
                    errorInstance={errors}
                  />
                </Grid>
                <Grid item xs={12} md={6} />
                <Grid item xs={12} md={6}>
                  <CustomTextInput
                    required
                    id={langKey + '[question]'}
                    label={messages['faq.question']}
                    register={register}
                    errorInstance={errors}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomTextInput
                    required
                    id={langKey + '[answer]'}
                    label={messages['faq.answer']}
                    register={register}
                    errorInstance={errors}
                  />
                </Grid>
              </Grid>
            </Grid>
          </React.Fragment>
        ))}

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
