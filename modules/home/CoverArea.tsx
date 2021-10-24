import React from 'react';
import {Box, Card, CardMedia, Container, Grid} from '@mui/material';
import {Theme} from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import {Fade, Slide} from 'react-awesome-reveal';
import SearchBox from './SearchBox';
import TrendSearchItemList from './TrendSearchItemList';
import {H4, H6} from '../../@softbd/elements/common';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: '#fff',
      height: '440px',
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
      padding: '100px 0',
      background: '#ddd',
      paddingBottom: 'auto',
      [theme.breakpoints.down('xl')]: {
        marginBottom: '10px',
      },
      [theme.breakpoints.down('md')]: {
        marginTop: '70px',
        padding: '48px 5px',
      },
      [theme.breakpoints.only('sm')]: {
        marginTop: '160px',
      },
    },
    trendSearchItem: {
      background: '#fff',
      textAlign: 'center',
      borderRadius: '6px',
    },

    coverImage: {
      height: '430px',
      right: 0,
      bottom: 0,
      borderRadius: '5px',
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        position: 'absolute',
        width: '40%',
      },

      [theme.breakpoints.down('md')]: {
        marginTop: '13px',
        marginBottom: '10px',
        width: '100%',
      },
      [theme.breakpoints.up('xl')]: {
        width: '40%',
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
  return (
    <>
      <Grid container>
        <Grid item xs={12} className={classes.root}>
          <Container maxWidth='lg'>
            <Box pt={6}>
              <Fade direction='up'>
                <H4>
                  <Box fontWeight='fontWeightBold' mt={4}>
                    এখানে খুঁজে নিন আপনার প্রয়োজন <br /> অনুসারে চাকরি অথবা
                    প্রশিক্ষণ
                  </Box>
                </H4>
              </Fade>

              <Fade direction='down'>
                <Box mt={2}>
                  <H6>
                    আপনি যদি একজন চাকরি প্রার্থী হয়ে থাকেন | <br />
                    তাহলে এখনই খুঁজে নিন আপনার প্রয়োজন ও যোগ্যতা
                    <br />
                    অনুসারে চাকরি।
                  </H6>
                </Box>
              </Fade>
            </Box>

            <SearchBox />
          </Container>
        </Grid>
      </Grid>
      <Grid container className={classes.trendWrapper}>
        <Grid item xs={12}>
          <Slide direction='down'>
            <Container maxWidth={'lg'}>
              <Grid container display={'flex'} alignItems={'center'}>
                <H6 mr={2}>ট্রেন্ড সার্চ</H6>
                <TrendSearchItemList
                  searchItems={[
                    'গ্রাফিক্স ডিজাইন',
                    'ওয়েব ডিজাইন',
                    'ইউ-আই/এক্স',
                    'হেলথ কেয়ার জব',
                  ]}
                />
              </Grid>
            </Container>
          </Slide>
        </Grid>
        <Grid item xs={12} mt={{xs: 5, md: 0}}>
          <Card>
            <CardMedia
              component='img'
              alt='green iguana'
              height='140'
              image='/images/cover-area.png'
              className={classes.coverImage}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default CoverArea;
