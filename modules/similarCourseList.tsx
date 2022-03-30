import CourseListHeaderSection from './youth/training/CourseListHeaderSection';
import {Box, Container, Grid, Pagination, Stack} from '@mui/material';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useRouter} from 'next/router';
import {
  useFetchCourseList,
  useFetchPublicCourseDetails,
} from '../services/instituteManagement/hooks';
import {Link} from '../@softbd/elements/common';
import {objectFilter} from '../@softbd/utilities/helpers';
import CourseCardComponent from '../@softbd/elements/CourseCardComponent';
import NoDataFoundComponent from './youth/common/NoDataFoundComponent';
import {useIntl} from 'react-intl';

import {styled} from '@mui/material/styles';
import BoxCardsSkeleton from './institute/Components/BoxCardsSkeleton';
import PageSizes from '../@softbd/utilities/PageSizes';
import {FilterItem} from '../shared/Interface/common.interface';

const PREFIX = 'SimilarCourseList';

export const classes = {
  mainContent: `${PREFIX}-mainContent`,
};

export const StyledBox = styled(Box)(({theme}) => ({
  margin: '0px auto 20px',

  [`& .${classes.mainContent}`]: {
    marginTop: 20,
  },
}));

const SimilarCourseList = () => {
  const {messages} = useIntl();
  const [similarCourseFilter, setSimilarCourseFilter] = useState<any>({
    skill_ids: [],
    page_size: PageSizes.EIGHT,
    page: 1,
  });
  const router = useRouter();
  const {courseId} = router.query;
  const page = useRef<any>(1);
  const {data: courseDetails} = useFetchPublicCourseDetails(Number(courseId));
  const [skillIds, setSkillIds] = useState<Array<number>>([]);

  useEffect(() => {
    let skillIDs: Array<number> = [];
    if (courseDetails?.skills) {
      courseDetails.skills.map((skill: any) => {
        skillIDs.push(skill.id);
      });
    }
    setSkillIds(skillIDs);
  }, [courseDetails]);

  useEffect(() => {
    const params: any = {skill_ids: []};
    if (skillIds) {
      params.skill_ids = skillIds;
    }

    setSimilarCourseFilter((prev: any) => {
      return {...prev, ...params};
    });
  }, [skillIds]);

  const filterCoursesListTrainingList = useCallback(
    (filterKey: string, filterValue: any) => {
      const newFilter: any = {};
      newFilter[filterKey] = filterValue;
      page.current = 1;
      setSimilarCourseFilter((prev: any) => {
        return objectFilter({...prev, ...newFilter, page: page.current});
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

      setSimilarCourseFilter((prev: any) => {
        return {...prev, ...newFilter};
      });
    },
    [],
  );

  const pathValue = 'skill-matching';
  const {
    data: courseList,
    isLoading: isSimilarCoursesLoading,
    metaData,
  } = useFetchCourseList(pathValue, similarCourseFilter);

  const onPaginationChange = useCallback((event: any, currentPage: number) => {
    page.current = currentPage;
    setSimilarCourseFilter((params: any) => {
      return {...params, ...{page: currentPage}};
    });
  }, []);
  return (
    <StyledBox>
      <CourseListHeaderSection
        addFilterKey={filterCoursesListTrainingList}
        routeParamsFilters={filterCoursesListByRouteParams}
      />
      <Container maxWidth={'lg'} className={classes.mainContent}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {isSimilarCoursesLoading ? (
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
                  {metaData.total_page > 1 && (
                    <Grid
                      item
                      md={12}
                      mt={4}
                      display={'flex'}
                      justifyContent={'center'}>
                      <Stack spacing={2}>
                        <Pagination
                          page={page.current}
                          count={metaData.total_page}
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
                  message={messages['common.no_similar_course_found'] as string}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </StyledBox>
  );
};

export default SimilarCourseList;
