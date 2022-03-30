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
import {deleteGuardian} from '../../../../services/youthManagement/GuardianService';
import {Guardian} from '../../../../services/youthManagement/typing';

type GuardianViewPageProps = {
  onEdit: (itemId: number) => void;
  onClose: () => void;
  guardians: any;
  mutateGuardians: () => void;
};

const GuardianViewPage = ({
  onEdit,
  onClose,
  guardians,
  mutateGuardians,
}: GuardianViewPageProps) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();

  const deleteGuardianItem = useCallback(async (itemId: number) => {
    let response = await deleteGuardian(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='guardian.title' />}}
        />,
      );
      mutateGuardians();
    }
  }, []);

  return (
    <Zoom in={true}>
      <Box>
        <ContentLayout
          title={messages['guardian.title']}
          isLoading={false}
          actions={
            <IconButton aria-label='close' onClick={onClose} size='large'>
              <CloseIcon />
            </IconButton>
          }>
          <TableContainer component={Paper}>
            <Table size={'small'} aria-label="Guardian's table">
              <TableHead>
                <TableRow>
                  <TableCell>{messages['guardian.name']}</TableCell>
                  <TableCell>{messages['guardian.mobile']}</TableCell>
                  <TableCell>
                    {messages['guardian.relationship_type']}
                  </TableCell>
                  <TableCell>{messages['common.actions']}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(guardians || []).map((guardian: Guardian, index: number) => (
                  <TableRow key={index}>
                    <TableCell component='th'>{guardian?.name}</TableCell>
                    <TableCell>{guardian?.mobile}</TableCell>
                    <TableCell>
                      {messages['common.guardian_types'][
                        Number(guardian.relationship_type) - 1
                      ] +
                        (guardian.relationship_title
                          ? ' (' + guardian?.relationship_title + ')'
                          : '')}
                    </TableCell>
                    <TableCell>
                      <EditButton
                        size={'small'}
                        color={'primary'}
                        sx={{marginRight: '10px'}}
                        onClick={() => onEdit(guardian.id)}
                      />
                      <DeleteButton
                        deleteAction={() => deleteGuardianItem(guardian.id)}
                        deleteTitle={'Delete Guardian'}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ContentLayout>
      </Box>
    </Zoom>
  );
};

export default GuardianViewPage;
