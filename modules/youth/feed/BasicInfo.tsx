import React from 'react';
import {styled} from '@mui/material/styles';
import {Avatar, Box, Button, Card, LinearProgress} from '@mui/material';
import BasicInfoItemBox from './components/BasicInfoItemBox';
import {useIntl} from 'react-intl';
import {Link} from '../../../@softbd/elements/common';
import {LINK_FRONTEND_YOUTH_ROOT} from '../../../@softbd/common/appLinks';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {getIntlNumber} from '../../../@softbd/utilities/helpers';

const PREFIX = 'BasicInfo';

const classes = {
  container: `${PREFIX}-container`,
  topCover: `${PREFIX}-topCover`,
  userImage: `${PREFIX}-userImage`,
  userName: `${PREFIX}-userName`,
  designation: `${PREFIX}-designation`,
  completeProfile: `${PREFIX}-completeProfile`,
};

const StyledCard = styled(Card)(({theme}): any => ({
  [`& .${classes.container}`]: {
    padding: 20,
    position: 'relative',
  },

  [`& .${classes.topCover}`]: {
    height: 90,
    backgroundImage: 'linear-gradient(110deg, #129e55 60%, #048340 40%)',
  },

  [`& .${classes.userImage}`]: {
    position: 'absolute',
    height: 65,
    width: 65,
    left: 18,
    top: -38,
  },

  [`& .${classes.userName}`]: {
    marginTop: 30,
    fontSize: 17,
    fontWeight: 'bold',
  },

  [`& .${classes.designation}`]: {fontSize: 14, fontWeight: 'normal'},

  [`& .${classes.completeProfile}`]: {
    marginTop: 20,
  },
}));

const BasicInfo = () => {
  const {messages, formatNumber} = useIntl();
  const authUser = useAuthUser<YouthAuthUser>();

  return (
    <>
      <StyledCard>
        <Box className={classes.topCover} />
        <Box className={classes.container}>
          <Avatar
            alt={'sakibul'}
            src={'/images/userPageImages/profileImage.jpeg'}
            className={classes.userImage}
          />
          <Box className={classes.userName}>
            {authUser?.first_name} {authUser?.last_name}
          </Box>
          <Box sx={{width: '100%'}}>
            <LinearProgress variant='determinate' value={55} />
            <Box>
              {messages['youth_feed.profile_progress']}{' '}
              {getIntlNumber(formatNumber, 55)}%
            </Box>
          </Box>

          <BasicInfoItemBox youthProfile={authUser} />

          <Box style={{textAlign: 'center'}}>
            <Link href={LINK_FRONTEND_YOUTH_ROOT}>
              <Button
                variant='outlined'
                color={'primary'}
                className={classes.completeProfile}>
                {messages['youth_feed.complete_profile']}
              </Button>
            </Link>
          </Box>
        </Box>
      </StyledCard>
    </>
  );
};

export default BasicInfo;
