import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {Button, Grid} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import FrontendCustomModal from '../../../@softbd/modals/FrontendCustomModal/FrontendCustomModal';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import React, {useMemo} from 'react';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import yup from '../../../@softbd/libs/yup';
import {useIntl} from 'react-intl';
import {submitExamPaper} from '../../../services/instituteManagement/ExamService';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useAuthUser} from '../../../@crema/utility/AppHooks';

interface IProps {
  onClose: (submitted?: boolean) => void;
  exam: any;
  batchId: any;
}

const UploadExamAnsFilePopup = ({onClose, exam, batchId}: IProps) => {
  const {messages} = useIntl();
  const {submissionSuccessMessage} = useSuccessMessage();
  const {errorStack} = useNotiStack();

  const authUser = useAuthUser();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      // file_path: yup.mixed().required(),
    });
  }, [messages]);

  const {
    register,
    setError,
    setValue,
    handleSubmit,
    watch,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      data.batch_id = batchId;
      data.exam_id = exam.id;
      data.youth_id = authUser?.youthId;

      await submitExamPaper(data);
      submissionSuccessMessage('common.file_upload');
      onClose(true);
    } catch (error: any) {
      console.log('error->', error);
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <FrontendCustomModal
      onClose={() => onClose(false)}
      open={true}
      title={<>{exam.title}</>}
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      actions={
        <>
          <Button
            startIcon={<CancelIcon />}
            variant='outlined'
            onClick={() => onClose(false)}
            color={'warning'}>
            {'Cancel'}
          </Button>
        </>
      }>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <Grid container>
          <Grid item xs={12}>
            <FileUploadComponent
              id={'file_paths'}
              setValue={setValue}
              register={register}
              label={messages['common.file_upload']}
              errorInstance={errors}
              allowMultiple={true}
              acceptedFileTypes={['application/pdf']}
              uploadedUrls={watch('file_paths') ? watch('file_paths') : []}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{textAlign: 'center'}}>
          <Button
            sx={{marginTop: 3}}
            disabled={isSubmitting}
            type={'submit'}
            variant={'contained'}
            color={'primary'}>
            {messages['common.submit']}
          </Button>
        </Grid>
      </form>
    </FrontendCustomModal>
  );
};

export default UploadExamAnsFilePopup;
