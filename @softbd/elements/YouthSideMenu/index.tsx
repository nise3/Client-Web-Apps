import React from 'react';
import {Box, makeStyles, Theme} from '@material-ui/core';
import {
  Business,
  CalendarToday,
  DesktopMac,
  Person,
  Receipt,
  Score,
  Settings,
} from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme): any => ({
  root: {
    background: '#fff',
    borderRadius: 4,
  },
  menuItem: {
    borderBottom: '1px solid #e9e9e9',
    paddingBottom: 10,
    paddingTop: 5,
    paddingLeft: 15,
    display: 'flex',
    alignItems: 'center',
    '& .itemIcon': {
      marginRight: 10,
    },
  },
  displayInline: {
    display: 'inline-block',
  },
}));

const SideMenu = () => {
  const classes: any = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.menuItem}>
        <Person className='itemIcon' />
        <Box className={classes.displayInline}>My Profile</Box>
      </Box>
      <Box className={classes.menuItem}>
        <Receipt className='itemIcon' />
        <Box className={classes.displayInline}>My CV</Box>
      </Box>
      <Box className={classes.menuItem}>
        <DesktopMac className='itemIcon' />
        <Box className={classes.displayInline}>My Courses</Box>
      </Box>
      <Box className={classes.menuItem}>
        <Business className='itemIcon' />
        <Box className={classes.displayInline}>My Jobs</Box>
      </Box>
      <Box className={classes.menuItem}>
        <CalendarToday className='itemIcon' />
        <Box className={classes.displayInline}>My Locker</Box>
      </Box>
      <Box className={classes.menuItem}>
        <CalendarToday className='itemIcon' />
        <Box className={classes.displayInline}>My Calender</Box>
      </Box>
      <Box className={classes.menuItem}>
        <Score className='itemIcon' />
        <Box className={classes.displayInline}>Freelance Corner</Box>
      </Box>
      <Box className={classes.menuItem}>
        <Settings className='itemIcon' />
        <Box className={classes.displayInline}>Settings</Box>
      </Box>
    </Box>
  );
};

export default SideMenu;
