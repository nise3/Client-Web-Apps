import {Grid} from '@mui/material';
import {
  createInstitute,
  updateInstitute,
} from '../../../services/instituteManagement/InstituteService';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
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
import {filterDistrictsByDivisionId} from '../../../services/locationManagement/locationUtils';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';

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
};

const show_in = [
  {id: 1, show_in: 'Show in Nise3'},
  {id: 2, show_in: 'Show in Youth'},
  {id: 3, show_in: 'Show in training service provider'},
  {id: 4, show_in: 'Show in organization'},
  {id: 5, show_in: 'Show in industry association'},
];

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

  const [showInSectionNameList, setShowInSectionNameList] = useState([]);

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
        title_en: itemData?.title_en,
        title: itemData?.title,
      });

      /*setDistrictsList(
        filterDistrictsByDivisionId(districts, itemData?.loc_division_id),
      );*/
    } else {
      reset(initialValues);
    }
  }, [itemData, districts]);

  const changeShowInAction = useCallback(
    (showInId: number) => {
      setDistrictsList(filterDistrictsByDivisionId(districts, showInId));
    },
    [districts],
  );

  const onSubmit: SubmitHandler<Institute> = async (data: Institute) => {
    try {
      data.mobile_numbers = getValuesFromObjectArray(data.mobile_numbers);

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
        <Grid item xs={6}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomFilterableFormSelect
                required
                id='show_in'
                label={messages['faq.show_in']}
                isLoading={isLoadingDivisions}
                control={control}
                options={show_in}
                optionValueProp={'id'}
                optionTitleProp={['show_in']}
                errorInstance={errors}
                onChange={changeShowInAction}
              />
              {/*<CustomFilterableFormSelect
                required
                id='loc_division_id'
                label={messages['faq.show_in']}
                isLoading={isLoadingDivisions}
                control={control}
                options={show_in}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title']}
                errorInstance={errors}
                onChange={changeDivisionAction}
              />*/}
            </Grid>
            <Grid item container xs={12}>
              <CustomFieldArray
                id='phone_numbers'
                labelLanguageId={'common.phone'}
                isLoading={isLoading}
                control={control}
                register={register}
                errors={errors}
              />
            </Grid>

            <Grid item xs={12}>
              <CustomTextInput
                required
                id='contact_person_designation'
                label={messages['common.contact_person_designation']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default FAQAddEditPopup;
