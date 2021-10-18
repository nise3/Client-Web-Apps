import React, {useCallback, useState} from 'react';
import {Button, Card, Divider, Grid, MenuItem, Select} from '@mui/material';
import {makeStyles} from '@mui/styles';
import RecentJobComponent from './components/RecentJobComponet';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';
import {ChevronRight} from '@mui/icons-material';
import clsx from 'clsx';
import {useIntl} from 'react-intl';

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
  const {messages} = useIntl();
  const [selectedValue, setSelectedValue] = useState(1);

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

  const onSelectChange = useCallback((value: any) => {
    setSelectedValue(value);
  }, []);

  return (
    <Card>
      <Grid container className={classes.recentSectionRoot}>
        <Grid item xs={12} sm={12} md={12}>
          <Select
            id='recentJobs'
            autoWidth
            defaultValue={selectedValue}
            variant='outlined'
            className={clsx(classes.selectStyle, classes.selectControl)}
            onChange={onSelectChange}>
            <MenuItem value={1}>Recent Jobs</MenuItem>
            <MenuItem value={2}>Popular Jobs</MenuItem>
            <MenuItem value={3}>Nearby Jobs</MenuItem>
            <MenuItem value={4}>Skill Matching Jobs</MenuItem>
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
            {messages['youth_feed.see_more_jobs']}
            <ChevronRight color={'primary'} />
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default RecentJobSection;
