import Grid from '@mui/material/Grid';
import CustomTextInput from '../../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomFormSelect from '../../../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import React, {useCallback, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import {QuestionSelectionType} from '../../ExamEnums';
import CustomCheckbox from '../../../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';
import QuestionSetPopup from './questionSetPopup/QuestionSetPopup';
import IntlMessages from '../../../../../@crema/utility/IntlMessages';
import AddButton from '../../../../../@softbd/elements/button/AddButton/AddButton';

interface IProps {
  useFrom: any;
  questionType: any;
  index: number;
  idPrefix?: any;
  subjectId?: any;
  examSets?: any;
}

const ExamQuestionTypeSection = ({
  useFrom,
  questionType,
  index,
  idPrefix,
  subjectId,
  examSets,
}: IProps) => {
  const {messages} = useIntl();

  console.log('examSets->', examSets);

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [selectedSelectionType, setSelectedSelectionType] = useState<any>(null);

  const [isOpenAddQuestionModal, setIsAddQuestionAssignModal] =
    useState<boolean>(false);
  const [questionTypeId, setQuestionTypeId] = useState<any>('');

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

  const onChangeQuestionSelectionType = (type: any) => {
    setSelectedSelectionType(type ? type : null);
  };

  const openAddQuestionModal = useCallback(() => {
    setIsAddQuestionAssignModal(true);
  }, []);

  const closeAddQuestionModal = useCallback(() => {
    setIsAddQuestionAssignModal(false);
    setQuestionTypeId('');
  }, []);

  const onQuestionsSubmitted = (questions: any) => {
    console.log('questions', questions);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <CustomCheckbox
          id={`${idPrefix}[${index}][is_question_checked]`}
          label={questionType.label}
          register={useFrom.register}
          errorInstance={useFrom.errors}
          checked={isChecked}
          onChange={() => {
            setIsChecked((prev) => !prev);
            setQuestionTypeId(questionType.id); //todo: question type if for filter questions
          }}
          isLoading={false}
        />
      </Grid>
      <Grid item xs={3} sx={{display: 'none'}}>
        <CustomTextInput
          id={`${idPrefix}[${index}][question_type]`}
          label={questionType.label}
          register={useFrom.register}
          errorInstance={useFrom.errors}
          defaultValue={questionType.id}
          isLoading={false}
        />
      </Grid>
      {isChecked && (
        <Grid item xs={9}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <CustomTextInput
                id={`${idPrefix}[${index}][number_of_questions]`}
                label={messages['common.number_of_questions']}
                type={'number'}
                register={useFrom.register}
                errorInstance={useFrom.errors}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={3}>
              <CustomTextInput
                id={`${idPrefix}[${index}][total_marks]`}
                label={messages['common.total_marks']}
                type={'number'}
                register={useFrom.register}
                errorInstance={useFrom.errors}
                isLoading={false}
              />
            </Grid>

            <Grid item xs={3}>
              <CustomFormSelect
                required
                id={`${idPrefix}[${index}][question_selection_type]`}
                label={messages['common.question_selection_type']}
                isLoading={false}
                control={useFrom.control}
                errorInstance={useFrom.errors}
                options={questionSelectionType}
                onChange={onChangeQuestionSelectionType}
                optionValueProp='key'
                optionTitleProp={['label']}
              />
            </Grid>

            {selectedSelectionType &&
            selectedSelectionType != QuestionSelectionType.RANDOM &&
            examSets &&
            examSets.length > 0 ? (
              examSets.map((examSet: any) => (
                <Grid key={examSet.index} item xs={1}>
                  <AddButton
                    key={1}
                    onClick={() => openAddQuestionModal()}
                    isLoading={false}
                    tooltip={
                      <IntlMessages
                        id={'common.add_new'}
                        values={{
                          subject: messages['question_set.label'],
                        }}
                      />
                    }
                  />
                </Grid>
              ))
            ) : selectedSelectionType &&
              selectedSelectionType != QuestionSelectionType.RANDOM ? (
              <Grid item xs={1}>
                <AddButton
                  onClick={() => openAddQuestionModal()}
                  isLoading={false}
                  tooltip={
                    <IntlMessages
                      id={'common.add_new'}
                      values={{
                        subject: messages['question_set.label'],
                      }}
                    />
                  }
                />
              </Grid>
            ) : (
              <></>
            )}
          </Grid>

          {isOpenAddQuestionModal && (
            <QuestionSetPopup
              key={1}
              onClose={closeAddQuestionModal}
              questionType={questionTypeId}
              subjectId={subjectId}
              onQuestionsSubmitted={onQuestionsSubmitted}
            />
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default ExamQuestionTypeSection;
