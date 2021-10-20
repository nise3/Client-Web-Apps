import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import {ChevronRight} from '@mui/icons-material';
import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';
import NearbyFreelancerComponent from './components/NearbyFreelancerComponent';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {useFetchYouthSkills} from '../../../services/youthManagement/hooks';
import Link from 'next/link';

const useStyle = makeStyles((theme: CremaTheme) => ({
  nearbyYouthSectionRoot: {},
  divider: {
    width: '100%',
    height: 1,
    marginBottom: 5,
  },
  seeMoreButton: {
    boxShadow: 'none',
    marginTop: 10,
  },
  selectControl: {
    marginLeft: 20,
    marginBottom: 10,
  },
}));

const NearbySkilledYouthSection = () => {
  const classes = useStyle();
  const {messages} = useIntl();
  const authUser = useAuthUser<YouthAuthUser>();
  const [youthListFilters] = useState<any>({
    division_id: authUser?.division_id,
    upazila_id: authUser?.upazila_id,
    page_size: 4,
  });

  const {data: nearbySkilledYouths} = useFetchYouthSkills(youthListFilters);

  const NEARBY_YOUTH_URL = '/../../youth/course-list/nearby'; //TODO:: will be nearby youth, not exist now
  return (
    <Card>
      <CardContent>
        <Typography variant={'h5'} sx={{marginBottom: 3, fontWeight: 'bold'}}>
          {messages['freelance_corner.nearby_skilled_youth']}
        </Typography>
        <Grid container className={classes.nearbyYouthSectionRoot}>
          {nearbySkilledYouths &&
            nearbySkilledYouths.map((youth: any, index: number) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                  sx={{marginBottom: 3}}>
                  {index != 0 && <Divider className={classes.divider} />}
                  <NearbyFreelancerComponent freelanceUser={youth} />
                </Grid>
              );
            })}
          <Grid item xs={12} sm={12} md={12} style={{paddingLeft: 15}}>
            <Link href={NEARBY_YOUTH_URL} passHref>
              <Button
                variant={'text'}
                color={'primary'}
                size={'medium'}
                className={classes.seeMoreButton}>
                {messages['freelance_corner.see_more']}
                <ChevronRight color={'primary'} />
              </Button>
            </Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default NearbySkilledYouthSection;
