import React, {FC} from 'react';
import {Box, Button, CardMedia, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {Theme} from '@material-ui/core/styles';

const useStyle = makeStyles((theme: Theme) => ({
  nearbyJobRoot: {
    background: '#fff',
    borderRadius: 4,
    position: 'relative',
  },
  jobProviderImage: {
    borderRadius: '50%',
    height: 45,
    width: 45,
    marginLeft: 10,
    border: '1px solid #c4c4c4',
    boxShadow: '0px 1px 4px 2px #e9e9e9',
  },
  jobTitle: {
    color: '#29955c',
    fontSize: 12,
    fontWeight: 500,
  },
  jobProviderName: {
    fontSize: 12,
    fontWeight: 500,
  },
}));

interface NearByJobProps {
  data: {
    imageUrl: string;
    jobTitle: string;
    jobProviderName: string;
    location: string;
  };
}

const RecentJobComponent: FC<NearByJobProps> = ({data}) => {
  const classes = useStyle();

  return (
    <>
      <Box className={classes.nearbyJobRoot}>
        <Grid container spacing={3} alignItems={'flex-start'}>
          <Grid item>
            <CardMedia
              component='img'
              alt='provider image'
              image={data.imageUrl}
              className={classes.jobProviderImage}
            />
          </Grid>
          <Grid item>
            <Box className={classes.jobTitle}>{data.jobTitle}</Box>
            <Box className={classes.jobProviderName}>
              {data.jobProviderName}.{data.location}
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
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default RecentJobComponent;
