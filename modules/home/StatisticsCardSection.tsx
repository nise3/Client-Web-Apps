import React from 'react';
import {Box, Card, Container, Grid, Typography} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Fade} from 'react-awesome-reveal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

    icon: {
      fontSize: '60px',
    },
    root: {
      marginTop: '50px',
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
            <Grid item xs={3}>
              <Card className={classes.cardColor1}>
                <Typography variant='h5' gutterBottom={true}>
                  <Box fontWeight='fontWeightBold'> ২৫ </Box>
                </Typography>
                <Typography variant='subtitle1' gutterBottom={true}>
                  মন্ত্রণালয়
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card className={classes.cardColor2}>
                <Typography variant='h5' gutterBottom={true}>
                  <Box fontWeight='fontWeightBold'> 32 </Box>
                </Typography>
                <Typography variant='subtitle1' gutterBottom={true}>
                  বিভাগ
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card className={classes.cardColor3}>
                <Typography variant='h5' gutterBottom={true}>
                  <Box fontWeight='fontWeightBold'> ১০,০০০ </Box>
                </Typography>
                <Typography variant='subtitle1' gutterBottom={true}>
                  প্রজেক্ট
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card className={classes.cardColor4}>
                <Typography variant='h5' gutterBottom={true}>
                  <Box fontWeight='fontWeightBold'> ২৫ </Box>
                </Typography>
                <Typography variant='subtitle1' gutterBottom={true}>
                  আর টি ও
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card className={classes.cardColor4}>
                <Typography variant='h5' gutterBottom={true}>
                  <Box fontWeight='fontWeightBold'> ৩৫,০০০০০</Box>
                </Typography>
                <Typography variant='subtitle1' gutterBottom={true}>
                  যুব
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card className={classes.cardColor3}>
                <Typography variant='h5' gutterBottom={true}>
                  <Box fontWeight='fontWeightBold'> ২৫</Box>
                </Typography>
                <Typography variant='subtitle1' gutterBottom={true}>
                  সমিতি
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card className={classes.cardColor5}>
                <Typography variant='h5' gutterBottom={true}>
                  <Box fontWeight='fontWeightBold'> ৩২</Box>
                </Typography>
                <Typography variant='subtitle1' gutterBottom={true}>
                  শিল্প প্রতিষ্ঠান
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card className={classes.cardColor6}>
                <Typography variant='h5' gutterBottom={true}>
                  <Box fontWeight='fontWeightBold'> ৩২</Box>
                </Typography>
                <Typography variant='subtitle1' gutterBottom={true}>
                  শিল্প প্রতিষ্ঠান
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Fade>
      </Container>
    </Grid>
  );
};
export default StatisticsCardSection;
