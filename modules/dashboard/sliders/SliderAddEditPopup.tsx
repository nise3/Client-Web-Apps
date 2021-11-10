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
import {WorkOutline} from '@mui/icons-material';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import ShowInTypes from '../../../@softbd/utilities/ShowInTypes';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {
  createSlider,
  getAllIndustries,
  getAllInstitutes,
  updateSlider,
} from '../../../services/cmsManagement/SliderService';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import {
  useFetchCMSGlobalConfig,
  useFetchSlider,
} from '../../../services/cmsManagement/hooks';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import LanguageCodes from '../../../@softbd/utilities/LanguageCodes';

interface SliderAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title_en: '',
  title: '',
  sub_title: '',
  link: '',
  button_text: '',
  alt_title: '',
  is_button_available: '1',
  row_status: '1',
};

const SliderAddEditPopup: FC<SliderAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const isEdit = itemId != null;
  const authUser = useAuthUser();

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

  const {
    data: itemData,
    isLoading,
    mutate: mutateJobSector,
  } = useFetchSlider(itemId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title()
        .label(messages['common.title'] as string),
      sub_title: yup
        .string()
        .required()
        .label(messages['common.sub_title'] as string),
      slider_images: yup
        .string()
        .required()
        .label(messages['slider.images'] as string),
      institute_id: yup.string(),
      organization_id: yup.string(),
      is_button_available: yup
        .string()
        .required()
        .label('common.is_button_available'),
      link: yup.string(),
      button_text: yup.string(),
      alt_title: yup.string(),
      row_status: yup.string().trim().required(),
    });
  }, [messages]);
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

  useEffect(() => {
    if (cmsGlobalConfig) {
      const filteredLanguage = cmsGlobalConfig.language_configs?.filter(
        (item: any) => item.code != LanguageCodes.BANGLA,
      );

      setAllLanguages(filteredLanguage);
      setLanguageList(filteredLanguage);
    }
  }, [cmsGlobalConfig]);

  const [organizationFilters] = useState({row_status: RowStatus.ACTIVE});
  const [instituteFilters] = useState({row_status: RowStatus.ACTIVE});

  useEffect(() => {
    if (itemData) {
      reset({
        title: itemData?.title,
        sub_title: itemData?.sub_title,
        organization_id: itemData?.organization_id,
        institute_id: itemData?.institute_id,
        is_button_available: itemData?.is_button_available,
        button_text: itemData?.button_text,
        link: itemData?.link,
        alt_title: itemData?.alt_title,
        row_status: String(itemData?.row_status),
      });
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

  const onSubmit: SubmitHandler<JobSector> = async (data: any) => {
    try {
      if (itemId) {
        await updateSlider(itemId, data);
        updateSuccessMessage('slider.label');
        mutateJobSector();
      } else {
        await createSlider(data);
        createSuccessMessage('slider.label');
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
              values={{subject: <IntlMessages id='slider.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='slider.label' />}}
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
          <React.Fragment>
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

        <Grid item xs={6}>
          <CustomTextInput
            required
            id='title'
            label={messages['common.title']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='sub_title'
            label={messages['common.sub_title']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
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
                key: 2,
              },
            ]}
            defaultValue={initialValues.is_button_available}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            id='link'
            label={messages['common.link']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            id='button_text'
            label={messages['common.button_text']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            required
            id='slider_images'
            label={messages['slider.images']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='alt_title'
            label={messages['common.alt_title']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
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

export default SliderAddEditPopup;
