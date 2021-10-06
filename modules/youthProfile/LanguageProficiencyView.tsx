import {yupResolver} from '@hookform/resolvers/yup';
import React, {FC, useEffect, useMemo, useState} from 'react';
import yup from '../../@softbd/libs/yup';
import {useIntl} from 'react-intl';
import {
  Card, CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, Typography,
} from '@mui/material';
import EditButton from '../../@softbd/elements/button/EditButton/EditButton';
import {Box} from '@mui/system';
import {useForm} from 'react-hook-form';
import YouthProfileNavigationSidebar from './component/YouthProfileNavigationSidebar';

interface LanguageProficiencyViewProps {
  itemId: number | null;
  onClose: () => void;
}

let tableRow = [
  {
    language: 'English', read: 'Easily', write: 'Not Easily', speak: 'Fluently', understand: 'easily',
  },
  {
    language: 'Bangla', read: 'Easily', write: 'Not Easily', speak: 'Fluently', understand: 'easily',
  },
];

const initialValues = {
  language: '',
  read: '',
  write: '',
  speak: '',
  understand: '',
};

const LanguageProficiencyView: FC<LanguageProficiencyViewProps> = ({itemId, ...props}) => {
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

  const {
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [itemData, setItemData] = useState<any>(null);

  useEffect(() => {
    if (itemId) {
      setItemData({
        language: '1',
        read: '1',
        write: '1',
        speak: '1',
        understand: '1',
      });
    }
  }, [itemId]);

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

  const editLanguage = () => {
    console.log('this will be edit language');
  };

  return (
    <Box mt={4} mb={2}>
      <Grid container justifyContent={'center'} spacing={2}>
        <Grid item xs={3}>
          <YouthProfileNavigationSidebar />
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant={'h6'} mb={4}>
                {messages['language_proficiency.title']}
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{minWidth: 550}} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>{messages['language.label']}</TableCell>
                      <TableCell align='right'>{messages['language.read']}</TableCell>
                      <TableCell align='right'>{messages['language.write']}</TableCell>
                      <TableCell align='right'>{messages['language.speak']}</TableCell>
                      <TableCell align='right'>{messages['language.understand']}</TableCell>
                      <TableCell align='right'>{messages['common.actions']}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableRow.map((row, i) => (
                      <TableRow
                        key={i}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                        <TableCell component='th' scope='row'>{row.language}</TableCell>
                        <TableCell align='right'>{row.read}</TableCell>
                        <TableCell align='right'>{row.write}</TableCell>
                        <TableCell align='right'>{row.speak}</TableCell>
                        <TableCell align='right'>{row.understand}</TableCell>
                        <TableCell align='right'><EditButton onClick={editLanguage} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LanguageProficiencyView;
