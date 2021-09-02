import * as yup from 'yup';
import {Grid} from '@material-ui/core';
import {
  createInstitute,
  getInstitute,
  updateInstitute,
} from '../../../services/instituteManagement/InstituteService';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {
  DOMAIN_REGEX,
  MOBILE_NUMBER_REGEX,
  TEXT_REGEX_BANGLA,
} from '../../../@softbd/common/patternRegex';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import {isResponseSuccess} from '../../../@softbd/common/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconInstitute from '../../../@softbd/icons/IconInstitute';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';

interface InstituteAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const validationSchema = yup.object().shape({
  title_en: yup.string().trim().required().label('Title (En)'),
  title_bn: yup
    .string()
    .trim()
    .required()
    .matches(TEXT_REGEX_BANGLA, 'Enter valid text')
    .label('Title (Bn)'),
  domain: yup
    .string()
    .trim()
    .required()
    .matches(DOMAIN_REGEX, 'Domain is not valid')
    .label('Domain'),
  code: yup.string().required().label('Code'),
  primary_phone: yup
    .string()
    .trim()
    .required()
    .matches(MOBILE_NUMBER_REGEX, 'Number is not valid')
    .label('Phone Number'),
  primary_mobile: yup
    .string()
    .trim()
    .required()
    .matches(MOBILE_NUMBER_REGEX, 'Number is not valid')
    .label('Mobile Number'),
  address: yup.string().trim().required().label('Address'),
  google_map_src: yup.string(),
  email: yup.string().required().email('Enter valid email').label('Email'),
});

const initialValues = {
  title_en: '',
  title_bn: '',
  domain: '',
  code: '',
  address: '',
  primary_phone: '',
  primary_mobile: '',
  google_map_src: '',
  email: '',
  config: '',
  row_status: '1',
};

const InstituteAddEditPopup: FC<InstituteAddEditPopupProps> = ({
  itemId,
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const isEdit = itemId != null;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<Institute>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (isEdit && itemId) {
        let response = await getInstitute(itemId);
        if (response) {
          let {data: item} = response;
          reset({
            title_en: item?.title_en,
            title_bn: item?.title_bn,
            domain: item?.domain,
            code: item?.code,
            primary_phone: item?.primary_phone,
            primary_mobile: item?.primary_mobile,
            address: item?.address,
            google_map_src: item?.google_map_src,
            email: item?.email,
            config: item?.config,
            row_status: String(item?.row_status),
          });
        }
      } else {
        reset(initialValues);
      }
      setIsLoading(false);
    })();
  }, [itemId]);

  const onSubmit: SubmitHandler<Institute> = async (data: Institute) => {
    if (isEdit && itemId) {
      let response = await updateInstitute(itemId, data);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_updated_successfully'
            values={{subject: <IntlMessages id='institute.label' />}}
          />,
        );
        props.onClose();
        props.refreshDataTable();
      }
    } else {
      let response = await createInstitute(data);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_created_successfully'
            values={{subject: <IntlMessages id='institute.label' />}}
          />,
        );
        props.onClose();
        props.refreshDataTable();
      }
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
          <CustomTextInput
            id='title_en'
            label={messages['common.title_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='title_bn'
            label={messages['common.title_bn']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='email'
            label={messages['common.email']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='code'
            label={messages['common.code']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='primary_phone'
            label={messages['common.phone']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            id='primary_mobile'
            label={messages['common.mobile']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='domain'
            label={messages['common.domain']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='address'
            label={messages['common.address']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='google_map_src'
            label={messages['common.google_map_src']}
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
export default InstituteAddEditPopup;
