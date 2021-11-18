import React, {useState} from 'react';
import {Box, Container, Tabs, Tab, Grid} from '@mui/material';
import UnderlinedHeading from './UnderlinedHeading';
import {useFetchCourseList} from '../../services/instituteManagement/hooks';
import {useIntl} from 'react-intl';
import Typography from '@mui/material/Typography';
import CourseSectionCarousel from './courseSectionCarousel';
import NoDataFoundComponent from '../youth/common/NoDataFoundComponent';
import CourseTypes from '../../@softbd/utilities/CourseTypes';
import {useVendor} from '../../@crema/utility/AppHooks';

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
      {value === index && (
        <Box sx={{pt: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
    page_size: 10,
    availability: CourseTypes.RUNNING,
    institute_id: vendor?.id,
  });

  // Todo: data is not coming for running form api, have to implement
  // const {data: runningCourses} = useFetchCourseList('recent', runningCoursesFilters);
  const {data: courseList} = useFetchCourseList(
    'recent',
    upcomingCoursesFilter,
  );

  const [value, setValue] = useState(CourseTypes.RUNNING);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setUpcomingCoursesFilter((prevState: any) => {
      return {...prevState, ...{availability: newValue}};
    });
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
              {courseList && courseList.length ? (
                <CourseSectionCarousel courses={courseList} />
              ) : (
                ''
              )}
            </Box>
          </TabPanel>
          <TabPanel value={value} index={CourseTypes.UPCOMING}>
            <Box>
              {courseList && courseList.length ? (
                <CourseSectionCarousel courses={courseList} />
              ) : (
                ''
              )}
            </Box>
          </TabPanel>
          {!courseList || (courseList?.length <= 0 && <NoDataFoundComponent />)}
        </Grid>
      </Grid>
    </Container>
  );
};
export default CoursesSection;
