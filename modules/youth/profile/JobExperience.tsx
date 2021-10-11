import {useIntl} from 'react-intl';
import HorizontalLine from './component/HorizontalLine';
import CustomParabolaButton from './component/CustomParabolaButton';
import VerticalLine from './component/VerticalLine';
import React from 'react';
import {CremaTheme} from '../../../types/AppContextPropsType';
import {AccessTime, BorderColor} from '@mui/icons-material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {createStyles, makeStyles} from '@mui/styles';
import {Avatar, Box, Grid, Typography} from '@mui/material';
import CircularDeleteButton from './component/CircularDeleteButton';
import {YouthJobExperience} from '../../../services/youthManagement/typing';

const useStyles = makeStyles((theme: CremaTheme) =>
  createStyles({
    jobDurationDate: {
      display: 'flex',
      flexDirection: 'row',
      color: theme.palette.primary.main,
    },
    jobAccessTime: {
      marginTop: '2px',
      marginLeft: '5px',
    },
  }),
);

type JobExperienceProp = {
  jobExperience: YouthJobExperience;
  openAddEditForm?: () => void;
  deleteJobExperience: () => void;
};

const JobExperience = ({
  jobExperience,
  openAddEditForm,
  deleteJobExperience,
}: JobExperienceProp) => {
  const classes = useStyles();
  const {messages} = useIntl();

  return (
    <>
      <HorizontalLine />
      <Box mt={2}>
        <Grid item container xs={12} justifyContent={'space-between'}>
          <Grid item container xs={8}>
            <Avatar
              alt='organization logo'
              src={'/images/companyLogos/apple.png'}
            />

            <Grid item>
              <Box ml={1} mb={2}>
                <Typography variant={'subtitle2'}>
                  {jobExperience.company_name}
                </Typography>
                <Typography variant={'caption'}>
                  {jobExperience.position}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container justifyContent={'flex-end'}>
              <Box>
                <CustomParabolaButton
                  buttonVariant={'outlined'}
                  title={messages['common.edit_btn'] as string}
                  icon={<BorderColor />}
                  onclick={openAddEditForm}
                />
                <CircularDeleteButton
                  deleteAction={deleteJobExperience}
                  deleteTitle={'Delete'}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container>
          <Box className={classes.jobDurationDate} mb={4}>
            <AccessTime />
            <Typography className={classes.jobAccessTime}>
              {jobExperience.start_date} -{' '}
              {jobExperience.is_currently_work
                ? jobExperience.end_date
                : 'present'}
            </Typography>
            <VerticalLine
              lineHeight={'15px'}
              lineWidth={'2px'}
              marginLeft={2}
              marginRight={2}
            />
            {location && (
              <Box className={classes.jobDurationDate}>
                <LocationOnIcon />
                <Typography>{location}</Typography>
              </Box>
            )}
          </Box>
          <Typography>{jobExperience.description}</Typography>
        </Grid>
      </Box>
    </>
  );
};

export default JobExperience;
