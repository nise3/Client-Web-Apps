import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => ({
  root: {},
  PaperBox: {
    padding: 40,
  },
  toggle: {
    display: 'flex',
    alignItems: 'center',
  },
  forgotpass: {
    marginTop: '7px',
    textAlign: 'right',
    // [theme.breakpoints.up('lg')]: {
    //   textAlign: 'right',
    // },
    // [theme.breakpoints.down('md')]: {
    //   textAlign: 'left',
    // },
  },
}));

export default useStyles;
