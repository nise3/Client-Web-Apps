import {useEffect, useMemo, useState} from 'react';
import {styled} from '@mui/material/styles';
import {Button, Card, CardContent, Grid, Typography} from '@mui/material';
import {useIntl} from 'react-intl';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import yup from '../../../@softbd/libs/yup';
import {createRankType} from '../../../services/organaizationManagement/RankTypeService';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {H3} from '../../../@softbd/elements/common';
import RoomIcon from '@mui/icons-material/Room';
import GoogleMapReact from 'google-map-react';
import {useFetchInstitutesContactMap} from '../../../services/instituteManagement/hooks';
import {MOBILE_NUMBER_REGEX} from '../../../@softbd/common/patternRegex';

const PREFIX = 'InstituteContact';

const classes = {
  buttons: `${PREFIX}-buttons`,
  mainGrid: `${PREFIX}-mainGrid`,
  heading: `${PREFIX}-heading`,
  formCard: `${PREFIX}-formCard`,
  mapDiv: `${PREFIX}-mapDiv`,
};

const StyledGrid = styled(Grid)(({theme}) => {
  return {
    [`& .${classes.buttons}`]: {
      background: theme.palette.primary.dark,
      width: '100%',
    },
    [`& .${classes.mainGrid}`]: {
      background: theme.palette.primary.light,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '100%',
    },
    [`& .${classes.heading}`]: {
      boxShadow: '0px 2px 2px #8888',
    },
    [`& .${classes.formCard}`]: {
      [theme.breakpoints.up('md')]: {
        height: '500px',
      },
    },
    [`& .${classes.mapDiv}`]: {
      height: '320px',
      width: '100%',
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

const InstituteContact = () => {
  const {messages} = useIntl();
  const {successStack, errorStack} = useNotiStack();

  const {data: mapsData} = useFetchInstitutesContactMap();

  const [mapCenter, setMapCenter] = useState({
    lat: 23.776488939377593,
    lng: 90.38155009066672,
  });

  const [mapLocations, setMapLocations] = useState([]);

  useEffect(() => {
    setMapLocations(mapsData);
  }, [mapsData]);

  const APIKEY = 'AIzaSyCUacnvu4F1i4DXD_o9pxhkZHvU1RYhz5I';

  const onChangeMapValue = (value: any) => {
    let filterData = mapsData?.filter((item: any) => item.title === value);
    let newArr: any = [...filterData];
    setMapLocations(newArr);
    if (newArr.length > 0) {
      setMapCenter({lat: newArr[0].lat, lng: newArr[0].lng});
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      recipient: yup.string().label(messages['recipient.institute'] as string),
      name: yup
        .string()
        .required()
        .label(messages['common.name'] as string),
      phone_numbers: yup
        .string()
        .required()
        .label(messages['common.phone_number'] as string)
        .matches(MOBILE_NUMBER_REGEX),
      email_address: yup
        .string()
        .label(messages['common.email'] as string)
        .email(),
      advice: yup
        .string()
        .required()
        .label(messages['advice.institute'] as string),
    });
  }, [messages]);

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: {errors, isSubmitting},
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      await createRankType(data);
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='contact.institute' />}}
        />,
      );
      reset();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <StyledGrid sx={{maxWidth: '100%'}}>
      <Grid textAlign={'center'} className={classes.heading}>
        <H3 py={3} fontWeight={'bold'}>
          {messages['contact.institute']}
        </H3>
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
                <Typography variant={'h6'} mb={4}>
                  {messages['find_our_location_in_map.institute']}
                </Typography>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <CustomFormSelect
                      id='title'
                      label={messages['common.location']}
                      isLoading={false}
                      control={control}
                      optionValueProp={'title'}
                      options={mapsData}
                      optionTitleProp={['title']}
                      onChange={onChangeMapValue}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <div className={classes.mapDiv}>
                      <GoogleMapReact
                        bootstrapURLKeys={{key: APIKEY}}
                        defaultCenter={mapCenter}
                        defaultZoom={11}
                        center={mapCenter}>
                        {mapLocations?.map((item: any, i: number) => (
                          <MapComponent
                            key={i}
                            lat={item.lat}
                            lng={item.lng}
                            text={item.title}
                          />
                        ))}
                      </GoogleMapReact>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </StyledGrid>
  );
};

export default InstituteContact;
