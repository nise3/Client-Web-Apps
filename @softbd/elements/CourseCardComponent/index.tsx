import React, {FC} from 'react';
import {styled} from '@mui/material/styles';
import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from '@mui/material';
import TagChip from '../../../@softbd/elements/display/TagChip';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {getCourseDuration, getIntlNumber} from '../../utilities/helpers';
import {useRouter} from 'next/router';
import {useCustomStyle} from '../../hooks/useCustomStyle';
import {H5, H6} from '../common';
import CardMediaImageView from '../display/ImageView/CardMediaImageView';
import AvatarImageView from '../display/ImageView/AvatarImageView';

const PREFIX = 'CourseCardComponent';

const classes = {
  trainingCardImage: `${PREFIX}-trainingCardImage`,
  providerLogo: `${PREFIX}-providerLogo`,
  courseFee: `${PREFIX}-courseFee`,
  courseFeeStyle: `${PREFIX}-courseFeeStyle`,
  tagBox: `${PREFIX}-tagBox`,
  courseTitle: `${PREFIX}-courseTitle`,
  overflowDottedText: `${PREFIX}-overflowDottedText`,
  overflowDottedInstituteTitle: `${PREFIX}-overflowDottedInstituteTitle`,
};

const StyledCard = styled(Card)(({theme}) => ({
  maxWidth: 345,
  minWidth: '100%',
  position: 'relative',
  height: '100%',

  [`& .${classes.trainingCardImage}`]: {
    height: 150,
    objectFit: 'unset',
  },

  [`& .${classes.providerLogo}`]: {
    height: 55,
    width: 55,
    border: '1px solid ' + theme.palette.grey['300'],
    position: 'absolute',
    top: 120,
    left: 10,
    background: theme.palette.common.white,
    '& img': {
      height: 'auto',
      objectFit: 'unset',
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
  [`& .${classes.overflowDottedInstituteTitle}`]: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

interface CourseCardComponentProps {
  course: any;
}

const CourseCardComponent: FC<CourseCardComponentProps> = ({course}) => {
  const {messages, formatNumber} = useIntl();
  const customStyle = useCustomStyle();
  const router = useRouter();
  const pathname = router.pathname;
  const isMyCoursePage = pathname.split('/').indexOf('my-courses') > -1;

  return (
    <StyledCard>
      <CardMediaImageView
        image={
          course?.cover_image ? course?.cover_image : '/images/blank_image.png'
        }
        className={classes.trainingCardImage}
        title={course.title}
        alt={course.title}
      />
      <CardContent sx={{paddingBottom: '16px !important'}}>
        <AvatarImageView
          variant='square'
          className={classes.providerLogo}
          alt={course?.institute_title}
          src={course?.logo ? course?.logo : '/images/blank_image.png'}
        />
        <Box className={classes.courseFee}>
          {messages['common.course_fee']}:
          <Box className={classes.courseFeeStyle}>
            {course.course_fee
              ? formatNumber(course.course_fee) + ' ৳'
              : messages['common.free']}
          </Box>
        </Box>

        <Box>
          <H5
            fontWeight={'bold'}
            title={course.title}
            className={classes.overflowDottedText}
            sx={{
              ...customStyle.h6,
            }}>
            {course.title}
          </H5>
        </Box>

        <Box marginTop={'5px'} minHeight={'50px'}>
          <H6
            fontWeight={'bold'}
            title={course.institute_title}
            className={classes.overflowDottedInstituteTitle}
            sx={{
              ...customStyle.body1,
            }}>
            {course.institute_title}
          </H6>
        </Box>

        <Box className={classes.tagBox}>
          {course?.duration && (
            <TagChip
              label={getCourseDuration(course.duration, formatNumber, messages)}
            />
          )}
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
