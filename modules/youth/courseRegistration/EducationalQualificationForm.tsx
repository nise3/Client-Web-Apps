import React, {FC} from 'react';
import Grid from '@mui/material/Grid';
import {useIntl} from 'react-intl';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {Typography} from '@mui/material';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';

interface EducationalQualificationFormProps {
  register: any;
  errors: any;
  control: any;
}

const EducationalQualificationForm: FC<EducationalQualificationFormProps> = ({
  register,
  errors,
  control,
}) => {
  const {messages} = useIntl();
  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Typography variant={'h6'}>SSC</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='ssc_board'
          label={messages['education.board']}
          isLoading={false}
          control={control}
          options={[]}
          optionValueProp={''}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='ssc_institute_name'
          label={messages['common.institute_name']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='ssc_roll_no'
          label={messages['education.roll_no']}
          isLoading={false}
          control={control}
          options={[]}
          optionValueProp={''}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='ssc_reg_no'
          label={messages['education.reg_no']}
          isLoading={false}
          control={control}
          options={[]}
          optionValueProp={''}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='ssc_result'
          label={messages['education.result']}
          isLoading={false}
          control={control}
          options={[]}
          optionValueProp={''}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='ssc_division'
          label={messages['divisions.label']}
          isLoading={false}
          control={control}
          options={[]}
          optionValueProp={''}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomFormSelect
          id='ssc_passing_year'
          label={messages['common.passing_year']}
          isLoading={false}
          control={control}
          options={[]}
          optionValueProp={''}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant={'h6'}>HSC</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='honours_board'
          label={messages['education.board']}
          isLoading={false}
          control={control}
          options={[]}
          optionValueProp={''}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='honours_institute_name'
          label={messages['common.institute_name']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='honours_roll_no'
          label={messages['education.roll_no']}
          isLoading={false}
          control={control}
          options={[]}
          optionValueProp={''}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='honours_reg_no'
          label={messages['education.reg_no']}
          isLoading={false}
          control={control}
          options={[]}
          optionValueProp={''}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='honours_result'
          label={messages['education.result']}
          isLoading={false}
          control={control}
          options={[]}
          optionValueProp={''}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='honours_division'
          label={messages['divisions.label']}
          isLoading={false}
          control={control}
          options={[]}
          optionValueProp={''}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomFormSelect
          id='honours_passing_year'
          label={messages['common.passing_year']}
          isLoading={false}
          control={control}
          options={[]}
          optionValueProp={''}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant={'h6'}>HSC</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='hsc_board'
          label={messages['education.board']}
          isLoading={false}
          control={control}
          options={[]}
          optionValueProp={''}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='hsc_institute_name'
          label={messages['common.institute_name']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='hsc_roll_no'
          label={messages['education.roll_no']}
          isLoading={false}
          control={control}
          options={[]}
          optionValueProp={''}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='hsc_reg_no'
          label={messages['education.reg_no']}
          isLoading={false}
          control={control}
          options={[]}
          optionValueProp={''}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='hsc_result'
          label={messages['education.result']}
          isLoading={false}
          control={control}
          options={[]}
          optionValueProp={''}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='hsc_division'
          label={messages['divisions.label']}
          isLoading={false}
          control={control}
          options={[]}
          optionValueProp={''}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomFormSelect
          id='hsc_passing_year'
          label={messages['common.passing_year']}
          isLoading={false}
          control={control}
          options={[]}
          optionValueProp={''}
          errorInstance={errors}
        />
      </Grid>
    </Grid>
  );
};

export default EducationalQualificationForm;
