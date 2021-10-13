import React, {FC, useMemo} from 'react';
import {useIntl} from 'react-intl';
import useStyles from './Settings.style';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Button, Grid, Paper, Typography} from '@mui/material';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {ChevronLeft} from '@mui/icons-material';
import {yupResolver} from '@hookform/resolvers/yup';
import yup from '../../../@softbd/libs/yup';
import {
  isResponseSuccess,
  isValidationError,
} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {setServerValidationErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {changePassword} from '../../../services/youthManagement/SettingsService';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
interface ChangePasswordViewprops {
  onBack: () => void;
}
const ChangePasswordView: FC<ChangePasswordViewprops> = ({onBack}) => {
  const {messages} = useIntl();
  const classes = useStyles();
  const {successStack} = useNotiStack();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      old_password: yup
        .string()
        .trim()
        .required()
        .label(messages['common.oldPassword'] as string),
      new_password: yup
        .string()
        .trim()
        .required()
        .label(messages['common.newPassword'] as string),
      confirm_new_password: yup
        .string()
        .trim()
        .required()
        .oneOf([yup.ref('new_password')])
        .label(messages['common.retype_password'] as string),
    });
  }, [messages]);
  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<any>({resolver: yupResolver(validationSchema)});

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    let response = await changePassword(data);
    if (isResponseSuccess(response)) {
      successStack(<IntlMessages id='youth_registration.success' />);
    } else if (isValidationError(response)) {
      setServerValidationErrors(response.errors, setError, validationSchema);
    }
  };
  return (
    <Paper className={classes.paperBox}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography variant={'h6'} style={{fontWeight: 'bold'}}>
              {messages['common.change_password']}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <CustomTextInput
              id='old_password'
              label={messages['common.oldPassword']}
              register={register}
              errorInstance={errors}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextInput
              id='new_password'
              label={messages['common.newPassword']}
              register={register}
              errorInstance={errors}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextInput
              id='confirm_new_password'
              label={messages['common.retype_password']}
              register={register}
              errorInstance={errors}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant={'outlined'} color={'primary'} onClick={onBack}>
              <ChevronLeft />
              {messages['common.back']}
            </Button>
            <Button
              variant={'contained'}
              color={'primary'}
              className={classes.button}
              type='submit'
              disabled={isSubmitting}>
              {messages['common.save']}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ChangePasswordView;
