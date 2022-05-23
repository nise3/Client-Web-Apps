import {Grid} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useRef} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {useIntl} from 'react-intl';
import DownloadIcon from '@mui/icons-material/Download';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {
  createEnrollmentImport,
  getEnrollmentFileFormat,
} from '../../../services/instituteManagement/EnrollmentExportImportService';

interface CourseEnrollmentPopupProps {
  onClose: () => void;
  userData: any;
  refreshDataTable: () => void;
  courseId: number;
  batchId: number;
}

const CourseEnrollmentPopup: FC<CourseEnrollmentPopupProps> = ({
  refreshDataTable,
  courseId,
  batchId,
  ...props
}) => {
  const {successStack, errorStack} = useNotiStack();
  const {messages} = useIntl();
  const linkRef = useRef<any>();

  const {
    register,
    handleSubmit,
    // errors,
    setError,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm<any>();

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      if (data?.file.length == 0) {
        errorStack(messages['common.file_upload_first']);
        return;
      } else if (
        data?.file[0]?.type !==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        errorStack(messages['common.only_xlsx_file']);
        return;
      }

      let formData = new FormData();
      formData.append('course_id', String(courseId));
      formData.append('batch_id', String(batchId));
      formData.append('course_enrollment_excel_file', data?.file[0]);

      await createEnrollmentImport(formData);
      successStack(messages['common.file_upload_successful']);
      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({error, setError, errorStack});
    }
  };

  const fileUploadHandler = (files: any) => {
    if (
      files[0].type !==
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      errorStack(messages['common.only_xlsx_file']);
      setValue('file', '');
    }
  };
  //return a promise that resolves with a File instance
  const urlToFile = (url: any, filename: any, mimeType: any) => {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, {type: mimeType});
      });
  };

  const fileDownloadHandler = async (courseId: number, batchId: number) => {
    try {
      let response = await getEnrollmentFileFormat(courseId, batchId);
      const fileName =
        'Course_enrollment_format_batch_id_' +
        batchId +
        '_and_course_id_' +
        courseId;
      //Usage example:
      urlToFile(
        response.data,
        fileName,
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ).then(function (file) {
        linkRef.current.href = URL.createObjectURL(file);
        linkRef.current.click();
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <HookFormMuiModal
      open={true}
      {...props}
      title={
        <>
          <DownloadIcon />
          <IntlMessages
            id='common.add_new'
            values={{
              subject: <IntlMessages id='common.import' />,
            }}
          />
        </>
      }
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={false} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={false} />
        </>
      }>
      <a style={{opacity: '0'}} ref={linkRef} download>
        Download link
      </a>
      <Grid container spacing={3} sx={{overflow: 'hidden'}}>
        <Grid item xs={6}>
          <CommonButton
            key={1}
            onClick={() => fileDownloadHandler(courseId, batchId)}
            btnText={'common.download_excel_file'}
            variant={'outlined'}
            color={'primary'}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            required
            id='file'
            name='file'
            label={messages['common.file_upload']}
            register={register}
            type={'file'}
            InputLabelProps={{
              shrink: true,
            }}
            onInput={fileUploadHandler}
            errorInstance={errors}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default CourseEnrollmentPopup;
