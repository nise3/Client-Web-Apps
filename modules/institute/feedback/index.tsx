import React, {useMemo} from 'react';
import {Button, Card, CardContent, Grid} from '@mui/material';
import {useIntl} from 'react-intl';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import yup from '../../../@softbd/libs/yup';
import {createRankType} from '../../../services/organaizationManagement/RankTypeService';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import makeStyles from '@mui/styles/makeStyles';
import {H2} from '../../../@softbd/elements/common';
import {MOBILE_NUMBER_REGEX} from '../../../@softbd/common/patternRegex';

const useStyles = makeStyles((theme) => {
  return {
    buttons: {
      background: theme.palette.primary.dark,
    },
    box: {
      background: theme.palette.primary.light,
    },
    heading: {
      boxShadow: '0px 2px 2px #8888',
      padding: '40px 0px',
    },
  };
});

const InstituteFeedback = () => {
  const {messages} = useIntl();
  const {successStack, errorStack} = useNotiStack();
  const isLoading = false;
  const classes = useStyles();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      name: yup
        .string()
        .trim()
        .required()
        .label(messages['common.name'] as string),
      phone_numbers: yup
        .string()
        .trim()
        .required()
        .label(messages['common.phone_number'] as string)
        .matches(MOBILE_NUMBER_REGEX),
      email_address: yup
        .string()
        .label(messages['common.email'] as string)
        .email(),
      advice: yup
        .string()
        .trim()
        .required()
        .label(messages['advice.institute'] as string),
    });
  }, [messages]);

  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      await createRankType(data);
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='feedback.institution' />}}
        />,
      );
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <Grid sx={{maxWidth: '100%'}}>
      <Grid textAlign={'center'} className={classes.heading}>
        <H2>{messages['feedback.institution']}</H2>
      </Grid>
      <Grid
        container
        sx={{maxWidth: '100%'}}
        className={classes.box}
        p={4}
        justifyContent={'center'}>
        <Grid item xs={12} maxWidth='md'>
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <CustomTextInput
                      id='name'
                      label={messages['common.name']}
                      register={register}
                      errorInstance={errors}
                      isLoading={isLoading}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <CustomTextInput
                      id='phone_numbers'
                      label={messages['common.phone_number']}
                      register={register}
                      errorInstance={errors}
                      isLoading={isLoading}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <CustomTextInput
                      id='email_address'
                      label={messages['common.email']}
                      register={register}
                      errorInstance={errors}
                      isLoading={isLoading}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextInput
                      id='advice'
                      label={messages['advice.institute']}
                      register={register}
                      errorInstance={errors}
                      multiline={true}
                      rows={3}
                      isLoading={isLoading}
                    />
                  </Grid>
                  <Grid container justifyContent={'center'} mt={3}>
                    <Button
                      type={'submit'}
                      disabled={isSubmitting}
                      className={classes.buttons}
                      variant='contained'>
                      {messages['common.send']}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InstituteFeedback;
