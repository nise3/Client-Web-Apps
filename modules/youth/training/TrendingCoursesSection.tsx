import React, {useEffect, useState} from 'react';
import {Button, Grid, Typography} from '@mui/material';
import {ChevronRight} from '@mui/icons-material';
import CourseCardComponent from '../../../@softbd/elements/CourseCardComponent';
import {useIntl} from 'react-intl';
import {useFetchCourseList} from '../../../services/youthManagement/hooks';
import {objectFilter} from '../../../@softbd/utilities/helpers';
import {Link} from '../../../@softbd/elements/common';
import BoxCardsSkeleton from '../../institute/Components/BoxCardsSkeleton';
import NoDataFoundComponent from '../common/NoDataFoundComponent';

interface TrendingCoursesSectionProps {
  filters?: any;
  page_size?: number;
}

const TrendingCoursesSection = ({
  filters,
  page_size,
}: TrendingCoursesSectionProps) => {
  const {messages} = useIntl();

  const [courseFilters, setCourseFilters] = useState({
    page_size: page_size,
  });

  const pathValue = 'trending';
  const {
    data: courseList,
    metaData: courseListMetaData,
    isLoading: isLoadingCourseList,
  } = useFetchCourseList(pathValue, courseFilters);

  console.log('Trending CourseList----', courseList);
  useEffect(() => {
    setCourseFilters(objectFilter({...courseFilters, ...filters}));
  }, [filters]);

  return (
    <Grid container spacing={3} mb={8}>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container alignItems={'center'}>
          <Grid item xs={6} sm={9} md={10}>
            <Typography color={'primary'} variant={'h5'} fontWeight={'bold'}>
              {messages['common.trending_courses']}
            </Typography>
          </Grid>
          {page_size && courseListMetaData?.total_page > 1 && (
            <Grid item xs={6} sm={3} md={2} style={{textAlign: 'right'}}>
              <Link href={`/${pathValue}`}>
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
          {isLoadingCourseList ? (
            <Grid item xs={12}>
              <BoxCardsSkeleton />
            </Grid>
          ) : courseList && courseList.length ? (
            <>
              {courseList.map((course: any) => {
                return (
                  <Grid item xs={12} sm={6} md={3} key={course.id}>
                    <Link href={`/course-details/${course.id}`}>
                      <CourseCardComponent course={course} />
                    </Link>
                  </Grid>
                );
              })}
            </>
          ) : (
            <NoDataFoundComponent />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TrendingCoursesSection;
