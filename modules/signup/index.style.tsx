import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../redux/types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => ({
  paperBox: {
    margin: 'auto',
    padding: '20px',
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
    display: 'flex',
    flexDirection: 'column',
    padding: '35px',
    alignItems: 'center',
    borderRadius: '10px',
    cursor: 'pointer',
    height: '140px',
    width: '140px',
    [theme.breakpoints.down('sm')]: {
      padding: '20px',
      margin: 'auto',
      height: '100px',
      width: '100px',
    },
  },
  text: {
    color: theme.palette.grey['300'],
    whiteSpace: 'nowrap',
    marginTop: '10px',
  },
  signInStyle: {
    color: theme.palette.primary.main,
  },
}));

export default useStyles;
