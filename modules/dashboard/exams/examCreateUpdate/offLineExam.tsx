import {useIntl} from 'react-intl';
import Grid from '@mui/material/Grid';
import CustomDateTimeField from '../../../../@softbd/elements/input/CustomDateTimeField';
import CustomTextInput from '../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomTimePicker from '../../../../@softbd/elements/input/TimePicker';
import Box from '@mui/material/Box';
import React, {Fragment, useCallback, useMemo, useRef, useState} from 'react';
import {TextField} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import DoneIcon from '@mui/icons-material/Done';
import IconButton from '@mui/material/IconButton';
import CustomFormSelect from '../../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {QuestionType} from '../../questionsBank/QuestionBanksEnums';
import {QuestionSelectionType} from '../ExamEnums';
import {useFetchExamQuestionsBanks} from '../../../../services/instituteManagement/hooks';
import CustomFilterableFormSelect from '../../../../@softbd/elements/input/CustomFilterableFormSelect';

// const initialValues = {
//   start_time: '',
//   end_time: '',
//   venue: '',
//   Total_marks: '',
// };

interface IProps {
  useFrom: any;
}

const OffLineExam = ({useFrom}: IProps) => {
  const {messages} = useIntl();

  const examSetField = useRef<any>();

  const [examSets, setExamSets] = useState<Array<any>>([]);

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
        key: QuestionType.MCQ,
        label: messages['question.type.mcq'],
      },
      {
        key: QuestionType.FILL_IN_THE_BLANK,
        label: messages['common.fill_in_the_blanks'],
      },
      {
        key: QuestionType.YES_NO,
        label: messages['question.type.y_n'],
      },
      {
        key: QuestionType.PRACTICAL,
        label: messages['common.practical'],
      },
      {
        key: QuestionType.FIELD_WORK,
        label: messages['common.field_work'],
      },
      {
        key: QuestionType.PRESENTATION,
        label: messages['common.presentation'],
      },
      {
        key: QuestionType.DESCRIPTIVE,
        label: messages['common.descriptive'],
      },
    ],
    [messages],
  );

  const questionSelectionType = useMemo(
    () => [
      {
        key: QuestionSelectionType.FIXED,
        label: messages['common.fixed'],
      },
      {
        key: QuestionSelectionType.RANDOM,
        label: messages['common.random'],
      },
      {
        key: QuestionSelectionType.RANDOM_FROM_QUESTION_BANK,
        label: messages['common.random_from_elect'],
      },
    ],
    [messages],
  );

  const onChangeType = (value: any) => {
    console.log('onChangeType=>', value);
  };

  const onChangeQuestionType = (value: any) => {
    console.log('onChangeType=>', value);
  };

  return (
    <Box sx={{marginTop: '10px'}}>
      <fieldset>
        <legend style={{color: '#0a8fdc'}}>
          {messages['common.off_online']}
        </legend>
        <Grid container spacing={5}>
          {/*Exams*/}
          <Grid item xs={6}>
            <CustomDateTimeField
              id='exam_date'
              label={messages['common.exam_date']}
              register={useFrom.register}
              errorInstance={useFrom.errors}
            />
          </Grid>
          {/*<Grid item xs={6}>*/}
          {/*  <CustomTextInput*/}
          {/*    id={'venue'}*/}
          {/*    label={messages['common.venue']}*/}
          {/*    register={useFrom.register}*/}
          {/*    errorInstance={useFrom.errors}*/}
          {/*    isLoading={false}*/}
          {/*  />*/}
          {/*</Grid>*/}
          <Grid item xs={12} md={6}>
            <CustomTimePicker
              id='start_time'
              label={messages['common.start_time']}
              register={useFrom.register}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomTimePicker
              id='end_time'
              label={messages['common.end_time']}
              register={useFrom.register}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id={'venue'}
              label={messages['common.venue']}
              register={useFrom.register}
              errorInstance={useFrom.errors}
              isLoading={false}
            />
          </Grid>
          {/*<Grid item xs={6}>*/}
          {/*  <CustomTextInput*/}
          {/*    id={'total_marks'}*/}
          {/*    label={messages['common.total_marks']}*/}
          {/*    type={'number'}*/}
          {/*    register={useFrom.register}*/}
          {/*    errorInstance={useFrom.errors}*/}
          {/*    isLoading={false}*/}
          {/*  />*/}
          {/*</Grid>*/}
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
              //not ideal way
              // onKeyDown={(event) => {
              //   if (event.code == 'Enter') onInput();
              // }}
            />
          </Grid>

          {/*for design purpose*/}
          <Grid item xs={6} />

          {/*Exam Sets*/}
          {examSets?.map((item, i) => (
            <Fragment key={i}>
              <Grid item xs={6}>
                <CustomTextInput
                  sx={{display: 'none'}}
                  id={'question_sets' + `[${i}]` + '[id]'}
                  label={messages['common.set_name']}
                  register={useFrom.register}
                  errorInstance={useFrom.errors}
                  isLoading={false}
                  defaultValue={item.id}
                />
                <CustomTextInput
                  id={'title'}
                  label={messages['common.set_name']}
                  register={useFrom.register}
                  errorInstance={useFrom.errors}
                  isLoading={false}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextInput
                  id={'title_en'}
                  label={messages['common.set_name_en']}
                  register={useFrom.register}
                  errorInstance={useFrom.errors}
                  isLoading={false}
                />
              </Grid>
            </Fragment>
          ))}

          {/*Exam Sections*/}
          <Grid item xs={6}>
            <CustomFormSelect
              required
              id='question_type'
              label={messages['question.type']}
              isLoading={false}
              control={useFrom.control}
              errorInstance={useFrom.errors}
              options={questionTypes}
              onChange={onChangeType}
              optionValueProp='key'
              optionTitleProp={['label']}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id={'number_of_questions'}
              label={messages['common.number_of_questions']}
              type={'number'}
              register={useFrom.register}
              errorInstance={useFrom.errors}
              isLoading={false}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id={'total_marks'}
              label={messages['common.total_marks']}
              type={'number'}
              register={useFrom.register}
              errorInstance={useFrom.errors}
              isLoading={false}
            />
          </Grid>

          <Grid item xs={6}>
            <CustomFormSelect
              required
              id='question_selection_type'
              label={messages['common.question_selection_type']}
              isLoading={false}
              control={useFrom.control}
              errorInstance={useFrom.errors}
              options={questionSelectionType}
              onChange={onChangeQuestionType}
              optionValueProp='key'
              optionTitleProp={['label']}
            />
          </Grid>

          {/*Exam Section Questions*/}
          <Grid item xs={6}>
            <CustomFilterableFormSelect
              required
              id={'questions' + '[question_id]'}
              label={messages['common.question']}
              isLoading={isLoadingQuestions}
              control={useFrom.control}
              options={questions}
              optionValueProp={'id'}
              optionTitleProp={['title']}
              errorInstance={useFrom.errors}
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
