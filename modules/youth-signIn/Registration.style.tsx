import {makeStyles} from '@material-ui/core';
import {createStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
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
