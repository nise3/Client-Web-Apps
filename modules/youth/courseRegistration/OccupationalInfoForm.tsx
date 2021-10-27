import React, {FC, useState} from 'react';
import Grid from '@mui/material/Grid';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {useIntl} from 'react-intl';
import CustomCheckbox from '../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';

interface OccupationalInfoFormProps {
  register: any;
  errors: any;
}

const OccupationalInfoForm: FC<OccupationalInfoFormProps> = ({
  register,
  errors,
}) => {
  const {messages} = useIntl();
  const [isCurrentlyEmployed, setIsCurrentlyEmployed] =
    useState<boolean>(false);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='professional_info[main_profession]'
          label={messages['common.main_occupation']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='professional_info[others_occupation]'
          label={messages['common.others_occupation']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='professional_info[monthly_income]'
          label={messages['common.monthly_income']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='professional_info[years_of_experiences]'
          label={messages['common.year_of_experience']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomCheckbox
          id='professional_info[is_currently_employed]'
          label={messages['common.currently_working']}
          register={register}
          errorInstance={errors}
          checked={isCurrentlyEmployed}
          onChange={() => {
            setIsCurrentlyEmployed((prev) => !prev);
          }}
          isLoading={false}
        />
      </Grid>
    </Grid>
  );
};

export default OccupationalInfoForm;
