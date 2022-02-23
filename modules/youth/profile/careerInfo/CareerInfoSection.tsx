import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import {useDispatch} from 'react-redux';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../../redux/types/models/CommonAuthUser';
import {getYouthProfile} from '../../../../services/youthManagement/YouthService';
import {isResponseSuccess} from '../../../../@softbd/utilities/helpers';
import {UPDATE_AUTH_USER} from '../../../../redux/types/actions/Auth.actions';
import {getYouthAuthUserObject} from '../../../../redux/actions';
import ContentLayout from '../component/ContentLayout';
import CustomParabolaButton from '../component/CustomParabolaButton';
import {Edit} from '@mui/icons-material';
import {Box, Grid} from '@mui/material';
import DetailsInputView from '../../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {JobLevel} from '../../../dashboard/jobLists/jobPost/enums/JobPostEnums';
import CareerInfoUpdateForm from './CareerInfoUpdateForm';
import {Body2} from '../../../../@softbd/elements/common';

const CareerInfoSection = () => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const dispatch = useDispatch();
  const authUser = useAuthUser<YouthAuthUser>();
  const [isOpenCareerInfoForm, setIsOpenCareerInfoForm] =
    useState<boolean>(false);

  const openCareerInfoForm = useCallback(() => {
    setIsOpenCareerInfoForm(true);
  }, []);

  const closeCareerInfoForm = useCallback(() => {
    setIsOpenCareerInfoForm(false);
    updateProfile();
  }, []);

  const updateProfile = () => {
    (async () => {
      try {
        const response = await getYouthProfile();
        if (isResponseSuccess(response) && response.data) {
          dispatch({
            type: UPDATE_AUTH_USER,
            payload: getYouthAuthUserObject({...authUser, ...response.data}),
          });
        }
      } catch (error: any) {
        errorStack('Failed to update profile');
      }
    })();
  };

  const getJobLevelText = () => {
    switch (authUser?.job_level) {
      case JobLevel.ENTRY:
        return messages['label.job_level_entry'];
      case JobLevel.MID:
        return messages['label.job_level_mid'];
      case JobLevel.TOP:
        return messages['label.job_level_top'];
      default:
        return '';
    }
  };

  return isOpenCareerInfoForm ? (
    <CareerInfoUpdateForm onUpdateFormClose={closeCareerInfoForm} />
  ) : (
    <ContentLayout
      title={messages['youth.career_and_application_info']}
      isLoading={false}
      actions={
        <CustomParabolaButton
          buttonVariant={'outlined'}
          title={messages['common.edit_btn'] as string}
          icon={<Edit />}
          onClick={() => openCareerInfoForm()}
        />
      }>
      <Box>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Body2 sx={{color: 'green', fontStyle: 'italic'}}>
              {messages['youth.career_and_application_info_sub_title']}
            </Body2>
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.expected_salary']}
              value={authUser?.expected_salary}
              isLoading={false}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['youth.job_level']}
              value={getJobLevelText()}
              isLoading={false}
            />
          </Grid>
        </Grid>
      </Box>
    </ContentLayout>
  );
};

export default CareerInfoSection;
