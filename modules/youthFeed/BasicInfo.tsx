import React from 'react';
import {
  Box,
  Button,
  Card,
  CardMedia,
  LinearProgress,
  makeStyles,
} from '@material-ui/core';
import {AddCircle, CheckCircle} from '@material-ui/icons';
import {CremaTheme} from '../../types/AppContextPropsType';

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
    borderRadius: '50%',
    position: 'absolute',
    height: 80,
    width: 80,
    left: 30,
    top: -45,
  },
  userName: {
    marginTop: 30,
    fontSize: 17,
    fontWeight: 'bold',
  },
  designation: {fontSize: 14, fontWeight: 'normal'},
  profileItem: {
    borderBottom: '1px solid #e9e9e9',
    paddingBottom: 10,
    paddingTop: 5,
    '& .itemIcon': {
      fill: '#1c98f7',
      float: 'right',
    },
    '& .itemIconAdd': {
      float: 'right',
    },
  },
  displayInline: {
    display: 'inline-block',
  },
  completeProfile: {
    marginTop: 20,
  },
}));

const BasicInfo = () => {
  const classes: any = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <Box className={classes.topCover} />
        <Box className={classes.container}>
          <CardMedia
            component='img'
            alt='user image'
            image='/images/userPageImages/profileImage.jpeg'
            className={classes.userImage}
          />
          <Box className={classes.userName}>
            Md Sakibul Islam
            <Box className={classes.designation}>UI/UX Designer</Box>
          </Box>
          <Box sx={{width: '100%'}}>
            <LinearProgress variant='determinate' value={55} />
            <Box>Profile complete 55%</Box>
          </Box>
          <Box className={classes.profileItem}>
            <Box className={classes.displayInline}>Phone Number</Box>
            <CheckCircle className='itemIcon' />
          </Box>
          <Box className={classes.profileItem}>
            <Box className={classes.displayInline}>Email Address</Box>
            <CheckCircle className='itemIcon' />
          </Box>
          <Box className={classes.profileItem}>
            <Box className={classes.displayInline}>NID</Box>
            <CheckCircle className='itemIcon' />
          </Box>
          <Box className={classes.profileItem}>
            <Box className={classes.displayInline}>BID</Box>
            <AddCircle className='itemIconAdd' color={'primary'} />
          </Box>

          <Box style={{textAlign: 'center'}}>
            <Button
              variant='outlined'
              color={'primary'}
              className={classes.completeProfile}>
              Complete Your Profile
            </Button>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default BasicInfo;
