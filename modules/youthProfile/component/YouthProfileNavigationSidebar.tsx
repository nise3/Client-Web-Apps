import React from 'react';
import {Card, CardContent, Grid} from '@mui/material';
import HorizontalLine from './HorizontalLine';
import Link from 'next/link';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => {
  return {
    link: {
      color: theme.palette.primary.dark,
      textDecoration: 'none',
    },
  };
});

const YouthProfileNavigationSidebar = () => {
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Link href={'../../youth-profile-edit/job-experience/null'}>
              <a className={classes.link}>Personal Information</a>
            </Link>
          </Grid>
        </Grid>
        <HorizontalLine />
        <Grid container>
          <Grid item xs={12}>
            <Link href={'../../youth-profile-edit/education/null'}>
              <a className={classes.link}>Education</a>
            </Link>
          </Grid>
        </Grid>
        <HorizontalLine />
        <Grid container>
          <Grid item xs={12}>
            <Link href={'../../youth-profile-edit/reference/null'}>
              <a className={classes.link}>Reference</a>
            </Link>
          </Grid>
        </Grid>
        <HorizontalLine />
        <Grid container>
          <Grid item xs={12}>
            <Link href={'../../youth-profile-edit/job-experience/null'}>
              <a className={classes.link}>Job Experience</a>
            </Link>
          </Grid>
        </Grid>
        <HorizontalLine />
        <Grid container>
          <Grid item xs={12}>
            <Link href={'../../youth-profile-edit/language'}>
              <a className={classes.link}>Language</a>
            </Link>
          </Grid>
        </Grid>
        <HorizontalLine />
        <Grid container>
          <Grid item xs={12}>
            <Link href={'../../youth-profile-edit/view-language-proficiency'}>
              <a className={classes.link}>Language Proficiency View</a>
            </Link>
          </Grid>
        </Grid>
        <HorizontalLine />
        <Grid container>
          <Grid item xs={12}>
            <Link href={'../../youth-profile-edit/portfolio/null'}>
              <a className={classes.link}>Portfolio</a>
            </Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default YouthProfileNavigationSidebar;
