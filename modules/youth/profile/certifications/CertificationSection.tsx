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
import {Avatar, Box, Typography} from '@mui/material';

const CertificationSection = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
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
  }, []);

  const deleteCertificationItem = useCallback(async (itemId: number) => {
    let response = await deleteCertificate(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='certificate.label' />}}
        />,
      );
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
            <Typography style={{marginLeft: '15px'}}>
              {messages['common.no_data_found']}
            </Typography>
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
