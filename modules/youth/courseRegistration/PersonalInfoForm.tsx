import React, {FC} from 'react';
import Grid from '@mui/material/Grid';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {useIntl} from 'react-intl';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import Button from '@mui/material/Button';

interface PersonalInfoFormProps {
  register: any;
  errors: any;
  control: any;
}

const PersonalInfoForm: FC<PersonalInfoFormProps> = ({
  register,
  errors,
  control,
}) => {
  const {messages} = useIntl();
  const yes = messages['common.yes'];
  const no = messages['common.no'];
  const male = messages['common.male'];
  const female = messages['common.female'];
  const others = messages['common.others'];
  const gender = messages['common.gender'];
  const marital_status = messages['common.marital_status'];
  const married = messages['common.married'];
  const unmarried = messages['common.unmarried'];
  const ethnic_group = messages['common.ethnic_group'];
  const physical_disabilities_status =
    messages['common.physical_disabilities_status'];
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='name_en'
          label={messages['common.name_en']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='name_bn'
          label={messages['common.name_bn']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='training_center'
          label={messages['training_center.label']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='programme'
          label={messages['programme.label']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='course'
          label={messages['course.label']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>{gender}</FormLabel>
          <RadioGroup
            row
            aria-label='position'
            name='position'
            defaultValue='male'>
            <FormControlLabel value='male' control={<Radio />} label={male} />
            <FormControlLabel
              value='female'
              control={<Radio />}
              label={female}
            />
            <FormControlLabel
              value='others'
              control={<Radio />}
              label={others}
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='mobile'
          label={messages['common.mobile']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='email'
          label={messages['common.email']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomDateTimeField
          id='date_of_birth'
          label={messages['common.date_of_birth']}
          register={register}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>{marital_status}</FormLabel>
          <RadioGroup
            row
            aria-label='position'
            name='position'
            defaultValue='unmarried'>
            <FormControlLabel
              value='married'
              control={<Radio />}
              label={married}
            />
            <FormControlLabel
              value='unmarried'
              control={<Radio />}
              label={unmarried}
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='religion'
          label={messages['common.religion']}
          isLoading={false}
          control={control}
          options={[]}
          optionValueProp={''}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='nationality'
          label={messages['common.nationality']}
          isLoading={false}
          control={control}
          options={[]}
          optionValueProp={''}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='type_of_identity_card'
          label={messages['common.type_of_identity_card']}
          isLoading={false}
          control={control}
          options={[]}
          optionValueProp={''}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='freedom_fighter_info'
          label={messages['common.freedom_fighter_info']}
          isLoading={false}
          control={control}
          options={[]}
          optionValueProp={''}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>
            {physical_disabilities_status}
          </FormLabel>
          <RadioGroup
            row
            aria-label='position'
            name='position'
            defaultValue='no'>
            <FormControlLabel value='yes' control={<Radio />} label={yes} />
            <FormControlLabel value='no' control={<Radio />} label={no} />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>{ethnic_group}</FormLabel>
          <RadioGroup
            row
            aria-label='position'
            name='position'
            defaultValue='no'>
            <FormControlLabel value='yes' control={<Radio />} label={yes} />
            <FormControlLabel value='no' control={<Radio />} label={no} />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <label htmlFor='contained-button-file'>
          <Button variant='contained' color='primary' component='label'>
            Upload passport size photo
            <input
              type='file'
              accept='image/*'
              // onChange={imageHandler}
              hidden
            />
          </Button>
        </label>
      </Grid>
      <Grid item xs={12} md={6}>
        <label htmlFor='contained-button-file'>
          <Button variant='contained' color='primary' component='label'>
            Upload signature
            <input
              type='file'
              accept='image/*'
              // onChange={imageHandler}
              hidden
            />
          </Button>
        </label>
      </Grid>
    </Grid>
  );
};

export default PersonalInfoForm;
