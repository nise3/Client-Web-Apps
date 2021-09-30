import React from 'react';
import {Box, Divider} from '@mui/material';
import {AddCircle, CheckCircle} from '@mui/icons-material';
import {CremaTheme} from '../../../types/AppContextPropsType';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme: CremaTheme): any => ({
  profileItem: {
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
  divider: {
    width: '100%',
    height: 1,
    marginTop: 10,
  },
}));

const BasicInfoItemBox = () => {
  const classes: any = useStyles();

  return (
    <>
      <Box className={classes.profileItem}>
        <Box className={classes.displayInline}>Phone Number</Box>
        <CheckCircle className='itemIcon' />
        <Divider className={classes.divider} />
      </Box>
      <Box className={classes.profileItem}>
        <Box className={classes.displayInline}>Email Address</Box>
        <CheckCircle className='itemIcon' />
        <Divider className={classes.divider} />
      </Box>
      <Box className={classes.profileItem}>
        <Box className={classes.displayInline}>NID</Box>
        <CheckCircle className='itemIcon' />
        <Divider className={classes.divider} />
      </Box>
      <Box className={classes.profileItem}>
        <Box className={classes.displayInline}>BID</Box>
        <AddCircle className='itemIconAdd' color={'primary'} />
      </Box>
    </>
  );
};

export default BasicInfoItemBox;
