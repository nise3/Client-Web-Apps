import {CremaTheme} from '../../redux/types/AppContextPropsType';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme: CremaTheme) => ({
  root: {},
  PaperBox: {
    padding: 40,
  },
}));

export default useStyles;
