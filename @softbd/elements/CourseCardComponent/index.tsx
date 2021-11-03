import React, {FC} from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
  Typography,
} from '@mui/material';
import TagChip from '../../../@softbd/elements/display/TagChip';
import {makeStyles} from '@mui/styles';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';
import {courseDuration} from '../../utilities/helpers';
import {useRouter} from 'next/router';

const useStyles = makeStyles((theme: CremaTheme) => ({
  trainingCardRoot: {
    maxWidth: 345,
    minWidth: '100%',
    position: 'relative',
  },
  trainingCardImage: {
    height: 140,
  },
  providerLogo: {
    height: 55,
    width: 55,
    border: '1px solid ' + theme.palette.grey['300'],
    position: 'absolute',
    top: 110,
    left: 10,
  },
  courseFee: {
    textTransform: 'uppercase',
    marginTop: 20,
    display: 'flex',
    marginBottom: 5,
  },
  courseFeeStyle: {
    marginLeft: 10,
    color: theme.palette.primary.main,
  },
  tagBox: {
    marginTop: 5,
  },
  courseTitle: {
    fontWeight: 'bold',
    color: '#424242',
    textDecoration: 'none',
  },
  overflowDottedText: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
}));

interface CourseCardComponentProps {
  course: any;
}

const CourseCardComponent: FC<CourseCardComponentProps> = ({course}) => {
  const classes = useStyles();
  const {messages} = useIntl();
  const router = useRouter();
  const pathname = router.pathname;
  const isMyCoursePage = pathname.split('/').indexOf('my-courses') > -1;

  return (
    <Card className={classes.trainingCardRoot}>
      <CardMedia
        component={'img'}
        className={classes.trainingCardImage}
        image={'http://lorempixel.com/400/200?id=' + course?.id}
        title={course.title}
        alt={course.title}
      />
      <CardContent sx={{paddingBottom: '16px !important'}}>
        <Avatar
          variant='square'
          className={classes.providerLogo}
          alt={course?.institute_title}
          src={'http://lorempixel.com/400/200?id=1' + course?.id}
        />
        <Box className={classes.courseFee}>
          {messages['common.course_fee']}:
          <Box className={classes.courseFeeStyle}>{course.course_fee} ৳</Box>
        </Box>

        <Box
          fontWeight={'bold'}
          title={course.title}
          className={classes.overflowDottedText}>
          {course.title}
        </Box>

        <Box
          marginTop={'5px'}
          title={course.institute_title}
          className={classes.overflowDottedText}>
          {messages['common.institute_name']}: {course.institute_title}
        </Box>

        <Box className={classes.tagBox}>
          {course?.duration && (
            <TagChip label={courseDuration(course.duration)} />
          )}
          <TagChip
            label={
              Math.floor(Math.random() * 10 + 6) +
              ' ' +
              messages['common.lesson']
            }
          />
        </Box>

        {isMyCoursePage && course?.total_enroll && (
          <Typography>{course?.total_enroll + ' Student'}</Typography>
        )}

        {course.progress && (
          <Box sx={{width: '100%', marginTop: '10px'}}>
            <LinearProgress variant='determinate' value={course.progress} />
            <Box>
              <IntlMessages
                id='course_card.complete'
                values={{subject: course.progress + '%'}}
              />
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseCardComponent;
