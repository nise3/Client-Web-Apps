import React, {FC} from 'react';
import useStyle from './index.style';
import {Box, Button, CardMedia, Grid, Typography} from '@mui/material';
import TagChip from '../../../@softbd/elements/display/TagChip';
import {useIntl} from 'react-intl';
import {courseDuration} from '../../../@softbd/utilities/helpers';

interface CourseDetailsHeaderProps {
  course: any;
}

const CourseDetailsHeaderSection: FC<CourseDetailsHeaderProps> = ({course}) => {
  const classes: any = useStyle();
  const {messages} = useIntl();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6}>
        <Box className={classes.courseFee}>
          {messages['common.course_fee']}:{' '}
          <Box className={classes.courseFeeStyle}>{course?.course_fee}</Box>
        </Box>
        <Typography variant={'h4'} mb={8} fontWeight={'bold'}>
          {course?.title}
        </Typography>
        {course?.duration && (
          <TagChip label={courseDuration(course.duration)} />
        )}
        {course?.total_enrolled && (
          <TagChip label={course?.total_enrolled + ' Enrolled'} />
        )}

        <Box mt={4}>
          <Button variant={'contained'} color={'primary'}>
            {messages['common.enroll_now']}
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <CardMedia image={course?.logo} sx={{height: 300, width: '100%'}} />
      </Grid>
    </Grid>
  );
};

export default CourseDetailsHeaderSection;
