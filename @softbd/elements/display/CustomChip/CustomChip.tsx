import React from 'react';
import { Chip } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => {
  return {
    chipWrapper: {
      padding: '15px',
    },
  };
});

type Props = {
  color: 'primary' | 'secondary' | 'default' | undefined;
  label: any;
  icon?: any;
  variant?: 'default' | 'outlined';
};

const CustomChip = ({color, label, icon, variant = 'outlined'}: Props) => {
  const classes = useStyles();
  return (
    <Chip
      icon={icon}
      size='small'
      color={color}
      label={label}
      variant={variant}
      className={classes.chipWrapper}
    />
  );
};

export default React.memo(CustomChip);
