import React, {FC, useMemo} from 'react';
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
import IconOccupation from '../../../@softbd/icons/IconOccupation';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import TransferListComponent from './TransferListComponent';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {addQuestionsToAssessment} from '../../../services/CertificateAuthorityManagement/AssessmentService';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';

interface AssignBatchPopup {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const AssignBatchPopup: FC<AssignBatchPopup> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {createSuccessMessage} = useSuccessMessage();
  const {errorStack} = useNotiStack();

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
    // control,
    setError,
    handleSubmit,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const getQuestionSet = (questionList: any) => {
    questionList.forEach((question: any) => {
      question.assessment_id = itemId;
      question.question_id = question?.id;
    });
    setValue('assessment_questions', questionList);
  };

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      await addQuestionsToAssessment(data);
      createSuccessMessage('common.question');
      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({error, validationSchema, setError, errorStack});
    }
  };

  return (
    <HookFormMuiModal
      {...props}
      open={true}
      title={
        <>
          <IconOccupation />
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
          <TransferListComponent getQuestionSet={getQuestionSet} />
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

export default AssignBatchPopup;
