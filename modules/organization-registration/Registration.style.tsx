import {makeStyles} from '@material-ui/core';
import {createStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    PaperBox: {
      padding: 20,
      margin: '20px 200px 20px 200px',
    },
  }),
);

export default useStyles;
