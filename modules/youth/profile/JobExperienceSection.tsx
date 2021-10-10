import {Box, Card, CardContent, Grid, Typography} from '@mui/material';
import CustomParabolaButton from './component/CustomParabolaButton';
import {BusinessCenter} from '@mui/icons-material';
import React, {useCallback, useEffect, useState} from 'react';
import JobExperience from './JobExperience';
import {useIntl} from 'react-intl';
import {createStyles, makeStyles} from '@mui/styles';
import {deleteRankType} from '../../../services/organaizationManagement/RankTypeService';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useFetchYouthJobExperiences} from '../../../services/youthManagement/hooks';
import JobExperienceAddEditPage from './JobExperienceAddEditPage';

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

const JobExperienceSection = () => {
  const {messages} = useIntl();
  const classes = useStyles();
  const {successStack} = useNotiStack();
  const [jobExperienceFilters, setJobExperienceFilters] = useState({});

  const {data: jobExperiences} =
    useFetchYouthJobExperiences(jobExperienceFilters);
  const [isOpenJobExperienceAddEditForm, setIsOpenJobExperienceAddEditForm] =
    useState<boolean>(false);
  const [jobExperienceId, setJobExperienceId] = useState<number | null>(null);

  const openJobExperienceAddEditForm = useCallback(
    (itemId: number | null = null) => {
      setJobExperienceId(itemId);
      setIsOpenJobExperienceAddEditForm(true);
    },
    [],
  );

  const closeJobExperienceAddEditForm = useCallback(() => {
    setIsOpenJobExperienceAddEditForm(false);
  }, []);

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

  return isOpenJobExperienceAddEditForm ? (
    <JobExperienceAddEditPage
      itemId={jobExperienceId}
      onClose={closeJobExperienceAddEditForm}
    />
  ) : (
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
                onclick={() => openJobExperienceAddEditForm(null)}
              />
            </Grid>
          </Grid>

          {jobExperiences &&
            jobExperiences.map((jobExperience: JobExperienceProp) => {
              return (
                <React.Fragment key={jobExperience.id}>
                  <JobExperience
                    {...jobExperience}
                    openAddEditForm={() =>
                      openJobExperienceAddEditForm(jobExperience.id)
                    }
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
