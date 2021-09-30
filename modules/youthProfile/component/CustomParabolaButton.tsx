import {Button} from '@material-ui/core';
import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {CremaTheme} from '../../../types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) =>
  createStyles({
    CustomParabolaButton: {
      border: '1px solid green',
      borderRadius: '40px',
    },
  }),
);

type CustomParabolaButtonProps = {
  icon?: any;
  title: string;
  color?: string;
  buttonVariant?: 'text' | 'contained' | 'outlined';
};
const CustomParabolaButton = ({
  buttonVariant,
  icon,
  title,
}: CustomParabolaButtonProps) => {
  const classes = useStyles();

  return (
    <Button
      variant={buttonVariant ? buttonVariant : 'contained'}
      startIcon={icon}
      className={classes.CustomParabolaButton}
      color={'primary'}>
      {title}
    </Button>
  );
};

export default CustomParabolaButton;
