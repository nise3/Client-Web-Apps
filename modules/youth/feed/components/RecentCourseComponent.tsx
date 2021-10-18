import React from 'react';
import {Avatar, Box, Button} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../../types/AppContextPropsType';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {useIntl} from 'react-intl';
import Link from 'next/link';

const useStyle = makeStyles((theme: CremaTheme) => ({
  recentCourseCompRoot: {
    padding: '5px 10px 0px 20px',
  },
  courseProviderImage: {
    height: 45,
    width: 45,
    border: '1px solid ' + theme.palette.grey['300'],
  },
  courseTitle: {
    fontWeight: Fonts.BOLD,
  },
  courseProviderName: {
    color: theme.palette.grey['600'],
    marginBottom: 10,
  },
}));

const RecentCourseComponent = ({data: course}: any) => {
  const classes = useStyle();
  const {messages} = useIntl();

  return (
    <>
      <Box display={'flex'} className={classes.recentCourseCompRoot}>
        <Box>
          <Avatar
            alt='provider image'
            src={course.logoUrl}
            className={classes.courseProviderImage}
          />
        </Box>
        <Box marginLeft={'10px'}>
          <Box className={classes.courseTitle}>{course.title}</Box>
          <Box className={classes.courseProviderName}>
            {course?.institute_title}
          </Box>

          <Box>
            <Link
              href={'../../youth/course-details/__'.replace('__', course.id)}
              passHref>
              <Button
                variant='contained'
                size={'small'}
                style={{marginLeft: 10}}>
                {messages['common.details']}
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RecentCourseComponent;
