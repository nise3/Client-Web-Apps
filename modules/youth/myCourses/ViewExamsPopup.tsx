import React, {FC} from 'react';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import FrontendCustomModal from '../../../@softbd/modals/FrontendCustomModal/FrontendCustomModal';
import {useIntl} from 'react-intl';
import {Link} from '../../../@softbd/elements/common';
import {getIntlDateFromString} from '../../../@softbd/utilities/helpers';

interface ViewExamsPopupProps {
  onClose: () => void;
  exams: any;
}
const ViewExamsPopup: FC<ViewExamsPopupProps> = ({onClose, exams}) => {
  const {messages, formatDate} = useIntl();
  return (
    <FrontendCustomModal
      onClose={onClose}
      open={true}
      title={
        <>
          <DriveFileRenameOutlineIcon />
          <IntlMessages id='common.exam_schedule' />
        </>
      }
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      actions={
        <Button startIcon={<CancelIcon />} variant='outlined' onClick={onClose}>
          {'Cancel'}
        </Button>
      }>
      <TableContainer component={Paper}>
        <Table size={'small'} aria-label='Language proficiency table'>
          <TableHead>
            <TableRow>
              <TableCell>{messages['subject.label']}</TableCell>
              <TableCell>{messages['common.title']}</TableCell>
              <TableCell>{messages['common.start_time']}</TableCell>
              <TableCell>{messages['common.duration']}</TableCell>
              <TableCell>{messages['exam.label']}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams && exams.length ? (
              (exams || []).map((exam: any, index: number) => {
                console.log('start', exam?.exam_date);
                return (
                  <TableRow key={index}>
                    <TableCell component='th' scope='language'>
                      {exam?.exam_title} {exam?.subject_title}
                    </TableCell>
                    <TableCell component='th' scope='language'>
                      {exam?.title}
                    </TableCell>
                    <TableCell component='th' scope='language'>
                      {exam?.exam_date
                        ? getIntlDateFromString(formatDate, exam?.exam_date)
                        : ''}
                    </TableCell>
                    <TableCell>{exam?.duration + ' Minutes'}</TableCell>
                    <TableCell>
                      <Link href={`exam/${exam?.exam_id}`}>
                        <Button>{messages['common.attend_exam']}</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </FrontendCustomModal>
  );
};

export default ViewExamsPopup;
