import React, {useEffect, useState} from 'react';
import {Button, Grid, Typography} from '@mui/material';
import {ChevronRight} from '@mui/icons-material';
import CourseCardComponent from '../../../@softbd/elements/CourseCardComponent';
import {useIntl} from 'react-intl';
import {useFetchCourseList} from '../../../services/youthManagement/hooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {objectFilter} from '../../../@softbd/utilities/helpers';
import {Link} from '../../../@softbd/elements/common';
import NoDataFoundComponent from '../common/NoDataFoundComponent';
import BoxCardsSkeleton from '../../institute/Components/BoxCardsSkeleton';

interface skillMatchingCoursesSectionProps {
  filters?: any;
  page_size?: number;
}

const SkillMatchingCoursesSection = ({
  filters,
  page_size,
}: skillMatchingCoursesSectionProps) => {
  const {messages} = useIntl();
  const authUser = useAuthUser<YouthAuthUser>();

  const [youthSkillIds, setYouthSkillIds] = useState<Array<number>>([]);

  useEffect(() => {
    let skillIDs: Array<number> = [];
    authUser?.skills?.map((skill: any) => {
      skillIDs.push(skill.id);
    });
    setYouthSkillIds(skillIDs);
  }, [authUser]);

  const [courseFilters, setCourseFilters] = useState<any>({
    skill_ids: youthSkillIds,
    page_size: page_size ? page_size : null,
  });

  useEffect(() => {
    setCourseFilters(objectFilter({...courseFilters, ...filters}));
  }, [filters]);

  const pathValue = 'skill-matching';
  const {
    data: courseList,
    metaData: courseListMetaData,
    isLoading: isLoadingCourseList,
  } = useFetchCourseList(pathValue, courseFilters);

  return (
    <Grid container spacing={3} mb={8}>
      <Grid item xs={12} sm={12}>
        <Grid container alignItems={'center'}>
          <Grid item xs={6} sm={9} md={10}>
            <Typography variant={'h5'} fontWeight={'bold'} color={'primary'}>
              {messages['common.skill_matching_course']}
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
              {courseList.map((course: any) => (
                <Grid item xs={12} sm={6} md={3} key={course.id}>
                  <Link href={`/course-details/${course.id}`}>
                    <CourseCardComponent course={course} />
                  </Link>
                </Grid>
              ))}
            </>
          ) : (
            <NoDataFoundComponent />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SkillMatchingCoursesSection;
