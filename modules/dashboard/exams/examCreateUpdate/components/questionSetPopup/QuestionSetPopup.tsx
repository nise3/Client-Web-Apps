import React, {useState} from 'react';
import HookFormMuiModal from '../../../../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import IconFAQ from '../../../../../../@softbd/icons/IconFAQ';
import IntlMessages from '../../../../../../@crema/utility/IntlMessages';
import {isBreakPointUp} from '../../../../../../@crema/utility/Utils';
import CancelButton from '../../../../../../@softbd/elements/button/CancelButton/CancelButton';
import {Grid, Typography} from '@mui/material';
import TransferQuestionList from './TransferQuestionList';

interface IProps {
  questionType: any;
  onClose: () => void;
  useFrom: any;
}

const QuestionSetPopup = ({questionType, useFrom, ...props}: IProps) => {
  const [isQuestionEditFormOpened, setIsQuestionEditFormOpened] =
    useState<boolean>(false);

  const onEditPopupOpenClose = (open: boolean) => {
    setIsQuestionEditFormOpened(open);
  };

  const getQuestionSet = (questionList: any) => {
    let questionsFormValues = questionList.map((question: any) => {
      return {
        answer: question.answer,
        assessment_id: question.id,
        assessment_question_set_id: question.id,
        option_1: question.option_1,
        option_1_en: question.option_1_en,
        option_2: question.option_2,
        option_2_en: question.option_2_en,
        option_3: question.option_3,
        option_3_en: question.option_3_en,
        option_4: question.option_4,
        option_4_en: question.option_4_en,
        question_id: question.id,
        row_status: 1,
        subject_id: question.subject_id,
        title: question.title,
        title_en: question.title_en,
        type: question.type,
      };
    });

    console.log('questionsFormValues: ', questionsFormValues);
    useFrom.setValue('assessment_questions', questionsFormValues);
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
              subject: <IntlMessages id='assessment.addQuestion' />,
            }}
          />{' '}
        </>
      }
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      // handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} />
          {/*<SubmitButton isSubmitting={isSubmitting} />*/}
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <TransferQuestionList
            getQuestionSet={getQuestionSet}
            onEditPopupOpenClose={onEditPopupOpenClose}
            useFrom={useFrom}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{color: 'red', fontSize: '14px', fontWeight: '500'}}>
            {useFrom.errors?.assessment_questions?.message ?? null}
          </Typography>
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default QuestionSetPopup;
