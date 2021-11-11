import React from 'react';
import { styled } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import Box from '@mui/material/Box';

const PREFIX = 'index';

const classes = {
  root: `${PREFIX}-root`
};

const StyledBox = styled(Box)((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    padding: '0 7px',
    fontSize: 11,
    fontWeight: 600,
    height: 20,
    minWidth: 20,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.secondary.contrastText,
  }
}));

interface BadgeProps {
  className?: string;
  count: any;
  color?: string;
}

const Badge: React.FC<BadgeProps> = ({
  className,
  count,
  color = 'secondary',
}) => {


  if (color === 'primary') {
    color = 'primary.main';
  } else if (color === 'secondary') {
    color = 'secondary.main';
  }
  return (
    <StyledBox bgcolor={color} className={clsx(classes.root, className)}>
      {count}
    </StyledBox>
  );
};

export default React.memo(Badge);
