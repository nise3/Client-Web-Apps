import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo} from 'react';
import {
  isResponseSuccess,
  isValidationError,
} from '../../../../@softbd/utilities/helpers';
import SubmitButton from '../../../../@softbd/elements/button/SubmitButton/SubmitButton';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {setServerValidationErrors} from '../../../../@softbd/utilities/validationErrorHandler';
import yup from '../../../../@softbd/libs/yup';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import CustomFormSelect from '../../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import FormRadioButtons from '../../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import {Grid, Zoom, Box} from '@mui/material';
import CancelButton from '../../../../@softbd/elements/button/CancelButton/CancelButton';
import {
  LanguageProficiencySpeakingType,
  LanguageProficiencyType,
} from '../utilities/LanguageProficiencyType';
import {useFetchLanguageProficiency} from '../../../../services/youthManagement/hooks';
import {YouthLanguageProficiency} from '../../../../services/youthManagement/typing';
import {
  createLanguageProficiency,
  updateLanguageProficiency,
} from '../../../../services/youthManagement/LanguageProficiencyService';
import CustomHookForm from '../component/CustomHookForm';

interface LanguageAddEditPageProps {
  itemId: number | null;
  onClose: () => void;
}

const languages = [
  {id: 1, title: 'বাংলা'},
  {id: 2, title: 'ইংরেজি'},
  {id: 3, title: 'স্পেনীয়'},
  {id: 4, title: 'আরবি'},
];
const initialValues = {
  language_id: '',
  reading_proficiency_level: LanguageProficiencyType.EASILY,
  writing_proficiency_level: LanguageProficiencyType.EASILY,
  speaking_proficiency_level: LanguageProficiencySpeakingType.FLUENTLY,
  understand_proficiency_level: LanguageProficiencyType.EASILY,
};

const LanguageAddEditPage: FC<LanguageAddEditPageProps> = ({
  itemId,
  onClose: onLanguageAddEditFormClose,
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const {
    data: itemData,
    isLoading,
    mutate: mutateLanguageProficiency,
  } = useFetchLanguageProficiency(itemId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      language_id: yup
        .string()
        .required()
        .label(messages['language.label'] as string),
      reading_proficiency_level: yup
        .string()
        .required()
        .label(messages['language.read'] as string),
      writing_proficiency_level: yup
        .string()
        .required()
        .label(messages['language.write'] as string),
      speaking_proficiency_level: yup
        .string()
        .required()
        .label(messages['language.speak'] as string),
      understand_proficiency_level: yup
        .string()
        .required()
        .label(messages['language.understand'] as string),
    });
  }, [messages]);

  const languageProficiencyTypes = useMemo(
    () => [
      {
        key: LanguageProficiencyType.EASILY,
        label: messages['common.easily'],
      },
      {
        key: LanguageProficiencyType.NOT_EASILY,
        label: messages['common.not_easily'],
      },
    ],
    [messages],
  );
  const languageProficiencySpeakingTypes = useMemo(
    () => [
      {
        key: LanguageProficiencySpeakingType.FLUENTLY,
        label: messages['common.fluent'],
      },
      {
        key: LanguageProficiencySpeakingType.NOT_FLUENTLY,
        label: messages['common.not_fluent'],
      },
    ],
    [messages],
  );

  const {
    control,
    reset,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const isEdit = itemId != null;

  useEffect(() => {
    if (itemData) {
      reset({
        language_id: itemData?.language_id,
        reading_proficiency_level: itemData?.reading_proficiency_level,
        writing_proficiency_level: itemData?.writing_proficiency_level,
        speaking_proficiency_level: itemData?.speaking_proficiency_level,
        understand_proficiency_level: itemData?.understand_proficiency_level,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<YouthLanguageProficiency> = async (
    data: YouthLanguageProficiency,
  ) => {
    const response = itemId
      ? await updateLanguageProficiency(itemId, data)
      : await createLanguageProficiency(data);
    if (isResponseSuccess(response) && isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='language_proficiency.title' />}}
        />,
      );
      mutateLanguageProficiency();
      onLanguageAddEditFormClose();
    } else if (isResponseSuccess(response) && !isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_created_successfully'
          values={{subject: <IntlMessages id='language_proficiency.title' />}}
        />,
      );
      onLanguageAddEditFormClose();
    } else if (isValidationError(response)) {
      setServerValidationErrors(response.errors, setError, validationSchema);
    }
  };

  return (
    <Zoom in={true}>
      <Box>
        <CustomHookForm
          title={messages['language_proficiency.title']}
          handleSubmit={handleSubmit(onSubmit)}
          actions={
            <React.Fragment>
              <CancelButton
                onClick={onLanguageAddEditFormClose}
                isLoading={isLoading}
              />
              <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
            </React.Fragment>
          }
          onClose={onLanguageAddEditFormClose}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CustomFormSelect
                id='language_id'
                isLoading={isLoading}
                control={control}
                options={languages}
                optionValueProp={'id'}
                optionTitleProp={['title']}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <FormRadioButtons
                id='reading_proficiency_level'
                label={'language.read'}
                radios={languageProficiencyTypes}
                control={control}
                defaultValue={LanguageProficiencyType.EASILY}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <FormRadioButtons
                id='writing_proficiency_level'
                label={'language.write'}
                radios={languageProficiencyTypes}
                control={control}
                defaultValue={LanguageProficiencyType.EASILY}
                isLoading={isLoading}
              />
            </Grid>

            <Grid item xs={12}>
              <FormRadioButtons
                id='speaking_proficiency_level'
                label={'language.speak'}
                radios={languageProficiencySpeakingTypes}
                control={control}
                defaultValue={LanguageProficiencySpeakingType.FLUENTLY}
                isLoading={isLoading}
              />
            </Grid>

            <Grid item xs={12}>
              <FormRadioButtons
                id='understand_proficiency_level'
                label={'language.understand'}
                radios={languageProficiencyTypes}
                control={control}
                defaultValue={LanguageProficiencyType.EASILY}
                isLoading={isLoading}
              />
            </Grid>
          </Grid>
        </CustomHookForm>
      </Box>
    </Zoom>
  );
};

export default LanguageAddEditPage;
