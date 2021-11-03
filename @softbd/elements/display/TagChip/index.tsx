import React, {ReactNode} from 'react';
import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../../redux/types/AppContextPropsType';
import clsx from 'clsx';
import {Chip} from '@mui/material';

const useStyles = makeStyles((theme: CremaTheme) => ({
  colorGray: {
    color: theme.palette.grey['600'],
  },
  chipStyle: {
    borderRadius: 4,
    background: '#e4e4e4',
    margin: '10px 10px 0px 0px',
  },
}));

interface TagChipProps {
  icon?: any;
  label: string | ReactNode;
  className?: string;
}

const TagChip = ({icon, label, className}: TagChipProps) => {
  const classes = useStyles();

  return (
    <Chip
      className={clsx(classes.chipStyle, classes.colorGray, className)}
      icon={icon}
      label={label}
    />
  );
};

export default TagChip;
