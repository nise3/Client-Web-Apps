import React from 'react';
import NoDataFoundComponent from '../../../youth/common/NoDataFoundComponent';
import {Grid, Paper} from '@mui/material';
import {Body1} from '../../../../@softbd/elements/common';
import {useIntl} from 'react-intl';
import {QuestionType} from '../../questionsBank/QuestionBanksEnums';
import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import DetailsInputView from '../../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import MCQTypeComponent from './MCQTypeAnswer';
import FillInTheBlankTypeAnswer from './FillInTheBlankTypeAnswer';
import FileViewAnswer from './FileViewAnswer';
import YesNoTypeAnswer from './YesNoTypeAnswer';
/*
interface ExamQuestionListProps {
  questions: any;

}*/

const answerSheet = {
  id: 1,
  exam_title: 'Yearly Exam',
  examinee_name: 'Afrar Jahin',
  answers: [],
  exam_subject_title: 'Subject',
  exam_subject_title_en: 'Subject',
  questions: [
    {
      id: 1,
      title:
        ' What is your name What is your name What is your name What is your name What is your name What is your name What is your name What is your name What is your name What is your name What is your name What is your name What is your name What is your name What is your name What is your name ddddddddddd?',
      title_en: 'What is your name?',
      option_1: 'a',
      option_1_en: 'a',
      option_2: 'b',
      option_2_en: 'b',
      option_3: 'c',
      option_3_en: 'c',
      option_4: 'd',
      option_4_en: 'd',
      question_type: 1,
      mark: 1,
      obtained_mark: 1,
      correct_answer: [3, 4],
      answer: [1, 2],
    },

    {
      id: 2,
      title: 'I am a [[]] engineer [[]] softbd [[]]',
      title_en: 'I am a [[]] engineer  [[]] softbd [[]]',
      question_type: 2,
      mark: 1,
      obtained_mark: 1,
      answer: ['software', 'at', 'ltd'],
    },
    {
      id: 3,
      title: 'Is this question?',
      title_en: 'Is this question?',
      question_type: 3,
      mark: 1,
      obtained_mark: 1,
      answer: 1,
    },
    {
      id: 5,
      title: 'Please upload your field work file',
      title_en: 'Please upload your field work file',
      question_type: 5,
      mark: 1,
      obtained_mark: 1,
      answer: '/images/dummy2.jpg',
    },
    {
      id: 6,
      title: '[[]]am a [[]] engineer [[]] softbd ',
      title_en: '[[]]am a [[]] engineer  [[]] softbd ',
      question_type: 2,
      mark: 1,
      obtained_mark: 1,
      answer: ['I', 'soft', 'at'],
    },
    {
      id: 7,
      title: 'Write down about your profession',
      title_en: 'Write down about your profession',
      question_type: 7,
      mark: 1,
      obtained_mark: 1,
      answer:
        'A profession is a disciplined group of individuals who adhere to ethical standards and who ... A profession has been further defined as A profession is a disciplined group of individuals who adhere to ethical standards and who ... A profession has been further defined as',
    },
    {
      id: 8,
      title: 'What is your age?',
      title_en: 'What is your name?',
      option_1: '20',
      option_1_en: '20',
      option_2: '30',
      option_2_en: '30',
      option_3: '40',
      option_3_en: '40',
      option_4: 'd',
      option_4_en: 'd',
      question_type: 1,
      mark: 1,
      obtained_mark: 1,
      answer: [2, 4],
      correct_answer: [1, 3],
    },
  ],
  exam_date: '10/12/22',
  total_obtained_marks: 66,
  total_marks: 100,
  duration: '1 hour',
};

/*const PREFIX = 'AnsweredQuestionPaper';
const classes = {
  textStyle: `${PREFIX}-textStyle`,
};*/

const StyledPaper = styled(Paper)(({theme}) => ({
  padding: '25px',
}));
const ExamQuestionPaper = () => {
  const {messages} = useIntl();
  return (
    <StyledPaper>
      <Grid container spacing={2}>
        <Grid
          item
          display={'flex'}
          alignItems={'center'}
          flexDirection={'column'}
          justifyContent={'center'}
          xs={12}>
          <Body1>{answerSheet?.examinee_name}</Body1>
          <Body1>{answerSheet?.exam_title}</Body1>
          <Body1>
            {messages['subject.label']}
            {': '}
            {answerSheet?.exam_subject_title}
          </Body1>
          <Body1>
            {messages['common.date']} {': '}
            {answerSheet?.exam_date}
          </Body1>
          <Body1>
            {messages['common.total_obtained_marks']} {': '}
            {answerSheet?.total_obtained_marks}
          </Body1>
        </Grid>

        <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
          <Body1>
            {messages['common.duration'] + ': ' + answerSheet?.duration}
          </Body1>
          <Body1 sx={{marginLeft: 'auto'}}>
            {messages['common.total_marks']}
            {': '}
            {answerSheet?.total_marks}
          </Body1>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{borderBottom: 1}} />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {answerSheet && answerSheet?.questions.length ? (
              answerSheet?.questions.map((question: any, index: number) => {
                return (
                  <React.Fragment key={question?.id}>
                    {question?.question_type ==
                    QuestionType.FILL_IN_THE_BLANK ? (
                      <>
                        <Grid item xs={11} display={'flex'}>
                          <Body1
                            sx={{fontWeight: 'bold', display: 'inline-block'}}>
                            {index + 1 + '.  '}
                          </Body1>
                          <FillInTheBlankTypeAnswer question={question} />
                        </Grid>
                        <Grid item xs={1}>
                          <Body1
                            sx={{fontWeight: 'bold', display: 'inline-block'}}>
                            {question?.obtained_mark}
                          </Body1>
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Grid item xs={11}>
                          <Body1
                            sx={{fontWeight: 'bold', display: 'inline-block'}}>
                            {index + 1 + '.  '}
                          </Body1>
                          {question?.title}
                          <Body1
                            sx={{fontWeight: 'bold', display: 'inline-block'}}>
                            {'(' + question?.mark + ')'}
                          </Body1>
                        </Grid>
                        <Grid item xs={1}>
                          <Body1
                            sx={{fontWeight: 'bold', display: 'inline-block'}}>
                            {question?.obtained_mark}
                          </Body1>
                        </Grid>
                        <Grid item xs={11}>
                          {question?.question_type == QuestionType.MCQ && (
                            <MCQTypeComponent question={question} />
                          )}
                          {question?.question_type == QuestionType.YES_NO && (
                            <YesNoTypeAnswer question={question} />
                          )}
                          {(question?.question_type ==
                            QuestionType.PRESENTATION ||
                            question?.question_type ==
                              QuestionType.FIELD_WORK ||
                            question?.question_type ==
                              QuestionType.PRACTICAL) && (
                            <FileViewAnswer question={question} />
                          )}
                          {question?.question_type ==
                            QuestionType.DESCRIPTIVE && (
                            <DetailsInputView
                              label={messages['common.answer']}
                              value={question?.answer}
                              isLoading={false}
                            />
                          )}
                        </Grid>
                      </>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <NoDataFoundComponent />
            )}
          </Grid>
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

export default ExamQuestionPaper;
