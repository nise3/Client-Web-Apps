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
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {
  createInitiativeExcelImport,
  getInitiativeFileFormat,
} from '../../../services/4IRManagement/InitiativeService';

const ERRORS: any = {
  32000: 'yup_validation_integer',
  62000: 'yup_validation_exist',
  50000: 'yup_validation_required_field',
  46000: 'yup_validation_number',
  47000: 'yup_validation_password',
  49000: 'yup_validation_regex',
  22000: 'yup_validation_email',
  39003: 'yup_validation_text_length',
  42003: 'yup_validation_digit_length',
  3000: 'yup_validation_date',
  30000: 'yup_validation_invalid_row_status',
  100000: 'yup_validation_invalid_start_date',
  200000: 'yup_validation_invalid_end_date',
  9000: 'invalid_start_date',
};

interface InitiativeImportPopupProps {
  onClose: () => void;
  userData: any;
  fourIRTaglineId: number;
  refreshDataTable: () => void;
}

const InitiativeImportPopup: FC<InitiativeImportPopupProps> = ({
  refreshDataTable,
  fourIRTaglineId,
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
      formData.append('four_ir_tagline_id', String(fourIRTaglineId));
      formData.append('file', data?.file[0]);

      await createInitiativeExcelImport(formData);
      successStack(messages['common.file_upload_successful']);
      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      console.log('Server Errors is :');

      Object.keys(error?.response?.data?.errors).map((err) => {
        const errMsg = error?.response?.data?.errors?.[err][0];

        const match = errMsg?.match(/\[([0-9]+)]$/i);
        console.log(error);
        console.log('Error msg is :', errMsg);

        if (match && match[1] && ERRORS[match[1]]) {
          var r = /\d+/;
          // var s = 'you can enter maximum 500 choices 8823';
          console.log('regx result is : ', errMsg.match(r)[0]);

          console.log(messages[ERRORS[match[1]]]);
        }

        errorStack(err);
      });

      //  processServerSideErrors({error, setError, errorStack});
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

  const fileDownloadHandler = async () => {
    try {
      let response = await getInitiativeFileFormat();
      const fileName = 'four_ir_tagline_id' + fourIRTaglineId;
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
            onClick={() => fileDownloadHandler()}
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
export default InitiativeImportPopup;
