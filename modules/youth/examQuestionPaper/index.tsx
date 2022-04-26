import React, {useEffect, useMemo, useState} from 'react';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';
import {Button, Grid, Paper} from '@mui/material';
import {Body1, Body2, H4, H6} from '../../../@softbd/elements/common';
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
import {
  getIntlDateFromString,
  getIntlNumber,
  getTimer,
  question_type,
} from '../../../@softbd/utilities/helpers';
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
import {cloneDeep} from 'lodash';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {LINK_FRONTEND_YOUTH_COURSE_DETAILS} from '../../../@softbd/common/appLinks';

const ExamQuestionPaper = () => {
  let questionIndex = 1;
  let answerIndex = 0;
  const {messages, formatDate, formatNumber} = useIntl();
  const router = useRouter();
  const authUser = useAuthUser();
  const {errorStack} = useNotiStack();
  const [timer, setTimer] = useState<string | null>('');
  const [submitDisable, setSubmitDisable] = useState<boolean>(false);
  const [hasExamStarted, setHasExamStarted] = useState(false);
  const [hasExamEnded, setHasExamEnded] = useState(false);
  const [examQuestionFilter, setExamQuestionFilter] = useState<any>(null);
  const {examId} = router.query;
  const {submissionSuccessMessage} = useSuccessMessage();
  const {data: examQuestions, isLoading: isLoadingExamQuestions} =
    useFetchExamQuestionPaper(examQuestionFilter);

  const [examQuestionData, setExamQuestionData] = useState<any>(null);
  const [loadingQuestions, setLoadingQuestions] = useState<boolean>(true);

  const validationSchema: any = useMemo(() => {
    return yup.object().shape({});
  }, []);

  useEffect(() => {
    let currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
    if (examQuestionData) {
      let examDate = examQuestionData?.exam_date;

      let duration = moment.duration(
        moment(currentDate).diff(moment(examDate)),
      );
      let minutes = Number(duration.asMinutes());
      if (minutes > examQuestionData?.duration) {
        setHasExamEnded(true);
      } else if (minutes < 0) {
        setHasExamStarted(false);
      } else {
        setHasExamEnded(false);
        setHasExamStarted(true);
        setLoadingQuestions(false);
        initTimer(currentDate, examDate);
      }
    }
  }, [examQuestionData]);

  const initTimer = (currentDate: string, examDate: string) => {};

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
    getValues,
    reset,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({resolver: yupResolver(validationSchema)});

  useEffect(() => {
    try {
      let storedQuestions = localStorage.getItem('questionPaper');
      if (storedQuestions) {
        setExamQuestionData(JSON.parse(storedQuestions));

        let storedAnswers = localStorage.getItem('questionAnswers');
        if (storedAnswers) {
          reset(JSON.parse(storedAnswers));
        }
      } else {
        setExamQuestionFilter(examId);
        if (examQuestions) {
          localStorage.setItem('questionPaper', JSON.stringify(examQuestions));
          setExamQuestionData(examQuestions);
        }
      }
    } catch (e) {}
  }, [examQuestions]);

  useEffect(() => {
    window.onbeforeunload = function (event) {
      localStorage.setItem('questionAnswers', JSON.stringify(getValues()));
      return confirm('Confirm refresh');
    };
  }, []);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      console.log('data: ', data);
      let formData = cloneDeep(data);
      if (authUser && authUser?.isYouthUser) {
        formData.youth_id = authUser?.youthId;
      }
      formData.exam_id = examId;

      if (formData.questions) {
        formData.questions.map((question: any) => {
          question.individual_marks = Number(question.individual_marks);
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
      submissionSuccessMessage('common.answer_sheet');
      setHasExamEnded(true);
      localStorage.removeItem('questionPaper');
      localStorage.removeItem('questionAnswers');
      if (examQuestions?.course_id) {
        router
          .push(LINK_FRONTEND_YOUTH_COURSE_DETAILS + examQuestions.course_id)
          .then((r) => {});
      }
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
        {loadingQuestions ? (
          <QuestionSkeleton />
        ) : hasExamEnded ? (
          <Grid item xs={12}>
            <H4 sx={{textAlign: 'center'}}>{messages['exam.ended']}</H4>
          </Grid>
        ) : !hasExamStarted ? (
          <Grid item xs={12}>
            <H4 sx={{textAlign: 'center'}}>{messages['exam.not_started']}</H4>
          </Grid>
        ) : examQuestionData ? (
          <>
            <Grid
              item
              display={'flex'}
              alignItems={'center'}
              flexDirection={'column'}
              justifyContent={'center'}
              xs={12}>
              <H6>{examQuestionData?.title}</H6>
              {/*<Body2> todo: this is not need now
                {messages['subject.label']}
                {': '}
                {examQuestionData?.subject_title}
              </Body2>*/}
              <Body2>
                {messages['common.date']} {': '}
                {getIntlDateFromString(formatDate, examQuestionData?.exam_date)}
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
                {getIntlNumber(formatNumber, examQuestionData?.total_marks)}
              </Body2>
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                <Grid container spacing={2}>
                  {isLoadingExamQuestions ? (
                    <Skeleton variant='text' />
                  ) : examQuestionData &&
                    examQuestionData?.exam_sections &&
                    examQuestionData?.exam_sections.length ? (
                    examQuestionData?.exam_sections.map((section: any) => {
                      return (
                        <React.Fragment key={section?.id}>
                          <Grid item xs={12} display={'flex'}>
                            <Body1 sx={{fontWeight: 'bold', whiteSpace: 'pre'}}>
                              {messages[
                                question_type[section?.question_type - 1].label
                              ] +
                                ' | ' +
                                messages['common.total_marks'] +
                                ': '}
                            </Body1>
                            <Body2 sx={{marginTop: '3px'}}>
                              {getIntlNumber(
                                formatNumber,
                                section?.total_marks,
                              )}
                            </Body2>
                          </Grid>
                          {section?.questions && section?.questions.length ? (
                            section?.questions.map((question: any) => {
                              let ansIndex = answerIndex++;

                              let hiddenFields = (
                                <HiddenInput
                                  register={register}
                                  index={ansIndex}
                                  section={section}
                                  question={question}
                                />
                              );
                              let questionHeader;
                              if (
                                section?.question_type !=
                                QuestionType?.FILL_IN_THE_BLANK
                              ) {
                                questionHeader = (
                                  <QuestionTitleHeader
                                    index={questionIndex++}
                                    question={question}
                                  />
                                );
                              }

                              if (section?.question_type == QuestionType?.MCQ) {
                                return (
                                  <React.Fragment key={question?.id}>
                                    {questionHeader}
                                    {hiddenFields}
                                    <Grid item xs={11}>
                                      {' '}
                                      <MCQTypeQuestion
                                        index={ansIndex}
                                        question={question}
                                        register={register}
                                      />
                                    </Grid>
                                  </React.Fragment>
                                );
                              } else if (
                                section?.question_type == QuestionType.YES_NO
                              ) {
                                return (
                                  <React.Fragment key={question?.id}>
                                    {questionHeader}
                                    {hiddenFields}
                                    <Grid item xs={11}>
                                      <FormRadioButtons
                                        id={
                                          'questions[' +
                                          ansIndex +
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
                                    </Grid>
                                  </React.Fragment>
                                );
                              } else if (
                                section?.question_type ==
                                QuestionType.DESCRIPTIVE
                              ) {
                                return (
                                  <React.Fragment key={question?.id}>
                                    {questionHeader}
                                    {hiddenFields}
                                    <Grid item xs={11}>
                                      <CustomTextInput
                                        id={
                                          'questions[' +
                                          ansIndex +
                                          '].answers[0]'
                                        }
                                        label={''}
                                        multiline={true}
                                        rows={3}
                                        register={register}
                                        errorInstance={errors}
                                        isLoading={false}
                                      />
                                    </Grid>
                                  </React.Fragment>
                                );
                              } else if (
                                section?.question_type ==
                                QuestionType.FILL_IN_THE_BLANK
                              ) {
                                let fillInTheBlankItems = question?.title.split(
                                  /(?=\[\[\]\])|(?<=\[\[\]\])/g,
                                );
                                let indexNo = 0;
                                let qIndex = questionIndex++;
                                return (
                                  <React.Fragment key={question?.id}>
                                    <Grid item xs={11} display={'flex'}>
                                      <Body2
                                        sx={{
                                          fontWeight: 'bold',
                                          textAlign: 'center',
                                        }}>
                                        {getIntlNumber(formatNumber, qIndex) +
                                          '. '}
                                      </Body2>
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
                                      {hiddenFields}
                                    </Grid>
                                    <Grid item xs={1}>
                                      <Body2
                                        sx={{
                                          fontWeight: 'bold',
                                          textAlign: 'center',
                                        }}>
                                        {getIntlNumber(
                                          formatNumber,
                                          question?.individual_marks,
                                        )}
                                      </Body2>
                                    </Grid>
                                  </React.Fragment>
                                );
                              } else {
                                return (
                                  <React.Fragment key={question?.id}>
                                    {questionHeader}
                                    {hiddenFields}
                                    <Grid item xs={11}>
                                      <FileUploadComponent
                                        id={
                                          'questions[' +
                                          ansIndex +
                                          '].file_path'
                                        }
                                        setValue={setValue}
                                        errorInstance={errors}
                                        register={register}
                                        label={messages['common.file_path']}
                                      />
                                    </Grid>
                                  </React.Fragment>
                                );
                              }
                            })
                          ) : (
                            <NoDataFoundComponent
                              messageType={messages['common.question']}
                              messageTextType={'h6'}
                            />
                          )}
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <NoDataFoundComponent
                      messageType={messages['common.question']}
                      messageTextType={'h6'}
                    />
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
          <></>
        )}
      </Grid>
    </Paper>
  );
};

export default ExamQuestionPaper;
