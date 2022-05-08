import React, {FC, useEffect, useMemo} from 'react';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import Grid from '@mui/material/Grid';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {
  createDivision,
  updateDivision,
} from '../../../services/locationManagement/DivisionService';
import {useIntl} from 'react-intl';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import {useFetchDivision} from '../../../services/locationManagement/hooks';
import yup from '../../../@softbd/libs/yup';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {Division} from '../../../shared/Interface/location.interface';

import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {RESULT_TYPE} from './Constants';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';

interface CertificateAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
}

const initialValues = {
  title_en: '',
  title: '',
  resultType: '',
};

const CertificateAddEditPopup: FC<CertificateAddEditPopupProps> = ({
  itemId,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  //   const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const isEdit = itemId != null;
  const {
    data: itemData,
    isLoading,
    mutate: mutateCertificates,
  } = useFetchDivision(itemId);
  const resultType = useMemo(
    () => [
      {
        id: RESULT_TYPE.COMPETENT,
        label: 'COMPETENT',
      },
      {
        id: RESULT_TYPE.NOT_COMPETENT,
        label: 'NOT COMPETENT',
      },
      {
        id: RESULT_TYPE.GRADING,
        label: 'GRADING',
      },
      {
        id: RESULT_TYPE.MARKS,
        label: 'MARKS',
      },
      {
        id: RESULT_TYPE.PARTICIPATION,
        label: 'PARTICIPATION',
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
    if (itemId && itemData) {
      reset({
        title_en: itemData?.title_en,
        title: itemData?.title,
        resultType: itemData?.bbs_code,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<Division> = async (data: Division) => {
    // try {
    //   if (itemId) {
    //     await updateDivision(itemId, data);
    //     updateSuccessMessage('divisions.label');
    //     mutateDivision();
    //   } else {
    //     await createDivision(data);
    //     createSuccessMessage('divisions.label');
    //   }
    //   props.onClose();
    // } catch (error: any) {
    //   processServerSideErrors({error, setError, validationSchema, errorStack});
    // }

    console.log(data);
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
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
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
            label={messages['course.course_level']}
            isLoading={false}
            control={control}
            options={resultType}
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
