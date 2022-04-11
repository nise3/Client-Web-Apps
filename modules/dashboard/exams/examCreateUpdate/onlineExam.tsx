import Grid from '@mui/material/Grid';
import React, {useMemo} from 'react';
import {useIntl} from 'react-intl';
import Box from '@mui/material/Box';
import CustomTextInput from '../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import ExamQuestionTypeSection from './components/ExamQuestionTypeSection';
import {Body1} from '../../../../@softbd/elements/common';
import {QuestionType} from '../../questionsBank/QuestionBanksEnums';
import CustomDateTimePicker from '../../../../@softbd/elements/input/CustomDateTimePicker';
import {ExamTypes} from '../ExamEnums';

interface IProps {
  useFrom: any;
  examType: string;
  subjectId: any;
}

const OnlineExam = ({useFrom, examType, subjectId}: IProps) => {
  const {messages} = useIntl();

  const isMixed = examType == ExamTypes.MIXED;

  const questionTypes = useMemo(
    () => [
      {
        id: QuestionType.MCQ,
        label: messages['question.type.mcq'],
      },
      {
        id: QuestionType.FILL_IN_THE_BLANK,
        label: messages['common.fill_in_the_blanks'],
      },
      {
        id: QuestionType.YES_NO,
        label: messages['question.type.y_n'],
      },
      {
        id: QuestionType.PRACTICAL,
        label: messages['common.practical'],
      },
      {
        id: QuestionType.FIELD_WORK,
        label: messages['common.field_work'],
      },
      {
        id: QuestionType.PRESENTATION,
        label: messages['common.presentation'],
      },
      {
        id: QuestionType.DESCRIPTIVE,
        label: messages['common.descriptive'],
      },
    ],
    [messages],
  );

  return (
    <Box sx={{marginTop: '10px'}}>
      <fieldset>
        <legend style={{color: '#0a8fdc'}}>{messages['common.online']}</legend>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <CustomDateTimePicker
              id={isMixed ? `online[exam_date]` : 'exam_date'}
              label={messages['common.exam_date']}
              register={useFrom.register}
              errorInstance={useFrom.errors}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id={isMixed ? `online[duration]` : 'duration'}
              type={'number'}
              label={messages['common.duration_min']}
              register={useFrom.register}
            />
          </Grid>

          <Grid item xs={12}>
            <Body1 sx={{color: '#0a8fdc'}}>{messages['question.type']}</Body1>
          </Grid>

          {questionTypes.map((questionType, i) => {
            const idPrefix = isMixed
              ? `online[exam_questions]`
              : 'exam_questions';
            return (
              <Grid key={i} item xs={12}>
                <ExamQuestionTypeSection
                  useFrom={useFrom}
                  questionType={questionType}
                  index={i}
                  idPrefix={idPrefix}
                  subjectId={subjectId}
                />
              </Grid>
            );
          })}
        </Grid>
      </fieldset>
    </Box>
  );
};

export default OnlineExam;
