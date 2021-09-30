import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {toggleNavCollapsed} from '../../../../redux/actions';
import {useDispatch} from 'react-redux';
import Hidden from '@mui/material/Hidden';
import Box from '@mui/material/Box';
import SearchBar from '../../SearchBar';
import useStyles from './AppHeader.style';
import AppLogo from '../../../../shared/components/AppLogo';

interface AppHeaderProps {}

const AppHeader: React.FC<AppHeaderProps> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Hidden lgUp>
      <Box
        width={1}
        display='flex'
        alignItems='center'
        className={clsx(classes.bitBucketResHeader, 'bitBucketResHeader')}>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='open drawer'
          onClick={() => dispatch(toggleNavCollapsed())}
          size="large">
          <MenuIcon className={classes.menuIcon} />
        </IconButton>
        <AppLogo />
        <Box ml='auto'>
          <SearchBar borderLight placeholder='Search…' />
        </Box>
      </Box>
    </Hidden>
  );
};
export default AppHeader;
