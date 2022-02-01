import React, {FC, useRef, useState} from 'react';
import {styled} from '@mui/material/styles';
import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tab,
  Typography,
} from '@mui/material';
import {TabContext, TabList} from '@mui/lab';
import {
  Alarm,
  CardMembership,
  Language,
  PlayCircleOutline,
} from '@mui/icons-material';
import clsx from 'clsx';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CourseDetailsTabs from './CourseDetailsTabs';
import {
  getCourseDuration,
  getIntlNumber,
} from '../../../@softbd/utilities/helpers';

const PREFIX = 'CourseContentSection';

const classes = {
  sectionTitleStyle: `${PREFIX}-sectionTitleStyle`,
  dFlexAlignCenter: `${PREFIX}-dFlexAlignCenter`,
  courseBadgeBox: `${PREFIX}-courseBadgeBox`,
  courseBadgeIcon: `${PREFIX}-courseBadgeIcon`,
  courseBadgeTitle: `${PREFIX}-courseBadgeTitle`,
  dividerStyle: `${PREFIX}-dividerStyle`,
  boxMargin: `${PREFIX}-boxMargin`,
  lessonBox: `${PREFIX}-lessonBox`,
  listStyle: `${PREFIX}-listStyle`,
  listItem: `${PREFIX}-listItem`,
  trainerBox: `${PREFIX}-trainerBox`,
  trainerNameAndAboutBox: `${PREFIX}-trainerNameAndAboutBox`,
};

const StyledBox = styled(Box)(({theme}) => ({
  [`& .${classes.sectionTitleStyle}`]: {
    fontSize: '1rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: theme.palette.primary.main,
  },

  [`& .${classes.dFlexAlignCenter}`]: {
    display: 'flex',
    alignItems: 'center',
  },

  [`& .${classes.courseBadgeBox}`]: {
    color: '#999',
  },

  [`& .${classes.courseBadgeIcon}`]: {
    height: 60,
    width: 60,
    marginRight: 15,
  },

  [`& .${classes.courseBadgeTitle}`]: {
    color: '#161616',
    fontWeight: 'bold',
  },

  [`&  .${classes.boxMargin}`]: {
    marginTop: 20,
    marginBottom: 25,
  },

  [`& .${classes.lessonBox}`]: {
    maxWidth: '600px',
    border: '1px solid #e9e9e9',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
  },

  [`& .${classes.listStyle}`]: {
    padding: 0,
    background: '#fbfbf8',
    borderRadius: 5,
  },

  [`& .${classes.listItem}`]: {
    '& .MuiListItemText-primary': {
      display: 'inline-block',
      width: '70%',
    },
    '& .MuiListItemText-secondary': {
      display: 'inline-block',
      float: 'right',
      width: '30%',
      textAlign: 'right',
    },
  },

  [`& .${classes.trainerBox}`]: {
    marginTop: 20,
    marginBottom: 20,
  },

  [`& .${classes.trainerNameAndAboutBox}`]: {
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'column',
  },
}));

