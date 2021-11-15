import {Container, Grid, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {
  useFetchInstitutesAllActivity,
  useFetchInstitutesRecentActivity,
} from '../../../services/instituteManagement/hooks';
import {useIntl} from 'react-intl';
import RecentActivityCardView from './RecentActivityCardView';
import RecentActivityMasonryGroupView from './RecentActivityMasonryGroupView';

const PREFIX = 'RecentActivities';

const classes = {
  pagination: `${PREFIX}-pagination`,
  image: `${PREFIX}-image`,
};

const StyledContainer = styled(Container)(({theme}) => {
  return {
    [`& .${classes.pagination}`]: {
      marginRight: 'auto',
      marginLeft: 'auto',
    },
    [`& .${classes.image}`]: {
      overflow: 'hidden',
    },
  };
});

const RecentActivities = () => {
  const {messages} = useIntl();

  const {data: recentActivitiesItems} = useFetchInstitutesRecentActivity();
  const {data: allActivitiesItems} = useFetchInstitutesAllActivity();

  return (
    <StyledContainer maxWidth={'lg'}>
      <Grid container my={5}>
        <Grid item md={12}>
          <Typography
            color={'primary'}
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
            color={'primary'}
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
    </StyledContainer>
  );
};

export default RecentActivities;
