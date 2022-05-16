import React, {FC, useEffect, useMemo} from 'react';
import {Grid} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useFetchGuideline} from '../../../services/instituteManagement/hooks';
import {IGuideline} from '../../../shared/Interface/4IR.interface';
import {
  createGuideline,
  updateGuideline,
} from '../../../services/4IRManagement/GuidelineService';
import yup from '../../../@softbd/libs/yup';
import {yupResolver} from '@hookform/resolvers/yup';

interface FourIRGuideLineAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  name: '',
  file_path: '',
  row_status: 1,
};

const FourIRGuideLineAddEditPopup: FC<FourIRGuideLineAddEditPopupProps> = ({
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
    isLoading,
    mutate: mutateGuideline,
  } = useFetchGuideline(itemId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      name: yup
        .string()
        .required()
        .label(messages['common.file_path'] as string),
      file_path: yup
        .string()
        .required()
        .label(messages['common.file_path'] as string),
    });
  }, [messages]);

  const {
    // control,
    register,
    reset,
    setError,
    setValue,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (itemData) {
      reset({
        name: itemData?.name,
        file_path: itemData?.file_path,
        row_status: itemData?.row_status,
      });
    } else reset(initialValues);
  }, [itemData]);

  const onSubmit: SubmitHandler<IGuideline> = async (data: IGuideline) => {
    try {
      if (itemId !== null) {
        await updateGuideline(itemId, data);
        updateSuccessMessage('4ir.guideline');
        mutateGuideline();
      } else {
        await createGuideline(data);
        createSuccessMessage('4ir.guideline');
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
              values={{subject: <IntlMessages id='4ir.guideline' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{
                subject: <IntlMessages id='4ir.guideline' />,
              }}
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
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='name'
            label={messages['menu.guideline_name']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FileUploadComponent
            id='file_path'
            errorInstance={errors}
            defaultFileUrl={itemData?.file_path}
            setValue={setValue}
            register={register}
            sizeLimitText={'3MB'}
            label={messages['common.guideline_upload']}
            required={true}
            acceptedFileTypes={[
              'application/pdf',
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ]}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default FourIRGuideLineAddEditPopup;