const StyledDividerStyle = styled(Divider)(({theme}) => ({
  margin: '10px 30px',
  borderWidth: 1,
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

interface CourseContentProps {
  course: any;
}

const lessonsList = [
  {
    name: 'Introduction',
    duration: '6.22',
  },
  {
    name: 'Started with python',
    duration: '6.22',
  },
  {
    name: 'Data Types',
    duration: '6.22',
  },
  {
    name: 'Operation with data types',
    duration: '6.22',
  },
];

const CourseContentSection: FC<CourseContentProps> = ({course}) => {
  const {messages, formatNumber} = useIntl();

  const [value, setValue] = useState<string>(CourseDetailsTabs.TAB_OVERVIEW);
  const overviewRef = useRef<any>();
  const lessonRef = useRef<any>();
  const assessmentMethodRef = useRef<any>();
  const requirementRef = useRef<any>();
  const objectiveRef = useRef<any>();
  const eligibilityRef = useRef<any>();
  const targetGroupRef = useRef<any>();
  const trainerRef = useRef<any>();
  const trainingMethodologyRef = useRef<any>();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);

    switch (newValue) {
      case CourseDetailsTabs.TAB_OVERVIEW:
        overviewRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        break;
      case CourseDetailsTabs.TAB_LESSON:
        lessonRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        break;
      case CourseDetailsTabs.TAB_EVALUATION_SYSTEM:
        assessmentMethodRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        break;
      case CourseDetailsTabs.TAB_REQUIREMENTS:
        requirementRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        break;
      case CourseDetailsTabs.TAB_TRAINER:
        trainerRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        break;
      case CourseDetailsTabs.TAB_TRAINING_METHODOLOGY:
        trainingMethodologyRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        break;
      case CourseDetailsTabs.TAB_OBJECTIVE:
        objectiveRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        break;

      case CourseDetailsTabs.TAB_ELIGIBILITY:
        eligibilityRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        break;

      case CourseDetailsTabs.TAB_TARGET_GROUP:
        targetGroupRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        break;
    }
  };

  return (
    <StyledBox>
      <TabContext value={value}>
        <Box sx={{background: '#e6f3ec'}}>
          <Container maxWidth={'lg'}>
            <TabList
              aria-label='tabs'
              onChange={handleChange}
              variant='scrollable'
              scrollButtons='auto'>
              <Tab
                label={messages['course_details.overview']}
                value={CourseDetailsTabs.TAB_OVERVIEW}
              />
              <Tab
                label={messages['course_details.lesson']}
                value={CourseDetailsTabs.TAB_LESSON}
              />
              <Tab
                label={messages['course_details.objective']}
                value={CourseDetailsTabs.TAB_OBJECTIVE}
              />
              <Tab
                label={messages['course_details.assessment_method']}
                value={CourseDetailsTabs.TAB_EVALUATION_SYSTEM}
              />
              <Tab
                label={messages['course_details.target_group']}
                value={CourseDetailsTabs.TAB_TARGET_GROUP}
              />
              <Tab
                label={messages['course_details.requirements']}
                value={CourseDetailsTabs.TAB_REQUIREMENTS}
              />
              <Tab
                label={messages['course_details.training_methodology']}
                value={CourseDetailsTabs.TAB_TRAINING_METHODOLOGY}
              />
              <Tab
                label={messages['course_details.eligibility']}
                value={CourseDetailsTabs.TAB_ELIGIBILITY}
              />
              <Tab
                label={messages['course_details.trainer']}
                value={CourseDetailsTabs.TAB_TRAINER}
              />
            </TabList>
          </Container>
        </Box>

        <Container maxWidth={'lg'}>
          <Box>
            <Grid container className={classes.boxMargin}>
              <Grid item>
                <Box
                  className={clsx(
                    classes.dFlexAlignCenter,
                    classes.courseBadgeBox,
                  )}>
                  <CardMembership className={classes.courseBadgeIcon} />
                  <Box>
                    <Box className={classes.courseBadgeTitle}>
                      {messages['common.certificate']}
                    </Box>
                    <Box>{messages['course_details.earn_certificate']}</Box>
                  </Box>
                </Box>
              </Grid>

              <StyledDividerStyle orientation='vertical' flexItem />
              <Grid item>
                <Box
                  className={clsx(
                    classes.dFlexAlignCenter,
                    classes.courseBadgeBox,
                  )}>
                  <Language className={classes.courseBadgeIcon} />
                  <Box>
                    <Box className={classes.courseBadgeTitle}>
                      {messages['course_details.online_100_percent']}
                    </Box>
                    <Box>{messages['course_details.start_instantly']}</Box>
                  </Box>
                </Box>
              </Grid>
              <StyledDividerStyle orientation='vertical' flexItem />
              <Grid item>
                <Box
                  className={clsx(
                    classes.dFlexAlignCenter,
                    classes.courseBadgeBox,
                  )}>
                  <Alarm className={classes.courseBadgeIcon} />
                  <Box>
                    <Box className={classes.courseBadgeTitle}>
                      {getCourseDuration(
                        course?.duration,
                        formatNumber,
                        messages,
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Box ref={overviewRef} className={classes.boxMargin}>
              <h2 className={classes.sectionTitleStyle}>
                {messages['course_details.overview']}
              </h2>
              {course?.overview ? (
                <Typography sx={{paddingTop: 4}}>{course?.overview}</Typography>
              ) : (
                messages['common.no_data_found']
              )}
            </Box>

            <Box ref={lessonRef} style={{marginTop: 20, marginBottom: 20}}>
              <h2 className={classes.sectionTitleStyle}>
                {messages['course_details.lesson']}
              </h2>
              <Box style={{display: 'flex', alignItems: 'center'}}>
                {course?.duration && (
                  <Typography>
                    {getCourseDuration(course.duration, formatNumber, messages)}
                  </Typography>
                )}
                {course?.enroll_count > 0 && (
                  <Typography>
                    {course?.duration ? ', ' : ''}
                    <IntlMessages
                      id={'course_details.enrolled'}
                      values={{
                        total: getIntlNumber(formatNumber, course.enroll_count),
                      }}
                    />{' '}
                  </Typography>
                )}
              </Box>

              <Grid container>
                <Grid item xs={12} sm={8} md={7} className={classes.lessonBox}>
                  <List dense={false} className={classes.listStyle}>
                    {(lessonsList || []).map((lesson: any, index: any) => {
                      return (
                        <React.Fragment key={index}>
                          {index != 0 && <Divider />}
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <PlayCircleOutline />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              className={classes.listItem}
                              primary={lesson.name}
                              secondary={lesson.duration + ' minutes'}
                            />
                          </ListItem>
                        </React.Fragment>
                      );
                    })}
                  </List>
                </Grid>
              </Grid>
            </Box>

            <Box ref={objectiveRef} className={classes.boxMargin}>
              <h2 className={classes.sectionTitleStyle}>
                {messages['course_details.objective']}
              </h2>
              <Box>
                {course?.objective ? (
                  <Typography>{course?.objective}</Typography>
                ) : (
                  messages['common.no_data_found']
                )}
              </Box>
            </Box>

            <Box ref={assessmentMethodRef}>
              <h2 className={classes.sectionTitleStyle}>
                {messages['course_details.assessment_method']}
              </h2>
              {course?.evaluation_system ? (
                <Typography>{course?.evaluation_system}</Typography>
              ) : (
                messages['common.no_data_found']
              )}
            </Box>

            <Box ref={requirementRef} className={classes.boxMargin}>
              <h2 className={classes.sectionTitleStyle}>
                {messages['course_details.requirements']}
              </h2>
              <Box>
                {course?.prerequisite ? (
                  <Typography>{course?.prerequisite}</Typography>
                ) : (
                  messages['common.no_data_found']
                )}
              </Box>
            </Box>

            <Box ref={eligibilityRef} className={classes.boxMargin}>
              <h2 className={classes.sectionTitleStyle}>
                {messages['course_details.eligibility']}
              </h2>
              <Box>
                {course?.eligibility ? (
                  <Typography>{course?.eligibility}</Typography>
                ) : (
                  messages['common.no_data_found']
                )}
              </Box>
            </Box>

            <Box ref={targetGroupRef} className={classes.boxMargin}>
              <h2 className={classes.sectionTitleStyle}>
                {messages['course_details.target_group']}
              </h2>
              <Box>
                {course?.target_group ? (
                  <Typography>{course?.target_group}</Typography>
                ) : (
                  messages['common.no_data_found']
                )}
              </Box>
            </Box>

            <Box ref={trainingMethodologyRef} className={classes.boxMargin}>
              <h2 className={classes.sectionTitleStyle}>
                {messages['course_details.training_methodology']}
              </h2>
              <Box>
                {course?.training_methodology ? (
                  <Typography>{course?.training_methodology}</Typography>
                ) : (
                  messages['common.no_data_found']
                )}
              </Box>
            </Box>

            <Box ref={trainerRef} className={classes.boxMargin}>
              <h2 className={classes.sectionTitleStyle}>
                {messages['course_details.trainer']}
              </h2>
              {course?.trainers && course.trainers.length > 1
                ? course.trainers.map((trainer: any, index: number) => (
                    <Box
                      key={index}
                      className={clsx(
                        classes.dFlexAlignCenter,
                        classes.trainerBox,
                      )}>
                      <Avatar
                        sx={{height: 60, width: 60}}
                        src={
                          'http://lorempixel.com/80/80?id=1' +
                          trainer?.trainer_name_en
                        }
                      />
                      <Box className={classes.trainerNameAndAboutBox}>
                        <Box fontWeight={'bold'}>
                          {trainer?.trainer_name || trainer?.trainer_name_en}
                        </Box>
                        <Typography variant={'caption'}>
                          {trainer?.about}
                        </Typography>
                        <Link
                          href={'#more-courses'}
                          style={{textDecoration: 'none'}}>
                          <IntlMessages
                            id='course_details.view_more_courses_by'
                            values={{
                              subject:
                                trainer?.trainer_name ||
                                trainer?.trainer_name_en,
                            }}
                          />
                        </Link>
                      </Box>
                    </Box>
                  ))
                : messages['common.no_data_found']}
            </Box>
          </Box>
        </Container>
      </TabContext>
    </StyledBox>
  );
};

export default CourseContentSection;
