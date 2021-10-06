import {Box, Card, CardContent} from '@mui/material';
import CardHeader from './CardHeader';
import {Add, BusinessCenter} from '@mui/icons-material';
import CustomContentCard from './CustomContentCard';
import React from 'react';
import {useIntl} from 'react-intl';

type EducationSectionProp = {
  onclick: (itemId: number | null) => void;
};

const EducationSection = ({onclick}: EducationSectionProp) => {
  const {messages} = useIntl();

  return (
    <Box mt={4}>
      <Card>
        <CardContent>
          <CardHeader
            headerTitle={messages['common.education'] as string}
            buttons={[
              {
                label: messages['common.add_new_education'] as string,
                icon: <Add />,
                onclick: () => onclick(null),
              },
            ]}
          />
          <CustomContentCard
            contentTitle={'Mobile Ux Design course'}
            contentLogo={<BusinessCenter />}
            contentServiceProvider={'Interaction Design Foundation'}
            date={'Oct 2020'}
            location={'Dhaka 1215'}
            contentEditButton={() => onclick(1)}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default EducationSection;
