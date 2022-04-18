import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import React, {useEffect, useMemo, useState} from 'react';
import {
  useFetchExamQuestionsBank,
  useFetchSubjects,
} from '../../../services/instituteManagement/hooks';
import yup from '../../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {
  createQuestionsBank,
  updateQuestionsBank,
} from '../../../services/instituteManagement/QuestionsBankService';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {Box, Grid} from '@mui/material';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import IconQuestion from '../../../@softbd/icons/IconQuestion';
import {OPTIONS, QuestionType} from './QuestionBanksEnums';
import {AnswerType} from '../rplQuestionBanks/QuestionEnums';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';

interface IProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title: '',
  title_en: '',
  subject_id: '',
  question_type: '',
  option_1: '',
  option_1_en: '',
  option_2: '',
  option_2_en: '',
  option_3: '',
  option_3_en: '',
  option_4: '',
  option_4_en: '',
  answers: [],
  row_status: '1',
};

const QuestionsBankAddEditPopup = ({
  itemId,
  refreshDataTable,
  ...props
}: IProps) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const isEdit = itemId != null;

  const [subjectFilters] = useState({});
  const [isMCQ, setIsMCQ] = useState<boolean>(false);
  const [isYesNo, setIsYesNo] = useState<boolean>(false);
  const [isFillInBlank, setIsFillInBlank] = useState<boolean>(false);

  const {
    data: itemData,
    isLoading,
    mutate: mutateQuestionBank,
  } = useFetchExamQuestionsBank(itemId);

  const {data: subjects, isLoading: isFetchingSubjects} =
    useFetchSubjects(subjectFilters);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .trim()
        .required()
        .label(messages['common.question'] as string),
      subject_id: yup
        .string()
        .required()
        .label(messages['subject.label'] as string),
      question_type: yup
        .string()
        .required()
        .label(messages['common.question_type'] as string),
      option_1: isMCQ
        ? yup
            .string()
            .required()
            .label(messages['option.option1'] as string)
        : yup.string().nullable(),
      option_2: isMCQ
        ? yup
            .string()
            .required()
            .label(messages['option.option2'] as string)
        : yup.string().nullable(),
      option_3: isMCQ
        ? yup
            .string()
            .required()
            .label(messages['option.option3'] as string)
        : yup.string().nullable(),
      option_4: isMCQ
        ? yup
            .string()
            .required()
            .label(messages['option.option4'] as string)
        : yup.string().nullable(),
      answers: isMCQ
        ? yup
            .array()
            .of(yup.mixed())
            .min(1)
            .label(messages['question.answer'] as string)
        : isYesNo
        ? yup
            .string()
            .required()
            .label(messages['option.answer'] as string)
        : yup.mixed(),
    });
  }, [messages, isMCQ, isYesNo]);

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

  const answerOptions = useMemo(
    () => [
      {
        id: OPTIONS.OPTION_1,
        label: messages['option.option1'],
      },
      {
        id: OPTIONS.OPTION_2,
        label: messages['option.option2'],
      },
      {
        id: OPTIONS.OPTION_3,
        label: messages['option.option3'],
      },
      {
        id: OPTIONS.OPTION_4,
        label: messages['option.option4'],
      },
    ],
    [messages],
  );

  const yesNoOption = useMemo(
    () => [
      {
        id: AnswerType.YES,
        label: messages['answer.type.yes'],
      },
      {
        id: AnswerType.NO,
        label: messages['answer.type.no'],
      },
    ],
    [messages],
  );

  const {
    register,
    control,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  // console.log('getValues->', getValues());

  useEffect(() => {
    if (itemData) {
      let data: any = {
        subject_id: itemData?.subject_id,
        title: itemData?.title,
        title_en: itemData?.title_en,
        question_type: itemData?.question_type,
        option_1: itemData?.option_1,
        option_1_en: itemData?.option_1_en,
        option_2: itemData?.option_2,
        option_2_en: itemData?.option_2_en,
        option_3: itemData?.option_3,
        option_3_en: itemData?.option_3_en,
        option_4: itemData?.option_4,
        option_4_en: itemData?.option_4_en,
        answers:
          itemData?.question_type == QuestionType.YES_NO && itemData?.answers
            ? itemData?.answers[0]
            : itemData?.answers,
        row_status: itemData?.row_status,
      };
      setIsMCQ(String(itemData?.question_type) == QuestionType.MCQ);
      setIsFillInBlank(
        String(itemData?.question_type) == QuestionType.FILL_IN_THE_BLANK,
      );
      setIsYesNo(String(itemData?.question_type) == QuestionType.YES_NO);

      reset(data);
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onChangeType = (value: any) => {
    setIsMCQ(String(value) == QuestionType.MCQ);
    setIsFillInBlank(String(value) == QuestionType.FILL_IN_THE_BLANK);
    setIsYesNo(String(value) == QuestionType.YES_NO);
  };

  useEffect(() => {
    if (itemData && itemData.question_type == QuestionType.MCQ) {
      setIsMCQ(String(itemData.question_type) == QuestionType.MCQ);
    }
    if (itemData && itemData.question_type == QuestionType.FILL_IN_THE_BLANK) {
      setIsFillInBlank(
        String(itemData.question_type) == QuestionType.FILL_IN_THE_BLANK,
      );
    }
    if (itemData && itemData.question_type == QuestionType.YES_NO) {
      setIsYesNo(String(itemData.question_type) == QuestionType.YES_NO);
    }
  }, [itemData]);

  // console.log('errors->', errors);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    // console.log('data->', data);

    if (!isMCQ) {
      data.option_1 = '';
      data.option_1_en = '';
      data.option_2 = '';
      data.option_2_en = '';
      data.option_3 = '';
      data.option_3_en = '';
      data.option_4 = '';
      data.option_4_en = '';
    }

    if (!isEdit && !isMCQ && !isYesNo) {
      data.answers = [];
    }

    if (isYesNo && data.answers) {
      data.answers = [String(data.answers)];
    }

    if (isMCQ && data.answers) {
      data.answers = data?.answers.map((ans: any) => String(ans));
    }

    try {
      if (itemId) {
        await updateQuestionsBank(itemId, data);
        updateSuccessMessage('question-bank.label');
        mutateQuestionBank();
      } else {
        await createQuestionsBank(data);
        createSuccessMessage('question-bank.label');
      }
      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <HookFormMuiModal
      {...props}
      open={true}
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      title={
        <>
          <IconQuestion />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='question-bank.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='question-bank.label' />}}
            />
          )}
        </>
      }
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <CustomFilterableFormSelect
            required
            id={'subject_id'}
            label={messages['subject.label']}
            isLoading={isFetchingSubjects}
            control={control}
            options={subjects}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomFormSelect
            required
            id='question_type'
            label={messages['question.type']}
            isLoading={false}
            control={control}
            options={questionTypes}
            optionValueProp='key'
            optionTitleProp={['label']}
            errorInstance={errors}
            onChange={onChangeType}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            required
            id={'title'}
            label={messages['common.question']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
          {isFillInBlank && (
            <Box
              sx={{fontStyle: 'italic', fontWeight: 'bold', marginTop: '6px'}}>
              Ex: This is [[fill in the blank]] question.(Ans will be in [[]],
              and it will be blank in question.)
            </Box>
          )}
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id={'title_en'}
            label={messages['common.question_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        {isMCQ && (
          <>
            <Grid item xs={6}>
              <CustomTextInput
                required
                id={'option_1'}
                label={messages['option.option1']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                id={'option_1_en'}
                label={messages['option.option1_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                required
                id={'option_2'}
                label={messages['option.option2']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                id={'option_2_en'}
                label={messages['option.option2_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                required
                id={'option_3'}
                label={messages['option.option3']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                id={'option_3_en'}
                label={messages['option.option3_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                required
                id={'option_4'}
                label={messages['option.option4']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                id={'option_4_en'}
                label={messages['option.option4_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
          </>
        )}

        {(isMCQ || isYesNo) && (
          <Grid item xs={6}>
            <CustomFormSelect
              id='answers'
              required={true}
              label={messages['question.answer']}
              isLoading={false}
              control={control}
              options={isMCQ ? answerOptions : yesNoOption}
              optionValueProp={'id'}
              optionTitleProp={['label']}
              errorInstance={errors}
              multiple={isMCQ}
              defaultValue={initialValues.answers}
            />
          </Grid>
        )}
        <Grid item xs={6}>
          <FormRowStatus
            id='row_status'
            control={control}
            defaultValue={initialValues.row_status}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default QuestionsBankAddEditPopup;
