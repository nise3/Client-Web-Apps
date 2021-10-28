import React, {FC} from 'react';
import Grid from '@mui/material/Grid';
import {Typography} from '@mui/material';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {useIntl} from 'react-intl';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';

interface GuardiansInfoFormProps {
  register: any;
  errors: any;
}

const GuardiansInfoForm: FC<GuardiansInfoFormProps> = ({register, errors}) => {
  const {messages} = useIntl();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant={'h6'}>
          {messages['common.father_information']}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='guardian_info[father_name]'
          label={messages['common.name_bn']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='guardian_info[father_name_en]'
          label={messages['common.name_en']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='guardian_info[father_mobile]'
          label={messages['common.mobile']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomDateTimeField
          id='guardian_info[father_date_of_birth]'
          label={messages['common.date_of_birth']}
          register={register}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='guardian_info[father_nid]'
          label={messages['common.nid']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant={'h6'}>
          {messages['common.mother_information']}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='guardian_info[mother_name]'
          label={messages['common.name_bn']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='guardian_info[mother_name_en]'
          label={messages['common.name_en']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='guardian_info[mother_mobile]'
          label={messages['common.mobile']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomDateTimeField
          id='guardian_info[mother_date_of_birth]'
          label={messages['common.date_of_birth']}
          register={register}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='guardian_info[mother_nid]'
          label={messages['common.nid']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
    </Grid>
  );
};

export default GuardiansInfoForm;
