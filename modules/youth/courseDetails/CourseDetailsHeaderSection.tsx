import React, {FC} from 'react';
import {styled} from '@mui/material/styles';
import {Box, Button, Container, Grid} from '@mui/material';
import TagChip from '../../../@softbd/elements/display/TagChip';
import {useIntl} from 'react-intl';
import {
  getCourseDuration,
  getIntlNumber,
} from '../../../@softbd/utilities/helpers';
import {Body1, H1, Link} from '../../../@softbd/elements/common';
import {
  LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT,
  LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT_CHOOSE_PAYMENT_METHOD,
  LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT_VERIFICATION,
  LINK_YOUTH_SIGNUP,
} from '../../../@softbd/common/appLinks';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';
import CustomChip from '../../../@softbd/elements/display/CustomChip/CustomChip';
import {
  gotoLoginSignUpPage,
  youthDomain,
} from '../../../@softbd/common/constants';
import CardMediaImageView from '../../../@softbd/elements/display/ImageView/CardMediaImageView';

const PREFIX = 'CourseDetailsHeaderSection';

const classes = {
  courseFee: `${PREFIX}-courseFee`,
  courseFeeStyle: `${PREFIX}-courseFeeStyle`,
};

const StyledContainer = styled(Container)(({theme}) => ({
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
}));

interface CourseDetailsHeaderProps {
  course: any;
}

const CourseDetailsHeaderSection: FC<CourseDetailsHeaderProps> = ({course}) => {
  const {messages, formatNumber} = useIntl();
  const authUser = useAuthUser<YouthAuthUser>();

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
          <H1 mb={1} style={{fontWeight: 'bold', fontSize: '1.640625rem'}}>
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
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CardMediaImageView
            image={
              course?.cover_image
                ? course?.cover_image
                : '/images/blank_image.png'
            }
            sx={{height: 300, width: '100%', backgroundSize: '100%'}}
            title={course?.title}
          />
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default CourseDetailsHeaderSection;
