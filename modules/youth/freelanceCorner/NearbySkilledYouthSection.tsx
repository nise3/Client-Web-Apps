import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
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
import {useFetchYouths} from '../../../services/youthManagement/hooks';

const PREFIX = 'NearbySkilledYouthSection';

const classes = {
  `& .${classes.nearbyYouthSectionRoot}`: `${PREFIX}-undefined`,
  `& .${classes.divider}`: `${PREFIX}-undefined`,
  `& .${classes.seeMoreButton}`: `${PREFIX}-undefined`,
  `& .${classes.selectControl}`: `${PREFIX}-undefined`
};

const StyledStyledCard = styled(StyledCard)((
  {
    theme: {
      theme: CremaTheme
    }
  }
) => ({
  [`& .${classes.undefined}`]: {},

  [`& .${classes.undefined}`]: {
    width: '100%',
    height: 1,
    marginBottom: 5,
  },

  [`& .${classes.undefined}`]: {
    boxShadow: 'none',
    marginTop: 10,
  },

  [`& .${classes.undefined}`]: {
    marginLeft: 20,
    marginBottom: 10,
  }
}));

const PREFIX = 'NearbySkilledYouthSection';

const classes = {
  nearbyYouthSectionRoot: `${PREFIX}-nearbyYouthSectionRoot`,
  divider: `${PREFIX}-divider`,
  seeMoreButton: `${PREFIX}-seeMoreButton`,
  selectControl: `${PREFIX}-selectControl`
};

const StyledCard = styled(Card)((
  {
    theme: CremaTheme
  }
) => ({
  [`& .${classes.nearbyYouthSectionRoot}`]: {},

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
  }
}));

const useStyle = makeStyles((
  {
    theme: {
      theme: CremaTheme
    }
  }
) => ({
  [`& .${classes.undefined}`]: {},

  [`& .${classes.undefined}`]: {
    width: '100%',
    height: 1,
    marginBottom: 5,
  },

  [`& .${classes.undefined}`]: {
    boxShadow: 'none',
    marginTop: 10,
  },

  [`& .${classes.undefined}`]: {
    marginLeft: 20,
    marginBottom: 10,
  }
}));

const NearbySkilledYouthSection = () => {
  const classes = useStyle();
  const {messages} = useIntl();
  const authUser = useAuthUser<YouthAuthUser>();
  const [youthListFilters] = useState<any>({
    loc_district_id: authUser?.loc_district_id,
    loc_upazila_id: authUser?.loc_upazila_id,
    page_size: 4,
  });

  const {data: nearbySkilledYouths} = useFetchYouths(youthListFilters);

  return (
    <StyledStyledCard>
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
          <Grid item xs={12} style={{paddingLeft: 15}}>
            {/*<Link href={LINK_FRONTEND_YOUTH_NEARBY_COURSELIST} passHref>*/}
            <Button
              variant={'text'}
              color={'primary'}
              size={'medium'}
              className={classes.seeMoreButton}>
              {messages['freelance_corner.see_more']}
              <ChevronRight color={'primary'} />
            </Button>
            {/*</Link>*/}
          </Grid>
        </Grid>
      </CardContent>
    </StyledStyledCard>
  );
};

export default NearbySkilledYouthSection;
