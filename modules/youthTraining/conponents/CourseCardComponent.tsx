import React, {FC} from 'react';
import {Avatar, Box, Card, CardContent, CardMedia} from '@mui/material';
import useStyles from '../index.style';
import TagChip from '../../../@softbd/elements/display/TagChip';

interface CourseCardComponentProps {
  course: any;
}

const CourseCardComponent: FC<CourseCardComponentProps> = ({course}) => {
  const classes = useStyles();
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
          Course Fees:{' '}
          <Box className={classes.courseFeeStyle}>{course.fee} TK</Box>
        </Box>
        <Box fontWeight={'bold'}>{course.title}</Box>
        <Box marginTop={'5px'}>
          By: {course.providerName} &#8226; {course.createDate}
        </Box>

        <Box className={classes.tagBox}>
          {(course.tags || []).map((tag: any, index: any) => {
            return <TagChip label={tag} key={index} />;
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CourseCardComponent;
