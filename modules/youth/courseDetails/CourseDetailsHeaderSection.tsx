import React, {FC} from 'react';
import {styled} from '@mui/material/styles';
import {Box, Button, CardMedia, Container, Grid} from '@mui/material';
import TagChip from '../../../@softbd/elements/display/TagChip';
import {useIntl} from 'react-intl';
import {
  getCourseDuration,
  getIntlNumber,
} from '../../../@softbd/utilities/helpers';
import {H1, Link} from '../../../@softbd/elements/common';
import {
  LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT,
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
          <H1 mb={8} style={{fontWeight: 'bold', fontSize: '1.640625rem'}}>
            {course?.title}
          </H1>
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
                <CustomChip
                  label={messages['common.already_enrolled']}
                  color={'primary'}
                />
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CardMedia
            image={course?.cover_image}
            sx={{height: 300, width: '100%'}}
            title={course?.title}
          />
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default CourseDetailsHeaderSection;
