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
import {Body1, Link} from '../../../@softbd/elements/common';
import {
  getIntlDateFromString,
  getIntlNumber,
  getIntlTimeFromString,
} from '../../../@softbd/utilities/helpers';
import {LINK_FRONTEND_YOUTH_EXAMS} from '../../../@softbd/common/appLinks';
import {ExamTypes} from '../../dashboard/exams/ExamEnums';

interface ViewExamsPopupProps {
  onClose: () => void;
  exams: any;
}

const ViewExamsPopup: FC<ViewExamsPopupProps> = ({onClose, exams}) => {
  const {messages, formatDate, formatTime, formatNumber} = useIntl();

  const getExamTimeDuration = useCallback((duration: any) => {
    let hour = Math.floor(duration / 60);
    let minutes = Math.floor(duration % 60);
    if (hour > 0) {
      if (minutes > 0) {
        return (
          <>
            {getIntlNumber(formatNumber, hour) +
              ' ' +
              messages['common.hour'] +
              ' ' +
              getIntlNumber(formatNumber, minutes) +
              ' ' +
              messages['common.minute']}
          </>
        );
      } else {
        return (
          <>
            {getIntlNumber(formatNumber, hour) + ' ' + messages['common.hour']}
          </>
        );
      }
    } else {
      return (
        <>
          {getIntlNumber(formatNumber, minutes) +
            ' ' +
            messages['common.minute']}
        </>
      );
    }
  }, []);

  const getType = (type: any) => {
    switch (Number(type)) {
      case ExamTypes.ONLINE:
        return messages['common.online'];
      case ExamTypes.OFFLINE:
        return messages['common.offline'];
      default:
        return '';
    }
  };

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
        <Button
          startIcon={<CancelIcon />}
          variant='outlined'
          onClick={onClose}
          color={'warning'}>
          {'Cancel'}
        </Button>
      }>
      <TableContainer component={Paper}>
        <Table size={'small'} aria-label='Language proficiency table'>
          <TableHead>
            <TableRow>
              <TableCell>{messages['common.title']}</TableCell>
              <TableCell>{messages['subject.label']}</TableCell>
              <TableCell>{messages['common.type']}</TableCell>
              <TableCell>{messages['common.start_time']}</TableCell>
              <TableCell>{messages['common.duration']}</TableCell>
              <TableCell>
                {messages['common.obtained_mark']}/
                {messages['common.total_marks']}
              </TableCell>
              <TableCell>{messages['common.status']}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams && exams.length ? (
              (exams || []).map((exam: any, index: number) => {
                let isOver =
                  new Date(exam?.exam_date).getTime() +
                    Number(exam?.duration) * 60 * 1000 <
                  new Date().getTime();

                return (
                  <TableRow key={index}>
                    <TableCell component='th' scope='language'>
                      {exam?.title}
                    </TableCell>
                    <TableCell component='th' scope='language'>
                      {exam?.exam_title} {exam?.subject_title}
                    </TableCell>
                    <TableCell component='th' scope='language'>
                      {getType(exam?.type)}
                    </TableCell>
                    <TableCell component='th' scope='language'>
                      {exam?.exam_date
                        ? getIntlDateFromString(formatDate, exam?.exam_date) +
                          ',' +
                          getIntlTimeFromString(formatTime, exam?.exam_date)
                        : ''}
                    </TableCell>
                    <TableCell>{getExamTimeDuration(exam?.duration)}</TableCell>
                    <TableCell>
                      {exam?.marks_obtained
                        ? formatNumber(exam?.marks_obtained) +
                          '/' +
                          formatNumber(exam?.total_marks)
                        : messages['common.in_progress']}
                    </TableCell>
                    <TableCell>
                      {exam.type == ExamTypes.ONLINE &&
                        (exam?.participated ? (
                          <Body1>{messages['exam.already_participated']}</Body1>
                        ) : isOver ? (
                          <Body1>{messages['exam.exam_over']}</Body1>
                        ) : (
                          <Link
                            href={
                              LINK_FRONTEND_YOUTH_EXAMS + `${exam?.exam_id}`
                            }>
                            <Button variant={'outlined'}>
                              {messages['common.attend_exam']}
                            </Button>
                          </Link>
                        ))}
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
