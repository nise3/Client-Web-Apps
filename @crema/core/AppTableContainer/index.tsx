import React from 'react';
import {Box} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {grey} from '@mui/material/colors';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => ({
  tableResponsiveMaterial: {
    minHeight: '.01%',
    overflowX: 'auto',
    '& > thead > tr > th, > tbody > tr > th, > tfoot > tr > th, thead > tr > td, tbody > tr > td, tfoot > tr > td':
      {
        whiteSpace: 'nowrap',
      },
    '@media (max-width: 767px)': {
      width: '100%',
      marginBottom: 15,
      overflowY: 'hidden',
      border: `1px solid ${grey[300]}`,
      '& > table': {
        marginBottom: 0,
      },
    },
  },
}));

const AppTableContainer = (props: any) => {
  const classes = useStyles();

  return (
    <Box className={classes.tableResponsiveMaterial}>{props.children}</Box>
  );
};

export default AppTableContainer;
