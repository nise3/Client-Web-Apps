import {Grid, Typography} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';

interface MemberImportPopupProps {
  onClose: () => void;
  userData: any;
  refreshDataTable: () => void;
}


const MemberImportPopup: FC<MemberImportPopupProps> = ({
  refreshDataTable,
  ...props
}) => {
  // const authUser = useAuthUser();
  const {messages} = useIntl();
  const {
    // control,
    register,
    // reset,
    // getValues,
    handleSubmit,
    // setError,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm<any>();
  const onSubmit: SubmitHandler<any> = async (data: any) => {
    console.log('submit data: ', data);
  };

  return (
    <HookFormMuiModal
      open={true}
      {...props}
      title={
        <>
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
        <Grid item xs={12}>
          <Typography variant={'h6'}>
            {messages['association.association_information']}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant={'h6'}>
            Downlod sample excel file
          </Typography>
          <CommonButton
            key={1}
            onClick={() => console.log('download file')}
            btnText={"Import"}
          />
        </Grid>

        <Grid item xs={12}>
          <FileUploadComponent
            id='logo'
            // defaultFileUrl={userData?.logo}
            errorInstance={errors}
            setValue={setValue}
            register={register}
            label={messages['common.file_path']}
            required={false}
          />
        </Grid>


      </Grid>
    </HookFormMuiModal>
  );
};
export default MemberImportPopup;
