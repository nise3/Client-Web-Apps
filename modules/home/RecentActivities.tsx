import React from 'react';
import {Box, Button, Container, Grid, Typography} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {DateRangeOutlined} from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '50px',
    },
    image1: {
      width: '100%',
      height: '430px',
      borderRadius: '5px',
    },
    image2: {
      width: '100%',
      height: '100%',
      borderRadius: '5px',
    },
    image3: {
      width: '100%',
      height: '100%',
      borderRadius: '5px',
    },
    imgInfo: {
      position: 'absolute',
      bottom: ' 5px',
      padding: '5px',
      background: '#2b1f1f82',
      color: '#fff',
      width: '100%',
    },
    imgWrapper: {
      position: 'relative',
    },
    dateInfo: {
      background: '#fff',
      color: '#000',
      display: 'flex',
      padding: '4px',
      width: '130px',
      borderRadius: '5px',
      marginBottom: '10px',
    },
    title: {
      color: '#682988',
      display: 'flex',
      alignItems: 'center',
    },
    vBar: {
      height: '40px',
      width: '5px',
      background: 'linear-gradient(45deg, #ec5c17,#5affab)',
      marginRight: '10px',
    },
  }),
);

const RecentActivities = () => {
  const classes = useStyles();

  return (
    <Grid container xl={12} className={classes.root}>
      <Container maxWidth='md' disableGutters>
        <Typography variant='h5'>
          <Box mb={5} className={classes.title}>
            <Box className={classes.vBar}></Box>
            <Box fontWeight='fontWeightBold'>সাম্প্রতিক কার্যক্রম</Box>
          </Box>
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <Box className={classes.imgWrapper}>
              <img
                src='/images/recent-activities1.png'
                alt='crema-logo'
                className={classes.image1}
              />
              <Box className={classes.imgInfo}>
                <Box className={classes.dateInfo}>
                  <DateRangeOutlined />
                  <Typography>12 Jan 2021</Typography>
                </Box>
                <Typography variant='subtitle2'>
                  <Box fontWeight='fontWeightBold' m={1}>
                    চট্টগ্রাম জেলার জাতীয় বিশ্ববিদ্যালয়ের ছাত্র ছাত্রী দের ফ্রি
                    হেলথ ইনস্যুরেন্স
                  </Box>
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid container xs={6} spacing={2}>
            <Box className={classes.imgWrapper}>
              <img
                src='/images/recent-activities2.png'
                alt='crema-logo'
                className={classes.image2}
              />
              <Box className={classes.imgInfo}>
                <Box className={classes.dateInfo}>
                  <DateRangeOutlined />
                  <Typography>12 Jan 2021</Typography>
                </Box>
                <Typography variant='subtitle2'>
                  <Box fontWeight='fontWeightBold' m={1}>
                    শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়ে শিক্ষার্থীদের
                    ল্যাপটপ বিতরণ অনুষ্ঠান
                  </Box>
                </Typography>
              </Box>
            </Box>
            <Grid item xs={6}>
              <Box className={classes.imgWrapper}>
                <img
                  src='/images/recent-activities3.png'
                  alt='crema-logo'
                  className={classes.image3}
                />
                <Box className={classes.imgInfo}>
                  <Box className={classes.dateInfo}>
                    <DateRangeOutlined />
                    <Typography>12 Jan 2021</Typography>
                  </Box>
                  <Typography variant='subtitle2'>
                    <Box fontWeight='fontWeightBold' m={1}>
                      চট্টগ্রাম জেলার জাতীয় বিশ্ববিদ্যালয়ের ছাত্র ছাত্রী দের
                      ফ্রি হেলথ ইনস্যুরেন্স
                    </Box>
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className={classes.imgWrapper}>
                <img
                  src='/images/recent-activities3.png'
                  alt='crema-logo'
                  className={classes.image3}
                />
                <Box className={classes.imgInfo}>
                  <Box className={classes.dateInfo}>
                    <DateRangeOutlined />
                    <Typography>12 Jan 2021</Typography>
                  </Box>
                  <Typography variant='subtitle2'>
                    <Box fontWeight='fontWeightBold' m={1}>
                      চট্টগ্রাম জেলার জাতীয় বিশ্ববিদ্যালয়ের ছাত্র ছাত্রী দের
                      ফ্রি হেলথ ইনস্যুরেন্স
                    </Box>
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justifyContent='flex-end'>
          <Button variant='outlined' color='primary'>
            আরো দেখুন
          </Button>
        </Grid>
      </Container>
    </Grid>
  );
};
export default RecentActivities;
