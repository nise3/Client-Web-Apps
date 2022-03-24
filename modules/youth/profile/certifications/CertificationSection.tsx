import {Add} from '@mui/icons-material';
import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';
import {isResponseSuccess} from '../../../../@softbd/utilities/helpers';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import CertificateAddEditPage from './CertificateAddEditPage';
import {deleteCertificate} from '../../../../services/youthManagement/CertificateService';
import {useFetchYouthCertificates} from '../../../../services/youthManagement/hooks';
import ContentLayout from '../component/ContentLayout';
import CustomParabolaButton from '../component/CustomParabolaButton';
import Certifications from './Certifications';
import HorizontalLine from '../component/HorizontalLine';
import {Avatar, Box} from '@mui/material';
import {getYouthProfile} from '../../../../services/youthManagement/YouthService';
import {UPDATE_AUTH_USER} from '../../../../redux/types/actions/Auth.actions';
import {getYouthAuthUserObject} from '../../../../redux/actions';
import {useDispatch} from 'react-redux';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../../redux/types/models/CommonAuthUser';
import NoDataFoundComponent from '../../common/NoDataFoundComponent';

const CertificationSection = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const dispatch = useDispatch();
  const authUser = useAuthUser<YouthAuthUser>();
  const [isOpenCertificateAddEditForm, setIsOpenCertificateAddEditForm] =
    useState<boolean>(false);
  const [certificateItemId, setCertificateItemId] = useState<number | null>(
    null,
  );

  const {
    data: certificates,
    isLoading,
    mutate: mutateCertifications,
  } = useFetchYouthCertificates();

  const openCertificateAddEditForm = useCallback(
    (itemId: number | null = null) => {
      setCertificateItemId(itemId);
      setIsOpenCertificateAddEditForm(true);
    },
    [],
  );

  const closeCertificateAddEditForm = useCallback(() => {
    setCertificateItemId(null);
    setIsOpenCertificateAddEditForm(false);
    mutateCertifications();
    updateProfile();
  }, []);

  const updateProfile = () => {
    (async () => {
      const response = await getYouthProfile();
      /*      console.log('response-----', response);*/
      if (isResponseSuccess(response) && response.data) {
        dispatch({
          type: UPDATE_AUTH_USER,
          payload: getYouthAuthUserObject({...authUser, ...response.data}),
        });
      }
    })();
  };

  const deleteCertificationItem = useCallback(async (itemId: number) => {
    let response = await deleteCertificate(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='certificate.label' />}}
        />,
      );
      updateProfile();
      mutateCertifications();
    }
  }, []);

  return isOpenCertificateAddEditForm ? (
    <CertificateAddEditPage
      itemId={certificateItemId}
      onClose={closeCertificateAddEditForm}
    />
  ) : (
    <ContentLayout
      title={messages['common.certificate']}
      isLoading={isLoading}
      actions={
        <CustomParabolaButton
          buttonVariant={'outlined'}
          title={messages['common.add_new_certificate'] as string}
          icon={<Add />}
          onClick={() => openCertificateAddEditForm(null)}
        />
      }>
      {!certificates || certificates?.length == 0 ? (
        <>
          <HorizontalLine />
          <Box sx={{display: 'flex'}}>
            <Avatar>C</Avatar>
            <NoDataFoundComponent
              messageType={messages['common.certificate']}
              messageTextType={'inherit'}
              sx={{marginLeft: '15px', marginTop: '10px'}}
            />
          </Box>
        </>
      ) : (
        <Certifications
          certificates={certificates}
          onEditClick={openCertificateAddEditForm}
          onDeleteClick={deleteCertificationItem}
        />
      )}
    </ContentLayout>
  );
};
export default CertificationSection;
