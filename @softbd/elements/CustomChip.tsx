import React from 'react';
import {Chip, makeStyles} from '@material-ui/core';

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
};

const CustomChip = ({color, label, icon}: Props) => {
  const classes = useStyles();
  return (
    <Chip
      icon={icon}
      size='small'
      color={color}
      label={label}
      className={classes.chipWrapper}
    />
  );
};

export default CustomChip;
