import React, {FC} from 'react';
import useStyle from './index.style';
import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import TagChip from '../../../@softbd/elements/display/TagChip';
import {useIntl} from 'react-intl';
import {courseDuration} from '../../../@softbd/utilities/helpers';
import {Link} from '../../../@softbd/elements/common';
import {LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT} from '../../../@softbd/common/appLinks';

interface CourseDetailsHeaderProps {
  course: any;
}

const CourseDetailsHeaderSection: FC<CourseDetailsHeaderProps> = ({course}) => {
  const classes: any = useStyle();
  const {messages} = useIntl();

  return (
    <Container maxWidth={'lg'}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <Box className={classes.courseFee}>
            {messages['common.course_fee']}:{' '}
            <Box className={classes.courseFeeStyle}>
              {course?.course_fee || 'free'}
            </Box>
          </Box>
          <Typography variant={'h4'} mb={8} fontWeight={'bold'}>
            {course?.title}
          </Typography>
          {course?.duration && (
            <TagChip label={courseDuration(course?.duration)} />
          )}
          {course?.total_enrolled && (
            <TagChip label={course?.total_enrolled + ' Enrolled'} />
          )}

          <Box mt={4}>
            <Link href={LINK_FRONTEND_YOUTH_COURSE_ENROLLMENT + course?.id}>
              <Button variant={'contained'} color={'primary'}>
                {messages['common.enroll_now']}
              </Button>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CardMedia
            image={'http://lorempixel.com/400/200?id=' + course?.id}
            sx={{height: 300, width: '100%'}}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CourseDetailsHeaderSection;
