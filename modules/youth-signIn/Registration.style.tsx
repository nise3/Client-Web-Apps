import {createStyles, makeStyles} from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    PaperBox: {
      padding: 40,
      margin: '150px 350px 20px 350px',
    },
    toggle: {
      display: 'flex',
      alignItems: 'center',
    },
  }),
);

export default useStyles;
