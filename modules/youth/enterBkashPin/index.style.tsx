import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => ({
  rootContainer: {
    display: 'flex',
    height: 'calc(100vh - 70px)',
  },
  paperBox: {
    margin: 'auto',
  },
  sendCode: {
    marginTop: '15px',
    marginBottom: '15px',
  },
}));

export default useStyles;
