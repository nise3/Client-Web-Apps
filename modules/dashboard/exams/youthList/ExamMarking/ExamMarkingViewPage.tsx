import React from 'react';
import {Button, Grid, InputAdornment, Paper, TextField} from '@mui/material';
import {Body1, Body2} from '../../../../../@softbd/elements/common';
import {useIntl} from 'react-intl';
import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import {SubmitHandler, useForm} from 'react-hook-form';
import {QuestionType} from '../../../questionsBank/QuestionBanksEnums';
import FillInTheBlankTypeComponent from '../ExamMarkSheet/FillInTheBlankTypeComponent';
import MCQTypeComponent from '../ExamMarkSheet/MCQTypeComponent';
import YesNoTypeComponent from '../ExamMarkSheet/YesNoTypeComponent';
import FileView from '../ExamMarkSheet/FileTypeComponent';
import DescriptiveTypeComponent from '../ExamMarkSheet/DescriptiveTypeComponent';
import NoDataFoundComponent from '../../../../youth/common/NoDataFoundComponent';
import {question_type} from '../../../../../@softbd/utilities/helpers';
import EditIcon from '@mui/icons-material/Edit';
import {useFetchPreviewYouthExam} from '../../../../../services/instituteManagement/hooks';
import QuestionSkeleton from '../../../../youth/examQuestionPaper/QuestionSkeleton';
import {useRouter} from 'next/router';

/*const answerSheet = {
  id: 1,
  title: 'Yearly Exam',
  exam_id: 1,
  youth_id: 1,
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
          exam_result_id: 1,
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
          exam_result_id: 1,
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
          exam_result_id: 1,
          answer:
            'A profession is a disciplined group of individuals who adhere to ethical standards and whods/ A profession has been further defined as A profession is a disciplined group of individuals who adhere to ethical standards and who ... A profession has been further defined as',
        },
      ],
    },
  ],
};*/

/*const PREFIX = 'AnsweredQuestionPaper';
const classes = {
  textStyle: `${PREFIX}-textStyle`,
};*/

const StyledPaper = styled(Paper)(({theme}) => ({
  padding: '25px',
}));
const ExamMarkingViewPage = () => {
  const {messages} = useIntl();
  const router = useRouter();
  /*  const {updateSuccessMessage} = useSuccessMessage();*/
  let questionIndex = 1;
  let examResultIds: any = [];
  let {examId, youthId} = router.query;
  const {data: examSheet, isLoading: isExamLoading} = useFetchPreviewYouthExam(
    Number(examId),
    Number(youthId),
  );
  let marksIndex = 0;
  const {
    handleSubmit,
    register,
    formState: {isSubmitting},
  } = useForm<any>();

  const getQuestionTypeComponent = (questionType: any, question: any) => {
    // const examResultId = question?.exam_result_id;
    if (
      questionType != QuestionType.YES_NO &&
      questionType != QuestionType.MCQ &&
      questionType != QuestionType.FILL_IN_THE_BLANK
    ) {
      examResultIds.push(question?.exam_result_id);
    }
    switch (String(questionType)) {
      case QuestionType.YES_NO:
        return (
          <YesNoTypeComponent question={question} index={questionIndex++} />
        );
      case QuestionType.MCQ:
        return <MCQTypeComponent question={question} index={questionIndex++} />;
      case QuestionType.FILL_IN_THE_BLANK:
        return (
          <FillInTheBlankTypeComponent
            question={question}
            index={questionIndex++}
          />
        );
      case QuestionType.DESCRIPTIVE:
        return (
          <DescriptiveTypeComponent
            question={question}
            index={questionIndex++}
            inputField={
              <TextField
                id={'marks[' + marksIndex + '][marks_achieved]'}
                label={messages['common.mark']}
                type={'number'}
                size='small'
                sx={{width: '110px'}}
                {...register('marks[' + marksIndex++ + '][marks_achieved]')}
                defaultValue={question?.individual_marks}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end' sx={{width: '20px'}}>
                      <EditIcon />
                    </InputAdornment>
                  ),
                }}
              />
            }
          />
        );
      default:
        return (
          <FileView
            question={question}
            index={questionIndex++}
            inputField={
              <TextField
                id={'marks[' + marksIndex + '][marks_achieved]'}
                label={messages['common.mark']}
                type={'number'}
                size='small'
                sx={{width: '110px'}}
                {...register('marks[' + marksIndex++ + '][marks_achieved]')}
                defaultValue={question?.individual_marks}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end' sx={{width: '20px'}}>
                      <EditIcon />
                    </InputAdornment>
                  ),
                }}
              />
            }
          />
        );
    }
  };

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    console.log('data submit', data);
    if (examResultIds) {
      examResultIds.map((examResultId: any, index: number) => {
        data.marks[index].exam_result_id = examResultId;
      });
    }
    data.exam_id = examSheet?.exam_id;
    data.youth_id = examSheet?.youth_id;

    console.log(' format data', data);
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
      {isExamLoading ? (
        <QuestionSkeleton />
      ) : (
        <Grid container spacing={2}>
          <Grid
            item
            display={'flex'}
            alignItems={'center'}
            flexDirection={'column'}
            justifyContent={'center'}
            xs={12}>
            <Body2>{examSheet?.youth_name}</Body2>
            <Body2>{examSheet?.title}</Body2>
            <Body2>
              {messages['subject.label']}
              {': '}
              {examSheet?.subject_title}
            </Body2>
            <Body2>
              {messages['common.date']} {': '}
              {examSheet?.exam_date}
            </Body2>
            <Body2>
              {messages['common.total_obtained_marks'] +
                ': ' +
                examSheet?.total_obtained_marks}
            </Body2>
          </Grid>

          <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
            <Body2>
              {messages['common.duration'] + ': ' + examSheet?.duration}
            </Body2>
            <Body2>
              {messages['common.total_marks']}
              {': '}
              {examSheet?.total_marks}
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
                {examSheet && examSheet?.exam_sections.length ? (
                  examSheet?.exam_sections.map(
                    (section: any, index: number) => {
                      return (
                        <React.Fragment key={section?.id}>
                          <Grid item xs={12} display={'flex'}>
                            <Body1 sx={{fontWeight: 'bold'}}>
                              {messages[
                                question_type[section?.question_type - 1].label
                              ] +
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
                            <NoDataFoundComponent
                              messageType={messages['common.question']}
                            />
                          )}
                        </React.Fragment>
                      );
                    },
                  )
                ) : (
                  <NoDataFoundComponent />
                )}
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
      )}
    </StyledPaper>
  );
};

export default ExamMarkingViewPage;
