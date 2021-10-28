import React, {useState} from 'react';
import {Theme} from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import {Box, Container, Tabs, Tab} from '@mui/material';
import UnderlinedHeading from './UnderlinedHeading';
import {useFetchCourseList} from '../../services/instituteManagement/hooks';
import {useIntl} from 'react-intl';
import Typography from '@mui/material/Typography';
import CourseSectionCarousel from './courseSectionCarousel';
import {H6} from '../../@softbd/elements/common';

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('md')]: {
        marginTop: '50px',
      },
      [theme.breakpoints.down('xl')]: {
        // marginTop: '200px',
      },
    },
    rootMobileView: {
      [theme.breakpoints.down('xl')]: {
        marginTop: '80px',
      },
    },
  }),
);

const CoursesSection = () => {
  const classes = useStyles();
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
    <Container maxWidth='lg' className={classes.rootMobileView}>
      <UnderlinedHeading>{messages['common.courses']}</UnderlinedHeading>
      <Box sx={{width: '100%'}}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor='secondary'
          indicatorColor='secondary'
          aria-label='secondary tabs example'>
          <Tab label={messages['common.running_courses']} {...indexProps(0)} />
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
            <H6>{messages['common.no_data_found']}</H6>
          )}
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box>
          {upComingCourses && upComingCourses.length ? (
            <CourseSectionCarousel courses={upComingCourses} />
          ) : (
            <H6>{messages['common.no_data_found']}</H6>
          )}
        </Box>
      </TabPanel>
    </Container>
  );
};
export default CoursesSection;
