import CourseListHeaderSection from './youth/training/CourseListHeaderSection';
import {Box, Container, Grid} from '@mui/material';
import React, {useCallback, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useFetchCourseDetails} from '../services/instituteManagement/hooks';
import {useFetchCourseList} from '../services/youthManagement/hooks';
import {Link} from '../@softbd/elements/common';
import {
  getShowInTypeByDomain,
  objectFilter,
} from '../@softbd/utilities/helpers';
import CourseCardComponent from '../@softbd/elements/CourseCardComponent';
import NoDataFoundComponent from './youth/common/NoDataFoundComponent';
import {useIntl} from 'react-intl';
import BoxContentSkeleton from './youth/profile/component/BoxContentSkeleton';

import {styled} from '@mui/material/styles';
import {useVendor} from '../@crema/utility/AppHooks';
import ShowInTypes from '../@softbd/utilities/ShowInTypes';

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
  const [filters, setFilters] = useState<any>({
    skill_ids: [],
  });
  const router = useRouter();
  const {courseId} = router.query;
  const vendor = useVendor();
  const showInType = getShowInTypeByDomain();

  const {data: courseDetails, isLoading: isCourseListLoading} =
    useFetchCourseDetails(Number(courseId));
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
    setFilters(params);
  }, [skillIds, showInType]);

  const filterCoursesListTrainingList = useCallback(
    (filterKey: string, filterValue: number | null) => {
      const newFilter: any = {};
      newFilter[filterKey] = filterValue;

      setFilters((prev: any) => {
        return objectFilter({...prev, ...newFilter});
      });
    },
    [],
  );

  const pathValue = 'skill-matching';
  const {data: courseList} = useFetchCourseList(pathValue, filters);

  return (
    <StyledBox>
      <CourseListHeaderSection addFilterKey={filterCoursesListTrainingList} />
      <Container maxWidth={'lg'} className={classes.mainContent}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {courseList && courseList.length > 0 ? (
                courseList.map((course: any) => {
                  return (
                    <Grid item xs={12} sm={6} md={3} key={course.id}>
                      <Link href={`/course-details/${course.id}`}>
                        <CourseCardComponent course={course} />
                      </Link>
                    </Grid>
                  );
                })
              ) : isCourseListLoading ? (
                <BoxContentSkeleton />
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
