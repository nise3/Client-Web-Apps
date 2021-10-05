import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import {
  isResponseSuccess,
  isValidationError,
} from '../../@softbd/utilities/helpers';
import CancelButton from '../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../@softbd/elements/button/SubmitButton/SubmitButton';
import IntlMessages from '../../@crema/utility/IntlMessages';
import HookFormMuiModal from '../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import {setServerValidationErrors} from '../../@softbd/utilities/validationErrorHandler';
import {
  createRankType,
  updateRankType,
} from '../../services/organaizationManagement/RankTypeService';
import yup from '../../@softbd/libs/yup';
import useNotiStack from '../../@softbd/hooks/useNotifyStack';
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

interface LanguageProficiencyViewPopupProps {
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

const LanguageProficiencyViewPopup: FC<LanguageProficiencyViewPopupProps> = ({itemId, ...props}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const isEdit = itemId != null;

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
    handleSubmit,
    setError,
    formState: {isSubmitting},
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
  }

  const onSubmit: SubmitHandler<any> = async (data) => {
    const response = itemId
      ? await updateRankType(itemId, data)
      : await createRankType(data);
    if (isResponseSuccess(response) && isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='rank_types.label' />}}
        />,
      );
      props.onClose();
    } else if (isResponseSuccess(response) && !isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_created_successfully'
          values={{subject: <IntlMessages id='rank_types.label' />}}
        />,
      );
      props.onClose();
    } else if (isValidationError(response)) {
      setServerValidationErrors(response.errors, setError, validationSchema);
    }
  };

  return (
    <HookFormMuiModal
      open={true}
      {...props}
      title={
        <>
          <IntlMessages
            id='language_proficiency.title'
          />
        </>
      }
      maxWidth={'lg'}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={false} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={false} />
        </>
      }>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>{messages['language.label']}</TableCell>
              <TableCell align='right'>{messages['language.read']}</TableCell>
              <TableCell align='right'>{messages['language.write']}</TableCell>
              <TableCell align='right'>{messages['language.speak']}</TableCell>
              <TableCell align='right'>{messages['language.understand']}</TableCell>
              <TableCell align='right'>{messages['language.action']}</TableCell>
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
    </HookFormMuiModal>
  );
};

export default LanguageProficiencyViewPopup;
