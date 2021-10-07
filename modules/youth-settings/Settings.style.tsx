import {CremaTheme} from '../../types/AppContextPropsType';
import {createStyles, makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme: CremaTheme) =>
  createStyles({
    root: {},
    container: {
      margin: '20px auto',
    },
    box: {
      padding: 40,
    },
    userIdPaperBox: {
      padding: '20px',
      margin: 'auto',
    },
    settingBox: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      '&:hover': {
        '& .textUser': {
          transition: 'color 0.5s',
          color: '#1e96d5',
        },
        '& .textPassword': {
          transition: 'color 0.5s',
          color: '#048340',
        },
        '& .textDelete': {
          transition: 'color 0.5s',
          color: '#e7223d',
        },
        '& .icon': {
          transition: 'color 0.5s',
          color: '#fff !important',
        },
        '& $userItem': {
          transition: 'background 0.5s',
          background: '#1e96d5',
        },
        '& $passwordItem': {
          transition: 'background 0.5s',
          background: '#048340',
        },
        '& $deleteItem': {
          transition: 'background 0.5s',
          background: '#e7223d',
        },
      },
    },
    boxItem: {
      minWidth: '70px',
      height: '70px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: '10px',
    },
    deleteIcon: {
      color: 'red',
      transform: 'scale(1.5)',
    },
    userItem: {
      background: '#d1eef3',
    },
    passwordItem: {
      background: '#d6f5d6',
    },
    deleteItem: {
      background: '#f9e5e5',
    },
    button: {
      margin: theme.spacing(1),
      width: '100px',
      marginLeft: '10px',
    },
    title: {
      background: '#fddcdc',
    },
    paperBox: {
      padding: '20px',
      margin: 'auto',
    },
  }),
);

export default useStyles;
