import React, {FC} from 'react';
import {Box, makeStyles, Theme, Typography} from '@material-ui/core';

interface TileProps {
  amount: number | string;
  label: string;
  backgroundColor?: string;
}

const useStyles = makeStyles((theme: Theme): any => ({
  tile: {
    color: '#FFF',
    padding: '10px 0px',
    borderRadius: 4,
  },
}));

const Tile: FC<TileProps> = ({amount, label, backgroundColor}) => {
  const classes: any = useStyles();
  const colorCode = backgroundColor ? backgroundColor : '#0984e2';
  const background = `linear-gradient(45deg, ${colorCode}, ${colorCode}, ${colorCode})`;

  return (
    <Box
      className={classes.tile}
      style={{backgroundImage: background}}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}>
      <Typography variant={'h6'}>{amount}</Typography>
      <Typography variant={'caption'}>{label}</Typography>
    </Box>
  );
};

export default Tile;
