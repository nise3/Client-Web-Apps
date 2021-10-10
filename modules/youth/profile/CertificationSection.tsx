import {Card, CardContent} from '@mui/material';
import CardHeader from './CardHeader';
import {Add} from '@mui/icons-material';
import CustomContentCard from './CustomContentCard';
import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';
import {deleteRankType} from '../../../services/organaizationManagement/RankTypeService';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import CertificateAddEditPage from './CertificateAddEditPage';

const certificates = [
  {
    id: 1,
    title: 'Javascript programming',
    image: '/images/userPageImages/profileImage.jpeg',
    institute_name: 'MIT',
    location: 'NC',
    achieve_date: '10-11-2020',
  },
  {
    id: 2,
    title: 'C programming',
    image: '/images/userPageImages/profileImage.jpeg',
    institute_name: 'Harvard',
    location: 'NC',
    achieve_date: '10-11-2020',
  },
];

const CertificationSection = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const [isOpenCertificateAddEditForm, setIsOpenCertificateAddEditForm] =
    useState<boolean>(false);
  const [certificateItemId, setCertificateItemId] = useState<number | null>(
    null,
  );

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
        {certificates.map((certificate) => {
          return (
            <React.Fragment key={certificate.id}>
              <CustomContentCard
                contentTitle={certificate.title}
                contentLogo={certificate.image}
                contentServiceProvider={certificate.institute_name}
                date={certificate.achieve_date}
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
