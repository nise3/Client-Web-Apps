import React from 'react';
import NoDataFoundComponent from '../../../../youth/common/NoDataFoundComponent';
import {Grid, Paper} from '@mui/material';
import {Body2} from '../../../../../@softbd/elements/common';
import {useIntl} from 'react-intl';
import {QuestionType} from '../../../questionsBank/QuestionBanksEnums';
import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import YesNoTypeView from './YesNoTypeView';
import MCQTypeView from './MCQTypeView';
import {getIntlNumber} from '../../../../../@softbd/utilities/helpers';
import FileView from './FileView';
import DescriptiveTypeView from './DescriptiveTypeView';
import FillInTheBlankTypeView from './FillInTheBlankTypeView';
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
          obtained_mark: 1,
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
          obtained_mark: 1,
          answer: ['software', 'at', 'ltd'],
        },
        {
          id: 2,
          title: 'She is a [[]] engineer [[]] softbd [[]]',
          title_en: 'She is a [[]] engineer  [[]] softbd [[]]',
          mark: 1,
          obtained_mark: 1,
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
          obtained_mark: 1,
          answer: 1,
          correct_answer: 1,
        },
        {
          id: 2,
          title: 'Done your work?',
          title_en: 'Done your work?',
          mark: 1,
          obtained_mark: 1,
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
          obtained_mark: 1,
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
          obtained_mark: 1,
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
const ExamMarkSheetView = () => {
  const {messages, formatNumber} = useIntl();
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
              getIntlNumber(formatNumber, answerSheet?.total_obtained_marks)}
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
                    {section?.question_type ==
                      QuestionType.FILL_IN_THE_BLANK && (
                      <Grid item xs={12} display={'flex'}>
                        <FillInTheBlankTypeView section={section} />
                      </Grid>
                    )}
                    {section.question_type == QuestionType.MCQ && (
                      <Grid item xs={12}>
                        <MCQTypeView section={section || []} />
                      </Grid>
                    )}
                    {section.question_type == QuestionType.YES_NO && (
                      <Grid item xs={12}>
                        <YesNoTypeView section={section || []} />
                      </Grid>
                    )}
                    {(section.question_type == QuestionType.FIELD_WORK ||
                      section.question_type == QuestionType.PRACTICAL ||
                      section.question_type == QuestionType.PRESENTATION) && (
                      <Grid item xs={12}>
                        <FileView section={section || []} />
                      </Grid>
                    )}
                    {section.question_type == QuestionType.DESCRIPTIVE && (
                      <Grid item xs={12}>
                        <DescriptiveTypeView section={section || []} />
                      </Grid>
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

export default ExamMarkSheetView;
