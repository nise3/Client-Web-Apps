import React from 'react';
import {NavLink} from '../../index';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import makeStyles from '@mui/styles/makeStyles';
import {Fonts} from '../../../shared/constants/AppEnums';
import Icon from '@mui/material/Icon';

const useStyle = makeStyles(theme => ({
  listItem: {
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
  },
  listItemIcon: {
    minWidth: 10,
    paddingTop: 4,
  },
  listItemText: {
    fontFamily: 'inherit',
  },
}));

interface WrappedIconProps {
  props?: any;
}

const WrappedIcon: React.FC<WrappedIconProps> = props => <Icon {...props} />;

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
  const classes = useStyle();
  return (
    <ListItem
      button
      key={item.id}
      to={path}
      component={NavLink}
      className={classes.listItem}
      activeClassName='active'>
      <Box component='span' mr={{xs: 4, xl: 5}}>
        <ListItemIcon className={classes.listItemIcon}>
          <WrappedIcon>{item.icon}</WrappedIcon>
        </ListItemIcon>
      </Box>
      <ListItemText primary={item.name} className={classes.listItemText} />
    </ListItem>
  );
};

export default AppsSideBarFolderItem;
