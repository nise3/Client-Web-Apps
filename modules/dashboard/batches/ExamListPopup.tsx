import React, {FC, useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import Grid from '@mui/material/Grid';
import yup from '../../../@softbd/libs/yup';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {
  useFetchResultConfigs,
  useFetchYouthBatchExams,
} from '../../../services/instituteManagement/hooks';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {Body2, Link, Body1} from '../../../@softbd/elements/common';
import {useRouter} from 'next/router';
import {ExamTypes} from '../exams/ExamEnums';
import {youthExamMarking} from '../../../services/instituteManagement/BatchService';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import {FILE_SERVER_FILE_VIEW_ENDPOINT} from '../../../@softbd/common/apiRoutes';
// import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import {DriveFileRenameOutline, InsertDriveFile} from '@mui/icons-material';
import {FiUser} from 'react-icons/fi';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';

interface ExamListPopupProps {
  batchId: number;
  courseId: number;
  onClose: () => void;
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
  const authUser = useAuthUser<CommonAuthUser>();
  const [configParams] = useState({course_id: courseId});
  const {data: resultConfig} = useFetchResultConfigs(configParams);

  const [exams, setExams] = useState<Array<any>>([]);
  const [showEditField, setShowEditField] = useState<boolean>(false);

  const [batchExamParams] = useState<any>({youth_id: youthId});
  const {data: batchYouthExams, isLoading} = useFetchYouthBatchExams(
    batchId,
    batchExamParams,
  );

  const validationSchema = useMemo(() => {
    return yup.object().shape({});
  }, [messages, authUser]);

  const {
    register,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (batchYouthExams) {
      let examsData: any = [];
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
        });
      });
      setExams(examsData);
    }
  }, [batchYouthExams]);

  console.log('errors->', errors);
  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      data.exams = data.exams.map((exam: any) => ({
        ...exam,
        youth_id: youthId,
        batch_id: batchId,
      }));
      if (Number(resultConfig?.result_percentages?.attendance) > 0) {
        data.attendance.youth_id = youthId;
        data.attendance.batch_id = batchId;
      } else {
        delete data.attendance;
      }
      const response = await youthExamMarking(data);
      if (isResponseSuccess(response)) {
        successStack(messages['batch.youth_exam_marking']);
      }

      props.onClose();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  const getTypeLabel = (type: any) => {
    switch (Number(type)) {
      case ExamTypes.ONLINE:
        return messages['common.online'];
      case ExamTypes.OFFLINE:
        return messages['common.offline'];
      case ExamTypes.MIXED:
        return messages['common.mixed'];
      case ExamTypes.PRACTICAL:
        return messages['common.practical'];
      case ExamTypes.FIELDWORK:
        return messages['common.field_work'];
      case ExamTypes.PRESENTATION:
        return messages['common.presentation'];
      case ExamTypes.ASSIGNMENT:
        return messages['common.assignment'];
      default:
        return '';
    }
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
      handleSubmit={handleSubmit(onSubmit)}
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
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

        {exams.map((exam: any, i) => {
          console.log('exam->', exam);
          let markingOrMarkSheetPath = `${path}/${youthId}/${
            exam.auto_marking ? 'marksheet' : 'marking'
          }/${exam.exam_id}`;

          return (
            <Grid item xs={12} key={i}>
              <Grid container spacing={1}>
                <Grid item xs={3} sx={{textAlign: 'center'}}>
                  <Body1>{exam.title}</Body1>
                </Grid>
                <Grid item xs={3} sx={{textAlign: 'center'}}>
                  <Body1>{formatNumber(exam.total_marks)}</Body1>
                </Grid>
                <Grid item xs={3} sx={{textAlign: 'center'}}>
                  {showEditField ? (
                    <>
                      <CustomTextInput
                        sx={{display: 'none'}}
                        id={`exams[${i}][exam_id]`}
                        label={''}
                        type={'hidden'}
                        register={register}
                        errorInstance={errors}
                        defaultValue={exam.exam_id}
                      />
                      <CustomTextInput
                        sx={{display: 'none'}}
                        id={`exams[${i}][exam_type_id]`}
                        label={''}
                        type={'hidden'}
                        register={register}
                        errorInstance={errors}
                        defaultValue={exam.exam_type_id}
                      />
                      <CustomTextInput
                        sx={{display: 'none'}}
                        id={`exams[${i}][type]`}
                        label={''}
                        type={'hidden'}
                        register={register}
                        errorInstance={errors}
                        defaultValue={exam.type}
                      />
                      <CustomTextInput
                        required={Number(exam.type) != ExamTypes.ONLINE}
                        id={`exams[${i}][total_obtained_marks]`}
                        label={`${exam.title} (${getTypeLabel(exam.exam_type)}${
                          exam.exam_type == ExamTypes.MIXED
                            ? ' - ' + getTypeLabel(exam.type)
                            : ''
                        })`}
                        register={register}
                        type={'number'}
                        inputProps={{
                          step: 0.01,
                        }}
                        defaultValue={exam.obtained_mark}
                        errorInstance={errors}
                        disabled={Number(exam.type) == ExamTypes.ONLINE}
                        isLoading={isLoading}
                      />

                      <Tooltip
                        onClick={() => setShowEditField(false)}
                        title={messages['common.cancel'] as any}
                        arrow>
                        <CloseIcon
                          fontSize='small'
                          sx={{marginLeft: '10px', cursor: 'pointer'}}
                        />
                      </Tooltip>
                    </>
                  ) : (
                    <Body1>
                      {formatNumber(exam.obtained_mark)}
                      <Tooltip
                        onClick={() => setShowEditField(true)}
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

            /*<Grid item xs={6} key={i} display={'flex'}>
              <CustomTextInput
                sx={{display: 'none'}}
                id={`exams[${i}][exam_id]`}
                label={''}
                type={'hidden'}
                register={register}
                errorInstance={errors}
                defaultValue={exam.exam_id}
              />
              <CustomTextInput
                sx={{display: 'none'}}
                id={`exams[${i}][exam_type_id]`}
                label={''}
                type={'hidden'}
                register={register}
                errorInstance={errors}
                defaultValue={exam.exam_type_id}
              />
              <CustomTextInput
                sx={{display: 'none'}}
                id={`exams[${i}][type]`}
                label={''}
                type={'hidden'}
                register={register}
                errorInstance={errors}
                defaultValue={exam.type}
              />
              <CustomTextInput
                required={Number(exam.type) != ExamTypes.ONLINE}
                id={`exams[${i}][total_obtained_marks]`}
                label={`${exam.title} (${getTypeLabel(exam.exam_type)}${
                  exam.exam_type == ExamTypes.MIXED
                    ? ' - ' + getTypeLabel(exam.type)
                    : ''
                })`}
                register={register}
                type={'number'}
                inputProps={{
                  step: 0.01,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end' sx={{color: 'green'}}>
                      Total Marks: {Number(exam?.total_marks)}
                    </InputAdornment>
                  ),
                }}
                defaultValue={exam.obtained_mark}
                errorInstance={errors}
                disabled={Number(exam.type) == ExamTypes.ONLINE}
                isLoading={isLoading}
              />
              {exam.type == ExamTypes.ONLINE && !exam.participated && (
                <Body2>{messages['common.not_participated']}</Body2>
              )}
              {exam.type == ExamTypes.ONLINE && exam.participated && (
                <Link
                  href={markingOrMarkSheetPath}
                  passHref={true}
                  style={{
                    alignSelf: 'center',
                    marginLeft: '10px',
                    border: '1px solid #3a7edc',
                    padding: '0px 5px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}>
                  <Tooltip
                    title={
                      messages[
                        exam.auto_marking
                          ? 'common.answer_sheet'
                          : 'batches.mark_distribution'
                      ] as any
                    }
                    arrow>
                    <DriveFileRenameOutline />
                  </Tooltip>
                </Link>
              )}
              {![ExamTypes.ONLINE, ExamTypes.OFFLINE, ExamTypes.MIXED].includes(
                exam.type,
              ) &&
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
                      padding: '5px 5px 0px 5px',
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
            </Grid>*/
          );
        })}

        {/*<Grid item xs={6}>
          {Number(resultConfig?.result_percentages?.attendance) > 0 && (
            <CustomTextInput
              required
              id={`attendance[total_obtained_marks]`}
              label={messages['common.attendance']}
              register={register}
              type={'number'}
              inputProps={{
                step: 0.01,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end' sx={{color: 'green'}}>
                    Total Marks: {Number(resultConfig?.total_attendance_marks)}
                  </InputAdornment>
                ),
              }}
              defaultValue={
                batchYouthExams?.attendance
                  ? String(Number(batchYouthExams?.attendance))
                  : '0'
              }
              errorInstance={errors}
              isLoading={isLoading}
            />
          )}
        </Grid>*/}
      </Grid>
    </HookFormMuiModal>
  );
};

export default ExamListPopup;
