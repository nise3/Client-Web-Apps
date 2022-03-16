import CustomParabolaButton from '../component/CustomParabolaButton';
import {Add} from '@mui/icons-material';
import React, {useCallback, useState} from 'react';
import JobExperiences from './JobExperiences';
import {useIntl} from 'react-intl';
import {isResponseSuccess} from '../../../../@softbd/utilities/helpers';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import {useFetchYouthJobExperiences} from '../../../../services/youthManagement/hooks';
import JobExperienceAddEditPage from './JobExperienceAddEditPage';
import ContentLayout from '../component/ContentLayout';
import HorizontalLine from '../component/HorizontalLine';
import {Avatar, Box, Typography} from '@mui/material';
import {deleteJobExperience} from '../../../../services/youthManagement/JobExperienceService';
import {getYouthProfile} from '../../../../services/youthManagement/YouthService';
import {UPDATE_AUTH_USER} from '../../../../redux/types/actions/Auth.actions';
import {getYouthAuthUserObject} from '../../../../redux/actions';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../../redux/types/models/CommonAuthUser';
import {useDispatch} from 'react-redux';
import NoDataFoundComponent from '../../common/NoDataFoundComponent';

const JobExperienceSection = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const authUser = useAuthUser<YouthAuthUser>();
  const dispatch = useDispatch();

  const {
    data: jobExperiences,
    isLoading,
    mutate: mutateJobExperiences,
  } = useFetchYouthJobExperiences();
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
  const updateProfile = () => {
    (async () => {
      const response = await getYouthProfile();
      if (isResponseSuccess(response) && response.data) {
        dispatch({
          type: UPDATE_AUTH_USER,
          payload: getYouthAuthUserObject({...authUser, ...response.data}),
        });
      }
    })();
  };
  const closeJobExperienceAddEditForm = useCallback(() => {
    updateProfile();
    mutateJobExperiences();
    setIsOpenJobExperienceAddEditForm(false);
  }, []);

  const deleteJobExperienceItem = useCallback(async (itemId: number) => {
    let response = await deleteJobExperience(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='job_experience.label' />}}
        />,
      );
      updateProfile();
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
          icon={<Add />}
          onClick={() => openJobExperienceAddEditForm(null)}
        />
      }>
      {!jobExperiences || jobExperiences?.length == 0 ? (
        <>
          <HorizontalLine />
          <Box sx={{display: 'flex'}}>
            <Avatar>C</Avatar>
            <Typography style={{marginLeft: '15px'}}>
              <NoDataFoundComponent
                messageType={messages['common.job_experience']}
                messageTextType={'inherit'}
              />
            </Typography>
          </Box>
        </>
      ) : (
        <JobExperiences
          jobExperiences={jobExperiences || []}
          onOpenAddEditForm={openJobExperienceAddEditForm}
          onDeleteJobExperience={deleteJobExperienceItem}
        />
      )}
    </ContentLayout>
  );
};

export default JobExperienceSection;
