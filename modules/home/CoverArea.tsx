import React from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  NativeSelect,
  OutlinedInput,
  Typography,
  Zoom,
} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {Slide, Fade} from 'react-awesome-reveal';
import LocationOnIcon from '@material-ui/icons/LocationOn';

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
      color: '#000',
      padding: '0 7px 2px 12px',
      marginTop: '13px',
    },
    searchBox: {
      padding: '12px 5px 5px 15px',
      background: '#fff',
      position: 'absolute',
      zIndex: 1,
      width: 'auto',
      // borderRadius: '2px',
      border: 'none',
    },
    skillSlide: {
      zIndex: 2,
      position: 'absolute',
    },
    searchButton: {
      // marginLeft: '50px',
      background: '#682988',
      color: '#fff',
      borderRadius: '0px',
    },
    trendWrapper: {
      position: 'relative',
      height: '200px',
      background: '#ddd',
      [theme.breakpoints.down('sm')]: {
        marginBottom: '10px',
      },
    },
    trendSearchItem: {
      background: '#fff',
      textAlign: 'center',
      padding: '10px',
      borderRadius: '6px',
      marginTop: '42px',
    },

    mobileCoverImage: {
      width: '100%',
      // position: 'absolute',
      right: 0,
      borderRadius: '5px',
      display: 'flex',
      marginTop: '13px',
      marginBottom: '10px',
      [theme.breakpoints.up('md')]: {
        display: 'none',
        marginBottom: '100px',
      },
    },
    coverImage: {
      height: '430px',
      right: 0,
      bottom: 0,
      borderRadius: '5px',
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        position: 'absolute',
        width: '45vw',
      },

      [theme.breakpoints.down('sm')]: {
        marginTop: '13px',
        marginBottom: '10px',
        width: '100%',
      },
      [theme.breakpoints.up('xl')]: {
        width: '47vw',
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
    trendSearchText: {
      marginTop: '5px',
    },
    noBorder: {
      border: 'none',
    },
  }),
);

const CoverArea = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container>
        <Grid item xs={12} className={classes.root}>
          <Container maxWidth='md'>
            <Box pt={10}>
              <Fade direction='up'>
                <Typography variant='h4'>
                  <Box fontWeight='fontWeightBold' mt={15}>
                    এখানে খুঁজে নিন আপনার প্রয়োজন <br /> অনুসারে চাকরি অথবা
                    প্রশিক্ষণ
                  </Box>
                </Typography>
              </Fade>

              <Fade direction='down'>
                <Typography variant='subtitle2'>
                  <Box fontWeight={500} mt={5}>
                    আপনি যদি একজন চাকরি প্রার্থী হয়ে থাকেন | <br />
                    তাহলে এখনই খুঁজে নিন আপনার প্রয়োজন ও যোগ্যতা
                    <br />
                    অনুসারে চাকরি
                  </Box>
                </Typography>
              </Fade>
            </Box>

            <Slide direction='up'>
              <Grid container>
                <Grid item xs={3} xl={2}>
                  <Box mt={10} zIndex={'tooltip'}>
                    <NativeSelect className={classes.select}>
                      <option>দক্ষতা</option>
                      <option>চাকরি</option>
                      <option>ব্যবসা</option>
                      <option>শিক্ষা</option>
                    </NativeSelect>
                  </Box>
                </Grid>
              </Grid>
            </Slide>

            <Grid container spacing={2} className={classes.searchBox}>
              <Grid item xs={12} sm={7}>
                <FormControl variant='outlined'>
                  <InputLabel htmlFor='outlined-adornment-amount'>
                    Search
                  </InputLabel>
                  <OutlinedInput
                    className={classes.noBorder}
                    id='outlined-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>
                        <SearchIcon /> অনুসন্ধান করুণ
                      </InputAdornment>
                    }
                    labelWidth={60}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={3}>
                <NativeSelect>
                  <LocationOnIcon />
                  <option>লোকেশন</option>
                </NativeSelect>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Button variant='contained' className={classes.searchButton}>
                  অনুসন্ধান
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Grid>
        <Grid container className={classes.trendWrapper}>
          <Container maxWidth='md'>
            <Slide direction='down'>
              <Grid container xs={12} md={6} spacing={2}>
                <Grid item xs={3}>
                  <Box mt={10}>
                    <Typography variant='h6' gutterBottom={true}>
                      ট্রেন্ড সার্চ
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={3} md={3}>
                  <Box mt={10} className={classes.trendSearchKey}>
                    <p>গ্রাফিক্স ডিজাইন</p>
                  </Box>
                </Grid>
                <Grid item xs={3} md={3}>
                  <Box mt={10} className={classes.trendSearchKey}>
                    <p>ওয়েব ডিজাইন</p>
                  </Box>
                </Grid>
                <Grid item xs={3} md={3}>
                  <Box mt={10} className={classes.trendSearchKey}>
                    <p>ইউ-আই/এক্স</p>
                  </Box>
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3} md={3}>
                  <Box className={classes.trendSearchKey}>
                    <p> হেলথ কেয়ার জব</p>
                  </Box>
                </Grid>
              </Grid>
            </Slide>
          </Container>
          {/*<Box className={classes.coverImage}>*/}
          {/*  <Image*/}
          {/*    src={coverImg}*/}
          {/*    width={550}*/}
          {/*    height={400}*/}
          {/*    alt='cover-image'*/}
          {/*  />*/}
          {/*</Box>*/}

          <Grid container>
            <Zoom>
              <>
                <img
                  src='/images/cover-area.png'
                  alt='crema-logo'
                  className={classes.coverImage}
                />
                {/*<img*/}
                {/*  src='/images/cover-area.png'*/}
                {/*  alt='crema-logo'*/}
                {/*  className={classes.mobileCoverImage}*/}
                {/*/>*/}
              </>
            </Zoom>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CoverArea;
