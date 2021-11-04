import React from 'react';
import {Theme} from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import {Button, Container, Grid} from '@mui/material';
import {Zoom} from 'react-awesome-reveal';
import Image from 'next/image';
import selfAssessmentImage from '../../public/images/self-assessment.png';
import {H3, Text} from '../../@softbd/elements/common';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    detailsButton: {
      '& svg': {
        paddingLeft: '5px',
      },
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
      <Grid
        container
        spacing={4}
        sx={{marginTop: '114px'}}
        alignItems={'center'}>
        <Grid item xs={12} md={8}>
          <H3 style={{fontSize: '44px', fontWeight: 'bold'}}>
            নিজেকে যাচাই করুন
          </H3>
          <Text
            style={{fontSize: '22px', marginTop: '30px', marginBottom: '30px'}}>
            আপনার ক্যারিয়ারের আগ্রহ, দক্ষতা, কাজের মান এবং শেখার স্টাইল সম্পর্কে
            আরও আবিষ্কার করুন। এই সরঞ্জামগুলি আত্ম-সচেতনতা এবং অনুসন্ধানের
            সুবিধার্থে।
          </Text>
          <Button variant='contained' className={classes.detailsButton}>
            শুরু করা যাক <ArrowForwardIcon />
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
