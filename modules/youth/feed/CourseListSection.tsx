import React, {useCallback, useState} from 'react';
import {Button, Card, Divider, Grid, MenuItem, Select} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';
import {ChevronRight} from '@mui/icons-material';
import RecentCourseComponent from './components/RecentCourseComponent';
import clsx from 'clsx';
import {useIntl} from 'react-intl';
import Link from 'next/link';
import {useFetchCourseList} from '../../../services/youthManagement/hooks';
import NoDataFoundComponent from '../common/NoDataFoundComponent';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {objectFilter} from '../../../@softbd/utilities/helpers';
const useStyle = makeStyles((theme: CremaTheme) => ({
  recentCourseSectionRoot: {
    marginTop: 0,
    paddingBottom: 10,
    paddingTop: 20,
  },
  featureSectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  courseItem: {
    marginBottom: 10,
  },
  divider: {
    width: '100%',
    height: 1,
    marginBottom: 5,
  },
  selectStyle: {
    '& .MuiSelect-select': {
      padding: '10px 30px 10px 15px',
    },
  },
  seeMoreButton: {
    boxShadow: 'none',
    marginTop: 10,
  },
  selectControl: {
    marginLeft: 20,
    marginBottom: 10,
  },
}));

const CourseListSection = () => {
  const classes = useStyle();
  const {messages} = useIntl();
  const [selectedValue, setSelectedValue] = useState('recent');
  const URL = `/youth/course-list/${selectedValue}`;
  const authYouth = useAuthUser<YouthAuthUser>();

  const [courseFilters, setCourseFilters] = useState({page_size: 3});
  const {data: courses, metaData: coursesMetaData} = useFetchCourseList(
    selectedValue,
    courseFilters,
  );

  const handleCourseCategoryChange = useCallback((event: any) => {
    const value = event.target.value;
    if (value == 'nearby') {
      setCourseFilters((prevState) => {
        return {...prevState, loc_district_id: authYouth?.loc_district_id};
      });
    } else {
      setCourseFilters((prevState) => {
        return objectFilter({...prevState, loc_district_id: 0});
      });
    }

    setSelectedValue(value);
  }, []);

  return (
    <Card>
      <Grid container className={classes.recentCourseSectionRoot}>
        <Grid item xs={12} md={12}>
          <Select
            id='recentCourses'
            autoWidth
            defaultValue={selectedValue}
            variant='outlined'
            className={clsx(classes.selectStyle, classes.selectControl)}
            onChange={handleCourseCategoryChange}>
            <MenuItem value={'recent'}>Recent Courses</MenuItem>
            <MenuItem value={'popular'}>Popular Courses</MenuItem>
            <MenuItem value={'nearby'}>Nearby Courses</MenuItem>
            <MenuItem value={'trending'}>Trending Courses</MenuItem>
          </Select>
        </Grid>
        {courses &&
          courses.map((course: any, index: number) => {
            return (
              <Grid item xs={12} key={index} className={classes.courseItem}>
                {index != 0 && <Divider className={classes.divider} />}
                <RecentCourseComponent data={course} />
              </Grid>
            );
          })}
        {coursesMetaData.current_page < coursesMetaData.total_page && (
          <Grid item xs={12} style={{paddingLeft: 15}}>
            <Link href={URL} passHref>
              <Button
                variant={'text'}
                color={'primary'}
                size={'medium'}
                className={classes.seeMoreButton}>
                {messages['youth_feed.see_more_courses']}
                <ChevronRight color={'primary'} />
              </Button>
            </Link>
          </Grid>
        )}

        {courses?.length <= 0 && (
          <NoDataFoundComponent messageTextType={'subtitle2'} />
        )}
      </Grid>
    </Card>
  );
};

export default CourseListSection;
