import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Box, Button, Container, Grid, Typography} from '@material-ui/core';
import {Zoom} from 'react-awesome-reveal';
import Image from 'next/image';
import selfAssessmentImage from '../../public/images/self-assessment.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '40px',
      alignItems: 'center',
    },
    detailsButton: {
      background: '#682988',
      color: '#fff',
      justifyContent: 'center',
    },
    assessmentImage: {
      height: '340px',
    },
    db: {
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        justify: 'center',
      },
    },
    centeringClass: {
      [theme.breakpoints.down('sm')]: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      },
    },
  }),
);

const SelfAssessment = () => {
  const classes = useStyles();
  return (
    <Grid container xl={12} className={classes.root}>
      <Container maxWidth={'md'} disableGutters>
        <Grid item container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant='h4' gutterBottom={true}>
              <Box
                fontWeight='fontWeightBold'
                mb={6}
                className={classes.centeringClass}>
                নিজেকে যাচাই করুন
              </Box>
            </Typography>

            <Typography
              variant='subtitle1'
              gutterBottom={true}
              className={classes.centeringClass}>
              <Grid item xs={12} md={8}>
                <Box mb={8}>
                  আপনার ক্যারিয়ারের আগ্রহ, দক্ষতা, কাজের মান এবং শেখার স্টাইল
                  সম্পর্কে আরও আবিষ্কার করুন। এই সরঞ্জামগুলি আত্ম-সচেতনতা এবং
                  অনুসন্ধানের সুবিধার্থে।
                </Box>
              </Grid>
            </Typography>
            <Grid item container spacing={0} className={classes.db}>
              <Grid item xs={6}>
                <Button variant='contained' className={classes.detailsButton}>
                  শুরু করা যাক
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
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
