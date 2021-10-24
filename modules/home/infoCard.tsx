import React, {Fragment} from 'react';
import {Box, Grid} from '@mui/material';
import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '-18px',
      backgroundColor: '#fff',
      padding: '30px 5px 5px 5px',
      boxShadow: '1px 1px 10px #dfdfdf',
    },
    logo: {
      height: '20px',
      width: '20px',
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
    <Box className={classes.root}>
      <Grid container>
        {infos &&
          infos.map((infoItem, key: number) => {
            return (
              <Fragment key={infoItem.id.toString()}>
                <Grid item xs={10}>
                  <Grid item container>
                    <Grid item xs={2}>
                      <img className={classes.logo} src='/images/logo1.png' />
                    </Grid>
                    <Grid item xs={10}>
                      <Box> {infoItem.name}</Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={2} xs={2}>
                  <Box sx={{color: color}}>{infoItem.count}</Box>
                </Grid>
              </Fragment>
            );
          })}
      </Grid>
    </Box>
  );
};
export default InfoCard;
