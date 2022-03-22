import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconFAQ from '../../../@softbd/icons/IconFAQ';
import yup from '../../../@softbd/libs/yup';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {
  useFetchQuestionBank,
  useFetchSubjects,
} from '../../../services/CertificateAuthorityManagement/hooks';
import {LEVEL} from '../courses/CourseEnums';
import {AnswerType, OPTIONS, QuestionType} from './QuestionEnums';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import {
  createQuestion,
  updateQuestion,
} from '../../../services/CertificateAuthorityManagement/QuestionBankService';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';

interface RTOQuestionAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title: '',
  title_en: '',
  subject_id: '',
  difficulty_level: '1',
  option_1: '',
  option_2: '',
  option_3: '',
  option_4: '',
  option_1_en: '',
  option_2_en: '',
  option_3_en: '',
  option_4_en: '',
  type: '1',
  answer: '1',
};

const QuestionBankAddEditPopup: FC<RTOQuestionAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const [subjectFilters] = useState({});

  const isEdit = itemId != null;
  const {
    data: itemData,
    isLoading,
    mutate: mutateRTOQuestion,
  } = useFetchQuestionBank(itemId);

  const {data: subjects, isLoading: isFetchingSubjects} =
    useFetchSubjects(subjectFilters);

  const levels = useMemo(
    () => [
      {
        id: LEVEL.BEGINNER,
        label: messages['level.easy'],
      },
      {
        id: LEVEL.INTERMEDIATE,
        label: messages['level.intermediate'],
      },
      {
        id: LEVEL.EXPERT,
        label: messages['level.hard'],
      },
    ],
    [messages],
  );

  const option = useMemo(
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

  const questionTypes = useMemo(
    () => [
      {
        key: QuestionType.MCQ,
        label: messages['question.type.mcq'],
      },
      {
        key: QuestionType.YES_NO,
        label: messages['question.type.y_n'],
      },
    ],
    [messages],
  );

  const answerTypes = useMemo(
    () => [
      {
        key: AnswerType.YES,
        label: messages['answer.type.yes'],
      },
      {
        key: AnswerType.NO,
        label: messages['answer.type.no'],
      },
    ],
    [messages],
  );

  const [isMCQ, setIsMCQ] = useState<boolean>(true);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .trim()
        .required()
        .label(messages['common.question'] as string),
      answer: yup
        .string()
        .trim()
        .required()
        .label(messages['question.answer'] as string),
      subject_id: yup
        .string()
        .required()
        .label(messages['subject.label'] as string),
      option_1: isMCQ
        ? yup
            .string()
            .required()
            .label(messages['option.option1'] as string)
        : yup.string(),
      option_2: isMCQ
        ? yup
            .string()
            .required()
            .label(messages['option.option2'] as string)
        : yup.string(),
      option_3: isMCQ
        ? yup
            .string()
            .required()
            .label(messages['option.option3'] as string)
        : yup.string(),
      option_4: isMCQ
        ? yup
            .string()
            .required()
            .label(messages['option.option4'] as string)
        : yup.string(),
    });
  }, [messages, isMCQ]);

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

  useEffect(() => {
    if (itemData) {
      let data: any = {
        subject_id: itemData?.subject_id,
        title: itemData?.title,
        title_en: itemData?.title_en,
        difficulty_level: itemData?.difficulty_level,
        type: itemData?.type,
        option_1: itemData?.option_1,
        option_1_en: itemData?.option_1_en,
        option_2: itemData?.option_2,
        option_2_en: itemData?.option_2_en,
        option_3: itemData?.option_3,
        option_3_en: itemData?.option_3_en,
        option_4: itemData?.option_4,
        option_4_en: itemData?.option_4_en,
        answer: itemData?.answer,
      };
      setIsMCQ(String(itemData?.type) == QuestionType.MCQ);

      reset(data);
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
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

    try {
      if (itemId) {
        await updateQuestion(itemId, data);
        updateSuccessMessage('question.label');
        mutateRTOQuestion();
      } else {
        await createQuestion(data);
        createSuccessMessage('question.label');
      }
      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  const onChangeType = (value: any) => {
    setIsMCQ(String(value) == QuestionType.MCQ);
  };

  return (
    <HookFormMuiModal
      {...props}
      open={true}
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      title={
        <>
          <IconFAQ />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='question.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='question.label' />}}
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
          <CustomTextInput
            required
            id={'title'}
            label={messages['common.question']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
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
            id='difficulty_level'
            label={messages['question.difficulty_level']}
            isLoading={isLoading}
            control={control}
            options={levels}
            optionValueProp='id'
            optionTitleProp={['label']}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12}>
          <FormRadioButtons
            required
            id='type'
            label={'question.type'}
            radios={questionTypes}
            control={control}
            defaultValue={initialValues.type}
            isLoading={isLoading}
            onChange={onChangeType}
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

        {isMCQ ? (
          <Grid item xs={6}>
            <CustomFormSelect
              required
              id='answer'
              label={messages['question.answer']}
              isLoading={isLoading}
              control={control}
              options={option}
              optionValueProp='id'
              optionTitleProp={['label']}
              errorInstance={errors}
            />
          </Grid>
        ) : (
          <Grid item xs={6}>
            <FormRadioButtons
              required
              id='answer'
              label={'question.answer'}
              radios={answerTypes}
              control={control}
              defaultValue={initialValues.answer}
              isLoading={isLoading}
            />
          </Grid>
        )}
      </Grid>
    </HookFormMuiModal>
  );
};
export default QuestionBankAddEditPopup;
