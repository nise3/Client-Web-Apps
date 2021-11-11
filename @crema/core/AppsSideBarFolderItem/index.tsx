import React from 'react';
import {styled} from '@mui/material/styles';
import {NavLink} from '../../index';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import {Fonts} from '../../../shared/constants/AppEnums';
import Icon from '@mui/material/Icon';

const PREFIX = 'AppsSideBarFolderItem';

const classes = {
  listItemIcon: `${PREFIX}-listItemIcon`,
  listItemText: `${PREFIX}-listItemText`,
};

const StyledListItem = styled(ListItem)(({theme}) => ({
  paddingLeft: '10px',
  paddingRight: '0',
  paddingTop: '5px',
  paddingBottom: '5px',

  '& .MuiListItemText-root': {
    [theme.breakpoints.down('xl')]: {
      marginTop: 0,
      marginBottom: 0,
    },
  },

  '& .MuiTypography-body1': {
    fontSize: 15,
    fontWeight: Fonts.MEDIUM,
  },

  '& svg': {
    fontSize: '18px',
  },

  '&:hover,&:focus,&.active': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,

    '& svg': {
      color: theme.palette.primary.main,
    },

    '& .MuiTypography-root': {
      color: theme.palette.primary.main,
    },
  },

  '&.active': {
    color: theme.palette.primary.main,

    '& svg, & .MuiTypography-root': {
      color: theme.palette.primary.main,
    },
  },

  [`& .${classes.listItemIcon}`]: {
    minWidth: 10,
    paddingTop: 4,
  },

  [`& .${classes.listItemText}`]: {
    fontFamily: 'inherit',
  },
}));

interface WrappedIconProps {
  props?: any;
}

const WrappedIcon: React.FC<WrappedIconProps> = (props) => <Icon {...props} />;

interface AppsSideBarFolderItemProps {
  item: {
    id: number | string;
    name: string;
    icon: any;
  };
  path: string;
}

const AppsSideBarFolderItem: React.FC<AppsSideBarFolderItemProps> = ({
  item,
  path,
}) => {
  return (
    <StyledListItem
      // @ts-ignore
      button
      key={item.id}
      to={path}
      component={NavLink}
      activeClassName='active'>
      <Box component='span' mr={{xs: 4, xl: 5}}>
        <ListItemIcon className={classes.listItemIcon}>
          <WrappedIcon>{item.icon}</WrappedIcon>
        </ListItemIcon>
      </Box>
      <ListItemText primary={item.name} className={classes.listItemText} />
    </StyledListItem>
  );
};

export default AppsSideBarFolderItem;
