import React, {FC} from 'react';
import {styled} from '@mui/material/styles';
import {Box, Typography} from '@mui/material';

const StyledBox = styled(Box)(({theme}): any => ({
  color: '#FFF',
  padding: '10px 0px',
  borderRadius: 4,
}));

interface TileProps {
  amount: number | string;
  label: string;
  backgroundColor?: string;
  color?: string;
}

const Tile: FC<TileProps> = ({amount, label, backgroundColor, color}) => {
  const colorCode = backgroundColor ? backgroundColor : '#0984e2';
  const background = `linear-gradient(45deg, ${colorCode}, ${colorCode}, ${colorCode})`;
  const fontColor = color ? color : '#FFFFFF';

  return (
    <StyledBox
      style={{backgroundImage: background}}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}>
      <Typography variant={'h6'} color={fontColor}>
        {amount}
      </Typography>
      <Typography variant={'caption'} color={fontColor}>
        {label}
      </Typography>
    </StyledBox>
  );
};

export default Tile;
