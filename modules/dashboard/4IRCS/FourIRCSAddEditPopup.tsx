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
import {ICS} from '../../../shared/Interface/4IR.interface';
import {
  useFetch4IRCS,
  useFetch4IRSectors,
} from '../../../services/4IRManagement/hooks';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import {createCS, updateCS} from '../../../services/4IRManagement/CSService';
import {MOBILE_NUMBER_REGEX} from '../../../@softbd/common/patternRegex';
import CustomExpertFieldArray from './CustomExpertFieldArray';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import SuccessPopup from '../../../@softbd/modals/SuccessPopUp/SuccessPopUp';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';

interface CSAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  fourIRInitiativeId: number | string;
  refreshDataTable: () => void;
}

const initialValues = {
  experts: [{}],
  level_from: '',
  level_to: '',
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

const FourIRCSAddEditPopup: FC<CSAddEditPopupProps> = ({
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
  const {data: itemData, isLoading, mutate: mutateCS} = useFetch4IRCS(itemId);
  const {data: sectors, isLoading: isLoadingSectors} = useFetch4IRSectors();
  console.log(sectors);
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
      level_from: yup
        .string()
        .trim()
        .required()
        .label(messages['common.level_from'] as string),
      level_to: yup
        .string()
        .trim()
        .required()
        .label(messages['common.level_to'] as string),
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

  const levels = useMemo(
    () => [
      {
        id: 1,
        label: messages['level.1'],
      },
      {
        id: 2,
        label: messages['level.2'],
      },
      {
        id: 3,
        label: messages['level.3'],
      },
      {
        id: 4,
        label: messages['level.4'],
      },
      {
        id: 5,
        label: messages['level.5'],
      },
      {
        id: 6,
        label: messages['level.6'],
      },
      {
        id: 7,
        label: messages['level.7'],
      },
      {
        id: 8,
        label: messages['level.8'],
      },
      {
        id: 9,
        label: messages['level.9'],
      },
      {
        id: 10,
        label: messages['level.10'],
      },
      {
        id: 11,
        label: messages['level.11'],
      },
      {
        id: 12,
        label: messages['level.12'],
      },
    ],
    [messages],
  );

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
  } = useForm<ICS>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      let data: any = {
        experts: getExperts(itemData?.experts),
        level_from: itemData?.level_from,
        level_to: itemData?.level_to,
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
    if (!experts || experts?.length < 1) return [];

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
      console.log(payload);
      if (itemId) {
        await updateCS(itemId, payload);
        updateSuccessMessage('4ir_cs.label');
        mutateCS();
        await closeAction();
      } else {
        await createCS(payload);
        createSuccessMessage('4ir_cs.label');
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
              values={{subject: <IntlMessages id='4ir_cs.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='4ir_cs.label' />}}
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
            id='level_from'
            label={messages['common.level_from']}
            isLoading={false}
            control={control}
            options={levels}
            optionValueProp='id'
            optionTitleProp={['label']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFormSelect
            required
            id='level_to'
            label={messages['common.level_to']}
            isLoading={false}
            control={control}
            options={levels}
            optionValueProp='id'
            optionTitleProp={['label']}
            errorInstance={errors}
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
        </Grid>
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
              '.docx',
              'application/msword',
            ]}
            label={messages['common.file_upload']}
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
          stepNo={4}
          initiativeId={fourIRInitiativeId}
          completionStep={4}
          formStep={6}
        />
      )}
    </HookFormMuiModal>
  );
};
export default FourIRCSAddEditPopup;
