import {CremaTheme} from '../../types/AppContextPropsType';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme: CremaTheme) => ({
  root: {},
  containerBox: {
    padding: 40,
  },
  PaperBox: {
    padding: 20,
  },
  avatar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  noticeBoardText: {
    fontWeight: 'bold',
  },
  paperSearch: {
    p: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  avatarImage: {
    maxHeight: '80px',
    maxWidth: '80px',
    width: '100%',
    height: '100%',
  },
  creativaItText: {
    marginTop: '5px',
    marginBottom: '15px',
    color: '#687882',
  },
  btn: {
    marginRight: '20px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '10px',
    },
  },
  noticeTopBox: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
}));

export default useStyles;
