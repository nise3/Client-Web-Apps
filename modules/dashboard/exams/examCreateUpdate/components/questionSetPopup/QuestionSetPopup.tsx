import React, {useMemo, useState} from 'react';
import HookFormMuiModal from '../../../../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import IconFAQ from '../../../../../../@softbd/icons/IconFAQ';
import IntlMessages from '../../../../../../@crema/utility/IntlMessages';
import {isBreakPointUp} from '../../../../../../@crema/utility/Utils';
import CancelButton from '../../../../../../@softbd/elements/button/CancelButton/CancelButton';
import {Grid, Typography} from '@mui/material';
import TransferQuestionList from './TransferQuestionList';
import {QuestionType} from '../../../../questionsBank/QuestionBanksEnums';
import SubmitButton from '../../../../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useIntl} from 'react-intl';
import yup from '../../../../../../@softbd/libs/yup';
import {yupResolver} from '@hookform/resolvers/yup';

interface IProps {
  questionType: any;
  onClose: () => void;
  subjectId: any;
  selectableQuestions?: number;
  onQuestionsSubmitted: (data: any) => void;
}

const QuestionSetPopup = ({
  questionType,
  subjectId,
  selectableQuestions,
  onQuestionsSubmitted,
  ...props
}: IProps) => {
  const {messages} = useIntl();

  const [isQuestionEditFormOpened, setIsQuestionEditFormOpened] =
    useState<boolean>(false);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      questions: yup
        .array()
        .of(yup.object({}))
        .min(1, messages['common.must_have_one_question'] as string)
        .test(
          'questions',
          messages['common.must_have_one_question'] as string,
          (value) => {
            console.log('asdasd', value, selectableQuestions);
            return true;
          },
        )
        .label(messages['common.addQuestion'] as string),
    });
  }, [messages, selectableQuestions]);

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
        answers:
          question?.question_type == QuestionType.YES_NO &&
          question?.answers?.length > 0
            ? question?.answers[0]
            : question?.answers,
        row_status: question?.row_status,
      };
    });

    setValue('questions', questionsFormValues);
  };

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    if (!isQuestionEditFormOpened) {
      try {
        onQuestionsSubmitted(data);

        props.onClose();
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
          />{' '}
        </>
      }
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} />
          <SubmitButton isSubmitting={isSubmitting} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <TransferQuestionList
            getQuestionSet={getQuestionSet}
            onEditPopupOpenClose={onEditPopupOpenClose}
            subjectId={subjectId}
            questionType={questionType}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{color: 'red', fontSize: '14px', fontWeight: '500'}}>
            {errors?.questions?.message ?? null}
          </Typography>
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default QuestionSetPopup;
