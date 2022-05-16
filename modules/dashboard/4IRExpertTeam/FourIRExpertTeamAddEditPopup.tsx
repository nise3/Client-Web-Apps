import yup from '../../../@softbd/libs/yup';
import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {useIntl} from 'react-intl';

import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {useFetch4IRTeam} from '../../../services/instituteManagement/hooks';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {
  createTeamMember,
  updateTeamMember,
} from '../../../services/4IRManagement/ImplementingTeamService';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {MOBILE_NUMBER_REGEX} from '../../../@softbd/common/patternRegex';
import {FourIRTeamType} from '../../../shared/constants/AppEnums';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import SuccessPopup from '../../../@softbd/modals/SuccessPopUp/SuccessPopUp';
import FileUploadComponent from '../../filepond/FileUploadComponent';

interface IExpertTeamAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  fourIRInitiativeId: number | string;
  refreshDataTable: () => void;
}

const initialValues = {
  name: '',
  name_en: '',
  email: '',
  phone_number: '',
  role_responsibility: '',
  designation: '',
  organization: '',
  file_path: '',
  row_status: 1,
};

const FourIRExpertTeamAddEditPopup: FC<IExpertTeamAddEditPopupProps> = ({
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

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      name: yup
        .string()
        .title()
        .required()
        .label(messages['common.title'] as string),
      name_en: yup
        .string()
        .title(
          'en',
          false,
          messages['common.special_character_error'] as string,
        )
        .label(messages['common.title_en'] as string),
      email: yup
        .string()
        .email()
        .required()
        .label(messages['common.email'] as string),
      phone_number: yup
        .string()
        .trim()
        .required()
        .matches(MOBILE_NUMBER_REGEX)
        .label(messages['common.mobile'] as string),
      role_responsibility: yup
        .string()
        .required()
        .label(messages['4ir.role_or_responsibility'] as string),
      designation: yup
        .string()
        .required()
        .label(messages['common.designation'] as string),
      organization: yup
        .string()
        .required()
        .label(messages['common.organization'] as string),
      file_path: yup
        .string()
        .required()
        .label(messages['common.photo'] as string),
    });
  }, [messages]);

  const {
    control,
    register,
    reset,
    setError,
    handleSubmit,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const {
    data: itemData,
    isLoading,
    mutate: mutateExpertTeam,
  } = useFetch4IRTeam(itemId);

  useEffect(() => {
    if (itemData) {
      reset({
        name: itemData?.name,
        name_en: itemData?.name_en,
        email: itemData?.email,
        phone_number: itemData?.phone_number,
        role_responsibility: itemData?.role_responsibility,
        designation: itemData?.designation,
        organization: itemData?.organization,
        file_path: itemData?.file_path,
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

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      let payload = {
        four_ir_initiative_id: fourIRInitiativeId,
        team_type: FourIRTeamType.EXPERT_TEAM,
        ...data,
      };

      if (itemId != null) {
        await updateTeamMember(itemId, payload);
        updateSuccessMessage('4ir.expert_team');
        mutateExpertTeam();
        await closeAction();
      } else {
        await createTeamMember(payload);
        createSuccessMessage('4ir.expert_team');
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
              values={{subject: <IntlMessages id='4ir.expert_team' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{
                subject: <IntlMessages id='4ir.expert_team' />,
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
            label={messages['common.name']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='name_en'
            label={messages['common.name_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='email'
            label={messages['common.email']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='phone_number'
            label={messages['common.mobile']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CustomTextInput
            required
            id='role_responsibility'
            label={messages['4ir.role_or_responsibility']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            rows={3}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CustomTextInput
            required
            id='designation'
            label={messages['common.designation']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            rows={3}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CustomTextInput
            required
            id='organization'
            label={messages['common.organization']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FileUploadComponent
            id='file_path'
            defaultFileUrl={itemData?.file_path}
            errorInstance={errors}
            setValue={setValue}
            register={register}
            label={messages['common.photo']}
            required={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
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
          stepNo={2}
          initiativeId={fourIRInitiativeId}
          completionStep={2}
          formStep={3}
        />
      )}
    </HookFormMuiModal>
  );
};
export default FourIRExpertTeamAddEditPopup;
