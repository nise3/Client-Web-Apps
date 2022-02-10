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
import ContentLayout from '../component/ContentLayout';
import {deleteLanguageProficiency} from '../../../../services/youthManagement/LanguageProficiencyService';
import {YouthLanguageProficiency} from '../../../../services/youthManagement/typing';
import {
  LanguageProficiencySpeakingType,
  LanguageProficiencyType,
} from '../utilities/LanguageProficiencyType';
import {getYouthProfile} from '../../../../services/youthManagement/YouthService';
import {UPDATE_AUTH_USER} from '../../../../redux/types/actions/Auth.actions';
import {getYouthAuthUserObject} from '../../../../redux/actions';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../../redux/types/models/CommonAuthUser';
import {useDispatch} from 'react-redux';

type LanguageProficiencyViewPageProps = {
  onEdit: (itemId: number) => void;
  onClose: () => void;
  languageProficiencies: any;
  mutateLanguageProficiencies: () => void;
};

const LanguageProficiencyViewPage = ({
  onEdit,
  onClose,
  languageProficiencies,
  mutateLanguageProficiencies,
}: LanguageProficiencyViewPageProps) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const authUser = useAuthUser<YouthAuthUser>();
  const dispatch = useDispatch();

  const updateProfile = () => {
    (async () => {
      const response = await getYouthProfile();
      if (isResponseSuccess(response) && response.data) {
        dispatch({
          type: UPDATE_AUTH_USER,
          payload: getYouthAuthUserObject({...authUser, ...response.data}),
        });
      }
    })();
  };
  const deleteLanguageProficiencyItem = useCallback(async (itemId: number) => {
    let response = await deleteLanguageProficiency(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='language_proficiency.title' />}}
        />,
      );
      updateProfile();
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

  console.log('languageProficiencies: ', languageProficiencies);

  return (
    <Zoom in={true}>
      <Box>
        <ContentLayout
          title={messages['language_proficiency.title']}
          isLoading={false}
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
                          color={'primary'}
                          sx={{marginRight: '10px'}}
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
