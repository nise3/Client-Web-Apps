import React, {FC, useMemo, useState} from 'react';
import yup from '../../../@softbd/libs/yup';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {Grid, Typography} from '@mui/material';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import TransferListComponent from './TransferListComponent';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {addRPLQuestionsToAssessment} from '../../../services/CertificateAuthorityManagement/AssessmentService';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import IconFAQ from '../../../@softbd/icons/IconFAQ';

interface AddQuestionPopupProps {
  itemId: number;
  assessmentId: number;
  onClose: () => void;
  refreshDataTable: () => void;
}

const AddQuestionPopup: FC<AddQuestionPopupProps> = ({
  itemId,
  assessmentId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {createSuccessMessage} = useSuccessMessage();
  const {errorStack} = useNotiStack();
  const [isQuestionEditFormOpened, setIsQuestionEditFormOpened] =
    useState<boolean>(false);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      assessment_questions: yup
        .array()
        .of(yup.object())
        .min(1, messages['common.must_have_one_question'] as string)
        .label(messages['assessment.addQuestion'] as string),
    });
  }, [messages]);

  const {
    setError,
    handleSubmit,
    control,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  console.log('error: ', errors);
  const getQuestionSet = (questionList: any) => {
    console.log('itemId: ', itemId);
    let questionsFormValues = questionList.map((question: any) => {
      return {
        answer: question.answer,
        assessment_id: assessmentId,
        assessment_question_set_id: itemId,
        option_1: question.option_1,
        option_1_en: question.option_1_en,
        option_2: question.option_2,
        option_2_en: question.option_2_en,
        option_3: question.option_3,
        option_3_en: question.option_3_en,
        option_4: question.option_4,
        option_4_en: question.option_4_en,
        question_id: question.id,
        row_status: 1,
        subject_id: question.subject_id,
        title: question.title,
        title_en: question.title_en,
        type: question.type,
      };
    });

    console.log('questionsFormValues: ', questionsFormValues);
    setValue('assessment_questions', questionsFormValues);
  };

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    if (!isQuestionEditFormOpened) {
      try {
        await addRPLQuestionsToAssessment(data);
        createSuccessMessage('common.question');
        props.onClose();
        refreshDataTable();
      } catch (error: any) {
        processServerSideErrors({
          error,
          validationSchema,
          setError,
          errorStack,
        });
      }
    }
  };

  const onEditPopupOpenClose = (open: boolean) => {
    setIsQuestionEditFormOpened(open);
  };

  return (
    <HookFormMuiModal
      {...props}
      open={true}
      title={
        <>
          <IconFAQ />
          <IntlMessages
            id='common.add_new'
            values={{
              subject: <IntlMessages id='assessment.addQuestion' />,
            }}
          />{' '}
        </>
      }
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} />
          <SubmitButton isSubmitting={isSubmitting} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <TransferListComponent
            assessmentQuestionSetId={itemId}
            getQuestionSet={getQuestionSet}
            onEditPopupOpenClose={onEditPopupOpenClose}
            control={control}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{color: 'red', fontSize: '14px', fontWeight: '500'}}>
            {errors?.assessment_questions?.message ?? null}
          </Typography>
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default AddQuestionPopup;
