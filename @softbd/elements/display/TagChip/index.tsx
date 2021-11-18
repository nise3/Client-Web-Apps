import React, {ReactNode} from 'react';
import {styled} from '@mui/material/styles';
import clsx from 'clsx';
import {Chip} from '@mui/material';

const PREFIX = 'TagChip';

const classes = {
  colorGray: `${PREFIX}-colorGray`,
  chipStyle: `${PREFIX}-chipStyle`,
};

const StyledChip = styled(Chip)(({theme}) => ({
  [`&.${classes.colorGray}`]: {
    color: theme.palette.grey['600'],
  },

  [`&.${classes.chipStyle}`]: {
    borderRadius: 4,
    background: '#e4e4e4',
    margin: '10px 10px 0px 0px',
  },
}));

interface TagChipProps {
  icon?: any;
  label?: string | ReactNode;
  className?: string;
}

const TagChip = ({icon, label, className}: TagChipProps) => {
  return (
    <StyledChip
      className={clsx(classes.chipStyle, classes.colorGray, className)}
      icon={icon}
      label={label}
    />
  );
};

export default TagChip;
