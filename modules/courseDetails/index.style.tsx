import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../types/AppContextPropsType';

const useStyle = makeStyles((theme: CremaTheme) => ({
  rootContent: {},
  headerRoot: {
    backgroundImage: 'linear-gradient(180deg, #fefffe, #deffef)',
  },
  headerImage: {
    height: 300,
    width: '100%',
  },
  courseFee: {
    textTransform: 'uppercase',
    marginTop: 25,
    display: 'flex',
    marginBottom: 10,
  },
  courseFeeStyle: {
    marginLeft: 10,
    color: theme.palette.primary.main,
  },
  courseHeaderTitle: {
    fontWeight: 'bold',
    marginBottom: 30,
  },
  linkStyle: {
    fontSize: 17,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
  courseBadgeBox: {
    color: '#999',
    display: 'flex',
    alignItems: 'center',
  },
  courseBadgeIcon: {
    height: 60,
    width: 60,
    marginRight: 15,
  },
  courseBadgeTitle: {
    color: '#161616',
    fontWeight: 'bold',
  },
  dividerStyle: {
    margin: '10px 30px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

export default useStyle;
