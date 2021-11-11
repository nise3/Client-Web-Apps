import React from 'react';
import { styled } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import {Avatar, Box, Button} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../../redux/types/AppContextPropsType';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {useIntl} from 'react-intl';
import Link from 'next/link';

const PREFIX = 'RecentCourseComponent';

const classes = {
  `& .${classes.recentCourseCompRoot}`: `${PREFIX}-undefined`,
  `& .${classes.courseProviderImage}`: `${PREFIX}-undefined`,
  `& .${classes.courseTitle}`: `${PREFIX}-undefined`,
  `& .${classes.courseProviderName}`: `${PREFIX}-undefined`
};

const StyledRoot = styled(Root)((
  {
    theme: {
      theme: CremaTheme
    }
  }
) => ({
  [`& .${classes.undefined}`]: {
    padding: '5px 10px 0px 20px',
  },

  [`& .${classes.undefined}`]: {
    height: 45,
    width: 45,
    border: '1px solid ' + theme.palette.grey['300'],
  },

  [`& .${classes.undefined}`]: {
    fontWeight: Fonts.BOLD,
  },

  [`& .${classes.undefined}`]: {
    color: theme.palette.grey['600'],
    marginBottom: 10,
  }
}));

const PREFIX = 'RecentCourseComponent';

const classes = {
  recentCourseCompRoot: `${PREFIX}-recentCourseCompRoot`,
  courseProviderImage: `${PREFIX}-courseProviderImage`,
  courseTitle: `${PREFIX}-courseTitle`,
  courseProviderName: `${PREFIX}-courseProviderName`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme: CremaTheme
  }
) => ({
  [`& .${classes.recentCourseCompRoot}`]: {
    padding: '5px 10px 0px 20px',
  },

  [`& .${classes.courseProviderImage}`]: {
    height: 45,
    width: 45,
    border: '1px solid ' + theme.palette.grey['300'],
  },

  [`& .${classes.courseTitle}`]: {
    fontWeight: Fonts.BOLD,
  },

  [`& .${classes.courseProviderName}`]: {
    color: theme.palette.grey['600'],
    marginBottom: 10,
  }
}));

const useStyle = makeStyles((
  {
    theme: {
      theme: CremaTheme
    }
  }
) => ({
  [`& .${classes.undefined}`]: {
    padding: '5px 10px 0px 20px',
  },

  [`& .${classes.undefined}`]: {
    height: 45,
    width: 45,
    border: '1px solid ' + theme.palette.grey['300'],
  },

  [`& .${classes.undefined}`]: {
    fontWeight: Fonts.BOLD,
  },

  [`& .${classes.undefined}`]: {
    color: theme.palette.grey['600'],
    marginBottom: 10,
  }
}));

const RecentCourseComponent = ({data: course}: any) => {
  const classes = useStyle();
  const {messages} = useIntl();

  return (
    <StyledRoot>
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
      </StyledRoot>
  );
};

export default RecentCourseComponent;
