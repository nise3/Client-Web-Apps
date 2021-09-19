import React from 'react';
import {Container, Grid} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '12px',
    },
    infoItem: {
      backgroundColor: '#eee',
    },
  }),
);

type Props = {
  color?: string;
  infos?: Array<string>;
};
const InfoCard = ({color, infos}: Props) => {
  const classes = useStyles();

  return (
    <Grid container xl={12} className={classes.root}>
      <Container maxWidth='md' disableGutters>
        <Grid container xs={10} spacing={6} className={classes.infoItem}>
          <Grid item xs={8}>
            softbd ltd
          </Grid>
          <Grid item xs={4}>
            45
          </Grid>
          <Grid item xs={8}>
            softbd ltd
          </Grid>
          <Grid item xs={4}>
            45
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};
export default InfoCard;
