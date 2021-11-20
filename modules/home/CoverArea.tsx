import React from 'react';
import {styled} from '@mui/material/styles';
import {Box, Container, Grid} from '@mui/material';
import {Fade, Slide} from 'react-awesome-reveal';
import SearchBox from './SearchBox';
import TrendSearchItemList from './TrendSearchItemList';
import {H1, H6, Text} from '../../@softbd/elements/common';
import {useIntl} from 'react-intl';
import {LINK_INSTITUTE_SIGNUP} from '../../@softbd/common/appLinks';
import {useRouter} from 'next/router';

const PREFIX = 'CoverArea';

const classes = {
  root: `${PREFIX}-root`,
  trendWrapper: `${PREFIX}-trendWrapper`,
  fold: `${PREFIX}-fold`,
  certifiedImage: `${PREFIX}-certifiedImage`,
  foldStyle: `${PREFIX}-foldStyle`,
  coverImg: `${PREFIX}-coverImg`,
};

const StyledBox = styled(Box)(({theme}) => ({
  [`& .${classes.root}`]: {
    color: '#fff',
    background:
      'linear-gradient(152deg, rgba(5, 99, 7, 1) 0%, rgb(108 95 9) 51%, rgb(100 89 15) 74%)',
  },

  [`& .${classes.trendWrapper}`]: {
    position: 'relative',
    background: '#ddd',
    paddingBottom: 'auto',
  },

  [`& .${classes.fold}`]: {
    position: 'absolute',
    height: '430px',
    display: 'flex',
    transition: 'all ease 0.5s',
    right: 0,
    bottom: 0,
    [`&:hover .${classes.foldStyle}`]: {
      width: '150px',
      height: '150px',
      transition: 'all ease 0.5s',
      [theme.breakpoints.up('xl')]: {
        width: '200px',
        height: '200px',
      },
    },
    [`&:hover .${classes.foldStyle}::before`]: {
      borderWidth: '0 150px 150px 0',
      transition: 'all ease 0.5s',
      [theme.breakpoints.up('xl')]: {
        borderWidth: '0 200px 200px 0',
      },
    },
    [`&:hover .${classes.certifiedImage}`]: {
      width: '150px',
      height: '150px',
      transition: 'all ease 0.5s',
      [theme.breakpoints.up('xl')]: {
        width: '200px',
        height: '200px',
      },
    },
    [theme.breakpoints.down('md')]: {
      position: 'unset',
    },
  },

  [`& .${classes.certifiedImage}`]: {
    position: 'absolute',
    right: 0,
    width: '80px',
    height: '80px',
    backgroundPosition: 'top right',
    backgroundSize: '110px',
    backgroundColor: '#fff',
    backgroundRepeat: 'no-repeat',
    transition: 'all ease 0.5s',
    cursor: 'pointer',
    [theme.breakpoints.up('xl')]: {
      width: '150px',
      height: '150px',
      backgroundSize: '180px',
    },
  },

  [`& .${classes.foldStyle}`]: {
    position: 'absolute',
    right: 0,
    width: '80px',
    height: '80px',
    transition: 'all ease 0.5s',
    [theme.breakpoints.up('xl')]: {
      width: '150px',
      height: '150px',
    },
    '&::before': {
      content: '""',
      left: 0,
      position: 'absolute',
      borderStyle: 'solid',
      borderWidth: '0 80px 80px 0',
      borderColor: '#fbfbfb transparent',
      transition: 'all ease 0.5s',
      boxShadow: '0px 4px 9px -2px #898989',
      [theme.breakpoints.up('xl')]: {
        borderWidth: '0 150px 150px 0',
      },
    },
  },

  [`& .${classes.coverImg}`]: {
    width: '400px',
    backgroundSize: '100% 100%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    [theme.breakpoints.only('md')]: {
      width: '500px',
    },
    [theme.breakpoints.only('lg')]: {
      width: '600px',
    },
    [theme.breakpoints.up('xl')]: {
      width: '800px',
    },
  },
}));

const CoverArea = () => {
  const {messages} = useIntl();
  const router = useRouter();
  const coverImageUrl = '/images/cover-area.png';
  const certifiedImageUrl = '/images/icon_certified.svg';

  return (
    <StyledBox sx={{position: 'relative'}}>
      <Box className={classes.root}>
        <Container maxWidth='lg'>
          <Grid container>
            <Grid item xs={8} mt={{xs: 5, md: 8}}>
              <Fade direction='up'>
                <H1 sx={{fontWeight: 'bold'}}>
                  {messages['landing.text_find_job_here']}
                </H1>
              </Fade>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} mt={{sm: 3}}>
              <Fade direction='down'>
                <Text
                  style={{
                    fontSize: '22px',
                    fontWeight: '300',
                    lineHeight: '33px',
                  }}>
                  {messages['landing.text_if_candidate']}
                </Text>
              </Fade>
            </Grid>
          </Grid>
          <SearchBox />
        </Container>
      </Box>
      <Grid container className={classes.trendWrapper}>
        <Grid item xs={12}>
          <Slide direction='down'>
            <Container maxWidth={'lg'}>
              <Grid
                container
                display={'flex'}
                alignItems={'center'}
                height='180px'>
                <H6 mr={2}>{messages['nise.trend_search']}</H6>
                <TrendSearchItemList
                  searchItems={[
                    messages['nise.graphics_design'],
                    messages['nise.web_design'],
                    messages['nise.ui_ux'],
                    messages['nise.health_care'],
                  ]}
                />
              </Grid>
            </Container>
          </Slide>
        </Grid>
      </Grid>
      <Box className={classes.fold}>
        <Box
          sx={{backgroundImage: `url(${certifiedImageUrl})`}}
          className={classes.certifiedImage}
          onClick={() => {
            router
              .push({
                pathname: LINK_INSTITUTE_SIGNUP,
              })
              .then((r) => {});
          }}>
          <Box className={classes.foldStyle} />
        </Box>
        <Box
          className={classes.coverImg}
          sx={{background: `url(${coverImageUrl}) no-repeat`}}
        />
      </Box>
    </StyledBox>
  );
};

export default CoverArea;
