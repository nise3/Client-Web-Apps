import React from 'react';
import {Button, Grid, Typography} from '@mui/material';
import {ChevronRight} from '@mui/icons-material';
import useStyle from './index.style';
import JobComponent from './components/JobComponent';
import {useIntl} from 'react-intl';

const CourseDetailsSkillMatchingJobSection = () => {
  const classes = useStyle();
  const {messages} = useIntl();

  const jobList: any = [
    {
      id: 1,
      title: 'Software Engineer',
      providerImage: '/images/skill-matching-job1.jpg',
      providerName: 'Evaly',
      location: 'Tejgaon, Dhaka',
      experience: '2-3',
    },
    {
      id: 2,
      title: 'Data Analyst',
      providerImage: '/images/skill-matching-job2.jpg',
      providerName: 'Teletalk',
      location: 'Tejgaon, Dhaka',
      experience: '2-3',
    },
    {
      id: 3,
      title: 'Software Engineer',
      providerImage: '/images/skill-matching-job1.jpg',
      providerName: 'Evaly',
      location: 'Tejgaon, Dhaka',
      experience: '2-3',
    },
    {
      id: 4,
      title: 'Data Analyst',
      providerImage: '/images/skill-matching-job2.jpg',
      providerName: 'Teletalk',
      location: 'Tejgaon, Dhaka',
      experience: '2-3',
    },
  ];

  return (
    <Grid container spacing={5} mt={'10px'}>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container alignItems={'center'}>
          <Grid item xs={8} sm={9} md={10}>
            <Typography variant={'h5'} className={classes.sectionTitle}>
              {messages['common.skill_matching_job']}
            </Typography>
          </Grid>
          <Grid item xs={4} sm={3} md={2} style={{textAlign: 'right'}}>
            <Button variant={'outlined'} size={'medium'} color={'primary'}>
              {messages['common.see_all']}
              <ChevronRight />
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container spacing={5}>
          {jobList.map((job: any) => {
            return (
              <Grid item xs={12} sm={4} md={3} key={job.id}>
                <JobComponent job={job} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CourseDetailsSkillMatchingJobSection;
