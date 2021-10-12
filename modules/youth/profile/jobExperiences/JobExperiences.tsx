import {useIntl} from 'react-intl';
import HorizontalLine from '../component/HorizontalLine';
import CustomParabolaButton from '../component/CustomParabolaButton';
import VerticalLine from '../component/VerticalLine';
import React from 'react';
import {CremaTheme} from '../../../../types/AppContextPropsType';
import {AccessTime, BorderColor} from '@mui/icons-material';
import {createStyles, makeStyles} from '@mui/styles';
import {Avatar, Box, Grid, Typography} from '@mui/material';
import CircularDeleteButton from '../component/CircularDeleteButton';
import {YouthJobExperience} from '../../../../services/youthManagement/typing';

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
  jobExperiences: Array<YouthJobExperience>;
  onOpenAddEditForm: (itemId: number) => void;
  onDeleteJobExperience: (itemId: number) => void;
};

const JobExperiences = ({
  jobExperiences,
  onOpenAddEditForm,
  onDeleteJobExperience,
}: JobExperienceProp) => {
  const classes = useStyles();
  const {messages} = useIntl();

  return (
    <React.Fragment>
      {jobExperiences.map((jobExperience: YouthJobExperience) => (
        <React.Fragment key={jobExperience.id}>
          <HorizontalLine />
          <Box mt={2}>
            <Grid container>
              <Grid item xs={8}>
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
                      onClick={() => {
                        onOpenAddEditForm(jobExperience.id);
                      }}
                    />
                    <CircularDeleteButton
                      deleteAction={() => {
                        onDeleteJobExperience(jobExperience.id);
                      }}
                      deleteTitle={'Delete'}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
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
                </Box>
                <Typography>{jobExperience?.job_description}</Typography>
              </Grid>
            </Grid>
          </Box>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default JobExperiences;
