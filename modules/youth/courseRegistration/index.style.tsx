import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => ({
  rootContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  paperBox: {
    padding: 15,
  },
  btnGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '15px 0px',
  },
}));

export default useStyles;
