import React, {FC} from 'react';
import Grid from '@mui/material/Grid';
import {useIntl} from 'react-intl';
import CustomFormSelect from '../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {Checkbox, FormControlLabel, Typography} from '@mui/material';

interface AddressFormProps {
  register: any;
  errors: any;
  control: any;
}
const options = [
  {
    id: 1,
    label: 'test',
  },
];

const AddressForm: FC<AddressFormProps> = ({register, errors, control}) => {
  const {messages} = useIntl();
  const permanent_address = messages['common.permanent_address'];
  const handleCheckBox = () => {};
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='present_division'
          label={messages['divisions.label']}
          isLoading={false}
          control={control}
          options={options}
          optionValueProp={'id'}
          optionTitleProp={['label']}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='present_district'
          label={messages['districts.label']}
          isLoading={false}
          control={control}
          options={options}
          optionValueProp={'id'}
          optionTitleProp={['label']}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='present_upazila'
          label={messages['upazilas.label']}
          isLoading={false}
          control={control}
          options={options}
          optionValueProp={'id'}
          optionTitleProp={['label']}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='present_post_office'
          label={messages['post_office.label']}
          isLoading={false}
          control={control}
          options={options}
          optionValueProp={'id'}
          optionTitleProp={['label']}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='present_area'
          label={messages['common.area']}
          isLoading={false}
          control={control}
          options={options}
          optionValueProp={'id'}
          optionTitleProp={['label']}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='present_road'
          label={messages['common.road']}
          isLoading={false}
          control={control}
          options={options}
          optionValueProp={'id'}
          optionTitleProp={['label']}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant={'h6'}>{permanent_address}</Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label='Same as current'
          onChange={handleCheckBox}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='permanent_division'
          label={messages['divisions.label']}
          isLoading={false}
          control={control}
          options={[]}
          optionValueProp={''}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='permanent_district'
          label={messages['districts.label']}
          isLoading={false}
          control={control}
          options={[]}
          optionValueProp={''}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='permanent_upazila'
          label={messages['upazilas.label']}
          isLoading={false}
          control={control}
          options={[]}
          optionValueProp={''}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='permanent_post_office'
          label={messages['post_office.label']}
          isLoading={false}
          control={control}
          options={[]}
          optionValueProp={''}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='permanent_area'
          label={messages['common.area']}
          isLoading={false}
          control={control}
          options={[]}
          optionValueProp={''}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomFormSelect
          id='permanent_road'
          label={messages['common.road']}
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

export default AddressForm;
