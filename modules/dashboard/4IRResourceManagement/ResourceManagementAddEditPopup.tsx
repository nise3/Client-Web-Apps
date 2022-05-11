import yup from '../../../@softbd/libs/yup';
import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconSkill from '../../../@softbd/icons/IconSkill';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import {useFetchFourIRResource} from '../../../services/4IRManagement/hooks';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import {IResource} from '../../../shared/Interface/4IR.interface';
import {
  createFourIRResource,
  updateFourIRResource,
} from '../../../services/4IRManagement/ResourceManagementService';
import SuccessPopup from '../../../@softbd/modals/SuccessPopUp/SuccessPopUp';

interface FourIRRMAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
  fourIRInitiativeId: number;
}

const initialValues = {
  approval_status: '0',
  budget_approval_status: '0',
  given_budget: '',
  row_status: '1',
};

const ResourceManagementAddEditPopup: FC<FourIRRMAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  fourIRInitiativeId,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const isEdit = itemId != null;
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const [showSuccessPopUp, setShowSuccessPopUp] = useState<boolean>(false);
  const {
    data: itemData,
    isLoading,
    mutate: mutateResource,
  } = useFetchFourIRResource(itemId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      approval_status: yup
        .number()
        .required()
        .label(messages['4ir_rm.approval_status'] as string),
      budget_approval_status: yup
        .number()
        .required()
        .label(messages['4ir_rm.budget_approval_status'] as string),
      given_budget: yup
        .number()
        .required()
        .label(messages['4ir_rm.given_budget'] as string),
      row_status: yup.string(),
    });
  }, [messages]);

  const {
    register,
    control,
    reset,
    setError,
    handleSubmit,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm<IResource>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        approval_status: itemData?.approval_status,
        budget_approval_status: itemData?.budget_approval_status,
        given_budget: itemData?.given_budget,
        row_status: itemData?.row_status,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const closeAction = async () => {
    props.onClose();
    refreshDataTable();
  };

  const onSubmit: SubmitHandler<IResource> = async (data: IResource) => {
    try {
      let payload = {
        four_ir_initiative_id: fourIRInitiativeId,
        ...data,
      };
      if (itemId) {
        await updateFourIRResource(itemId, payload);
        updateSuccessMessage('4ir_rm.resource');
        mutateResource();
        await closeAction();
      } else {
        await createFourIRResource(payload);
        createSuccessMessage('4ir_rm.resource');
        setShowSuccessPopUp(true);
        await closeAction();
      }
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
          <IconSkill />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='4ir_rm.resource' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='4ir_rm.resource' />}}
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
        <Grid item xs={6}>
          <FormRadioButtons
            required
            id={'approval_status'}
            label={'4ir_rm.approval_status'}
            radios={[
              {
                label: messages['common.yes'],
                key: 1,
              },
              {
                label: messages['common.no'],
                key: 0,
              },
            ]}
            defaultValue={initialValues.approval_status}
            control={control}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <FormRadioButtons
            required
            id={'budget_approval_status'}
            label={'4ir_rm.budget_approval_status'}
            radios={[
              {
                label: messages['common.yes'],
                key: 1,
              },
              {
                label: messages['common.no'],
                key: 0,
              },
            ]}
            defaultValue={initialValues.budget_approval_status}
            control={control}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            required
            id='given_budget'
            label={messages['4ir_rm.given_budget']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <FileUploadComponent
            id='file_path'
            //defaultFileUrl={authUser?.profile_pic}
            errorInstance={errors}
            setValue={setValue}
            register={register}
            label={messages['common.attachment']}
            required={false}
            acceptedFileTypes={['image/*']}
          />
        </Grid>
        <Grid item xs={12}>
          <FormRowStatus
            id='row_status'
            control={control}
            defaultValue={initialValues.row_status}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
      {showSuccessPopUp && fourIRInitiativeId && (
        <SuccessPopup
          closeAction={closeAction}
          stepNo={7}
          initiativeId={fourIRInitiativeId}
          completionStep={7}
          formStep={9}
        />
      )}
    </HookFormMuiModal>
  );
};
export default ResourceManagementAddEditPopup;
