import React, {FC, useMemo} from 'react';
import {Box, Button, Card, CardMedia, Grid, Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../../redux/types/AppContextPropsType';
import TagChip from '../../../../@softbd/elements/display/TagChip';
import {
  courseDuration,
  getModulePath,
} from '../../../../@softbd/utilities/helpers';
import {useIntl} from 'react-intl';
import Link from 'next/link';
import {LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT} from '../../../../@softbd/common/appLinks';
import {useRouter} from 'next/router';

interface CourseInfoBlockProps {
  course: any;
}

const useStyle = makeStyles((theme: CremaTheme) => ({
  courseBlockRoot: {
    padding: 15,
  },
  jobProviderImage: {
    borderRadius: '50%',
    height: 60,
    width: 60,
    border: '1px solid ' + theme.palette.grey['300'],
  },

  totalEnrolled: {
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
  },
  titleStyle: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },

  colorGray: {
    color: theme.palette.grey['600'],
    display: 'inline',
  },

  enrollButton: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  courseDescription: {
    marginTop: 15,
    marginBottom: 15,
  },
  tagChipStyle: {
    marginBottom: 0,
  },
  courseDetailsButton: {
    position: 'absolute',
    left: 19,
    top: 19,
  },
}));

const CourseInfoBlock: FC<CourseInfoBlockProps> = ({course}) => {
  const classes = useStyle();
  const {messages} = useIntl();
  const router = useRouter();

  return (
    <Card className={classes.courseBlockRoot}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2} sx={{position: 'relative'}}>
          <CardMedia
            component='img'
            alt='course image'
            image={'/images/courseImage.jpeg'}
            sx={{height: '100%'}}
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
                        alt='course image'
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
                    {course?.course_fee + ' Tk'}
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
                    label={courseDuration(course?.duration)}
                    className={classes.tagChipStyle}
                  />
                  <TagChip
                    label={useMemo(() => {
                      return (
                        Math.floor(Math.random() * 10 + 6) +
                        ' ' +
                        messages['common.lesson']
                      );
                    }, [course])}
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
    </Card>
  );
};

export default CourseInfoBlock;
