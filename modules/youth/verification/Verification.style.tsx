import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => ({
  root: {},
  PaperBox: {
    padding: 40,
  },
  sendCode: {
    marginTop: '15px',
    marginBottom: '15px',
  },
}));

export default useStyles;
