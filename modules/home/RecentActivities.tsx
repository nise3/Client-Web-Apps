import React from 'react';
import {Button, Container, Grid, Typography} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {useFetchInstitutesRecentActivity} from '../../services/instituteManagement/hooks';
import {useIntl} from 'react-intl';
import RecentActivityMasonryGroupView from '../institute/recent-activities/RecentActivityMasonryGroupView';
import {ArrowRightAlt} from '@mui/icons-material';
import {Link} from '../../@softbd/elements/common';

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
  };
});

const RecentActivities = () => {
  const classes = useStyles();
  const {data: recentActivitiesItems} = useFetchInstitutesRecentActivity();
  const {messages} = useIntl();

  return (
    <Container maxWidth={'md'}>
      <Grid container>
        <Grid item md={12} mt={8}>
          <Typography
            className={classes.titleTypography}
            gutterBottom
            variant='h4'
            component='div'
            display={'flex'}>
            {messages['recent_activities.institute']}
          </Typography>
          {recentActivitiesItems && (
            <RecentActivityMasonryGroupView
              items={recentActivitiesItems.slice(0, 4)}
            />
          )}
        </Grid>
      </Grid>
      <Grid container justifyContent='flex-end'>
        <Link href={'/recent-activities'}>
          <Button
            variant='outlined'
            color='primary'
            endIcon={<ArrowRightAlt />}>
            আরো দেখুন
          </Button>
        </Link>
      </Grid>
    </Container>
  );
};
export default RecentActivities;
