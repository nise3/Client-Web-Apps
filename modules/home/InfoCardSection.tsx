import React from 'react';
import {Box, Card, Container, Grid, Typography} from '@mui/material';
import {Accessibility, Build, HomeWork} from '@mui/icons-material';
import {Theme} from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import {Fade} from 'react-awesome-reveal';
import {useIntl} from 'react-intl';

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
  }),
);

const InfoCardSection = () => {
  const classes = useStyles();
  const {messages} = useIntl();

  return (
    <Fade direction='up'>
      <Container maxWidth='lg'>
        <Grid container spacing={5} mt={{xs: 2, md: 3}} mb={{xs: 2, md: 5}}>
          <Grid item xs={12} md={4}>
            <Card className={classes.youthBoxItem}>
              {/*<Assignment className={classes.icon} />*/}
              <Accessibility className={classes.icon} />
              <Typography variant='h5' gutterBottom={true}>
                <Box fontWeight='fontWeightBold'>
                  {messages['common.youth_2']}
                </Box>
              </Typography>
              <Typography variant='subtitle1' gutterBottom={true}>
                {messages['nise.card_youth']}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className={classes.skillBoxItem}>
              <Build className={classes.icon} />
              <Typography variant='h5' gutterBottom={true}>
                <Box fontWeight='fontWeightBold'>
                  {messages['common.skill_develop']}
                </Box>
              </Typography>
              <Typography variant='subtitle1' gutterBottom={true}>
                {messages['nise.card_youth']}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className={classes.industryBoxItem}>
              <HomeWork className={classes.icon} />
              <Typography variant='h5' gutterBottom={true}>
                <Box fontWeight='fontWeightBold'>
                  {messages['common.industrial']}
                </Box>
              </Typography>
              <Typography variant='subtitle1' gutterBottom={true}>
                {messages['nise.card_youth']}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Fade>
  );
};
export default InfoCardSection;
