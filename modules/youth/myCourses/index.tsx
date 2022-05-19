import React, {useCallback, useState} from 'react';
import {Container, Grid, Typography} from '@mui/material';
import CourseCardComponent from '../../../@softbd/elements/CourseCardComponent';
import {useIntl} from 'react-intl';
import {useFetchYouthCourses} from '../../../services/youthManagement/hooks';
import {Link} from '../../../@softbd/elements/common';
import BoxCardsSkeleton from '../../institute/Components/BoxCardsSkeleton';
import ViewExamsPopup from './ViewExamsPopup';

const MyCoursePage = () => {
  const {messages} = useIntl();
  const [courseFilters] = useState({});
  const [isOpenViewExamModal, setIsOpenViewExamModal] = useState(false);
  const [courseExam, setCourseExam] = useState([]);
  const [batchId, setBatchId] = useState<any>(null);

  const {data: courseList, isLoading: isLoadingCourses} =
    useFetchYouthCourses(courseFilters);

  const onCloseViewExamModal = useCallback(() => {
    setCourseExam([]);
    setIsOpenViewExamModal(false);
  }, []);

  const handleViewExam = (e: any, exams: any, batchId: any) => {
    e.preventDefault();
    setCourseExam(exams);
    setIsOpenViewExamModal(true);
    setBatchId(batchId);
  };
  return (
    <Container maxWidth={'lg'} sx={{padding: 5}}>
      {isLoadingCourses ? (
        <BoxCardsSkeleton />
      ) : courseList && courseList?.length ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <Typography variant={'h5'} fontWeight={'bold'}>
              {messages['common.my_courses']}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Grid container spacing={5}>
              {courseList.map((course: any) => {
                return (
                  <Grid item xs={12} sm={6} md={3} key={course.id}>
                    <Link href={`/course-details/${course.course_id}`}>
                      <CourseCardComponent
                        course={{
                          id: course.course_id,
                          course_fee: course.course_fee,
                          cover_image: course.cover_image,
                          title: course.course_title,
                          institute_title: course.institute_title,
                          created_at: course.course_created_at,
                          duration: course.duration,
                          progress: (course.id * 40) % 100,
                          exams: course?.exams,
                          batch_id: course.batch_id,
                        }}
                        handleViewExam={handleViewExam}
                      />
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container sx={{justifyContent: 'center', marginTop: 5}}>
          <Typography variant={'h4'}>
            {messages['common.no_enrolled_course_found']}
          </Typography>
        </Grid>
      )}
      {isOpenViewExamModal && (
        <ViewExamsPopup
          onClose={onCloseViewExamModal}
          exams={courseExam}
          batchId={batchId}
        />
      )}
    </Container>
  );
};

export default MyCoursePage;
