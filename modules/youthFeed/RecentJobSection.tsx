import React from 'react';
import {Button, Card, Divider, Grid, MenuItem, Select} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import RecentJobComponent from './component/RecentJobComponet';
import {CremaTheme} from '../../types/AppContextPropsType';
import {ChevronRight} from '@material-ui/icons';
import clsx from 'clsx';

const useStyle = makeStyles((theme: CremaTheme) => ({
  recentSectionRoot: {
    marginTop: 0,
    paddingBottom: 10,
    paddingTop: 20,
  },
  featureSectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  jobItem: {
    marginBottom: 10,
  },
  divider: {
    width: '100%',
    height: 1,
    marginBottom: 5,
  },
  selectStyle: {
    '& .MuiSelect-select': {
      padding: '10px 30px 10px 15px',
    },
  },
  seeMoreButton: {
    boxShadow: 'none',
    marginTop: 10,
  },
  selectControl: {
    marginLeft: 20,
    marginBottom: 10,
  },
}));

const RecentJobSection = () => {
  const classes = useStyle();
  const items = [
    {
      imageUrl: '/images/skill-matching-job1.jpg',
      jobTitle: 'Sales Executive',
      jobProviderName: 'Ajker Deal',
      location: 'Dhaka, Bangladesh',
    },
    {
      imageUrl: '/images/skill-matching-job1.jpg',
      jobTitle: 'Senior UX Designer',
      jobProviderName: 'Pathao',
      location: 'Dhaka, Bangladesh',
    },
    {
      imageUrl: '/images/skill-matching-job1.jpg',
      jobTitle: 'Data Engineer',
      jobProviderName: 'Evaly',
      location: 'Dhaka, Bangladesh',
    },
  ];

  return (
    <Card>
      <Grid container className={classes.recentSectionRoot}>
        <Grid item xs={12} sm={12} md={12}>
          <Select
            id='recentJobs'
            autoWidth
            value={1}
            variant='outlined'
            className={clsx(classes.selectStyle, classes.selectControl)}>
            <MenuItem value={1}>Recent Jobs</MenuItem>
          </Select>
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
              {index != 0 && <Divider className={classes.divider} />}
              <RecentJobComponent data={job} />
            </Grid>
          );
        })}
        <Grid item xs={12} sm={12} md={12} style={{paddingLeft: 15}}>
          <Button
            variant={'text'}
            color={'primary'}
            size={'medium'}
            className={classes.seeMoreButton}>
            See More jobs
            <ChevronRight color={'primary'} />
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default RecentJobSection;
