import {Button, Grid, Paper} from '@mui/material';
import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import IconExam from '../../../../@softbd/icons/IconExam';
import {ExamTypes} from '../ExamEnums';
import {useFetchExam} from '../../../../services/instituteManagement/hooks';
import {ExamPurposeNames} from '../../../../@softbd/utilities/ExamPurposeNames';
import PageBlock from '../../../../@softbd/utilities/PageBlock';
import {ArrowBack} from '@mui/icons-material';
import CustomTextInput from '../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {Body1, Body2, H6} from '../../../../@softbd/elements/common';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import moment from 'moment';
import {QuestionType} from '../../questionsBank/QuestionBanksEnums';
import FormRadioButtons from '../../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import FileUploadComponent from '../../../filepond/FileUploadComponent';
import NoDataFoundComponent from '../../../youth/common/NoDataFoundComponent';
import QuestionSkeleton from '../../../youth/examQuestionPaper/QuestionSkeleton';
import {question_type} from '../../../../@softbd/utilities/helpers';
import HiddenInput from '../../../youth/examQuestionPaper/HiddenInput';
import QuestionTitleHeader from '../../../youth/examQuestionPaper/QuestionTitleHeader';
import MCQTypeQuestion from '../../../youth/examQuestionPaper/MCQTypeQuestion';

