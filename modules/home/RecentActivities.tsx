import React, {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import {Container, Grid} from '@mui/material';
import {useIntl} from 'react-intl';
import RecentActivityMasonryGroupView from '../institute/recent-activities/RecentActivityMasonryGroupView';
import {SeeMoreLinkButton} from '../../@softbd/elements/common';
import {useFetchPublicRecentActivitiesCollages} from '../../services/cmsManagement/hooks';
import SectionTitle from './SectionTitle';
import {LINK_FRONTEND_NISE_RECENT_ACTIVITIES} from '../../@softbd/common/appLinks';

let defaultImage = '/images/recent_activity_blank.avif';

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

  const {data: recentActivitiesCollageData} =
    useFetchPublicRecentActivitiesCollages(recentActivityFilter);

  useEffect(() => {
    let final = [];
    for (let i = 0; i < 4; i++) {
      final.push({
        collage_position: i + 1,
        collage_image_path: defaultImage,
      });
    }

    if (recentActivitiesCollageData) {
      for (let item of recentActivitiesCollageData) {
        let index = item.collage_position - 1;
        final[index] = {...item};
      }
    }
    setRecentActivitiesList(final);
  }, [recentActivitiesCollageData]);

  const {messages} = useIntl();

  return (
    <StyledContainer maxWidth={'lg'} style={{marginTop: '60px'}}>
      <SectionTitle
        title={messages['recent_activities.label'] as string}
        center={true}
      />

      <Grid container>
        <Grid item md={12}>
          <RecentActivityMasonryGroupView items={recentActivitiesList} />
        </Grid>
      </Grid>
      <Grid container justifyContent='center'>
        <SeeMoreLinkButton
          href={LINK_FRONTEND_NISE_RECENT_ACTIVITIES}
          label={messages['common.see_more'] as string}
          sx={{marginTop: '31px', marginBottom: '15px'}}
        />
      </Grid>
    </StyledContainer>
  );
};
export default RecentActivities;
