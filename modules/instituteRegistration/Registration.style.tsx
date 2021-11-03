import {CremaTheme} from '../../redux/types/AppContextPropsType';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme: CremaTheme) => ({
  root: {},
  rootContainer: {
    display: 'flex',
    [theme.breakpoints.only('xs')]: {
      height: 'calc(100vh - 56px)',
    },
    [theme.breakpoints.only('sm')]: {
      height: 'calc(100vh - 75px)',
    },
  },
  PaperBox: {
    padding: 40,
    margin: '70px auto',
  },
  signInStyle: {
    color: theme.palette.primary.main + ' !important',
  },
}));

export default useStyles;
