import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import React, {useEffect, useMemo, useState} from 'react';
import yup from '../../../../@softbd/libs/yup';
import {useIntl} from 'react-intl';
import {
  Box,
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
import {deleteRankType} from '../../../../services/organaizationManagement/RankTypeService';
import {isResponseSuccess} from '../../../../@softbd/utilities/helpers';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {DialogTitle} from '../../../../@softbd/modals/CustomMuiModal/CustomMuiModal';

let languages = [
  {
    id: 1,
    title: 'English',
    read: 'Easily',
    write: 'Not Easily',
    speak: 'Fluently',
    understand: 'easily',
  },
  {
    id: 2,
    title: 'Bangla',
    read: 'Easily',
    write: 'Not Easily',
    speak: 'Fluently',
    understand: 'easily',
  },
];

const initialValues = {
  language: '',
  read: '',
  write: '',
  speak: '',
  understand: '',
};
type LanguageProficiencyViewPageProps = {
  onEdit: (itemId: number) => void;
  onClose: () => void;
};

const LanguageProficiencyViewPage = ({
  onEdit,
  onClose,
}: LanguageProficiencyViewPageProps) => {
  const {messages} = useIntl();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      language: yup.string().label(messages['language.label'] as string),
      read: yup.string().label(messages['language.read'] as string),
      write: yup.string().label(messages['language.write'] as string),
      speak: yup.string().label(messages['language.speak'] as string),
      understand: yup.string().label(messages['language.understand'] as string),
    });
  }, [messages]);

  const {reset} = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [itemData] = useState<any>(null);

  useEffect(() => {
    if (itemData) {
      reset({
        language: itemData.language,
        read: itemData?.read,
        write: itemData?.write,
        speak: itemData?.speak,
        understand: itemData?.understand,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const {successStack} = useNotiStack();

  const deleteLanguageItem = async (itemId: number) => {
    let response = await deleteRankType(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='language.label' />}}
        />,
      );
    }
  };

  return (
    <Zoom in={true}>
      <TableContainer component={Paper}>
        <Box sx={{position: 'relative'}}>
          <DialogTitle onClose={onClose}>
            {messages['language.proficiency']}
          </DialogTitle>
        </Box>

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
            {languages.map((language, i: number) => (
              <TableRow key={i}>
                <TableCell component='th' scope='language'>
                  {language.title}
                </TableCell>
                <TableCell>{language.read}</TableCell>
                <TableCell>{language.write}</TableCell>
                <TableCell>{language.speak}</TableCell>
                <TableCell>{language.understand}</TableCell>
                <TableCell>
                  <EditButton
                    size={'small'}
                    onClick={() => onEdit(language.id)}
                  />
                  <DeleteButton
                    deleteAction={() => deleteLanguageItem(language.id)}
                    deleteTitle={'Delete language'}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Zoom>
  );
};

export default LanguageProficiencyViewPage;
