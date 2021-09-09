import React from 'react';
import {Box, Container, Grid} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '50px',
      height: '250px',
      background: '#F7F7F7',
    },
  }),
);

const Footer = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.root}>
        <Container maxWidth='md'>
          <Grid item xl={3}>
            <Box> আমাদের সম্পর্কে</Box>
            <Box> আমাদের সম্পর্কে </Box>
            <Box> শর্তাবলী এবং নীতিমালা </Box>
            <Box> শর্তাবলী এবং নীতিমালা </Box>
            <Box> সহযোগী </Box>
            <Box> প্রাইভেসি পলিসি </Box>
            <Box> যোগাযোগ </Box>
            <Box> বিডি জবস </Box>
          </Grid>
        </Container>
      </Grid>
    </>
  );
};

export default Footer;
