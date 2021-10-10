import React from 'react';
import {Box, Container, Grid, Link, Typography} from '@mui/material';
import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '50px',
      background: theme.palette.grey.A100,
    },
    foot: {
      marginTop: '50px',
    },
    container: {
      padding: '20px',
    },
    footerImage: {
      width: '280px',
    },
    softbdImage: {
      width: '147px',
    },
  }),
);

const Footer = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.root}>
        <Container maxWidth='xl' className={classes.container}>
          <Grid item container spacing={10}>
            <Grid item md={2}>
              <Typography variant='subtitle2' gutterBottom={true}>
                <Box component={'span'} fontWeight='fontWeightBold'>
                  আমাদের সম্পর্কে
                </Box>
              </Typography>
              <Typography gutterBottom={true}>
                <Box component={'span'} mt={2}>
                  আমাদের সম্পর্কে
                </Box>
              </Typography>
              <Typography gutterBottom={true}>
                <Box component={'span'} mt={2}>
                  শর্তাবলী এবং নীতিমালা
                </Box>
              </Typography>
              <Typography gutterBottom={true}>
                <Box component={'span'} mt={2}>
                  সহযোগী
                </Box>
              </Typography>
              <Typography gutterBottom={true}>
                <Box component={'span'} mt={2}>
                  প্রাইভেসি পলিসি
                </Box>
              </Typography>
              <Typography gutterBottom={true}>
                <Box component={'span'} mt={2}>
                  যোগাযোগ
                </Box>
              </Typography>
              <Typography gutterBottom={true}>
                <Box component={'span'} mt={2}>
                  বিডি জবস
                </Box>
              </Typography>
            </Grid>
            <Grid item md={2}>
              <Typography variant='subtitle2' gutterBottom={true}>
                <Box component={'span'} fontWeight='fontWeightBold'>
                  চাকরি প্রার্থীদের জন্য
                </Box>
              </Typography>
              <Typography gutterBottom={true}>
                <Box component={'span'} mt={2}>
                  জীবনবৃত্তান্ত এডিট
                </Box>
              </Typography>
              <Typography gutterBottom={true}>
                <Box component={'span'} mt={2}>
                  ক্যারিয়ার পরামর্শ
                </Box>
              </Typography>
              <Typography gutterBottom={true}>
                <Box component={'span'} mt={2}>
                  মাই জবস
                </Box>
              </Typography>
              <Typography gutterBottom={true}>
                <Box component={'span'} mt={2}>
                  প্রশ্নাবলী
                </Box>
              </Typography>
              <Typography gutterBottom={true}>
                <Box component={'span'} mt={2}>
                  গাইডলাইন
                </Box>
              </Typography>
            </Grid>
            <Grid item md={2}>
              <Typography variant='subtitle2' gutterBottom={true}>
                <Box component={'span'} fontWeight='fontWeightBold'>
                  চাকরিদাতা
                </Box>
              </Typography>
              <Typography gutterBottom={true}>
                <Box component={'span'} mt={2}>
                  আমাদের সম্পর্কে
                </Box>
              </Typography>
              <Typography gutterBottom={true}>
                <Box component={'span'} mt={2}>
                  শর্তাবলী এবং নীতিমালা
                </Box>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <Grid container className={classes.foot}>
        <Container maxWidth='xl' className={classes.container}>
          <Grid item container spacing={10}>
            <Grid item md={4}>
              <Typography variant='subtitle2' gutterBottom={true}>
                <Box component={'span'} fontWeight='fontWeightBold'>
                  বাস্তবায়নে
                </Box>
              </Typography>
              <Box component={'span'}>
                <img
                  src='/images/footer-img-white.png'
                  alt='crema-logo'
                  className={classes.footerImage}
                />
              </Box>
            </Grid>
            <Grid item md={6} />
            <Grid item md={2}>
              <Typography variant='subtitle2' gutterBottom={true}>
                <Box component={'span'} fontWeight='fontWeightBold'>
                  কারিগরি সহায়তায়
                </Box>
              </Typography>
              <Link href={'https://softbdltd.com/'}>
                <Box component={'span'}>
                  <img
                    src='/images/softbd.png'
                    alt='crema-logo'
                    className={classes.softbdImage}
                  />
                </Box>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </>
  );
};

export default Footer;
