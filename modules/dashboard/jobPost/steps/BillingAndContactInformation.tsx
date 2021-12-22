import React, {useMemo} from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@mui/material';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import yup from '../../../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {processServerSideErrors} from '../../../../@softbd/utilities/validationErrorHandler';
import {InfoOutlined, Refresh} from '@mui/icons-material';
import CustomFormSelect from '../../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';

interface Props {
  onBack: () => void;
  onContinue: () => void;
}

const BillingAndContactInformation = ({onBack, onContinue}: Props) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      /*      contact_person_billing: yup
        .string()
        .required()
        .label(messages['job_posting.contact_person_billing'] as string),
      contact_person_job: yup
        .string()
        .required()
        .label(messages['job_posting.contact_person_job'] as string),*/
    });
  }, [messages]);

  const {
    control,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      console.log('data', data);

      //do data save work here

      onContinue();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  const resetBillingPersonHandler = () => {
    console.log('billing person reset');
  };

  return (
    <Box mt={2} mb={3}>
      <Typography mb={3} variant={'h5'} fontWeight={'bold'}>
        {messages['job_posting.billing_and_contract_info']}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        {/** Billing information section */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography variant='body1'>Billing Information</Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box sx={{color: 'warning.light'}} display={'flex'}>
              <InfoOutlined sx={{paddingRight: '5px'}} />
              <Typography variant='body1'>
                For any kind of query about billing issue for this particular
                job Nise3 team will contact the person
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={'15px'}>
          <Grid item xs={12} md={7}>
            <CustomFormSelect
              required
              id='contact_person_billing'
              label={messages['job_posting.contact_person_billing']}
              isLoading={false}
              control={control}
              options={[]}
              optionValueProp={'id'}
              optionTitleProp={['title_en', 'title']}
              errorInstance={errors}
            />
          </Grid>
          <Grid item xs={4} md={1}>
            <span onClick={resetBillingPersonHandler}>
              {<Refresh sx={{marginTop: '8px', cursor: 'pointer'}} />}
            </span>
          </Grid>
          <Grid item xs={8} md={4}>
            <Button variant={'outlined'} color={'primary'}>
              {messages['job_posting.contact_add_edit']}
            </Button>
          </Grid>
        </Grid>
        {/** the following grid will be dynamic based on the selection of the dropdown */}
        <Grid container spacing={3} mt={'15px'}>
          <Grid item xs={12} md={7}>
            <Card
              sx={{
                backgroundColor: 'grey.300',
                border: '1px solid #c5c5c5',
              }}>
              <CardHeader title='Abdur Razzak' subheader='Rouzex' />
              <CardContent>
                <Typography variant='body2' color='text.secondary'>
                  01733341663
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/** Contact information section */}
        <Grid container spacing={3} mt={3}>
          <Grid item xs={12} md={3}>
            <Typography variant='body1'>Contact Information</Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box sx={{color: 'warning.light'}} display={'flex'}>
              <InfoOutlined sx={{paddingRight: '5px'}} />
              <Typography variant='body1'>
                For any kind of query about billing issue for this particular
                job Nise3 team will contact the person
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={'15px'}>
          <Grid item xs={12} md={7}>
            <CustomFormSelect
              required
              id='contact_person_job'
              label={messages['job_posting.contact_person_job']}
              isLoading={false}
              control={control}
              options={[]}
              optionValueProp={'id'}
              optionTitleProp={['title_en', 'title']}
              errorInstance={errors}
            />
          </Grid>
          <Grid item xs={4} md={1}>
            <span onClick={resetBillingPersonHandler}>
              {<Refresh style={{marginTop: '8px', cursor: 'pointer'}} />}
            </span>
          </Grid>
          <Grid item xs={8} md={4}>
            <Button variant={'outlined'} color={'primary'}>
              {messages['job_posting.contact_add_edit']}
            </Button>
          </Grid>
        </Grid>
        {/** the following grid will be dynamic based on the selection of the dropdown */}
        <Grid container spacing={3} mt={'15px'}>
          <Grid item xs={12} md={7}>
            <Card
              sx={{
                backgroundColor: 'grey.300',
                border: '1px solid #c5c5c5',
              }}>
              <CardHeader title='Abdur Razzak' subheader='Rouzex' />
              <CardContent>
                <Typography variant='body2' color='text.secondary'>
                  01733341663
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box display={'flex'} justifyContent={'space-between'} mt={'15px'}>
          <Button onClick={onBack} variant={'outlined'} color={'primary'}>
            {messages['common.previous']}
          </Button>
          <Button
            disabled={isSubmitting}
            type={'submit'}
            variant={'contained'}
            color={'primary'}>
            {messages['common.save_and_continue']}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default BillingAndContactInformation;
