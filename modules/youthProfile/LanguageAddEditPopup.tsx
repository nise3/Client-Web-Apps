import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import {
  isResponseSuccess,
  isValidationError,
} from '../../@softbd/utilities/helpers';
import CancelButton from '../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../@softbd/elements/button/SubmitButton/SubmitButton';
import IntlMessages from '../../@crema/utility/IntlMessages';
import HookFormMuiModal from '../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import {setServerValidationErrors} from '../../@softbd/utilities/validationErrorHandler';
import {
  createRankType,
  updateRankType,
} from '../../services/organaizationManagement/RankTypeService';
import yup from '../../@softbd/libs/yup';
import useNotiStack from '../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import CustomFormSelect from '../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import FormRadioButtons from '../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';

interface LanguageAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
}

const languages = [
  {id: 1, title_en: 'English'},
  {id: 2, title_en: 'Bengali'},
];
const initialValues = {
  language: '',
  read: '',
  write: '',
  speak: '',
  understand: '',
};

const LanguageAddEditPopup: FC<LanguageAddEditPopupProps> = ({
  itemId,
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const isEdit = itemId != null;

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      language: yup.string().label(messages['language.label'] as string),
      read: yup.string().label(messages['language.read'] as string),
      write: yup.string().label(messages['language.write'] as string),
      speak: yup.string().label(messages['language.speak'] as string),
      understand: yup.string().label(messages['language.understand'] as string),
    });
  }, [messages]);

  const {
    control,
    reset,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [itemData, setItemData] = useState<any>(null);

  useEffect(() => {
    if (itemId) {
      setItemData({
        language: '1',
        read: '1',
        write: '1',
        speak: '1',
        understand: '1',
      });
    }
  }, [itemId]);

  useEffect(() => {
    if (itemData) {
      reset({
        language: itemData.language,
        read: itemData?.read,
        write: itemData?.write,
        speak: itemData?.speak,
        understand: itemData?.understand,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<any> = async (data) => {
    const response = itemId
      ? await updateRankType(itemId, data)
      : await createRankType(data);
    if (isResponseSuccess(response) && isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='rank_types.label' />}}
        />,
      );
      props.onClose();
    } else if (isResponseSuccess(response) && !isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_created_successfully'
          values={{subject: <IntlMessages id='rank_types.label' />}}
        />,
      );
      props.onClose();
    } else if (isValidationError(response)) {
      setServerValidationErrors(response.errors, setError, validationSchema);
    }
  };

  return (
    <HookFormMuiModal
      open={true}
      {...props}
      title={
        <>
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='language.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='language.label' />}}
            />
          )}
        </>
      }
      maxWidth={'xs'}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={false} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={false} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <CustomFormSelect
            id={'language'}
            isLoading={false}
            control={control}
            options={languages}
            optionValueProp={'id'}
            optionTitleProp={['title_en']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12}>
          <FormRadioButtons
            id='read'
            label={'language.read'}
            radios={[
              {
                key: '1',
                label: messages['common.easily'],
              },
              {
                key: '2',
                label: messages['common.not_easily'],
              },
            ]}
            control={control}
            defaultValue={initialValues.read}
            isLoading={false}
          />
        </Grid>
        <Grid item xs={12}>
          <FormRadioButtons
            id='write'
            label={'language.write'}
            radios={[
              {
                key: '1',
                label: messages['common.easily'],
              },
              {
                key: '2',
                label: messages['common.not_easily'],
              },
            ]}
            control={control}
            defaultValue={initialValues.write}
            isLoading={false}
          />
        </Grid>

        <Grid item xs={12}>
          <FormRadioButtons
            id='speak'
            label={'language.speak'}
            radios={[
              {
                key: '1',
                label: messages['common.easily'],
              },
              {
                key: '2',
                label: messages['common.not_easily'],
              },
            ]}
            control={control}
            defaultValue={initialValues.speak}
            isLoading={false}
          />
        </Grid>

        <Grid item xs={12}>
          <FormRadioButtons
            id='understand'
            label={'language.understand'}
            radios={[
              {
                key: '1',
                label: messages['common.easily'],
              },
              {
                key: '2',
                label: messages['common.not_easily'],
              },
            ]}
            control={control}
            defaultValue={initialValues.understand}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default LanguageAddEditPopup;
