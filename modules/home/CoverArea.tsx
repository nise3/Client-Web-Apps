import React from 'react';
import {Box, Card, CardMedia, Container, Grid} from '@mui/material';
import {Theme} from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import {Fade, Slide} from 'react-awesome-reveal';
import SearchBox from './SearchBox';
import TrendSearchItemList from './TrendSearchItemList';
import {H3, H6, Text} from '../../@softbd/elements/common';
import {useIntl} from 'react-intl';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: '#fff',
      background:
        'linear-gradient(152deg, rgba(5, 99, 7, 1) 0%, rgb(108 95 9) 51%, rgb(100 89 15) 74%)',
    },
    select: {
      border: '1px solid #5e6b0f',
      background: ' #5e6b0f',
      textAlign: 'center',
      color: '#fff',
      padding: '0 7px 2px 12px',
      height: 40,
      width: 150,
      '&>div, &>div:focus': {
        backgroundColor: 'transparent',
      },
      '&::before': {
        display: 'none',
      },
      '&::after': {
        display: 'none',
      },
    },
    selectOption: {
      color: '#000',
    },
    skillSlide: {
      zIndex: 2,
      position: 'absolute',
    },

    trendWrapper: {
      position: 'relative',
      background: '#ddd',
      paddingBottom: 'auto',
    },
    trendSearchItem: {
      background: '#fff',
      textAlign: 'center',
      borderRadius: '6px',
    },
    coverImage: {
      position: 'absolute',
      height: '430px',
      display: 'flex',
      [theme.breakpoints.up('sm')]: {
        right: 0,
        bottom: 0,
        width: '502px',
      },
      [theme.breakpoints.down('sm')]: {
        bottom: '-430px',
        left: 0,
        width: '100%',
      },
    },
    animationFillMode: {
      animationFillMode: 'backwards !important',
    },
    trendSearchKey: {
      background: '#fff',
      textAlign: 'center',
      borderRadius: '6px',
      padding: '1px',
    },
    noBorder: {
      border: 'none',
    },
    dropdownStyle: {
      border: '1px solid black',
      borderRadius: '5%',
      backgroundColor: 'lightgrey',
    },
  }),
);

const CoverArea = () => {
  const classes = useStyles();
  const {messages} = useIntl();
  return (
    <>
      <Box sx={{position: 'relative'}}>
        <Box className={classes.root}>
          <Container maxWidth='lg'>
            <Grid container>
              <Grid item xs={8} mt={{xs: 5, md: 8}}>
                <Fade direction='up'>
                  <H3 style={{fontSize: '44px', lineHeight: '62px'}}>{messages['landing.text_find_job_here']}</H3>
                </Fade>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} mt={{sm: 3}} sx={{marginBottom: '100px'}}>
                <Fade direction='down'>
                  <Text style={{
                    fontSize: '22px',
                    fontWeight: '300',
                    lineHeight: '33px',
                  }}>{messages['landing.text_if_candidate']}</Text>
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
        <Card>
          <CardMedia
            component='img'
            alt='green iguana'
            height='140'
            image='/images/cover-area.png'
            className={classes.coverImage}
          />
        </Card>
      </Box>
    </>
  );
};

export default CoverArea;
