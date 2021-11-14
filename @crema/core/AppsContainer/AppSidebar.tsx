import React, {ReactNode} from 'react';
import {styled} from '@mui/material/styles';
import Hidden from '@mui/material/Hidden';
import Drawer from '@mui/material/Drawer';
import {onToggleAppDrawer} from '../../../redux/actions';
import clsx from 'clsx';
import Card from '@mui/material/Card';
import {Box} from '@mui/material';
import {useDispatch} from 'react-redux';
import {NavStyle} from '../../../shared/constants/AppEnums';

const PREFIX = 'AppSidebar';

const classes = {
  appsSidebar: `${PREFIX}-appsSidebar`,
  appSidebarDrawer: `${PREFIX}-appSidebarDrawer`,
};

interface AppSidebarProps {
  isAppDrawerOpen: boolean;
  footer: boolean;
  fullView: boolean;
  navStyle: NavStyle;
  sidebarContent: ReactNode;
}

const UnstyledAppSidebar: React.FC<AppSidebarProps> = (props) => {
  const {isAppDrawerOpen, sidebarContent} = props;
  const dispatch = useDispatch();

  return (
    <Box className={classes.appsSidebar}>
      <Hidden lgUp>
        <Drawer
          open={isAppDrawerOpen}
          onClose={() => dispatch(onToggleAppDrawer())}
          classes={{
            paper: clsx(classes.appSidebarDrawer),
          }}
          style={{position: 'absolute'}}>
          {sidebarContent}
        </Drawer>
      </Hidden>
      <Hidden xlDown>
        <Card style={{height: '100%'}}>{sidebarContent}</Card>
      </Hidden>
    </Box>
  );
};

const AppSidebar = styled(UnstyledAppSidebar)(({theme}) => ({
  [`& .${classes.appsSidebar}`]: {
    height: '100%',
    [theme.breakpoints.up('lg')]: {
      width: '17rem',
    },
    [theme.breakpoints.up('xl')]: {
      width: '20rem',
    },
  },
  [`& .${classes.appSidebarDrawer} `]: {
    width: '19rem',
    '& .listItem': {
      zIndex: 1305,
    },
  },
}));

export default AppSidebar;
