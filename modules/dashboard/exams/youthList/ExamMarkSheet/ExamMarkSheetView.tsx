import React, {useCallback} from 'react';
import {Button, Grid, Paper} from '@mui/material';
import {Body1, Body2, Link} from '../../../../../@softbd/elements/common';
import {useIntl} from 'react-intl';
import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import FillInTheBlankTypeComponent from './FillInTheBlankTypeComponent';
import MCQTypeComponent from './MCQTypeComponent';
import YesNoTypeComponent from './YesNoTypeComponent';
import FileView from './FileTypeComponent';
import DescriptiveTypeComponent from './DescriptiveTypeComponent';
import NoDataFoundComponent from '../../../../youth/common/NoDataFoundComponent';
import {
  getIntlDateFromString,
  getIntlNumber,
  getIntlTimeFromString,
  question_type,
} from '../../../../../@softbd/utilities/helpers';
import {QuestionType} from '../../../questionsBank/QuestionBanksEnums';
import {useFetchPreviewYouthExam} from '../../../../../services/instituteManagement/hooks';
import {useRouter} from 'next/router';
import QuestionSkeleton from '../../../../youth/examQuestionPaper/QuestionSkeleton';
import {ArrowBack} from '@mui/icons-material';

const StyledPaper = styled(Paper)(({theme}) => ({
  padding: '25px',
}));

const ExamMarkingViewPage = () => {
  const {messages, formatDate, formatTime, formatNumber} = useIntl();
  const router = useRouter();
  let questionIndex = 1;
  let {examId, youthId} = router.query;
  const {data: examSheet, isLoading: isExamLoading} = useFetchPreviewYouthExam(
    Number(examId),
    Number(youthId),
  );

  const getExamTimeDuration = useCallback((duration: any) => {
    let hour = Math.floor(duration / 60);
    let minutes = Math.floor(duration % 60);

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
          />
        );
      default:
        return <FileView question={question} index={questionIndex++} />;
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
            xs={12}
            display={'flex'}
            sx={{float: 'right'}}
            justifyContent={'space-between'}>
            <Body1 sx={{marginLeft: 'auto'}}>
              <Link href={`/exams/youth-list/${examId}/marking/${youthId}`}>
                <Button
                  variant={'outlined'}
                  color={'primary'}
                  sx={{marginRight: '10px'}}>
                  {messages['common.marks_distribution']}
                </Button>
              </Link>
              <Button
                variant={'contained'}
                color={'primary'}
                size={'small'}
                onClick={() => router.back()}>
                <ArrowBack />
                {messages['common.back']}
              </Button>
            </Body1>
          </Grid>
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
              {getIntlDateFromString(formatDate, examSheet?.exam_date)}
            </Body2>
            <Body2>
              {messages['common.time']} {': '}
              {getIntlTimeFromString(formatTime, examSheet?.exam_date)}
            </Body2>
            {/* <Body2>
              {messages['common.total_obtained_marks'] +
                ': ' +
                getIntlNumber(formatNumber, examSheet?.total_marks)}
            </Body2>*/}
          </Grid>

          <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
            <Body2>
              {messages['common.duration'] + ': '}
              {examSheet?.duration
                ? getExamTimeDuration(examSheet?.duration)
                : ''}
            </Body2>
            <Body2>
              {messages['common.total_marks']}
              {': '}
              {getIntlNumber(formatNumber, examSheet?.total_marks)}
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
            <Grid container spacing={2}>
              {examSheet && examSheet?.exam_sections.length ? (
                examSheet?.exam_sections.map((section: any) => {
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
                          {getIntlNumber(formatNumber, section?.total_marks)}
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
          </Grid>
        </Grid>
      )}
    </StyledPaper>
  );
};

export default ExamMarkingViewPage;
