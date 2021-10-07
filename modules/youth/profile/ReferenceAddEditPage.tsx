import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import {
  isResponseSuccess,
  isValidationError,
} from '../../../@softbd/utilities/helpers';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {setServerValidationErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {
  createRankType,
  updateRankType,
} from '../../../services/organaizationManagement/RankTypeService';
import yup from '../../../@softbd/libs/yup';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {Grid, Box, Card, CardContent} from '@mui/material';
import {DialogTitle} from '../../../@softbd/modals/CustomMuiModal/CustomMuiModal';

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
    register,
    control,
    reset,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [itemData, setItemData] = useState<any>(null);
  const isEdit = itemId != null;

  useEffect(() => {
    if (itemId) {
      setItemData({
        firstname: 'Mr John',
        lastname: 'Doe',
      });
    }
  }, [itemId]);

  useEffect(() => {
    if (itemData) {
      reset({
        firstname: itemData.firstname,
        lastname: itemData?.lastname,
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
                      id='firstname'
                      label={messages['reference.firstname']}
                      register={register}
                      errorInstance={errors}
                      isLoading={false}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextInput
                      id='lastname'
                      label={messages['reference.lastname']}
                      register={register}
                      errorInstance={errors}
                      isLoading={false}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextInput
                      id='organization'
                      label={messages['organization.label']}
                      register={register}
                      errorInstance={errors}
                      isLoading={false}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextInput
                      id='designation'
                      label={messages['common.designation']}
                      register={register}
                      errorInstance={errors}
                      isLoading={false}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextInput
                      id='address'
                      label={messages['common.address']}
                      register={register}
                      errorInstance={errors}
                      isLoading={false}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextInput
                      id='email_address'
                      label={messages['common.email']}
                      register={register}
                      errorInstance={errors}
                      isLoading={false}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextInput
                      id='phone_number'
                      label={messages['common.phone']}
                      register={register}
                      errorInstance={errors}
                      isLoading={false}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextInput
                      id='relation'
                      label={messages['common.relation']}
                      register={register}
                      errorInstance={errors}
                      isLoading={false}
                    />
                  </Grid>
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
                    <SubmitButton
                      isSubmitting={isSubmitting}
                      isLoading={false}
                    />
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReferenceAddEditPage;
