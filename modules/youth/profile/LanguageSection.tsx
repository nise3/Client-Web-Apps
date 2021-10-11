import {Box, Card, CardContent} from '@mui/material';
import CardHeader from './CardHeader';
import {Add} from '@mui/icons-material';
import CustomContentCard from './CustomContentCard';
import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';
import LanguageAddEditPage from './LanguageAddEditPage';
import LanguageProficiencyViewPage from './LanguageProficiencyViewPage';

const LanguageSection = () => {
  const {messages} = useIntl();
  const [isOpenLanguageAddEditForm, setIsOpenLanguageAddEditForm] =
    useState<boolean>(false);
  const [isOpenLanguageProficiencyView, setIsOpenLanguageProficiencyView] =
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

  const openLanguageProficiencyView = useCallback(() => {
    setIsOpenLanguageProficiencyView(true);
  }, []);

  const closeLanguageProficiencyView = useCallback(() => {
    setIsOpenLanguageProficiencyView(false);
  }, []);

  return isOpenLanguageAddEditForm ? (
    isOpenLanguageProficiencyView ? (
      <>
        <LanguageProficiencyViewPage
          onEdit={openLanguageAddEditForm}
          onClose={closeLanguageProficiencyView}
        />
        <LanguageAddEditPage
          itemId={languageId}
          onClose={closeLanguageAddEditForm}
          openLanguageEditForm={openLanguageAddEditForm}
        />
      </>
    ) : (
      <LanguageAddEditPage
        itemId={languageId}
        onClose={closeLanguageAddEditForm}
        openLanguageEditForm={openLanguageAddEditForm}
      />
    )
  ) : isOpenLanguageProficiencyView ? (
    <LanguageProficiencyViewPage
      onEdit={openLanguageAddEditForm}
      onClose={closeLanguageProficiencyView}
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
          ]}
        />
        <CustomContentCard
          contentTitle={'English, Bangla, Hindi'}
          contentLogo='L'
          contentServiceProvider={
            <Box
              sx={{
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
              component={'span'}
              onClick={() => openLanguageProficiencyView()}>
              View language proficiency
            </Box>
          }
        />
      </CardContent>
    </Card>
  );
};

export default LanguageSection;
