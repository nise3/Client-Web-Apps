import {Avatar, Box, Typography} from '@mui/material';
import {Add} from '@mui/icons-material';
import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';
import LanguageAddEditPage from './LanguageAddEditPage';
import LanguageProficiencyViewPage from './LanguageProficiencyViewPage';
import CustomParabolaButton from '../component/CustomParabolaButton';
import ContentLayout from '../component/ContentLayout';
import HorizontalLine from '../component/HorizontalLine';
import {useFetchLanguageProficiencies} from '../../../../services/youthManagement/hooks';
import {YouthLanguageProficiency} from '../../../../services/youthManagement/typing';
import TextPrimary from '../component/TextPrimary';
import VerticalLine from '../component/VerticalLine';

const LanguageSection = () => {
  const {messages} = useIntl();
  const {
    data: languageProficiencies,
    isLoading,
    mutate: mutateLanguageProfeciencies,
  } = useFetchLanguageProficiencies();

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
    mutateLanguageProfeciencies();
  }, []);

  const openLanguageProficiencyView = useCallback(() => {
    setIsOpenLanguageProficiencyView(true);
  }, []);

  const closeLanguageProficiencyView = useCallback(() => {
    setIsOpenLanguageAddEditForm(false);
    setIsOpenLanguageProficiencyView(false);
  }, []);

  return (
    <React.Fragment>
      {isOpenLanguageProficiencyView && (
        <LanguageProficiencyViewPage
          onEdit={openLanguageAddEditForm}
          onClose={closeLanguageProficiencyView}
        />
      )}
      {isOpenLanguageAddEditForm && (
        <LanguageAddEditPage
          itemId={languageId}
          onClose={closeLanguageAddEditForm}
        />
      )}
      {!isOpenLanguageProficiencyView && !isOpenLanguageAddEditForm && (
        <ContentLayout
          title={messages['language_proficiency.title']}
          isLoading={isLoading}
          actions={
            <CustomParabolaButton
              buttonVariant={'outlined'}
              title={messages['language_proficiency.add'] as string}
              icon={<Add />}
              onClick={() => openLanguageAddEditForm(null)}
            />
          }>
          <HorizontalLine />
          <Box sx={{display: 'flex'}}>
            <Avatar>L</Avatar>
            <Box sx={{marginLeft: '15px'}}>
              {(!languageProficiencies ||
                languageProficiencies?.length == 0) && (
                <Typography>{messages['common.no_data_found']}</Typography>
              )}
              {languageProficiencies && (
                <React.Fragment>
                  <Box sx={{display: 'flex'}}>
                    {languageProficiencies.map(
                      (language: YouthLanguageProficiency, index: number) => (
                        <React.Fragment key={language.id}>
                          {index != 0 && <VerticalLine />}
                          <TextPrimary text={language.language_title} />
                        </React.Fragment>
                      ),
                    )}
                  </Box>
                  <Typography
                    variant={'caption'}
                    onClick={() => {
                      openLanguageProficiencyView();
                    }}
                    sx={{cursor: 'pointer'}}>
                    {messages['language_proficiency.view']}
                  </Typography>
                </React.Fragment>
              )}
            </Box>
          </Box>
        </ContentLayout>
      )}
    </React.Fragment>
  );
};

export default LanguageSection;
