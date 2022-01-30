import CourseListHeaderSection from './youth/training/CourseListHeaderSection';
import {Box, Container, Grid, Pagination, Stack} from '@mui/material';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useRouter} from 'next/router';
import {
  useFetchCourseDetails,
  useFetchCourseList,
} from '../services/instituteManagement/hooks';
import {Link} from '../@softbd/elements/common';
import {
  getShowInTypeByDomain,
  objectFilter,
} from '../@softbd/utilities/helpers';
import CourseCardComponent from '../@softbd/elements/CourseCardComponent';
import NoDataFoundComponent from './youth/common/NoDataFoundComponent';
import {useIntl} from 'react-intl';

import {styled} from '@mui/material/styles';
import {useVendor} from '../@crema/utility/AppHooks';
import ShowInTypes from '../@softbd/utilities/ShowInTypes';
import BoxCardsSkeleton from './institute/Components/BoxCardsSkeleton';
import PageSizes from '../@softbd/utilities/PageSizes';

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
  const vendor = useVendor();
  const showInType = getShowInTypeByDomain();
  const page = useRef<any>(1);
  const {data: courseDetails} = useFetchCourseDetails(Number(courseId));
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

    if (showInType == ShowInTypes.TSP && vendor) {
      params.institute_id = vendor.id;
    }
    setSimilarCourseFilter((prev: any) => {
      return {...prev, ...params};
    });
  }, [skillIds, showInType]);

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

  const pathValue = 'skill-matching';
  const {
    data: courseList,
    isLoading: isSimilarCoursesLoading,
    metaData,
  } = useFetchCourseList(pathValue, similarCourseFilter);
  console.log('metaData', metaData.total_page);

  const onPaginationChange = useCallback((event: any, currentPage: number) => {
    page.current = currentPage;
    setSimilarCourseFilter((params: any) => {
      return {...params, ...{page: currentPage}};
    });
  }, []);
  return (
    <StyledBox>
      <CourseListHeaderSection addFilterKey={filterCoursesListTrainingList} />
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
