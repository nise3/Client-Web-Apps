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
  btn: {
    marginTop: '12px',
    width: '100px',
  },
  img: {
    '&:hover': {
      border: '1px solid #42b326',
      cursor: 'pointer',
      borderRadius: '10px',
    },
  },
}));

export default useStyles;
