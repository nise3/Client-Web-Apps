import {Box, Card, CardContent} from '@mui/material';
import CardHeader from './CardHeader';
import {Add, BusinessCenter} from '@mui/icons-material';
import CustomContentCard from './CustomContentCard';
import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';
import LanguageAddEditPage from './LanguageAddEditPage';

const LanguageSection = () => {
  const {messages} = useIntl();
  const [isOpenLanguageAddEditForm, setIsOpenLanguageAddEditForm] =
    useState<boolean>(false);
  const [languageId, setLanguageId] = useState<number | null>(null);

  const openLanguageAddEditForm = useCallback(
    (itemId: number | null = null) => {
      setLanguageId(itemId);
      setIsOpenLanguageAddEditForm(true);
    },
    [],
  );
  const closeLanguageAddEditForm = useCallback(() => {
    setLanguageId(null);
    setIsOpenLanguageAddEditForm(false);
  }, []);

  return isOpenLanguageAddEditForm ? (
    <LanguageAddEditPage
      itemId={languageId}
      onClose={closeLanguageAddEditForm}
      openLanguageEditForm={openLanguageAddEditForm}
    />
  ) : (
    <Card>
      <CardContent>
        <CardHeader
          headerTitle={messages['common.language'] as string}
          buttons={[
            {
              label: messages['common.add_language'] as string,
              icon: <Add />,
              onclick: () => openLanguageAddEditForm(null),
            },
            {
              label: messages['common.edit_btn'] as string,
              icon: <Add />,
              onclick: () => openLanguageAddEditForm(null),
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
              onClick={() => openLanguageAddEditForm(2)}>
              View language proficiency
            </Box>
          }
        />
      </CardContent>
    </Card>
  );
};

export default LanguageSection;
