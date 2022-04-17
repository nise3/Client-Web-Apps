import React, {FC, useCallback} from 'react';
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

interface ViewExamsPopupProps {
  onClose: () => void;
  exams: any;
}
const ViewExamsPopup: FC<ViewExamsPopupProps> = ({onClose, exams}) => {
  const {messages} = useIntl();

  const getExamEndDate = useCallback((startDate: any, duration: any) => {
    return <></>;
  }, []);
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
              <TableCell>{messages['common.end_time']}</TableCell>
              <TableCell>{messages['exam.label']}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams && exams.length ? (
              (exams || []).map((exam: any, index: number) => (
                <TableRow key={index}>
                  <TableCell component='th' scope='language'>
                    {exam?.exam_title}
                  </TableCell>
                  <TableCell component='th' scope='language'>
                    {exam?.subject_title}
                  </TableCell>
                  <TableCell component='th' scope='language'>
                    {exam?.start_date}
                  </TableCell>
                  <TableCell>
                    {getExamEndDate(exam?.start_date, exam?.duration)}
                  </TableCell>
                  <TableCell>
                    <Link href={`exam/${exam?.exam_id}`}>
                      <Button>{messages['common.attend_exam']}</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
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
