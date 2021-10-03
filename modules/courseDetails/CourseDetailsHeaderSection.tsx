import React, {FC} from 'react';
import useStyle from './index.style';
import {Box, CardMedia, Container, Grid, Typography} from '@mui/material';
import TagChip from '../../@softbd/elements/display/TagChip';

interface CourseDetailsHeaderProps {
  course: any;
}

const CourseDetailsHeaderSection: FC<CourseDetailsHeaderProps> = ({course}) => {
  const classes: any = useStyle();

  return (
    <Box className={classes.headerRoot}>
      <Container maxWidth={'xl'}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <Box className={classes.courseFee}>
              Course Fees:{' '}
              <Box className={classes.courseFeeStyle}>{course.fee} TK</Box>
            </Box>
            <Typography variant={'h4'} className={classes.courseHeaderTitle}>
              {course.title}
            </Typography>

            {(course.tags || []).map((tag: any, index: any) => {
              return <TagChip label={tag} key={index} />;
            })}
            {course.courseEnrolled && <TagChip label={course.courseEnrolled} />}
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CardMedia image={course.logo} className={classes.headerImage} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CourseDetailsHeaderSection;
