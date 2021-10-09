import {createStyles, makeStyles} from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: 'calc(100vh - 70px)',
      display: 'flex',
    },
    PaperBox: {
      padding: 20,
      margin: 'auto',
    },
  }),
);

export default useStyles;
