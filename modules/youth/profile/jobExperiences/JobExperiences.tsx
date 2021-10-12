import {useIntl} from 'react-intl';
import CustomParabolaButton from '../component/CustomParabolaButton';
import React from 'react';
import {AccessTime, BorderColor, Verified} from '@mui/icons-material';
import {Avatar, Box, Grid, Typography} from '@mui/material';
import CircularDeleteButton from '../component/CircularDeleteButton';
import {YouthJobExperience} from '../../../../services/youthManagement/typing';
import TextPrimary from '../component/TextPrimary';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HorizontalLine from '../component/HorizontalLine';
import {getMomentDateFormat} from '../../../../@softbd/utilities/helpers';
import VerticalLine from '../component/VerticalLine';

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
  const {messages} = useIntl();

  return (
    <React.Fragment>
      {jobExperiences.map((jobExperience: YouthJobExperience) => (
        <React.Fragment key={jobExperience.id}>
          <HorizontalLine />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8} md={9}>
              <Box sx={{display: 'flex'}}>
                <Avatar>
                  <Verified />
                </Avatar>
                <Box sx={{marginLeft: '15px'}}>
                  <Typography variant={'subtitle2'}>
                    {jobExperience?.company_name}
                  </Typography>
                  <Typography variant={'caption'}>
                    {jobExperience?.position}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Grid container sx={{marginTop: '10px'}}>
                  <Grid item sx={{display: 'flex'}}>
                    <AccessTime color={'primary'} sx={{marginRight: '5px'}} />
                    <TextPrimary
                      text={
                        getMomentDateFormat(
                          jobExperience?.start_date,
                          'DD MMM, YYYY',
                        ) +
                        ' - ' +
                        (jobExperience.is_currently_work == 1
                          ? 'Present'
                          : jobExperience?.end_date
                          ? getMomentDateFormat(
                              jobExperience?.end_date,
                              'DD MMM, YYYY',
                            )
                          : '')
                      }
                    />
                  </Grid>
                  <VerticalLine />
                  <Grid item sx={{display: 'flex'}}>
                    <LocationOnIcon
                      color={'primary'}
                      sx={{marginRight: '5px'}}
                    />
                    <TextPrimary text={jobExperience?.location} />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Box sx={{display: 'flex'}}>
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
                  deleteTitle={'delete'}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography>{jobExperience?.job_description}</Typography>
            </Grid>
          </Grid>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default JobExperiences;
