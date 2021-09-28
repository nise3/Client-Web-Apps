import React from 'react';
import {FormControl, Grid, MenuItem, Select} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {Theme} from '@material-ui/core/styles';
import RecentJobComponent from './component/RecentJobComponet';

const useStyle = makeStyles((theme: Theme) => ({
  nearbySectionRoot: {
    marginTop: 15,
  },
  featureSectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  jobItem: {
    marginBottom: 10,
  },
}));

const RecentJobSection = () => {
  const classes = useStyle();
  const items = [
    {
      imageUrl: '/images/skill-matching-job1.jpg',
      jobTitle: 'Article Writer',
      jobProviderName: 'Ispahani',
    },
    {
      imageUrl: '/images/skill-matching-job1.jpg',
      jobTitle: 'Sales Executive',
      jobProviderName: 'Ajker Deal',
    },
    {
      imageUrl: '/images/skill-matching-job1.jpg',
      jobTitle: 'Senior UX Designer',
      jobProviderName: 'Pathao',
    },
    {
      imageUrl: '/images/skill-matching-job1.jpg',
      jobTitle: 'Data Engineer',
      jobProviderName: 'Evaly',
    },
  ];

  return (
    <>
      <Grid container spacing={3} className={classes.nearbySectionRoot}>
        <Grid item xs={12} sm={12} md={12}>
          <FormControl>
            <Select id='recentJobs' autoWidth value={1} variant='outlined'>
              <MenuItem value={1}>Recent Jobs</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {items.map((job: any, index: number) => {
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              key={index}
              className={classes.jobItem}>
              <RecentJobComponent data={job} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default RecentJobSection;
