import React, {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import {Button, Container, Grid} from '@mui/material';
import {useIntl} from 'react-intl';
import RecentActivityMasonryGroupView from '../institute/recent-activities/RecentActivityMasonryGroupView';
import {ArrowRightAlt} from '@mui/icons-material';
import {Link} from '../../@softbd/elements/common';
import {useFetchPublicRecentActivities} from '../../services/cmsManagement/hooks';
import SectionTitle from './SectionTitle';
import {LINK_FRONTEND_NISE_RECENT_ACTIVITIES} from '../../@softbd/common/appLinks';
import NoDataFoundComponent from '../youth/common/NoDataFoundComponent';

let defaultImage =
  'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80';

const PREFIX = 'RecentActivities';

const classes = {
  vBar: `${PREFIX}-vBar`,
  vBar2: `${PREFIX}-vBar2`,
  seeMore: `${PREFIX}-seeMore`,
};

const StyledContainer = styled(Container)(({theme}) => {
  return {
    [`& .${classes.vBar}`]: {
      height: '17px',
      width: '2px',
      background: '#00ccff',
      marginRight: '10px',
    },
    [`& .${classes.vBar2}`]: {
      height: '17px',
      width: '2px',
      background: 'yellow',
      marginRight: '10px',
    },
    [`& .${classes.seeMore}`]: {
      marginTop: '31px',
      marginBottom: '15px',
    },
  };
});

const RecentActivities = () => {
  const [recentActivityFilter] = useState<any>({});
  const [recentActivitiesList, setRecentActivitiesList] = useState<any>([]);

  const {data: recentActivitiesData} =
    useFetchPublicRecentActivities(recentActivityFilter);

  useEffect(() => {
    let data = recentActivitiesData?.filter((item: any) => {
      return item.collage_position !== null;
    });

    let final = [];
    for (let i = 0; i < 4; i++) {
      final.push({
        collage_position: i + 1,
        collage_image_path: defaultImage,
      });
    }

    if (data)
      for (let item of data) {
        let index = item.collage_position - 1;
        final[index] = {...item};
      }

    setRecentActivitiesList(final);
  }, [recentActivitiesData]);

  const {messages} = useIntl();

  return (
    <StyledContainer maxWidth={'lg'} style={{marginTop: '60px'}}>
      <SectionTitle
        title={messages['recent_activities.label'] as string}
        center={true}
      />

      <Grid container>
        <Grid item md={12}>
          {recentActivitiesList && recentActivitiesList.length > 0 ? (
            <RecentActivityMasonryGroupView items={recentActivitiesList} />
          ) : (
            <NoDataFoundComponent
              messageType={messages['menu.recent_activity']}
              messageTextType={'h6'}
            />
          )}
        </Grid>
      </Grid>
      {recentActivitiesList && recentActivitiesList.length > 0 && (
        <Grid container justifyContent='center'>
          <Link
            href={LINK_FRONTEND_NISE_RECENT_ACTIVITIES}
            className={classes.seeMore}>
            <Button
              sx={{borderRadius: '10px'}}
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
