import {Box, Card, CardContent} from '@mui/material';
import CardHeader from './CardHeader';
import {Add, BusinessCenter} from '@mui/icons-material';
import CustomContentCard from './CustomContentCard';
import React from 'react';
import {useIntl} from 'react-intl';

type LanguageSectionProp = {
  onclick: (itemId: number | null) => void;
};

const LanguageSection = ({onclick}: LanguageSectionProp) => {
  const {messages} = useIntl();

  return (
    <Box mt={4}>
      <Card>
        <CardContent>
          <CardHeader
            headerTitle={messages['common.language'] as string}
            buttons={[
              {
                label: messages['common.add_language'] as string,
                icon: <Add />,
                onclick: () => onclick(null),
              },
              {
                label: messages['common.edit_btn'] as string,
                icon: <Add />,
                onclick: () => onclick(null),
              },
            ]}
          />
          <CustomContentCard
            contentTitle={'English, Bangla, Hindi'}
            contentLogo={<BusinessCenter />}
            contentServiceProvider={
              <Box
                sx={{
                  '&:hover': {
                    cursor: 'pointer',
                  },
                }}
                component={'span'}
                onClick={() => onclick(null)}>
                View language proficiency
              </Box>
            }
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default LanguageSection;
