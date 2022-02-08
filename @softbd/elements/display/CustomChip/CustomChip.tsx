import React from 'react';
import {Chip} from '@mui/material';

type Props = {
  color: 'primary' | 'secondary' | 'default' | 'error' | undefined;
  label: any;
  icon?: any;
  variant?: 'filled' | 'outlined';
};

const CustomChip = ({
  color = 'default',
  label,
  icon,
  variant = 'outlined',
}: Props) => {
  return (
    <Chip
      icon={icon}
      size='small'
      color={color}
      label={label}
      variant={variant}
      sx={{padding: '15px'}}
    />
  );
};

export default React.memo(CustomChip);
