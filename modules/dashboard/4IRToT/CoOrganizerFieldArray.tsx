import React, {useEffect} from 'react';
import {Grid} from '@mui/material';
import {useIntl} from 'react-intl';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';

type Props = {
  id: string;
  isLoading?: boolean;
  register: any;
  errors: any;
  resetCoOrganiser: any;
  data: any;
  initialValues: any;
};

const CoOrganiserFieldArray = ({
  id,
  isLoading,
  register,
  errors,
  resetCoOrganiser,
  data,
  initialValues,
}: Props) => {
  const {messages} = useIntl();

  //const [fileLinks, setFileLinks] = useState<any>([]);

  useEffect(() => {
    if (data) {
      resetCoOrganiser({
        co_organiser_name: data?.co_organiser_name,
        co_organiser_mobile: data?.co_organiser_mobile,
        co_organiser_address: data?.co_organiser_address,
        co_organiser_email: data?.co_organiser_email,
        //projects: urlPaths,
      });
    } else {
      resetCoOrganiser(initialValues);
    }
  }, [data]);
  return (
    <>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          required
          id={`${id}[co_organiser_name]`}
          label={messages['common.name']}
          register={register}
          errorInstance={errors}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id={`${id}[co_organiser_mobile]`}
          label={messages['common.mobile']}
          register={register}
          errorInstance={errors}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id={`${id}[co_organiser_address]`}
          label={messages['common.address']}
          register={register}
          errorInstance={errors}
          isLoading={isLoading}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id={`${id}[co_organiser_email]`}
          label={messages['common.email']}
          register={register}
          errorInstance={errors}
          isLoading={isLoading}
        />
      </Grid>
    </>
  );
};

export default CoOrganiserFieldArray;
