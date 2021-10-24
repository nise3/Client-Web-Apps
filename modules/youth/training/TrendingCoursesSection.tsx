import React, {useEffect, useState} from 'react';
import {Button, Grid, Typography} from '@mui/material';
import {ChevronRight} from '@mui/icons-material';
import useStyles from './index.style';
import CourseCardComponent from '../../../@softbd/elements/CourseCardComponent';
import {useIntl} from 'react-intl';
import {useFetchCourseList} from '../../../services/youthManagement/hooks';
import Link from 'next/link';
import {LINK_FRONTEND_YOUTH_TRENDING_COURSELIST} from '../../../@softbd/common/appLinks';
import {objectFilter} from '../../../@softbd/utilities/helpers';

interface TrendingCoursesSectionProps {
  filters?: any;
  page_size?: number;
}

const TrendingCoursesSection = ({
  filters,
  page_size,
}: TrendingCoursesSectionProps) => {
  const classes = useStyles();
  const {messages} = useIntl();

  const [courseFilters, setCourseFilters] = useState({
    page_size: page_size ? page_size : null,
  });

  const pathVariable = 'trending';
  const {data: courseList} = useFetchCourseList(pathVariable, courseFilters);

  useEffect(() => {
    setCourseFilters(objectFilter({...courseFilters, ...filters}));
  }, [filters]);

  return courseList && courseList.length ? (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container alignItems={'center'}>
          <Grid item xs={8} sm={9} md={10}>
            <Typography variant={'h5'} className={classes.sectionTitle}>
              {messages['common.trending_courses']}
            </Typography>
          </Grid>
          {page_size && (
            <Grid item xs={4} sm={3} md={2} style={{textAlign: 'right'}}>
              <Link href={LINK_FRONTEND_YOUTH_TRENDING_COURSELIST} passHref>
                <Button variant={'outlined'} size={'medium'} color={'primary'}>
                  {messages['common.see_all']}
                  <ChevronRight />
                </Button>
              </Link>
            </Grid>
          )}
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

export default TrendingCoursesSection;
