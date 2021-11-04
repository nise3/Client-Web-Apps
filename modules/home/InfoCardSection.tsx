import React from 'react';
import {Card, Container, Grid} from '@mui/material';
import {Theme} from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import {Fade} from 'react-awesome-reveal';
import {H3, Text} from '../../@softbd/elements/common';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    youthBoxItem: {
      background: '#1B69BC',
      textAlign: 'center',
      padding: theme.spacing(3),
      color: '#fff',
      '& h3': {
        marginTop: '30px !important',
        marginBottom: '10px !important',
        fontSize: '28px !important',
        fontWeight: '600 !important',
      },
      '& p': {
        fontSize: '16px !important',
        lineHeight: '22px',
      },
    },
    skillBoxItem: {
      background: '#682988',
      textAlign: 'center',
      padding: theme.spacing(3),
      color: '#fff',
      '& h3': {
        marginTop: '30px !important',
        marginBottom: '10px !important',
        fontSize: '28px !important',
        fontWeight: '600 !important',
      },
      '& p': {
        fontSize: '16px !important',
        lineHeight: '22px',
      },
    },
    industryBoxItem: {
      background: '#E77F38',
      textAlign: 'center',
      padding: theme.spacing(3),
      color: '#fff',
      '& h3': {
        marginTop: '30px !important',
        marginBottom: '10px !important',
        fontSize: '28px !important',
        fontWeight: '600 !important',
      },
      '& p': {
        fontSize: '16px !important',
        lineHeight: '22px',
      },
    },
  }),
);

const InfoCardSection = () => {
  const classes = useStyles();

  return (
    <Fade direction='up'>
      <Container maxWidth='lg'>
        <Grid
          container
          spacing={2}
          mb={{xs: 2, md: 5}}
          sx={{marginTop: '115px'}}>
          <Grid item xs={12} md={4}>
            <Card className={classes.youthBoxItem}>
              <img src={'/images/home-page/man-n-woman.png'} />
              <H3>যুব</H3>
              <Text>আপনি যদি চাকরি প্রার্থী হয়ে থাকেন, তাহলে খুঁজে নিন।</Text>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className={classes.skillBoxItem}>
              <img src={'/images/home-page/training.png'} />
              <H3>দক্ষতা উন্নয়ন কেন্দ্র</H3>
              <Text>আপনি যদি চাকরি প্রার্থী হয়ে থাকেন, তাহলে খুঁজে নিন।</Text>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className={classes.industryBoxItem}>
              <img src={'/images/home-page/industry.png'} />
              <H3>শিল্প প্রতিষ্ঠান</H3>
              <Text>আপনি যদি চাকরি প্রার্থী হয়ে থাকেন, তাহলে খুঁজে নিন।</Text>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Fade>
  );
};
export default InfoCardSection;
