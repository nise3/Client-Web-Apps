import React, {useEffect, useState} from 'react';
import {Button, Grid, Typography} from '@mui/material';
import {ChevronRight} from '@mui/icons-material';
import CourseCardComponent from '../../../@softbd/elements/CourseCardComponent';
import {useIntl} from 'react-intl';
import {useFetchCourseList} from '../../../services/youthManagement/hooks';
import {getModulePath, objectFilter} from '../../../@softbd/utilities/helpers';
import {Link} from '../../../@softbd/elements/common';
import {useRouter} from 'next/router';

interface TrendingCoursesSectionProps {
  filters?: any;
  page_size?: number;
}

const TrendingCoursesSection = ({
  filters,
  page_size,
}: TrendingCoursesSectionProps) => {
  const {messages} = useIntl();
  const router = useRouter();
  const path = router.pathname;

  const [courseFilters, setCourseFilters] = useState({
    page_size: page_size ?? null,
  });

  const pathValue = 'trending';
  const {data: courseList, metaData: courseListMetaData} = useFetchCourseList(
    pathValue,
    courseFilters,
  );

  useEffect(() => {
    setCourseFilters(objectFilter({...courseFilters, ...filters}));
  }, [filters]);

  return courseList && courseList.length ? (
    <Grid container spacing={3} mb={8}>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container alignItems={'center'}>
          <Grid item xs={6} sm={9} md={10}>
            <Typography variant={'h5'} fontWeight={'bold'}>
              {messages['common.trending_courses']}
            </Typography>
          </Grid>
          {page_size && courseListMetaData?.total_page > 1 && (
            <Grid item xs={6} sm={3} md={2} style={{textAlign: 'right'}}>
              <Link href={`${path}/${pathValue}`}>
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
        <Grid container spacing={3}>
          {courseList &&
            courseList.map((course: any) => {
              return (
                <Grid item xs={12} sm={6} md={3} key={course.id}>
                  <Link
                    href={
                      getModulePath(router.asPath) +
                      `/course-details/${course.id}`
                    }>
                    <CourseCardComponent course={course} />
                  </Link>
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
