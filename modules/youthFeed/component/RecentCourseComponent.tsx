import React, {FC} from 'react';
import {Box, Button, CardMedia} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {CremaTheme} from '../../../types/AppContextPropsType';

const useStyle = makeStyles((theme: CremaTheme) => ({
  recentCourseCompRoot: {
    padding: '5px 10px 0px 20px',
  },
  courseProviderImage: {
    borderRadius: '50%',
    height: 45,
    width: 45,
    border: '1px solid ' + theme.palette.grey['300'],
  },
  courseTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  courseProviderName: {
    fontSize: 14,
    color: '#8c8888',
    marginBottom: 10,
  },
}));

interface RecentCourseProps {
  data: {
    logoUrl: string;
    courseTitle: string;
    courseProvider: string;
  };
}

const RecentCourseComponent: FC<RecentCourseProps> = ({data}) => {
  const classes = useStyle();

  return (
    <>
      <Box display={'flex'} className={classes.recentCourseCompRoot}>
        <Box>
          <CardMedia
            component='img'
            alt='provider image'
            image={data.logoUrl}
            className={classes.courseProviderImage}
          />
        </Box>
        <Box marginLeft={'10px'}>
          <Box className={classes.courseTitle}>{data.courseTitle}</Box>
          <Box className={classes.courseProviderName}>
            {data.courseProvider}
          </Box>
          <Box>
            <Button
              variant='contained'
              color='default'
              size={'small'}
              style={{marginLeft: 10}}>
              Details
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RecentCourseComponent;
