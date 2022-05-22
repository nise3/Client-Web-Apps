import { Box, Button, Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import { useAuthUser } from '../../../@crema/utility/AppHooks';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {
  LINK_FRONTEND_YOUTH_CERTIFICATE_VIEW,
  LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT,
  LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT_CHOOSE_PAYMENT_METHOD,
  LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT_VERIFICATION,
  LINK_YOUTH_SIGNUP
} from '../../../@softbd/common/appLinks';
import {
  gotoLoginSignUpPage,
  youthDomain
} from '../../../@softbd/common/constants';
import { Body1, H1, Link } from '../../../@softbd/elements/common';
import CustomChip from '../../../@softbd/elements/display/CustomChip/CustomChip';
import CardMediaImageView from '../../../@softbd/elements/display/ImageView/CardMediaImageView';
import TagChip from '../../../@softbd/elements/display/TagChip';
import {
  getCourseDuration,
  getIntlNumber
} from '../../../@softbd/utilities/helpers';

const PREFIX = 'CourseDetailsHeaderSection';

const classes = {
  courseFee: `${PREFIX}-courseFee`,
  courseFeeStyle: `${PREFIX}-courseFeeStyle`,
  certificateViewButton: `${PREFIX}-certificateViewButton`,
};

const StyledContainer = styled(Container)(({ theme }) => ({
  [`& .${classes.courseFee}`]: {
    textTransform: 'uppercase',
    marginTop: 25,
    display: 'flex',
    marginBottom: 10,
  },
  [`& .${classes.courseFeeStyle}`]: {
    marginLeft: 10,
    color: theme.palette.primary.main,
  },
  [`& .${classes.certificateViewButton}`]: {
    marginLeft: 10,
  },
}));


interface CourseDetailsHeaderProps {
  course: any;
}

const CourseDetailsHeaderSection: FC<CourseDetailsHeaderProps> = ({ course }) => {
  const { messages, formatNumber } = useIntl();
  const authUser = useAuthUser();
  // const router = useRouter();
  // const path = router.pathname;

  // const goToCertificate = () => {
  //   if (course && course.certificate_issued_id) {
  //     const params: any = {certificate_issued_id: course.certificate_issued_id};
  //     apiGet(API_COURSE_ENROLLMENTS, params)
  //     .then((res) => {
  //       const dta = res.data.data;
  //       if (dta && dta.length > 0) {
  //         router.push(
  //           `${path}/certificate-view/${dta.batch_id}`,
  //         );
  //       } else {
  //         errorStack(
  //           <IntlMessages
  //             id='common.no_data_found_dynamic'
  //             values={{
  //               messageType: <IntlMessages id='certificate.certificate_issue' />,
  //             }}
  //           />,
  //         );
  //       }
  //     });
  //   }
  // }
  
  return (
    <StyledContainer maxWidth={'lg'}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <Box className={classes.courseFee}>
            {messages['common.course_fee']}:{' '}
            <Box className={classes.courseFeeStyle}>
              {course?.course_fee
                ? '৳ ' + formatNumber(course.course_fee)
                : messages['common.free']}
            </Box>
          </Box>
          <H1 mb={1} style={{ fontWeight: 'bold', fontSize: '1.640625rem' }}>
            {course?.title}
          </H1>
          <Body1 mb={6}>{course?.institute_title}</Body1>
          {course?.duration && (
            <TagChip
              label={getCourseDuration(course.duration, formatNumber, messages)}
            />
          )}
          {course?.lessons && (
            <TagChip
              label={
                <IntlMessages
                  id={'course_details.total_lesson'}
                  values={{
                    total: getIntlNumber(formatNumber, '4'),
                  }}
                />
              }
            />
          )}

          {course?.enroll_count > 0 && (
            <TagChip
              label={
                <IntlMessages
                  id={'course_details.enrolled'}
                  values={{
                    total: getIntlNumber(formatNumber, course.enroll_count),
                  }}
                />
              }
            />
          )}

          {(!authUser || authUser?.isYouthUser) && (
            <Box mt={4} mb={3}>
              {!course?.enrolled ? (
                course?.enrollable ? (
                  <Link
                    href={
                      authUser
                        ? youthDomain() +
                        LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT +
                        course?.id
                        : gotoLoginSignUpPage(LINK_YOUTH_SIGNUP)
                    }>
                    <Button variant={'contained'} color={'primary'}>
                      {messages['common.enroll_now']}
                    </Button>
                  </Link>
                ) : (
                  <CustomChip
                    label={messages['common.not_enrollable']}
                    color={'primary'}
                  />
                )
              ) : (
                <Box mt={4}>
                  {!course?.verified ? (
                    <Link
                      href={
                        authUser
                          ? youthDomain() +
                          LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT_VERIFICATION +
                          course?.id +
                          `?enrollment_id=${course?.enrollment_id}`
                          : gotoLoginSignUpPage(LINK_YOUTH_SIGNUP)
                      }>
                      <Button variant={'contained'} color={'primary'}>
                        {messages['common.verify_enrollment']}
                      </Button>
                    </Link>
                  ) : !course?.payment_status ? (
                    <Link
                      href={
                        authUser
                          ? youthDomain() +
                          LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT_CHOOSE_PAYMENT_METHOD +
                          course?.id +
                          `?enrollment_id=${course?.enrollment_id}`
                          : gotoLoginSignUpPage(LINK_YOUTH_SIGNUP)
                      }>
                      <Button variant={'contained'} color={'primary'}>
                        {messages['common.pay_now']}
                      </Button>
                    </Link>
                  ) : (
                    <CustomChip
                      label={messages['common.already_enrolled']}
                      color={'primary'}
                    />
                  )}
                  {course?.certificate_issued_id && 
                  <Link
                    className={classes.certificateViewButton}
                    href={
                      authUser
                        ? youthDomain() +
                      LINK_FRONTEND_YOUTH_CERTIFICATE_VIEW +
                        course?.id
                        : gotoLoginSignUpPage(LINK_YOUTH_SIGNUP)
                    }>
                    <Button
                    variant={'contained'} color={'primary'}>
                      {messages['common.certificate_view']}
                    </Button>
                  </Link>
                  }
                  {/* <Link
                    className={classes.certificateViewButton}
                    href={
                      authUser
                        ? youthDomain() +
                        LINK_FRONTEND_YOUTH_CERTIFICATE_VIEW +
                        certificateIssue?.id
                        : gotoLoginSignUpPage(LINK_YOUTH_SIGNUP)
                    }>
                  </Link> */}
                </Box>
              )}
            </Box>
          )}
          
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CardMediaImageView
            image={course?.cover_image}
            sx={{ height: 300, width: '100%', backgroundSize: '100%' }}
            title={course?.title}
          />
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default CourseDetailsHeaderSection;
