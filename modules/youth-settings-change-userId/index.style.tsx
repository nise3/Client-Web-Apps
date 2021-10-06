import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => ({
  rootContainer: {
    display: 'flex',
    height: 'calc(100vh - 70px)',
  },
  paperBox: {
    padding: '20px',
    margin: 'auto',
  },
}));

export default useStyles;
