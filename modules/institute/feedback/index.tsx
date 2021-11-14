import React, {useMemo} from 'react';
import {styled} from '@mui/material/styles';
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
import {H3} from '../../../@softbd/elements/common';
import {MOBILE_NUMBER_REGEX} from '../../../@softbd/common/patternRegex';

const PREFIX = 'InstituteFeedback';

const classes = {
  buttons: `${PREFIX}-buttons`,
  box: `${PREFIX}-box`,
  heading: `${PREFIX}-heading`,
};

const StyledGrid = styled(Grid)(({theme}) => {
  return {
    [`& .${classes.buttons}`]: {
      background: theme.palette.primary.dark,
    },
    [`& .${classes.box}`]: {
      background: theme.palette.primary.light,
    },
    [`& .${classes.heading}`]: {
      boxShadow: '0px 2px 2px #8888',
    },
  };
});

const InstituteFeedback = () => {
  const {messages} = useIntl();
  const {successStack, errorStack} = useNotiStack();
  const isLoading = false;

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
    <StyledGrid sx={{maxWidth: '100%'}}>
      <Grid textAlign={'center'} className={classes.heading}>
        <H3 fontWeight={'bold'} py={3}>
          {messages['feedback.institution']}
        </H3>
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
    </StyledGrid>
  );
};

export default InstituteFeedback;
