import makeStyles from '@mui/styles/makeStyles';
import {CremaTheme} from '../../../../redux/types/AppContextPropsType';

const headerFixedHeight = {
  height: 60,
  minHeight: 60,
};
const useStyles = makeStyles((theme: CremaTheme) => ({
  appBar: {
    // boxShadow: '4px 3px 4px 0px rgba(0,0,0,0.12)',
    boxShadow: 'none',
  },
  logoArea: {
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  header: {
    width: '100%',
    minHeight: 80,
    margin: '0px auto',
  },
  headerHalf: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'end',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      // width: '50%',
      justifyContent: 'unset',
    },
  },
  headerMain: {
    minHeight: 56,
    paddingRight: 0,
    paddingLeft: 0,
    [theme.breakpoints.up('sm')]: {
      minHeight: 70,
    },
    backgroundColor: theme.palette.primary.main,
    // maxWidth: theme.breakpoints.values.xl,
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '100%',
  },
  headerMainFlex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'right',
    width: '100%',
  },
  headerFixedHeight: {
    ...headerFixedHeight,
  },
  headerMenu: {
    width: '100%',
    maxWidth: theme.breakpoints.values.xl,
    justifyContent: 'space-between',
    display: 'flex',
  },
  headerMenuGroup: {
    ...headerFixedHeight,
    justifyContent: 'center',
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    width: '100%',
    maxWidth: theme.breakpoints.values.xl,
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
  mobileMenuButton: {
    color: theme.palette.primary.contrastText,
  },
  menuIcons: {
    height: '0.6em',
  },
  menuItem: {
    ...headerFixedHeight,
    padding: '20px 10px',
    color: theme.palette.primary.contrastText,
    '&.active': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  firstMenuItem: {
    ...headerFixedHeight,
    padding: '20px 10px',
    paddingLeft: 0,
    color: theme.palette.primary.contrastText,
    '&.active': {
      backgroundColor: theme.palette.primary.light,
      paddingLeft: 10,
    },
  },
  menuItemActive: {
    backgroundColor: theme.palette.primary.light,
  },
  menuItemAction: {
    backgroundColor: theme.palette.warning.main,
  },
  menuItemMobile: {
    padding: '18px 20px 18px 12px',
    '& .active': {
      color: theme.palette.primary.main,
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
  pointer: {
    cursor: 'pointer',
  },
  languageSwitcher: {
    height: '100%',
    background: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
  menuItemRegOrLogin: {
    background: theme.palette.warning.main,
    color: theme.palette.primary.contrastText,
    width: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default useStyles;
