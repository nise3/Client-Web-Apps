import React from 'react';
import {Box} from '@mui/material';
import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    trendSearchKey: {
      background: '#fff',
      textAlign: 'center',
      border: '1px solid #fff',
      borderRadius: '6px',
      padding: '1px 30px',
      marginRight: '10px',
    },
  }),
);

const SearchItemList = ({searchItems}: any) => {
  const classes = useStyles();
  const listItems = searchItems.map((item: any, index: number) => (
    <Box className={classes.trendSearchKey} key={index}>
      <p>{item}</p>
    </Box>
  ));

  return <Box display={'flex'}>{listItems}</Box>;
};

const TrendSearchItemList = ({searchItems}: any) => {
  return <SearchItemList searchItems={searchItems} />;
};

export default TrendSearchItemList;
