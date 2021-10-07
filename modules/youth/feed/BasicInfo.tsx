import React from 'react';
import {Avatar, Box, Button, Card, LinearProgress} from '@mui/material';
import {CremaTheme} from '../../../types/AppContextPropsType';
import BasicInfoItemBox from '../../../@softbd/elements/YouthBasicInfoItemBox';
import {makeStyles} from '@mui/styles';
import {useIntl} from 'react-intl';

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

  return (
    <>
      <Card className={classes.root}>
        <Box className={classes.topCover} />
        <Box className={classes.container}>
          <Avatar
            alt={'sakibul'}
            src={'/images/userPageImages/profileImage.jpeg'}
            className={classes.userImage}
          />
          <Box className={classes.userName}>
            Md Sakibul Islam
            <Box className={classes.designation}>UI/UX Designer</Box>
          </Box>
          <Box sx={{width: '100%'}}>
            <LinearProgress variant='determinate' value={55} />
            <Box>{messages['youth_feed.profile_progress']} 55%</Box>
          </Box>

          <BasicInfoItemBox />

          <Box style={{textAlign: 'center'}}>
            <Button
              variant='outlined'
              color={'primary'}
              className={classes.completeProfile}>
              {messages['youth_feed.complete_profile']}
            </Button>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default BasicInfo;
