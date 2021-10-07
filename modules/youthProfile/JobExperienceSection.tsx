import {Box, Card, CardContent, Grid, Typography} from '@mui/material';
import CustomParabolaButton from './component/CustomParabolaButton';
import {BusinessCenter} from '@mui/icons-material';
import React from 'react';
import JobExperience from './JobExperience';
import {useIntl} from 'react-intl';
import {createStyles, makeStyles} from '@mui/styles';
import {deleteRankType} from '../../services/organaizationManagement/RankTypeService';
import {isResponseSuccess} from '../../@softbd/utilities/helpers';
import IntlMessages from '../../@crema/utility/IntlMessages';
import useNotiStack from '../../@softbd/hooks/useNotifyStack';

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
const jobExperiences: Array<JobExperienceProp> = [
  {
    id: 1,
    companyName: 'softBD Ltd',
    companyLogo: '/images/userPageImages/profileImage.jpeg',
    jobPeriod: '2010-present',
    jobLocation: 'panthapath',
    position: 'software engineer',
    jobDescription:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab commodi cumque error exercitationem modi nam nisi, quia sed. Animi eius excepturi nulla perspiciatis repellat? Distinctio natus neque nostrum quaerat tenetur?',
  },
  {
    id: 2,
    companyName: 'Google',
    companyLogo: '/images/userPageImages/profileImage.jpeg',
    jobPeriod: '2020-present',
    jobLocation: 'CA',
    position: 'software engineer',
    jobDescription:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab commodi cumque error exercitationem modi nam nisi, quia sed. Animi eius excepturi nulla perspiciatis repellat? Distinctio natus neque nostrum quaerat tenetur?',
  },
];

type JobExperienceSectionProp = {
  onclick: (itemId: number | null) => void;
};

const JobExperienceSection = ({onclick}: JobExperienceSectionProp) => {
  const {messages} = useIntl();
  const classes = useStyles();
  const {successStack} = useNotiStack();

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

          {jobExperiences.map((jobExperience: JobExperienceProp) => {
            return (
              <React.Fragment key={jobExperience.id}>
                <JobExperience
                  companyName={jobExperience.companyName}
                  companyLogo={jobExperience.companyLogo}
                  jobPeriod={jobExperience.jobPeriod}
                  position={jobExperience.position}
                  jobLocation={jobExperience.jobLocation}
                  jobDescription={jobExperience.jobDescription}
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
