import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Box, Button, Container, Grid, Typography} from '@material-ui/core';
import {Fade, Zoom} from 'react-awesome-reveal';
import Image from 'next/image';
import selfAssessmentImage from '../../public/images/self-assessment.png';

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
    <Grid container xl={12} className={classes.root}>
      <Container maxWidth={'md'} disableGutters>
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <Fade direction='left'>
              <Typography variant='h4' gutterBottom={true}>
                <Box fontWeight='fontWeightBold' mb={6}>
                  নিজেকে যাচাই করুন
                </Box>
              </Typography>
            </Fade>

            <Typography variant='subtitle1' gutterBottom={true}>
              <Grid item xs={8}>
                <Fade direction='left'>
                  <Box mb={8}>
                    আপনার ক্যারিয়ারের আগ্রহ, দক্ষতা, কাজের মান এবং শেখার স্টাইল
                    সম্পর্কে আরও আবিষ্কার করুন। এই সরঞ্জামগুলি আত্ম-সচেতনতা এবং
                    অনুসন্ধানের সুবিধার্থে।
                  </Box>
                </Fade>
              </Grid>
            </Typography>
            <Button variant='contained' className={classes.detailsButton}>
              শুরু করা যাক
            </Button>
          </Grid>
          <Grid xs={4}>
            <Zoom>
              <Image src={selfAssessmentImage} alt={'self assessment image'} />
            </Zoom>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default SelfAssessment;
