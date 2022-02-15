import {Grid, Link} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {createExcelImport} from '../../../services/IndustryManagement/FileExportImportService';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import DownloadIcon from '@mui/icons-material/Download';
interface MemberImportPopupProps {
  onClose: () => void;
  userData: any;
  refreshDataTable: () => void;
}

const MemberImportPopup: FC<MemberImportPopupProps> = ({
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {
    register,
    handleSubmit,
    // errors,
    setError,
    formState: {isSubmitting},
  } = useForm<any>();
  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      await createExcelImport(data.file[0]);
      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({error, setError, errorStack});
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
      <Grid container spacing={3} sx={{overflow: 'hidden'}}>
        <Grid item xs={6}>
          <Link href='../../../public/template/organization-list.xlsx' download>
            <CommonButton
              key={1}
              onClick={() => console.log('download file')}
              btnText={messages['common.download_excel_file'] as string}
              variant={'outlined'}
              color={'primary'}
            />
          </Link>
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            id='file'
            name='file'
            label={messages['common.file_upload']}
            register={register}
            type={'file'}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {/* <label htmlFor="contained-button-file">
            <Input id={'fileinput'} name={'file'} type="file" />
          </label> */}
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default MemberImportPopup;
