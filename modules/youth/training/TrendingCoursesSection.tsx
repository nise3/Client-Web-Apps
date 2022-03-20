import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Button, Grid, Pagination, Stack} from '@mui/material';
import {ChevronRight} from '@mui/icons-material';
import CourseCardComponent from '../../../@softbd/elements/CourseCardComponent';
import {useIntl} from 'react-intl';
import {objectFilter} from '../../../@softbd/utilities/helpers';
import {H2, Link} from '../../../@softbd/elements/common';
import BoxCardsSkeleton from '../../institute/Components/BoxCardsSkeleton';
import NoDataFoundComponent from '../common/NoDataFoundComponent';
import {useRouter} from 'next/router';
import {styled} from '@mui/material/styles';
import PageSizes from '../../../@softbd/utilities/PageSizes';
import {useFetchCourseList} from '../../../services/instituteManagement/hooks';

const PREFIX = 'TrendingCoursesSection';

export const classes = {
  subHeader: `${PREFIX}-subHeader`,
};

export const StyledGrid = styled(Grid)(({theme}) => ({
  [`& .${classes.subHeader}`]: {
    fontSize: '1.421875rem',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
}));

interface TrendingCoursesSectionProps {
  filters?: any;
  showAllCourses: boolean;
}

const TrendingCoursesSection = ({
  filters,
  showAllCourses,
}: TrendingCoursesSectionProps) => {
  const {messages} = useIntl();
  const router = useRouter();
  const path = router.pathname;

  const [courseFilters, setCourseFilters] = useState({
    page_size: showAllCourses ? PageSizes.EIGHT : PageSizes.FOUR,
    page: 1,
  });

  const pathValue = 'trending';
  let pathWithParams = pathValue;
  if (Object.keys(router.query).length > 0) {
    const params = router.asPath.split('?')[1];
    pathWithParams += '?' + params;
  }
  const {
    data: courseList,
    metaData: courseListMetaData,
    isLoading: isLoadingCourseList,
  } = useFetchCourseList(pathValue, courseFilters);

  const page = useRef<any>(1);
  const onPaginationChange = useCallback((event: any, currentPage: number) => {
    page.current = currentPage;
    setCourseFilters((params: any) => {
      return {...params, ...{page: currentPage}};
    });
  }, []);

  useEffect(() => {
    page.current = 1;
    setCourseFilters((prev: any) => {
      return objectFilter({...prev, ...filters, page: page.current});
    });
  }, [filters]);

  return (
    <StyledGrid container spacing={3} mb={8}>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container alignItems={'center'}>
          <Grid item xs={6} sm={9} md={10}>
            <H2 className={classes.subHeader}>
              {messages['common.trending_courses']}
            </H2>
          </Grid>
          {!showAllCourses && (
            <Grid item xs={6} sm={3} md={2} style={{textAlign: 'right'}}>
              <Link
                href={`${path}/${pathWithParams}`}
                style={{display: 'inline-block'}}>
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
              {showAllCourses && courseListMetaData.total_page > 1 && (
                <Grid
                  item
                  md={12}
                  mt={4}
                  display={'flex'}
                  justifyContent={'center'}>
                  <Stack spacing={2}>
                    <Pagination
                      page={page.current}
                      count={courseListMetaData.total_page}
                      color={'primary'}
                      shape='rounded'
                      onChange={onPaginationChange}
                    />
                  </Stack>
                </Grid>
              )}
            </>
          ) : (
            <NoDataFoundComponent
              messageType={messages['common.trending_courses']}
            />
          )}
        </Grid>
      </Grid>
    </StyledGrid>
  );
};

export default TrendingCoursesSection;
