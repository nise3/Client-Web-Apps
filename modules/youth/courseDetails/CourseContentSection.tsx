import React, {FC, useRef, useState} from 'react';
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
import useStyle from './index.style';
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
  courseDuration,
  getIntlNumber,
} from '../../../@softbd/utilities/helpers';

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
  const classes = useStyle();
  const {messages, formatNumber} = useIntl();

  const [value, setValue] = useState<string>(CourseDetailsTabs.TAB_OVERVIEW);
  const overviewRef = useRef<any>();
  const lessonRef = useRef<any>();
  const requirementRef = useRef<any>();
  const trainerRef = useRef<any>();

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
    }
  };

  return (
    <TabContext value={value}>
      <Container maxWidth={'lg'}>
        <TabList
          aria-label='tabs'
          onChange={handleChange}
          sx={{background: '#e6f3ec'}}>
          <Tab
            label={messages['course_details.overview']}
            value={CourseDetailsTabs.TAB_OVERVIEW}
          />
          <Tab
            label={messages['course_details.lesson']}
            value={CourseDetailsTabs.TAB_LESSON}
          />
          <Tab
            label={messages['course_details.requirements']}
            value={CourseDetailsTabs.TAB_REQUIREMENTS}
          />
          <Tab
            label={messages['course_details.trainer']}
            value={CourseDetailsTabs.TAB_TRAINER}
          />
        </TabList>
      </Container>

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
            <Divider
              orientation='vertical'
              flexItem
              className={classes.dividerStyle}
            />
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
            <Divider
              orientation='vertical'
              flexItem
              className={classes.dividerStyle}
            />
            <Grid item>
              <Box
                className={clsx(
                  classes.dFlexAlignCenter,
                  classes.courseBadgeBox,
                )}>
                <Alarm className={classes.courseBadgeIcon} />
                <Box>
                  <Box className={classes.courseBadgeTitle}>
                    {courseDuration(messages, formatNumber, course?.duration)}
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box ref={overviewRef} className={classes.boxMargin}>
            <Box className={classes.sectionTitleStyle}>
              {messages['course_details.overview']}
            </Box>

            <Typography sx={{paddingTop: 4}}>{course?.objectives}</Typography>
          </Box>

          <Box ref={lessonRef} style={{marginTop: 20, marginBottom: 20}}>
            <Box className={classes.sectionTitleStyle}>
              {messages['course_details.lesson']}
            </Box>
            <Box style={{display: 'flex', alignItems: 'center'}}>
              {course?.duration && (
                <Typography>
                  {courseDuration(messages, formatNumber, course?.duration)}
                </Typography>
              )}
              {course?.total_enrolled && (
                <Typography>
                  {course?.duration ? ', ' : ''}
                  <IntlMessages
                    id={'course_details.enrolled'}
                    values={{
                      total: getIntlNumber(formatNumber, course.total_enrolled),
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
            <Box>
              <Box className={classes.sectionTitleStyle}>
                {messages['course_details.assisment_method']}
              </Box>
              <Typography>{course?.evaluation_system}</Typography>
            </Box>
          </Box>

          <Box ref={requirementRef} className={classes.boxMargin}>
            <Box className={classes.sectionTitleStyle}>
              {messages['course_details.requirements']}
            </Box>
            <Box>
              <Typography>{course?.prerequisite}</Typography>
            </Box>
          </Box>

          <Box ref={trainerRef} className={classes.boxMargin}>
            <Box className={classes.sectionTitleStyle}>
              {messages['course_details.trainer']}
            </Box>
            {course?.trainers &&
              course.trainers.map((trainer: any, index: number) => (
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
                            trainer?.trainer_name || trainer?.trainer_name_en,
                        }}
                      />
                    </Link>
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
      </Container>
    </TabContext>
  );
};

export default CourseContentSection;
