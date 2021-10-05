import React from 'react';
import {Card, CardContent, Grid, Link} from '@mui/material';
import HorizontalLine from './HorizontalLine';

const YouthProfileNavigationSidebar = () => {
  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            Personal Information
          </Grid>
        </Grid>
        <HorizontalLine />
        <Grid container>
          <Grid item xs={12}>
            Education
          </Grid>
        </Grid>
        <HorizontalLine />
        <Grid container>
          <Grid item xs={12}>
            Skills
          </Grid>
        </Grid>
        <HorizontalLine />
        <Grid container>
          <Grid item xs={12}>
            <Link href={'#'}>Job Experience</Link>
          </Grid>
        </Grid>
        <HorizontalLine />
        <Grid container>
          <Grid item xs={12}>
            Portfolio
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default YouthProfileNavigationSidebar;
