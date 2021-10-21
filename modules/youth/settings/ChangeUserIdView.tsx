import React, {FC, useMemo} from 'react';
import {Box, Button, Card, CardContent, CardHeader, Grid} from '@mui/material';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {useIntl} from 'react-intl';
import {SubmitHandler, useForm} from 'react-hook-form';
import useStyles from './Settings.style';
import {ChevronLeft} from '@mui/icons-material';
import {yupResolver} from '@hookform/resolvers/yup';
import yup from '../../../@softbd/libs/yup';
import {changeUserId} from '../../../services/youthManagement/SettingsService';
import {
  isResponseSuccess,
  isValidationError,
} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {setServerValidationErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
interface ChangeUserIdProps {
  onBack: () => void;
}

const ChangeUserIdView: FC<ChangeUserIdProps> = ({onBack}) => {
  const {messages} = useIntl();
  const classes = useStyles();
  const {successStack} = useNotiStack();
  const validationSchema = useMemo(() => {
    return yup.object().shape({
      old_email: yup
        .string()
        .trim()
        .required()
        .email()
        .label(messages['common.old_email'] as string),
      new_email: yup
        .string()
        .trim()
        .required()
        .email()
        .label(messages['common.new_email'] as string),
    });
  }, [messages]);
  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<any>({resolver: yupResolver(validationSchema)});

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    console.log(data);
    let response = await changeUserId(data);
    if (isResponseSuccess(response)) {
      successStack(<IntlMessages id='youth_registration.success' />);
    } else if (isValidationError(response)) {
      setServerValidationErrors(response.errors, setError, validationSchema);
    }
  };

  return (
    <Card>
      <CardHeader
        title={messages['common.change_userId']}
        fontWeight={'bold'}
      />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CustomTextInput
                id='old_email'
                label={messages['common.old_email']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                id='new_email'
                label={messages['common.new_email']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Button variant={'outlined'} onClick={onBack}>
                  <ChevronLeft /> {messages['common.back']}
                </Button>
                <Button
                  variant={'contained'}
                  color={'primary'}
                  className={classes.button}
                  type='submit'
                  disabled={isSubmitting}>
                  {messages['common.save']}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};
export default ChangeUserIdView;
