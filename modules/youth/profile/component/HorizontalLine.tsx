import React from 'react';
import {CremaTheme} from '../../../../types/AppContextPropsType';
import {createStyles, makeStyles} from '@mui/styles';
import {Divider} from '@mui/material';

const useStyles = makeStyles((theme: CremaTheme) =>
  createStyles({
    horizontalLine: {
      height: '2px',
      width: '120%',
      marginLeft: '-20px',
      marginTop: '17px',
      marginBottom: '6px',
    },
  }),
);

const HorizontalLine = () => {
  const classes = useStyles();
  return (
    <Divider
      variant={'fullWidth'}
      light={true}
      className={classes.horizontalLine}
    />
  );
};

export default HorizontalLine;
