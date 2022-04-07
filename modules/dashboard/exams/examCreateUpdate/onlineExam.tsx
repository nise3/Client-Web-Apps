import Grid from '@mui/material/Grid';
import React, {useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import Box from '@mui/material/Box';
import CustomTextInput from '../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomFormSelect from '../../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {useFetchExamQuestionsBanks} from '../../../../services/instituteManagement/hooks';
import ExamQuestionTypeSection from './components/ExamQuestionTypeSection';
import {Body1} from '../../../../@softbd/elements/common';
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

const OnlineExam = ({useFrom}: IProps) => {
  const {messages} = useIntl();

  const [questionBankFilters] = useState({});
  const {data: questions, isLoading: isLoadingQuestions} =
    useFetchExamQuestionsBanks(questionBankFilters);

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

          {/*Exam Sections*/}
          {/*<Grid item xs={6}>*/}
          {/*  <CustomFormSelect*/}
          {/*    required*/}
          {/*    id={'exam_questions' + '[question_type]'}*/}
          {/*    label={messages['question.type']}*/}
          {/*    isLoading={false}*/}
          {/*    control={useFrom.control}*/}
          {/*    errorInstance={useFrom.errors}*/}
          {/*    options={questionTypes}*/}
          {/*    onChange={onChangeType}*/}
          {/*    optionValueProp='key'*/}
          {/*    optionTitleProp={['label']}*/}
          {/*  />*/}
          {/*</Grid>*/}

          <Grid item xs={12}>
            <Body1 sx={{color: '#0a8fdc'}}>{messages['question.type']}</Body1>
          </Grid>

          {/*Todo: question_type key will not be like this*/}

          {questionTypes.map((questionType, i) => (
            <Grid key={i} item xs={12}>
              <ExamQuestionTypeSection
                useFrom={useFrom}
                questionType={questionType}
                index={i}
              />
            </Grid>
          ))}
          {/*<Grid item xs={12}>
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

export default OnlineExam;
