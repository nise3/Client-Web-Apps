import {Box, Card, CardContent} from '@mui/material';
import CardHeader from './CardHeader';
import {Add} from '@mui/icons-material';
import CustomContentCard from './CustomContentCard';
import React from 'react';
import {useIntl} from 'react-intl';
import {deleteRankType} from '../../../services/organaizationManagement/RankTypeService';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';

type CertificationSectionProp = {
  onclick: (itemId: number | null) => void;
};

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

const CertificationSection = ({onclick}: CertificationSectionProp) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();

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

  return (
    <Box mt={4}>
      <Card>
        <CardContent>
          <CardHeader
            headerTitle={messages['common.certifications'] as string}
            buttons={[
              {
                label: messages['common.add_new_certificate'] as string,
                icon: <Add />,
                onclick: () => onclick(null),
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
                  contentEditButton={() => onclick(certificate.id)}
                  contentDeleteButton={() =>
                    deleteCertificationItem(certificate.id)
                  }
                />
              </React.Fragment>
            );
          })}
        </CardContent>
      </Card>
    </Box>
  );
};

export default CertificationSection;
