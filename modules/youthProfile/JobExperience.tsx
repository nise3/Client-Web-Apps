import {useIntl} from 'react-intl';
import HorizontalLine from './component/HorizontalLine';
import CustomParabolaButton from './component/CustomParabolaButton';
import VerticalLine from './component/VerticalLine';
import React from 'react';
import {CremaTheme} from '../../types/AppContextPropsType';
import {AccessTime, BorderColor} from '@mui/icons-material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {createStyles, makeStyles} from '@mui/styles';
import {Box, Grid, Typography} from '@mui/material';
import DeleteButton from '../../@softbd/elements/button/DeleteButton/DeleteButton';

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
  position?: string;
  companyName?: string;
  companyLogo?: any;
  jobLocation?: string;
  jobPeriod?: string;
  jobDescription?: string;
  openAddEditForm?: () => void;
  deleteJobExperience: () => void;
};

const JobExperience = ({
  position,
  companyName,
  companyLogo,
  jobLocation,
  jobPeriod,
  jobDescription,
  openAddEditForm,
  deleteJobExperience,
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
                <Typography variant={'caption'}>{position}</Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item container sm={6} justifyContent={'flex-end'}>
            <Box>
              <CustomParabolaButton
                buttonVariant={'outlined'}
                title={messages['common.edit_btn'] as string}
                icon={<BorderColor />}
                onclick={openAddEditForm}
              />
              <DeleteButton
                deleteAction={deleteJobExperience}
                deleteTitle={'Delete'}
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
