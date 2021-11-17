import {styled} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';

const PREFIX = 'AppHeader';

export const classes = {
  appBar: `${PREFIX}-appBar`,
  signinButton: `${PREFIX}-signinButton`,
  headerMain: `${PREFIX}-headerMain`,
  headerMainFlex: `${PREFIX}-headerMainFlex`,
  menuButton: `${PREFIX}-menuButton`,
  grow: `${PREFIX}-grow`,
  sectionDesktop: `${PREFIX}-sectionDesktop`,
  sectionMobile: `${PREFIX}-sectionMobile`,
  menuIcons: `${PREFIX}-menuIcons`,
  menuItem: `${PREFIX}-menuItem`,
  menuItemMobile: `${PREFIX}-menuItemMobile`,
  desktopMenu: `${PREFIX}-desktopMenu`,
  headerNav: `${PREFIX}-headerNav`,
  menuItemRoot: `${PREFIX}-menuItemRoot`,
  pointer: `${PREFIX}-pointer`,
  menuIconRoot: `${PREFIX}-menuIconRoot`,
  logoRoot: `${PREFIX}-logoRoot`,
  navTextColor: `${PREFIX}-test`,
};

export const StyledAppBar = styled(AppBar)(({theme}) => ({
  [`&.${classes.appBar}`]: {
    boxShadow: '4px 3px 4px 0px rgba(0,0,0,0.12)',
  },

  [`& .${classes.signinButton}`]: {
    color: '#fff',
    background: '#682988',
  },

  [`& .${classes.headerMain}`]: {
    minHeight: 56,
    paddingRight: 0,
    paddingLeft: 0,
    [theme.breakpoints.up('sm')]: {
      minHeight: 70,
    },
  },

  [`& .${classes.headerMainFlex}`]: {
    display: 'flex',
    alignItems: 'center',
  },

  [`& .${classes.menuButton}`]: {
    marginRight: theme.spacing(2),
  },

  [`& .${classes.grow}`]: {
    flexGrow: 1,
  },

  [`& .${classes.sectionDesktop}`]: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center',
    },
  },

  [`& .${classes.sectionMobile}`]: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      marginLeft: 'auto',
    },
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  [`& .${classes.menuIcons}`]: {
    height: '0.6em',
  },

  [`& .${classes.menuItem}`]: {
    fontSize: 20,
    padding: '20px 20px',
    '&>a': {
      display: 'flex',
    },
    '& .active': {
      color: theme.palette.primary.main,
    },
  },

  [`& .${classes.menuItemMobile}`]: {
    // fontSize: 20,
    padding: '18px 20px 18px 12px',
    '&>a': {
      display: 'flex',
    },
    '& .active': {
      color: theme.palette.primary.main,
    },
  },

  [`& .${classes.desktopMenu}`]: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },

  [`& .${classes.headerNav}`]: {
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.grey[800],
    '& .navbarNav': {
      display: 'flex',
      padding: 0,
      marginLeft: -16,
      marginRight: -16,
      [theme.breakpoints.up('lg')]: {
        marginLeft: -20,
        marginRight: -20,
      },
    },
    '& .navItem': {
      width: 'auto',
      cursor: 'pointer',
      [theme.breakpoints.up('lg')]: {
        paddingLeft: 20,
        paddingRight: 20,
      },
      '&.active': {
        color: theme.palette.secondary.main,
        '& .navLinkIcon': {
          color: theme.palette.secondary.main,
        },
      },
    },
    '& .navLinkIcon': {
      marginRight: 10,
      color: theme.palette.grey[800],
      fontSize: 20,
    },
  },

  [`& .${classes.menuItemRoot}`]: {
    padding: 0,
  },

  [`& .${classes.pointer}`]: {
    cursor: 'pointer',
  },

  [`& .${classes.menuIconRoot}`]: {
    width: '2.5rem',
    height: '2.5rem',
  },

  [`& .${classes.logoRoot}`]: {
    height: 30,
  },
  [`& .${classes.navTextColor}`]: {
    color: theme.palette.grey[500],
  },
}));
