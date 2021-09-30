import React, {FC} from 'react';
import {Box, Card, CardMedia, Chip, Grid} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../types/AppContextPropsType';
import {Fonts} from '../../../shared/constants/AppEnums';

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
    border: '1px solid ' + theme.palette.grey['300'],
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
    fontWeight: Fonts.BOLD,
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
      <Card className={classes.featureJobRoot}>
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
            <Box>{data.jobProviderName}</Box>
          </Grid>
          <Chip
            variant='outlined'
            label={'Feature'}
            className={classes.tagStyle}
          />
        </Grid>
      </Card>
    </>
  );
};

export default FeatureJobComponent;
