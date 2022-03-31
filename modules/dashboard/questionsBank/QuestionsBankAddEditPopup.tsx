import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {useEffect, useMemo, useState} from 'react';
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
import {Grid} from '@mui/material';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import IconQuestion from '../../../@softbd/icons/IconQuestion';
import {QuestionType} from './QuestionBanksEnums';

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
  answers: {
    a: '',
  },
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
    });
  }, [messages]);

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
        question_type: itemData?.option_1,
        option_1: itemData?.option_1,
        option_1_en: itemData?.option_1_en,
        option_2: itemData?.option_2,
        option_2_en: itemData?.option_2_en,
        option_3: itemData?.option_3,
        option_3_en: itemData?.option_3_en,
        option_4: itemData?.option_4,
        option_4_en: itemData?.option_4_en,
        answer: itemData?.answer,
        row_status: itemData?.row_status,
      };

      reset(data);
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onChangeType = (value: any) => {
    console.log('changed=>', value);
  };

  const onSubmit: SubmitHandler<any> = async (data: any) => {
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

        <Grid item xs={12}>
          <FormRadioButtons
            required
            id='question_type'
            label={'question.type'}
            radios={questionTypes}
            control={control}
            defaultValue={initialValues.question_type}
            isLoading={isLoading}
            onChange={onChangeType}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
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

        <Grid item xs={6}>
          <CustomFormSelect
            id='answer'
            label={messages['question.answer']}
            isLoading={isLoading}
            control={control}
            options={[]} //todo: this might be changed after api end decision. currently accepting [].
            optionValueProp='id'
            optionTitleProp={['label']}
            errorInstance={errors}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default QuestionsBankAddEditPopup;
