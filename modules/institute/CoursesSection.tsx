import React, {useState} from 'react';
import {Box, Container, Tabs, Tab, Grid} from '@mui/material';
import UnderlinedHeading from './UnderlinedHeading';
import {useFetchCourseList} from '../../services/instituteManagement/hooks';
import {useIntl} from 'react-intl';
import Typography from '@mui/material/Typography';
import CourseSectionCarousel from './courseSectionCarousel';
import NoDataFoundComponent from '../youth/common/NoDataFoundComponent';

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

  // const [runningCoursesFilters] = useState<any>({page_size: 10, availability: 1});
  const [upcomingCoursesFilter] = useState<any>({
    page_size: 10,
    availability: 2,
  });

  // Todo: data is not coming for running form api, have to implement
  // const {data: runningCourses} = useFetchCourseList('recent', runningCoursesFilters);
  const {data: upComingCourses} = useFetchCourseList(
    'recent',
    upcomingCoursesFilter,
  );

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
                label={messages['common.running_courses']}
                {...indexProps(0)}
              />
              <Tab
                label={messages['common.up_coming_courses']}
                {...indexProps(1)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Box>
              {upComingCourses && upComingCourses.length ? (
                <CourseSectionCarousel courses={upComingCourses} />
              ) : (
                <NoDataFoundComponent />
              )}
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box>
              {upComingCourses && upComingCourses.length ? (
                <CourseSectionCarousel courses={upComingCourses} />
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
