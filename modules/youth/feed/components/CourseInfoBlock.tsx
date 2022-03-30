import React, {FC} from 'react';
import {styled} from '@mui/material/styles';
import {Box, Button, Card, CardMedia, Grid, Typography} from '@mui/material';
import TagChip from '../../../../@softbd/elements/display/TagChip';
import {courseDuration} from '../../../../@softbd/utilities/helpers';
import {useIntl} from 'react-intl';
import {
  LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT,
  LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT_CHOOSE_PAYMENT_METHOD,
  LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT_VERIFICATION,
  LINK_YOUTH_SIGNUP,
} from '../../../../@softbd/common/appLinks';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../../redux/types/models/CommonAuthUser';
import CustomChip from '../../../../@softbd/elements/display/CustomChip/CustomChip';
import {
  gotoLoginSignUpPage,
  niseDomain,
  youthDomain,
} from '../../../../@softbd/common/constants';
import {H3, Link} from '../../../../@softbd/elements/common';
import {useCustomStyle} from '../../../../@softbd/hooks/useCustomStyle';

const PREFIX = 'CourseInfoBlock';

const classes = {
  jobProviderImage: `${PREFIX}-jobProviderImage`,
  totalEnrolled: `${PREFIX}-totalEnrolled`,
  titleStyle: `${PREFIX}-titleStyle`,
  colorGray: `${PREFIX}-colorGray`,
  enrollButton: `${PREFIX}-enrollButton`,
  courseDescription: `${PREFIX}-courseDescription`,
  tagChipStyle: `${PREFIX}-tagChipStyle`,
  courseDetailsButton: `${PREFIX}-courseDetailsButton`,
};

const StyledCard = styled(Card)(({theme}) => ({
  padding: 15,

  [`& .${classes.jobProviderImage}`]: {
    height: 60,
    width: 60,
    border: '1px solid ' + theme.palette.grey['300'],
    objectFit: 'contain',
  },

  [`& .${classes.totalEnrolled}`]: {
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
  },

  [`& .${classes.titleStyle}`]: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },

  [`& .${classes.colorGray}`]: {
    color: theme.palette.grey['600'],
    display: 'inline',
  },

  [`& .${classes.enrollButton}`]: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },

  [`& .${classes.courseDescription}`]: {
    marginTop: 15,
    marginBottom: 15,
  },

  [`& .${classes.tagChipStyle}`]: {
    marginBottom: 0,
  },

  [`& .${classes.courseDetailsButton}`]: {
    position: 'absolute',
    left: 19,
    top: 19,
    width: '75%',
    fontSize: '0.87rem',
  },
}));

interface CourseInfoBlockProps {
  course: any;
}

const CourseInfoBlock: FC<CourseInfoBlockProps> = ({course}) => {
  const {messages, formatNumber} = useIntl();
  const result = useCustomStyle();

  const authUser = useAuthUser<YouthAuthUser>();

  return (
    <StyledCard>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2} sx={{position: 'relative'}}>
          <CardMedia
            component='img'
            alt={course.title}
            image={
              course.cover_image
                ? course.cover_image
                : '/images/blank_image.png'
            }
            sx={{height: '100%'}}
            title={course?.title}
          />
          <Link href={`/course-details/${course?.id}`} passHref>
            <Button
              className={classes.courseDetailsButton}
              variant={'contained'}
              color={'primary'}
              size={'small'}>
              {messages['common.details']}
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} md={10}>
          <Grid container>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={8}>
                  <Grid container>
                    <Grid item xs={2}>
                      <CardMedia
                        component='img'
                        alt={course.title}
                        image={
                          course.logo ? course.logo : '/images/blank_image.png'
                        }
                        className={classes.jobProviderImage}
                      />
                    </Grid>

                    <Grid item xs={10}>
                      <H3
                        sx={{...result.body2}}
                        mt={2}
                        ml={2}
                        className={classes.titleStyle}>
                        {course.title}
                      </H3>
                      <Box ml={2}>{course?.institute_title}</Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4} className={classes.totalEnrolled}>
                  <Box className={classes.colorGray}>
                    {messages['common.course_fee']}:
                  </Box>
                  <Typography variant={'h5'} fontWeight={'bold'}>
                    {course.course_fee
                      ? formatNumber(course.course_fee) + ' ৳'
                      : messages['common.free']}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} className={classes.courseDescription}>
              <Box mt={4} mb={4} className={classes.colorGray}>
                {course?.overview}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Grid container sx={{alignItems: 'flex-end'}}>
                <Grid item xs={8}>
                  <TagChip
                    label={courseDuration(
                      messages,
                      formatNumber,
                      course?.duration,
                    )}
                    className={classes.tagChipStyle}
                  />
                </Grid>
                {!course?.enrolled ? (
                  <Grid item xs={4} className={classes.enrollButton}>
                    {course?.enrollable ? (
                      <Link
                        href={
                          authUser
                            ? LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT + course?.id
                            : niseDomain() + LINK_YOUTH_SIGNUP
                        }
                        passHref>
                        <Button
                          variant={'contained'}
                          color={'primary'}
                          size={'medium'}>
                          {messages['common.enroll_now']}
                        </Button>
                      </Link>
                    ) : (
                      <CustomChip
                        label={messages['common.not_available']}
                        color={'primary'}
                        sx={{borderRadius: '5px', height: '35px'}}
                      />
                    )}
                  </Grid>
                ) : (
                  <Grid item xs={4} className={classes.enrollButton}>
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
                        <Button
                          variant={'contained'}
                          color={'primary'}
                          size={'medium'}>
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
                        <Button
                          variant={'contained'}
                          color={'primary'}
                          size={'medium'}>
                          {messages['common.pay_now']}
                        </Button>
                      </Link>
                    ) : (
                      <CustomChip
                        label={messages['common.already_enrolled']}
                        color={'primary'}
                        sx={{borderRadius: '5px', height: '35px'}}
                      />
                    )}
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledCard>
  );
};

export default CourseInfoBlock;
