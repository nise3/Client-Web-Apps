import React, {FC, useEffect, useState} from 'react';
import {Button, Container, Grid, Typography} from '@mui/material';
import {ChevronRight} from '@mui/icons-material';
import CourseCardComponent from '../../../@softbd/elements/CourseCardComponent';
import {useIntl} from 'react-intl';
import {useFetchCourseList} from '../../../services/youthManagement/hooks';
import {Link} from '../../../@softbd/elements/common';
import {useRouter} from 'next/router';
import {getModulePath} from '../../../@softbd/utilities/helpers';

interface SimilarCourseSectionProps {
  courseId: number;
  skillIds: Array<number>;
}

const SimilarCourseSection: FC<SimilarCourseSectionProps> = ({
  courseId,
  skillIds,
}) => {
  const {messages} = useIntl();
  const router = useRouter();
  const pageSize = 4;

  const [courseFilters, setCourseFilters] = useState<any>({
    page_size: pageSize,
  });
  const pathVariable = 'skill-matching';
  const {data: courseList, metaData} = useFetchCourseList(
    pathVariable,
    courseFilters,
  );

  useEffect(() => {
    if (skillIds) {
      setCourseFilters((prevState: any) => {
        return {...prevState, skill_ids: skillIds};
      });
    }
  }, [skillIds]);

  return courseList && courseList.length ? (
    <Container maxWidth={'lg'}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Grid container alignItems={'center'}>
            <Grid item xs={8} sm={9} md={10}>
              <Typography variant={'h5'} fontWeight={'bold'}>
                {messages['common.skill_matching_course']}
              </Typography>
            </Grid>
            {metaData?.total_page > 1 && (
              <Grid item xs={4} sm={3} md={2} style={{textAlign: 'right'}}>
                <Link
                  href={
                    getModulePath(router.asPath) +
                    `/similar-courses/${courseId}`
                  }>
                  <Button
                    variant={'outlined'}
                    size={'medium'}
                    color={'primary'}>
                    {messages['common.see_all']}
                    <ChevronRight />
                  </Button>
                </Link>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12}>
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
    </Container>
  ) : (
    <></>
  );
};

export default SimilarCourseSection;
