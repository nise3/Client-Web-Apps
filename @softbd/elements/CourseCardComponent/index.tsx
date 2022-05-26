import React, {FC} from 'react';
import {styled} from '@mui/material/styles';
import {
  Box,
  Button,
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
    display: 'flex',
    justifyContent: 'space-between',
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
  handleViewExam?: (e: any, youth_id: any, batch_id: any) => void;
  handleViewResult?: (
    e: any,
    batch_id: any,
    youth_id: any,
    batch_title: string,
  ) => void;
}

const CourseCardComponent: FC<CourseCardComponentProps> = ({
  course,
  handleViewExam,
  handleViewResult,
}) => {
  const {messages, formatNumber} = useIntl();
  const customStyle = useCustomStyle();
  const router = useRouter();
  const pathname = router.pathname;
  const isMyCoursePage = pathname.split('/').indexOf('my-courses') > -1;

  return (
    <StyledCard>
      <CardMediaImageView
        image={course?.cover_image}
        className={classes.trainingCardImage}
        title={course?.title}
        alt={course?.title}
      />
      <CardContent sx={{paddingBottom: '16px !important'}}>
        <AvatarImageView
          variant='square'
          className={classes.providerLogo}
          alt={course?.institute_title}
          src={course?.logo}
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
        {course?.exams && (
          <Box
            sx={{
              textAlign: 'center',
              paddingTop: '10px',
              display: 'flex',
              justifyContent: 'space-around',
            }}>
            {(course?.exams || course.result_published_at) && (
              <Button
                variant={'outlined'}
                size={'small'}
                onClick={(e) => {
                  if (handleViewExam) {
                    handleViewExam(e, course.youth_id, course.batch_id);
                  }
                }}>
                {messages['common.view_exam']}
              </Button>
            )}

            {course.result_published_at && (
              <Button
                variant={'outlined'}
                size={'small'}
                onClick={(e) => {
                  if (handleViewResult)
                    handleViewResult(
                      e,
                      course.batch_id,
                      course.youth_id,
                      course.batch_title,
                    );
                }}>
                {messages['education.result']}
              </Button>
            )}
          </Box>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default CourseCardComponent;
