import React, {Fragment} from 'react';
import {Box, Grid} from '@mui/material';
import { Theme } from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    trendSearchKey: {
      background: '#fff',
      textAlign: 'center',
      border: '1px solid #fff',
      borderRadius: '6px',
      padding: '1px 0 1px 0',
    },
  }),
);

const SearchItemList = ({searchItems}: any) => {
  const classes = useStyles();
  const listItems = searchItems.map((item: any, index: number) => (
    <Fragment key={index.toString()}>
      <Grid item xs={6} md={4}>
        <Box className={classes.trendSearchKey}>
          <p>{item}</p>
        </Box>
      </Grid>
    </Fragment>
  ));

  return (
    <Grid item container spacing={2} xs={12} md={8}>
      {listItems}
    </Grid>
  );
};

const TrendSearchItemList = ({searchItems}: any) => {
  return <SearchItemList searchItems={searchItems} />;
};
export default TrendSearchItemList;
