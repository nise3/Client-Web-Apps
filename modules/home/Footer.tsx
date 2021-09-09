import React from 'react';
import {Box, Container, Grid, Typography} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '50px',
      height: '250px',
      background: '#F7F7F7',
      padding: '20px',
    },
  }),
);

const Footer = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.root}>
        <Container maxWidth='md'>
          <Grid container xl={12} spacing={10}>
            <Grid item xl={3}>
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
            <Grid item xl={3}>
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
            <Grid item xl={3}>
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
            <Grid item xl={3}>
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
            <Grid item xl={3}>
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
          </Grid>
        </Container>
      </Grid>
    </>
  );
};

export default Footer;
