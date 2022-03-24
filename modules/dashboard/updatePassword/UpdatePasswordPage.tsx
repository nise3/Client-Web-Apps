import {yupResolver} from '@hookform/resolvers/yup';
import yup from '../../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {TEXT_REGEX_PASSWORD} from '../../../@softbd/common/patternRegex';
import {Paper, Typography, Button, Container, Grid} from '@mui/material';
import {useMemo} from 'react';
import {useIntl} from 'react-intl';
import {styled} from '@mui/material/styles';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {updatePassword} from '../../../services/userManagement/UserService';
import {useRouter} from 'next/router';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';

const PREFIX = 'UpdatePassword';
const classes = {
  paperBox: `${PREFIX}-paperBox`,
  typography: `${PREFIX}-typography`,
  btn: `${PREFIX}-btn`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  marginTop: 20,
  marginBottom: 20,
  [`& .${classes.paperBox}`]: {
    width: '80%',
    minHeight: '80vh',
    margin: 'auto',
    padding: 'auto',
  },
  [`& .${classes.btn}`]: {marginRight: 20},
  [`& .${classes.typography}`]: {
    textAlign: 'center',
    marginTop: 28,
    marginBottom: 30,
  },
}));

interface FormData {
  current_password: String;
  new_password: String;
  confirm_new_password: String;
}
const UpdatePasswordPage = () => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const authUser = useAuthUser<CommonAuthUser>();
  const router = useRouter();
  const {updateSuccessMessage} = useSuccessMessage();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      current_password: yup
        .string()
        .title()
        .min(8)
        .matches(TEXT_REGEX_PASSWORD)
        .label(messages['common.oldPassword'] as string),
      new_password: yup
        .string()
        .title()
        .min(8)
        .matches(TEXT_REGEX_PASSWORD)
        .label(messages['common.newPassword'] as string),
      new_password_confirmation: yup
        .string()
        .title()
        .oneOf(
          [yup.ref('new_password'), null],
          messages['common.password_must_match'] as string,
        )
        .label(messages['common.retype_password'] as string),
    });
  }, [yup]);
  const {
    register,
    setError,
    reset,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data: FormData) => {
    console.log(data);

    try {
      if (authUser?.userId) {
        const userId: number = Number(authUser?.userId);
        const res = await updatePassword(userId, data);
        console.log(res);
        updateSuccessMessage(messages['common.change_password'] as string);
        router.back();
      }
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };
  return (
    <StyledContainer>
      <Paper variant='outlined' className={classes.paperBox}>
        <Typography variant='h2' className={classes.typography}>
          {messages['common.change_password']}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container justifyContent={'center'} spacing={2}>
            <Grid item xs={11} md={8}>
              <CustomTextInput
                required
                id='current_password'
                type='password'
                label={messages['common.oldPassword']}
                register={register}
                helperText={messages['common.passwordHint']}
                errorInstance={errors}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={11} md={8}>
              <CustomTextInput
                required
                id='new_password'
                type='password'
                label={messages['common.newPassword']}
                register={register}
                helperText={messages['common.passwordHint']}
                errorInstance={errors}
                isLoading={false}
              />
            </Grid>

            <Grid item xs={11} md={8}>
              <CustomTextInput
                required
                id='new_password_confirmation'
                type='password'
                label={messages['common.retype_password']}
                register={register}
                errorInstance={errors}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={11} md={8} style={{textAlign: 'center'}}>
              <Button
                className={classes.btn}
                type={'submit'}
                variant={'contained'}
                color={'primary'}
                disabled={isSubmitting}>
                Submit
              </Button>
              <Button
                variant='outlined'
                color='error'
                onClick={() =>
                  reset({
                    current_password: '',
                    new_password: '',
                    new_password_confirmation: '',
                  })
                }>
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </StyledContainer>
  );
};

export default UpdatePasswordPage;
