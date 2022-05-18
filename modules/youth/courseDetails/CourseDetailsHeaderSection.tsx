import { Box, Button, Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { FC, useState } from 'react';
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
import { getCertificateIssue } from '../../../services/CertificateAuthorityManagement/CertificateIssueService';

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
  youthId: number;
}

const CourseDetailsHeaderSection: FC<CourseDetailsHeaderProps> = ({ course, youthId }) => {
  // console.log('course details: youthId', youthId)
  const { messages, formatNumber } = useIntl();
  const authUser = useAuthUser();
  const [certificateIssue, setCertificateIssue] = useState<any>({});
  // const [certificateIssue] = useState<ICertificateIssue>(certificateIssueMock.data[0]);

  getCertificateIssue({youth_id: youthId})
    .then((res:any)=>{
      if(res && res.length > 0){
        setCertificateIssue(res[0]);
      }
    })
  
  // console.log('const {data: certificateIssue} ', certificateIssue);
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
                  {certificateIssue?.id && <Link
                    className={classes.certificateViewButton}
                    href={
                      authUser
                        ? youthDomain() +
                        LINK_FRONTEND_YOUTH_CERTIFICATE_VIEW +
                        certificateIssue?.id
                        : gotoLoginSignUpPage(LINK_YOUTH_SIGNUP)
                    }>
                    <Button variant={'contained'} color={'primary'}>
                      {messages['common.certificate_view']}
                    </Button>
                  </Link>}
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
