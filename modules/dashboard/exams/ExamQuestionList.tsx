import React, {useEffect, useMemo, useState} from 'react';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';
import {Button, Grid, Paper} from '@mui/material';
import {Body1, H6} from '../../../@softbd/elements/common';
import {useIntl} from 'react-intl';
import {QuestionType} from '../questionsBank/QuestionBanksEnums';
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
import {getTimer} from '../../../@softbd/utilities/helpers';
/*
interface ExamQuestionListProps {
  questions: any;

}*/

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
      title: '[[]]am a [[]] engineer [[]] softbd ',
      title_en: '[[]]am a [[]] engineer  [[]] softbd ',
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
};
const ExamQuestionList = () => {
  const {messages} = useIntl();
  const [isOption1Checked, setIsOption1Checked] = useState<boolean>(false);
  const [isOption2Checked, setIsOption2Checked] = useState<boolean>(false);
  const [isOption3Checked, setIsOption3Checked] = useState<boolean>(false);
  const [isOption4Checked, setIsOption4Checked] = useState<boolean>(false);
  const [timer, setTimer] = useState<string | null>('01:06:39');
  const [submitDisable, setSubmitDisable] = useState<boolean>(false);
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
            setTimer(
              remainingTime.hour +
                ':' +
                remainingTime.min +
                ':' +
                remainingTime.sec,
            );
            if (
              remainingTime.hour < 1 &&
              remainingTime.min < 1 &&
              remainingTime.sec < 1
            ) {
              clearInterval(interval);
              setSubmitDisable(true);
            }
          }, 1000);
        }
      } else {
        setTimer(null);
      }
    }
  }, []);

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
    <Paper sx={{padding: '25px'}}>
      <Grid container spacing={2}>
        <Grid
          item
          display={'flex'}
          alignItems={'center'}
          flexDirection={'column'}
          justifyContent={'center'}
          xs={12}>
          <H6>{examQuestions?.exam_title}</H6>
          <Body1>
            {messages['subject.label']}
            {': '}
            {examQuestions?.exam_subject_title}
          </Body1>
          <Body1>
            {messages['common.date']} {': '}
            {examQuestions?.exam_date}
          </Body1>
        </Grid>

        <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
          <Body1>{messages['common.time_remaining'] + ': ' + timer}</Body1>
          <Body1 sx={{marginLeft: 'auto'}}>
            {messages['common.total_marks']}
            {': '}
            {examQuestions?.total_marks}
          </Body1>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            <Grid container spacing={1}>
              {examQuestions && examQuestions?.questions.length ? (
                examQuestions?.questions.map((question: any, index: number) => {
                  let fillInTheBlankItems: any = [];

                  if (
                    question?.question_type == QuestionType.FILL_IN_THE_BLANK
                  ) {
                    fillInTheBlankItems = question?.title.split('[[]]');
                  }
                  let indexNo = 0;
                  return (
                    <React.Fragment key={question?.id}>
                      {question?.question_type ==
                        QuestionType.FILL_IN_THE_BLANK &&
                      fillInTheBlankItems &&
                      fillInTheBlankItems.length ? (
                        <Grid item xs={12}>
                          <Body1>
                            {index + 1 + '. '}
                            {fillInTheBlankItems.map(
                              (element: any, itemIndex: any) => {
                                if (element == '') {
                                  return (
                                    <>
                                      <CustomTextInput
                                        id={
                                          'answers[' +
                                          index +
                                          '][' +
                                          indexNo++ +
                                          ']'
                                        }
                                        label={''}
                                        register={register}
                                        errorInstance={errors}
                                        isLoading={false}
                                        style={{
                                          display: 'inline-block',
                                          width: '150px',
                                          marginTop: '-8px',
                                        }}
                                      />{' '}
                                    </>
                                  );
                                } else if (
                                  itemIndex !=
                                  fillInTheBlankItems.length - 2
                                ) {
                                  return (
                                    <>
                                      {element}{' '}
                                      <CustomTextInput
                                        id={
                                          'answers[' +
                                          index +
                                          '][' +
                                          indexNo++ +
                                          ']'
                                        }
                                        label={''}
                                        register={register}
                                        errorInstance={errors}
                                        isLoading={false}
                                        style={{
                                          display: 'inline-block',
                                          width: '150px',
                                          marginTop: '-8px',
                                        }}
                                      />{' '}
                                    </>
                                  );
                                } else {
                                  return <>{element}</>;
                                }
                              },
                            )}
                          </Body1>
                        </Grid>
                      ) : (
                        <>
                          <Grid item xs={12}>
                            {index + 1 + '. ' + question?.title}
                          </Grid>
                          <Grid item xs={12}>
                            {question?.question_type == QuestionType.MCQ && (
                              <>
                                <CustomCheckbox
                                  id={'answers[' + index + '][0]'}
                                  label={question?.option_1}
                                  register={register}
                                  errorInstance={errors}
                                  checked={isOption1Checked}
                                  onChange={() => {
                                    setIsOption1Checked((prev) => !prev);
                                  }}
                                  isLoading={false}
                                />
                                <CustomCheckbox
                                  id={'answers[' + index + '][1]'}
                                  label={question?.option_2}
                                  register={register}
                                  errorInstance={errors}
                                  checked={isOption2Checked}
                                  onChange={() => {
                                    setIsOption2Checked((prev: any) => !prev);
                                  }}
                                  isLoading={false}
                                />
                                <CustomCheckbox
                                  id={'answers[' + index + '][2]'}
                                  label={question?.option_3}
                                  register={register}
                                  errorInstance={errors}
                                  checked={isOption3Checked}
                                  onChange={() => {
                                    setIsOption3Checked((prev: any) => !prev);
                                  }}
                                  isLoading={false}
                                />
                                <CustomCheckbox
                                  id={'answers[' + index + '][3]'}
                                  label={question?.option_4}
                                  register={register}
                                  errorInstance={errors}
                                  checked={isOption4Checked}
                                  onChange={() => {
                                    setIsOption4Checked((prev: any) => !prev);
                                  }}
                                  isLoading={false}
                                />{' '}
                              </>
                            )}
                            {question?.question_type == QuestionType.YES_NO && (
                              <FormRadioButtons
                                id={'answers[' + index + ']'}
                                control={control}
                                radios={[
                                  {label: messages['common.yes'], key: 1},
                                  {label: messages['common.no'], key: 2},
                                ]}
                              />
                            )}
                            {(question?.question_type ==
                              QuestionType.PRESENTATION ||
                              question?.question_type ==
                                QuestionType.FIELD_WORK ||
                              question?.question_type ==
                                QuestionType.PRACTICAL) && (
                              <FileUploadComponent
                                id={'answers[' + index + ']'}
                                setValue={setValue}
                                errorInstance={errors}
                                register={register}
                                label={messages['common.file_path']}
                              />
                            )}
                            {question?.question_type ==
                              QuestionType.DESCRIPTIVE && (
                              <CustomTextInput
                                id={'answers[' + index + ']'}
                                label={''}
                                multiline={true}
                                rows={3}
                                register={register}
                                errorInstance={errors}
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
      </Grid>
    </Paper>
  );
};

export default ExamQuestionList;
