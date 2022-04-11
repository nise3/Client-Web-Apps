import React, {useState} from 'react';
import {styled} from '@mui/material/styles';
import {useIntl} from 'react-intl';
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import {ChevronRight} from '@mui/icons-material';
import NearbyFreelancerComponent from './components/NearbyFreelancerComponent';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {useFetchYouths} from '../../../services/youthManagement/hooks';
import PageSizes from '../../../@softbd/utilities/PageSizes';
import NoDataFoundComponent from '../common/NoDataFoundComponent';

const PREFIX = 'NearbySkilledYouthSection';

const classes = {
  nearbyYouthSectionRoot: `${PREFIX}-nearbyYouthSectionRoot`,
  divider: `${PREFIX}-divider`,
  seeMoreButton: `${PREFIX}-seeMoreButton`,
  selectControl: `${PREFIX}-selectControl`,
};

const StyledCard = styled(Card)(({theme}) => ({
  [`& .${classes.divider}`]: {
    width: '100%',
    height: 1,
    marginBottom: 5,
  },

  [`& .${classes.seeMoreButton}`]: {
    boxShadow: 'none',
    marginTop: 10,
  },

  [`& .${classes.selectControl}`]: {
    marginLeft: 20,
    marginBottom: 10,
  },
}));

const NearbySkilledYouthSection = () => {
  const {messages} = useIntl();
  const authUser = useAuthUser<YouthAuthUser>();
  const [youthListFilters] = useState<any>({
    loc_district_id: authUser?.loc_district_id,
    loc_upazila_id: authUser?.loc_upazila_id,
    page_size: PageSizes.THREE,
  });

  const {
    data: nearbySkilledYouths,
    // metaData: {total_page: totalPage, current_page: currPage},
    isLoading,
  } = useFetchYouths(youthListFilters);

  return (
    <StyledCard>
      <CardContent>
        <Typography variant={'h5'} sx={{marginBottom: 3, fontWeight: 'bold'}}>
          {messages['freelance_corner.nearby_skilled_youth']}
        </Typography>

        {isLoading ? (
          <Grid item xs={12} textAlign={'center'} mt={4} mb={4}>
            <CircularProgress color='primary' size={50} />
          </Grid>
        ) : nearbySkilledYouths && nearbySkilledYouths.length > 0 ? (
          <Grid container>
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
          </Grid>
        ) : (
          <NoDataFoundComponent
            messageType={messages['freelance_corner.nearby_skilled_youth']}
            messageTextType={'inherit'}
          />
        )}
      </CardContent>
    </StyledCard>
  );
};

export default NearbySkilledYouthSection;
