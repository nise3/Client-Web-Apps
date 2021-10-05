import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => ({
  rootContainer: {
    marginTop: 20,
    marginBottom: 20,
    background: '#fff',
    borderRadius: 10,
    padding: 14,
  },
}));

export default useStyles;
