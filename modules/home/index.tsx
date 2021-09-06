import React from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import Header from './Header';
import CoverArea from './CoverArea';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

const Home: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Header />
          <CoverArea />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
