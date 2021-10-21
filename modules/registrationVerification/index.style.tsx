import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../redux/types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => ({
  paperBox: {
    margin: 'auto',
    padding: '20px',
    width: '100%',
    maxWidth: '400px',
  },
  sendCode: {
    marginTop: '15px',
    marginBottom: '15px',
  },
  errorMessage: {
    color: theme.palette.error.main,
    marginTop: '5px',
  },
}));

export default useStyles;
