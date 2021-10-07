import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../types/AppContextPropsType';

const useStyle = makeStyles((theme: CremaTheme) => ({
  courseFee: {
    textTransform: 'uppercase',
    marginTop: 25,
    display: 'flex',
    marginBottom: 10,
  },
  courseFeeStyle: {
    marginLeft: 10,
    color: theme.palette.primary.main,
  },
  sectionTitleStyle: {
    fontSize: 17,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: theme.palette.primary.main,
  },
  dFlexAlignCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  courseBadgeBox: {
    color: '#999',
  },
  courseBadgeIcon: {
    height: 60,
    width: 60,
    marginRight: 15,
  },
  courseBadgeTitle: {
    color: '#161616',
    fontWeight: 'bold',
  },
  dividerStyle: {
    margin: '10px 30px',
    borderWidth: 1,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  boxMargin: {
    marginTop: 20,
    marginBottom: 25,
  },
  lessonBox: {
    maxWidth: '600px',
    border: '1px solid #e9e9e9',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  listStyle: {
    padding: 0,
    background: '#fbfbf8',
    borderRadius: 5,
  },
  listItem: {
    '& .MuiListItemText-primary': {
      display: 'inline-block',
      width: '70%',
    },
    '& .MuiListItemText-secondary': {
      display: 'inline-block',
      float: 'right',
      width: '30%',
      textAlign: 'right',
    },
  },
  ulList: {
    '& .list-item': {
      padding: 0,
    },
    '& .list-item-bullet-large': {
      minWidth: 20,
      height: 14,
      fontSize: 40,
      marginTop: -44,
    },
    '& .list-item-bullet-small': {
      minWidth: 15,
      height: 14,
      fontSize: 20,
      marginTop: -17,
    },
  },
  trainerBox: {
    marginTop: 20,
    marginBottom: 20,
  },
  trainerNameAndAboutBox: {
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'column',
  },
}));

export default useStyle;
