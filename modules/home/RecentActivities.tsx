import React, {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import {Box, Button, Container, Grid} from '@mui/material';
import {useFetchInstitutesRecentActivity} from '../../services/instituteManagement/hooks';
import {useIntl} from 'react-intl';
import RecentActivityMasonryGroupView from '../institute/recent-activities/RecentActivityMasonryGroupView';
import {ArrowRightAlt} from '@mui/icons-material';
import {H3, H6, Link} from '../../@softbd/elements/common';
import ShowInTypes from '../../@softbd/utilities/ShowInTypes';
import {useRouter} from 'next/router';
import {getShowInTypeFromPath} from '../../@softbd/utilities/helpers';

let defaultImage =
  'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80';

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
  const [recentActivityFilter, setRecentActivityFilter] = useState<any>({});
  const [recentActivitiesList, setRecentActivitiesList] = useState<any>([]);

  const {data: recentActivitiesData} =
    useFetchInstitutesRecentActivity(recentActivityFilter);

  const router = useRouter();
  const showInType = getShowInTypeFromPath(router.asPath);

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

  useEffect(() => {
    if (showInType) {
      let params: any = {
        show_in: showInType,
      };

      if (showInType == ShowInTypes.TSP) {
        //params.institute_id = 1;
      }
      setRecentActivityFilter((prev: any) => {
        return {...prev, ...params};
      });
    }
  }, [showInType]);

  const {messages} = useIntl();

  return (
    <StyledContainer maxWidth={'lg'} style={{marginTop: '78px'}}>
      <Grid container>
        <Grid item md={12}>
          <H3 className={classes.titleTypography}>
            <Box className={classes.vBar} />
            <Box>{messages['recent_activities.label']}</Box>
          </H3>
          {recentActivitiesList && recentActivitiesList.length > 0 ? (
            <RecentActivityMasonryGroupView items={recentActivitiesList} />
          ) : (
            <H6>{messages['common.no_data_found']}</H6>
          )}
        </Grid>
      </Grid>
      {recentActivitiesList && recentActivitiesList.length > 0 && (
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
