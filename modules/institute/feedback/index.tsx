import React, {useEffect, useMemo, useState} from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import {useIntl} from 'react-intl';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import yup from '../../../@softbd/libs/yup';
import {createRankType} from '../../../services/organaizationManagement/RankTypeService';
import {isResponseSuccess, isValidationError} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {setServerValidationErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => {
  return {
    buttons: {
      background: theme.palette.primary.dark,
    },
    box: {
      background: theme.palette.primary.light,
    },
  };
});

const InstituteFeedback = () => {
  const {messages} = useIntl();
  const [itemData, setItemData] = useState<any>('');
  const {successStack} = useNotiStack();
  const classes = useStyles();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      name: yup.string().label(messages['common.name'] as string),
      phone_numbers: yup.string().label(messages['common.phone_number'] as string),
      email_address: yup.string().label(messages['common.email'] as string),
      advice: yup.string().label(messages['personal_info.bio'] as string),
    });
  }, [messages]);

  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {

    setItemData({
      name: '',
      phone_numbers: '',
      email_address: '',
      advice: '',
    });
  }, []);

  useEffect(() => {

    reset({
      name: itemData.name,
      phone_numbers: itemData.phone_numbers,
      email_address: itemData.email_address,
      advice: itemData.advice,
    });
  }, []);

  const onSubmit: SubmitHandler<any> = async (data) => {
    const response = await createRankType(data);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='rank_types.label' />}}
        />,
      );
    } else if (isValidationError(response)) {
      setServerValidationErrors(response.errors, setError, validationSchema);
    }
  };

  return (
    <>
      <Box className={classes.box}>
        <Grid container justifyContent={'center'} spacing={2}>
          <Grid md={12} xs={12}>
            <Card>
              <CardContent>
                <Grid textAlign={'center'}>
                  <Typography variant={'h2'} mb={4}>
                    {messages['feedback.institution']}
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid mt={3} md={6} xs={10}>
            <Card>
              <CardContent>
                <Grid>
                  <form onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
                    <Grid container spacing={5}>
                      <Grid item xs={12}>
                        <CustomTextInput
                          id='name'
                          label={messages['common.name']}
                          register={register}
                          errorInstance={errors}
                          isLoading={false}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <CustomTextInput
                          id='phone_numbers'
                          label={messages['common.phone_number']}
                          register={register}
                          errorInstance={errors}
                          isLoading={false}
                        />
                      </Grid>
                      <Grid item xs={6}>
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
                          id='advice'
                          label={messages['advice.institute']}
                          register={register}
                          errorInstance={errors}
                          isLoading={false}
                          multiline={true}
                          rows={3}
                        />
                      </Grid>
                      <Grid container justifyContent={'center'} mt={3}>
                        <Button className={classes.buttons} variant='contained'>
                          {messages['common.send']}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

      </Box>
    </>
  );
};

export default InstituteFeedback;
