import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Box, Button, Container, Grid, Typography} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '40px',
    },
    detailsButton: {
      background: '#682988',
      color: '#fff',
    },
    assessmentImage: {
      height: '340px',
    },
  }),
);

const SelfAssessment = () => {
  const classes = useStyles();
  return (
    <Container maxWidth='md' disableGutters className={classes.root}>
      <Grid
        container
        spacing={4}
        justifyContent='flex-start'
        alignItems='center'>
        <Grid item xs={8}>
          <Typography variant='h4' gutterBottom={true}>
            <Box fontWeight='fontWeightBold' mb={6}>
              নিজেকে যাচাই করুন
            </Box>
          </Typography>
          <Typography variant='subtitle1' gutterBottom={true}>
            <Grid item xs={8}>
              <Box mb={8}>
                আপনার ক্যারিয়ারের আগ্রহ, দক্ষতা, কাজের মান এবং শেখার স্টাইল
                সম্পর্কে আরও আবিষ্কার করুন। এই সরঞ্জামগুলি আত্ম-সচেতনতা এবং
                অনুসন্ধানের সুবিধার্থে।
              </Box>
            </Grid>
          </Typography>
          <Button variant='contained' className={classes.detailsButton}>
            শুরু করা যাক
          </Button>
        </Grid>
        <Grid item xs={4}>
          <img
            src='/images/self-assessment.png'
            alt='crema-logo'
            className={classes.assessmentImage}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SelfAssessment;
