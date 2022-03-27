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
      fontSize: parseInt('' + theme.typography.button.fontSize) + 'rem',
    },
  },
}));

type CustomParabolaButtonProps = {
  icon?: any;
  title?: string;
  color?: string;
  buttonVariant?: 'text' | 'contained' | 'outlined';
  onClick?: () => void;
  disabled?: boolean;
};
const CustomParabolaButton = ({
  buttonVariant,
  icon,
  title,
  onClick,
  disabled = false,
}: CustomParabolaButtonProps) => {
  return (
    <StyledButton
      variant={buttonVariant ? buttonVariant : 'contained'}
      startIcon={icon}
      color={'primary'}
      onClick={onClick}
      disabled={disabled}>
      <span className={classes.shrinking}>{title}</span>
    </StyledButton>
  );
};

export default CustomParabolaButton;
