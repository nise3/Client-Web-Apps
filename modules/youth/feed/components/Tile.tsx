import React, {FC} from 'react';
import { styled } from '@mui/material/styles';
import {Box, Typography} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {CremaTheme} from '../../../../redux/types/AppContextPropsType';

const PREFIX = 'Tile';

const classes = {
  tile: `${PREFIX}-tile`
};

const StyledBox = styled(Box)((
  {
    theme: CremaTheme
  }
): any => ({
  [`&.${classes.tile}`]: {
    color: '#FFF',
    padding: '10px 0px',
    borderRadius: 4,
  }
}));

interface TileProps {
  amount: number | string;
  label: string;
  backgroundColor?: string;
}

const Tile: FC<TileProps> = ({amount, label, backgroundColor}) => {

  const colorCode = backgroundColor ? backgroundColor : '#0984e2';
  const background = `linear-gradient(45deg, ${colorCode}, ${colorCode}, ${colorCode})`;

  return (
    <StyledBox
      className={classes.tile}
      style={{backgroundImage: background}}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}>
      <Typography variant={'h6'}>{amount}</Typography>
      <Typography variant={'caption'}>{label}</Typography>
    </StyledBox>
  );
};

export default Tile;
