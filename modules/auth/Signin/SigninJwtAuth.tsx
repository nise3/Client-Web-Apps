import React from 'react';
import {styled} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Checkbox} from '@mui/material';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';
import clsx from 'clsx';
import Link from 'next/link';
import {Fonts} from '../../../shared/constants/AppEnums';
import {useRouter} from 'next/router';

const PREFIX = 'SigninJwtAuth';

const classes = {
  formRoot: `${PREFIX}-formRoot`,
  myTextFieldRoot: `${PREFIX}-myTextFieldRoot`,
  checkboxRoot: `${PREFIX}-checkboxRoot`,
  pointer: `${PREFIX}-pointer`,
  btnRoot: `${PREFIX}-btnRoot`,
  colorTextPrimary: `${PREFIX}-colorTextPrimary`,
  underlineNone: `${PREFIX}-underlineNone`,
  textGrey: `${PREFIX}-textGrey`,
};

const StyledBox = styled(Box)(({theme}) => ({
  [`& .${classes.formRoot}`]: {
    textAlign: 'left',
    [theme.breakpoints.up('xl')]: {
      marginBottom: 24,
    },
  },

  [`& .${classes.myTextFieldRoot}`]: {
    width: '100%',
  },

  [`& .${classes.checkboxRoot}`]: {
    marginLeft: -12,
  },

  [`& .${classes.pointer}`]: {
    cursor: 'pointer',
  },

  [`& .${classes.btnRoot}`]: {
    // @ts-ignore
    borderRadius: theme.components.MuiCard.styleOverrides.root.borderRadius, // TODO: css issue - CRITICAL
    width: '10rem',
    fontWeight: Fonts.REGULAR,
    fontSize: 16,
    textTransform: 'capitalize',
  },

  [`& .${classes.colorTextPrimary}`]: {
    color: theme.palette.primary.main,
  },

  [`& .${classes.underlineNone}`]: {
    textDecoration: 'none',
  },

  [`& .${classes.textGrey}`]: {
    color: theme.palette.grey[500],
  },
}));

const MyTextField = (props: any) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const validationSchema = yup.object({
  email: yup.string().email('Invalid Email').required('Email required'),
  password: yup.string().required('Password required'),
});

interface UserSigninProps {}

const SigninJwtAuth: React.FC<UserSigninProps> = (props) => {
  const router = useRouter();

  const onGoToForgetPassword = () => {
    router.push('/forget-password');
  };

  const {messages} = useIntl();

  return (
    <StyledBox flex={1} display='flex' flexDirection='column'>
      <Box
        px={{xs: 6, sm: 10, xl: 15}}
        pt={8}
        flex={1}
        display='flex'
        flexDirection='column'>
        <Formik
          validateOnChange={true}
          initialValues={{
            email: 'crema.demo@gmail.com',
            password: 'Pass@1!@all',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting}) => {
            setSubmitting(false);
          }}>
          {({isSubmitting}) => (
            <Form className={classes.formRoot} noValidate autoComplete='off'>
              <Box mb={{xs: 5, xl: 8}}>
                <MyTextField
                  placeholder={messages['common.email']}
                  name='email'
                  label={<IntlMessages id='common.email' />}
                  variant='outlined'
                  className={classes.myTextFieldRoot}
                />
              </Box>

              <Box mb={{xs: 3, lg: 4}}>
                <MyTextField
                  type='password'
                  placeholder={messages['common.password']}
                  label={<IntlMessages id='common.password' />}
                  name='password'
                  variant='outlined'
                  className={classes.myTextFieldRoot}
                />
              </Box>

              <Box
                mb={{xs: 3, xl: 4}}
                display='flex'
                flexDirection={{xs: 'column', sm: 'row'}}
                alignItems={{sm: 'center'}}
                justifyContent={{sm: 'space-between'}}
                fontSize={15}>
                <Box display='flex' alignItems='center'>
                  <Checkbox className={classes.checkboxRoot} />
                  <Box className={classes.textGrey} component='span'>
                    <IntlMessages id='common.rememberMe' />
                  </Box>
                </Box>
                <Box
                  color='primary.main'
                  component='span'
                  ml={{sm: 4}}
                  className={classes.pointer}
                  onClick={onGoToForgetPassword}
                  fontSize={15}>
                  <IntlMessages id='common.forgetPassword' />
                </Box>
              </Box>

              <Box
                mb={6}
                display='flex'
                flexDirection={{xs: 'column', sm: 'row'}}
                alignItems={{sm: 'center'}}
                justifyContent={{sm: 'space-between'}}>
                <Button
                  variant='contained'
                  color='secondary'
                  type='submit'
                  disabled={isSubmitting}
                  className={classes.btnRoot}>
                  <IntlMessages id='common.login' />
                </Button>

                <Box
                  ml={{xs: 0, sm: 4}}
                  mt={{xs: 3, sm: 0}}
                  color='text.secondary'
                  fontSize={15}>
                  <Box className={classes.textGrey} component='span' mr={2}>
                    <IntlMessages id='common.dontHaveAccount' />
                  </Box>
                  <Box component='span'>
                    <Link href='/signup'>
                      <a
                        className={clsx(
                          classes.underlineNone,
                          classes.colorTextPrimary,
                        )}>
                        <IntlMessages id='common.signup' />
                      </a>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </StyledBox>
  );
};

export default SigninJwtAuth;
