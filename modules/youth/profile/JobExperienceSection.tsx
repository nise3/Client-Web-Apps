import {Box, Card, CardContent, Grid, Typography} from '@mui/material';
import CustomParabolaButton from './component/CustomParabolaButton';
import {BusinessCenter} from '@mui/icons-material';
import React, {useEffect, useState} from 'react';
import JobExperience from './JobExperience';
import {useIntl} from 'react-intl';
import {createStyles, makeStyles} from '@mui/styles';
import {deleteRankType} from '../../../services/organaizationManagement/RankTypeService';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useFetchYouthJobExperiences} from '../../../services/youthManagement/hooks';

const useStyles = makeStyles(() =>
  createStyles({
    cardSpaceBetween: {
      marginTop: '20px',
    },

    youthJobExperienceCard: {
      width: '100%',
    },
    youthJobExperienceCompanyInfo: {
      display: 'flex',
      flexDirection: 'row',
    },
  }),
);

type JobExperienceProp = {
  id: number;
  position?: string;
  companyName?: string;
  companyLogo?: any;
  jobLocation?: string;
  jobPeriod?: string;
  jobDescription?: string;
};

type JobExperienceSectionProp = {
  onclick: (itemId: number | null) => void;
};

const JobExperienceSection = ({onclick}: JobExperienceSectionProp) => {
  const {messages} = useIntl();
  const classes = useStyles();
  const {successStack} = useNotiStack();
  const [jobExperienceFilters, setJobExperienceFilters] = useState({});

  const {data: jobExperiences} =
    useFetchYouthJobExperiences(jobExperienceFilters);
  console.log(jobExperiences);

  useEffect(() => {
    // if (authUser?.youth) {
    setJobExperienceFilters({youth_id: 1});
    // }
  }, []);

  const deleteJobExperienceItem = async (itemId: number) => {
    let response = await deleteRankType(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='rank_types.label' />}}
        />,
      );
    }
  };

  return (
    <Grid container xl={12} className={classes.cardSpaceBetween}>
      <Card className={classes.youthJobExperienceCard}>
        <CardContent>
          <Grid item container sm={12} justifyContent={'space-between'}>
            <Grid item sm={6}>
              <Typography variant={'h6'}>
                <Box component={'span'} fontWeight='fontWeightBold'>
                  {messages['common.job_experience']}
                </Box>
              </Typography>
            </Grid>
            <Grid item container sm={6} justifyContent={'flex-end'}>
              <CustomParabolaButton
                buttonVariant={'outlined'}
                title={messages['youth_profile.add_new_experience'] as string}
                icon={<BusinessCenter />}
                onclick={() => onclick(null)}
              />
            </Grid>
          </Grid>

          {jobExperiences &&
            jobExperiences.map((jobExperience: JobExperienceProp) => {
              return (
                <React.Fragment key={jobExperience.id}>
                  <JobExperience
                    {...jobExperience}
                    openAddEditForm={() => onclick(jobExperience.id)}
                    deleteJobExperience={() =>
                      deleteJobExperienceItem(jobExperience.id)
                    }
                  />
                </React.Fragment>
              );
            })}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default JobExperienceSection;
