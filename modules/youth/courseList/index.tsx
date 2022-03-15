import React, {useCallback, useEffect, useState} from 'react';
import {Box, Container, Grid, Pagination, Stack} from '@mui/material';
import CourseCardComponent from '../../../@softbd/elements/CourseCardComponent';
import {useIntl} from 'react-intl';
import {useRouter} from 'next/router';
import {H1, Link} from '../../../@softbd/elements/common';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {styled} from '@mui/material/styles';
import {useFetchCourseList} from '../../../services/instituteManagement/hooks';
import CourseListHeaderSection from '../training/CourseListHeaderSection';
import {objectFilter} from '../../../@softbd/utilities/helpers';
import NoDataFoundComponent from '../common/NoDataFoundComponent';
import PageSizes from '../../../@softbd/utilities/PageSizes';
import {FilterItem} from '../../../shared/Interface/common.interface';
import BoxCardsSkeleton from '../../institute/Components/BoxCardsSkeleton';

const PREFIX = 'CourseList';

export const classes = {
  header: `${PREFIX}-header`,
  paginationBox: `${PREFIX}-paginationBox`,
};

export const StyledContainer = styled(Container)(({theme}) => ({
  [`& .${classes.header}`]: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
  [`& .${classes.paginationBox}`]: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
}));

const CourseList = () => {
  const {messages} = useIntl();
  const router = useRouter();

  let {courseCategory} = router.query;
  courseCategory = String(courseCategory)?.trim();
  const authUser = useAuthUser<YouthAuthUser>();

  const [courseFilters, setCourseFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(PageSizes.EIGHT);
  const {
    data: courseList,
    isLoading,
    metaData,
  } = useFetchCourseList(courseCategory, courseFilters);

  useEffect(() => {
    setCourseFilters({page: currentPage, page_size: pageSize});
    if (courseCategory == 'nearby')
      if (authUser?.isYouthUser) {
        setCourseFilters((prevState) => {
          return {...prevState, loc_district_id: authUser?.loc_district_id};
        });
      }
  }, [authUser]);

  const getMessageId = (category: any) => {
    switch (category) {
      case 'skill-matching':
        return 'common.skill_courses';
      case 'trending':
        return 'common.trending_courses';
      case 'popular':
        return 'common.popular_courses';
      case 'nearby':
        return 'common.nearby_courses';
      default:
        return 'common.recent_courses';
    }
  };

  const handlePaginationPageChange = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      setCurrentPage(page);
      setCourseFilters({page: page, page_size: pageSize});
    },
    [],
  );

  const filterPopularCoursesList = useCallback(
    (filterKey: string, filterValue: any) => {
      const newFilter: any = {};
      newFilter[filterKey] = filterValue;

      setCourseFilters((prev: any) => {
        return objectFilter({...prev, ...newFilter});
      });
    },
    [],
  );

  const filterCoursesListByRouteParams = useCallback(
    (filters: Array<FilterItem>) => {
      const newFilter: any = {};
      filters.map((item) => {
        newFilter[item.filterKey] = item.filterValue;
      });

      setCourseFilters((prev: any) => {
        return {...prev, ...newFilter};
      });
    },
    [],
  );

  return (
    <>
      <CourseListHeaderSection
        addFilterKey={filterPopularCoursesList}
        routeParamsFilters={filterCoursesListByRouteParams}
      />
      <StyledContainer>
        {isLoading ? (
          <BoxCardsSkeleton />
        ) : courseList && courseList.length > 0 ? (
          <Grid container spacing={3} padding={5}>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6}>
                  <H1 className={classes.header}>
                    {messages[getMessageId(courseCategory)]}
                  </H1>
                </Grid>
              </Grid>
            </Grid>
            {courseList &&
              courseList.map((course: any) => {
                return (
                  <Grid item xs={12} sm={6} md={3} key={course.id}>
                    <Link href={`/course-details/${course.id}`}>
                      <CourseCardComponent course={course} />
                    </Link>
                  </Grid>
                );
              })}
          </Grid>
        ) : (
          <NoDataFoundComponent />
        )}

        {metaData && metaData.total_page && metaData.total_page > 1 && (
          <Box className={classes.paginationBox}>
            <Stack spacing={2}>
              <Pagination
                page={currentPage}
                count={metaData.total_page}
                color={'primary'}
                shape='rounded'
                onChange={handlePaginationPageChange}
              />
            </Stack>
          </Box>
        )}
      </StyledContainer>
    </>
  );
};

export default CourseList;
