import React from 'react';
import {Grid, Paper} from '@mui/material';
import {Body1, Body2} from '../../../../../@softbd/elements/common';
import {useIntl} from 'react-intl';
import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import FillInTheBlankTypeView from '../ExamMarkSheet/FillInTheBlankTypeView';
import MCQTypeView from '../ExamMarkSheet/MCQTypeView';
import YesNoTypeView from '../ExamMarkSheet/YesNoTypeView';
import FileView from '../ExamMarkSheet/FileView';
import DescriptiveTypeView from '../ExamMarkSheet/DescriptiveTypeView';
import NoDataFoundComponent from '../../../../youth/common/NoDataFoundComponent';
import {question_type} from '../../../../../@softbd/utilities/helpers';
import {QuestionType} from '../../../questionsBank/QuestionBanksEnums';
/*
interface ExamQuestionListProps {
  questions: any;

}*/

const answerSheet = {
  id: 1,
  title: 'Yearly Exam',
  exam_id: 1,
  youth_name: 'Afrar Jahin',
  email: 'afrarjahin@gmail.com',
  subject_title: 'Subject',
  exam_date: '10/12/22',
  total_obtained_marks: 66,
  total_marks: 100,
  duration: '1 hour',
  exam_sections: [
    {
      Uuid: 11,
      question_type: 1,
      total_marks: 20,
      exam_id: 1,
      youth_id: 1,
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
          mark: 1,
          correct_answer: [3, 4],
          answer: [1, 2],
        },
        {
          id: 2,
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
          mark: 1,
          individual_marks: 1,
          answer: [2, 4],
          correct_answer: [1, 3],
        },
      ],
    },
    {
      Uuid: 11,
      question_type: 2,
      total_marks: 20,
      questions: [
        {
          id: 1,
          title: 'I am a [[]] engineer [[]] softbd [[]]',
          title_en: 'I am a [[]] engineer  [[]] softbd [[]]',
          mark: 1,
          individual_marks: 1,
          answer: ['software', 'at', 'ltd'],
        },
        {
          id: 2,
          title: 'She is a [[]] engineer [[]] softbd [[]]',
          title_en: 'She is a [[]] engineer  [[]] softbd [[]]',
          mark: 1,
          individual_marks: 1,
          answer: ['software', 'at', 'ltd'],
        },
      ],
    },
    {
      Uuid: 11,
      question_type: 3,
      total_marks: 20,
      questions: [
        {
          id: 1,
          title: 'Is this question?',
          title_en: 'Is this question?',
          mark: 1,
          individual_marks: 1,
          answer: 1,
          correct_answer: 1,
        },
        {
          id: 2,
          title: 'Done your work?',
          title_en: 'Done your work?',
          mark: 1,
          individual_marks: 1,
          answer: 1,
          correct_answer: 2,
        },
      ],
    },
    {
      Uuid: 11,
      question_type: 5,
      total_marks: 20,
      questions: [
        {
          id: 5,
          title: 'Please upload your field work file',
          title_en: 'Please upload your field work file',
          mark: 1,
          individual_marks: 1,
          answer: '/images/dummy2.jpg',
        },
      ],
    },
    {
      Uuid: 11,
      question_type: 7,
      total_marks: 20,
      questions: [
        {
          id: 1,
          title: 'Write down about your profession',
          title_en: 'Write down about your profession',
          mark: 1,
          individual_marks: 1,
          answer:
            'A profession is a disciplined group of individuals who adhere to ethical standards and whods/ A profession has been further defined as A profession is a disciplined group of individuals who adhere to ethical standards and who ... A profession has been further defined as',
        },
      ],
    },
  ],
};

/*const PREFIX = 'AnsweredQuestionPaper';
const classes = {
  textStyle: `${PREFIX}-textStyle`,
};*/

const StyledPaper = styled(Paper)(({theme}) => ({
  padding: '25px',
}));
const ExamMarkingViewPage = () => {
  const {messages} = useIntl();
  /*  const {updateSuccessMessage} = useSuccessMessage();*/
  let questionIndex = 1;

  const getQuestionTypeComponent = (questionType: any, question: any) => {
    console.log('questionType: ', questionType);
    switch (String(questionType)) {
      case QuestionType.YES_NO:
        return <YesNoTypeView question={question} index={questionIndex++} />;
      case QuestionType.MCQ:
        return <MCQTypeView question={question} index={questionIndex++} />;
      case QuestionType.FILL_IN_THE_BLANK:
        return (
          <FillInTheBlankTypeView question={question} index={questionIndex++} />
        );
      case QuestionType.DESCRIPTIVE:
        return (
          <DescriptiveTypeView question={question} index={questionIndex++} />
        );
      default:
        return <FileView question={question} index={questionIndex++} />;
    }
  };

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
          <Body2>{answerSheet?.youth_name}</Body2>
          <Body2>{answerSheet?.title}</Body2>
          <Body2>
            {messages['subject.label']}
            {': '}
            {answerSheet?.subject_title}
          </Body2>
          <Body2>
            {messages['common.date']} {': '}
            {answerSheet?.exam_date}
          </Body2>
          <Body2>
            {messages['common.total_obtained_marks'] +
              ': ' +
              answerSheet?.total_obtained_marks}
          </Body2>
        </Grid>

        <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
          <Body2>
            {messages['common.duration'] + ': ' + answerSheet?.duration}
          </Body2>
          <Body2>
            {messages['common.total_marks']}
            {': '}
            {answerSheet?.total_marks}
          </Body2>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{borderBottom: 1}} />
        </Grid>
        <Grid item xs={10}></Grid>
        <Grid item xs={2}>
          <Body2 sx={{textAlign: 'center'}}>
            {messages['common.obtained_mark']}
          </Body2>
          <Box sx={{borderBottom: 1}} />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {answerSheet && answerSheet?.exam_sections.length ? (
              answerSheet?.exam_sections.map((section: any, index: number) => {
                return (
                  <React.Fragment key={section?.id}>
                    <Grid item xs={12} display={'flex'}>
                      <Body1 sx={{fontWeight: 'bold'}}>
                        {question_type[section?.question_type - 1].label +
                          ' | ' +
                          messages['common.total_marks'] +
                          ': '}
                      </Body1>
                      <Body2 sx={{marginTop: '3px'}}>
                        {section?.total_marks}
                      </Body2>
                    </Grid>

                    {section?.questions && section?.questions.length ? (
                      section?.questions.map((question: any) => {
                        return (
                          <Grid item xs={12} key={question?.id}>
                            {getQuestionTypeComponent(
                              section?.question_type,
                              question,
                            )}
                          </Grid>
                        );
                      })
                    ) : (
                      <NoDataFoundComponent />
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

export default ExamMarkingViewPage;
