import React from 'react';
import {Avatar, Box, Button, Card, LinearProgress} from '@mui/material';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';
import BasicInfoItemBox from './components/BasicInfoItemBox';
import {makeStyles} from '@mui/styles';
import {useIntl} from 'react-intl';
import {Link} from '../../../@softbd/elements/common';
import {LINK_FRONTEND_YOUTH_ROOT} from '../../../@softbd/common/appLinks';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';

const useStyles = makeStyles((theme: CremaTheme): any => ({
  container: {
    padding: 20,
    position: 'relative',
  },
  topCover: {
    height: 90,
    backgroundImage: 'linear-gradient(110deg, #129e55 60%, #048340 40%)',
  },
  userImage: {
    position: 'absolute',
    height: 65,
    width: 65,
    left: 18,
    top: -38,
  },
  userName: {
    marginTop: 30,
    fontSize: 17,
    fontWeight: 'bold',
  },
  designation: {fontSize: 14, fontWeight: 'normal'},
  completeProfile: {
    marginTop: 20,
  },
}));

const BasicInfo = () => {
  const classes: any = useStyles();
  const {messages} = useIntl();
  const authUser = useAuthUser<YouthAuthUser>();

  return (
    <>
      <Card>
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
            <Box>{messages['youth_feed.profile_progress']} 55%</Box>
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
      </Card>
    </>
  );
};

export default BasicInfo;
