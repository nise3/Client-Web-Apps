import React, {useEffect, useMemo, useState} from 'react';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';
import {Button, Grid, Paper} from '@mui/material';
import {Body1, Body2, H6} from '../../../@softbd/elements/common';
import {useIntl} from 'react-intl';
import CustomCheckbox from '../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';
import {SubmitHandler, useForm} from 'react-hook-form';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import yup from '../../../@softbd/libs/yup';
import {yupResolver} from '@hookform/resolvers/yup';
import cookieInstance from '../../../@softbd/libs/cookieInstance';
import {COOKIE_KEY_EXAM_TIME} from '../../../shared/constants/AppConst';
import {EXAM_TIME_IN_MILLIS} from '../../../@softbd/common/constants';
import {getTimer, question_type} from '../../../@softbd/utilities/helpers';
import {useFetchExamQuestionPaper} from '../../../services/instituteManagement/hooks';
import {useRouter} from 'next/router';
import {QuestionType} from '../../dashboard/questionsBank/QuestionBanksEnums';
import {Skeleton} from '@mui/lab';
import QuestionTitleHeader from './QuestionTitleHeader';
import moment from 'moment';
/*
interface ExamQuestionListProps {
  questions: any;

}*/
/*
const examQuestions = {
  id: 1,
  exam_title: 'Yearly Exam',
  answers: [],
  exam_subject_title: 'Subject',
  exam_subject_title_en: 'Subject',
  questions: [
    {
      id: 1,
      title: 'What is your name?',
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
    },

    {
      id: 2,
      title: 'I am a [[]] engineer [[]] softbd [[]]',
      title_en: 'I am a [[]] engineer  [[]] softbd [[]]',
      question_type: 2,
    },
    {
      id: 3,
      title: 'Is this question?',
      title_en: 'Is this question?',
      question_type: 3,
    },
    {
      id: 5,
      title: 'Please upload your field work file',
      title_en: 'Please upload your field work file',
      question_type: 5,
    },
    {
      id: 6,
      title: '[[]] am a [[]] engineer [[]] softbd ',
      title_en: '[[]] am a [[]] engineer  [[]] softbd ',
      question_type: 2,
    },
    {
      id: 7,
      title: 'Write down about your profession',
      title_en: 'Write down about your profession',
      question_type: 7,
    },
  ],
  exam_date: '10/12/22',
  total_marks: 100,
};*/
const ExamQuestionPaper = () => {
  let questionIndex = 1;
  let answerIndex = 0;
  const {messages} = useIntl();
  const router = useRouter();
  const [isOption1Checked, setIsOption1Checked] = useState<boolean>(false);
  const [isOption2Checked, setIsOption2Checked] = useState<boolean>(false);
  const [isOption3Checked, setIsOption3Checked] = useState<boolean>(false);
  const [isOption4Checked, setIsOption4Checked] = useState<boolean>(false);
  const [timer, setTimer] = useState<string | null>('');
  const [submitDisable, setSubmitDisable] = useState<boolean>(false);
  const [hasExamStarted, setHasExamStarted] = useState(false);
  const [hasExamEnded, sethasExamEnded] = useState(false);

  const {examId} = router.query;

  const {data: examQuestions, isLoading: isLoadingExamQuestions} =
    useFetchExamQuestionPaper(Number(examId));

  const validationSchema: any = useMemo(() => {
    return yup.object().shape({
      answers: yup
        .array()
        .of(yup.mixed())
        .required()
        .label(messages['common.answer'] as string),
    });
  }, []);
  useEffect(() => {
    let currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
    if (examQuestions) {
      let examDate = examQuestions?.exam_date;

      console.log('examData', examDate);
      console.log('currentDate', currentDate);
      let duration = moment.duration(
        moment(currentDate).diff(moment(examDate)),
      );
      let minutes = Number(duration.asMinutes());
      console.log('minutes', minutes);
      if (minutes > examQuestions?.duration) {
        sethasExamEnded(true);
      } else if (minutes < 0) {
        setHasExamStarted(false);
      } else {
        sethasExamEnded(false);
        setHasExamStarted(true);
      }
    }
  }, [examQuestions]);

  useEffect(() => {
    if (!isLoadingExamQuestions) {
      setTimer('1:20:00');
    }
  }, [isLoadingExamQuestions]);

  useEffect(() => {
    /*    console.log('isLoadingexamq', isLoadingExamQuestions);*/
    if (!isLoadingExamQuestions) {
      const current = new Date();
      let expireDate = new Date();
      const expireTime = expireDate.getTime() + EXAM_TIME_IN_MILLIS;
      expireDate.setTime(expireTime);

      cookieInstance.set(COOKIE_KEY_EXAM_TIME, current.getTime(), {
        expires: expireDate,
      });
      let date = cookieInstance.get(COOKIE_KEY_EXAM_TIME);
      if (date) {
        date = Number(date);
        const currentDate = new Date();

        if (date && currentDate.getTime() - date < EXAM_TIME_IN_MILLIS) {
          const expireTime = date + EXAM_TIME_IN_MILLIS;
          const timeout = expireTime - currentDate.getTime();

          if (timeout > 0) {
            const interval = setInterval(() => {
              let remainingTime = getTimer(date);
              setTimer(remainingTime.timer);
              if (remainingTime.clearInterval) {
                clearInterval(interval);
                setSubmitDisable(true);
              }
            }, 1000);
          }
        } else {
          setTimer(null);
        }
      }
    }
  }, [isLoadingExamQuestions]);

  const {
    register,
    control,
    setValue,
    // setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({resolver: yupResolver(validationSchema)});

  const onSubmit: SubmitHandler<any> = async (formData: any) => {
    console.log('formData: ', formData);

    try {
    } catch (error: any) {}
  };

  return (
    <Paper
      sx={{
        padding: '25px',
        margin: '30px',
        boxShadow: '1px 1px 5px 2px #7b6a6a1f',
      }}>
      <Grid container spacing={2}>
        {hasExamEnded ? (
          <Body1>{'Exam has ended'}</Body1>
        ) : hasExamStarted ? (
          <>
            <Grid
              item
              display={'flex'}
              alignItems={'center'}
              flexDirection={'column'}
              justifyContent={'center'}
              xs={12}>
              <H6>{examQuestions?.exam_title}</H6>
              <Body2>
                {messages['subject.label']}
                {': '}
                {examQuestions?.exam_subject_title}
              </Body2>
              <Body2>
                {messages['common.date']} {': '}
                {examQuestions?.exam_date}
              </Body2>
            </Grid>

            <Grid
              item
              xs={12}
              display={'flex'}
              justifyContent={'space-between'}>
              <Body2>{messages['common.time_remaining'] + ': ' + timer}</Body2>
              <Body2 sx={{marginLeft: 'auto'}}>
                {messages['common.total_marks']}
                {': '}
                {examQuestions?.total_marks}
              </Body2>
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                <Grid container spacing={1}>
                  {isLoadingExamQuestions ? (
                    <Skeleton variant='text' />
                  ) : examQuestions && examQuestions?.exam_sections.length ? (
                    examQuestions?.exam_sections.map(
                      (section: any, index: number) => {
                        let indexNo = 0;
                        return (
                          <React.Fragment key={section?.id}>
                            <Grid item xs={12} display={'flex'}>
                              <Body1
                                sx={{fontWeight: 'bold', whiteSpace: 'pre'}}>
                                {question_type[section?.question_type - 1]
                                  .label +
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
                                if (
                                  section?.question_type == QuestionType?.MCQ
                                ) {
                                  return (
                                    <React.Fragment key={question?.id}>
                                      <QuestionTitleHeader
                                        index={questionIndex++}
                                        question={question}
                                      />
                                      <Grid
                                        item
                                        xs={10}
                                        display={'flex'}
                                        flexDirection={'column'}>
                                        <CustomCheckbox
                                          id={
                                            'questions[' +
                                            answerIndex++ +
                                            '].answers[0]'
                                          }
                                          label={question?.option_1}
                                          register={register}
                                          errorInstance={errors}
                                          checked={isOption1Checked}
                                          onChange={() => {
                                            setIsOption1Checked(
                                              (prev) => !prev,
                                            );
                                          }}
                                          isLoading={false}
                                        />
                                        <CustomCheckbox
                                          id={
                                            'questions[' +
                                            answerIndex++ +
                                            '].answers[1]'
                                          }
                                          label={question?.option_2}
                                          register={register}
                                          errorInstance={errors}
                                          checked={isOption2Checked}
                                          onChange={() => {
                                            setIsOption2Checked(
                                              (prev: any) => !prev,
                                            );
                                          }}
                                          isLoading={false}
                                        />
                                        <CustomCheckbox
                                          id={
                                            'questions[' +
                                            answerIndex++ +
                                            '].answers[2]'
                                          }
                                          label={question?.option_3}
                                          register={register}
                                          errorInstance={errors}
                                          checked={isOption3Checked}
                                          onChange={() => {
                                            setIsOption3Checked(
                                              (prev: any) => !prev,
                                            );
                                          }}
                                          isLoading={false}
                                        />
                                        <CustomCheckbox
                                          id={
                                            'questions[' +
                                            answerIndex++ +
                                            '].answers[3]'
                                          }
                                          label={question?.option_4}
                                          register={register}
                                          errorInstance={errors}
                                          checked={isOption4Checked}
                                          onChange={() => {
                                            setIsOption4Checked(
                                              (prev: any) => !prev,
                                            );
                                          }}
                                          isLoading={false}
                                        />
                                      </Grid>
                                    </React.Fragment>
                                  );
                                } else if (
                                  section?.question_type == QuestionType.YES_NO
                                ) {
                                  return (
                                    <React.Fragment key={question?.id}>
                                      <QuestionTitleHeader
                                        index={questionIndex++}
                                        question={question}
                                      />
                                      <FormRadioButtons
                                        id={
                                          'questions[' +
                                          answerIndex++ +
                                          '].answers[0]'
                                        }
                                        control={control}
                                        radios={[
                                          {
                                            label: messages['common.yes'],
                                            key: 1,
                                          },
                                          {
                                            label: messages['common.no'],
                                            key: 2,
                                          },
                                        ]}
                                      />
                                    </React.Fragment>
                                  );
                                } else if (
                                  section?.question_type ==
                                  QuestionType.DESCRIPTIVE
                                ) {
                                  return (
                                    <React.Fragment key={question?.id}>
                                      <QuestionTitleHeader
                                        question={question}
                                        index={questionIndex++}
                                      />
                                      <CustomTextInput
                                        id={
                                          'questions[' +
                                          answerIndex++ +
                                          '].answers[0]'
                                        }
                                        label={''}
                                        multiline={true}
                                        rows={3}
                                        register={register}
                                        errorInstance={errors}
                                        isLoading={false}
                                      />
                                    </React.Fragment>
                                  );
                                } else if (
                                  section?.question_type ==
                                  QuestionType.FILL_IN_THE_BLANK
                                ) {
                                  let fillInTheBlankItems =
                                    question?.title.split(
                                      /(?=\[\[\]\])|(?<=\[\[\]\])/g,
                                    );
                                  return (
                                    <React.Fragment key={question?.id}>
                                      <Grid item xs={12} display={'flex'}>
                                        <Body2>{questionIndex++ + '. '}</Body2>
                                        {fillInTheBlankItems.map(
                                          (item: any) => {
                                            if (item == '[[]]') {
                                              return (
                                                <CustomTextInput
                                                  id={`answer[${index}][${indexNo++}]`}
                                                  label={''}
                                                  register={register}
                                                  errorInstance={errors}
                                                  isLoading={false}
                                                  style={{
                                                    display: 'inline-block',
                                                    width: '150px',
                                                    marginTop: '-8px',
                                                  }}
                                                />
                                              );
                                            } else {
                                              return (
                                                <Body2 sx={{whiteSpace: 'pre'}}>
                                                  {item}
                                                </Body2>
                                              );
                                            }
                                          },
                                        )}
                                      </Grid>
                                    </React.Fragment>
                                  );
                                } else {
                                  return (
                                    <React.Fragment>
                                      <QuestionTitleHeader
                                        index={questionIndex++}
                                        question={question}
                                      />
                                      <FileUploadComponent
                                        id={'questions[' + index + ']'}
                                        setValue={setValue}
                                        errorInstance={errors}
                                        register={register}
                                        label={messages['common.file_path']}
                                      />
                                    </React.Fragment>
                                  );
                                }
                              })
                            ) : (
                              <NoDataFoundComponent />
                            )}
                          </React.Fragment>
                        );
                      },
                    )
                  ) : (
                    <NoDataFoundComponent />
                  )}
                </Grid>
                <Grid item display={'flex'} justifyContent={'space-between'}>
                  <Button
                    sx={{marginLeft: 'auto', marginTop: '10px'}}
                    type={'submit'}
                    variant={'contained'}
                    color={'primary'}
                    disabled={isSubmitting || submitDisable}>
                    {messages['common.submit']}
                  </Button>
                </Grid>
              </form>
            </Grid>
          </>
        ) : (
          <>
            <Body1>{'Exam has not started yet'}</Body1>
          </>
        )}
      </Grid>
    </Paper>
  );
};

export default ExamQuestionPaper;
