import {Box, Card, CardContent, Grid, Typography} from '@mui/material';
import CustomParabolaButton from './component/CustomParabolaButton';
import {BusinessCenter} from '@mui/icons-material';
import React, {useCallback, useState} from 'react';
import JobExperience from './JobExperience';
import {useIntl} from 'react-intl';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useFetchYouthJobExperiences} from '../../../services/youthManagement/hooks';
import JobExperienceAddEditPage from './JobExperienceAddEditPage';
import {YouthJobExperience} from '../../../services/youthManagement/typing';

const JobExperienceSection = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const [jobExperienceFilters] = useState({});

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

  const deleteJobExperienceItem = async (itemId: number) => {
    let response = await deleteJobExperienceItem(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='job_experience.label' />}}
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
    <Card>
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
          jobExperiences.map((jobExperience: YouthJobExperience) => (
            <React.Fragment key={jobExperience.id}>
              <JobExperience
                jobExperience={jobExperience}
                openAddEditForm={() =>
                  openJobExperienceAddEditForm(jobExperience.id)
                }
                deleteJobExperience={() =>
                  deleteJobExperienceItem(jobExperience.id)
                }
              />
            </React.Fragment>
          ))}
      </CardContent>
    </Card>
  );
};

export default JobExperienceSection;
