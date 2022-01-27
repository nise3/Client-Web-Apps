import React, {useState} from 'react';
import {Box, Container, Tabs, Tab, Grid, Skeleton} from '@mui/material';
import UnderlinedHeading from '../../@softbd/elements/common/UnderlinedHeading';
import {
  useFetchCourseList,
  useFetchUpcomingCourseList,
} from '../../services/instituteManagement/hooks';
import {useIntl} from 'react-intl';
import CourseSectionCarousel from './courseSectionCarousel';
import NoDataFoundComponent from '../youth/common/NoDataFoundComponent';
import CourseTypes from '../../@softbd/utilities/CourseTypes';
import {useVendor} from '../../@crema/utility/AppHooks';
import PageSizes from '../../@softbd/utilities/PageSizes';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const {children, value, index, ...other} = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{pt: 3}}>{children}</Box>}
    </div>
  );
};

const indexProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const CoursesSection = () => {
  const {messages} = useIntl();
  const vendor = useVendor();

  const [upcomingCoursesFilter, setUpcomingCoursesFilter] = useState<any>({
    page_size: PageSizes.TEN,
    availability: CourseTypes.UPCOMING,
    institute_id: vendor?.id,
  });

  const [runningCoursesFilter, setRunningCoursesFilter] = useState<any>({
    page_size: PageSizes.TEN,
    availability: CourseTypes.RUNNING,
    institute_id: vendor?.id,
  });

  const {data: upcomingCourses, isLoading: isUpcomingCourse} =
    useFetchUpcomingCourseList(upcomingCoursesFilter);

  const {data: runningCourseList, isLoading: isLoadingCourseList} =
    useFetchCourseList('recent', runningCoursesFilter);

  const [value, setValue] = useState(CourseTypes.RUNNING);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue == CourseTypes.RUNNING) {
      setRunningCoursesFilter((prevState: any) => {
        return {...prevState, ...{availability: newValue}};
      });
    }
    if (newValue == CourseTypes.UPCOMING) {
      setUpcomingCoursesFilter((prevState: any) => {
        return {...prevState, ...{availability: newValue}};
      });
    }
  };

  return (
    <Container maxWidth='lg'>
      <Grid container mt={14}>
        <Grid item xs={12}>
          <UnderlinedHeading>{messages['common.courses']}</UnderlinedHeading>
          <Box sx={{width: '100%'}}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor='primary'
              indicatorColor='primary'
              aria-label='primary tabs example'>
              <Tab
                value={CourseTypes.RUNNING}
                label={messages['common.running_courses']}
                {...indexProps(CourseTypes.RUNNING)}
              />
              <Tab
                value={CourseTypes.UPCOMING}
                label={messages['common.up_coming_courses']}
                {...indexProps(CourseTypes.UPCOMING)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={CourseTypes.RUNNING}>
            <Box>
              {isLoadingCourseList ? (
                <Box
                  sx={{
                    display: 'flex',
                    marginTop: '20px',
                    justifyContent: 'space-around',
                  }}>
                  <Skeleton variant='rectangular' width={250} height={300} />
                  <Skeleton variant='rectangular' width={250} height={300} />
                  <Skeleton variant='rectangular' width={250} height={300} />
                  <Skeleton variant='rectangular' width={250} height={300} />
                </Box>
              ) : runningCourseList && runningCourseList.length ? (
                <CourseSectionCarousel courses={runningCourseList} />
              ) : (
                <NoDataFoundComponent />
              )}
            </Box>
          </TabPanel>
          <TabPanel value={value} index={CourseTypes.UPCOMING}>
            <Box>
              {isUpcomingCourse ? (
                <Box
                  sx={{
                    display: 'flex',
                    marginTop: '20px',
                    justifyContent: 'space-around',
                  }}>
                  <Skeleton variant='rectangular' width={250} height={300} />
                  <Skeleton variant='rectangular' width={250} height={300} />
                  <Skeleton variant='rectangular' width={250} height={300} />
                  <Skeleton variant='rectangular' width={250} height={300} />
                </Box>
              ) : upcomingCourses && upcomingCourses.length ? (
                <CourseSectionCarousel courses={upcomingCourses} />
              ) : (
                <NoDataFoundComponent />
              )}
            </Box>
          </TabPanel>
        </Grid>
      </Grid>
    </Container>
  );
};
export default CoursesSection;
