import React, {useContext, useMemo, useState} from 'react';
import {Box, Button, Card, CardContent, Grid, useTheme} from '@mui/material';
import {H1, H2, H3, H5, Text} from '../../../@softbd/elements/common';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import GoogleMapReact from 'google-map-react';
import {styled} from '@mui/material/styles';
import {ThemeMode} from '../../../shared/constants/AppEnums';
import RoomIcon from '@mui/icons-material/Room';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {GOOGLE_MAP_API_KEY} from '../../../@softbd/common/constants';
import yup from '../../../@softbd/libs/yup';
import {MOBILE_NUMBER_REGEX} from '../../../@softbd/common/patternRegex';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {VisitorFeedbackTypes} from '../../../services/cmsManagement/Constants';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {Call, Email} from '@mui/icons-material';
import AppContextPropsType from '../../../redux/types/AppContextPropsType';
import AppContext from '../../../@crema/utility/AppContext';
import AppLocale from '../../../shared/localization';
import typography from '../../../@softbd/layouts/themes/default/typography';

const PREFIX = 'IndustryContact';

const classes = {
  buttons: `${PREFIX}-buttons`,
  mainGrid: `${PREFIX}-mainGrid`,
  heading: `${PREFIX}-heading`,
  formCard: `${PREFIX}-formCard`,
  mapDiv: `${PREFIX}-mapDiv`,
  textStyle: `${PREFIX}-textStyle`,
  contactBox: `${PREFIX}-contactBox`,
  contactBoxItem: `${PREFIX}-contactBoxItem`,
  contactBoxItemIcon: `${PREFIX}-contactBoxItemIcon`,
};

const StyledGrid = styled(Grid)(({theme}) => {
  return {
    [`& .${classes.buttons}`]: {
      width: '100%',
    },
    [`& .${classes.mainGrid}`]: {
      background: theme.palette.primary.main,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '100%',
    },
    [`& .${classes.heading}`]: {
      boxShadow: '0px 2px 2px #8888',
    },
    [`& .${classes.formCard}`]: {
      [theme.breakpoints.up('md')]: {
        height: '525px',
      },
    },
    [`& .${classes.mapDiv}`]: {
      height: '320px',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        height: '420px',
      },
    },
    [`& .${classes.textStyle}`]: {
      color:
        theme.palette.mode === ThemeMode.DARK
          ? theme.palette.common.white
          : theme.palette.common.black,
    },
    [`& .${classes.contactBox}`]: {
      border: '1px solid #969696',
      borderRadius: '5px',
      padding: '20px',
      textAlign: 'left',
    },
    [`& .${classes.contactBoxItem}`]: {
      display: 'flex',
      marginTop: '5px',
      color: theme.palette.grey[600],
    },
    [`& .${classes.contactBoxItemIcon}`]: {
      color: theme.palette.grey[600],
      marginRight: '10px',
    },
  };
});

type MapProp = {
  text: string;
  lat: number;
  lng: number;
};

const MapComponent = ({text}: MapProp) => (
  <div
    style={{
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
    }}>
    <RoomIcon htmlColor={'#e80808'} />
    {text}
  </div>
);

const officePersonsContact = [
  {
    name: 'BASIS Secretariat',
    mobile: '+8809612322747',
    email: 'info@basis.org.bd',
  },
  {
    name: 'BASIS Secretariat',
    mobile: '+8809612322747',
    email: 'info@basis.org.bd',
  },
  {
    name: 'BASIS Secretariat',
    mobile: '+8809612322747',
    email: 'info@basis.org.bd',
  },
  {
    name: 'BASIS Secretariat',
    mobile: '+8809612322747',
    email: 'info@basis.org.bd',
  },
  {
    name: 'BASIS Secretariat',
    mobile: '+8809612322747',
    email: 'info@basis.org.bd',
  },
  {
    name: 'BASIS Secretariat',
    mobile: '+8809612322747',
    email: 'info@basis.org.bd',
  },
  {
    name: 'BASIS Secretariat',
    mobile: '+8809612322747',
    email: 'info@basis.org.bd',
  },
  {
    name: 'BASIS Secretariat',
    mobile: '+8809612322747',
    email: 'info@basis.org.bd',
  },
];

