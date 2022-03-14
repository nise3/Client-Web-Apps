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
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {
  AnswerType,
  OPTIONS,
  QuestionType,
} from '../questionBanks/QuestionEnums';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';

interface RTOQuestionAddEditPopupProps {
  itemData: any;
  onClose: () => void;
  getEditedQuestion: (data: any) => void;
}

const QuestionEdit: FC<RTOQuestionAddEditPopupProps> = ({
  itemData,
  getEditedQuestion,
  ...props
}) => {
  const {messages} = useIntl();
  const {updateSuccessMessage} = useSuccessMessage();

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
        .label(messages['common.title'] as string),
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
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    let data: any = {
      subject_id: itemData?.subject_id,
      title: itemData?.title,
      title_en: itemData?.title_en,
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
      assessment_id: itemData?.assessment_id,
      question_id: itemData?.id,
      id: itemData?.id,
      row_status: 1,
    };

    setIsMCQ(String(itemData?.type) == QuestionType.MCQ);

    reset(data);
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

    getEditedQuestion(data);
    updateSuccessMessage('question.label');
    props.onClose();
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
          <IntlMessages
            id='common.add_new'
            values={{subject: <IntlMessages id='question.label' />}}
          />
        </>
      }
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} />
          <SubmitButton isSubmitting={isSubmitting} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <CustomTextInput
            required
            id={'title'}
            label={messages['common.title']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id={'title_en'}
            label={messages['common.title_en']}
            register={register}
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
            defaultValue={itemData?.type}
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
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                id={'option_1_en'}
                label={messages['option.option1_en']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                required
                id={'option_2'}
                label={messages['option.option2']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                id={'option_2_en'}
                label={messages['option.option2_en']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                required
                id={'option_3'}
                label={messages['option.option3']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                id={'option_3_en'}
                label={messages['option.option3_en']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                required
                id={'option_4'}
                label={messages['option.option4']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                id={'option_4_en'}
                label={messages['option.option4_en']}
                register={register}
                errorInstance={errors}
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
              control={control}
              options={option}
              optionValueProp='id'
              optionTitleProp={['label']}
              errorInstance={errors}
              isLoading={false}
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
              defaultValue={itemData?.answer}
            />
          </Grid>
        )}
      </Grid>
    </HookFormMuiModal>
  );
};
export default QuestionEdit;
