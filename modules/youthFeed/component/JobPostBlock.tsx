import React, {FC} from 'react';
import {Box, Button, CardMedia, Chip, Grid} from '@material-ui/core';
import {BusinessCenter, LocationOn, School} from '@material-ui/icons';
import {makeStyles} from '@material-ui/styles';
import {CremaTheme} from '../../../types/AppContextPropsType';

interface JobPostBlockProps {
  postData: any;
}

const useStyle = makeStyles((theme: CremaTheme) => ({
  jobPostRoot: {
    background: '#fff',
    borderRadius: 4,
    padding: 15,
  },
  jobProviderImage: {
    borderRadius: '50%',
    height: 60,
    width: 60,
    border: '1px solid #c4c4c4',
    boxShadow: '0px 1px 4px 2px #e9e9e9',
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
    color: '#8b8a95',
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
    <Box className={classes.jobPostRoot}>
      <Grid container>
        <Grid item md={9}>
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
              <Box className={classes.locationStyle + ' ' + classes.colorGray}>
                {postData.ownerName}{' '}
                <LocationOn className={classes.locationIcon} />{' '}
                {postData.location}
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.salaryBox} md={3}>
          <Box className={classes.colorGray}>Salary Range: </Box>
          <Box fontSize={'15px'} fontWeight={'bold'}>
            {postData.salaryRange}
          </Box>
        </Grid>
      </Grid>
      <Box className={classes.descriptionBox + ' ' + classes.colorGray}>
        {postData.postDescription}
      </Box>
      <Box>
        <Box>
          {(postData?.postTags || []).map((tag: any, index: number) => {
            return (
              <Chip
                className={classes.chipStyle + ' ' + classes.colorGray}
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
    </Box>
  );
};

export default JobPostBlock;
