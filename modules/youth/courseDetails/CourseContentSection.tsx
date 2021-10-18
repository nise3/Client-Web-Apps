import React, {FC, useRef, useState} from 'react';
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
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

interface CourseContentProps {
  course: any;
}

const CourseContentSection: FC<CourseContentProps> = ({course}) => {
  const classes = useStyle();
  const {messages} = useIntl();

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
      <Box sx={{background: '#e6f3ec'}}>
        <TabList aria-label='tabs' onChange={handleChange}>
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
      </Box>

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
                  <IntlMessages
                    id='course_details.months_to_complete'
                    values={{subject: 6}}
                  />
                </Box>
                <Box>3 {messages['course_details.hours_per_weeks']}</Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box ref={overviewRef} className={classes.boxMargin}>
          <Box className={classes.sectionTitleStyle}>
            {messages['course_details.overview']}
          </Box>
          <Typography variant={'h6'} fontWeight={'bold'}>
            Explore how Physical Computing is Changing Tech
          </Typography>
          <Typography sx={{paddingTop: 4}}>{course?.objectives}</Typography>
        </Box>

        <Box ref={lessonRef} style={{marginTop: 20, marginBottom: 20}}>
          <Box className={classes.sectionTitleStyle}>
            {messages['course_details.lesson']}
          </Box>
          <Box style={{display: 'flex', alignItems: 'center'}}>
            {(course.tags || []).map((tag: any, index: any) => {
              return index == 0 ? (
                <Typography key={index}> {tag} </Typography>
              ) : (
                <Typography key={index}>&nbsp;&#8226; {tag}</Typography>
              );
            })}
          </Box>

          <Grid container>
            <Grid item xs={12} sm={8} md={7} className={classes.lessonBox}>
              <List dense={false} className={classes.listStyle}>
                {(course.lessonsList || []).map((lesson: any, index: any) => {
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
            <List className={classes.ulList}>
              <ListItem className='list-item'>
                <ListItemIcon className='list-item-bullet-large'>
                  &#8226;
                </ListItemIcon>
                <ListItemText primary={'Lesson Quiz'} />
              </ListItem>
              <ListItem className='list-item'>
                <ListItemIcon className='list-item-bullet-large'>
                  &#8226;
                </ListItemIcon>
                <ListItemText primary={'Online MCQ 50 Marks'} />
              </ListItem>
            </List>
          </Box>
        </Box>

        <Box ref={requirementRef} className={classes.boxMargin}>
          <Box className={classes.sectionTitleStyle}>
            {messages['course_details.requirements']}
          </Box>
          <Box>
            <List className={classes.ulList}>
              <ListItem className='list-item'>
                <ListItemIcon className='list-item-bullet-small'>
                  &#8226;
                </ListItemIcon>
                <ListItemText primary={'A Computer Windows, Mac , or Linux'} />
              </ListItem>
              <ListItem className='list-item'>
                <ListItemIcon className='list-item-bullet-small'>
                  &#8226;
                </ListItemIcon>
                <ListItemText
                  primary={'No prior knowledge of Python is required'}
                />
              </ListItem>
              <ListItem className='list-item'>
                <ListItemIcon className='list-item-bullet-small'>
                  &#8226;
                </ListItemIcon>
                <ListItemText
                  primary={'No previous programming experience needed'}
                />
              </ListItem>
            </List>
          </Box>
        </Box>

        <Box ref={trainerRef} className={classes.boxMargin}>
          <Box className={classes.sectionTitleStyle}>
            {messages['course_details.trainer']}
          </Box>
          {course?.trainers.map((trainer: any) => (
            <Box className={clsx(classes.dFlexAlignCenter, classes.trainerBox)}>
              <Avatar
                sx={{height: 60, width: 60}}
                src={course.trainer?.image}
              />
              <Box className={classes.trainerNameAndAboutBox}>
                <Box fontWeight={'bold'}>
                  {trainer?.first_name + ' ' + trainer?.last_name}
                </Box>
                <Typography variant={'caption'}>{trainer?.about}</Typography>
                <Link href={'#more-courses'} style={{textDecoration: 'none'}}>
                  <IntlMessages
                    id='course_details.view_more_courses_by'
                    values={{subject: trainer?.firstName}}
                  />
                </Link>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </TabContext>
  );
};

export default CourseContentSection;
