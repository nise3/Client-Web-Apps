import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => ({
  rootContainer: {
    display: 'flex',
    height: 'calc(100vh - 70px)',
  },
  paperBox: {
    margin: 'auto',
    // maxHeight: '250px',
    // height: '100%',
  },
  boxContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  iconBoxYouth: {
    background: '#0069bc',
  },
  iconBoxTc: {
    background: '#661686',
  },
  iconBoxIndustry: {
    background: '#e67f22',
  },
  icon: {
    height: '100px',
    width: '110px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      margin: 'auto',
    },
  },
  text: {
    color: '#ebdada',
    fontSize: '12px',
    marginTop: '10px',
  },
}));

export default useStyles;
