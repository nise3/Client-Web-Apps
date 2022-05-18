import React, {FC, useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import Grid from '@mui/material/Grid';
import yup from '../../../@softbd/libs/yup';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {useFetchBatchExams} from '../../../services/instituteManagement/hooks';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {Link} from '../../../@softbd/elements/common';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {useRouter} from 'next/router';
import {ExamTypes} from '../exams/ExamEnums';
import IconExam from '../../../@softbd/icons/IconExam';
import {youthExamMarking} from '../../../services/instituteManagement/BatchService';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import {FILE_SERVER_FILE_VIEW_ENDPOINT} from '../../../@softbd/common/apiRoutes';

interface ExamListPopupProps {
  batchId: number | null;
  onClose: () => void;
  youthId: number | null;
}

const ExamListPopup: FC<ExamListPopupProps> = ({
  batchId,
  youthId,
  ...props
}) => {
  const {messages, formatNumber} = useIntl();
  const router = useRouter();
  const path = router.asPath;
  const {errorStack, successStack} = useNotiStack();
  const authUser = useAuthUser<CommonAuthUser>();

  const [exams, setExams] = useState<Array<any>>([]);

  const [batchExamParams] = useState<any>({youth_id: youthId});
  const {data: batchExams, isLoading} = useFetchBatchExams(
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
    if (batchExams) {
      let examsData: any = [];
      (batchExams || []).map((exam_type: any) => {
        (exam_type.exams || []).map((exam: any) => {
          let examObj = {
            title: exam_type.title,
            title_en: exam_type.title_en,
            exam_id: exam.id,
            type: exam.type,
            exam_type_id: exam.exam_type_id,
            exam_type: exam_type.type,
            obtained_mark: exam.obtained_mark,
            file_paths: exam.file_paths,
            auto_marking: exam.auto_marking,
          };
          examsData.push(examObj);
        });
      });
      setExams(examsData);
    }
  }, [batchExams]);

  console.log('errors->', errors);
  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      data.exams = data.exams.map((exam: any) => ({
        ...exam,
        youth_id: youthId,
        batch_id: batchId,
      }));
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
          <IconExam />
          <IntlMessages id='batches.marking' />
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
      <Grid container spacing={5}>
        {exams.map((exam: any, i) => {
          let markingOrMarkSheetPath = `${path}/${youthId}/${
            exam.auto_marking ? 'marksheet' : 'marking'
          }/${exam.exam_id}`;

          return (
            <Grid item xs={6} key={i} display={'flex'}>
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
                  step: 1,
                }}
                defaultValue={exam.obtained_mark}
                errorInstance={errors}
                disabled={Number(exam.type) == ExamTypes.ONLINE}
                isLoading={isLoading}
              />
              {exam.type == ExamTypes.ONLINE && (
                <Link href={markingOrMarkSheetPath} passHref={true}>
                  <CommonButton
                    btnText={
                      exam.auto_marking
                        ? 'common.answer_sheet'
                        : 'batches.mark_distribution'
                    }
                    style={{marginLeft: '10px'}}
                    variant='outlined'
                    color='primary'
                  />
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
                    target={'_blank'}>
                    {messages['common.file_path']} {formatNumber(i + 1)}
                  </Link>
                ))}
            </Grid>
          );
        })}
      </Grid>
    </HookFormMuiModal>
  );
};

export default ExamListPopup;
