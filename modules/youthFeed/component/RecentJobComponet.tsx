import React, {FC} from 'react';
import {Box, Button, CardMedia} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {CremaTheme} from '../../../types/AppContextPropsType';

const useStyle = makeStyles((theme: CremaTheme) => ({
  recentJobCompRoot: {
    padding: '5px 10px 0px 20px',
  },
  jobProviderImage: {
    borderRadius: '50%',
    height: 45,
    width: 45,
    border: '1px solid #c4c4c4',
    boxShadow: '0px 1px 4px 2px #e9e9e9',
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  jobProviderName: {
    fontSize: 14,
    color: '#8c8888',
    marginBottom: 10,
  },
}));

interface RecentJobProps {
  data: {
    imageUrl: string;
    jobTitle: string;
    jobProviderName: string;
    location: string;
  };
}

const RecentJobComponent: FC<RecentJobProps> = ({data}) => {
  const classes = useStyle();

  return (
    <>
      <Box display={'flex'} className={classes.recentJobCompRoot}>
        <Box>
          <CardMedia
            component='img'
            alt='provider image'
            image={data.imageUrl}
            className={classes.jobProviderImage}
          />
        </Box>
        <Box marginLeft={'10px'}>
          <Box className={classes.jobTitle}>{data.jobTitle}</Box>
          <Box className={classes.jobProviderName}>
            {data.jobProviderName} &#8226; {data.location}
          </Box>
          <Box>
            <Button variant='contained' color='primary' size={'small'}>
              Apply
            </Button>
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

export default RecentJobComponent;
