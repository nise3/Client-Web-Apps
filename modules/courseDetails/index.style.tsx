import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../types/AppContextPropsType';

const useStyle = makeStyles((theme: CremaTheme) => ({
  rootContent: {},
  headerRoot: {
    backgroundImage: 'linear-gradient(50%, #fdfffe, #f2fff8)',
  },
}));

export default useStyle;
