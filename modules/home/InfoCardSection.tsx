import React from 'react';
import {Box, Card, Container, Grid, Typography} from '@material-ui/core';
import {Assignment} from '@material-ui/icons';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    youthBoxItem: {
      background: '#1B69BC',
      textAlign: 'center',
      padding: theme.spacing(5),
      color: '#fff',
    },
    skillBoxItem: {
      background: '#682988',
      textAlign: 'center',
      padding: theme.spacing(5),
      color: '#fff',
    },
    industryBoxItem: {
      background: '#E77F38',
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

const InfoCardSection = () => {
  const classes = useStyles();

  return (
    <Grid container xl={12} className={classes.root}>
      <Container maxWidth='md' disableGutters>
        <Grid container spacing={5}>
          <Grid item xs={4}>
            <Card className={classes.youthBoxItem}>
              <Assignment className={classes.icon} />
              <Typography variant='h5' gutterBottom={true}>
                <Box fontWeight='fontWeightBold'> যুব </Box>
              </Typography>
              <Typography variant='subtitle1' gutterBottom={true}>
                আপনি যদি চাকরি প্রাথি হয়ে থাকেন, তাহলে খুঁজে নিন।
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className={classes.skillBoxItem}>
              <Assignment className={classes.icon} />
              <Typography variant='h5' gutterBottom={true}>
                <Box fontWeight='fontWeightBold'> দক্ষতা উন্নয়ন</Box>
              </Typography>
              <Typography variant='subtitle1' gutterBottom={true}>
                আপনি যদি চাকরি প্রাথি হয়ে থাকেন, তাহলে খুঁজে নিন।
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className={classes.industryBoxItem}>
              <Assignment className={classes.icon} />
              <Typography variant='h5' gutterBottom={true}>
                <Box fontWeight='fontWeightBold'>শিল্প প্রতিষ্ঠান</Box>
              </Typography>
              <Typography variant='subtitle1' gutterBottom={true}>
                আপনি যদি চাকরি প্রাথি হয়ে থাকেন, তাহলে খুঁজে নিন।
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};
export default InfoCardSection;
