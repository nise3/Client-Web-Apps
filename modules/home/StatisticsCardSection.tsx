import React from 'react';
import {Box, Card, Container, Grid, Typography} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Fade} from 'react-awesome-reveal';
import InfoCard from './infoCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '50px',
      backgroundColor: '#eee',
      paddingTop: '20px',
      [theme.breakpoints.down('sm')]: {
        paddingBottom: '120px',
      },
      [theme.breakpoints.up('lg')]: {
        paddingBottom: '120px',
      },
    },
    cardColor1: {
      background: '#661687',
      textAlign: 'center',
      padding: theme.spacing(5),
      color: '#fff',
    },
    cardColor2: {
      background: '#0069BC',
      textAlign: 'center',
      padding: theme.spacing(5),
      color: '#fff',
    },
    cardColor3: {
      background: '#305DF7',
      textAlign: 'center',
      padding: theme.spacing(5),
      color: '#fff',
    },
    cardColor4: {
      background: '#FD8A4B',
      textAlign: 'center',
      padding: theme.spacing(5),
      color: '#fff',
    },
    cardColor5: {
      background: '#14017F',
      textAlign: 'center',
      padding: theme.spacing(5),
      color: '#fff',
    },
    cardColor6: {
      background: '#D169E4',
      textAlign: 'center',
      padding: theme.spacing(5),
      color: '#fff',
    },
    cardColor7: {
      background: '#22BB33',
      textAlign: 'center',
      padding: theme.spacing(5),
      color: '#fff',
    },

    icon: {
      fontSize: '60px',
    },

    triangleDown: {
      width: '0',
      height: '0',
      borderLeft: '12px solid transparent',
      borderRight: '12px solid transparent',
      borderTop: '18px solid',
      position: 'relative',
      zIndex: 1,
    },
    infoCardWrapper: {
      [theme.breakpoints.down('md')]: {
        marginBottom: '120px',
      },
    },
  }),
);

const StatisticsCardSection = () => {
  const classes = useStyles();

  return (
    <Grid container xl={12} className={classes.root}>
      <Container maxWidth='md' disableGutters>
        <Fade direction='down'>
          <Grid container spacing={5}>
            <Grid item xs={12} md={3}>
              <Card className={classes.cardColor1}>
                <Typography variant='h5' gutterBottom={true}>
                  <Box fontWeight='fontWeightBold'> ২৫ </Box>
                </Typography>
                <Typography variant='subtitle1' gutterBottom={true}>
                  মন্ত্রণালয়
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card className={classes.cardColor2}>
                <Typography variant='h5' gutterBottom={true}>
                  <Box fontWeight='fontWeightBold'> 32 </Box>
                </Typography>
                <Typography variant='subtitle1' gutterBottom={true}>
                  বিভাগ
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card className={classes.cardColor3}>
                <Typography variant='h5' gutterBottom={true}>
                  <Box fontWeight='fontWeightBold'> ১০,০০০ </Box>
                </Typography>
                <Typography variant='subtitle1' gutterBottom={true}>
                  প্রজেক্ট
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card className={classes.cardColor4}>
                <Typography variant='h5' gutterBottom={true}>
                  <Box fontWeight='fontWeightBold'> ২৫ </Box>
                </Typography>
                <Typography variant='subtitle1' gutterBottom={true}>
                  আর টি ও
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card className={classes.cardColor4}>
                <Typography variant='h5' gutterBottom={true}>
                  <Box fontWeight='fontWeightBold'> ৩৫,০০০০০</Box>
                </Typography>
                <Typography variant='subtitle1' gutterBottom={true}>
                  যুব
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card className={classes.cardColor3}>
                <Typography variant='h5' gutterBottom={true}>
                  <Box fontWeight='fontWeightBold'> ২৫</Box>
                </Typography>
                <Typography variant='subtitle1' gutterBottom={true}>
                  সমিতি
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card className={classes.cardColor5}>
                <Typography variant='h5' gutterBottom={true}>
                  <Box fontWeight='fontWeightBold'> ৩২</Box>
                </Typography>
                <Typography variant='subtitle1' gutterBottom={true}>
                  শিল্প প্রতিষ্ঠান
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card className={classes.cardColor6}>
                <Typography variant='h5' gutterBottom={true}>
                  <Box fontWeight='fontWeightBold'> ৩২</Box>
                </Typography>
                <Typography variant='subtitle1' gutterBottom={true}>
                  শিল্প প্রতিষ্ঠান
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={3} className={classes.infoCardWrapper}>
              <Card className={classes.cardColor1}>
                <Typography variant='subtitle1' gutterBottom={true}>
                  জব প্রোভাইডার
                </Typography>
              </Card>
              <Box
                mx={'auto'}
                className={classes.triangleDown}
                sx={{color: '#661687'}}></Box>
              <InfoCard
                color={'#661687'}
                infos={[
                  {name: 'সফ্ট বিডি', count: '৪৫'},
                  {name: 'ক্রিয়েটিভ বিডি', count: '৩০'},
                  {name: 'পাঠাও', count: '২৫'},
                  {name: 'ইভ্যালি', count: '৭০'},
                ]}
              />
            </Grid>
            <Grid item xs={12} md={3} className={classes.infoCardWrapper}>
              <Card className={classes.cardColor2}>
                <Typography variant='subtitle1' gutterBottom={true}>
                  দক্ষতা উন্নয়ণ কেন্দ্র
                </Typography>
              </Card>
              <Box
                mx={'auto'}
                className={classes.triangleDown}
                sx={{color: '#0069BC'}}></Box>
              <InfoCard
                color={'#0069BC'}
                infos={[
                  {name: 'সফ্ট বিডি', count: '৪৫'},
                  {name: 'ক্রিয়েটিভ বিডি', count: '৩০'},
                  {name: 'পাঠাও', count: '২৫'},
                  {name: 'ইভ্যালি', count: '৭০'},
                ]}
              />
            </Grid>
            <Grid item xs={12} md={3} className={classes.infoCardWrapper}>
              <Card className={classes.cardColor3}>
                <Typography variant='subtitle1' gutterBottom={true}>
                  জনপ্রিয় কোর্স
                </Typography>
              </Card>
              <Box
                mx={'auto'}
                className={classes.triangleDown}
                sx={{color: '#305DF7'}}></Box>
              <InfoCard
                color={'#305DF7'}
                infos={[
                  {name: 'সফ্ট বিডি', count: '৪৫'},
                  {name: 'ক্রিয়েটিভ বিডি', count: '৩০'},
                  {name: 'পাঠাও', count: '২৫'},
                  {name: 'ইভ্যালি', count: '৭০'},
                ]}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Card className={classes.cardColor7}>
                <Typography variant='subtitle1' gutterBottom={true}>
                  জনপ্রিয় জব
                </Typography>
              </Card>
              <Box
                mx={'auto'}
                className={classes.triangleDown}
                sx={{color: '#22BB33'}}></Box>
              <InfoCard
                color={'#22BB33'}
                infos={[
                  {name: 'সফ্ট বিডি', count: '৪৫'},
                  {name: 'ক্রিয়েটিভ বিডি', count: '৩০'},
                  {name: 'পাঠাও', count: '২৫'},
                  {name: 'ইভ্যালি', count: '৭০'},
                ]}
              />
            </Grid>
          </Grid>
        </Fade>
      </Container>
    </Grid>
  );
};
export default StatisticsCardSection;
