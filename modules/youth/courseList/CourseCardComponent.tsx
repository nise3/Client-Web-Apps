import React, {FC} from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
} from '@mui/material';
import TagChip from '../../../@softbd/elements/display/TagChip';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useStyles from './index.style';

interface CourseCardComponentProps {
  course: any;
}

const CourseCardComponent: FC<CourseCardComponentProps> = ({course}) => {
  const classes = useStyles();
  const {messages} = useIntl();

  return (
    <Card className={classes.trainingCardRoot}>
      <CardMedia
        className={classes.trainingCardImage}
        image={course.image}
        title={course.title}
      />
      <CardContent>
        <Avatar
          className={classes.providerLogo}
          alt={course.providerName}
          src={course.providerLogo}
        />
        <Box className={classes.courseFee}>
          {messages['common.course_fee']}:
          <Box className={classes.courseFeeStyle}>{course.fee} TK</Box>
        </Box>
        <Box fontWeight={'bold'}>{course.title}</Box>
        {/*<Link
          className={classes.courseTitle}
          href={'./course-details/' + course.id}
          fontWeight={'bold'}>
          {course.title}
        </Link>*/}
        <Box marginTop={'5px'}>
          By: {course.providerName} &#8226; {course.createDate}
        </Box>

        <Box className={classes.tagBox}>
          {(course.tags || []).map((tag: any, index: any) => {
            return <TagChip label={tag} key={index} />;
          })}
        </Box>

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
