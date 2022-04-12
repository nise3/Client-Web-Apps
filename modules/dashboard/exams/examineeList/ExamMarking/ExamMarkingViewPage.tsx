import React, {useEffect} from 'react';
import {Button, Grid, Paper} from '@mui/material';
import {Body2} from '../../../../../@softbd/elements/common';
import {useIntl} from 'react-intl';
import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import {SubmitHandler, useForm} from 'react-hook-form';

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
        'What is your name What is your name What is your name What is your name What is your name What is your name What is your name What is your name What is your name What is your name What is your name ?',
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
      marks: {
        mark: 1,
        question_id: 5,
      },
    },
    {
      id: 6,
      title: '[[]]am a [[]] engineer [[]] softbd ',
      title_en: '[[]] am a [[]] engineer  [[]] softbd ',
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
      marks: {
        mark: 1,
        question_id: 5,
      },
      /* answer:
        'A profession is a disciplined group of individuals who adhere to ethical standards and who vcvxvvxcvx .profession has been further defined as A profession is a disciplined group of individuals who adhere to ethical standards and who ... A profession has been further defined as',*/
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
const ExamMarkingViewPage = () => {
  const {messages} = useIntl();
  /*  const {updateSuccessMessage} = useSuccessMessage();*/

  const {
    reset,
    handleSubmit,
    formState: {isSubmitting},
  } = useForm<any>();

  useEffect(() => {
    let data: any = {};
    if (answerSheet) {
      const questionsData = answerSheet?.questions;
      if (questionsData) {
        questionsData.map((item: any, index: any) => {
          if (item?.marks) {
            console.log('item', item.marks);
            data['marks[' + index + '][mark]'] = item?.mark;
            data['marks[' + index + '][question_id]'] = item?.question_id;
          }
        });
      }
      console.log('data dd', data);
      reset(data);
    }
  }, [answerSheet]);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    console.log('data submit', data);
    try {
      /*     await updateExamMarks(itemId, data);
      updateSuccessMessage('common.marks_distribution');*/
      // mutateExamMark();
      /*props.onClose();
      refreshDataTable();*/
    } catch (error: any) {
      /*   processServerSideErrors({error, setError, validationSchema, errorStack});*/
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
          <Body2>{answerSheet?.examinee_name}</Body2>
          <Body2>{answerSheet?.exam_title}</Body2>
          <Body2>
            {messages['subject.label'] + ': ' + answerSheet?.exam_subject_title}
          </Body2>
          <Body2>
            {messages['common.date'] + ': ' + answerSheet?.exam_date}
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
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            <Grid container spacing={2}>
              {/*  {answerSheet && answerSheet?.questions.length ? (
                answerSheet?.questions.map((question: any, index: number) => {
                  return (
                    <React.Fragment key={question?.id}>
                      {question?.question_type ==
                      QuestionType.FILL_IN_THE_BLANK ? (
                        <>
                          <Grid item xs={10} display={'flex'}>
                            <Body2 sx={{fontWeight: 'bold'}}>
                              {index + 1 + '.  '}
                            </Body2>
                            <FillInTheBlankTypeView section={question} />
                            <Body2 sx={{fontWeight: 'bold', marginLeft: '5px'}}>
                              {'(' + question?.mark + ')'}
                            </Body2>
                          </Grid>
                          <Grid item xs={2}>
                            <Body2
                              sx={{
                                fontWeight: 'bold',
                                textAlign: 'center    ',
                              }}>
                              {question?.obtained_mark}
                            </Body2>
                          </Grid>
                        </>
                      ) : (
                        <>
                          <Grid item xs={10} display={'flex'}>
                            <Body2 sx={{fontWeight: 'bold'}}>
                              {index + 1 + '.  '}
                            </Body2>
                            <Body2>{question?.title}</Body2>
                            <Body2 sx={{fontWeight: 'bold'}}>
                              {'(' + question?.mark + ')'}
                            </Body2>
                          </Grid>
                          <Grid item xs={2}>
                            {question?.question_type == QuestionType.MCQ ||
                            question?.question_type == QuestionType.YES_NO ? (
                              <Body2
                                sx={{fontWeight: 'bold', textAlign: 'center'}}>
                                {question?.obtained_mark}
                              </Body2>
                            ) : (
                              <>
                                <TextField
                                  id={'marks[' + index + '][mark]'}
                                  label='Mark'
                                  type={'number'}
                                  size='small'
                                  sx={{width: '100px'}}
                                  {...register('marks[' + index + '][mark]')}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position='end'>
                                        <EditIcon />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                                <TextField
                                  id={'marks[' + index + '][question_id]'}
                                  type={'hidden'}
                                  {...register(
                                    'answers[' + index + '][question_id]',
                                  )}
                                  defaultValue={question?.question_id}
                                  sx={{display: 'none'}}
                                />
                              </>
                            )}
                          </Grid>
                          <Grid item xs={10}>
                            {question?.question_type == QuestionType.MCQ && (
                              <MCQTypeView question={question} />
                            )}
                            {question?.question_type == QuestionType.YES_NO && (
                              <YesNoTypeView question={question} />
                            )}
                            {(question?.question_type ==
                              QuestionType.PRESENTATION ||
                              question?.question_type ==
                                QuestionType.FIELD_WORK ||
                              question?.question_type ==
                                QuestionType.PRACTICAL) && (
                              <FileView question={question} />
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
              )}*/}
              <Grid item xs={12} display={'flex'} justifyContent={'flex-end'}>
                <Button
                  variant={'contained'}
                  disabled={isSubmitting}
                  type={'submit'}>
                  {messages['common.submit']}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

export default ExamMarkingViewPage;
