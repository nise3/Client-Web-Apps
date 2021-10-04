import React from 'react';
import {Box, Card} from '@mui/material';
import {
  Business,
  CalendarToday,
  DesktopMac,
  Person,
  Receipt,
  Score,
  Settings,
} from '@mui/icons-material';
import {CremaTheme} from '../../../types/AppContextPropsType';
import {makeStyles} from '@mui/styles';
import {useIntl} from 'react-intl';

const useStyles = makeStyles((theme: CremaTheme): any => ({
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
  const {messages} = useIntl();

  return (
    <Card>
      <Box className={classes.menuItem}>
        <Person className='itemIcon' />
        <Box className={classes.displayInline}>
          {messages['youth_feed_menu.my_profile']}
        </Box>
      </Box>
      <Box className={classes.menuItem}>
        <Receipt className='itemIcon' />
        <Box className={classes.displayInline}>
          {messages['youth_feed_menu.my_cv']}
        </Box>
      </Box>
      <Box className={classes.menuItem}>
        <DesktopMac className='itemIcon' />
        <Box className={classes.displayInline}>
          {messages['youth_feed_menu.my_courses']}
        </Box>
      </Box>
      <Box className={classes.menuItem}>
        <Business className='itemIcon' />
        <Box className={classes.displayInline}>
          {messages['youth_feed_menu.my_jobs']}
        </Box>
      </Box>
      <Box className={classes.menuItem}>
        <CalendarToday className='itemIcon' />
        <Box className={classes.displayInline}>
          {messages['youth_feed_menu.my_locker']}
        </Box>
      </Box>
      <Box className={classes.menuItem}>
        <CalendarToday className='itemIcon' />
        <Box className={classes.displayInline}>
          {messages['youth_feed_menu.my_calender']}
        </Box>
      </Box>
      <Box className={classes.menuItem}>
        <Score className='itemIcon' />
        <Box className={classes.displayInline}>
          {messages['youth_feed_menu.freelance_corner']}
        </Box>
      </Box>
      <Box className={classes.menuItem}>
        <Settings className='itemIcon' />
        <Box className={classes.displayInline}>
          {messages['youth_feed_menu.settings']}
        </Box>
      </Box>
    </Card>
  );
};

export default SideMenu;
