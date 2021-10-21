import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => ({
  root: {},
  PaperBox: {
    padding: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  btn: {
    width: '200px',
    height: '50px',
    marginTop: '40px',
  },
  text: {
    marginBottom: '10px',
    fontWeight: 'bold',
  },
}));

export default useStyles;
