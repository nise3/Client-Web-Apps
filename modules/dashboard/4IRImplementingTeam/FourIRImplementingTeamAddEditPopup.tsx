import yup from '../../../@softbd/libs/yup';
import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {useIntl} from 'react-intl';

import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {
  createTeamMember,
  updateTeamMember,
} from '../../../services/4IRManagement/ImplementingTeamService';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {useFetch4IRTeam} from '../../../services/instituteManagement/hooks';
import {FourIRTeamType} from '../../../shared/constants/AppEnums';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import {MOBILE_NUMBER_REGEX} from '../../../@softbd/common/patternRegex';

interface ImplementingTeamAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  fourIRInitiativeId: number;
  refreshDataTable: () => void;
}

const initialValues = {
  name: '',
  name_en: '',
  email: '',
  phone_number: '',
  role: '',
  designation: '',
  contribution: '',
  responsibility: '',
  row_status: 1,
};

const FourIRImplementingTeamAddEditPopup: FC<
  ImplementingTeamAddEditPopupProps
> = ({itemId, fourIRInitiativeId, refreshDataTable, ...props}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const isEdit = itemId != null;

  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const {
    data: itemData,
    isLoading,
    mutate: mutateImplementingTeam,
  } = useFetch4IRTeam(itemId);

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
      role: yup
        .string()
        .required()
        .label(messages['common.role'] as string),
      designation: yup
        .string()
        .required()
        .label(messages['common.designation'] as string),
    });
  }, [messages]);

  const {
    register,
    control,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData != null) {
      reset({
        name: itemData?.name,
        name_en: itemData?.name_en,
        email: itemData?.email,
        phone_number: itemData?.phone_number,
        role: itemData?.role,
        designation: itemData?.designation,
        contribution: itemData?.contribution,
        responsibility: itemData?.responsibility,
        row_status: itemData?.row_status,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      let payload = {
        four_ir_initiative_id: fourIRInitiativeId,
        team_type: FourIRTeamType.IMPLEMENTING_TEAM,
        ...data,
      };

      if (itemId != null) {
        await updateTeamMember(itemId, payload);
        updateSuccessMessage('4ir.implementing_team');
        mutateImplementingTeam();
      } else {
        await createTeamMember(payload);
        createSuccessMessage('4ir.implementing_team');
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
              values={{subject: <IntlMessages id='4ir.implementing_team' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{
                subject: <IntlMessages id='4ir.implementing_team' />,
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
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='name_en'
            label={messages['common.name_en']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='email'
            label={messages['common.email']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='phone_number'
            label={messages['common.mobile']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CustomTextInput
            required
            id='role'
            label={messages['role.label']}
            register={register}
            errorInstance={errors}
            isLoading={false}
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
            isLoading={false}
            rows={3}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CustomTextInput
            id='contribution'
            label={messages['4IR.contribution']}
            register={register}
            errorInstance={errors}
            isLoading={false}
            rows={5}
            multiline={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CustomTextInput
            id='responsibility'
            label={messages['4ir.responsibility']}
            register={register}
            errorInstance={errors}
            isLoading={false}
            rows={5}
            multiline={true}
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
    </HookFormMuiModal>
  );
};
export default FourIRImplementingTeamAddEditPopup;
