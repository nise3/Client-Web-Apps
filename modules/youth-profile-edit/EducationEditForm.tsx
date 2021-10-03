import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import CustomTextInput from '../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {useForm} from 'react-hook-form';
import CustomFormSelect from '../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import SubmitButton from '../../@softbd/elements/button/SubmitButton/SubmitButton';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import {green} from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import makeStyles from '@mui/styles/makeStyles';
import {CremaTheme} from '../../types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => ({
  root: {},
  editBox: {
    padding: 20,
    position: 'relative',
  },
  divider: {
    marginBottom: 20,
  },
  education: {
    position: 'absolute',
    right: 20,
  },
}));

function EducationEditForm() {
  const classes = useStyles();
  const isLoading = false;
  const {
    control,
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm();

  return (
    <>
      <Paper className={classes.editBox}>
        <Box className={classes.education}>
          <IconButton color='secondary' aria-label=''>
            <PrintOutlinedIcon style={{color: green[500], fontSize: 30}} />
          </IconButton>
          <IconButton color='secondary' aria-label=''>
            <SystemUpdateAltOutlinedIcon
              style={{color: green[500], fontSize: 30}}
            />
          </IconButton>
        </Box>
        <Typography variant={'h6'}>Education</Typography>
        <Grid container>
          <Grid item xs={1}>
            <Avatar src='./images/youth/avatar.png' />
          </Grid>

          <Grid item xs={8}>
            <Typography>SSC</Typography>
            <Typography>TT center</Typography>
          </Grid>

          <Grid item xs={3}>
            <Button variant='outlined' color='primary'>
              Edit
            </Button>
            <IconButton color='secondary' aria-label=''>
              <DeleteIcon style={{color: 'red', fontSize: 30}} />
            </IconButton>
          </Grid>
        </Grid>

        <Divider className={classes.divider} />
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <CustomTextInput
              id='exam'
              label={'Exam'}
              register={register}
              isLoading={isLoading}
              errorInstance={errors}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextInput
              id='institution'
              label={'Institution'}
              register={register}
              isLoading={isLoading}
              errorInstance={errors}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextInput
              id='board'
              label={'Board'}
              register={register}
              isLoading={isLoading}
              errorInstance={errors}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextInput
              id='rollNo'
              label={'Roll No'}
              register={register}
              isLoading={isLoading}
              errorInstance={errors}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextInput
              id='regNo'
              label={'Reg No'}
              register={register}
              isLoading={isLoading}
              errorInstance={errors}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomFormSelect
              id='result'
              label={'Result'}
              isLoading={isLoading}
              control={control}
              options={[]}
              optionValueProp={''}
              errorInstance={errors}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomFormSelect
              id='group'
              label={'Group'}
              isLoading={isLoading}
              control={control}
              options={[]}
              optionValueProp={''}
              errorInstance={errors}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomFormSelect
              id='passing_year'
              label={'Passing Year'}
              isLoading={isLoading}
              control={control}
              options={[]}
              optionValueProp={''}
              errorInstance={errors}
            />
          </Grid>
          <Grid item>
            <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default EducationEditForm;
