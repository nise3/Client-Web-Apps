import {useEffect, useMemo, useState} from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import {useIntl} from 'react-intl';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import yup from '../../../@softbd/libs/yup';
import {createRankType} from '../../../services/organaizationManagement/RankTypeService';
import {isResponseSuccess, isValidationError} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {setServerValidationErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import makeStyles from '@mui/styles/makeStyles';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import map from '../../../public/images/map.jpg';
import Image from 'next/image';

const useStyles = makeStyles((theme) => {
  return {
    buttons: {
      background: theme.palette.primary.dark,
    },
    mainGrid: {
      background: theme.palette.primary.light,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  };
});

const InstituteContact = () => {

  const {messages} = useIntl();
  const [itemData, setItemData] = useState<any>('');
  const {successStack} = useNotiStack();
  const classes = useStyles();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      recipient: yup.string().label(messages['recipient.institute'] as string),
      name: yup.string().label(messages['common.name'] as string),
      phone_numbers: yup.string().label(messages['common.phone_number'] as string),
      email_address: yup.string().label(messages['common.email'] as string),
      advice: yup.string().label(messages['personal_info.bio'] as string),
      location: yup.string().label(messages['common.location'] as string),
    });
  }, [messages]);

  const {
    register,
    reset,
    handleSubmit,
    setError,
    control,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {

    setItemData({
      recipient: '',
      name: '',
      phone_numbers: '',
      email_address: '',
      advice: '',
      location: '',
    });
  }, []);

  useEffect(() => {

    reset({
      recipient: itemData.recipient,
      name: itemData.name,
      phone_numbers: itemData.phone_numbers,
      email_address: itemData.email_address,
      advice: itemData.advice,
      location: itemData.location,
    });
  }, []);

  const onSubmit: SubmitHandler<any> = async (data) => {
    const response = await createRankType(data);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='rank_types.label' />}}
        />,
      );
    } else if (isValidationError(response)) {
      setServerValidationErrors(response.errors, setError, validationSchema);
    }
  };

  return (
    <>
      <Box sx={{maxWidth: 'xl'}}>
        <Grid className={classes.mainGrid} lg={12} container justifyContent={'center'} spacing={2}>
          <Grid xs={12} md={12} textAlign={'center'}>
            <Card>
              <CardContent>
                <Typography variant={'h2'} mb={4}>
                  {messages['contact.institute']}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid mt={2} container justifyContent={'center'} spacing={4}>
            <Grid item md={5} xs={10}>
              <Card>
                <CardContent>
                  <Grid>
                    <Typography variant={'h6'} mb={4}>
                      {messages['contact_with_us.institute']}
                    </Typography>
                  </Grid>
                  <Grid>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
                      <Grid container spacing={5}>
                        <Grid item xs={12}>
                          <CustomFormSelect
                            id='recipient'
                            label={messages['recipient.institute']}
                            isLoading={false}
                            control={control}
                            optionValueProp={'id'}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <CustomTextInput
                            id='name'
                            label={messages['common.name']}
                            register={register}
                            errorInstance={errors}
                            isLoading={false}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <CustomTextInput
                            id='phone_numbers'
                            label={messages['common.phone_number']}
                            register={register}
                            errorInstance={errors}
                            isLoading={false}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <CustomTextInput
                            id='email_address'
                            label={messages['common.email']}
                            register={register}
                            errorInstance={errors}
                            isLoading={false}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <CustomTextInput
                            id='advice'
                            label={messages['advice.institute']}
                            register={register}
                            errorInstance={errors}
                            isLoading={false}
                            multiline={true}
                            rows={3}
                          />
                        </Grid>
                        <Grid container justifyContent={'center'} mt={3}>
                          <Button className={classes.buttons} variant='contained'>
                            {messages['common.send']}
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={5} xs={10}>
              <Card>
                <CardContent>
                  <Grid>
                    <Typography variant={'h6'} mb={4}>
                      {messages['find_our_location_in_map.institute']}
                    </Typography>
                  </Grid>
                  <Grid>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
                      <Grid container spacing={5}>
                        <Grid item xs={12}>
                          <CustomFormSelect
                            id='location'
                            label={messages['common.location']}
                            isLoading={false}
                            control={control}
                            optionValueProp={'id'}
                          />
                        </Grid>
                        <Grid>
                          <Image src={map} height='270' alt={'Map of Bangladesh'} />
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default InstituteContact;
