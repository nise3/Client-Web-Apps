import React from 'react';
import {styled} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Checkbox} from '@mui/material';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';
import Link from 'next/link';
import Box from '@mui/material/Box';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import clsx from 'clsx';
import {Fonts} from '../../../shared/constants/AppEnums';
import Grid from '@mui/material/Grid';
import {GridContainer} from '../../../@crema';
import {useIntl} from 'react-intl';

const PREFIX = 'SignupJwtAuth';

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
    fontWeight: Fonts.LIGHT,
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

const SignupJwtAuth: React.FC<{}> = () => {
  const {messages} = useIntl();
  const validationSchema = yup.object({
    name: yup.string().required(messages['validation.nameRequired'] as string),
    email: yup
      .string()
      .email(messages['validation.emailFormat'] as string)
      .required(messages['validation.emailRequired'] as string),
    password: yup
      .string()
      .required(messages['validation.passwordRequired'] as string),
    confirmPassword: yup
      .string()
      .required(messages['validation.reTypePassword'] as string),
  });

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
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setErrors, setSubmitting}) => {
            if (data.password !== data.confirmPassword) {
              ``;
              setErrors({
                confirmPassword: messages[
                  'validation.passwordMisMatch'
                ] as string,
              });
            } else {
              setSubmitting(false);
            }
          }}>
          {({isSubmitting}) => (
            <Form className={classes.formRoot} noValidate autoComplete='off'>
              <Box mb={{xs: 5, xl: 8}}>
                <MyTextField
                  label={<IntlMessages id='common.name' />}
                  name='name'
                  variant='outlined'
                  className={classes.myTextFieldRoot}
                />
              </Box>

              <Box mb={{xs: 5, xl: 8}}>
                <MyTextField
                  label={<IntlMessages id='common.email' />}
                  name='email'
                  variant='outlined'
                  className={classes.myTextFieldRoot}
                />
              </Box>

              <GridContainer>
                <Grid item xs={12} md={6}>
                  <Box mb={{xs: 0, xl: 4}}>
                    <MyTextField
                      label={<IntlMessages id='common.password' />}
                      name='password'
                      type='password'
                      variant='outlined'
                      className={classes.myTextFieldRoot}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box mb={{xs: 3, xl: 4}}>
                    <MyTextField
                      label={<IntlMessages id='common.retype_password' />}
                      name='confirmPassword'
                      type='password'
                      variant='outlined'
                      className={classes.myTextFieldRoot}
                    />
                  </Box>
                </Grid>
              </GridContainer>

              <Box
                mb={{xs: 3, xl: 4}}
                display='flex'
                alignItems='center'
                fontSize={15}>
                <Box display='flex' alignItems='center'>
                  <Checkbox className={classes.checkboxRoot} />
                  <Box
                    className={classes.textGrey}
                    component='span'
                    mr={2}
                    fontSize={15}>
                    <IntlMessages id='common.iAgreeTo' />
                  </Box>
                </Box>
                <Box
                  color='primary.main'
                  component='span'
                  fontSize={15}
                  className={classes.pointer}>
                  <IntlMessages id='common.termConditions' />
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
                  disabled={isSubmitting}
                  className={classes.btnRoot}
                  type='submit'>
                  <IntlMessages id='common.signup' />
                </Button>

                <Box
                  ml={{sm: 4}}
                  mt={{xs: 3, sm: 0}}
                  color='text.secondary'
                  fontSize={15}>
                  <Box className={classes.textGrey} component='span' mr={1}>
                    <IntlMessages id='common.already_have_account' />
                  </Box>
                  <Box component='span'>
                    <Link href='/signin'>
                      <a
                        className={clsx(
                          classes.underlineNone,
                          classes.colorTextPrimary,
                        )}>
                        <IntlMessages id='common.signIn' />
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

export default SignupJwtAuth;
