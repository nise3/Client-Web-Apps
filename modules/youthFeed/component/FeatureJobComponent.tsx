import React, {FC} from 'react';
import {Box, CardMedia, Chip, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {CremaTheme} from '../../../types/AppContextPropsType';

const useStyle = makeStyles((theme: CremaTheme) => ({
  featureJobRoot: {
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
  tagStyle: {
    color: '#fca67e',
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 4,
    height: 25,
    background: '#fff2ed',
    borderColor: '#fdab85',
    '& .MuiChip-label': {
      padding: '0px 5px',
    },
  },
  jobTitle: {
    color: theme.palette.primary.main,
    fontSize: 12,
    fontWeight: 500,
  },
  jobProviderName: {
    fontSize: 12,
    fontWeight: 500,
  },
}));

interface FeatureJobProps {
  data: {
    imageUrl: string;
    jobTitle: string;
    jobProviderName: string;
  };
}

const FeatureJobComponent: FC<FeatureJobProps> = ({data}) => {
  const classes = useStyle();

  return (
    <>
      <Box className={classes.featureJobRoot}>
        <Grid container spacing={3} alignItems={'center'}>
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
              {data.jobProviderName}
            </Box>
          </Grid>
          <Chip
            variant='outlined'
            label={'Feature'}
            className={classes.tagStyle}
          />
        </Grid>
      </Box>
    </>
  );
};

export default FeatureJobComponent;
