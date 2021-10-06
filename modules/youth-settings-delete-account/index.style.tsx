import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => ({
  rootContainer: {
    display: 'flex',
    height: 'calc(100vh - 70px)',
  },
  paperBox: {
    margin: 'auto',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default useStyles;
