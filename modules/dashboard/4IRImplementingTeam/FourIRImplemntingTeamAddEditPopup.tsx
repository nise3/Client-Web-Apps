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

interface ImplementingTeamAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

// const initialValues = {
//   name: '',
//   name_en: '',
//   email: '',
//   phone_number: '',
//   role: '',
//   designation: '',
// };

const FourIRImplemntingTeamAddEditPopup: FC<
  ImplementingTeamAddEditPopupProps
> = ({itemId, refreshDataTable, ...props}) => {
  const {messages} = useIntl();
  //   const {errorStack} = useNotiStack();
  const isEdit = itemId != null;

  //   const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      name: yup
        .string()
        .title()
        .required()
        .label(messages['common.title'] as string),
      email: yup
        .string()
        .email()
        .required()
        .label(messages['common.email'] as string),
    });
  }, [messages]);

  const {
    control,
    register,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    console.log(data);
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
          <CancelButton onClick={props.onClose} />
          <SubmitButton isSubmitting={isSubmitting} />
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
