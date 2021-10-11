import React from 'react';
import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../../types/AppContextPropsType';
import clsx from 'clsx';
import {Chip} from '@mui/material';

const useStyles = makeStyles((theme: CremaTheme) => ({
  colorGray: {
    color: theme.palette.grey['600'],
  },
  chipStyle: {
    borderRadius: 4,
    background: '#e4e4e4',
    margin: '0px 10px 10px 0px',
  },
}));

interface TagChipProps {
  icon?: any;
  label: string;
}

const TagChip = ({icon, label}: TagChipProps) => {
  const classes = useStyles();

  return (
    <Chip
      className={clsx(classes.chipStyle, classes.colorGray)}
      icon={icon}
      label={label}
    />
  );
};

export default TagChip;
