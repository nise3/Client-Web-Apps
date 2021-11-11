import React from 'react';
import {styled} from '@mui/material/styles';
import {Box, Button, Container, Grid} from '@mui/material';
import {useFetchInstitutesRecentActivity} from '../../services/instituteManagement/hooks';
import {useIntl} from 'react-intl';
import RecentActivityMasonryGroupView from '../institute/recent-activities/RecentActivityMasonryGroupView';
import {ArrowRightAlt} from '@mui/icons-material';
import {H3, H6, Link} from '../../@softbd/elements/common';

const PREFIX = 'RecentActivities';

const classes = {
  titleTypography: `${PREFIX}-titleTypography`,
  vBar: `${PREFIX}-vBar`,
};

const StyledContainer = styled(Container)(({theme}) => {
  return {
    [`& .${classes.titleTypography}`]: {
      color: theme.palette.primary.dark,
      display: 'flex',
      fontSize: '33px',
      fontWeight: 'bold',
      marginBottom: '38px',
    },
    [`& .${classes.vBar}`]: {
      height: '33px',
      width: '2px',
      background: 'linear-gradient(45deg, #ec5c17,#5affab)',
      marginRight: '10px',
    },
  };
});

const RecentActivities = () => {
  const {data: recentActivitiesItems} = useFetchInstitutesRecentActivity();
  const {messages} = useIntl();

  return (
    <StyledContainer maxWidth={'lg'} style={{marginTop: '78px'}}>
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
    </StyledContainer>
  );
};
export default RecentActivities;
