import React, {useEffect, useMemo, useState} from 'react';
import {Box, Button, Card, CardContent, Grid, Skeleton} from '@mui/material';
import {H1, H2, H3, H6, Text} from '../../../@softbd/elements/common';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import GoogleMapReact from 'google-map-react';
import {styled} from '@mui/material/styles';
import {ThemeMode} from '../../../shared/constants/AppEnums';
import RoomIcon from '@mui/icons-material/Room';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {GOOGLE_MAP_API_KEY} from '../../../@softbd/common/constants';
import yup from '../../../@softbd/libs/yup';
import {
  EMAIL_REGEX,
  MOBILE_NUMBER_REGEX,
} from '../../../@softbd/common/patternRegex';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {VisitorFeedbackTypes} from '../../../services/cmsManagement/Constants';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {Call, Email} from '@mui/icons-material';
import {useCustomStyle} from '../../../@softbd/hooks/useCustomStyle';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {createVisitorFeedbackIndustry} from '../../../services/cmsManagement/VisitorFeedbackService';
import {
  useFetchContactInfo,
  useFetchPublicIndustryAssocDetails,
} from '../../../services/IndustryManagement/hooks';
import {
  isValidLatitude,
  isValidLongitude,
} from '../../../@softbd/utilities/helpers';

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
        height: '570px',
      },
    },
    [`& .${classes.mapDiv}`]: {
      height: '320px',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        height: '463px',
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
    <div style={{color: '#8c8888'}}>{text}</div>
  </div>
);

const ContactPage = () => {
  const result = useCustomStyle();
  const {messages} = useIntl();
  const {successStack, errorStack} = useNotiStack();

  const {data: industryAssociationDetails} =
    useFetchPublicIndustryAssocDetails();

  const [mapCenter, setMapCenter] = useState({
    lat: 23.776488939377593,
    lng: 90.38155009066672,
  });

  // 28.6466773,76.813073

  useEffect(() => {
    setMapCenter({
      lat: isValidLatitude(industryAssociationDetails?.location_latitude)
        ? parseFloat(industryAssociationDetails?.location_latitude)
        : 23.776488939377593,
      lng: isValidLongitude(industryAssociationDetails?.location_longitude)
        ? parseFloat(industryAssociationDetails?.location_longitude)
        : 90.38155009066672,
    });
  }, [industryAssociationDetails]);

  const [contactInfoFilter] = useState({});

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
        .mixed()
        .label(messages['common.email'] as string)
        .test(
          'email_validation',
          messages['common.validation_email_error'] as string,
          (value) => !value || Boolean(value.match(EMAIL_REGEX)),
        ),

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
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    data.form_type = VisitorFeedbackTypes.CONTACTUS;
    // data.industry_association_id = 30;

    try {
      await createVisitorFeedbackIndustry(data);
      //console.log(data);
      successStack(
        <IntlMessages
          id='common.submitted_feedback'
          values={{subject: <IntlMessages id='common.your_info' />}}
        />,
      );
      reset();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  const {data: contactInfoData, isLoading: isLoadingContactInfo} =
    useFetchContactInfo(contactInfoFilter);

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
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <CustomTextInput
                          required
                          id='name'
                          label={messages['common.name']}
                          register={register}
                          errorInstance={errors}
                          isLoading={false}
                        />
                      </Grid>
                      <Grid item xs={12}>
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
                        defaultZoom={15}
                        center={mapCenter}>
                        <MapComponent
                          lat={mapCenter.lat}
                          lng={mapCenter.lng}
                          text={industryAssociationDetails?.title}
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
            <Text>{industryAssociationDetails?.address}</Text>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Grid container spacing={3} p={2}>
              {isLoadingContactInfo ? (
                <Grid
                  item
                  xs={12}
                  sx={{display: 'flex', justifyContent: 'space-evenly'}}>
                  <Skeleton variant='rectangular' width={'22%'} height={140} />
                  <Skeleton variant='rectangular' width={'22%'} height={140} />
                  <Skeleton variant='rectangular' width={'22%'} height={140} />
                  <Skeleton variant='rectangular' width={'22%'} height={140} />
                </Grid>
              ) : (
                <>
                  {contactInfoData?.map((contact: any) => (
                    <Grid item xs={12} sm={2} md={3} key={contact.id}>
                      <Box className={classes.contactBox}>
                        <H6
                          sx={{
                            color: 'primary.main',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                          title={contact?.title}>
                          {contact?.title}
                        </H6>
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
                  ))}
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledGrid>
  );
};

export default ContactPage;
