import React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../shared/constants/AppEnums';
import Link from 'next/link';
import clsx from 'clsx';

const PREFIX = 'ForgetPasswordJwtAuth';

const classes = {
  image: `${PREFIX}-image`,
  card: `${PREFIX}-card`,
  form: `${PREFIX}-form`,
  textField: `${PREFIX}-textField`,
  btnRoot: `${PREFIX}-btnRoot`,
  textSecondary: `${PREFIX}-textSecondary`,
  underlineNone: `${PREFIX}-underlineNone`,
  textGrey: `${PREFIX}-textGrey`,
};

// @ts-ignore
// @ts-ignore
// @ts-ignore
const StyledBox = styled(Box)(({theme}) => ({
  [`& .${classes.image}`]: {
    display: 'inline-block',
    cursor: 'pointer',
    width: 140,
  },

  [`& .${classes.card}`]: {
    maxWidth: 576,
    width: '100%',
    textAlign: 'center',
    padding: 24,
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.up('sm')]: {
      padding: 40,
    },
    [theme.breakpoints.up('md')]: {
      padding: 48,
    },
    [theme.breakpoints.up('xl')]: {
      paddingLeft: 48,
      paddingRight: 48,
    },
    '&:before': {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      width: 130,
      height: 9,
      borderBottomRightRadius: 80,
      borderBottomLeftRadius: 80,
      marginRight: 'auto',
      marginLeft: 'auto',
      backgroundColor: theme.palette.primary.main,
    },
  },

  [`& .${classes.form}`]: {
    textAlign: 'left',
  },

  [`& .${classes.textField}`]: {
    width: '100%',
  },

  [`& .${classes.btnRoot}`]: {
    width: '100%',
    fontWeight: Fonts.REGULAR,
    textTransform: 'capitalize',
    fontSize: 16,
    paddingTop: 12,
    paddingBottom: 12,
    // @ts-ignore
    borderRadius: theme.components.MuiCard.styleOverrides.root.borderRadius, // TODO: css issue - CRITICAL
  },

  [`& .${classes.textSecondary}`]: {
    color: theme.palette.primary.main,
    marginLeft: 10,
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
  email: yup
    .string()
    .email('' + <IntlMessages id='validation.emailFormat' />)
    .required('' + <IntlMessages id='validation.emailRequired' />),
});

interface ForgetPasswordProps {}

const ForgetPasswordJwtAuth: React.FC<ForgetPasswordProps> = () => {
  return (
    <StyledBox
      flex={1}
      display='flex'
      flexDirection='column'
      justifyContent='center'>
      <Box mb={{xs: 6, md: 8, xl: 18}} textAlign='center'>
        <img
          className={classes.image}
          src={'/images/logo-white-with-name.png'}
          alt='crema-logo'
        />
      </Box>

      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'>
        <Card className={classes.card}>
          <Box
            component='h2'
            mb={{xs: 6, xl: 8}}
            color='text.primary'
            fontWeight={Fonts.REGULAR}
            fontSize={{xs: 24, xl: 26}}>
            <IntlMessages id='common.forgetPassword' />
          </Box>
          <Box mb={{xs: 6, xl: 12}} fontSize={18}>
            <Typography>
              <IntlMessages id='common.forgetPasswordTextOne' /> <br />
              <IntlMessages id='common.forgetPasswordTextTwo' />
            </Typography>
          </Box>

          <Formik
            validateOnChange={true}
            initialValues={{
              email: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(data, {setSubmitting, resetForm}) => {
              setSubmitting(true);
              // reset password api goes here
              setSubmitting(false);
              resetForm();
            }}>
            {({isSubmitting}) => (
              <Form className={classes.form}>
                <Box mb={{xs: 5, lg: 8}}>
                  <MyTextField
                    placeholder='Email'
                    name='email'
                    label={<IntlMessages id='common.emailAddress' />}
                    className={classes.textField}
                    variant='outlined'
                  />
                </Box>
                <Box mb={4}>
                  <Button
                    variant='contained'
                    color='secondary'
                    disabled={isSubmitting}
                    className={classes.btnRoot}
                    type='submit'>
                    <IntlMessages id='common.sendNewPassword' />
                  </Button>
                </Box>

                <Box
                  pt={3}
                  textAlign='center'
                  fontSize={15}
                  className={classes.textGrey}>
                  <IntlMessages id='common.alreadyHavePassword' />
                  <Link href='/signin'>
                    <a
                      className={clsx(
                        classes.underlineNone,
                        classes.textSecondary,
                      )}>
                      <IntlMessages id='common.signIn' />
                    </a>
                  </Link>
                </Box>
              </Form>
            )}
          </Formik>
        </Card>
      </Box>
    </StyledBox>
  );
};

export default ForgetPasswordJwtAuth;
