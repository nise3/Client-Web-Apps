import React from 'react';
import {styled} from '@mui/material/styles';
import {Button} from '@mui/material';

const PREFIX = 'CustomParabolaButton';

const classes = {
  shrinking: `${PREFIX}-shrinking`,
};

const StyledButton = styled(Button)(({theme}) => ({
  borderRadius: 40,
  padding: '5px 20px',

  [`& .${classes.shrinking}`]: {
    fontSize: 0,
    '&:first-line': {
      fontSize: theme.typography.button,
    },
  },
}));

type CustomParabolaButtonProps = {
  icon?: any;
  title: string;
  color?: string;
  buttonVariant?: 'text' | 'contained' | 'outlined';
  onClick?: () => void;
};
const CustomParabolaButton = ({
  buttonVariant,
  icon,
  title,
  onClick,
}: CustomParabolaButtonProps) => {
  return (
    <StyledButton
      variant={buttonVariant ? buttonVariant : 'contained'}
      startIcon={icon}
      color={'primary'}
      onClick={onClick}>
      <span className={classes.shrinking}>{title}</span>
    </StyledButton>
  );
};

export default CustomParabolaButton;
