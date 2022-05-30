import React, {FC, useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import Grid from '@mui/material/Grid';
import {
  useFetchResultConfigs,
  useFetchYouthBatchExams,
} from '../../../services/instituteManagement/hooks';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {Body1, Body2, Link} from '../../../@softbd/elements/common';
import {useRouter} from 'next/router';
import {ExamTypes} from '../exams/ExamEnums';
import {youthExamMarking} from '../../../services/instituteManagement/BatchService';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import {FILE_SERVER_FILE_VIEW_ENDPOINT} from '../../../@softbd/common/apiRoutes';
import Tooltip from '@mui/material/Tooltip';
import {DriveFileRenameOutline, InsertDriveFile} from '@mui/icons-material';
import {FiUser} from 'react-icons/fi';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import DoneIcon from '@mui/icons-material/Done';
import TextField from '@mui/material/TextField/TextField';

interface ExamListPopupProps {
  batchId: number;
  courseId: number;
  onClose: () => void;
  onOpen: (youthId: number, youthName: string) => void;
  youthId: number;
  youthName: string;
}

const ExamListPopup: FC<ExamListPopupProps> = ({
  batchId,
  youthId,
  courseId,
  youthName,
  ...props
}) => {
  const {messages, formatNumber} = useIntl();
  const router = useRouter();
  const path = router.asPath;
  const {errorStack, successStack} = useNotiStack();
  const [configParams] = useState({course_id: courseId});
  const {data: resultConfig} = useFetchResultConfigs(configParams);

  const [exams, setExams] = useState<Array<any>>([]);
  const [showEditField, setShowEditField] = useState<Array<number>>([]);
  const [inputFieldData, setInputFieldData] = useState<string>('');
  const [showAttField, setShowAttField] = useState<boolean>(false);

  const [batchExamParams] = useState<any>({youth_id: youthId});
  const {data: batchYouthExams, isLoading} = useFetchYouthBatchExams(
    batchId,
    batchExamParams,
  );

  useEffect(() => {
    if (batchYouthExams) {
      let examsData: any = [];
      let showField: any = [];
      (batchYouthExams.exams || []).map((exam_type: any) => {
        (exam_type.exams || []).map((exam: any) => {
          let examObj = {
            title: exam_type.title,
            title_en: exam_type.title_en,
            exam_id: exam.exam_id,
            type: exam.type,
            exam_type_id: exam.exam_type_id,
            exam_type: exam_type.type,
            obtained_mark: !isNaN(exam?.obtained_mark)
              ? String(Number(exam.obtained_mark))
              : '',
            file_paths: exam.file_paths,
            auto_marking: exam.auto_marking,
            total_marks: exam.total_marks,
            participated: exam.participated,
          };
          examsData.push(examObj);
          showField.push(0);
        });
      });
      setExams(examsData);
      setShowEditField(showField);
    }
  }, [batchYouthExams]);

  const onSubmit = async (formData: any, exam?: any) => {
    let data = {};

    if (exam && exam?.exam_id) {
      data = {
        exam: {
          exam_id: exam.exam_id,
          exam_type_id: exam.exam_type_id,
          type: exam.type,
          total_obtained_marks: formData,
          youth_id: youthId,
          batch_id: batchId,
        },
      };
    }

    if (!exam) {
      data = {
        attendance: {
          total_obtained_marks: inputFieldData,
          youth_id: youthId,
          batch_id: batchId,
        },
      };
    }

    console.log('data->', data);

    try {
      const response = await youthExamMarking(data);
      if (isResponseSuccess(response)) {
        successStack(messages['batch.youth_exam_marking']);
      }
      props.onClose();
      props.onOpen(youthId, youthName);
    } catch (error: any) {
      console.log('error->', error);
      processServerSideErrors({error, errorStack});
    }
  };

  const onClickShowField = (index: number, examId: number) => {
    setShowEditField((prev) => {
      prev[index] = prev[index] == 0 ? examId : 0;
      return [...prev];
    });
  };

  return (
    <HookFormMuiModal
      {...props}
      open={true}
      title={
        <>
          <FiUser />
          {youthName}
        </>
      }
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
        </>
      }>
      <Grid container spacing={2}>
        <Grid item xs={3} sx={{textAlign: 'center'}}>
          <Body1>{messages['common.exam_name']}</Body1>
        </Grid>
        <Grid item xs={3} sx={{textAlign: 'center'}}>
          <Body1>{messages['common.total_marks']}</Body1>
        </Grid>
        <Grid item xs={3} sx={{textAlign: 'center'}}>
          <Body1>{messages['common.obtained_mark']}</Body1>
        </Grid>
        <Grid item xs={3} sx={{textAlign: 'center'}}>
          <Body1>{messages['common.actions']}</Body1>
        </Grid>

        {exams.map((exam: any, index) => {
          let markingOrMarkSheetPath = `${path}/${youthId}/${
            exam.auto_marking ? 'marksheet' : 'marking'
          }/${exam.exam_id}`;

          return (
            <Grid item xs={12} key={index}>
              <Grid container spacing={1}>
                <Grid item xs={3} sx={{textAlign: 'center'}}>
                  <Body1>{exam.title}</Body1>
                </Grid>
                <Grid item xs={3} sx={{textAlign: 'center'}}>
                  <Body1>{formatNumber(exam.total_marks)}</Body1>
                </Grid>
                <Grid item xs={3} sx={{textAlign: 'center'}}>
                  {showEditField[index] ? (
                    <>
                      <TextField
                        required={Number(exam.type) != ExamTypes.ONLINE}
                        id={`exam[total_obtained_marks]`}
                        label={``}
                        type={'number'}
                        size={'small'}
                        inputProps={{
                          step: 0.01,
                        }}
                        onChange={(e: any) => {
                          setInputFieldData(e.target.value);
                        }}
                        InputProps={{
                          endAdornment: (
                            <>
                              <Tooltip
                                onClick={() => {
                                  onSubmit(
                                    !inputFieldData && exam.obtained_mark
                                      ? exam.obtained_mark
                                      : inputFieldData,
                                    exam,
                                  );
                                }}
                                title={messages['common.save'] as any}
                                arrow>
                                <DoneIcon
                                  fontSize='small'
                                  sx={{marginLeft: '10px', cursor: 'pointer'}}
                                />
                              </Tooltip>
                              <Tooltip
                                onClick={() =>
                                  onClickShowField(index, exam.exam_id)
                                }
                                title={messages['common.cancel'] as any}
                                arrow>
                                <CloseIcon
                                  fontSize='small'
                                  sx={{marginLeft: '10px', cursor: 'pointer'}}
                                />
                              </Tooltip>
                            </>
                          ),
                        }}
                        defaultValue={exam.obtained_mark}
                        disabled={Number(exam.type) == ExamTypes.ONLINE}
                      />
                    </>
                  ) : (
                    <Body1>
                      {formatNumber(exam.obtained_mark)}
                      {Number(exam.type) != ExamTypes.ONLINE && (
                        <Tooltip
                          onClick={() => onClickShowField(index, exam.exam_id)}
                          title={messages['common.edit_btn'] as any}
                          arrow>
                          <DriveFileRenameOutline
                            fontSize='small'
                            sx={{marginLeft: '10px', cursor: 'pointer'}}
                          />
                        </Tooltip>
                      )}
                    </Body1>
                  )}
                </Grid>
                <Grid item xs={3} sx={{textAlign: 'center'}}>
                  {exam.type == ExamTypes.ONLINE && exam.participated && (
                    <Link href={markingOrMarkSheetPath} passHref={true}>
                      <Button
                        key={1}
                        variant={'contained'}
                        color={'primary'}
                        size={'small'}>
                        {
                          messages[
                            exam.auto_marking
                              ? 'common.answer_sheet'
                              : 'batches.mark_distribution'
                          ] as any
                        }
                      </Button>
                    </Link>
                  )}

                  {exam.type !== ExamTypes.OFFLINE && !exam.participated && (
                    <Body2>{messages['common.not_participated']}</Body2>
                  )}

                  {![
                    ExamTypes.ONLINE,
                    ExamTypes.OFFLINE,
                    ExamTypes.MIXED,
                  ].includes(exam.type) &&
                    exam.file_paths &&
                    exam.file_paths?.length > 0 &&
                    exam.file_paths.map((file: any, i: number) => (
                      <Link
                        href={FILE_SERVER_FILE_VIEW_ENDPOINT + file}
                        passHref={true}
                        key={i}
                        target={'_blank'}
                        style={{
                          marginLeft: '10px',
                          alignSelf: 'center',
                          border: '1px solid #3a7edc',
                          padding: '15px 5px 0px 5px',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}>
                        <Tooltip
                          title={`${
                            messages['common.file_path'] as any
                          } ${formatNumber(i + 1)}`}
                          arrow>
                          <InsertDriveFile />
                        </Tooltip>
                      </Link>
                    ))}
                </Grid>
              </Grid>

              <Divider sx={{marginY: 2}} />
            </Grid>
          );
        })}

        {Number(resultConfig?.result_percentages?.attendance) > 0 && (
          <Grid item xs={12}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={3} sx={{textAlign: 'center'}}>
                  <Body1>{messages['common.attendance']}</Body1>
                </Grid>
                <Grid item xs={3} sx={{textAlign: 'center'}}>
                  <Body1></Body1>
                </Grid>
                <Grid item xs={3} sx={{textAlign: 'center'}}>
                  {showAttField ? (
                    <>
                      <TextField
                        required
                        id={`attendance[total_obtained_marks]`}
                        label={``}
                        type={'number'}
                        size={'small'}
                        inputProps={{
                          step: 0.01,
                        }}
                        onChange={(e: any) => {
                          setInputFieldData(e.target.value);
                        }}
                        defaultValue={
                          batchYouthExams?.attendance
                            ? String(Number(batchYouthExams?.attendance))
                            : '0'
                        }
                        InputProps={{
                          endAdornment: (
                            <>
                              <Tooltip
                                onClick={() => {
                                  onSubmit(
                                    !inputFieldData &&
                                      batchYouthExams?.attendance
                                      ? batchYouthExams?.attendance
                                      : inputFieldData,
                                  );
                                }}
                                title={messages['common.save'] as any}
                                arrow>
                                <DoneIcon
                                  fontSize='small'
                                  sx={{marginLeft: '10px', cursor: 'pointer'}}
                                />
                              </Tooltip>
                              <Tooltip
                                onClick={() => setShowAttField(false)}
                                title={messages['common.cancel'] as any}
                                arrow>
                                <CloseIcon
                                  fontSize='small'
                                  sx={{marginLeft: '10px', cursor: 'pointer'}}
                                />
                              </Tooltip>
                            </>
                          ),
                        }}
                      />
                    </>
                  ) : (
                    <Body1>
                      {formatNumber(
                        batchYouthExams?.attendance
                          ? Number(batchYouthExams?.attendance)
                          : 0,
                      )}
                      <Tooltip
                        onClick={() => setShowAttField(true)}
                        title={messages['common.edit_btn'] as any}
                        arrow>
                        <DriveFileRenameOutline
                          fontSize='small'
                          sx={{marginLeft: '10px', cursor: 'pointer'}}
                        />
                      </Tooltip>
                    </Body1>
                  )}
                </Grid>
                <Grid item xs={3} sx={{textAlign: 'center'}}></Grid>
              </Grid>

              <Divider sx={{marginY: 2}} />
            </Grid>
          </Grid>
        )}
      </Grid>
    </HookFormMuiModal>
  );
};

export default ExamListPopup;
