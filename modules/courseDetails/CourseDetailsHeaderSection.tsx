import React, {FC} from 'react';
import useStyle from './index.style';
import {Box, Button, CardMedia, Grid, Typography} from '@mui/material';
import TagChip from '../../@softbd/elements/display/TagChip';

interface CourseDetailsHeaderProps {
  course: any;
}

const CourseDetailsHeaderSection: FC<CourseDetailsHeaderProps> = ({course}) => {
  const classes: any = useStyle();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6}>
        <Box className={classes.courseFee}>
          Course Fees:{' '}
          <Box className={classes.courseFeeStyle}>{course.fee} TK</Box>
        </Box>
        <Typography variant={'h4'} mb={8} fontWeight={'bold'}>
          {course.title}
        </Typography>

        {(course.tags || []).map((tag: any, index: any) => {
          return <TagChip label={tag} key={index} />;
        })}
        {course.courseEnrolled && <TagChip label={course.courseEnrolled} />}
        <Box mt={4}>
          <Button variant={'contained'} color={'primary'}>
            Enroll Now
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <CardMedia image={course.logo} sx={{height: 300, width: '100%'}} />
      </Grid>
    </Grid>
  );
};

export default CourseDetailsHeaderSection;
