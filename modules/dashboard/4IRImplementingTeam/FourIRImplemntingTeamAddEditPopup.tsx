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
  createImplementingTeam,
  updateImplementingTeam,
} from '../../../services/4IRManagement/ImplementingTeamService';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {useFetchImplementingTeam} from '../../../services/instituteManagement/hooks';

interface ImplementingTeamAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  fourIRProjectId: number;
  refreshDataTable: () => void;
}

const initialValues = {
  name: '',
  name_en: '',
  email: '',
  phone_number: '',
  role: '',
  designation: '',
};

const FourIRImplemntingTeamAddEditPopup: FC<
  ImplementingTeamAddEditPopupProps
> = ({itemId, fourIRProjectId, refreshDataTable, ...props}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const isEdit = itemId != null;

  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const {
    data: itemData,
    isLoading,
    mutate: mutateImplementingTeam,
  } = useFetchImplementingTeam(itemId);

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

      phone_number: yup.string(),
      role: yup.string(),
      designation: yup.string(),
    });
  }, [messages]);

  const {
    register,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData != null) {
      let name_en = itemData.name_en || '';
      reset({
        name: itemData.name,
        name_en: name_en,
        email: itemData.email,
        phone_number: itemData?.phone_number,
        role: itemData?.role,
        designation: itemData?.designation,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      let payload = {
        four_ir_project_id: fourIRProjectId,
        team_type: 1,
        ...data,
      };

      if (itemId != null) {
        // update
        await updateImplementingTeam(itemId, payload);
        updateSuccessMessage('4ir.implementing_team');
        mutateImplementingTeam();
      } else {
        await createImplementingTeam(payload);
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
            label={messages['common.phone_number']}
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
      </Grid>
    </HookFormMuiModal>
  );
};
export default FourIRImplemntingTeamAddEditPopup;
