import yup from '../../../@softbd/libs/yup';
import {Grid, Typography} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';

import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {
  useFetch4IRCBLM,
  useFetch4IRSectors,
} from '../../../services/4IRManagement/hooks';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import {MOBILE_NUMBER_REGEX} from '../../../@softbd/common/patternRegex';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import SuccessPopup from '../../../@softbd/modals/SuccessPopUp/SuccessPopUp';
import CustomExpertFieldArray from '../4IRCS/CustomExpertFieldArray';
import {
  createCBLM,
  updateCBLM,
} from '../../../services/4IRManagement/CBLMServices';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';

interface CBLMAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  fourIRInitiativeId: number | string;
  refreshDataTable: () => void;
}

const initialValues = {
  experts: [{}],
  approved_by: '',
  approve_date: '',
  developed_organization_name: '',
  developed_organization_name_en: '',
  sector_name: '',
  supported_organization_name: '',
  supported_organization_name_en: '',
  comments: '',
  file_path: '',
  row_status: 1,
};

const FourIRCBLMAddEditPopUp: FC<CBLMAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  fourIRInitiativeId,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const isEdit = itemId != null;

  const [showSuccessPopUp, setShowSuccessPopUp] = useState<boolean>(false);
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const {
    data: itemData,
    isLoading,
    mutate: mutateCBLM,
  } = useFetch4IRCBLM(itemId);
  const {data: sectors, isLoading: isLoadingSectors} = useFetch4IRSectors();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      experts: yup.array().of(
        yup.object().shape({
          name: yup
            .string()
            .required()
            .label(messages['common.name'] as string),
          designation: yup
            .string()
            .required()
            .label(messages['common.designation'] as string),
          organization: yup
            .string()
            .required()
            .label(messages['common.organization'] as string),
          mobile: yup
            .string()
            .trim()
            .matches(MOBILE_NUMBER_REGEX)
            .required()
            .label(messages['common.mobile'] as string),
          email: yup
            .string()
            .email()
            .required()
            .label(messages['common.email'] as string),
        }),
      ),
      approved_by: yup
        .string()
        .trim()
        .required()
        .label(messages['4ir_cs.approved_by'] as string),
      approve_date: yup
        .string()
        .required()
        .label(messages['common.approved_date'] as string),
      developed_organization_name: yup
        .string()
        .trim()
        .required()
        .label(messages['common.developed_organization_name'] as string),
      supported_organization_name: yup
        .string()
        .trim()
        .required()
        .label(messages['common.supported_organization_name'] as string),
      sector_name: yup
        .string()
        .trim()
        .required()
        .label(messages['common.sector'] as string),
      file_path: yup
        .string()
        .trim()
        .required()
        .label(messages['common.file'] as string),
    });
  }, [messages]);

  const approvedBy = useMemo(
    () => [
      {
        id: 1,
        label: 'NSDA',
      },
      {
        id: 2,
        label: 'BTEB',
      },
    ],
    [],
  );

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
      let data: any = {
        experts: getExperts(itemData?.experts),
        approved_by: itemData?.approved_by,
        approve_date: itemData?.approve_date,
        developed_organization_name: itemData?.developed_organization_name,
        developed_organization_name_en:
          itemData?.developed_organization_name_en,
        sector_name: itemData?.sector_name,
        supported_organization_name: itemData?.supported_organization_name,
        supported_organization_name_en:
          itemData?.supported_organization_name_en,
        comments: itemData?.comments,
        file_path: itemData?.file_path,
        row_status: itemData?.row_status,
      };
      reset(data);
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const getExperts = (experts: any) => {
    if (!experts || experts?.lenght < 1) return [];

    return (experts || []).map((item: any) => {
      return {
        name: item?.name,
        designation: item?.designation,
        organization: item?.organization,
        mobile: item?.mobile,
        email: item?.email,
      };
    });
  };

  const closeAction = async () => {
    props.onClose();
    refreshDataTable();
  };

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      let payload = {
        four_ir_initiative_id: fourIRInitiativeId,
        ...data,
      };

      if (itemId) {
        await updateCBLM(itemId, payload);
        updateSuccessMessage('4ir.CBLM');
        mutateCBLM();
        await closeAction();
      } else {
        await createCBLM(payload);
        createSuccessMessage('4ir.CBLM');
        setShowSuccessPopUp(true);
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
          <IconBranch />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='4ir.CBLM' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='4ir.CBLM' />}}
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
          <Typography variant={'body2'}>
            {messages['level.experts_list']}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <CustomExpertFieldArray
            id='experts'
            isLoading={false}
            control={control}
            register={register}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormSelect
            required
            id='approved_by'
            label={messages['4ir_cs.approved_by']}
            isLoading={false}
            control={control}
            options={approvedBy}
            optionValueProp='id'
            optionTitleProp={['label']}
            errorInstance={errors}
          />
        </Grid>{' '}
        <Grid item xs={12} md={6}>
          <CustomDateTimeField
            id='approve_date'
            label={messages['common.approved_date']}
            register={register}
            errorInstance={errors}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='developed_organization_name'
            label={messages['common.developed_organization_name']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='developed_organization_name_en'
            label={messages['common.developed_organization_name_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='supported_organization_name'
            label={messages['common.supported_organization_name']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='supported_organization_name_en'
            label={messages['common.supported_organization_name_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormSelect
            required
            id='sector_name'
            label={messages['common.sector']}
            isLoading={isLoadingSectors}
            control={control}
            options={sectors}
            optionValueProp='id'
            optionTitleProp={['title']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='comments'
            label={messages['common.comment']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={3}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FileUploadComponent
            id='file_path'
            defaultFileUrl={itemData?.file_path}
            errorInstance={errors}
            setValue={setValue}
            register={register}
            sizeLimitText={'3MB'}
            acceptedFileTypes={[
              'application/pdf',
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ]}
            label={messages['common.word_or_pdf_file']}
            required={true}
          />
        </Grid>
        <Grid item xs={12}>
          <FormRowStatus
            id='row_status'
            control={control}
            defaultValue={initialValues?.row_status}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
      {showSuccessPopUp && fourIRInitiativeId && (
        <SuccessPopup
          closeAction={closeAction}
          stepNo={6}
          initiativeId={fourIRInitiativeId}
          completionStep={6}
          formStep={8}
        />
      )}
    </HookFormMuiModal>
  );
};
export default FourIRCBLMAddEditPopUp;
