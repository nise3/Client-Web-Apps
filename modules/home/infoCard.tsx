import React from 'react';
import {Box, Container, Grid} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      marginTop: '-18px',
      zIndex: 0,
      width: '225px',
      height: '100px',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    infoItem: {
      backgroundColor: '#fff',
    },
    logo: {
      height: '5vh',
      width: '2vw',
    },
  }),
);

type Props = {
  color?: string;
  infos?: Array<any>;
};
const InfoCard = ({color, infos}: Props) => {
  const classes = useStyles();

  return (
    <Grid container xl={12} xs={12} className={classes.root}>
      <Container maxWidth='md' disableGutters>
        <Grid container md={12} xs={12} className={classes.infoItem}>
          {infos &&
            infos.map((infoItem) => {
              return (
                <>
                  <Grid item md={10} xs={10}>
                    <img className={classes.logo} src='/images/logo1.png' />
                    {infoItem.name}
                  </Grid>
                  <Grid item md={2} xs={2}>
                    <Box sx={{color: color}}>{infoItem.count}</Box>
                  </Grid>
                </>
              );
            })}
        </Grid>
      </Container>
    </Grid>
  );
};
export default InfoCard;
