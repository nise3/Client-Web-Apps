import React from 'react';
import {styled} from '@mui/material/styles';
import {Card, Container, Grid} from '@mui/material';
import {Fade} from 'react-awesome-reveal';
import {Assignment, HomeWork, People, PeopleAlt} from '@mui/icons-material';
import UnderlinedHeading from './UnderlinedHeading';
import {H4, H5} from '../../@softbd/elements/common';
import {useIntl} from 'react-intl';

const PREFIX = 'InfoCardSection';

const classes = {
  root: `${PREFIX}-root`,
  subheading: `${PREFIX}-subheading`,
  boxItem: `${PREFIX}-boxItem`,
  icon: `${PREFIX}-icon`,
  desc: `${PREFIX}-desc`,
  rootMobileView: `${PREFIX}-rootMobileView`,
};

const StyledGrid = styled(Grid)(({theme}) => ({
  [`&.${classes.root}`]: {
    [theme.breakpoints.up('md')]: {
      marginTop: '50px',
    },
    [theme.breakpoints.down('xl')]: {
      // marginTop: '200px',
    },
  },

  [`& .${classes.subheading}`]: {
    textAlign: 'center',
    marginBottom: 48,
  },

  [`& .${classes.boxItem}`]: {
    boxShadow: theme.shadows[4],
    background: theme.palette.background.paper,
    textAlign: 'center',
    padding: theme.spacing(3),
    height: 250,
    borderRadius: 4 * parseInt(theme.shape.borderRadius.toString()),
    // color: '#000',
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(1.25),
    },
  },

  [`& .${classes.icon}`]: {
    fontSize: '72px',
    color: theme.palette.primary.main,
  },

  [`& .${classes.desc}`]: {
    color: theme.palette.secondary.main,
  },

  [`& .${classes.rootMobileView}`]: {
    [theme.breakpoints.down('xl')]: {
      marginTop: '80px',
    },
  },
}));

const InfoCardSection = () => {
  const {messages, formatNumber} = useIntl();

  return (
    <StyledGrid container xl={12} className={classes.root}>
      <Container maxWidth='lg' className={classes.rootMobileView}>
        <Fade direction='up'>
          <UnderlinedHeading>
            {messages['institute_home.at_a_glance']}
          </UnderlinedHeading>
          <H5 gutterBottom={true} className={classes.subheading}>
            {messages['institute_home.course_management_stat']}
          </H5>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={classes.boxItem}>
                <Assignment className={classes.icon} />
                <H4 gutterBottom={true} fontWeight='fontWeightBold'>
                  {formatNumber(10)} {messages['institute_home.ti']}
                </H4>
                <H5 gutterBottom={true} className={classes.desc}>
                  {messages['institute_home.total_course_subject']}
                </H5>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={classes.boxItem}>
                <PeopleAlt className={classes.icon} />
                <H4 gutterBottom={true} fontWeight='fontWeightBold'>
                  {formatNumber(10)} {messages['institute_home.people']}
                </H4>
                <H5 gutterBottom={true} className={classes.desc}>
                  {messages['institute_home.total_youth_trained']}
                </H5>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={classes.boxItem}>
                <HomeWork className={classes.icon} />
                <H4 gutterBottom={true} fontWeight='fontWeightBold'>
                  {formatNumber(10)} {messages['institute_home.ti']}
                </H4>
                <H5 gutterBottom={true} className={classes.desc}>
                  {messages['institute_home.total_training_center']}
                </H5>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={classes.boxItem}>
                <People className={classes.icon} />
                <H4 gutterBottom={true} fontWeight='fontWeightBold'>
                  {formatNumber(10)} {messages['institute_home.people']}
                </H4>
                <H5 gutterBottom={true} className={classes.desc}>
                  {messages['institute_home.total_skilled_trainer']}
                </H5>
              </Card>
            </Grid>
          </Grid>
        </Fade>
      </Container>
    </StyledGrid>
  );
};
export default InfoCardSection;
