import React from 'react';
import {Box, Button, Container, Grid, Typography} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {ArrowRightAlt, DateRangeOutlined} from '@material-ui/icons';
import SectionTitle from './SectionTitle';
import {Fade} from 'react-awesome-reveal';
import Image from 'next/image';
import recentActivitiesOne from '../../public/images/recent-activities1.png';
import recentActivitiesTwo from '../../public/images/recent-activities2.png';
import recentActivitiesThree from '../../public/images/recent-activities3.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '50px',
    },
    image1: {
      width: '100%',
      height: '100%',
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
    dateInfo2: {
      position: 'absolute',
      zIndex: 99,
      left: '0',
      top: '0',
      background: '#fff',
      color: '#000',
      display: 'flex',
      padding: '4px',
      width: '130px',
      borderRadius: '5px',
      marginBottom: '10px',
    },
  }),
);

const RecentActivities = () => {
  const classes = useStyles();

  return (
    <Grid container xl={12} className={classes.root}>
      <Container maxWidth='md' disableGutters>
        <SectionTitle title='সাম্প্রতিক কার্যক্রম'></SectionTitle>
        <Fade cascade duration={4000}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <Box className={classes.imgWrapper}>
                <Image
                  src={recentActivitiesOne}
                  alt={'activities one'}
                  className={classes.image1}
                  height={1530}></Image>
                <Box className={classes.imgInfo}>
                  <Box className={classes.dateInfo}>
                    <DateRangeOutlined />
                    <Typography>১২ জুন ২০২১</Typography>
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
            <Grid item xs={12} md={6}>
              <Grid container>
                <Grid item xs={12} md={12}>
                  <Box
                    className={classes.imgWrapper}
                    sx={{position: 'relative'}}>
                    <Image
                      src={recentActivitiesTwo}
                      alt={'activities two'}
                      className={classes.image2}></Image>

                    <Box className={classes.dateInfo2}>
                      <DateRangeOutlined />
                      <Typography>১২ জুন ২০২১</Typography>
                    </Box>
                    <Box className={classes.imgInfo}>
                      <Typography variant='subtitle2'>
                        <Box fontWeight='fontWeightBold' m={1}>
                          শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়ে
                          শিক্ষার্থীদের ল্যাপটপ বিতরণ অনুষ্ঠান
                        </Box>
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Box className={classes.imgWrapper}>
                    <Image
                      src={recentActivitiesThree}
                      alt={'activities Three'}
                      className={classes.image3}></Image>
                    <Box className={classes.imgInfo}>
                      <Box className={classes.dateInfo}>
                        <DateRangeOutlined />
                        <Typography>১২ জুন ২০২১</Typography>
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
                <Grid item xs={6} md={6}>
                  <Box className={classes.imgWrapper}>
                    <Image
                      src={recentActivitiesThree}
                      alt={'activities Three'}
                      className={classes.image3}></Image>
                    <Box className={classes.imgInfo}>
                      <Box className={classes.dateInfo}>
                        <DateRangeOutlined />
                        <Typography>১২ জুন ২০২১</Typography>
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
          </Grid>
        </Fade>
        <Grid container justifyContent='flex-end'>
          <Button
            variant='outlined'
            color='primary'
            endIcon={<ArrowRightAlt />}>
            আরো দেখুন
          </Button>
        </Grid>
      </Container>
    </Grid>
  );
};
export default RecentActivities;
