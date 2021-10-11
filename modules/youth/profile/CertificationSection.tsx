import {Card, CardContent} from '@mui/material';
import CardHeader from './CardHeader';
import {Add} from '@mui/icons-material';
import CustomContentCard from './CustomContentCard';
import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import CertificateAddEditPage from './CertificateAddEditPage';
import {deleteCertificate} from '../../../services/youthManagement/CertificateService';
import {useFetchYouthCertificates} from '../../../services/youthManagement/hooks';
import {YouthCertificate} from '../../../services/youthManagement/typing';

const CertificationSection = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const [isOpenCertificateAddEditForm, setIsOpenCertificateAddEditForm] =
    useState<boolean>(false);
  const [certificateItemId, setCertificateItemId] = useState<number | null>(
    null,
  );

  const {data: certificates} = useFetchYouthCertificates();

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
  }, []);

  const deleteCertificationItem = async (itemId: number) => {
    let response = await deleteCertificate(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='certificate.label' />}}
        />,
      );
    }
  };

  return isOpenCertificateAddEditForm ? (
    <CertificateAddEditPage
      itemId={certificateItemId}
      onClose={closeCertificateAddEditForm}
    />
  ) : (
    <Card>
      <CardContent>
        <CardHeader
          headerTitle={messages['common.certifications'] as string}
          buttons={[
            {
              label: messages['common.add_new_certificate'] as string,
              icon: <Add />,
              onclick: () => openCertificateAddEditForm(null),
            },
          ]}
        />
        {certificates &&
          certificates.map((certificate: YouthCertificate) => {
            return (
              <React.Fragment key={certificate.id}>
                <CustomContentCard
                  contentTitle={certificate.certification_name}
                  contentLogo={certificate.certificate_file_path}
                  contentServiceProvider={certificate.institute_name}
                  date={certificate.start_date}
                  location={certificate.location}
                  contentEditButton={() =>
                    openCertificateAddEditForm(certificate.id)
                  }
                  contentDeleteButton={() =>
                    deleteCertificationItem(certificate.id)
                  }
                />
              </React.Fragment>
            );
          })}
      </CardContent>
    </Card>
  );
};

export default CertificationSection;
