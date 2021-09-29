import React from 'react';
import {
  Button,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {CremaTheme} from '../../types/AppContextPropsType';
import {ChevronRight} from '@material-ui/icons';
import RecentCourseComponent from './component/RecentCourseComponent';

const useStyle = makeStyles((theme: CremaTheme) => ({
  recentCourseSectionRoot: {
    background: '#fff',
    borderRadius: 4,
    marginTop: 0,
    paddingBottom: 10,
    paddingTop: 20,
  },
  featureSectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  courseItem: {
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
    paddingLeft: 20,
    marginBottom: 10,
  },
}));

const RecentCourseSection = () => {
  const classes = useStyle();
  const items = [
    {
      logoUrl: '/images/skill-matching-job1.jpg',
      courseTitle: 'Graphic Design Course',
      courseProvider: 'Creative IT Institute',
    },
    {
      logoUrl: '/images/skill-matching-job1.jpg',
      courseTitle: 'Learning Photography',
      courseProvider: 'Jesmin Rahman',
    },
    {
      logoUrl: '/images/skill-matching-job1.jpg',
      courseTitle: 'Javascript Course',
      courseProvider: 'Imtiaz Ahmed',
    },
  ];

  return (
    <>
      <Grid container className={classes.recentCourseSectionRoot}>
        <Grid item xs={12} sm={12} md={12}>
          <FormControl className={classes.selectControl}>
            <Select
              id='recentCourses'
              autoWidth
              value={1}
              variant='outlined'
              className={classes.selectStyle}>
              <MenuItem value={1}>Recent Courses</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {items.map((course: any, index: number) => {
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              key={index}
              className={classes.courseItem}>
              {index != 0 && <Divider className={classes.divider} />}
              <RecentCourseComponent data={course} />
            </Grid>
          );
        })}
        <Grid item xs={12} sm={12} md={12}>
          <Button
            variant={'text'}
            color={'primary'}
            size={'medium'}
            className={classes.seeMoreButton}>
            See More Courses
            <ChevronRight color={'primary'} />
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default RecentCourseSection;
