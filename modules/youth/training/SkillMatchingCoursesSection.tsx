import React, {useEffect, useState} from 'react';
import {Button, Grid, Typography} from '@mui/material';
import {ChevronRight} from '@mui/icons-material';
import useStyles from './index.style';
import CourseCardComponent from '../../../@softbd/elements/CourseCardComponent';
import {useIntl} from 'react-intl';
import {useFetchCourseList} from '../../../services/youthManagement/hooks';
import Link from 'next/link';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {LINK_FRONTEND_YOUTH_SKILL_MATCHING_COURSELIST} from '../../../@softbd/common/appLinks';
import {objectFilter} from '../../../@softbd/utilities/helpers';

interface skillMatchingCoursesSectionProps {
  filters?: any;
  page_size?: number;
}

const SkillMatchingCoursesSection = ({
  filters,
  page_size,
}: skillMatchingCoursesSectionProps) => {
  const classes = useStyles();
  const {messages} = useIntl();
  const authUser = useAuthUser<YouthAuthUser>();

  const [youthSkillIds, setYouthSkillIds] = useState<Array<number>>([]);

  useEffect(() => {
    let skillIDs: Array<number> = [];
    authUser?.skills?.map((skill: any) => {
      skillIDs.push(skill.id);
    });
    setYouthSkillIds(skillIDs);
  }, []);

  const [courseFilters, setCourseFilters] = useState<any>({
    skill_ids: youthSkillIds,
    page_size: page_size ? page_size : null,
  });

  useEffect(() => {
    setCourseFilters(objectFilter({...courseFilters, ...filters}));
  }, [filters]);

  const pathValue = 'skill-matching';
  const {data: courseList, metaData: courseListMetaData} = useFetchCourseList(
    pathValue,
    courseFilters,
  );

  return courseList && courseList.length ? (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={12}>
        <Grid container alignItems={'center'}>
          <Grid item xs={8} sm={9} md={10}>
            <Typography variant={'h5'} className={classes.sectionTitle}>
              {messages['common.skill_matching_course']}
            </Typography>
          </Grid>
          {page_size && courseListMetaData?.total_page > 1 && (
            <Grid item xs={4} sm={3} md={2} style={{textAlign: 'right'}}>
              <Link
                href={LINK_FRONTEND_YOUTH_SKILL_MATCHING_COURSELIST}
                passHref>
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

export default SkillMatchingCoursesSection;
