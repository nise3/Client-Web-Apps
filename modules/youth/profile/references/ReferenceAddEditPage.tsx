import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo} from 'react';
import SubmitButton from '../../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {processServerSideErrors} from '../../../../@softbd/utilities/validationErrorHandler';
import yup from '../../../../@softbd/libs/yup';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import CustomTextInput from '../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {Box, Grid, Zoom} from '@mui/material';
import CancelButton from '../../../../@softbd/elements/button/CancelButton/CancelButton';
import {MOBILE_NUMBER_REGEX} from '../../../../@softbd/common/patternRegex';
import {useFetchReference} from '../../../../services/youthManagement/hooks';
import {
  createReference,
  updateReference,
} from '../../../../services/youthManagement/ReferenceService';
import {YouthReference} from '../../../../services/youthManagement/typing';
import CustomHookForm from '../component/CustomHookForm';
import useSuccessMessage from '../../../../@softbd/hooks/useSuccessMessage';

interface ReferenceAddEditPageProps {
  itemId: number | null;
  onClose: () => void;
}

const initialValues = {
  referrer_first_name_en: '',
  referrer_first_name: '',
  referrer_last_name_en: '',
  referrer_last_name: '',
  referrer_organization_name_en: '',
  referrer_organization_name: '',
  referrer_designation_en: '',
  referrer_designation: '',
  referrer_address_en: '',
  referrer_address: '',
  referrer_email: '',
  referrer_mobile: '',
  referrer_relation_en: '',
  referrer_relation: '',
};

const ReferenceAddEditPage: FC<ReferenceAddEditPageProps> = ({
  itemId,
  ...props
}: ReferenceAddEditPageProps) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const {
    data: itemData,
    mutate: mutateReference,
    isLoading,
  } = useFetchReference(itemId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      referrer_first_name: yup
        .string()
        .title()
        .label(messages['common.first_name_bn'] as string),
      referrer_last_name: yup
        .string()
        .title()
        .label(messages['common.last_name_bn'] as string),
      referrer_organization_name: yup
        .string()
        .title()
        .label(messages['common.organization_bn'] as string),
      referrer_designation: yup
        .string()
        .title()
        .label(messages['common.designation_bn'] as string),
      referrer_address: yup
        .string()
        .title()
        .label(messages['common.address_bn'] as string),
      referrer_mobile: yup
        .string()
        .trim()
        .required()
        .matches(MOBILE_NUMBER_REGEX)
        .label(messages['common.mobile'] as string),
      referrer_email: yup
        .string()
        .trim()
        .required()
        .email()
        .label(messages['common.email'] as string),
      referrer_relation: yup
        .string()
        .title()
        .label(messages['common.relation_bn'] as string),
    });
  }, [messages]);

  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<YouthReference>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        referrer_first_name_en: itemData.referrer_first_name_en,
        referrer_first_name: itemData.referrer_first_name,
        referrer_last_name_en: itemData?.referrer_last_name_en,
        referrer_last_name: itemData?.referrer_last_name,
        referrer_organization_name_en: itemData?.referrer_organization_name_en,
        referrer_organization_name: itemData?.referrer_organization_name,
        referrer_designation_en: itemData?.referrer_designation_en,
        referrer_designation: itemData?.referrer_designation,
        referrer_address_en: itemData?.referrer_address_en,
        referrer_address: itemData?.referrer_address,
        referrer_email: itemData?.referrer_email,
        referrer_mobile: itemData?.referrer_mobile,
        referrer_relation_en: itemData?.referrer_relation_en,
        referrer_relation: itemData?.referrer_relation,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<YouthReference> = async (
    data: YouthReference,
  ) => {
    try {
      if (itemId) {
        await updateReference(itemId, data);
        updateSuccessMessage('common.reference');
      } else {
        await createReference(data);
        createSuccessMessage('common.reference');
      }
      mutateReference();
      props.onClose();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <Zoom in={true}>
      <Box>
        <CustomHookForm
          title={messages['reference.label']}
          handleSubmit={handleSubmit(onSubmit)}
          actions={
            <React.Fragment>
              <CancelButton onClick={props.onClose} isLoading={isLoading} />
              <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
            </React.Fragment>
          }
          onClose={props.onClose}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='referrer_first_name'
                label={messages['common.first_name_bn']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='referrer_first_name_en'
                label={messages['common.first_name_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='referrer_last_name'
                label={messages['common.last_name_bn']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='referrer_last_name_en'
                label={messages['common.last_name_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='referrer_email'
                label={messages['common.email']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='referrer_mobile'
                label={messages['common.phone']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='referrer_organization_name'
                label={messages['common.organization_bn']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='referrer_organization_name_en'
                label={messages['common.organization_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='referrer_designation'
                label={messages['common.designation_bn']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='referrer_designation_en'
                label={messages['common.designation_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='referrer_address'
                label={messages['common.address_bn']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='referrer_address_en'
                label={messages['common.address_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='referrer_relation'
                label={messages['common.relation_bn']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='referrer_relation_en'
                label={messages['common.relation_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            {/*<Grid item xs={12} md={6}>
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
                isLoading={isLoading}
              />
            </Grid>*/}
          </Grid>
        </CustomHookForm>
      </Box>
    </Zoom>
  );
};

export default ReferenceAddEditPage;
