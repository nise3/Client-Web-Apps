import {Container, Grid, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useFetchInstitutesRecentActivity} from '../../../services/instituteManagement/hooks';
import {useIntl} from 'react-intl';
import RecentActivityCardView from './RecentActivityCardView';
import RecentActivityMasonryGroupView from './RecentActivityMasonryGroupView';
import {useEffect, useState} from 'react';

const PREFIX = 'RecentActivities';

const classes = {
  titleTypography: `${PREFIX}-titleTypography`,
  pagination: `${PREFIX}-pagination`,
  image: `${PREFIX}-image`,
};

const StyledContainer = styled(Container)(({theme}) => {
  return {
    [`& .${classes.titleTypography}`]: {
      color: theme.palette.primary.dark,
    },
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
  const [recentActivityFilter] = useState<any>({});
  const [recentActivitiesList, setRecentActivitiesList] = useState<any>([]);

  const {data: recentActivitiesItemsData} =
    useFetchInstitutesRecentActivity(recentActivityFilter);
  // const {data: allActivitiesItems} = useFetchInstitutesAllActivity();

  useEffect(() => {
    let data = recentActivitiesItemsData?.filter((item: any) => {
      return item.collage_position !== null;
    });
    setRecentActivitiesList(data);
  }, [recentActivitiesItemsData]);

  return (
    <StyledContainer maxWidth={'lg'}>
      <Grid container my={5}>
        <Grid item md={12}>
          <Typography
            className={classes.titleTypography}
            gutterBottom
            variant='h4'
            component='div'
            display={'flex'}>
            {messages['recent_activities.institute']}
          </Typography>
          {recentActivitiesItemsData && (
            <RecentActivityMasonryGroupView items={recentActivitiesList} />
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
          {recentActivitiesItemsData?.length && (
            <Grid container spacing={5}>
              {recentActivitiesItemsData?.map((data: any) => (
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
