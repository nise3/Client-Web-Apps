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
    paper: {},
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
      // [theme.breakpoints.up('xs')]: {
      //   marginTop: -70,
      // },
      // [theme.breakpoints.down('sm')]: {
      //   marginTop: -30,
      // },
      // [theme.breakpoints.up('sm')]: {
      //   marginTop: -15,
      // },
      // [theme.breakpoints.up('md')]: {
      //   marginTop: -15,
      // },
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
    },
    title: {
      background: '#fddcdc',
    },
  }),
);

export default useStyles;
