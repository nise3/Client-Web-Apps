import CustomParabolaButton from './component/CustomParabolaButton';
import {BusinessCenter} from '@mui/icons-material';
import React, {useCallback, useState} from 'react';
import JobExperiences from './JobExperiences';
import {useIntl} from 'react-intl';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useFetchYouthJobExperiences} from '../../../services/youthManagement/hooks';
import JobExperienceAddEditPage from './JobExperienceAddEditPage';
import ContentLayout from './component/ContentLayout';

const JobExperienceSection = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const [jobExperienceFilters] = useState({});

  const {
    data: jobExperiences,
    isLoading,
    mutate: mutateJobExperiences,
  } = useFetchYouthJobExperiences(jobExperienceFilters);
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
    mutateJobExperiences();
    setIsOpenJobExperienceAddEditForm(false);
  }, []);

  const deleteJobExperienceItem = useCallback(async (itemId: number) => {
    let response = await deleteJobExperienceItem(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='job_experience.label' />}}
        />,
      );
      mutateJobExperiences();
    }
  }, []);

  return isOpenJobExperienceAddEditForm ? (
    <JobExperienceAddEditPage
      itemId={jobExperienceId}
      onClose={closeJobExperienceAddEditForm}
    />
  ) : (
    <ContentLayout
      title={messages['common.job_experience']}
      isLoading={isLoading}
      actions={
        <CustomParabolaButton
          buttonVariant={'outlined'}
          title={messages['youth_profile.add_new_experience'] as string}
          icon={<BusinessCenter />}
          onClick={() => openJobExperienceAddEditForm(null)}
        />
      }>
      {
        <JobExperiences
          jobExperiences={jobExperiences || []}
          onOpenAddEditForm={openJobExperienceAddEditForm}
          onDeleteJobExperience={deleteJobExperienceItem}
        />
      }
    </ContentLayout>
  );
};

export default JobExperienceSection;
