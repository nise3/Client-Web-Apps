import yup from '../../../@softbd/libs/yup';
import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useMemo, useEffect} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import {useFetch4IRCBLM} from '../../../services/4IRManagement/hooks';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {
  createCBLM,
  updateCBLM,
} from '../../../services/4IRManagement/CBLMServices';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';

interface CBLMAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  file_path: '',
};

const FourIRTNAReportAddEditPopup: FC<CBLMAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const isEdit = itemId != null;
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const {
    data: itemData,
    // isLoading,
    mutate: mutateCBLM,
  } = useFetch4IRCBLM(itemId);
  const validationSchema = useMemo(() => {
    return yup.object().shape({
      file_path: yup.string().label(messages['common.file_path'] as string),
    });
  }, [messages]);

  const {
    control,
    register,
    reset,
    setError,
    setValue,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });
  useEffect(() => {
    if (itemData) {
      reset({
        file_path: itemData?.file_path,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      if (itemId) {
        await updateCBLM(itemId, data);
        updateSuccessMessage('4ir_CBLM.label');
        mutateCBLM();
      } else {
        await createCBLM(data);
        createSuccessMessage('4ir_CBLM.label');
      }
      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };
  return (
    <HookFormMuiModal
      open={true}
      {...props}
      title={
        <>
          <IconBranch />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='4ir.CBLM' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{
                subject: <IntlMessages id='4ir.CBLM' />,
              }}
            />
          )}
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
      <Grid container spacing={5} sx={{height: '350px'}}>
        <Grid item xs={12} sx={{height: '50%'}} alignSelf='center'>
          <FileUploadComponent
            id='file_path'
            defaultFileUrl={itemData?.file_name}
            errorInstance={errors}
            setValue={setValue}
            register={register}
            sizeLimitText={'3MB'}
            label={messages['common.file_upload']}
            required={false}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default FourIRTNAReportAddEditPopup;
