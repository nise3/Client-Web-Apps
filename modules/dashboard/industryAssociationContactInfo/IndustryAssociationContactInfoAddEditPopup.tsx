import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {useFetchContactInfo} from '../../../services/IndustryAssociationManagement/hooks';
import React, {useEffect, useMemo} from 'react';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';
import yup from '../../../@softbd/libs/yup';
import {MOBILE_NUMBER_REGEX} from '../../../@softbd/common/patternRegex';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {IContactInfo} from '../../../shared/Interface/industryAssociation.interface';
import {
  createContactInfo,
  updateContactInfo,
} from '../../../services/IndustryAssociationManagement/ContactInfoService';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {Grid} from '@mui/material';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import IconOrganization from '../../../@softbd/icons/IconOrganization';
import {isBreakPointUp} from '../../../@crema/utility/Utils';

interface IAddEditPopupProps {
  contactInfoId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title: '',
  title_en: '',
  industry_association_id: '',
  email: '',
  mobile: '',
  phone: '',
  row_status: '1',
};

const IndustryAssociationContactInfoAddEditPopup = ({
  contactInfoId,
  refreshDataTable,
  ...props
}: IAddEditPopupProps) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const isEdit = contactInfoId != null;

  const authUser = useAuthUser<CommonAuthUser>();

  const {
    data: contactInfoData,
    isLoading,
    mutate,
  } = useFetchContactInfo(contactInfoId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title()
        .label(messages['common.title'] as string),
      mobile: yup
        .string()
        .trim()
        .required()
        .matches(MOBILE_NUMBER_REGEX)
        .label(messages['common.mobile'] as string),
      email: yup
        .string()
        .required()
        .email()
        .label(messages['common.email'] as string),
    });
  }, [messages]);

  const {
    register,
    control,
    reset,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<IContactInfo>({resolver: yupResolver(validationSchema)});

  useEffect(() => {
    if (contactInfoData) {
      reset({
        title: contactInfoData?.title,
        title_en: contactInfoData?.title_en,
        industry_association_id: contactInfoData?.industry_association_id,
        email: contactInfoData?.email,
        mobile: contactInfoData?.mobile,
        phone: contactInfoData?.phone,
        row_status: String(contactInfoData?.row_status),
      });
    } else {
      reset(initialValues);
    }
  }, [contactInfoData, reset]);

  const onSubmit: SubmitHandler<IContactInfo> = async (data: IContactInfo) => {
    try {
      if (contactInfoId) {
        await updateContactInfo(contactInfoId, data);
        updateSuccessMessage('common.contact_office');
      } else {
        data.industry_association_id = authUser?.industry_association_id;
        await createContactInfo(data);
        createSuccessMessage('common.contact_office');
      }
      mutate();
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
          <IconOrganization />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='common.contact_office' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='common.contact_office' />}}
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
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='title'
            label={messages['common.title']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='title_en'
            label={messages['common.title_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='email'
            label={messages['common.email']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            placeholder='example@email.com'
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='mobile'
            label={messages['common.mobile']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            placeholder='017xxxxxxxx'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='phone'
            label={messages['common.phone_number']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            placeholder='015xxxxxxxx'
          />
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

export default IndustryAssociationContactInfoAddEditPopup;
