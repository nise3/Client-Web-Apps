import React, {FC} from 'react';
import {styled} from '@mui/material/styles';
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
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {courseDuration, getIntlNumber} from '../../utilities/helpers';
import {useRouter} from 'next/router';

const PREFIX = 'CourseCardComponent';

const classes = {
  trainingCardImage: `${PREFIX}-trainingCardImage`,
  providerLogo: `${PREFIX}-providerLogo`,
  courseFee: `${PREFIX}-courseFee`,
  courseFeeStyle: `${PREFIX}-courseFeeStyle`,
  tagBox: `${PREFIX}-tagBox`,
  courseTitle: `${PREFIX}-courseTitle`,
  overflowDottedText: `${PREFIX}-overflowDottedText`,
};

const StyledCard = styled(Card)(({theme}) => ({
  maxWidth: 345,
  minWidth: '100%',
  position: 'relative',
  height: '100%',

  [`& .${classes.trainingCardImage}`]: {
    height: 140,
  },

  [`& .${classes.providerLogo}`]: {
    height: 55,
    width: 55,
    border: '1px solid ' + theme.palette.grey['300'],
    position: 'absolute',
    top: 110,
    left: 10,
    background: theme.palette.common.white,
    '& img': {
      height: 'auto',
    },
  },

  [`& .${classes.courseFee}`]: {
    textTransform: 'uppercase',
    marginTop: 20,
    display: 'flex',
    marginBottom: 5,
  },

  [`& .${classes.courseFeeStyle}`]: {
    marginLeft: 10,
    color: theme.palette.primary.main,
  },

  [`& .${classes.tagBox}`]: {
    marginTop: 5,
  },

  [`& .${classes.courseTitle}`]: {
    fontWeight: 'bold',
    color: '#424242',
    textDecoration: 'none',
  },

  [`& .${classes.overflowDottedText}`]: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
}));

interface CourseCardComponentProps {
  course: any;
}

const CourseCardComponent: FC<CourseCardComponentProps> = ({course}) => {
  const {messages, formatNumber} = useIntl();
  const router = useRouter();
  const pathname = router.pathname;
  const isMyCoursePage = pathname.split('/').indexOf('my-courses') > -1;

  return (
    <StyledCard>
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
          <Box className={classes.courseFeeStyle}>
            {course.course_fee
              ? formatNumber(course.course_fee) + ' ৳'
              : messages['common.free']}
          </Box>
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
            <TagChip
              label={courseDuration(messages, formatNumber, course.duration)}
            />
          )}
          <TagChip label={formatNumber(15) + ' ' + messages['common.lesson']} />
        </Box>

        {isMyCoursePage && course?.total_enroll && (
          <Typography>
            <IntlMessages
              id={'course_details.enrolled'}
              values={{
                total: getIntlNumber(formatNumber, course.total_enroll),
              }}
            />
          </Typography>
        )}

        {!isNaN(course.progress) && (
          <Box sx={{width: '100%', marginTop: '10px'}}>
            <LinearProgress variant='determinate' value={course.progress} />
            <Box>
              <IntlMessages
                id='course_card.complete'
                values={{subject: formatNumber(course.progress) + '%'}}
              />
            </Box>
          </Box>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default CourseCardComponent;
