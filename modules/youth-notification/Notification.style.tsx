import {CremaTheme} from '../../types/AppContextPropsType';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme: CremaTheme) => ({
  root: {},
  container: {
    marginTop: 20,
    marginBottom: 20,
  },
  searchBox: {
    padding: '10px 5px 5px',
    alignItems: 'center',
    marginTop: 10,
  },
  searchInputBorderHide: {
    '& fieldset': {
      border: 'none',
    },
    '& input': {
      padding: '14px 0px',
    },
  },
  searchButton: {
    color: '#fff',
    padding: '8px 14px',
    width: '95%',
  },
  btnPopover: {
    borderRadius: 0,
    width: '100%',
    textTransform: 'capitalize',
  },
  notiBtn: {
    justifyContent: 'flex-start',
    width: '100%',
    height: 56,
    fontSize: 16,
    borderRadius: 0,
    paddingLeft: '1rem',
    paddingRight: '1rem',
    color: theme.palette.grey['800'],
    '&:hover, &:focus': {
      color: theme.palette.text.primary,
      backgroundColor: 'transparent',
    },
    [theme.breakpoints.up('sm')]: {
      height: 70,
    },
    [theme.breakpoints.up('md')]: {
      justifyContent: 'center',
      width: 'auto',
      borderLeft: 'solid 1px',
      borderLeftColor: theme.palette.grey[200],
      color: theme.palette.grey[400],
      '&:hover, &:focus': {
        color: theme.palette.text.primary,
      },
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
    },
    [theme.breakpoints.up('xl')]: {
      paddingLeft: '2.5rem',
      paddingRight: '2.5rem',
    },
  },
  notiIcon: {
    fontSize: 22,
    color: theme.palette.text.secondary,
    [theme.breakpoints.up('xl')]: {
      fontSize: 30,
    },
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  badge: {
    marginRight: 8,
  },
  notificationBox: {
    marginTop: 20,
  },
  card: {
    marginTop: 0,
  },
}));
export default useStyles;
