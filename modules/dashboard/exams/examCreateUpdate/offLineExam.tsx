import {useIntl} from 'react-intl';
import Grid from '@mui/material/Grid';
import CustomTextInput from '../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import Box from '@mui/material/Box';
import React, {Fragment, useCallback, useMemo, useRef, useState} from 'react';
import {TextField} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import DoneIcon from '@mui/icons-material/Done';
import IconButton from '@mui/material/IconButton';
import CustomFormSelect from '../../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {useFetchExamQuestionsBanks} from '../../../../services/instituteManagement/hooks';
import {Body1} from '../../../../@softbd/elements/common';
import ExamQuestionTypeSection from './components/ExamQuestionTypeSection';
import {QuestionType} from '../../questionsBank/QuestionBanksEnums';
import CustomDateTimePicker from '../../../../@softbd/elements/input/CustomDateTimePicker';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {getIntlNumber} from '../../../../@softbd/utilities/helpers';
import {ExamTypes} from '../ExamEnums';

// const initialValues = {
//   start_time: '',
//   end_time: '',
//   venue: '',
//   Total_marks: '',
// };

interface IProps {
  useFrom: any;
  examType: string;
  subjectId: any;
}

const OffLineExam = ({useFrom, examType, subjectId}: IProps) => {
  const {messages, formatNumber} = useIntl();

  const examSetField = useRef<any>();

  const [examSets, setExamSets] = useState<Array<any>>([]);

  const isMixed = examType == ExamTypes.MIXED;

  // const [isMcqChecked, setIsMcqChecked] = useState<boolean>(false);
  // const [isFillInBlanksChecked, setIsFillInBlanksChecked] =
  //   useState<boolean>(false);
  // const [isYNChecked, setIsYNChecked] = useState<boolean>(false);
  // const [isPracticalChecked, setIsPracticalChecked] = useState<boolean>(false);
  // const [isFieldWorkChecked, setIsFieldWorkChecked] = useState<boolean>(false);
  // const [isPresentationChecked, setIsPresentationChecked] =
  //   useState<boolean>(false);
  // const [isDescriptiveChecked, setIsDescriptiveChecked] =
  //   useState<boolean>(false);

  const [questionBankFilters] = useState({});
  const {data: questions, isLoading: isLoadingQuestions} =
    useFetchExamQuestionsBanks(questionBankFilters);

  const onInput = useCallback(() => {
    if (examSetField.current.value <= 5) {
      let arr: any = Array.from(
        Array(Number(examSetField.current.value)).keys(),
      );
      // let arr = [...'0'.repeat(examSetField.current.value).split('').keys()]; //only for experimental purpose

      let array: any = arr.map((item: any, i: any) => {
        return {
          index: i,
          id: `SET##${item}`,
        };
      });
      setExamSets(array);
    }
  }, []);

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
        <legend style={{color: '#0a8fdc'}}>
          {messages['common.off_online']}
        </legend>
        <Grid container spacing={5}>
          {/*Exams*/}
          <Grid item xs={6}>
            <CustomDateTimePicker
              id={isMixed ? `offline[exam_date]` : 'exam_date'}
              label={messages['common.exam_date']}
              register={useFrom.register}
              errorInstance={useFrom.errors}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id={isMixed ? `offline[duration]` : 'duration'}
              type={'number'}
              label={messages['common.duration_min']}
              register={useFrom.register}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id={isMixed ? `offline[venue]` : 'venue'}
              label={messages['common.venue']}
              register={useFrom.register}
              errorInstance={useFrom.errors}
              isLoading={false}
            />
          </Grid>

          {/*for design purpose*/}
          <Grid item xs={6} />

          <Grid item xs={6}>
            <TextField
              inputRef={examSetField}
              fullWidth
              type='number'
              variant='outlined'
              size='small'
              label={messages['common.number_of_sets'] as string}
              defaultValue={1}
              InputProps={{
                inputProps: {
                  max: 5,
                  min: 0,
                },
                endAdornment: (
                  <InputAdornment position='start'>
                    <IconButton edge='end' onClick={onInput}>
                      <DoneIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/*for design purpose*/}
          <Grid item xs={6} />

          {/*Exam Sets*/}
          {examSets?.map((item, i) => {
            const idPrefix = isMixed ? `offline[sets]` : 'sets';
            return (
              <Fragment key={i}>
                <Grid item xs={6}>
                  <CustomTextInput
                    sx={{display: 'none'}}
                    id={`${idPrefix}[${i}][id]`}
                    label={messages['common.set_name']}
                    register={useFrom.register}
                    errorInstance={useFrom.errors}
                    isLoading={false}
                    defaultValue={item.id}
                  />
                  <CustomTextInput
                    id={`${idPrefix}[${i}][title]`}
                    label={
                      (
                        <IntlMessages
                          id='common.set_name'
                          values={{
                            subject: (
                              <IntlMessages
                                id={String(getIntlNumber(formatNumber, i + 1))}
                              />
                            ),
                          }}
                        />
                      ) as unknown as string
                    }
                    register={useFrom.register}
                    errorInstance={useFrom.errors}
                    isLoading={false}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomTextInput
                    id={`${idPrefix}[${i}][title_en]`}
                    label={
                      (
                        <IntlMessages
                          id='common.set_name_en'
                          values={{
                            subject: (
                              <IntlMessages
                                id={String(getIntlNumber(formatNumber, i + 1))}
                              />
                            ),
                          }}
                        />
                      ) as unknown as string
                    }
                    register={useFrom.register}
                    errorInstance={useFrom.errors}
                    isLoading={false}
                  />
                </Grid>
              </Fragment>
            );
          })}

          {/*Exam Sections*/}
          <Grid item xs={12}>
            <Body1 sx={{color: '#0a8fdc'}}>{messages['question.type']}</Body1>
          </Grid>

          {questionTypes.map((questionType, i) => {
            const idPrefix = isMixed
              ? `offline[exam_questions]`
              : 'exam_questions';
            return (
              <Grid key={i} item xs={12}>
                <ExamQuestionTypeSection
                  useFrom={useFrom}
                  questionType={questionType}
                  index={i}
                  idPrefix={idPrefix}
                  subjectId={subjectId}
                  examSets={examSets}
                />
              </Grid>
            );
          })}

          {/*Exam Section Questions*/}
          <Grid item xs={6}>
            <CustomFormSelect
              required={true}
              id={'questions' + '[question_id]'}
              label={messages['common.question']}
              isLoading={isLoadingQuestions}
              control={useFrom.control}
              options={questions}
              optionValueProp={'id'}
              optionTitleProp={['title']}
              errorInstance={useFrom.errors}
              multiple={true}
              defaultValue={[]}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id={'questions' + '[individual_marks]'}
              label={messages['common.individual_marks']}
              type={'number'}
              register={useFrom.register}
              errorInstance={useFrom.errors}
              isLoading={false}
            />
          </Grid>
        </Grid>
      </fieldset>
    </Box>
  );
};

export default OffLineExam;
