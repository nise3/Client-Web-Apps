import React from 'react';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import SmsIcon from '@mui/icons-material/Sms';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LanguageSwitcher from '../../LanguageSwitcher';
import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import {CremaTheme} from '../../../../types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => ({
  bucketMinibar: {
    width: '3.3rem',
    backgroundColor: theme.palette.sidebar.bgColor,
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.up('xl')]: {
      width: '4.3rem',
    },
  },
  bucketMiniBtn: {
    padding: 16,
    flexDirection: 'column',
    color: 'white',
  },
  iconBtn: {
    flexDirection: 'column',
    color: 'white',
  },
  icon: {
    fontSize: 20,
    [theme.breakpoints.up('xl')]: {
      fontSize: 30,
    },
  },
  logoRoot: {
    cursor: 'pointer',
    width: 30,
    marginLeft: 5,
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();

  return (
    <Box
      borderRight={1}
      borderColor='grey.100'
      className={clsx(classes.bucketMinibar, '')}>
      <Box>
        <IconButton
          className={classes.iconBtn}
          aria-label='show 17 new notifications'
          size="large">
          <img
            className={classes.logoRoot}
            src={'/images/logo-icon-large.png'}
            alt='crema-logo'
          />
        </IconButton>

        <IconButton
          className={clsx(classes.bucketMiniBtn, '')}
          aria-label='show 17 new notifications'
          size="large">
          <SearchIcon className={classes.icon} />
        </IconButton>
        <LanguageSwitcher iconOnly={true} />
        <IconButton
          className={classes.bucketMiniBtn}
          aria-label='show 4 new mails'
          size="large">
          <SmsIcon className={classes.icon} />
        </IconButton>
        <IconButton
          className={classes.bucketMiniBtn}
          aria-label='show 17 new notifications'
          size="large">
          <NotificationsActiveIcon className={classes.icon} />
        </IconButton>
      </Box>
      <Box mt='auto'>
        <IconButton className={classes.bucketMiniBtn} size="large">
          <SettingsIcon className={classes.icon} />
        </IconButton>
      </Box>
    </Box>
  );
}
