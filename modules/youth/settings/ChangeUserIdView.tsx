import React, {FC} from 'react';
import {Box, Button, Grid, Paper, Typography} from '@mui/material';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {useIntl} from 'react-intl';
import {useForm} from 'react-hook-form';
import useStyles from './Settings.style';
import {ChevronLeft} from '@mui/icons-material';

interface ChangeUserIdProps {
  onBack: () => void;
}

const ChangeUserIdView: FC<ChangeUserIdProps> = ({onBack}) => {
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
          <Box>
            <Button variant={'outlined'} onClick={onBack}>
              <ChevronLeft /> {messages['common.back']}
            </Button>
            <Button
              variant={'contained'}
              color={'primary'}
              className={classes.button}>
              {messages['common.save']}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default ChangeUserIdView;
