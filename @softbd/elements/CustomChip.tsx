import React from 'react';
import {Chip} from '@material-ui/core';

type Props = {
  color: 'primary' | 'secondary' | 'default' | undefined;
  label: any;
  icon?: any;
};

const CustomChip = ({color, label, icon}: Props) => {
  return (
    <Chip
      icon={icon}
      variant='outlined'
      size='small'
      color={color}
      label={label}
    />
  );
};

export default CustomChip;
