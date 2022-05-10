import React, {useEffect} from 'react';
import {Grid} from '@mui/material';
import {useIntl} from 'react-intl';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';

type Props = {
  id: string;
  isLoading?: boolean;
  register: any;
  errors: any;
  resetOrganiser: any;
  data: any;
  initialValues: any;
};

const OrganiserFieldArray = ({
  id,
  isLoading,
  register,
  errors,
  resetOrganiser,
  data,
  initialValues,
}: Props) => {
  const {messages} = useIntl();

  useEffect(() => {
    if (data) {
      resetOrganiser({
        organiser_name: data?.organiser_name,
        organiser_mobile: data?.organiser_mobile,
        organiser_address: data?.organiser_address,
        organiser_email: data?.organiser_email,
        //projects: urlPaths,
      });
    } else {
      resetOrganiser(initialValues);
    }
  }, [data]);
  return (
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id={`${id}[organiser_name]`}
            label={messages['common.name']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id={`${id}[organiser_mobile]`}
            label={messages['common.mobile']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id={`${id}[organiser_address]`}
            label={messages['common.address']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id={`${id}[organiser_email]`}
            label={messages['common.email']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OrganiserFieldArray;
