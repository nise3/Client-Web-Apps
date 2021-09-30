import {useIntl} from 'react-intl';
import HorizontalLine from './component/HorizontalLine';
import {Box, Grid, Typography} from '@material-ui/core';
import CustomParabolaButton from './component/CustomParabolaButton';
import {AccessTime, BorderColor} from '@material-ui/icons';
import VerticalLine from './component/VerticalLine';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {CremaTheme} from '../../types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) =>
  createStyles({
    jobDurationDate: {
      display: 'flex',
      flexDirection: 'row',
      color: 'green',
    },
    jobAccessTime: {
      marginTop: '2px',
      marginLeft: '5px',
    },
  }),
);

type JobExperienceProp = {
  postTitle?: string;
  companyName?: string;
  companyLogo?: any;
  jobLocation?: string;
  jobPeriod?: string;
  jobDescription?: string;
};

const JobExperience = ({
  postTitle,
  companyName,
  companyLogo,
  jobLocation,
  jobPeriod,
  jobDescription,
}: JobExperienceProp) => {
  const classes = useStyles();
  const {messages} = useIntl();

  return (
    <>
      <HorizontalLine />
      <Box mt={2}>
        <Grid item container sm={12} justifyContent={'space-between'}>
          <Grid item container sm={6}>
            {companyLogo && <Grid item>{companyLogo}</Grid>}

            <Grid item sm={4}>
              <Box ml={1} mb={2}>
                <Typography variant={'subtitle2'}>{companyName}</Typography>
                <Typography variant={'caption'}>{postTitle}</Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item container sm={6} justifyContent={'flex-end'}>
            <Box>
              <CustomParabolaButton
                buttonVariant={'outlined'}
                title={messages['common.edit_btn'] as string}
                icon={<BorderColor />}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid item container>
          <Box className={classes.jobDurationDate} mb={4}>
            <AccessTime />
            <Typography className={classes.jobAccessTime}>
              {jobPeriod}
            </Typography>
            <VerticalLine
              lineHeight={'15px'}
              lineWidth={'2px'}
              marginLeft={2}
              marginRight={2}
            />
            {jobLocation && (
              <Box className={classes.jobDurationDate}>
                <LocationOnIcon />
                <Typography>{jobLocation}</Typography>
              </Box>
            )}
          </Box>
          <Typography>{jobDescription}</Typography>
        </Grid>
      </Box>
    </>
  );
};

export default JobExperience;
