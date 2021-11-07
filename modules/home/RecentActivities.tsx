import React from 'react';
import {Box, Button, Container, Grid} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {useFetchInstitutesRecentActivity} from '../../services/instituteManagement/hooks';
import {useIntl} from 'react-intl';
import RecentActivityMasonryGroupView from '../institute/recent-activities/RecentActivityMasonryGroupView';
import {ArrowRightAlt} from '@mui/icons-material';
import {H3, H6, Link} from '../../@softbd/elements/common';

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
      width: '180px',
      borderRadius: '5px',
      marginBottom: '10px',
    },
    titleTypography: {
      color: theme.palette.primary.dark,
      display: 'flex',
      fontSize: '33px',
      fontWeight: 'bold',
      marginBottom: '38px',
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
      height: '33px',
      width: '2px',
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
    <Container maxWidth={'lg'} style={{marginTop: '78px'}}>
      <Grid container>
        <Grid item md={12}>
          <H3 className={classes.titleTypography}>
            <Box className={classes.vBar} />
            <Box>{messages['recent_activities.institute']}</Box>
          </H3>
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
