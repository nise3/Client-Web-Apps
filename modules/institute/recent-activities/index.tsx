import {Container, Grid, Typography} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {
  useFetchInstitutesAllActivity,
  useFetchInstitutesRecentActivity,
} from '../../../services/instituteManagement/hooks';
import {useIntl} from 'react-intl';
import RecentActivityCardView from './RecentActivityCardView';
import RecentActivityMasonryGroupView from './RecentActivityMasonryGroupView';

const useStyles = makeStyles((theme) => {
  return {
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
  };
});

const RecentActivities = () => {
  const classes = useStyles();
  const {messages} = useIntl();

  const {data: recentActivitiesItems} = useFetchInstitutesRecentActivity();
  const {data: allActivitiesItems} = useFetchInstitutesAllActivity();

  return (
    <Container maxWidth={'lg'}>
      <Grid container mb={5}>
        <Grid item md={12}>
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
        <Grid item mt={8}>
          <Typography
            className={classes.titleTypography}
            gutterBottom
            variant='h4'
            component='div'
            display={'flex'}>
            {messages['all_activities.institute']}
          </Typography>
          {allActivitiesItems?.length && (
            <Grid container spacing={5}>
              {allActivitiesItems?.map((data: any) => (
                <Grid
                  item
                  md={3}
                  justifyContent={'center'}
                  mt={3}
                  key={data.id}>
                  <RecentActivityCardView activity={data} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecentActivities;
