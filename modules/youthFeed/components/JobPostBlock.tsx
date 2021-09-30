import React, {FC} from 'react';
import {Box, Button, Card, CardMedia, Chip, Grid} from '@material-ui/core';
import {BusinessCenter, LocationOn, School} from '@material-ui/icons';
import {makeStyles} from '@material-ui/styles';
import {CremaTheme} from '../../../types/AppContextPropsType';
import clsx from 'clsx';

interface JobPostBlockProps {
  postData: any;
}

const useStyle = makeStyles((theme: CremaTheme) => ({
  jobPostRoot: {
    padding: 15,
  },
  jobProviderImage: {
    borderRadius: '50%',
    height: 60,
    width: 60,
    border: '1px solid ' + theme.palette.grey['300'],
  },
  titleBox: {
    marginLeft: 10,
    paddingTop: 5,
  },
  salaryBox: {
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'column',
  },
  titleStyle: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  locationStyle: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 5,
  },
  locationIcon: {
    height: 18,
    width: 18,
    margin: '0px 5px',
  },
  descriptionBox: {
    margin: '15px 0px',
  },
  colorGray: {
    color: theme.palette.gray['600'],
  },
  chipStyle: {
    borderRadius: 4,
    background: '#e4e4e4',
    marginRight: 8,
  },
}));

const JobPostBlock: FC<JobPostBlockProps> = ({postData}) => {
  const classes = useStyle();

  const getIconByTagType = (type: number) => {
    switch (type) {
      case 1:
        return <BusinessCenter />;
      case 2:
        return <School />;
      default:
        return <></>;
    }
  };

  return (
    <Card className={classes.jobPostRoot}>
      <Grid container>
        <Grid item xs={12} md={9}>
          <Grid container>
            <Grid item>
              <CardMedia
                component='img'
                alt='provider image'
                image={postData.ownerLogo}
                className={classes.jobProviderImage}
              />
            </Grid>
            <Grid item md={9} className={classes.titleBox}>
              <Box className={classes.titleStyle}>{postData.title}</Box>
              <Box className={clsx(classes.locationStyle, classes.colorGray)}>
                {postData.ownerName}{' '}
                <LocationOn className={classes.locationIcon} />{' '}
                {postData.location}
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.salaryBox} xs={12} md={3}>
          <Box className={classes.colorGray}>Salary Range: </Box>
          <Box fontSize={'15px'} fontWeight={'bold'}>
            {postData.salaryRange}
          </Box>
        </Grid>
      </Grid>
      <Box className={clsx(classes.descriptionBox, classes.colorGray)}>
        {postData.postDescription}
      </Box>
      <Box>
        <Box>
          {(postData?.postTags || []).map((tag: any, index: number) => {
            return (
              <Chip
                className={clsx(classes.chipStyle, classes.colorGray)}
                icon={getIconByTagType(tag.type)}
                label={tag.name}
                key={index}
              />
            );
          })}
        </Box>
        <Box textAlign={'right'} marginTop={'15px'}>
          <Button variant={'contained'} color={'primary'} size={'medium'}>
            Apply Now
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default JobPostBlock;
