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
  is_developed_financial_proposal: '0',
  approve_by: '',
  total_amount: '',
  row_status: '1',
  file_path: '',
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
  const [isDevelopedFinancialProposal, setIsDevelopedFinancialProposal] =
    useState<boolean>(false);
  const {
    data: itemData,
    isLoading,
    mutate: mutateResource,
  } = useFetchFourIRResource(itemId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      is_developed_financial_proposal: yup
        .number()
        .required()
        .label(messages['4ir_rm.is_developed_financial_proposal'] as string),
      approve_by: isDevelopedFinancialProposal
        ? yup
            .string()
            .required()
            .label(messages['4ir_cs.approved_by'] as string)
        : yup.string().nullable(),
      total_amount: isDevelopedFinancialProposal
        ? yup
            .number()
            .required()
            .label(messages['4ir_rm.given_budget'] as string)
        : yup.string(),
      file_path: isDevelopedFinancialProposal
        ? yup
            .string()
            .required()
            .label(messages['common.word_or_pdf_file'] as string)
        : yup.string().nullable(),
      comment: yup
        .string()
        .required()
        .label(messages['common.comment'] as string),
    });
  }, [messages, isDevelopedFinancialProposal]);

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
        is_developed_financial_proposal:
          itemData?.is_developed_financial_proposal,
        approve_by: itemData?.approve_by,
        total_amount: itemData?.total_amount,
        file_path: itemData?.file_path,
        comment: itemData?.comment,
        row_status: itemData?.row_status,
      });

      setIsDevelopedFinancialProposal(
        itemData?.is_developed_financial_proposal,
      );
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
        <Grid item xs={12}>
          <FormRadioButtons
            required
            id={'is_developed_financial_proposal'}
            label={'4ir_rm.is_developed_financial_proposal'}
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
            defaultValue={initialValues?.is_developed_financial_proposal}
            control={control}
            errorInstance={errors}
            onChange={() =>
              setIsDevelopedFinancialProposal((prevState) => !prevState)
            }
          />
        </Grid>
        {isDevelopedFinancialProposal && (
          <>
            <Grid item xs={6}>
              <CustomTextInput
                required
                id='approve_by'
                label={messages['4ir_cs.approved_by']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                required
                id='total_amount'
                label={messages['4ir_rm.given_budget']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={6}>
              <FileUploadComponent
                id='file_path'
                defaultFileUrl={itemData?.file_path}
                errorInstance={errors}
                setValue={setValue}
                register={register}
                label={messages['common.word_or_pdf_file']}
                required={true}
                acceptedFileTypes={[
                  'application/pdf',
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                ]}
                sizeLimitText={'3MB'}
              />
            </Grid>
            <Grid item xs={6}></Grid>
          </>
        )}
        <Grid item xs={12}>
          <CustomTextInput
            required
            id='comment'
            label={messages['common.comment']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={4}
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
