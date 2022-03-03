import {useIntl} from 'react-intl';
import {useFetchQuestionBank} from '../../../services/instituteManagement/hooks';
import React, {useEffect, useMemo} from 'react';
import yup from '../../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import IconProgramme from '../../../@softbd/icons/IconProgramme';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {Grid} from '@mui/material';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import {isBreakPointUp} from '../../../@crema/utility/Utils';

interface IProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  question_id: '',
  question: '',
  subject_name: '',
  topic_name: '',
  difficulty: '',
  marks: '',
};

const QuestionBankAddEditPopup = ({
  itemId,
  refreshDataTable,
  ...props
}: IProps) => {
  const {messages} = useIntl();
  const isEdit = itemId != null;

  const {data: itemData, isLoading} = useFetchQuestionBank(itemId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      question_id: yup
        .string()
        .title()
        .required()
        .label(messages['common.question_id'] as string),
      question: yup
        .string()
        .required()
        .label(messages['common.question'] as string),
    });
  }, [messages]);

  const {
    register,
    reset,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        question_id: itemData?.question_id,
        question: itemData?.question,
        subject_name: itemData?.subject_name,
        topic_name: itemData?.topic_name,
        difficulty: itemData?.difficulty,
        marks: itemData?.marks,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    console.log('data->', data);
    props.onClose();
  };

  return (
    <>
      <HookFormMuiModal
        open={true}
        {...props}
        title={
          <>
            <IconProgramme />
            {isEdit ? (
              <IntlMessages
                id='common.edit'
                values={{subject: <IntlMessages id='common.question_bank' />}}
              />
            ) : (
              <IntlMessages
                id='common.add_new'
                values={{subject: <IntlMessages id='common.question_bank' />}}
              />
            )}
          </>
        }
        maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
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
              id='question_id'
              label={messages['common.question_id']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              required
              id='question'
              label={messages['common.question']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id='subject_name'
              label={messages['common.subject_name']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id='topic_name'
              label={messages['common.topic_name']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id='difficulty'
              label={messages['common.difficulty']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
              multiline={true}
              rows={3}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id='marks'
              label={messages['common.marks']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
              multiline={true}
              rows={3}
            />
          </Grid>
        </Grid>
      </HookFormMuiModal>
    </>
  );
};

export default QuestionBankAddEditPopup;
