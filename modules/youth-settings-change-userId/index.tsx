import React from 'react';
import {Button, Container, Grid, Paper, Typography} from '@mui/material';
import useStyles from './index.style';
import CustomTextInput from '../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {useIntl} from 'react-intl';
import {useForm} from 'react-hook-form';
const YouthSettingsChangeUserIdPage = () => {
  const {messages} = useIntl();
  const classes = useStyles();
  const {
    register,
    formState: {errors},
  } = useForm<any>();

  return (
    <Container className={classes.rootContainer}>
      <Paper className={classes.paperBox}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography variant={'h6'} style={{fontWeight: 'bold'}}>
              {messages['common.change_userId']}
            </Typography>
          </Grid>
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
            <Button variant={'contained'} color={'primary'}>
              {messages['common.save']}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default YouthSettingsChangeUserIdPage;
