import React from 'react';
import {CremaTheme} from '../../../types/AppContextPropsType';
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
  onclick?: () => void;
};
const CustomParabolaButton = ({
  buttonVariant,
  icon,
  title,
  onclick,
}: CustomParabolaButtonProps) => {
  const classes = useStyles();

  return (
    <Button
      variant={buttonVariant ? buttonVariant : 'contained'}
      startIcon={icon}
      className={classes.CustomParabolaButton}
      color={'primary'}
      onClick={onclick}>
      {title}
    </Button>
  );
};

export default CustomParabolaButton;
