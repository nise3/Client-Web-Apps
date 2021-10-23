import React, {FC} from 'react';
import {Box, Button, Card, CardMedia, Grid, Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../../redux/types/AppContextPropsType';
import TagChip from '../../../../@softbd/elements/display/TagChip';
import {courseDuration} from '../../../../@softbd/utilities/helpers';
import {useIntl} from 'react-intl';

interface CourseInfoBlockProps {
  course: any;
}

const useStyle = makeStyles((theme: CremaTheme) => ({
  courseBlockRoot: {
    padding: 15,
  },
  jobProviderImage: {
    borderRadius: '50%',
    height: 60,
    width: 60,
    border: '1px solid ' + theme.palette.grey['300'],
  },
  titleBox: {
    marginLeft: 10,
    paddingTop: 5,
  },
  totalEnrolled: {
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
  },
  titleStyle: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  locationStyle: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 5,
  },
  locationIcon: {
    height: 18,
    width: 18,
    margin: '0px 5px',
  },
  colorGray: {
    color: theme.palette.grey['600'],
    display: 'inline',
  },
  chipStyle: {
    borderRadius: 4,
    background: '#e4e4e4',
    marginRight: 8,
  },
  enrollButton: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  courseDescription: {
    marginTop: 15,
    marginBottom: 15,
  },
  tagChip: {
    marginBottom: 0,
  },
}));

const CourseInfoBlock: FC<CourseInfoBlockProps> = ({course}) => {
  const classes = useStyle();
  const {messages} = useIntl();

  return (
    <Card className={classes.courseBlockRoot}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2}>
          <CardMedia
            component='img'
            alt='course image'
            image={'/images/skill-matching-job1.jpg'}
            sx={{height: '100%'}}
          />
        </Grid>
        <Grid item xs={12} md={10}>
          <Grid container>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={8}>
                  <Grid container>
                    <Grid item xs={2}>
                      <CardMedia
                        component='img'
                        alt='course image'
                        image={course?.trainer_image}
                        className={classes.jobProviderImage}
                      />
                    </Grid>
                    <Grid item xs={10}>
                      <Box mt={2} ml={2} className={classes.titleStyle}>
                        {course.title}
                      </Box>
                      <Box ml={2}>{course?.trainer_name}</Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4} className={classes.totalEnrolled}>
                  <Box className={classes.colorGray}>
                    {messages['common.course_fee']}:
                  </Box>
                  <Typography variant={'h5'} fontWeight={'bold'}>
                    {course?.course_fee + ' Tk'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} className={classes.courseDescription}>
              <Box mt={4} mb={4} className={classes.colorGray}>
                {course?.overview}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Grid container sx={{alignItems: 'flex-end'}}>
                <Grid item xs={8} className={classes.tagChip}>
                  <TagChip
                    label={courseDuration(course?.duration)}
                    key={course.id}
                  />
                  <TagChip
                    label={Math.floor(Math.random() * 10 + 6) + ' lessons'}
                    key={course.id}
                  />
                </Grid>
                <Grid item xs={4} className={classes.enrollButton}>
                  <Button
                    variant={'contained'}
                    color={'primary'}
                    size={'medium'}>
                    Enroll Now
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CourseInfoBlock;
