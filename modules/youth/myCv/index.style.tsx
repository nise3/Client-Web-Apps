import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => ({
  root: {
    marginTop: 20,
    marginBottom: 20,
  },
  rootContent: {
    marginTop: 0,
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row-reverse',
    },
  },
  templateImage: {
    cursor: 'pointer',
  },
  templateSelected: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: theme.palette.primary.main,
  },
  classicRoot: {
    border: '2px solid #d3d4d4',
    background: '#fff',
    padding: 20,
  },
  classicPersonalInfoBox: {
    marginTop: 20,
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    [theme.breakpoints.only('xs')]: {
      flexDirection: 'column',
    },
  },
  classicPersonalInfo: {
    [theme.breakpoints.up('sm')]: {
      marginRight: 20,
    },
  },
  classicUserImage: {
    width: 150,
    height: 170,
    minWidth: 150,
    maxHeight: 170,
    [theme.breakpoints.only('xs')]: {
      marginBottom: 20,
    },
  },
  classicBoldUnderline: {
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
  divider: {
    background: '#d1d1d1',
    height: 2,
  },
  classicEducationItem: {
    lineHeight: 1.3,
    [theme.breakpoints.only('xs')]: {
      display: 'flex',
    },
    '& .caption': {
      minWidth: 80,
      display: 'inline-block',
    },
    '& .text': {
      marginLeft: 20,
    },
  },
  modernRoot: {
    border: '2px solid #d3d4d4',
    background: '#fff',
  },
  modernHeader: {
    background: '#444444',
    height: 160,
    alignItems: 'center',
  },
  modernUserName: {
    color: '#dbdbdb',
    padding: '0px 10px',
  },
  moderUserImage: {
    height: '100%',
    width: '100%',
    maxWidth: 120,
    maxHeight: 120,
    margin: 'auto',
  },
  modernLeftBox: {
    background: '#f8e7db',
    padding: '15px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  modernLeftIcon: {
    border: '2px solid #444444',
    borderRadius: '50%',
    padding: 2,
    width: 35,
    height: 35,
    marginTop: 10,
  },
  modernTitleBox: {
    background: '#444444',
    color: '#f8e7db',
    height: 35,
    minWidth: 140,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0px 10px',
  },
  modernEducationItem: {
    textAlign: 'center',
    marginTop: 20,
    '& .text': {
      display: 'block',
    },
  },
  languageItem: {
    display: 'block',
    textAlign: 'center',
    '& .item': {
      marginTop: 10,
    },
  },
  modernRightBox: {
    padding: '15px 20px',
  },
  classicJobItem: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 5,
  },
  modernObjectiveBlock: {
    border: '2px solid #bfbfbf',
    padding: '15px 10px',
    borderRight: 'none',
    //borderImage: 'linear-gradient(to right, grey 25%, #fff 15%) 5',
    position: 'relative',
    '& .title': {
      position: 'absolute',
      background: '#fff',
      top: -12,
    },
  },
}));

export default useStyles;
