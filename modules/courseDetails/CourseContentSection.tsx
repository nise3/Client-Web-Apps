import React, {FC, useState} from 'react';
import {
  Box,
  Container,
  Divider,
  Grid,
  Link,
  Tab,
  Typography,
} from '@mui/material';
import {TabContext, TabList} from '@mui/lab';
import useStyle from './index.style';
import {Alarm, CardMembership, Language} from '@mui/icons-material';

interface CourseContentProps {
  course: any;
}

const CourseContentSection: FC<CourseContentProps> = ({course}) => {
  const classes = useStyle();

  const [value, setValue] = useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box sx={{background: '#e6f3ec'}}>
        <Container maxWidth={'xl'}>
          <TabList aria-label='tabs' onChange={handleChange}>
            <Tab label='Overview' value='1' href={'#overview'} />
            <Tab label='Lessons' value='2' href={'#lessons'} />
            <Tab label='Requirements' value='3' href={'#requirements'} />
            <Tab label='Trainer' value='4' href={'#trainer'} />
          </TabList>
        </Container>
      </Box>

      <Container maxWidth={'xl'}>
        <Grid container style={{marginTop: 20, marginBottom: 20}}>
          <Grid item>
            <Box className={classes.courseBadgeBox}>
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
            <Box className={classes.courseBadgeBox}>
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
            <Box className={classes.courseBadgeBox}>
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

        <Box id={'overview'}>
          <Link href={'#overview'} className={classes.linkStyle}>
            Overview
          </Link>
          <Typography variant={'h4'} fontWeight={'bold'}>
            Explore how Physical Computing is Changing Tech
          </Typography>
          <Typography>
            Physical computing is the use of computers to respond to the
            physical movement of the human body.
          </Typography>
          <Typography>
            Whereas in the past computing was limited to immobile computers and
            laptops, today microcontrollers and sensors are revolutionising the
            tech industry and how we interact with household items.
          </Typography>
          <Typography>
            On this course you'll learn what's inside the devices we all use
            every day, like kettles, phones, and smartwatches. You'll come to
            understand how they work, how they respond to our movements, and
            ultimately learn to create your own physical computing prototype.
          </Typography>
        </Box>
        <Box id={'lessons'}>
          <Link href={'#lessons'} className={classes.linkStyle}>
            Lessons
          </Link>
          <Box style={{display: 'flex', alignItems: 'center'}}>
            {(course.tags || []).map((tag: any, index: any) => {
              return index == 0 ? (
                <Typography key={index}> {tag} </Typography>
              ) : (
                <Typography key={index}>&nbsp; &#8226; {tag}</Typography>
              );
            })}
          </Box>
        </Box>
        <Box id={'requirements'}>
          <Link href={'#requirements'} className={classes.linkStyle}>
            Requirements
          </Link>
        </Box>
        <Box id={'trainer'}>
          <Link href={'#trainer'} className={classes.linkStyle}>
            Trainer
          </Link>
        </Box>
      </Container>
    </TabContext>
  );
};

export default CourseContentSection;
