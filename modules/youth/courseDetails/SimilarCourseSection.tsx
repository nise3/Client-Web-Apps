import React, {FC, useEffect, useState} from 'react';
import {Button, Container, Grid} from '@mui/material';
import {ChevronRight} from '@mui/icons-material';
import CourseCardComponent from '../../../@softbd/elements/CourseCardComponent';
import {useIntl} from 'react-intl';
import {Link} from '../../../@softbd/elements/common';
import NoDataFoundComponent from '../common/NoDataFoundComponent';
import BoxCardsSkeleton from '../../institute/Components/BoxCardsSkeleton';
import PageSizes from '../../../@softbd/utilities/PageSizes';
import {useFetchCourseList} from '../../../services/instituteManagement/hooks';

interface SimilarCourseSectionProps {
  courseId: number;
  skillIds: Array<number>;
}

const SimilarCourseSection: FC<SimilarCourseSectionProps> = ({
  courseId,
  skillIds,
}) => {
  const {messages} = useIntl();
  const pageSize = PageSizes.FOUR;

  const [courseFilters, setCourseFilters] = useState<any>(null);

  useEffect(() => {
    if (skillIds && skillIds.length > 0) {
      let params: any = {
        page_size: pageSize,
      };
      params.skill_ids = skillIds;
      setCourseFilters(params);
    }
  }, [skillIds]);

  const pathVariable = 'skill-matching';
  const {
    data: courseList,
    metaData,
    isLoading,
  } = useFetchCourseList(pathVariable, courseFilters);

  return (
    <Container maxWidth={'lg'}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Grid container alignItems={'center'}>
            <Grid item xs={8} sm={9} md={10}>
              <h2 style={{fontWeight: 'bold', fontSize: '1.421875rem'}}>
                {messages['common.similar_course']}
              </h2>
            </Grid>
            {metaData?.total_page > 1 && (
              <Grid item xs={4} sm={3} md={2} style={{textAlign: 'right'}}>
                <Link href={`/similar-courses/${courseId}`}>
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
        {isLoading ? (
          <Grid item xs={12}>
            <BoxCardsSkeleton />
          </Grid>
        ) : courseList?.length > 0 ? (
          <Grid item xs={12}>
            <Grid container spacing={5}>
              {courseList &&
                courseList.map((course: any) => {
                  return (
                    <Grid item xs={12} sm={4} md={3} key={course.id}>
                      <Link href={`/course-details/${course.id}`}>
                        <CourseCardComponent course={course} />
                      </Link>
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
        ) : (
          <NoDataFoundComponent
            messageType={messages['common.similar_course']}
          />
        )}
      </Grid>
    </Container>
  );
};

export default SimilarCourseSection;
