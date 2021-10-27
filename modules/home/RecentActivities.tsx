import React from 'react';
import {Box, Button, Container, Grid, Typography} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {useFetchInstitutesRecentActivity} from '../../services/instituteManagement/hooks';
import {useIntl} from 'react-intl';
import RecentActivityMasonryGroupView from '../institute/recent-activities/RecentActivityMasonryGroupView';
import {ArrowRightAlt} from '@mui/icons-material';
import {H6, Link} from '../../@softbd/elements/common';

const useStyles = makeStyles((theme) => {
  return {
    typographyNumber: {
      color: theme.palette.primary.dark,
      marginLeft: '5px',
      backgroundColor: theme.palette.primary.light,
      padding: '0 5px',
    },
    cardMainGrid: {
      marginRight: 'auto',
      marginLeft: 'auto',
    },
    filterMainGrid: {
      marginRight: 'auto',
      marginLeft: 'auto',
      justifyContent: 'space-between',
    },
    dateInfo: {
      background: theme.palette.common.white,
      color: theme.palette.primary.light,
      display: 'flex',
      padding: '4px',
      width: '130px',
      borderRadius: '5px',
      marginBottom: '10px',
    },
    titleTypography: {
      color: theme.palette.primary.dark,
    },
    pagination: {
      marginRight: 'auto',
      marginLeft: 'auto',
    },
    image: {
      overflow: 'hidden',
    },
    imageTexts: {
      position: 'absolute',
      bottom: '5%',
      left: '4%',
    },
    vBar: {
      height: '40px',
      width: '5px',
      background: 'linear-gradient(45deg, #ec5c17,#5affab)',
      marginRight: '10px',
    },
  };
});

const RecentActivities = () => {
  const classes = useStyles();
  const {data: recentActivitiesItems} = useFetchInstitutesRecentActivity();
  const {messages} = useIntl();

  return (
    <Container maxWidth={'lg'}>
      <Grid container>
        <Grid item md={12} mt={8}>
          <Typography
            className={classes.titleTypography}
            gutterBottom
            variant='h4'
            component='div'
            display={'flex'}>
            <Box className={classes.vBar} />
            <Box>{messages['recent_activities.institute']}</Box>
          </Typography>
          {recentActivitiesItems && recentActivitiesItems.length ? (
            <RecentActivityMasonryGroupView
              items={recentActivitiesItems.slice(0, 4)}
            />
          ) : (
            <H6>{messages['common.no_data_found']}</H6>
          )}
        </Grid>
      </Grid>
      {recentActivitiesItems && recentActivitiesItems.length > 0 && (
        <Grid container justifyContent='flex-end'>
          <Link href={'/recent-activities'}>
            <Button
              variant='outlined'
              color='primary'
              endIcon={<ArrowRightAlt />}>
              {messages['freelance_corner.see_more']}
            </Button>
          </Link>
        </Grid>
      )}
    </Container>
  );
};
export default RecentActivities;
