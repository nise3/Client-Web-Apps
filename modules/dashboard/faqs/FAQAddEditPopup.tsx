import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
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
  language: '',
  other_language_fields: '',
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
  console.log('item dara: ', itemData);

  const {data: cmsGlobalConfig, isLoading: isFetching} =
    useFetchCMSGlobalConfig();

  const [instituteList, setInstituteList] = useState([]);
  const [industryList, setIndustryList] = useState([]);
  const [isLoadingSectionNameList, setIsLoadingSectionNameList] =
    useState<boolean>(false);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
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
    if (itemData) {
      reset({
        show_in: itemData?.show_in,
        institute_id: itemData?.institute_id,
        organization_id: itemData?.organization_id,
        industry_association_id: itemData?.industry_association_id,
        question: itemData?.question,
        answer: itemData?.answer,
        row_status: itemData?.row_status,
        other_language_fields: itemData?.other_language_fields,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const changeShowInAction = async (showInId: number) => {
    setIsLoadingSectionNameList(true);
    if (showInId === 3) {
      const institutes = await getAllInstitutes();
      setIndustryList([]);
      setInstituteList(institutes);
      setIsLoadingSectionNameList(false);
    } else if (showInId == 4) {
      const industries = await getAllIndustries();
      setInstituteList([]);
      setIndustryList(industries);
      setIsLoadingSectionNameList(false);
    } else {
      setIndustryList([]);
      setInstituteList([]);
      setIsLoadingSectionNameList(false);
    }
  };

  const onSubmit: SubmitHandler<FAQ> = async (data: FAQ) => {
    try {
      /*data.mobile_numbers = getValuesFromObjectArray(data.mobile_numbers);*/
      /*data.other_language_fields = [];*/

      console.log('submitted data: ', data);

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
        {/*{(instituteList?.length > 0 || industryList?.length > 0) && (*/}
        <Grid item container xs={12} md={6}>
          {instituteList?.length > 0 && (
            <CustomFilterableFormSelect
              required
              id='institute_id'
              label={messages['common.select']}
              isLoading={isLoadingSectionNameList}
              control={control}
              options={instituteList}
              optionValueProp={'id'}
              optionTitleProp={['title']}
              errorInstance={errors}
            />
          )}
          {industryList?.length > 0 && (
            <CustomFilterableFormSelect
              required
              id='organization_id'
              label={messages['common.select']}
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
        {/*<Grid item container xs={12} md={6}>
          <CustomFieldArray
            id='phone_numbers'
            labelLanguageId={'common.phone'}
            isLoading={isLoading}
            control={control}
            register={register}
            errors={errors}
          />
        </Grid>*/}
      </Grid>
      <Grid container spacing={5}>
        {Object.keys(itemData?.other_language_fields || {}).map(
          (key: string) =>
            itemData?.other_language_fields.hasOwnProperty(key) && (
              <>
                <Grid item xs={12} md={9} />
                <Grid item xs={8} md={3}>
                  {cmsGlobalConfig.language_configs?.length > 0 && (
                    <CustomFilterableFormSelect
                      required
                      id='organization_id'
                      label={messages['common.select']}
                      isLoading={isFetching}
                      control={control}
                      options={cmsGlobalConfig.language_configs}
                      optionValueProp={'id'}
                      optionTitleProp={['native_name']}
                      errorInstance={errors}
                    />
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomTextInput
                    required
                    id='question'
                    label={messages['faq.question']}
                    register={register}
                    errorInstance={errors}
                  />
                </Grid>
                <Grid item xs={12} md={6} style={{marginBottom: '55px'}}>
                  <CustomTextInput
                    required
                    id='answer'
                    label={messages['faq.answer']}
                    register={register}
                    errorInstance={errors}
                  />
                </Grid>
              </>
            ),
        )}
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
