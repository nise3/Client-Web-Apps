import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo} from 'react';
import {
  isResponseSuccess,
  isValidationError,
} from '../../../@softbd/utilities/helpers';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {setServerValidationErrors} from '../../../@softbd/utilities/validationErrorHandler';
import yup from '../../../@softbd/libs/yup';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {Grid, Box, Card, CardContent, Zoom} from '@mui/material';
import {DialogTitle} from '../../../@softbd/modals/CustomMuiModal/CustomMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {MOBILE_NUMBER_REGEX} from '../../../@softbd/common/patternRegex';
import {useFetchReference} from '../../../services/youthManagement/hooks';
import {
  createReference,
  updateReference,
} from '../../../services/youthManagement/ReferenceService';

interface ReferenceAddEditPageProps {
  itemId: number | null;
  onClose: () => void;
}

const initialValues = {
  language: '',
  read: '',
  write: '',
  speak: '',
  understand: '',
};

const ReferenceAddEditPage: FC<ReferenceAddEditPageProps> = ({
  itemId,
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const {data: itemData} = useFetchReference(itemId);
  const validationSchema = useMemo(() => {
    return yup.object().shape({
      firstname_en: yup
        .string()
        .title('en')
        .label(messages['common.first_name_en'] as string),
      firstname_bn: yup
        .string()
        .title('bn')
        .label(messages['common.first_name_bn'] as string),
      lastname_en: yup
        .string()
        .title('en')
        .label(messages['common.last_name_en'] as string),
      lastname_bn: yup
        .string()
        .title('bn')
        .label(messages['common.last_name_bn'] as string),
      organization_name_en: yup
        .string()
        .title('en')
        .label(messages['organization.label'] as string),
      organization_name_bn: yup
        .string()
        .title('bn')
        .label(messages['organization.label'] as string),
      designation_en: yup
        .string()
        .title('en')
        .label(messages['common.designation'] as string),
      designation_bn: yup
        .string()
        .title('bn')
        .label(messages['common.designation'] as string),
      address_en: yup
        .string()
        .title('en')
        .label(messages['common.address'] as string),
      address_bn: yup
        .string()
        .title('bn')
        .label(messages['common.address'] as string),
      mobile: yup
        .string()
        .trim()
        .required()
        .matches(MOBILE_NUMBER_REGEX)
        .label(messages['common.mobile'] as string),
      email: yup
        .string()
        .trim()
        .required()
        .email()
        .label(messages['common.email'] as string),
      relation_en: yup
        .string()
        .title('en')
        .label(messages['common.relation'] as string),
      relation_bn: yup
        .string()
        .title('bn')
        .label(messages['common.relation'] as string),
    });
  }, [messages]);

  const {
    register,
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
        firstname_en: itemData.referrer_first_name_en,
        firstname_bn: itemData.referrer_first_name,
        lastname_en: itemData?.referrer_last_name_en,
        lastname_bn: itemData?.referrer_last_name,
        organization_name_en: itemData?.referrer_organization_name_en,
        organization_name_bn: itemData?.referrer_organization_name,
        designation_en: itemData?.referrer_designation_en,
        designation_bn: itemData?.referrer_designation,
        address_en: itemData?.referrer_address_en,
        address_bn: itemData?.referrer_address,
        email: itemData?.referrer_email,
        mobile: itemData?.referrer_mobile,
        relation_en: itemData?.referrer_relation_en,
        relation_bn: itemData?.referrer_relation,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<any> = async (data) => {
    const response = itemId
      ? await updateReference(itemId, data)
      : await createReference(data);
    if (isResponseSuccess(response) && isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='common.reference' />}}
        />,
      );
      props.onClose();
    } else if (isResponseSuccess(response) && !isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_created_successfully'
          values={{subject: <IntlMessages id='common.reference' />}}
        />,
      );
      props.onClose();
    } else if (isValidationError(response)) {
      setServerValidationErrors(response.errors, setError, validationSchema);
    }
  };

  return (
    <Zoom in={true}>
      <Box mt={4} mb={2}>
        <Grid container justifyContent={'center'} spacing={2}>
          <Grid item>
            <Card>
              <CardContent sx={{position: 'relative'}}>
                <DialogTitle onClose={props.onClose}>
                  {messages['reference.label']}
                </DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
                  <Grid container spacing={5}>
                    <Grid item xs={6}>
                      <CustomTextInput
                        id='firstname_en'
                        label={messages['common.first_name_en']}
                        register={register}
                        errorInstance={errors}
                        isLoading={false}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomTextInput
                        id='firstname_bn'
                        label={messages['common.first_name_bn']}
                        register={register}
                        errorInstance={errors}
                        isLoading={false}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomTextInput
                        id='lastname_en'
                        label={messages['common.last_name_en']}
                        register={register}
                        errorInstance={errors}
                        isLoading={false}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomTextInput
                        id='lastname_bn'
                        label={messages['common.last_name_bn']}
                        register={register}
                        errorInstance={errors}
                        isLoading={false}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomTextInput
                        id='organization_name_en'
                        label={messages['organization.label']}
                        register={register}
                        errorInstance={errors}
                        isLoading={false}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomTextInput
                        id='organization_name_bn'
                        label={messages['organization.label']}
                        register={register}
                        errorInstance={errors}
                        isLoading={false}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomTextInput
                        id='designation_en'
                        label={messages['common.designation']}
                        register={register}
                        errorInstance={errors}
                        isLoading={false}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomTextInput
                        id='designation_bn'
                        label={messages['common.designation']}
                        register={register}
                        errorInstance={errors}
                        isLoading={false}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomTextInput
                        id='address_en'
                        label={messages['common.address']}
                        register={register}
                        errorInstance={errors}
                        isLoading={false}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomTextInput
                        id='address_bn'
                        label={messages['common.address']}
                        register={register}
                        errorInstance={errors}
                        isLoading={false}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomTextInput
                        id='email'
                        label={messages['common.email']}
                        register={register}
                        errorInstance={errors}
                        isLoading={false}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomTextInput
                        id='mobile'
                        label={messages['common.phone']}
                        register={register}
                        errorInstance={errors}
                        isLoading={false}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomTextInput
                        id='relation_en'
                        label={messages['common.relation']}
                        register={register}
                        errorInstance={errors}
                        isLoading={false}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomTextInput
                        id='relation_bn'
                        label={messages['common.relation']}
                        register={register}
                        errorInstance={errors}
                        isLoading={false}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormRadioButtons
                        id='allow_contact'
                        label={'reference.allow_contact'}
                        radios={[
                          {
                            key: '1',
                            label: messages['common.yes'],
                          },
                          {
                            key: '2',
                            label: messages['common.no'],
                          },
                        ]}
                        control={control}
                        defaultValue={'1'}
                        isLoading={false}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={4} justifyContent={'flex-end'}>
                        <Grid item>
                          <CancelButton
                            onClick={props.onClose}
                            isLoading={false}
                          />
                        </Grid>
                        <Grid item>
                          <SubmitButton
                            isSubmitting={isSubmitting}
                            isLoading={false}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Zoom>
  );
};

export default ReferenceAddEditPage;
