import React from 'react';
import {Theme} from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import {Button, Container, Grid, Typography} from '@mui/material';
import {Zoom} from 'react-awesome-reveal';
import Image from 'next/image';
import selfAssessmentImage from '../../public/images/self-assessment.png';
import {H4} from '../../@softbd/elements/common';
import {ArrowRight} from '@mui/icons-material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    detailsButton: {
      background: '#682988',
      color: '#fff',
      justifyContent: 'center',
    },
    assessmentImage: {
      height: '340px',
    },
  }),
);

const SelfAssessment = () => {
  const classes = useStyles();
  return (
    <Container maxWidth={'lg'}>
      <Grid container spacing={4} mt={{xs: 2, md: 5}} alignItems={'center'}>
        <Grid item xs={12} md={8}>
          <H4>নিজেকে যাচাই করুন</H4>
          <Typography variant='subtitle1' my={{xs: 4}}>
            আপনার ক্যারিয়ারের আগ্রহ, দক্ষতা, কাজের মান এবং শেখার স্টাইল সম্পর্কে
            আরও আবিষ্কার করুন। এই সরঞ্জামগুলি আত্ম-সচেতনতা এবং অনুসন্ধানের
            সুবিধার্থে।
          </Typography>
          <Button variant='contained' className={classes.detailsButton}>
            শুরু করা যাক <ArrowRight />
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Zoom>
            <Image src={selfAssessmentImage} alt={'self assessment image'} />
          </Zoom>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SelfAssessment;
