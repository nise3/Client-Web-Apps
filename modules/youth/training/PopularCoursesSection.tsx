import React, {useEffect, useState} from 'react';
import {Button, Grid, Typography} from '@mui/material';
import {ChevronRight} from '@mui/icons-material';
import useStyles from './index.style';
import CourseCardComponent from '../../../@softbd/elements/CourseCardComponent';
import {useIntl} from 'react-intl';
import {useFetchCourseList} from '../../../services/youthManagement/hooks';
import Link from 'next/link';

interface PopularCoursesSectionProps {
  filters?: any;
}
const PopularCoursesSection = ({filters}: PopularCoursesSectionProps) => {
  const classes = useStyles();
  const {messages} = useIntl();

  const [courseFilters, setCourseFilters] = useState<any>({page_size: 4});

  useEffect(() => {
    setCourseFilters({...filters, ...courseFilters});
  }, [filters]);

  const pathVariable = '/popular';
  const {data: courseList} = useFetchCourseList(pathVariable, courseFilters);
  const URL = '/../../youth/course-list' + pathVariable;

  return courseList && courseList.length ? (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container alignItems={'center'}>
          <Grid item xs={8} sm={9} md={10}>
            <Typography variant={'h5'} className={classes.sectionTitle}>
              {messages['common.popular_courses']}
            </Typography>
          </Grid>
          <Grid item xs={4} sm={3} md={2} style={{textAlign: 'right'}}>
            <Link href={URL} passHref>
              <Button variant={'outlined'} size={'medium'} color={'primary'}>
                {messages['common.see_all']}
                <ChevronRight />
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container spacing={5}>
          {courseList &&
            courseList.map((course: any) => {
              return (
                <Grid item xs={12} sm={6} md={3} key={course.id}>
                  <CourseCardComponent course={course} />
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <></>
  );
};

export default PopularCoursesSection;
