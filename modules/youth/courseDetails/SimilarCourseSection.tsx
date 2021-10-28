import React, {FC, useEffect, useState} from 'react';
import {Button, Grid, Typography} from '@mui/material';
import {ChevronRight} from '@mui/icons-material';
import CourseCardComponent from '../../../@softbd/elements/CourseCardComponent';
import {useIntl} from 'react-intl';
import {useFetchCourseList} from '../../../services/youthManagement/hooks';
import {Link} from '../../../@softbd/elements/common';
import {useRouter} from 'next/router';
import {getModulePath} from '../../../@softbd/utilities/helpers';

interface SimilarCourseSectionProps {
  skillIds: Array<number>;
}

const SimilarCourseSection: FC<SimilarCourseSectionProps> = ({skillIds}) => {
  const {messages} = useIntl();
  const router = useRouter();
  const path = router.pathname;

  const [courseFilters, setCourseFilters] = useState<any>({page_size: 8});
  const pathVariable = 'skill-matching';
  const {data: courseList, metaData} = useFetchCourseList(
    pathVariable,
    courseFilters,
  );

  useEffect(() => {
    if (skillIds) {
      setCourseFilters({skill_ids: skillIds, page_size: 8});
    }
  }, [skillIds]);

  return courseList && courseList.length ? (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container alignItems={'center'}>
          <Grid item xs={8} sm={9} md={10}>
            <Typography variant={'h5'} fontWeight={'bold'}>
              {messages['common.skill_matching_course']}
            </Typography>
          </Grid>
          {metaData?.total_page > 1 && (
            <Grid item xs={4} sm={3} md={2} style={{textAlign: 'right'}}>
              <Link href={`${path}/${pathVariable}`}>
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
                <Grid item xs={12} sm={4} md={3} key={course.id}>
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

export default SimilarCourseSection;
