import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../redux/types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => ({
  rootContainer: {
    height: '100vh',
    display: 'flex',
    [theme.breakpoints.only('xs')]: {
      height: 'calc(100vh - 56px)',
    },
    [theme.breakpoints.only('sm')]: {
      height: 'calc(100vh - 75px)',
    },
  },
}));

export default useStyles;