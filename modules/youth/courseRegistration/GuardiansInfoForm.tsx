import React, {FC} from 'react';
import Grid from '@mui/material/Grid';
import {Typography} from '@mui/material';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {useIntl} from 'react-intl';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';

interface GuardiansInfoFormProps {
  register: any;
  errors: any;
  control: any;
}

const GuardiansInfoForm: FC<GuardiansInfoFormProps> = ({
  register,
  errors,
  control,
}) => {
  const {messages} = useIntl();
  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Typography variant={'h6'}>
          {messages['common.father_information']}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='father_name'
          label={messages['common.name']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomDateTimeField
          id='father_date_of_birth'
          label={messages['common.date_of_birth']}
          register={register}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='father_nid'
          label={messages['common.nid']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='father_mobile'
          label={messages['common.mobile']}
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
          id='mother_name'
          label={messages['common.name']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomDateTimeField
          id='mother_date_of_birth'
          label={messages['common.date_of_birth']}
          register={register}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='mother_nid'
          label={messages['common.nid']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='mother_mobile'
          label={messages['common.mobile']}
          register={register}
          errorInstance={errors}
          isLoading={false}
        />
      </Grid>
    </Grid>
  );
};

export default GuardiansInfoForm;
