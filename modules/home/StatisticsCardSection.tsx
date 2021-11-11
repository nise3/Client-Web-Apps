import React from 'react';
import {styled} from '@mui/material/styles';
import {Box, Card, Container, Grid} from '@mui/material';
import {Fade} from 'react-awesome-reveal';
import InfoCard from './infoCard';
import {H3, Text} from '../../@softbd/elements/common';

const PREFIX = 'StatisticsCardSection';

const classes = {
  cardColor1: `${PREFIX}-cardColor1`,
  cardColor2: `${PREFIX}-cardColor2`,
  cardColor3: `${PREFIX}-cardColor3`,
  cardColor4: `${PREFIX}-cardColor4`,
  cardColor5: `${PREFIX}-cardColor5`,
  cardColor6: `${PREFIX}-cardColor6`,
  cardColor7: `${PREFIX}-cardColor7`,
  triangleDown: `${PREFIX}-triangleDown`,
  infoCardWrapper: `${PREFIX}-infoCardWrapper`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  [`& .${classes.cardColor1}`]: {
    background: '#661687',
    textAlign: 'center',
    padding: theme.spacing(1),
    color: '#fff',
  },

  [`& .${classes.cardColor2}`]: {
    background: '#0069BC',
    textAlign: 'center',
    padding: theme.spacing(1),
    color: '#fff',
  },

  [`& .${classes.cardColor3}`]: {
    background: '#305DF7',
    textAlign: 'center',
    padding: theme.spacing(1),
    color: '#fff',
  },

  [`& .${classes.cardColor4}`]: {
    background: '#FD8A4B',
    textAlign: 'center',
    padding: theme.spacing(1),
    color: '#fff',
  },

  [`& .${classes.cardColor5}`]: {
    background: '#14017F',
    textAlign: 'center',
    padding: theme.spacing(1),
    color: '#fff',
  },

  [`& .${classes.cardColor6}`]: {
    background: '#D169E4',
    textAlign: 'center',
    padding: theme.spacing(1),
    color: '#fff',
  },

  [`& .${classes.cardColor7}`]: {
    background: '#22BB33',
    textAlign: 'center',
    padding: theme.spacing(1),
    color: '#fff',
  },

  [`& .${classes.triangleDown}`]: {
    width: '0',
    height: '0',
    borderLeft: '12px solid transparent',
    borderRight: '12px solid transparent',
    borderTop: '18px solid',
    position: 'relative',
    zIndex: 1,
  },

  [`& .${classes.infoCardWrapper}`]: {
    [theme.breakpoints.down('xl')]: {
      marginBottom: '170px',
    },
  },
}));

const StatisticsCardSection = () => {
  return (
    <StyledContainer maxWidth='lg' style={{background: '#f9fdfe'}}>
      <Fade direction='down'>
        <Grid container spacing={2} style={{marginTop: '65px'}}>
          <Grid item xs={12} md={3}>
            <Card className={classes.cardColor1}>
              <H3 style={{fontSize: '40px', fontWeight: 'bold'}}>২৫</H3>
              <Text style={{fontSize: '25px'}}>মন্ত্রণালয়</Text>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card className={classes.cardColor2}>
              <H3 style={{fontSize: '40px', fontWeight: 'bold'}}>৮</H3>
              <Text style={{fontSize: '25px'}}>বিভাগ</Text>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card className={classes.cardColor3}>
              <H3 style={{fontSize: '40px', fontWeight: 'bold'}}>১০,০০০</H3>
              <Text style={{fontSize: '25px'}}>প্রজেক্ট</Text>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card className={classes.cardColor4}>
              <H3 style={{fontSize: '40px', fontWeight: 'bold'}}>২৫</H3>
              <Text style={{fontSize: '25px'}}>আর টি ও</Text>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card className={classes.cardColor4}>
              <H3 style={{fontSize: '40px', fontWeight: 'bold'}}>৩,৫০০,০০০</H3>
              <Text style={{fontSize: '25px'}}>যুব</Text>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card className={classes.cardColor3}>
              <H3 style={{fontSize: '40px', fontWeight: 'bold'}}>২৫</H3>
              <Text style={{fontSize: '25px'}}>সমিতি</Text>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card className={classes.cardColor5}>
              <H3 style={{fontSize: '40px', fontWeight: 'bold'}}>৩২</H3>
              <Text style={{fontSize: '25px'}}>শিল্প প্রতিষ্ঠান</Text>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card className={classes.cardColor6}>
              <H3 style={{fontSize: '40px', fontWeight: 'bold'}}>৩২</H3>
              <Text style={{fontSize: '25px'}}>শিল্প প্রতিষ্ঠান</Text>
            </Card>
          </Grid>
          <Grid item xs={12} md={3} className={classes.infoCardWrapper}>
            <Card className={classes.cardColor1} style={{padding: '20px'}}>
              জব প্রোভাইডার
            </Card>
            <Box
              mx={'auto'}
              className={classes.triangleDown}
              sx={{color: '#661687'}}
            />
            <InfoCard
              color={'#661687'}
              infos={[
                {id: 1, name: 'সফ্ট বিডি', count: '৪৫'},
                {id: 2, name: 'ক্রিয়েটিভ বিডি', count: '৩০'},
                {id: 3, name: 'পাঠাও', count: '২৫'},
                {id: 4, name: 'ইভ্যালি', count: '৭০'},
              ]}
            />
          </Grid>
          <Grid item xs={12} md={3} className={classes.infoCardWrapper}>
            <Card className={classes.cardColor2} style={{padding: '20px'}}>
              দক্ষতা উন্নয়ণ কেন্দ্র
            </Card>
            <Box
              mx={'auto'}
              className={classes.triangleDown}
              sx={{color: '#0069BC'}}
            />
            <InfoCard
              color={'#0069BC'}
              infos={[
                {id: 1, name: 'সফ্ট বিডি', count: '৪৫'},
                {id: 2, name: 'ক্রিয়েটিভ বিডি', count: '৩০'},
                {id: 3, name: 'পাঠাও', count: '২৫'},
                {id: 4, name: 'ইভ্যালি', count: '৭০'},
              ]}
            />
          </Grid>
          <Grid item xs={12} md={3} className={classes.infoCardWrapper}>
            <Card className={classes.cardColor3} style={{padding: '20px'}}>
              জনপ্রিয় কোর্স
            </Card>
            <Box
              mx={'auto'}
              className={classes.triangleDown}
              sx={{color: '#305DF7'}}
            />
            <InfoCard
              color={'#305DF7'}
              infos={[
                {id: 1, name: 'সফ্ট বিডি', count: '৪৫'},
                {id: 2, name: 'ক্রিয়েটিভ বিডি', count: '৩০'},
                {id: 3, name: 'পাঠাও', count: '২৫'},
                {id: 4, name: 'ইভ্যালি', count: '৭০'},
              ]}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Card className={classes.cardColor7} style={{padding: '20px'}}>
              জনপ্রিয় জব
            </Card>
            <Box
              mx={'auto'}
              className={classes.triangleDown}
              sx={{color: '#22BB33'}}
            />
            <InfoCard
              color={'#22BB33'}
              infos={[
                {id: 1, name: 'সফ্ট বিডি', count: '৪৫'},
                {id: 2, name: 'ক্রিয়েটিভ বিডি', count: '৩০'},
                {id: 3, name: 'পাঠাও', count: '২৫'},
                {id: 4, name: 'ইভ্যালি', count: '৭০'},
              ]}
            />
          </Grid>
        </Grid>
      </Fade>
    </StyledContainer>
  );
};
export default StatisticsCardSection;
