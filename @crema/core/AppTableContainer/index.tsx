import React from 'react';
import {styled} from '@mui/material/styles';
import {Box} from '@mui/material';
import {grey} from '@mui/material/colors';

const StyledBox = styled(Box)(({theme}) => ({
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
}));

const AppTableContainer = (props: any) => {
  return <StyledBox>{props.children}</StyledBox>;
};

export default AppTableContainer;
