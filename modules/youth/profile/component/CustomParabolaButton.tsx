import React from 'react';
import { styled } from '@mui/material/styles';
import {CremaTheme} from '../../../../redux/types/AppContextPropsType';
import {createStyles, makeStyles} from '@mui/styles';
import {Button} from '@mui/material';

const PREFIX = 'CustomParabolaButton';

const classes = {
  CustomParabolaButton: `${PREFIX}-CustomParabolaButton`,
  shrinking: `${PREFIX}-shrinking`
};

const StyledButton = styled(Button)((
  {
    theme: CremaTheme
  }
) => ({
  [`&.${classes.CustomParabolaButton}`]: {
    borderRadius: 40,
  },

  [`& .${classes.shrinking}`]: {
    fontSize: 0,
    '&:first-line': {
      fontSize: '0.875rem',
    },
  }
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
      className={classes.CustomParabolaButton}
      color={'primary'}
      onClick={onClick}>
      <span className={classes.shrinking}>{title}</span>
    </StyledButton>
  );
};

export default CustomParabolaButton;
