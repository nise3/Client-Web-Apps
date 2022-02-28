import React from 'react';
import {styled} from '@mui/material/styles';
import {Avatar, Box, Button} from '@mui/material';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {useIntl} from 'react-intl';
import Link from 'next/link';
import {H3} from '../../../../@softbd/elements/common';
import {useCustomStyle} from '../../../../@softbd/hooks/useCustomStyle';
import {LINK_FRONTEND_YOUTH_COURSE_DETAILS} from '../../../../@softbd/common/appLinks';

const PREFIX = 'RecentCourseComponent';

const classes = {
  courseProviderImage: `${PREFIX}-courseProviderImage`,
  courseTitle: `${PREFIX}-courseTitle`,
  courseProviderName: `${PREFIX}-courseProviderName`,
  detailsButton: `${PREFIX}-detailsButton`,
};

const StyledBox = styled(Box)(({theme}) => ({
  padding: '5px 10px 0px 20px',

  [`& .${classes.courseProviderImage}`]: {
    height: 45,
    width: 45,
    border: '1px solid ' + theme.palette.grey['300'],
    '& img': {
      objectFit: 'contain',
    },
  },

  [`& .${classes.courseTitle}`]: {
    fontWeight: Fonts.BOLD,
  },

  [`& .${classes.courseProviderName}`]: {
    color: theme.palette.grey['600'],
    marginBottom: 10,
  },
  [`& .${classes.detailsButton}`]: {
    backgroundColor: theme.palette.grey['300'],
    color: theme.palette.common.black,
    boxShadow: 'none',
  },
}));

const RecentCourseComponent = ({data: course}: any) => {
  const {messages} = useIntl();
  const result = useCustomStyle();

  return (
    <>
      <StyledBox display={'flex'}>
        <Box>
          <Avatar
            alt='provider image'
            variant={'square'}
            src={course?.logo ? course?.logo : '/images/blank_image.png'}
            className={classes.courseProviderImage}
          />
        </Box>
        <Box marginLeft={'10px'}>
          <H3 sx={{...result.body2}} className={classes.courseTitle}>
            {course.title}
          </H3>
          <Box className={classes.courseProviderName}>
            {course?.institute_title}
          </Box>

          <Box>
            <Link
              href={LINK_FRONTEND_YOUTH_COURSE_DETAILS + course.id}
              passHref>
              <Button
                variant='outlined'
                color='primary'
                size={'small'}
                style={{marginLeft: 10}}>
                {messages['common.details']}
              </Button>
            </Link>
          </Box>
        </Box>
      </StyledBox>
    </>
  );
};

export default RecentCourseComponent;
