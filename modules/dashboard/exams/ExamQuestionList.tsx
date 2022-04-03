import React, {useState} from 'react';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';
import {Grid} from '@mui/material';
import {H4, S1} from '../../../@softbd/elements/common';
import {useIntl} from 'react-intl';
import {QuestionType} from '../questionsBank/QuestionBanksEnums';
import CustomCheckbox from '../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';
import {useForm} from 'react-hook-form';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
/*
interface ExamQuestionListProps {
  questions: any;

}*/

const examQuestions = {
  id: 1,
  exam_title: 'Yearly Exam',
  answers: [],
  exam_subject_title: 'Subject',
  exam_subject_title_en: 'Subject',
  questions: [
    {
      id: 1,
      title: 'Is this question?',
      title_en: 'Is this question?',
      option_1: 'a',
      option_1_en: 'a',
      option_2: 'b',
      option_2_en: 'b',
      option_3: 'c',
      option_3_en: 'c',
      option_4: 'd',
      option_4_en: 'd',
      question_type: 1,
    },
    {
      id: 1,
      title: 'Is this question?',
      title_en: 'Is this question?',
      question_type: 3,
    },
  ],
  exam_date: '10/12/22',
  total_marks: 100,
};
const ExamQuestionList = () => {
  const {messages} = useIntl();
  const [isOption1Checked, setIsOption1Checked] = useState<boolean>(false);
  const [isOption2Checked, setIsOption2Checked] = useState<boolean>(false);
  const [isOption3Checked, setIsOption3Checked] = useState<boolean>(false);
  const [isOption4Checked, setIsOption4Checked] = useState<boolean>(false);

  const {
    register,
    control,
    setValue,
    // setError,
    // handleSubmit,
    formState: {errors},
  } = useForm<any>();
  return (
    <Grid container spacing={1}>
      <Grid item display={'flex'} justifyContent={'center'} xs={12}>
        <H4>{examQuestions?.exam_title}</H4>
      </Grid>
      <Grid item display={'flex'} justifyContent={'center'} xs={12}>
        <S1>
          {messages['subject.label']}
          {': '}
          {examQuestions?.exam_subject_title}
        </S1>
      </Grid>
      <Grid item display={'flex'} justifyContent={'center'} xs={12}>
        <S1>
          {messages['common.date']} {': '}
          {examQuestions?.exam_date}
        </S1>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            Time rem
          </Grid>
          <Grid item xs={6}>
            {messages['common.total_marks']}
            {':'}
            {examQuestions?.total_marks}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <form>
          <Grid container>
            {examQuestions && examQuestions?.questions.length ? (
              examQuestions?.questions.map((question: any, index: number) => {
                return (
                  <React.Fragment key={question?.id}>
                    {question?.question_type ==
                    QuestionType.FILL_IN_THE_BLANK ? (
                      <></>
                    ) : (
                      <>
                        <Grid item xs={12}>
                          {index + 1}
                          {'. '}
                          {question?.title}
                        </Grid>
                        <Grid item xs={12}>
                          {question?.question_type == QuestionType.MCQ && (
                            <>
                              <CustomCheckbox
                                id={'answers[' + index + '][0]'}
                                label={question?.option_1}
                                register={register}
                                errorInstance={errors}
                                checked={isOption1Checked}
                                onChange={() => {
                                  setIsOption1Checked((prev) => !prev);
                                }}
                                isLoading={false}
                              />
                              <CustomCheckbox
                                id={'answers[' + index + '][1]'}
                                label={question?.option_2}
                                register={register}
                                errorInstance={errors}
                                checked={isOption2Checked}
                                onChange={() => {
                                  setIsOption2Checked((prev: any) => !prev);
                                }}
                                isLoading={false}
                              />
                              <CustomCheckbox
                                id={'answers[' + index + '][2]'}
                                label={question?.option_3}
                                register={register}
                                errorInstance={errors}
                                checked={isOption3Checked}
                                onChange={() => {
                                  setIsOption3Checked((prev: any) => !prev);
                                }}
                                isLoading={false}
                              />
                              <CustomCheckbox
                                id={'answers[' + index + '][3]'}
                                label={question?.option_4}
                                register={register}
                                errorInstance={errors}
                                checked={isOption4Checked}
                                onChange={() => {
                                  setIsOption4Checked((prev: any) => !prev);
                                }}
                                isLoading={false}
                              />{' '}
                            </>
                          )}
                          {question?.question_type == QuestionType.YES_NO && (
                            <FormRadioButtons
                              id={'answers[' + index + ']'}
                              control={control}
                              radios={[
                                {label: messages['common.yes'], key: 1},
                                {label: messages['common.no'], key: 2},
                              ]}
                            />
                          )}
                          {(question?.question_type ==
                            QuestionType.PRESENTATION ||
                            question?.question_type ==
                              QuestionType.FIELD_WORK) && (
                            <FileUploadComponent
                              id={'answers[' + index + ']'}
                              setValue={setValue}
                              errorInstance={errors}
                              register={register}
                              label={messages['common.image_path']}
                              required={true}
                            />
                          )}
                          {question?.question_type ==
                            QuestionType.DESCRIPTIVE && (
                            <CustomTextInput
                              id='title'
                              label={messages['common.title']}
                              register={register}
                              errorInstance={errors}
                              isLoading={false}
                            />
                          )}
                        </Grid>
                      </>
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
  );
};

export default ExamQuestionList;
