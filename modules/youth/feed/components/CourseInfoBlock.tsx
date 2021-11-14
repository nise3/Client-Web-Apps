import React, {FC} from 'react';
import {styled} from '@mui/material/styles';
import {Box, Button, Card, CardMedia, Grid, Typography} from '@mui/material';
import TagChip from '../../../../@softbd/elements/display/TagChip';
import {
  courseDuration,
  getModulePath,
} from '../../../../@softbd/utilities/helpers';
import {useIntl} from 'react-intl';
import Link from 'next/link';
import {LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT} from '../../../../@softbd/common/appLinks';
import {useRouter} from 'next/router';

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
    borderRadius: '50%',
    height: 60,
    width: 60,
    border: '1px solid ' + theme.palette.grey['300'],
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
  },
}));

interface CourseInfoBlockProps {
  course: any;
}

const CourseInfoBlock: FC<CourseInfoBlockProps> = ({course}) => {
  const {messages, formatNumber} = useIntl();
  const router = useRouter();

  return (
    <StyledCard>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2} sx={{position: 'relative'}}>
          <CardMedia
            component='img'
            alt={course.title}
            image={'/images/courseImage.jpeg'}
            sx={{height: '100%'}}
            title={course?.title}
          />
          <Link
            href={
              getModulePath(router.asPath) + `/course-details/${course?.id}`
            }
            passHref>
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
                        image={'/images/logo1.png'}
                        className={classes.jobProviderImage}
                      />
                    </Grid>

                    <Grid item xs={10}>
                      <Box mt={2} ml={2} className={classes.titleStyle}>
                        {course.title}
                      </Box>
                      <Box ml={2}>{course?.trainer_name}</Box>
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
                  <TagChip
                    label={formatNumber(12) + ' ' + messages['common.lesson']}
                    className={classes.tagChipStyle}
                  />
                </Grid>
                <Grid item xs={4} className={classes.enrollButton}>
                  <Link
                    href={LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT + course?.id}
                    passHref>
                    <Button
                      variant={'contained'}
                      color={'primary'}
                      size={'medium'}>
                      {messages['common.enroll_now']}
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledCard>
  );
};

export default CourseInfoBlock;
