import makeStyles from '@mui/styles/makeStyles';
import {CremaTheme} from '../../../../redux/types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => ({
  appBar: {
    boxShadow: '4px 3px 4px 0px rgba(0,0,0,0.12)',
  },
  signinButton: {
    color: '#fff',
    background: '#682988',
  },
  headerMain: {
    minHeight: 56,
    paddingRight: 0,
    paddingLeft: 0,
    [theme.breakpoints.up('sm')]: {
      minHeight: 70,
    },
  },
  headerMainFlex: {
    display: 'flex',
    alignItems: 'center',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      marginLeft: 'auto',
    },
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  menuIcons: {
    height: '0.6em',
  },
  menuItem: {
    fontSize: 20,
    padding: '20px 10px',
    '&>a': {
      display: 'flex',
    },
    '& .active': {
      color: theme.palette.primary.main,
    },
  },
  menuItemMobile: {
    padding: '18px 20px 18px 12px',
    '&>a': {
      display: 'flex',
    },
    '& .active': {
      color: theme.palette.primary.main,
    },
  },
  desktopMenu: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  headerNav: {
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
  menuItemRoot: {
    padding: 0,
  },
  pointer: {
    cursor: 'pointer',
  },
  menuIconRoot: {
    width: '2.5rem',
    height: '2.5rem',
  },
  logoRoot: {
    height: 30,
  },
}));
export default useStyles;