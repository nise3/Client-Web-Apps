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
import {makeStyles} from '@mui/styles';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Link from 'next/link';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';

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
    marginTop: 15,
  },
  courseTitle: {
    fontWeight: 'bold',
    color: '#424242',
    textDecoration: 'none',
  },
}));

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
        image={course.cover_image}
        title={course.title}
      />
      <CardContent>
        <Avatar
          className={classes.providerLogo}
          alt={course?.institute_name}
          src={course.providerLogo}
        />
        <Box className={classes.courseFee}>
          {messages['common.course_fee']}:
          <Box className={classes.courseFeeStyle}>{course.course_fee} TK</Box>
        </Box>

        {/*<Link
          className={classes.courseTitle}
          href={'./course-details/' + course.id}
          fontWeight={'bold'}>
          {course.title}
        </Link>*/}
        <Link
          href={'../../youth/course-details/__'.replace('__', course.id)}
          passHref>
          <Box fontWeight={'bold'}>{course.title}</Box>
        </Link>

        <Box marginTop={'5px'}>
          By: {course.institute_title} &#8226; {course.created_at}
        </Box>

        <Box className={classes.tagBox}>
          {course?.duration && <TagChip label={course.duration} />}
          <TagChip label={'22 lessons'} />
        </Box>

        <Box className={classes.tagBox}>
          {(course.tags || []).map((tag: any, index: any) => {
            return <TagChip label={tag} key={index} />;
          })}
        </Box>

        {course.progress && (
          <Box sx={{width: '100%', marginTop: '10px'}}>
            <LinearProgress variant='determinate' value={course.id} />
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
