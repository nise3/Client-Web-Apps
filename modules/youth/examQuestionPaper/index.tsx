import React, {useEffect, useMemo, useState} from 'react';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';
import {Button, Grid, Paper} from '@mui/material';
import {Body1, Body2, H6} from '../../../@softbd/elements/common';
import {useIntl} from 'react-intl';
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
import QuestionSkeleton from './QuestionSkeleton';
import MCQTypeQuestion from './MCQTypeQuestion';
import moment from 'moment';
import {submitExamPaper} from '../../../services/instituteManagement/ExamService';
import HiddenInput from './HiddenInput';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
/*
interface ExamQuestionListProps {
  questions: any;

}*/

const ExamQuestionPaper = () => {
  let questionIndex = 1;
  let answerIndex = 0;
  const {messages} = useIntl();
  const router = useRouter();
  const authUser = useAuthUser();
  const {errorStack} = useNotiStack();
  const [timer, setTimer] = useState<string | null>('');
  const [submitDisable, setSubmitDisable] = useState<boolean>(false);
  const [hasExamStarted, setHasExamStarted] = useState(false);
  const [hasExamEnded, sethasExamEnded] = useState(false);

  const {examId} = router.query;

  const {data: examQuestions, isLoading: isLoadingExamQuestions} =
    useFetchExamQuestionPaper(Number(examId));

  const validationSchema: any = useMemo(() => {
    return yup.object().shape({});
  }, []);

  useEffect(() => {
    let currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
    if (examQuestions) {
      let examDate = examQuestions?.exam_date;

      let duration = moment.duration(
        moment(currentDate).diff(moment(examDate)),
      );
      let minutes = Number(duration.asMinutes());
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
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({resolver: yupResolver(validationSchema)});

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    console.log('data: ', data);
    let formData = data;
    if (authUser && authUser?.isYouthUser) {
      formData.youth_id = authUser?.youthId;
    }
    formData.exam_id = examId;
    if (formData.questions) {
      formData.questions.map((question: any) => {
        if (question.answers) {
          question.answers.map((answer: any, index: number) => {
            if (answer === true) {
              question.answers[index] = String(1);
            } else if (answer === false) {
              question.answers[index] = String(0);
            }
          });
        }
      });
    }
    await submitExamPaper(formData);
    try {
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <Paper
      sx={{
        padding: '25px',
        margin: '30px',
        boxShadow: '1px 1px 5px 2px #7b6a6a1f',
      }}>
      <Grid container spacing={2}>
        {isLoadingExamQuestions ? (
          <QuestionSkeleton />
        ) : examQuestions ? (
          <>
            <Grid
              item
              display={'flex'}
              alignItems={'center'}
              flexDirection={'column'}
              justifyContent={'center'}
              xs={12}>
              <H6>{examQuestions?.title}</H6>
              <Body2>
                {messages['subject.label']}
                {': '}
                {examQuestions?.subject_title}
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
                <Grid container spacing={2}>
                  {isLoadingExamQuestions ? (
                    <Skeleton variant='text' />
                  ) : examQuestions && examQuestions?.exam_sections.length ? (
                    examQuestions?.exam_sections.map((section: any) => {
                      return (
                        <React.Fragment key={section?.id}>
                          <Grid item xs={12} display={'flex'}>
                            <Body1 sx={{fontWeight: 'bold', whiteSpace: 'pre'}}>
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
                              let indexNo = 0;
                              if (section?.question_type == QuestionType?.MCQ) {
                                let ansIndex = answerIndex++;

                                return (
                                  <React.Fragment key={question?.id}>
                                    <QuestionTitleHeader
                                      index={questionIndex++}
                                      question={question}
                                    />
                                    <MCQTypeQuestion
                                      index={ansIndex}
                                      question={question}
                                      register={register}
                                    />
                                    <HiddenInput
                                      register={register}
                                      index={ansIndex}
                                      section={section}
                                      question={question}
                                    />
                                  </React.Fragment>
                                );
                              } else if (
                                section?.question_type == QuestionType.YES_NO
                              ) {
                                let ansIndex = answerIndex++;
                                return (
                                  <React.Fragment key={question?.id}>
                                    <QuestionTitleHeader
                                      index={questionIndex++}
                                      question={question}
                                    />
                                    <FormRadioButtons
                                      id={
                                        'questions[' + ansIndex + '].answers[0]'
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
                                    <HiddenInput
                                      register={register}
                                      index={ansIndex}
                                      section={section}
                                      question={question}
                                    />
                                  </React.Fragment>
                                );
                              } else if (
                                section?.question_type ==
                                QuestionType.DESCRIPTIVE
                              ) {
                                let ansIndex = answerIndex++;
                                return (
                                  <React.Fragment key={question?.id}>
                                    <QuestionTitleHeader
                                      question={question}
                                      index={questionIndex++}
                                    />
                                    <CustomTextInput
                                      id={
                                        'questions[' + ansIndex + '].answers[0]'
                                      }
                                      label={''}
                                      multiline={true}
                                      rows={3}
                                      register={register}
                                      errorInstance={errors}
                                      isLoading={false}
                                    />
                                    <HiddenInput
                                      register={register}
                                      index={ansIndex}
                                      section={section}
                                      question={question}
                                    />
                                  </React.Fragment>
                                );
                              } else if (
                                section?.question_type ==
                                QuestionType.FILL_IN_THE_BLANK
                              ) {
                                let fillInTheBlankItems = question?.title.split(
                                  /(?=\[\[\]\])|(?<=\[\[\]\])/g,
                                );
                                let ansIndex = answerIndex++;

                                return (
                                  <React.Fragment key={question?.id}>
                                    <Grid item xs={12} display={'flex'}>
                                      <Body2>{ansIndex + '. '}</Body2>
                                      {fillInTheBlankItems.map((item: any) => {
                                        if (item == '[[]]') {
                                          return (
                                            <CustomTextInput
                                              id={`questions[${ansIndex}].answers[${indexNo++}]`}
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
                                      })}
                                      <HiddenInput
                                        register={register}
                                        index={ansIndex}
                                        section={section}
                                        question={question}
                                      />
                                    </Grid>
                                  </React.Fragment>
                                );
                              } else {
                                let ansIndex = answerIndex++;
                                return (
                                  <React.Fragment>
                                    <QuestionTitleHeader
                                      index={questionIndex++}
                                      question={question}
                                    />
                                    <FileUploadComponent
                                      id={
                                        'questions[' + ansIndex + '].file_path'
                                      }
                                      setValue={setValue}
                                      errorInstance={errors}
                                      register={register}
                                      label={messages['common.file_path']}
                                    />
                                    <HiddenInput
                                      register={register}
                                      index={ansIndex}
                                      section={section}
                                      question={question}
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
                    })
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
        ) : hasExamEnded ? (
          <Body1>{'Exam has ended'}</Body1>
        ) : !hasExamStarted ? (
          <>
            <Body1>{'Exam has not started yet'}</Body1>
          </>
        ) : (
          <></>
        )}
      </Grid>
    </Paper>
  );
};

export default ExamQuestionPaper;
