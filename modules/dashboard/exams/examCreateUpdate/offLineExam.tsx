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

  /*  const questionSelectionType = useMemo(
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
  );*/

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
              id='exam_date'
              label={messages['common.exam_date']}
              register={useFrom.register}
              errorInstance={useFrom.errors}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id='duration'
              type={'number'}
              label={messages['common.duration_min']}
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
          <Grid item xs={12}>
            <Body1 sx={{color: '#0a8fdc'}}>{messages['question.type']}</Body1>
          </Grid>

          {questionTypes.map((questionType, i) => (
            <Grid key={i} item xs={12}>
              <ExamQuestionTypeSection
                useFrom={useFrom}
                questionType={questionType}
                index={i}
              />
            </Grid>
          ))}

          {/*Todo: question_type key will not be like this
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <CustomCheckbox
                  id={'exam_questions' + '[question_type]' + '[1]'}
                  label={messages['question.type.mcq']}
                  register={useFrom.register}
                  errorInstance={useFrom.errors}
                  checked={isMcqChecked}
                  onChange={() => {
                    setIsMcqChecked((prev) => !prev);
                  }}
                  isLoading={false}
                />
              </Grid>
              {isMcqChecked && (
                <Grid item xs={9}>
                  <ExamQuestionTypeSection useFrom={useFrom} />
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <CustomCheckbox
                  id={'exam_questions' + '[question_type]' + '[2]'}
                  label={messages['common.fill_in_the_blanks']}
                  register={useFrom.register}
                  errorInstance={useFrom.errors}
                  checked={isFillInBlanksChecked}
                  onChange={() => {
                    setIsFillInBlanksChecked((prev) => !prev);
                  }}
                  isLoading={false}
                />
              </Grid>
              {isFillInBlanksChecked && (
                <Grid item xs={9}>
                  <ExamQuestionTypeSection useFrom={useFrom} />
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <CustomCheckbox
                  id={'exam_questions' + '[question_type]' + '[3]'}
                  label={messages['question.type.y_n']}
                  register={useFrom.register}
                  errorInstance={useFrom.errors}
                  checked={isYNChecked}
                  onChange={() => {
                    setIsYNChecked((prev) => !prev);
                  }}
                  isLoading={false}
                />
              </Grid>
              {isYNChecked && (
                <Grid item xs={9}>
                  <ExamQuestionTypeSection useFrom={useFrom} />
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <CustomCheckbox
                  id={'exam_questions' + '[question_type]' + '[4]'}
                  label={messages['common.practical']}
                  register={useFrom.register}
                  errorInstance={useFrom.errors}
                  checked={isPracticalChecked}
                  onChange={() => {
                    setIsPracticalChecked((prev) => !prev);
                  }}
                  isLoading={false}
                />
              </Grid>
              {isPracticalChecked && (
                <Grid item xs={9}>
                  <ExamQuestionTypeSection useFrom={useFrom} />
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <CustomCheckbox
                  id={'exam_questions' + '[question_type]' + '[5]'}
                  label={messages['common.field_work']}
                  register={useFrom.register}
                  errorInstance={useFrom.errors}
                  checked={isFieldWorkChecked}
                  onChange={() => {
                    setIsFieldWorkChecked((prev) => !prev);
                  }}
                  isLoading={false}
                />
              </Grid>
              {isFieldWorkChecked && (
                <Grid item xs={9}>
                  <ExamQuestionTypeSection useFrom={useFrom} />
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <CustomCheckbox
                  id={'exam_questions' + '[question_type]' + '[6]'}
                  label={messages['common.presentation']}
                  register={useFrom.register}
                  errorInstance={useFrom.errors}
                  checked={isPresentationChecked}
                  onChange={() => {
                    setIsPresentationChecked((prev) => !prev);
                  }}
                  isLoading={false}
                />
              </Grid>
              {isPresentationChecked && (
                <Grid item xs={9}>
                  <ExamQuestionTypeSection useFrom={useFrom} />
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <CustomCheckbox
                  id={'exam_questions' + '[question_type]' + '[7]'}
                  label={messages['common.descriptive']}
                  register={useFrom.register}
                  errorInstance={useFrom.errors}
                  checked={isDescriptiveChecked}
                  onChange={() => {
                    setIsDescriptiveChecked((prev) => !prev);
                  }}
                  isLoading={false}
                />
              </Grid>
              {isDescriptiveChecked && (
                <Grid item xs={9}>
                  <ExamQuestionTypeSection useFrom={useFrom} />
                </Grid>
              )}
            </Grid>
          </Grid>*/}

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
