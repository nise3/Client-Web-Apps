import React, {FC} from 'react';
import {useIntl} from 'react-intl';
import useStyles from './Settings.style';
import {useForm} from 'react-hook-form';
import {Button, Grid, Paper, Typography} from '@mui/material';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {ChevronLeft} from '@mui/icons-material';

interface ChangePasswordViewprops {
  onBack: () => void;
}
const ChangePasswordView: FC<ChangePasswordViewprops> = ({onBack}) => {
  const {messages} = useIntl();
  const classes = useStyles();
  const {
    register,
    formState: {errors},
  } = useForm<any>();
  return (
    <Paper className={classes.paperBox}>
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
          <Button variant={'outlined'} color={'primary'} onClick={onBack}>
            <ChevronLeft />
            {messages['common.back']}
          </Button>
          <Button
            variant={'contained'}
            color={'primary'}
            className={classes.button}>
            {messages['common.save']}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ChangePasswordView;
