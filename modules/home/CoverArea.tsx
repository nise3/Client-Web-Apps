import React, {useState} from 'react';
import {
  Box,
  Card,
  CardMedia,
  Container,
  Grid,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import {Theme} from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import {Fade, Slide} from 'react-awesome-reveal';
import SearchBox from './SearchBox';
import TrendSearchItemList from './TrendSearchItemList';

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
      // height: '200px',
      padding: '18px',
      background: '#ddd',
      paddingBottom: 'auto',
      [theme.breakpoints.down('xl')]: {
        marginBottom: '10px',
        marginTop: '140px',
      },
    },
    trendSearchItem: {
      background: '#fff',
      textAlign: 'center',
      padding: '10px',
      borderRadius: '6px',
      marginTop: '42px',
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

      [theme.breakpoints.down('xl')]: {
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
    trendSearchText: {
      marginTop: '5px',
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
  const [typeValue, setTypeValue] = useState(1);
  return (
    <>
      <Grid container>
        <Grid item xs={12} className={classes.root}>
          <Container maxWidth='md'>
            <Box pt={6}>
              <Fade direction='up'>
                <Typography variant='h4'>
                  <Box fontWeight='fontWeightBold' mt={4}>
                    এখানে খুঁজে নিন আপনার প্রয়োজন <br /> অনুসারে চাকরি অথবা
                    প্রশিক্ষণ
                  </Box>
                </Typography>
              </Fade>

              <Fade direction='down'>
                <Box mt={2}>
                  <Typography variant={'h6'}>
                    আপনি যদি একজন চাকরি প্রার্থী হয়ে থাকেন | <br />
                    তাহলে এখনই খুঁজে নিন আপনার প্রয়োজন ও যোগ্যতা
                    <br />
                    অনুসারে চাকরি।
                  </Typography>
                </Box>
              </Fade>
            </Box>

            <Slide direction='up'>
              <Grid item container mt={2}>
                <Grid item xs={6} md={4} lg={2} xl={2}>
                  <Box zIndex={'tooltip'}>
                    <Select
                      className={classes.select}
                      variant='filled'
                      value={typeValue}
                      label=''
                      onChange={(e: any) => {
                        setTypeValue(e?.target?.value);
                      }}>
                      <MenuItem value='1'>দক্ষতা</MenuItem>
                      <MenuItem value='2'>চাকরি</MenuItem>
                      <MenuItem value='3'>ব্যবসা</MenuItem>
                      <MenuItem value='4'>শিক্ষা</MenuItem>
                    </Select>
                  </Box>
                </Grid>
              </Grid>
            </Slide>
            <SearchBox />
          </Container>
        </Grid>
        <Grid container className={classes.trendWrapper}>
          <Container maxWidth='md'>
            <Slide direction='down'>
              <Grid item container xs={12} md={8} spacing={2}>
                <Grid item xs={12} md={2}>
                  <Box>
                    <Typography variant='h6' gutterBottom={true}>
                      ট্রেন্ড সার্চ
                    </Typography>
                  </Box>
                </Grid>
                <TrendSearchItemList
                  searchItems={[
                    'গ্রাফিক্স ডিজাইন',
                    'ওয়েব ডিজাইন',
                    'ইউ-আই/এক্স',
                    'হেলথ কেয়ার জব',
                  ]}
                />
              </Grid>
            </Slide>
          </Container>

          <Card>
            <CardMedia
              component='img'
              alt='green iguana'
              height='140'
              image='/images/cover-area.png'
              className={classes.coverImage}
            />
          </Card>

          {/*<Grid item container md={4} sm={12}>*/}
          {/*  /!*<Zoom>*!/*/}
          {/*  <img*/}
          {/*    src='/images/cover-area.png'*/}
          {/*    alt='crema-logo'*/}
          {/*    // className={classes.coverImage}*/}
          {/*  />*/}
          {/*  /!*</Zoom>*!/*/}
          {/*</Grid>*/}
        </Grid>
      </Grid>
    </>
  );
};

export default CoverArea;
