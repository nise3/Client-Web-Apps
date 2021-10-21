import React, {useCallback} from 'react';
import {useIntl} from 'react-intl';
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Zoom,
} from '@mui/material';
import EditButton from '../../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../../@softbd/elements/button/DeleteButton/DeleteButton';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import {isResponseSuccess} from '../../../../@softbd/utilities/helpers';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {Close as CloseIcon} from '@mui/icons-material';
import {useFetchLanguageProficiencies} from '../../../../services/youthManagement/hooks';
import ContentLayout from '../component/ContentLayout';
import {deleteLanguageProficiency} from '../../../../services/youthManagement/LanguageProficiencyService';
import {YouthLanguageProficiency} from '../../../../services/youthManagement/typing';
import {
  LanguageProficiencySpeakingType,
  LanguageProficiencyType,
} from '../utilities/LanguageProficiencyType';

type LanguageProficiencyViewPageProps = {
  onEdit: (itemId: number) => void;
  onClose: () => void;
};

const LanguageProficiencyViewPage = ({
  onEdit,
  onClose,
}: LanguageProficiencyViewPageProps) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const {
    data: languageProficiencies,
    isLoading,
    mutate: mutateLanguageProficiencies,
  } = useFetchLanguageProficiencies();

  const deleteLanguageProficiencyItem = useCallback(async (itemId: number) => {
    let response = await deleteLanguageProficiency(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='language_proficiency.title' />}}
        />,
      );
      mutateLanguageProficiencies();
    }
  }, []);

  const getLanguageProficiencyTypeCaption = (
    type: number | string | undefined,
  ) => {
    switch (String(type)) {
      case LanguageProficiencyType.EASILY:
        return messages['common.easily'];
      case LanguageProficiencyType.NOT_EASILY:
        return messages['common.not_easily'];
      default:
        return messages['common.easily'];
    }
  };
  const getLanguageProficiencySpeakingTypeCaption = (
    type: number | string | undefined,
  ) => {
    switch (String(type)) {
      case LanguageProficiencySpeakingType.FLUENTLY:
        return messages['common.fluent'];
      case LanguageProficiencySpeakingType.NOT_FLUENTLY:
        return messages['common.not_fluent'];
      default:
        return messages['common.fluent'];
    }
  };

  return (
    <Zoom in={true}>
      <Box>
        <ContentLayout
          title={messages['language_proficiency.title']}
          isLoading={isLoading}
          actions={
            <IconButton aria-label='close' onClick={onClose} size='large'>
              <CloseIcon />
            </IconButton>
          }>
          <TableContainer component={Paper}>
            <Table size={'small'} aria-label='Language proficiency table'>
              <TableHead>
                <TableRow>
                  <TableCell>{messages['language.label']}</TableCell>
                  <TableCell>{messages['language.read']}</TableCell>
                  <TableCell>{messages['language.write']}</TableCell>
                  <TableCell>{messages['language.speak']}</TableCell>
                  <TableCell>{messages['language.understand']}</TableCell>
                  <TableCell>{messages['common.actions']}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(languageProficiencies || []).map(
                  (language: YouthLanguageProficiency, index: number) => (
                    <TableRow key={index}>
                      <TableCell component='th' scope='language'>
                        {language?.language_title}
                      </TableCell>
                      <TableCell>
                        {getLanguageProficiencyTypeCaption(
                          language?.reading_proficiency_level,
                        )}
                      </TableCell>
                      <TableCell>
                        {getLanguageProficiencyTypeCaption(
                          language?.writing_proficiency_level,
                        )}
                      </TableCell>
                      <TableCell>
                        {getLanguageProficiencySpeakingTypeCaption(
                          language?.speaking_proficiency_level,
                        )}
                      </TableCell>
                      <TableCell>
                        {getLanguageProficiencyTypeCaption(
                          language?.understand_proficiency_level,
                        )}
                      </TableCell>
                      <TableCell>
                        <EditButton
                          size={'small'}
                          onClick={() => onEdit(language.id)}
                        />
                        <DeleteButton
                          deleteAction={() =>
                            deleteLanguageProficiencyItem(language.id)
                          }
                          deleteTitle={'Delete language'}
                        />
                      </TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </ContentLayout>
      </Box>
    </Zoom>
  );
};

export default LanguageProficiencyViewPage;
