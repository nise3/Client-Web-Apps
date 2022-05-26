import yup from '../../../@softbd/libs/yup';
import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {useFetch4IRScaleUp} from '../../../services/4IRManagement/hooks';
import {IScaleUp} from '../../../shared/Interface/4IR.interface';
import {
  createScaleUp,
  updateScaleUp,
} from '../../../services/4IRManagement/ScaleUpService';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import CustomCheckbox from '../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';
import FileUploadComponent from '../../filepond/FileUploadComponent';

interface ScaleUpAddEditPopupProps {
  itemId: number | null;
  fourIRInitiativeId: number;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  project_name: '',
  project_name_en: '',
  budget: '0',
  timeline_start_year: '',
  timeline_end_year: '',
  start_date: '',
  end_date: '',
  beneficiary_target: '',
  number_of_beneficiary: '',
  implement_area: '',
  approval_status: '0',
  approve_by: '',
  documents_approval_status: '0',
  file_path: '',
};

const FourIRScaleUpAddEditPopUp: FC<ScaleUpAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  fourIRInitiativeId,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const isEdit = itemId != null;
  const [isNumberOfBeneficiaries, setIsNumberOfBeneficiaries] =
    useState<boolean>(false);
  const [isApprovalStatus, setIsApprovalStatus] = useState<boolean>(false);
  const [isDocumentApproved, setIsDocumentApproved] = useState<boolean>(false);
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const {
    data: itemData,
    isLoading,
    mutate: mutateProject,
  } = useFetch4IRScaleUp(itemId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      project_name: yup
        .string()
        .title()
        .required()
        .label(messages['project.name'] as string),
      project_name_en: yup
        .string()
        .label(messages['project.name_en'] as string)
        .nullable(),
      budget: yup
        .number()
        .min(1, messages['common.budget_reuired'] as string)
        .required()
        .label(messages['initiative.budget'] as string),
      timeline_start_year: yup
        .string()
        .required()
        .label(messages['common.start_year'] as string),
      timeline_end_year: yup
        .string()
        .required()
        .label(messages['common.end_year'] as string),
      start_date: yup
        .string()
        .required()
        .label(messages['common.start_date'] as string),
      end_date: yup
        .string()
        .required()
        .label(messages['common.end_date'] as string),
      beneficiary_target: yup
        .string()
        .required()
        .label(messages['4ir.scaleup_beneficiary_target'] as string),
      number_of_beneficiary: yup
        .string()
        .label(messages['4ir.scaleup_number_of_beneficiary'] as string),
      implement_area: yup
        .string()
        .required()
        .label(messages['4ir.scaleup_implement_area'] as string),
      approval_status: yup
        .string()
        .label(messages['common.approval_status'] as string),
      approve_by: isApprovalStatus
        ? yup
            .string()
            .required()
            .label(messages['4ir_cs.approved_by'] as string)
        : yup.string().label(messages['4ir_cs.approved_by'] as string),
      documents_approval_status: yup
        .string()
        .label(messages['4ir.scaleup_document_approved_by'] as string),
      file_path: yup
        .string()
        .required()
        .label(messages['common.file_path'] as string),
    });
  }, [messages, isApprovalStatus]);

  const {
    //control,
    register,
    reset,
    setError,
    setValue,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<IScaleUp>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    console.log('itemData :', itemData);

    if (Number(itemData?.number_of_beneficiary)) {
      setIsNumberOfBeneficiaries(true);
    }

    if (Number(itemData?.documents_approval_status)) {
      setIsDocumentApproved(true);
    }

    if (Number(itemData?.approval_status)) {
      setIsApprovalStatus(true);
    }

    if (itemData) {
      reset({
        ...initialValues,
        ...itemData,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);
  const onSubmit: SubmitHandler<IScaleUp> = async (data: IScaleUp) => {
    try {
      data['four_ir_initiative_id'] = fourIRInitiativeId;
      data['approval_status'] = isApprovalStatus ? '1' : '0';
      data['number_of_beneficiary'] = isNumberOfBeneficiaries ? '1' : '0';
      data['approve_by'] = data['approve_by'] ?? '';
      data['documents_approval_status'] = isDocumentApproved ? '1' : '0';

      if (itemId) {
        await updateScaleUp(itemId, data);
        updateSuccessMessage('4ir_scaleUp.label');
        mutateProject();
      } else {
        await createScaleUp(data);
        createSuccessMessage('4ir_scaleUp.label');
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
              values={{subject: <IntlMessages id='4ir.scale_up' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{
                subject: <IntlMessages id='4ir.scale_up' />,
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
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='project_name'
            label={messages['project.name']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='project_name_en'
            label={messages['project.name_en']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='budget'
            type={'number'}
            label={messages['initiative.budget']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='timeline_start_year'
            type={'number'}
            label={messages['common.start_year']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='timeline_end_year'
            type={'number'}
            label={messages['common.end_year']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomDateTimeField
            required
            id='start_date'
            label={messages['common.start_date']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomDateTimeField
            required
            id='end_date'
            label={messages['common.end_date']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='beneficiary_target'
            label={messages['4ir.scaleup_beneficiary_target']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomCheckbox
            id='number_of_beneficiary'
            label={messages['4ir.scaleup_number_of_beneficiary']}
            register={register}
            errorInstance={errors}
            checked={isNumberOfBeneficiaries}
            onChange={(event: any) => {
              setIsNumberOfBeneficiaries((prev) => !prev);
            }}
            isLoading={false}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <CustomTextInput
            required
            id='implement_area'
            label={messages['4ir.scaleup_implement_area']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomCheckbox
            id='documents_approval_status'
            label={messages['4ir.scaleup_document_approved_by']}
            register={register}
            errorInstance={errors}
            checked={isDocumentApproved}
            onChange={(event: any) => {
              setIsDocumentApproved((prev) => !prev);
            }}
            isLoading={false}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <CustomCheckbox
            id='approval_status'
            label={messages['common.approval_status']}
            register={register}
            errorInstance={errors}
            checked={isApprovalStatus}
            onChange={(event: any) => {
              setIsApprovalStatus((prev) => !prev);
            }}
            isLoading={false}
          />
        </Grid>

        {isApprovalStatus && (
          <Grid item xs={12} sm={12} md={12} alignSelf='center'>
            <Grid container>
              <Grid item xs={12} md={6}>
                <CustomTextInput
                  required
                  id='approve_by'
                  label={messages['4ir_cs.approved_by']}
                  register={register}
                  errorInstance={errors}
                  isLoading={false}
                />
              </Grid>
            </Grid>
          </Grid>
        )}

        <Grid item xs={12} md={6}>
          <FileUploadComponent
            id={'file_path'}
            required
            errorInstance={errors}
            setValue={setValue}
            register={register}
            label={messages['4ir.scaleup_file_upload']}
            defaultFileUrl={itemData?.file_path}
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
export default FourIRScaleUpAddEditPopUp;
