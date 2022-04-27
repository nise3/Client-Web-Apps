import {Button, Grid, Paper} from '@mui/material';
import DetailsInputView from '../../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import {ExamTypes, QuestionSelectionType} from '../ExamEnums';
import {QuestionType} from '../../questionsBank/QuestionBanksEnums';
import {Body1, Body2, H6, Link} from '../../../../@softbd/elements/common';
import {LINK_EXAM_YOUTH_LIST} from '../../../../@softbd/common/appLinks';
import {
  getIntlDateFromString,
  getIntlNumber,
  question_type,
} from '../../../../@softbd/utilities/helpers';
import React from 'react';
import HiddenInput from '../../../youth/examQuestionPaper/HiddenInput';
import QuestionTitleHeader from '../../../youth/examQuestionPaper/QuestionTitleHeader';
import MCQTypeQuestion from '../../../youth/examQuestionPaper/MCQTypeQuestion';
import FormRadioButtons from '../../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import CustomTextInput from '../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import FileUploadComponent from '../../../filepond/FileUploadComponent';
import NoDataFoundComponent from '../../../youth/common/NoDataFoundComponent';

interface IProps {
  exam: any;
  examData: any;
  examType: any;
  examSetUuid: any;
  register: any;
  control: any;
  errors: any;
  setValue: any;
}

const OnlineDetails = ({
  exam,
  examData,
  examType,
  examSetUuid,
  register,
  control,
  errors,
  setValue,
}: IProps) => {
  const {messages, formatNumber, formatTime} = useIntl();

  let answerIndex = 0;
  let questionIndex = 1;

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        display={'flex'}
        sx={{float: 'right'}}
        justifyContent={'space-between'}>
        <Body1 sx={{marginLeft: 'auto'}}>
          <Link href={LINK_EXAM_YOUTH_LIST + `${exam?.id}`}>
            <Button variant={'contained'} color={'primary'}>
              {messages['common.examinees']}
            </Button>{' '}
          </Link>
        </Body1>
      </Grid>
      <Grid item>
        <Paper sx={{padding: '20px', marginBottom: '20px'}}>
          <Grid container spacing={2}>
            <Grid
              item
              display={'flex'}
              alignItems={'center'}
              flexDirection={'column'}
              justifyContent={'center'}
              xs={10}>
              <H6>{examData?.title}</H6>
              <Body1>
                {messages['subject.label']}
                {': '}
                {examData?.exam_subject_title}
              </Body1>
            </Grid>
            <Grid
              item
              xs={10}
              display={'flex'}
              justifyContent={'space-between'}>
              <Body1 sx={{margin: 'auto'}}>
                {messages['common.date']} {': '}
                {getIntlDateFromString(formatTime, exam?.exam_date)}
              </Body1>
            </Grid>
            <Grid
              item
              xs={10}
              display={'flex'}
              justifyContent={'space-between'}>
              <Body1 sx={{margin: 'auto'}}>{examType(exam?.type)}</Body1>
            </Grid>
            <Grid
              item
              xs={12}
              display={'flex'}
              justifyContent={'space-between'}>
              <Body1 sx={{marginLeft: 'auto'}}>
                {messages['common.total_marks']}
                {': '}
                {getIntlNumber(formatNumber, exam?.total_marks)}
              </Body1>
            </Grid>

            <Grid item xs={12}>
              <form autoComplete='off'>
                <Grid container spacing={2} mb={3}>
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
                            (section?.questions)
                              .filter(
                                (que: any) =>
                                  Number(exam.type) === ExamTypes.ONLINE ||
                                  que.exam_set_uuid == examSetUuid,
                              )
                              .map((question: any, i: number) => {
                                let ansIndex = answerIndex++;
                                let hiddenFields = (
                                  <HiddenInput
                                    register={register}
                                    index={ansIndex}
                                    section={section}
                                    question={question}
                                    key={i}
                                  />
                                );
                                let questionHeader = (
                                  <QuestionTitleHeader
                                    index={questionIndex++}
                                    question={question}
                                    key={i}
                                  />
                                );
                                if (
                                  section?.question_type == QuestionType?.MCQ
                                ) {
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
                                        <DetailsInputView
                                          label={''}
                                          isLoading={false}
                                          value={''}
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
                                    <React.Fragment key={question?.id}>
                                      <Grid item xs={11} display={'flex'}>
                                        <Body2
                                          sx={{
                                            fontWeight: 'bold',
                                          }}>
                                          {getIntlNumber(
                                            formatNumber,
                                            --questionIndex,
                                          )}
                                          {'.'}
                                        </Body2>
                                        {fillInTheBlankItems.map(
                                          (item: any, i: number) => {
                                            if (item == '[[]]') {
                                              return (
                                                <CustomTextInput
                                                  key={i}
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
                                                <Body2
                                                  key={i}
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
                                          label={messages['common.file_path']}
                                        />
                                      </Grid>
                                    </React.Fragment>
                                  );
                                }
                              })
                          ) : section?.questions &&
                            String(section.question_selection_type) ===
                              QuestionSelectionType.RANDOM ? (
                            <Grid item>
                              <NoDataFoundComponent
                                message={
                                  messages['common.random_question'] as string
                                }
                                messageTextType={'body1'}
                                sx={{
                                  justifyContent: 'start',
                                }}
                              />
                            </Grid>
                          ) : (
                            <Grid item>
                              <NoDataFoundComponent
                                messageType={
                                  messages['common.question'] as string
                                }
                                messageTextType={'body1'}
                                sx={{
                                  justifyContent: 'start',
                                }}
                              />
                            </Grid>
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
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default OnlineDetails;
