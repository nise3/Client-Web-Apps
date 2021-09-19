import React from 'react';
import {Box, Container, Grid, Typography} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '50px',
      background: '#F7F7F7',
      padding: '20px',
    },
    footerImage: {
      width: '280px',
    },
    softbdImage: {
      width: '150px',
    },
  }),
);

const Footer = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.root}>
        <Container maxWidth='xl'>
          <Grid container spacing={10}>
            <Grid item lg={2}>
              <Typography variant='subtitle2' gutterBottom={true}>
                <Box fontWeight='fontWeightBold'>আমাদের সম্পর্কে</Box>
              </Typography>
              <Typography gutterBottom={true}>
                <Box mt={2}>আমাদের সম্পর্কে</Box>
              </Typography>
              <Typography gutterBottom={true}>
                <Box mt={2}>শর্তাবলী এবং নীতিমালা</Box>
              </Typography>
              <Typography gutterBottom={true}>
                <Box mt={2}>সহযোগী</Box>
              </Typography>
              <Typography gutterBottom={true}>
                <Box mt={2}>প্রাইভেসি পলিসি</Box>
              </Typography>
              <Typography gutterBottom={true}>
                <Box mt={2}>যোগাযোগ</Box>
              </Typography>
              <Typography gutterBottom={true}>
                <Box mt={2}>বিডি জবস</Box>
              </Typography>
            </Grid>
            <Grid item lg={2}>
              <Typography variant='subtitle2' gutterBottom={true}>
                <Box fontWeight='fontWeightBold'>চাকরি প্রার্থীদের জন্য</Box>
              </Typography>
              <Typography gutterBottom={true}>
                <Box mt={2}>জীবনবৃত্তান্ত এডিট</Box>
              </Typography>
              <Typography gutterBottom={true}>
                <Box mt={2}>ক্যারিয়ার পরামর্শ</Box>
              </Typography>
              <Typography gutterBottom={true}>
                <Box mt={2}>মাই জবস</Box>
              </Typography>
              <Typography gutterBottom={true}>
                <Box mt={2}>প্রশ্নাবলী</Box>
              </Typography>
              <Typography gutterBottom={true}>
                <Box mt={2}>গাইডলাইন</Box>
              </Typography>
            </Grid>
            <Grid item lg={2}>
              <Typography variant='subtitle2' gutterBottom={true}>
                <Box fontWeight='fontWeightBold'>চাকরিদাতা</Box>
              </Typography>
              <Typography gutterBottom={true}>
                <Box mt={2}>আমাদের সম্পর্কে</Box>
              </Typography>
              <Typography gutterBottom={true}>
                <Box mt={2}>শর্তাবলী এবং নীতিমালা</Box>
              </Typography>
            </Grid>
            <Grid item lg={4}>
              <Typography variant='subtitle2' gutterBottom={true}>
                <Box fontWeight='fontWeightBold'>বাস্তবায়নে</Box>
              </Typography>
              <Box>
                <img
                  src='/images/footer-img.png'
                  alt='crema-logo'
                  className={classes.footerImage}
                />
              </Box>
            </Grid>
            <Grid item lg={2}>
              <Typography variant='subtitle2' gutterBottom={true}>
                <Box fontWeight='fontWeightBold'>কারিগরি সহায়তায়</Box>
              </Typography>
              <Box>
                <img
                  src='/images/softbd.png'
                  alt='crema-logo'
                  className={classes.softbdImage}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </>
  );
};

export default Footer;
