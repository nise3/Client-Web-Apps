import {Grid} from '@mui/material';
import {
  createInstitute,
  updateInstitute,
} from '../../../services/instituteManagement/InstituteService';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import {getValuesFromObjectArray} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconInstitute from '../../../@softbd/icons/IconInstitute';
import CustomFieldArray from '../../../@softbd/elements/input/CustomFieldArray';
import {useFetchFAQ} from '../../../services/instituteManagement/hooks';
import yup from '../../../@softbd/libs/yup';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import {useFetchCMSGlobalConfig} from '../../../services/cmsManagement/hooks';
import {
  getAllIndustries,
  getAllInstitutes,
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
  other_language_fields: [],
  row_status: '1',
};

let isLoadingSectionNameList: boolean = false;

const FAQAddEditPopup: FC<FAQAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const isEdit = itemId != null;
  const {
    data: itemData,
    isLoading,
    mutate: mutateInstitute,
  } = useFetchFAQ(itemId);

  const {data: cmsGlobalConfig, isLoading: isFetching} =
    useFetchCMSGlobalConfig();

  const [instituteList, setInstituteList] = useState([]);
  const [industryList, setIndustryList] = useState([]);

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

  /*  useEffect(() => {
    if (itemData) {
      reset({
        title_en: itemData?.title_en,
        title: itemData?.title,
      });

      /!*setDistrictsList(
        filterDistrictsByDivisionId(districts, itemData?.loc_division_id),
      );*!/
    } else {
      reset(initialValues);
    }
  }, [itemData, districts]);*/

  const changeShowInAction = async (showInId: number) => {
    isLoadingSectionNameList = true;
    if (showInId === 3) {
      const institutes = await getAllInstitutes();
      isLoadingSectionNameList = false;
      setIndustryList([]);
      setInstituteList(institutes);
    } else if (showInId == 4) {
      const industries = await getAllIndustries();
      isLoadingSectionNameList = false;
      setInstituteList([]);
      setIndustryList(industries);
    } else {
      return;
    }
  };

  const onSubmit: SubmitHandler<FAQ> = async (data: FAQ) => {
    try {
      console.log('the submitted data: ', data);
      /*data.mobile_numbers = getValuesFromObjectArray(data.mobile_numbers);*/

      if (itemId) {
        await updateInstitute(itemId, data);
        updateSuccessMessage('institute.label');
        mutateInstitute();
      } else {
        await createInstitute(data);
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
export default FAQAddEditPopup;
