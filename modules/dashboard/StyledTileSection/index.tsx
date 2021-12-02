import StyledTile from '../../../@softbd/Tile/StyledTile';
import {Box, Grid} from '@mui/material';
import React from 'react';
import clsx from 'clsx';
import {styled} from '@mui/material/styles';

const PREFIX = 'Dashboard';

const classes = {
  card: `${PREFIX}-card`,
  cardColors: `${PREFIX}-cardColors`,
  cardColor1: `${PREFIX}-cardColor1`,
  cardColor2: `${PREFIX}-cardColor2`,
  cardColor3: `${PREFIX}-cardColor3`,
  cardColor4: `${PREFIX}-cardColor4`,
  cardColor5: `${PREFIX}-cardColor5`,
  cardColor6: `${PREFIX}-cardColor6`,
  cardColor7: `${PREFIX}-cardColor7`,
};
const StyledBox = styled(Box)(({theme}) => ({
  [`& .${classes.cardColors}`]: {
    position: 'relative',
    '&::before, &::after': {
      content: "''",
      display: 'block',
      position: 'absolute',
      background: '#fff2',
      borderRadius: 50,
      width: 90,
      height: 90,
      left: -20,
      bottom: -30,
    },
    '&::after': {
      left: -20,
      bottom: -60,
    },
  },

  [`& .${classes.cardColor1}`]: {
    background: '#661687',
    textAlign: 'center',
    padding: theme.spacing(1),
    color: '#fff',
  },

  [`& .${classes.cardColor2}`]: {
    background: '#0069BC',
    textAlign: 'center',
    padding: theme.spacing(1),
    color: '#fff',
  },

  [`& .${classes.cardColor3}`]: {
    background: '#305DF7',
    textAlign: 'center',
    padding: theme.spacing(1),
    color: '#fff',
  },

  [`& .${classes.cardColor4}`]: {
    background: '#FD8A4B',
    textAlign: 'center',
    padding: theme.spacing(1),
    color: '#fff',
  },

  [`& .${classes.cardColor5}`]: {
    background: '#14017F',
    textAlign: 'center',
    padding: theme.spacing(1),
    color: '#fff',
  },

  [`& .${classes.cardColor6}`]: {
    background: '#D169E4',
    textAlign: 'center',
    padding: theme.spacing(1),
    color: '#fff',
  },

  [`& .${classes.cardColor7}`]: {
    background: '#22BB33',
    textAlign: 'center',
    padding: theme.spacing(1),
    color: '#fff',
  }
}));
const StyledTileSection = () => {
  return (

    <StyledBox>
      <Grid container className={classes.card} spacing={2}>
      <Grid item md={3} sm={3}>
        <StyledTile className={clsx(classes.cardColors, classes.cardColor1)}
                    headerNumber={2415} message={'Total Course'}/>
      </Grid>
      <Grid item md={3} sm={3}>
        <StyledTile className={clsx(classes.cardColors, classes.cardColor2)}
                    headerNumber={652} message={'Total Enrole'}/>
      </Grid>
      <Grid item md={3} sm={3}>
        <StyledTile className={clsx(classes.cardColors, classes.cardColor3)}
                    headerNumber={20} message={'Certificate Issue'}/>
      </Grid>
      <Grid item md={3} sm={3}>
        <StyledTile className={clsx(classes.cardColors, classes.cardColor4)}
                    headerNumber={26} message={'Trending Course'}/>
      </Grid>
      <Grid item md={3} sm={3}>
        <StyledTile className={clsx(classes.cardColors, classes.cardColor5)}
                    headerNumber={320} message={'Demand From Industry'}/>
      </Grid>
      <Grid item md={3} sm={3}>
        <StyledTile className={clsx(classes.cardColors, classes.cardColor6)}
                    headerNumber={320} message={'Number of barch'}/>
      </Grid>
      <Grid item md={3} sm={3}>
        <StyledTile className={clsx(classes.cardColors, classes.cardColor7)}
                    headerNumber={320} message={'Running Student'}/>
      </Grid>
      <Grid item md={3} sm={3}>
        <StyledTile className={clsx(classes.cardColors, classes.cardColor1)}
                    headerNumber={320} message={'Number of Trainer'}/>
      </Grid>
    </Grid>
    </StyledBox>
  );
}

export default StyledTileSection;

