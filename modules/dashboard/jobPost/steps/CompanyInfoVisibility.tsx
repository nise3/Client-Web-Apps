import React, {useMemo, useState} from 'react';
import {Box, Button, Grid, Switch, Typography} from '@mui/material';
import {useIntl} from 'react-intl';
import yup from '../../../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {processServerSideErrors} from '../../../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import {styled} from '@mui/material/styles';
import CustomFormSelect from '../../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';

const PREFIX = 'CompanyInfoVisibility';

const classes = {
  root: `${PREFIX}-root`,
  switchBase: `${PREFIX}-switchBase`,
  thumb: `${PREFIX}-thumb`,
  track: `${PREFIX}-track`,
  checked: `${PREFIX}-checked`,
};

const StyledBox = styled(Box)(({theme}) => ({
  [`& .${classes.root}`]: {
    width: '50px',
    height: '24px',
    padding: '0px',
  },
  [`& .${classes.switchBase}`]: {
    color: '#818181',
    padding: '1px',
    '&$checked': {
      '& + $track': {
        backgroundColor: '#23bf58',
      },
    },
  },
  [`& .${classes.thumb}`]: {
    color: 'white',
    width: '20px',
    height: '20px',
    margin: '1px',
  },
  [`& .${classes.track}`]: {
    borderRadius: '20px',
    backgroundColor: '#818181',
    opacity: '1 !important',
    '&:after, &:before': {
      color: 'white',
      fontSize: '11px',
      position: 'absolute',
      top: '6px',
    },
    '&:after': {
      content: "'on'",
      left: '8px',
    },
    '&:before': {
      content: "'Off'",
      right: '7px',
    },
  },
  [`& .${classes.checked}`]: {
    color: '#23bf58 !important',
    transform: 'translateX(26px) !important',
  },
}));

interface Props {
  onBack: () => void;
  onContinue: () => void;
}

const CompanyInfoVisibility = ({onBack, onContinue}: Props) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const [isCompanyNameVisible, setIsCompanyNameVisible] = useState(false);
  const [isCompanyAddressVisible, setIsCompanyAddressVisible] = useState(false);
  const [isCompanyBusinessVisible, setIsCompanyBusinessVisible] =
    useState(false);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      /*      company_type: yup
        .string()
        .required()
        .label(messages['job_posting.company_type'] as string),*/
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

  return (
    <StyledBox mt={2} mb={3}>
      <Typography mb={3} variant={'h5'} fontWeight={'bold'}>
        {messages['job_posting.company_info_visibility']}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={6} md={3}>
                <Typography variant='body1'>Company Name</Typography>
              </Grid>
              <Grid item xs={6} md={9}>
                <Switch
                  classes={{
                    root: classes.root,
                    switchBase: classes.switchBase,
                    thumb: classes.thumb,
                    track: classes.track,
                    checked: classes.checked,
                  }}
                  color={'primary'}
                  onChange={() =>
                    setIsCompanyNameVisible((prevState) => !prevState)
                  }
                  checked={isCompanyNameVisible}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={6} md={3}>
                <Typography variant='body1'>Company Address</Typography>
              </Grid>
              <Grid item xs={6} md={9}>
                <Switch
                  classes={{
                    root: classes.root,
                    switchBase: classes.switchBase,
                    thumb: classes.thumb,
                    track: classes.track,
                    checked: classes.checked,
                  }}
                  color={'primary'}
                  onChange={() =>
                    setIsCompanyAddressVisible((prevState) => !prevState)
                  }
                  checked={isCompanyAddressVisible}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomFormSelect
              required
              id='company_type'
              label={messages['job_posting.company_type']}
              isLoading={false}
              control={control}
              options={[]}
              optionValueProp={'id'}
              optionTitleProp={['title_en', 'title']}
              errorInstance={errors}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={6} md={3}>
                <Typography variant='body1'>Company Business</Typography>
              </Grid>
              <Grid item xs={6} md={9}>
                <Switch
                  classes={{
                    root: classes.root,
                    switchBase: classes.switchBase,
                    thumb: classes.thumb,
                    track: classes.track,
                    checked: classes.checked,
                  }}
                  color={'primary'}
                  onChange={() =>
                    setIsCompanyBusinessVisible((prevState) => !prevState)
                  }
                  checked={isCompanyBusinessVisible}
                />
              </Grid>
            </Grid>
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
    </StyledBox>
  );
};

export default CompanyInfoVisibility;
