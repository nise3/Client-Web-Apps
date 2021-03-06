import { yupResolver } from '@hookform/resolvers/yup';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import { isBreakPointUp } from '../../../@crema/utility/Utils';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import yup from '../../../@softbd/libs/yup';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import { processServerSideErrors } from '../../../@softbd/utilities/validationErrorHandler';
import {
  createCertificate,
  updateCertificate
} from '../../../services/CertificateAuthorityManagement/CertificateService';
import { useFetchCertificate } from '../../../services/CertificateAuthorityManagement/hooks';
import { ICertificate } from './../../../shared/Interface/certificates';
import { CERTIRICATE_LANGUAGE, CERTIFICATE_TYPE_LABEL, RESULT_TYPE } from './Constants';
import useTemplateDispatcher from './editor/state/dispatchers/template';
import { toTemplateJSON } from './editor/utils/template';
interface CertificateAddEditPopupProps {
  onClose: () => void;
}

const initialValues = {
  title_en: '',
  title: '',
  resultType: '',
  language: 1,
};
interface Certificate {
  title: string;
  title_en: string;
  resultType: number;
  language: number;
}

const CertificateAddEditPopup: FC<CertificateAddEditPopupProps> = ({
  ...props
}) => {
  const router = useRouter();
  const query = router.query;
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const {setCurrentTemplateToSave} = useTemplateDispatcher();
  const isEdit = query.certificateId ? true : null;
  const itemId = query.certificateId ? query.certificateId : null;

  const {
    data: itemData,
    isLoading,
    mutate: mutateCertificates,
  } = useFetchCertificate(query.certificateId ? Number(itemId) : null);

  const resultType = useMemo(() => [
      {
        id: RESULT_TYPE.COMPETENT,
        label: CERTIFICATE_TYPE_LABEL.COMPETENT,
      },
      {
        id: RESULT_TYPE.NOT_COMPETENT,
        label: CERTIFICATE_TYPE_LABEL.NOT_COMPETENT,
      },
      {
        id: RESULT_TYPE.GRADING,
        label: CERTIFICATE_TYPE_LABEL.GRADING,
      },
      {
        id: RESULT_TYPE.MARKS,
        label: CERTIFICATE_TYPE_LABEL.MARKS,
      },
      {
        id: RESULT_TYPE.PARTICIPATION,
        label: CERTIFICATE_TYPE_LABEL.PARTICIPATION,
      },
    ],
    [messages],
  );
  const LanguageOptions = useMemo(
    () => [
      {
        id: CERTIRICATE_LANGUAGE.BANGLA,
        label: 'Bangla',
      },
      {
        id: CERTIRICATE_LANGUAGE.ENGLISH,
        label: 'English',
      },
    ],
    [messages],
  );

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title_en: yup
        .string()
        .title('en')
        .label(messages['common.title_en'] as string),
      title: yup
        .string()
        .title()
        .label(messages['common.title'] as string),
      resultType: yup
        .number()
        .required()
        .label(messages['common.title'] as string),
      language: yup
        .number()
        .required()
        .label(messages['common.language'] as string),
    });
  }, [messages]);

  const {
    control,
    register,
    reset,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemId && itemData && !query.new && query.new !== 'true') {
      reset({
        title_en: itemData?.title_en,
        title: itemData?.title,
        resultType: itemData?.result_type,
        language: itemData?.language,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData, query]);

  const onSubmit: SubmitHandler<any> = async (data: Certificate) => {
    const template = await setCurrentTemplateToSave();
    const templateJson = await toTemplateJSON(template);
    // console.log(templateJson);
    const dataToSave: Partial<ICertificate> = {
      title: data.title!,
      title_en: data.title_en!,
      result_type: data.resultType!,
      template: templateJson,
      language: data.language
    };
    try {
      if (query.certificateId && !query.new) {
        await updateCertificate(Number(query.certificateId), dataToSave);
        updateSuccessMessage('common.certificate');
        mutateCertificates();
      } else {
        await createCertificate(dataToSave);
        createSuccessMessage('common.certificate');
        router.back();
      }
      props.onClose();
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
          <WorkspacePremiumIcon />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='common.certificate' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='common.certificate' />}}
            />
          )}
        </>
      }
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={false} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={false} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <CustomTextInput
            required
            id='title_en'
            label={messages['common.title_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextInput
            required
            id='title'
            label={messages['common.title']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomFormSelect
            required
            id='resultType'
            label={messages['common.result_type']}
            isLoading={isLoading}
            control={control}
            options={resultType}
            multiple={false}
            optionValueProp='id'
            optionTitleProp={['label']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomFormSelect
            required
            id='language'
            label={messages['common.language']}
            isLoading={isLoading}
            control={control}
            options={LanguageOptions}
            multiple={false}
            optionValueProp='id'
            optionTitleProp={['label']}
            errorInstance={errors}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default CertificateAddEditPopup;
