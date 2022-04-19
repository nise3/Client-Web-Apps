import React, {useMemo, useState} from 'react';
import HookFormMuiModal from '../../../../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import IconFAQ from '../../../../../../@softbd/icons/IconFAQ';
import IntlMessages from '../../../../../../@crema/utility/IntlMessages';
import {isBreakPointUp} from '../../../../../../@crema/utility/Utils';
import CancelButton from '../../../../../../@softbd/elements/button/CancelButton/CancelButton';
import {Grid, Typography} from '@mui/material';
import TransferQuestionList from './TransferQuestionList';
import SubmitButton from '../../../../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useIntl} from 'react-intl';
import yup from '../../../../../../@softbd/libs/yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {QuestionSelectionType} from '../../../ExamEnums';
import {S2} from '../../../../../../@softbd/elements/common';
import useNotiStack from '../../../../../../@softbd/hooks/useNotifyStack';

interface IProps {
  questionType: any;
  onClose: () => void;
  subjectId: any;
  totalQuestions: number;
  totalMarks: number;
  selectionType: string;
  onQuestionsSubmitted: (data: any) => void;
}

const QuestionSetPopup = ({
  questionType,
  subjectId,
  totalQuestions,
  totalMarks,
  selectionType,
  onQuestionsSubmitted,
  ...props
}: IProps) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();

  const [isQuestionEditFormOpened, setIsQuestionEditFormOpened] =
    useState<boolean>(false);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      questions: yup
        .array()
        .of(yup.object({}))
        .min(
          totalQuestions,
          messages['common.must_have_one_question'] as string,
        )
        .test(
          'questions',
          messages['common.must_have_one_question'] as string,
          (value: any) => {
            return selectionType == QuestionSelectionType.FIXED
              ? value && value?.length <= totalQuestions
              : value && value?.length > totalQuestions;
          },
        )
        .label(messages['common.addQuestion'] as string),
    });
  }, [messages, totalQuestions, selectionType]);

  const {
    handleSubmit,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const onEditPopupOpenClose = (open: boolean) => {
    setIsQuestionEditFormOpened(open);
  };

  const getQuestionSet = (questionList: any) => {
    let questionsFormValues = questionList.map((question: any) => {
      return {
        id: question?.id,
        accessor_id: question?.accessor_id,
        accessor_type: question?.accessor_type,
        subject_id: question?.subject_id,
        title: question?.title,
        title_en: question?.title_en,
        question_type: question?.question_type,
        option_1: question?.option_1,
        option_1_en: question?.option_1_en,
        option_2: question?.option_2,
        option_2_en: question?.option_2_en,
        option_3: question?.option_3,
        option_3_en: question?.option_3_en,
        option_4: question?.option_4,
        option_4_en: question?.option_4_en,
        individual_mark: question?.individual_mark,
        answers: question?.answers,
        row_status: question?.row_status,
      };
    });

    setValue('questions', questionsFormValues);
  };

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    if (!isQuestionEditFormOpened) {
      try {
        let totMark: number = 0;

        if (data.questions) {
          data.questions.map((question: any) => {
            totMark += Number(question?.individual_mark);
          });
        }

        if (totMark > totalMarks) {
          errorStack("Selected questions mark can't be more than total mark");
        } else {
          onQuestionsSubmitted(data);
          props.onClose();
        }
      } catch (error: any) {}
    }
  };

  return (
    <HookFormMuiModal
      {...props}
      open={true}
      title={
        <>
          <IconFAQ />
          <IntlMessages
            id='common.add_new'
            values={{
              subject: <IntlMessages id='common.addQuestion' />,
            }}
          />
        </>
      }
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      actions={
        <>
          <CancelButton onClick={props.onClose} />
          <SubmitButton
            isSubmitting={isSubmitting}
            isLoading={false}
            type={'button'}
            onClick={() => handleSubmit(onSubmit)()}
          />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <S2>
            {selectionType == QuestionSelectionType.FIXED
              ? `Please Select only ${totalQuestions} questions`
              : `Please Select more than ${totalQuestions} questions`}
          </S2>
          <S2 sx={{display: 'flex'}}>
            Total Marks:{' '}
            <Typography sx={{color: 'green', marginLeft: '10px'}}>
              {totalMarks}
            </Typography>
          </S2>
        </Grid>
        <Grid item xs={12}>
          <TransferQuestionList
            getQuestionSet={getQuestionSet}
            onEditPopupOpenClose={onEditPopupOpenClose}
            subjectId={subjectId}
            questionType={questionType}
            eachQuestionMark={Number((totalMarks / totalQuestions).toFixed(2))}
          />
        </Grid>
        {errors?.questions?.message && (
          <Grid item xs={12}>
            <Typography
              sx={{color: 'red', fontSize: '14px', fontWeight: '500'}}>
              {errors?.questions?.message}
            </Typography>
          </Grid>
        )}
      </Grid>
    </HookFormMuiModal>
  );
};

export default QuestionSetPopup;
