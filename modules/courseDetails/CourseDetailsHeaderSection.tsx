import React from 'react';
import useStyle from './index.style';
import {Box, Container, Grid} from '@mui/material';

const CourseDetailsHeaderSection = () => {
  const classes: any = useStyle();

  return (
    <Box className={classes.headerRoot}>
      <Container>
        <Grid container>
          <Grid item xs={12} sm={6} md={6}>
            Course Fee
          </Grid>
          <Grid item xs={12} sm={6} md={6}></Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CourseDetailsHeaderSection;
