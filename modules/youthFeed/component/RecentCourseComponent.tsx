import React, {FC} from 'react';
import {Box, Button, CardMedia} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../types/AppContextPropsType';

const useStyle = makeStyles((theme: CremaTheme) => ({
  recentCourseCompRoot: {
    padding: '5px 10px 0px 20px',
  },
  courseProviderImage: {
    borderRadius: '50%',
    height: 45,
    width: 45,
    border: '1px solid #c4c4c4',
    boxShadow: '0px 1px 4px 2px #e9e9e9',
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

  return <>
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
          <Button variant='contained' size={'small'} style={{marginLeft: 10}}>
            Details
          </Button>
        </Box>
      </Box>
    </Box>
  </>;
};

export default RecentCourseComponent;
