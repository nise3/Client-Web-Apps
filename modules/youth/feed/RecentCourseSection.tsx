import React, {useCallback, useState} from 'react';
import {Button, Card, Divider, Grid, MenuItem, Select} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../types/AppContextPropsType';
import {ChevronRight} from '@mui/icons-material';
import RecentCourseComponent from './components/RecentCourseComponent';
import clsx from 'clsx';
import {useIntl} from 'react-intl';
import Link from 'next/link';
const useStyle = makeStyles((theme: CremaTheme) => ({
  recentCourseSectionRoot: {
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
    marginLeft: 20,
    marginBottom: 10,
  },
}));

const RecentCourseSection = () => {
  const classes = useStyle();
  const {messages} = useIntl();
  const [selectedValue, setSelectedValue] = useState('recent');
  const URL = `/youth/course-list/${selectedValue}`;
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

  const onSelectChange = useCallback((event: any) => {
    setSelectedValue(event.target.value);
  }, []);

  return (
    <Card>
      <Grid container className={classes.recentCourseSectionRoot}>
        <Grid item xs={12} sm={12} md={12}>
          <Select
            id='recentCourses'
            autoWidth
            defaultValue={selectedValue}
            variant='outlined'
            className={clsx(classes.selectStyle, classes.selectControl)}
            onChange={onSelectChange}>
            <MenuItem value={'recent'}>Recent Courses</MenuItem>
            <MenuItem value={'popular'}>Popular Courses</MenuItem>
            <MenuItem value={'nearby'}>Nearby Courses</MenuItem>
          </Select>
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
        <Grid item xs={12} sm={12} md={12} style={{paddingLeft: 15}}>
          <Link href={URL} passHref>
            <Button
              variant={'text'}
              color={'primary'}
              size={'medium'}
              className={classes.seeMoreButton}>
              {messages['youth_feed.see_more_courses']}
              <ChevronRight color={'primary'} />
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Card>
  );
};

export default RecentCourseSection;
