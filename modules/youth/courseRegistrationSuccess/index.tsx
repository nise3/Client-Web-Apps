import React from 'react';

import {Box, Button, CardMedia, Container, Typography} from '@mui/material';
import useStyles from './index.style';
import {useRouter} from 'next/router';
import {Link} from '../../../@softbd/elements/common';
import {LINK_FRONTEND_YOUTH_COURSE_DETAILS} from '../../../@softbd/common/appLinks';

const YouthCourseRegistrationSuccessPage = () => {
  const classes: any = useStyles();
  const router = useRouter();
  const {courseId} = router.query;

  return (
    <Container maxWidth={'xl'} className={classes.rootContainer}>
      <Box sx={{textAlign: 'center', margin: 'auto', maxWidth: '700px'}}>
        <CardMedia
          component='img'
          alt='green iguana'
          height='350'
          image='/images/success.png'
        />
        <Typography
          variant={'h5'}
          align={'center'}
          style={{marginTop: '10px', marginBottom: '10px'}}>
          Congratulations!You have enrolled your course!
        </Typography>
        <Link href={LINK_FRONTEND_YOUTH_COURSE_DETAILS + courseId}>
          <Button color='primary' variant={'contained'}>
            Go to Course
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default YouthCourseRegistrationSuccessPage;
