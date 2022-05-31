import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import Grid from '@mui/material/Grid';
import yup from '../../../@softbd/libs/yup';
import {
  useFetchBatchExams,
  useFetchExams,
} from '../../../services/instituteManagement/hooks';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import IconExam from '../../../@softbd/icons/IconExam';
import {ExamTypes} from '../exams/ExamEnums';
import {assignExamsToBatch} from '../../../services/instituteManagement/BatchService';
import {Body1, S1} from '../../../@softbd/elements/common';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import Divider from '@mui/material/Divider';

interface ExamAssignToBatchPopupProps {
  batchId: number;
  onClose: () => void;
}

const ExamAssignToBatchPopup: FC<ExamAssignToBatchPopupProps> = ({
  batchId,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack, successStack} = useNotiStack();

  const [exams, setExams] = useState<any>([]);
  const [selectedExams, setSelectedExams] = useState<Array<any>>([]);
  const [selectedExamId, setSelectedExamId] = useState<number | null>(null);

  const [examFilters] = useState<any>({
    batch_id: batchId,
    is_result_config_courses: 1,
  });
  const {data: batchExams} = useFetchBatchExams(batchId);
  const {data: examsData, isLoading} = useFetchExams(examFilters);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      exams: yup
        .array()
        .of(yup.object())
        .required()
        .min(1)
        .label(messages['exam.label'] as string),
    });
  }, [messages]);

  const {
    control,
    formState: {isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (batchExams && batchExams.length && examsData && examsData.length > 0) {
      const arrayFiltered = examsData.filter(
        (item: any) => batchExams.includes(item.id), //todo: have to filter for dropdown for existing data
      );

      console.log('arrayFiltered->', arrayFiltered);
    } else {
      setExams(examsData);
    }
    setExams(examsData);
    setSelectedExams(batchExams ? batchExams : []);
  }, [batchExams, examsData]);

  const onAddClick = useCallback(() => {
    if (selectedExamId) {
      let lists = [...selectedExams];
      const xm = exams.find((item: any) => item.id == selectedExamId);
      const xmMain = exams.filter((item: any) => item.id != selectedExamId);

      if (xm) {
        lists.push(xm);
        setSelectedExams(lists);
      }

      if (xmMain) {
        setExams(xmMain);
      }

      setSelectedExamId(null);
    }
  }, [exams, selectedExamId, selectedExams]);

  const onDeleteClick = useCallback(
    (examId: number) => {
      if (examId) {
        let examList = [...exams];
        const xm = selectedExams.filter((item: any) => item.id != examId);
        const xmMain = selectedExams.filter((item: any) => item.id == examId);

        if (xm) {
          setSelectedExams(xm);
        }

        if (xmMain) {
          setExams([...xmMain, ...examList]);
        }

        setSelectedExamId(null);
      }
    },
    [exams, selectedExams],
  );

  const onExamChange = useCallback((selected: number) => {
    setSelectedExamId(selected);
  }, []);

  const onSubmitExams = async () => {
    try {
      let formData: any = {};
      if (selectedExams && selectedExams) {
        formData.exam_type_ids = (selectedExams || []).map(
          (exam: any) => exam.id,
        );
        console.log('formData.exam_type_ids->', formData.exam_type_ids);

        await assignExamsToBatch(batchId, formData);
        successStack(messages['batch.exam_assign_success']);
        props.onClose();
      }
    } catch (error: any) {
      processServerSideErrors({error, errorStack});
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
          <IntlMessages id='batch.assign_exam' />
        </>
      }
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton
            onClick={() => onSubmitExams()}
            isSubmitting={isSubmitting}
            isLoading={isLoading}
            type={'button'}
          />
        </>
      }>
      <Grid container spacing={2}>
        {exams && exams.error_code == 'no_config' ? (
          <Grid item xs={12} sx={{textAlign: 'center'}}>
            <S1>{messages['batch.result_failed_no_config']}</S1>
          </Grid>
        ) : (
          <>
            <Grid item xs={12} sx={{marginBottom: '10px'}}>
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  {/*<CustomFilterableFormSelect*/}
                  <CustomFilterableFormSelect
                    required
                    id='exams'
                    label={messages['exam.label']}
                    control={control}
                    options={(exams || []).map((exam: any) => ({
                      ...exam,
                      type_label: getTypeLabel(exam.type),
                    }))}
                    optionTitleProp={['title', 'type_label']}
                    optionValueProp={'id'}
                    isLoading={isLoading}
                    onChange={onExamChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <CommonButton
                    btnText='common.add'
                    onClick={() => onAddClick()}
                    style={{marginLeft: '10px'}}
                    variant='outlined'
                    color='primary'
                  />
                </Grid>
              </Grid>
              {selectedExams && selectedExams.length > 0 && (
                <Divider sx={{marginY: 2}} />
              )}
            </Grid>

            {selectedExams && selectedExams.length > 0 && (
              <>
                <Grid item xs={4} sx={{textAlign: 'center'}}>
                  <Body1>{messages['common.exam_name']}</Body1>
                </Grid>
                <Grid item xs={4} sx={{textAlign: 'center'}}>
                  <Body1>{messages['common.exam_type']}</Body1>
                </Grid>
                <Grid item xs={4} sx={{textAlign: 'center'}}>
                  <Body1>{messages['common.actions']}</Body1>
                </Grid>
              </>
            )}

            {selectedExams.map((exam: any) => {
              return (
                <Grid item xs={12} key={exam.id}>
                  <Grid container spacing={1}>
                    <Grid item xs={4} sx={{textAlign: 'center'}}>
                      <Body1>{exam.title}</Body1>
                    </Grid>
                    <Grid item xs={4} sx={{textAlign: 'center'}}>
                      <Body1>{getTypeLabel(exam.type)}</Body1>
                    </Grid>
                    <Grid item xs={4} sx={{textAlign: 'center'}}>
                      <CommonButton
                        btnText='common.publish'
                        onClick={() => onAddClick()}
                        variant='outlined'
                        color='primary'
                      />
                      <CommonButton
                        btnText='common.remove'
                        onClick={() => onDeleteClick(exam.id)}
                        style={{marginLeft: '10px'}}
                        variant='outlined'
                        color='primary'
                      />
                    </Grid>
                  </Grid>
                  <Divider sx={{marginY: 2}} />
                </Grid>
              );
            })}
          </>
        )}
      </Grid>
    </HookFormMuiModal>
  );
};

export default ExamAssignToBatchPopup;
