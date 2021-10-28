import React from 'react';
import {CremaTheme} from '../../../../redux/types/AppContextPropsType';
import {createStyles, makeStyles} from '@mui/styles';
import {Button} from '@mui/material';

const useStyles = makeStyles((theme: CremaTheme) =>
  createStyles({
    CustomParabolaButton: {
      borderRadius: 40,
    },
    shrinking: {
      fontSize: 0,
      '&:first-line': {
        fontSize: '0.875rem',
      },
    },
  }),
);

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
  const classes = useStyles();

  return (
    <Button
      variant={buttonVariant ? buttonVariant : 'contained'}
      startIcon={icon}
      className={classes.CustomParabolaButton}
      color={'primary'}
      onClick={onClick}>
      <span className={classes.shrinking}>{title}</span>
    </Button>
  );
};

export default CustomParabolaButton;