const ContactPage = () => {
  const theme = useTheme();
  const {locale} = useContext<AppContextPropsType>(AppContext);
  const currentAppLocale = AppLocale[locale.locale];
  const result = typography(theme, currentAppLocale.locale);
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const [mapCenter] = useState({
    lat: 23.776488939377593,
    lng: 90.38155009066672,
  });

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      name: yup
        .string()
        .required()
        .label(messages['common.name'] as string),
      mobile: yup
        .string()
        .required()
        .label(messages['common.mobile'] as string)
        .matches(MOBILE_NUMBER_REGEX),
      email: yup
        .string()
        .email()
        .nullable(true)
        .label(messages['common.email'] as string),

      comment: yup
        .string()
        .required()
        .label(messages['common.advice'] as string),
    });
  }, [messages]);

  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    data.form_type = VisitorFeedbackTypes.CONTACTUS;

    try {
      reset();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <StyledGrid sx={{maxWidth: '100%'}}>
      <Grid textAlign={'center'} className={classes.heading}>
        <H1
          py={3}
          sx={{
            ...result.h3,
            fontWeight: 'bold',
          }}>
          {messages['common.contact']}
        </H1>
      </Grid>
      <Grid sx={{maxWidth: '100%'}} className={classes.mainGrid}>
        <Grid
          maxWidth='lg'
          container
          sx={{margin: 'auto'}}
          justifyContent={'center'}
          py={2}>
          <Grid item md={6} xs={12} p={2}>
            <Card>
              <CardContent className={classes.formCard}>
                <Grid>
                  <H2
                    className={classes.textStyle}
                    sx={{
                      ...result.h6,
                    }}
                    mb={4}>
                    {messages['common.contact_with_us']}
                  </H2>
                </Grid>
                <Grid>
                  <form onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
                    <Grid container spacing={5}>
                      <Grid item xs={6}>
                        <CustomTextInput
                          required
                          id='name'
                          label={messages['common.name']}
                          register={register}
                          errorInstance={errors}
                          isLoading={false}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <CustomTextInput
                          required
                          id='mobile'
                          label={messages['common.phone_number']}
                          register={register}
                          errorInstance={errors}
                          isLoading={false}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomTextInput
                          id='email'
                          label={messages['common.email']}
                          register={register}
                          errorInstance={errors}
                          isLoading={false}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomTextInput
                          required
                          id='comment'
                          label={messages['common.advice']}
                          register={register}
                          errorInstance={errors}
                          isLoading={false}
                          multiline={true}
                          rows={3}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        justifyContent={'center'}
                        mt={3}
                        style={{paddingTop: '0'}}>
                        <Button
                          type={'submit'}
                          disabled={isSubmitting}
                          className={classes.buttons}
                          variant='contained'>
                          {messages['common.send']}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={6} xs={12} p={2}>
            <Card>
              <CardContent>
                <H2
                  mb={4}
                  className={classes.textStyle}
                  sx={{
                    ...result.h6,
                  }}>
                  {messages['common.find_our_location_on_map']}
                </H2>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <div className={classes.mapDiv}>
                      <GoogleMapReact
                        bootstrapURLKeys={{key: GOOGLE_MAP_API_KEY}}
                        defaultCenter={mapCenter}
                        defaultZoom={11}
                        center={mapCenter}>
                        <MapComponent
                          lat={mapCenter.lat}
                          lng={mapCenter.lng}
                          text={'Industry'}
                        />
                      </GoogleMapReact>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid mt={5} textAlign={'center'}>
        <Grid container maxWidth='lg' sx={{margin: 'auto'}}>
          <Grid item xs={12}>
            <H3 fontWeight={'bold'}>{messages['common.contact_office']}</H3>
            <Text>
              BDBL Bhaban (Level 5 - West), 12 Kawran Bazar, Dhaka -1215
            </Text>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Grid container spacing={3} p={2}>
              {(officePersonsContact || []).map(
                (contact: any, index: number) => (
                  <Grid item xs={12} sm={2} md={3} key={index}>
                    <Box className={classes.contactBox}>
                      <H5 sx={{color: 'primary.main'}}>{contact?.name}</H5>
                      <Text className={classes.contactBoxItem}>
                        <Call className={classes.contactBoxItemIcon} />
                        {contact?.mobile}
                      </Text>
                      <Text className={classes.contactBoxItem}>
                        <Email className={classes.contactBoxItemIcon} />
                        {contact?.email}
                      </Text>
                    </Box>
                  </Grid>
                ),
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledGrid>
  );
};

export default ContactPage;
