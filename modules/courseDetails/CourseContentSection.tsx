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

interface CourseContentProps {
  course: any;
}

const CourseContentSection: FC<CourseContentProps> = ({course}) => {
  const classes = useStyle();

  const [value, setValue] = useState('1');
  const overviewRef = useRef<any>(null);
  const lessonRef = useRef<any>(null);
  const requirementRef = useRef<any>(null);
  const trainerRef = useRef<any>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);

    if (newValue == '1' && overviewRef) {
      overviewRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else if (newValue == '2' && lessonRef) {
      lessonRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else if (newValue == '3' && requirementRef) {
      requirementRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else if (newValue == '4' && trainerRef) {
      trainerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <TabContext value={value}>
      <Box sx={{background: '#e6f3ec'}}>
        <TabList aria-label='tabs' onChange={handleChange}>
          <Tab label='Overview' value='1' />
          <Tab label='Lessons' value='2' />
          <Tab label='Requirements' value='3' />
          <Tab label='Trainer' value='4' />
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
                <Box className={classes.courseBadgeTitle}>Certificate</Box>
                <Box>Earn a certificate upon completion</Box>
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
                <Box className={classes.courseBadgeTitle}>100% Online</Box>
                <Box>Start instantly and run</Box>
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
                  6 months to complete
                </Box>
                <Box>3 hours/weeks</Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box ref={overviewRef} className={classes.boxMargin}>
          <Box className={classes.sectionTitleStyle}>Overview</Box>
          <Typography variant={'h6'} fontWeight={'bold'}>
            Explore how Physical Computing is Changing Tech
          </Typography>
          <Typography className={classes.padTop18}>
            Physical computing is the use of computers to respond to the
            physical movement of the human body.
          </Typography>
          <Typography className={classes.padTop18}>
            Whereas in the past computing was limited to immobile computers and
            laptops, today microcontrollers and sensors are revolutionising the
            tech industry and how we interact with household items.
          </Typography>
          <Typography className={classes.padTop18}>
            On this course you'll learn what's inside the devices we all use
            every day, like kettles, phones, and smartwatches. You'll come to
            understand how they work, how they respond to our movements, and
            ultimately learn to create your own physical computing prototype.
          </Typography>
        </Box>

        <Box ref={lessonRef} style={{marginTop: 20, marginBottom: 20}}>
          <Box className={classes.sectionTitleStyle}>Lessons</Box>
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
                    <>
                      {index != 0 && <Divider key={'d' + index} />}
                      <ListItem key={index}>
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
                    </>
                  );
                })}
              </List>
            </Grid>
          </Grid>
          <Box>
            <Box className={classes.sectionTitleStyle}>
              Exam/Assisment Method
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
          <Box className={classes.sectionTitleStyle}>Requirements</Box>
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
          <Box className={classes.sectionTitleStyle}>Trainer</Box>
          <Box className={clsx(classes.dFlexAlignCenter, classes.trainerBox)}>
            <Avatar
              className={classes.trainerImage}
              src={course.trainer?.image}
            />
            <Box className={classes.trainerNameAndAboutBox}>
              <Box fontWeight={'bold'}>
                {course.trainer?.firstName} {course.trainer?.lastName}
              </Box>
              <Typography variant={'caption'}>
                {course.trainer.about}
              </Typography>
              <Link href={'#more-courses'} style={{textDecoration: 'none'}}>
                View more courses by {course.trainer?.firstName}
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </TabContext>
  );
};

export default CourseContentSection;
