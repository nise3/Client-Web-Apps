import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {CremaTheme} from '../../../../types/AppContextPropsType';
import clsx from 'clsx';
import {Chip} from '@material-ui/core';

const useStyles = makeStyles((theme: CremaTheme) => ({
  colorGray: {
    color: theme.palette.gray['600'],
  },
  chipStyle: {
    borderRadius: 4,
    background: '#e4e4e4',
    marginRight: 8,
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
