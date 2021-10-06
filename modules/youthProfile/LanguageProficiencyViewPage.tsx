import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import yup from '../../@softbd/libs/yup';
import {useIntl} from 'react-intl';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import EditButton from '../../@softbd/elements/button/EditButton/EditButton';
import {useRouter} from 'next/router';

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

const LanguageProficiencyViewPage = () => {
  const {messages} = useIntl();
  const router = useRouter();

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

  const editLanguage = useCallback((itemId: number) => {
    const URL = '/../../youth-profile-edit/language/__'.replace(
      '__',
      String(itemId),
    );
    router.push(URL);
  }, []);

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

  return (
    <TableContainer component={Paper}>
      <Table size={'small'} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>{messages['language.label']}</TableCell>
            <TableCell>{messages['language.read']}</TableCell>
            <TableCell>{messages['language.write']}</TableCell>
            <TableCell>{messages['language.speak']}</TableCell>
            <TableCell>{messages['language.understand']}</TableCell>
            <TableCell>{messages['language.action']}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {languages.map((language, i) => (
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
                  onClick={() => editLanguage(language.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LanguageProficiencyViewPage;
