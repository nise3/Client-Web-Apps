import {Box, Card, CardContent} from '@mui/material';
import CardHeader from './CardHeader';
import {Add, BusinessCenter} from '@mui/icons-material';
import CustomContentCard from './CustomContentCard';
import React from 'react';
import {useIntl} from 'react-intl';

type CertificationSectionProp = {
  onclick: (itemId: number | null) => void;
};

const certificates = [
  {
    id: 1,
    title: 'Javascript programming',
    image: '',
    institute_name: 'MIT',
    location: 'NC',
    achieve_date: '10-11-2020',
  },
  {
    id: 2,
    title: 'C programming',
    image: '',
    institute_name: 'Harvard',
    location: 'NC',
    achieve_date: '10-11-2020',
  },
];

const CertificationSection = ({onclick}: CertificationSectionProp) => {
  const {messages} = useIntl();

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
              <CustomContentCard
                contentTitle={certificate.title}
                contentLogo={<BusinessCenter />}
                contentServiceProvider={certificate.institute_name}
                date={certificate.achieve_date}
                location={certificate.location}
                contentEditButton={() => onclick(certificate.id)}
              />
            );
          })}
        </CardContent>
      </Card>
    </Box>
  );
};

export default CertificationSection;
