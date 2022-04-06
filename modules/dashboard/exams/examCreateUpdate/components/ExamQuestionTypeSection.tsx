import Grid from '@mui/material/Grid';
import CustomTextInput from '../../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomFormSelect from '../../../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import React, {useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import {QuestionSelectionType} from '../../ExamEnums';
import CustomCheckbox from '../../../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';

interface IProps {
  useFrom: any;
  questionType: any;
  index: number;
}

const ExamQuestionTypeSection = ({useFrom, questionType, index}: IProps) => {
  const {messages} = useIntl();

  const [isMcqChecked, setIsMcqChecked] = useState<boolean>(false);

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

  const onChangeQuestionType = (value: any) => {
    console.log('onChangeType=>', value);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <CustomCheckbox
          id={`exam_questions[${index}][question_type]`}
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
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <CustomTextInput
                id={`exam_questions[${index}][number_of_questions]`}
                label={messages['common.number_of_questions']}
                type={'number'}
                register={useFrom.register}
                errorInstance={useFrom.errors}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                id={`exam_questions[${index}][total_marks]`}
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
                id={`exam_questions[${index}][question_selection_type]`}
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
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default ExamQuestionTypeSection;
