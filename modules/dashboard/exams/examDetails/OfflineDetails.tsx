import {useIntl} from 'react-intl';
import React, {useEffect, useRef, useState} from 'react';
import {ExamTypes, QuestionSelectionType} from '../ExamEnums';
import {QuestionType} from '../../questionsBank/QuestionBanksEnums';
import {Button, Grid, Paper} from '@mui/material';
import DetailsInputView from '../../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {Body1, Body2, H6, Link, S1} from '../../../../@softbd/elements/common';
import {LINK_EXAM_YOUTH_LIST} from '../../../../@softbd/common/appLinks';
import {
  getIntlDateFromString,
  getIntlNumber,
  question_type,
} from '../../../../@softbd/utilities/helpers';
import MCQTypeQuestion from '../../../youth/examQuestionPaper/MCQTypeQuestion';
import FormRadioButtons from '../../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import CustomTextInput from '../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import FileUploadComponent from '../../../filepond/FileUploadComponent';
import NoDataFoundComponent from '../../../youth/common/NoDataFoundComponent';

import {useReactToPrint} from 'react-to-print';
import QuestionTitleHeader from '../../../youth/examQuestionPaper/QuestionTitleHeader';

interface IProps {
  exam: any;
  examData: any;
  examSetUuid: any;
  register: any;
  control: any;
  errors: any;
  setValue: any;
  onChangeOfflineSet: (setUuid: any) => void;
}

const OfflineDetails = ({
  exam,
  examData,
  examSetUuid,
  register,
  control,
  errors,
  setValue,
  onChangeOfflineSet,
}: IProps) => {
  const {messages, formatNumber, formatTime} = useIntl();

  const [filteredSet, setFilteredSet] = useState<any>(null);
  const [uuId, setUuid] = useState<any>([]);

  const componentRef = useRef<any>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  let answerIndex = 0;
  let questionIndex = 1;

  useEffect(() => {
    if (examSetUuid) {
      let filterSet =
        exam.exam_sets &&
        exam.exam_sets.filter((que: any) => que.uuid == examSetUuid);

      setFilteredSet(filterSet[0]);
    }
  }, [exam.exam_sets, examSetUuid]);

  useEffect(() => {
    let uuId = (exam?.exam_sets || []).map((data: any) => {
      return {
        key: data.uuid,
        label: data.title,
      };
    });

    setUuid(uuId);
    console.log('er->', uuId);
  }, [exam?.exam_sets]);

  return (
    <Grid container>
      {ExamTypes.OFFLINE === Number(exam?.type) && (
        <Grid item xs={6}>
          <FormRadioButtons
            id='set'
            label={'common.offline_question_sets'}
            radios={uuId}
            control={control}
            defaultValue={uuId[0] ? uuId[0]?.key : ''}
            isLoading={false}
          />
        </Grid>
      )}
      <Grid item xs={6} display={'flex'} justifyContent={'flex-end'}>
        <Link href={LINK_EXAM_YOUTH_LIST + `${exam?.id}`}>
          <Button variant={'contained'} color={'primary'}>
            {messages['common.examinees']}
          </Button>{' '}
        </Link>
        {examSetUuid && (
          <Button
            variant={'contained'}
            sx={{marginLeft: '10px', maxHeight: '41px'}}
            color={'primary'}
            size='small'
            onClick={() => handlePrint()}>
            {messages['common.print']}
          </Button>
        )}
      </Grid>

      {examSetUuid && (
        <Grid item xs={12}>
          <Paper ref={componentRef} sx={{padding: '20px', border: '1px solid'}}>
            <Grid container spacing={2}>
              <Grid
                item
                display={'flex'}
                alignItems={'center'}
                flexDirection={'column'}
                justifyContent={'center'}
                xs={12}>
                <H6>{examData?.title}</H6>
                <S1>
                  {messages['subject.label']}
                  {': '}
                  {examData?.exam_subject_title}
                </S1>
                <S1 sx={{margin: 'auto'}}>
                  {messages['common.date']} {': '}
                  {getIntlDateFromString(formatTime, exam?.exam_date)}
                </S1>
                <S1 sx={{margin: 'auto'}}>
                  {filteredSet ? filteredSet.title : ''}
                </S1>
              </Grid>
              <Grid
                item
                xs={12}
                display={'flex'}
                justifyContent={'space-between'}>
                <S1 sx={{marginLeft: 'auto'}}>
                  {messages['common.total_marks']}
                  {': '}
                  {getIntlNumber(formatNumber, exam?.total_marks)}
                </S1>
              </Grid>

              <Grid item xs={12}>
                <form autoComplete='off'>
                  <Grid container spacing={2} mb={3}>
                    {exam && exam?.exam_sections.length ? (
                      exam.exam_sections.map((section: any) => {
                        return (
                          <React.Fragment key={section?.uuid}>
                            <Grid item xs={12} display={'flex'}>
                              <Body1
                                sx={{
                                  fontWeight: 'bold',
                                  whiteSpace: 'pre',
                                }}>
                                {messages[
                                  question_type[section?.question_type - 1]
                                    .label
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

                                  let questionHeader = (
                                    <QuestionTitleHeader
                                      index={questionIndex++}
                                      question={question}
                                    />
                                  );
                                  if (
                                    section?.question_type == QuestionType?.MCQ
                                  ) {
                                    return (
                                      <React.Fragment
                                        key={question?.question_id}>
                                        {questionHeader}
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
                                        key={question?.question_id}>
                                        {questionHeader}
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
                                      <React.Fragment
                                        key={question?.question_id}>
                                        {questionHeader}
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
                                      <React.Fragment
                                        key={question?.question_id}>
                                        {questionHeader}
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
                                      <React.Fragment
                                        key={question?.question_id}>
                                        <Grid item xs={11}>
                                          {questionHeader}{' '}
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
                                            disabled={true}
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
      )}
    </Grid>
  );
};

export default OfflineDetails;
