import React, {useCallback} from 'react';
import {Button, Grid, InputAdornment, Paper, TextField} from '@mui/material';
import {Body1, Body2, H6, S1} from '../../../../../@softbd/elements/common';
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
import {
  getIntlDateFromString,
  getIntlNumber,
  getIntlTimeFromString,
  question_type,
} from '../../../../../@softbd/utilities/helpers';
import EditIcon from '@mui/icons-material/Edit';
import {useFetchPreviewYouthExam} from '../../../../../services/instituteManagement/hooks';
import QuestionSkeleton from '../../../../youth/examQuestionPaper/QuestionSkeleton';
import {useRouter} from 'next/router';
import {youthExamMarkUpdate} from '../../../../../services/instituteManagement/ExamService';
import useSuccessMessage from '../../../../../@softbd/hooks/useSuccessMessage';
import {ArrowBack} from '@mui/icons-material';

const StyledPaper = styled(Paper)(({theme}) => ({
  padding: '25px',
}));
const ExamMarkingViewPage = () => {
  const {messages, formatNumber, formatDate, formatTime} = useIntl();
  const router = useRouter();
  const {updateSuccessMessage} = useSuccessMessage();
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

  const getExamTimeDuration = useCallback((duration: any) => {
    let hour = Math.floor(duration / 60);
    let minutes = Math.floor(duration % 60);
    console.log('hour, minutes', hour, minutes);
    if (hour > 0) {
      if (minutes > 0) {
        return (
          <>
            {getIntlNumber(formatNumber, hour) +
              ' ' +
              messages['common.hour'] +
              ' ' +
              getIntlNumber(formatNumber, minutes) +
              ' ' +
              messages['common.minute']}
          </>
        );
      } else {
        return (
          <>
            {getIntlNumber(formatNumber, hour) + ' ' + messages['common.hour']}
          </>
        );
      }
    } else {
      return (
        <>
          {getIntlNumber(formatNumber, minutes) +
            ' ' +
            messages['common.minute']}
        </>
      );
    }
  }, []);

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
                defaultValue={getIntlNumber(
                  formatNumber,
                  question?.marks_achieved,
                )}
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
                defaultValue={getIntlNumber(
                  formatNumber,
                  question?.marks_achieved,
                )}
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
        data.marks[index].marks_achieved = isNaN(
          data.marks[index].marks_achieved,
        )
          ? 0
          : Number(data.marks[index].marks_achieved);
      });
    }
    data.exam_id = examId;
    data.youth_id = youthId;

    console.log(' format data', data);
    try {
      await youthExamMarkUpdate(data);
      updateSuccessMessage('common.marks_distribution');
      // mutateExamMark();
    } catch (error: any) {}
  };
  return (
    <StyledPaper>
      {isExamLoading ? (
        <QuestionSkeleton />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} display={'flex'} justifyContent={'flex-end'}>
            <Button
              variant={'contained'}
              color={'primary'}
              size={'small'}
              onClick={() => router.back()}>
              <ArrowBack />
              {messages['common.back']}
            </Button>
          </Grid>
          <Grid
            item
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            xs={12}>
            <H6>{examSheet?.title}</H6>
            <S1 sx={{whiteSpace: 'pre'}}>
              {messages['subject.label']}
              {': '}
              {examSheet?.subject_title}
            </S1>
            <S1 sx={{whiteSpace: 'pre'}}>
              {messages['common.date']} {': '}
              {getIntlDateFromString(formatDate, examSheet?.exam_date)}
            </S1>
            <S1 sx={{whiteSpace: 'pre'}}>
              {messages['common.time']} {': '}
              {getIntlTimeFromString(formatTime, examSheet?.exam_date)}
            </S1>
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              <Grid
                item
                display={'flex'}
                alignItems={'center'}
                whiteSpace={'pre'}>
                <H6>{messages['common.name']}: </H6>
                <Body1>
                  {examSheet?.first_name} {examSheet?.last_name}
                </Body1>
              </Grid>
              <Grid
                item
                ml={4}
                display={'flex'}
                alignItems={'center'}
                whiteSpace={'pre'}>
                <H6>{messages['common.mobile']}: </H6>
                <Body1>{examSheet?.mobile}</Body1>
              </Grid>
              <Grid
                item
                ml={4}
                display={'flex'}
                alignItems={'center'}
                whiteSpace={'pre'}>
                <H6>
                  {messages['common.email']}
                  {': '}
                </H6>
                <Body1>{examSheet?.email}</Body1>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
            <S1 sx={{whiteSpace: 'pre'}}>
              {messages['common.duration'] + ': '}
              {examSheet?.duration
                ? getExamTimeDuration(examSheet?.duration)
                : ''}
            </S1>
            <S1 sx={{whiteSpace: 'pre'}}>
              {messages['common.total_marks']}
              {': '}
              {getIntlNumber(formatNumber, examSheet?.total_marks)}
            </S1>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{borderBottom: 1}} />
          </Grid>
          <Grid item xs={10} />
          <Grid item xs={2}>
            <Body2 sx={{textAlign: 'center'}}>
              {messages['common.obtained_mark']}
            </Body2>
            <Box sx={{borderBottom: 1}} />
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
              <Grid container spacing={2}>
                <Grid item xs={12} />
                {examSheet && examSheet?.exam_sections.length ? (
                  examSheet?.exam_sections.map(
                    (section: any, index: number) => {
                      return (
                        <React.Fragment key={section?.uuid}>
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
                              return (
                                <Grid item xs={12} key={question?.question_id}>
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
                              messageTextType={'h6'}
                            />
                          )}
                        </React.Fragment>
                      );
                    },
                  )
                ) : (
                  <NoDataFoundComponent
                    messageType={messages['common.question']}
                    messageTextType={'h6'}
                  />
                )}
                <Grid item xs={12} display={'flex'} justifyContent={'center'}>
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
