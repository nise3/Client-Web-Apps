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
} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {Slide, Fade, Zoom} from 'react-awesome-reveal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: '#fff',
      height: '440px',
      background:
        'linear-gradient(152deg, rgba(5, 99, 7, 1) 0%, rgb(108 95 9) 51%, rgb(100 89 15) 74%)',
    },
    select: {
      width: '110px',
      border: '1px solid #5e6b0f',
      background: ' #5e6b0f',
      textAlign: 'center',
      color: '#fff',
      padding: '5px',
    },
    searchBox: {
      padding: '12px 0px 5px 15px',
      background: '#fff',
      position: 'absolute',
      zIndex: 1,
      width: 'auto',
      borderRadius: '2px',
    },
    searchButton: {
      background: '#682988',
      color: '#fff',
    },
    trendWrapper: {
      height: '150px',
      background: '#ddd',
    },
    trendSearchItem: {
      background: '#fff',
      textAlign: 'center',
      padding: '10px',
      borderRadius: '6px',
      width: '145px',
      margin: '5px',
    },
    coverImage: {
      width: '550px',
      position: 'absolute',
      right: 0,
      bottom: '-150px',
      borderRadius: '5px',
    },
    animationFillMode: {
      animationFillMode: 'backwards !important',
    },
  }),
);

const CoverArea = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container xl={12}>
        <Grid item sm={12} className={classes.root}>
          <Container maxWidth='sm'>
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
            <Slide direction='up' cascade>
              <Box mt={10} mb={1}>
                <NativeSelect className={classes.select}>
                  <option>দক্ষতা</option>
                  <option>চাকরি</option>
                  <option>ব্যবসা</option>
                  <option>শিক্ষা</option>
                </NativeSelect>
              </Box>
            </Slide>

            <Grid container spacing={3} className={classes.searchBox}>
              <Grid item xl={8}>
                <FormControl variant='outlined' style={{width: '550px'}}>
                  <InputLabel htmlFor='outlined-adornment-amount'>
                    Search
                  </InputLabel>
                  <OutlinedInput
                    id='outlined-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>
                        <SearchIcon />
                      </InputAdornment>
                    }
                    labelWidth={60}
                  />
                </FormControl>
              </Grid>
              <Grid item xl={2}>
                <NativeSelect>
                  <option>লোকেশন</option>
                </NativeSelect>
              </Grid>
              <Grid item xl={2}>
                <Button variant='contained' className={classes.searchButton}>
                  অনুসন্ধান
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Grid>
        <Grid container className={classes.trendWrapper}>
          <Container maxWidth='md'>
            <Box pt={10}>
              <Typography variant='h6' gutterBottom={true}>
                ট্রেন্ড সার্চ
              </Typography>
            </Box>
            <Slide direction='down'>
              <Grid container xl={8}>
                <Grid item xl={3}>
                  <Box className={classes.trendSearchItem}>
                    গ্রাফিক্স ডিজাইন
                  </Box>
                </Grid>
                <Grid item xl={3}>
                  <Box className={classes.trendSearchItem}>ওয়েব ডিজাইন</Box>
                </Grid>
                <Grid item xl={3}>
                  <Box className={classes.trendSearchItem}>ইউ-আই/এক্স</Box>
                </Grid>
                <Grid item xl={3}>
                  <Box className={classes.trendSearchItem}>হেলথ কেয়ার জব</Box>
                </Grid>
              </Grid>
            </Slide>
          </Container>
          <Zoom>
            <Grid item style={{position: 'relative'}}>
              {/*<Box className={classes.coverImage}>*/}
              {/*  <Image*/}
              {/*    src={coverImg}*/}
              {/*    width={550}*/}
              {/*    height={400}*/}
              {/*    alt='cover-image'*/}
              {/*  />*/}
              {/*</Box>*/}

              <img
                src='/images/cover-area.png'
                alt='crema-logo'
                className={classes.coverImage}
              />
            </Grid>
          </Zoom>
        </Grid>
      </Grid>
    </>
  );
};

export default CoverArea;
