import React from 'react';
import {CremaTheme} from '../../../../types/AppContextPropsType';
import {createStyles, makeStyles} from '@mui/styles';
import {Button} from '@mui/material';

const useStyles = makeStyles((theme: CremaTheme) =>
  createStyles({
    CustomParabolaButton: {
      borderRadius: 40,
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
      {title}
    </Button>
  );
};

export default CustomParabolaButton;
