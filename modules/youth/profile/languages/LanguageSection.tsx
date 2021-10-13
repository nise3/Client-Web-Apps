import {Avatar, Box, Typography} from '@mui/material';
import {BorderColor} from '@mui/icons-material';
import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';
import LanguageAddEditPage from './LanguageAddEditPage';
import LanguageProficiencyViewPage from './LanguageProficiencyViewPage';
import CustomParabolaButton from '../component/CustomParabolaButton';
import ContentLayout from '../component/ContentLayout';
import HorizontalLine from '../component/HorizontalLine';

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
    setIsOpenLanguageAddEditForm(false);
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
    <ContentLayout
      title={messages['common.language']}
      isLoading={false}
      actions={
        <CustomParabolaButton
          buttonVariant={'outlined'}
          title={messages['common.add_language'] as string}
          icon={<BorderColor />}
          onClick={() => openLanguageAddEditForm(null)}
        />
      }>
      <HorizontalLine />
      <Box sx={{display: 'flex'}}>
        <Avatar>L</Avatar>
        <Box sx={{marginLeft: '15px'}}>
          <Typography variant={'subtitle2'}>English, Bangla, Hindi</Typography>
          <Typography
            variant={'caption'}
            onClick={() => {
              openLanguageProficiencyView();
            }}
            sx={{cursor: 'pointer'}}>
            View language proficiency
          </Typography>
        </Box>
      </Box>
    </ContentLayout>
  );
};

export default LanguageSection;