const ExamDetailsPage = () => {
  const {messages} = useIntl();

  const router = useRouter();

  const itemId = router.query.id;

  let answerIndex = 0;
  let questionIndex = 1;

  const [examParams] = useState<any>({
    purpose_name: ExamPurposeNames.BATCH,
  });
  const {data: examData, isLoading: isLoadingExam} = useFetchExam(
    itemId,
    examParams,
  );

  // const isOnline = (ExamTypes.ONLINE) === examData?.type;
  // const isOffline = ExamTypes.OFFLINE === examData?.type;
  // const isMixed = (ExamTypes.MIXED) === examData?.type;

  const examType = (data: any) => {
    console.log('data->', data);
    switch (data) {
      case ExamTypes.ONLINE:
        return messages['common.online'];
      case ExamTypes.OFFLINE:
        return messages['common.offline'];
      case ExamTypes.MIXED:
        return messages['common.mixed'];
      default:
        return '';
    }
  };

  const {
    register,
    control,
    setValue,
    formState: {errors},
  } = useForm<any>();

  return (
    <>
      <PageBlock
        title={
          <>
            <IconExam />
            {messages['exam.label']}
          </>
        }
        extra={[
          <Button
            key={1}
            variant={'contained'}
            color={'primary'}
            size={'small'}
            onClick={() => router.back()}>
            <ArrowBack />
            {messages['common.back']}
          </Button>,
        ]}>
        <Paper sx={{padding: '25px'}}>
          <Grid container spacing={2}>
            {isLoadingExam ? (
              <QuestionSkeleton />
            ) : (
              <>
                <Grid
                  item
                  display={'flex'}
                  alignItems={'center'}
                  flexDirection={'column'}
                  justifyContent={'center'}
                  xs={12}>
                  <H6>{examData?.title}</H6>
                  <Body1>
                    {messages['subject.label']}
                    {': '}
                    {examData?.exam_subject_title}
                  </Body1>
                </Grid>

                {examData &&
                  examData.exams &&
                  examData.exams.map((exam: any) => (
                    <>
                      <Grid
                        item
                        xs={12}
                        display={'flex'}
                        justifyContent={'space-between'}>
                        <Body1 sx={{margin: 'auto'}}>
                          {examType(exam?.type)}
                        </Body1>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        display={'flex'}
                        justifyContent={'space-between'}>
                        <Body1 sx={{margin: 'auto'}}>
                          {messages['common.date']} {': '}
                          {moment(exam?.exam_date).format('DD-MM-YYYY hh:mm a')}
                        </Body1>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        display={'flex'}
                        justifyContent={'space-between'}>
                        <Body1 sx={{marginLeft: 'auto'}}>
                          {messages['common.total_marks']}
                          {': '}
                          {Number(exam?.total_marks)?.toFixed(0)}
                        </Body1>
                      </Grid>
                      {/*todo: radio button will implemented here*/}
                      {/*{isOffline && (
                        <Grid item xs={12}>
                          <Grid container spacing={2}>
                            {(exam?.exam_sets || []).map(
                              (set: any, i: number) => (
                                <Grid
                                  key={i}
                                  item
                                  xs={2}
                                  sx={{marginLeft: 'auto'}}>
                                  {set.title}
                                </Grid>
                              ),
                            )}
                          </Grid>
                        </Grid>
                      )}*/}
                      <Grid item xs={12}>
                        <form autoComplete='off'>
                          <Grid container spacing={1}>
                            {exam && exam?.exam_sections.length ? (
                              exam.exam_sections.map((section: any) => {
                                return (
                                  <React.Fragment key={section?.id}>
                                    <Grid item xs={12} display={'flex'}>
                                      <Body1
                                        sx={{
                                          fontWeight: 'bold',
                                          whiteSpace: 'pre',
                                        }}>
                                        {messages[
                                          question_type[
                                            section?.question_type - 1
                                          ].label
                                        ] +
                                          ' | ' +
                                          messages['common.total_marks'] +
                                          ': '}
                                      </Body1>
                                      <Body2 sx={{marginTop: '3px'}}>
                                        {Number(section?.total_marks)?.toFixed(
                                          0,
                                        )}
                                      </Body2>
                                    </Grid>
                                    {section?.questions &&
                                    section?.questions.length ? (
                                      section?.questions.map(
                                        (question: any) => {
                                          let ansIndex = answerIndex++;
                                          let hiddenFields = (
                                            <HiddenInput
                                              register={register}
                                              index={ansIndex}
                                              section={section}
                                              question={question}
                                            />
                                          );
                                          let questionHeader = (
                                            <QuestionTitleHeader
                                              index={questionIndex++}
                                              question={question}
                                            />
                                          );
                                          if (
                                            section?.question_type ==
                                            QuestionType?.MCQ
                                          ) {
                                            return (
                                              <React.Fragment
                                                key={question?.id}>
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
                                            section?.question_type ==
                                            QuestionType.YES_NO
                                          ) {
                                            return (
                                              <React.Fragment
                                                key={question?.id}>
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
                                                        label:
                                                          messages[
                                                            'common.yes'
                                                          ],
                                                        key: 1,
                                                      },
                                                      {
                                                        label:
                                                          messages['common.no'],
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
                                              <React.Fragment
                                                key={question?.id}>
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
                                            let fillInTheBlankItems =
                                              question?.title.split(
                                                /(?=\[\[\]\])|(?<=\[\[\]\])/g,
                                              );
                                            let indexNo = 0;
                                            return (
                                              <React.Fragment
                                                key={question?.id}>
                                                <Grid
                                                  item
                                                  xs={12}
                                                  display={'flex'}>
                                                  <Body2>
                                                    {ansIndex + '. '}
                                                  </Body2>
                                                  {fillInTheBlankItems.map(
                                                    (item: any) => {
                                                      if (item == '[[]]') {
                                                        return (
                                                          <CustomTextInput
                                                            id={`questions[${ansIndex}].answers[${indexNo++}]`}
                                                            label={''}
                                                            register={register}
                                                            errorInstance={
                                                              errors
                                                            }
                                                            isLoading={false}
                                                            style={{
                                                              display:
                                                                'inline-block',
                                                              width: '150px',
                                                              marginTop: '-8px',
                                                            }}
                                                          />
                                                        );
                                                      } else {
                                                        return (
                                                          <Body2
                                                            sx={{
                                                              whiteSpace: 'pre',
                                                            }}>
                                                            {item}
                                                          </Body2>
                                                        );
                                                      }
                                                    },
                                                  )}
                                                  {hiddenFields}
                                                </Grid>
                                              </React.Fragment>
                                            );
                                          } else {
                                            return (
                                              <React.Fragment>
                                                {questionHeader}
                                                {hiddenFields}
                                                <Grid item xs={11}>
                                                  {' '}
                                                  <FileUploadComponent
                                                    id={
                                                      'questions[' +
                                                      ansIndex +
                                                      '].file_path'
                                                    }
                                                    setValue={setValue}
                                                    errorInstance={errors}
                                                    register={register}
                                                    label={
                                                      messages[
                                                        'common.file_path'
                                                      ]
                                                    }
                                                  />
                                                </Grid>
                                              </React.Fragment>
                                            );
                                          }
                                        },
                                      )
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
                        </form>
                      </Grid>
                    </>
                  ))}
              </>
            )}
          </Grid>
        </Paper>
      </PageBlock>
    </>
  );
};

export default ExamDetailsPage;
