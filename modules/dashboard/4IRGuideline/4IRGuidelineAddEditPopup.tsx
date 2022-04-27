import {useEffect} from 'react';
import yup from '../../../@softbd/libs/yup';
import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useMemo} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {useIntl} from 'react-intl';

import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import {
  createTNAReport,
  updateTNAReport,
} from '../../../services/4IRManagement/TNAReportServices';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useFetchGuideline} from '../../../services/instituteManagement/hooks';

interface FourIRGuideLineAddEditPopupProps {
  itemId: number | null;
  fourIRProjectId: number;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  file_path: '',
  guideline_details: '',
};

const FourIRGuideLineAddEditPopup: FC<FourIRGuideLineAddEditPopupProps> = ({
  itemId,
  fourIRProjectId,
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
      file_path: yup.string().label(messages['common.file_path'] as string),
      guideline_details: yup
        .string()
        .label(messages['common.required_skill'] as string),
    });
  }, [messages]);

  const {
    //    control,
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
        file_path: itemData.file_path,
        guideline_details: itemData.filguideline_detailse_path,
      });
    } else reset(initialValues);
  }, [itemData]);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      let payload = {
        four_ir_project_id: fourIRProjectId,
        ...data,
      };

      if (itemId !== null) {
        await updateTNAReport(payload, itemId);
        updateSuccessMessage('4ir.guideline');
        mutateGuideline();
      } else {
        await createTNAReport(payload);
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
          <FileUploadComponent
            id='file_path'
            errorInstance={errors}
            setValue={setValue}
            register={register}
            sizeLimitText={'3MB'}
            label={messages['common.guideline_upload']}
            required={false}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <CustomTextInput
            id='skill_required'
            label={messages['common.write_here']}
            register={register}
            errorInstance={errors}
            multiline
            rows={5}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default FourIRGuideLineAddEditPopup;
