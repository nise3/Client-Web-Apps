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
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import FileUploadComponent from '../../filepond/FileUploadComponent';

interface ImplementingTeamAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

// const initialValues = {
//   workshop_name: '',
//   required_skill: '',
//   start_date: '',
//   end_date: '',
//   venue: '',
//   designation: '',
// };

const FourIRTNAReportAddEditPopup: FC<ImplementingTeamAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  //   const {errorStack} = useNotiStack();
  const isEdit = itemId != null;

  //   const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      workshop_name: yup
        .string()
        .title()
        .required()
        .label(messages['common.workshop_name'] as string),
      required_skill: yup
        .string()
        .title()
        .required()
        .label(messages['common.required_skill'] as string),
      start_date: yup
        .string()
        .title()
        .required()
        .matches(/(19|20)\d\d-[01]\d-[0123]\d/)
        .label(messages['common.start_date'] as string),
      end_date: yup
        .string()
        .title()
        .required()
        .matches(/(19|20)\d\d-[01]\d-[0123]\d/)
        .label(messages['common.end_date'] as string),
      venue: yup
        .string()
        .title()
        .required()
        .label(messages['common.venue'] as string),
    });
  }, [messages]);

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
              values={{subject: <IntlMessages id='4ir.TNA_report' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{
                subject: <IntlMessages id='4ir.TNA_report' />,
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
            id='workshop_name'
            label={messages['common.workshop_name']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='skill_required'
            label={messages['common.required_skill']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomDateTimeField
            id='start_date'
            label={messages['common.start_date']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomDateTimeField
            id='end_date'
            label={messages['common.end_date']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} alignSelf='center'>
          <CustomTextInput
            required
            id='venue'
            label={messages['common.venue']}
            register={register}
            errorInstance={errors}
            isLoading={false}
            rows={3}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FileUploadComponent
            id='project_file'
            errorInstance={errors}
            setValue={setValue}
            register={register}
            sizeLimitText={'3MB'}
            label={messages['common.project_upload']}
            required={false}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default FourIRTNAReportAddEditPopup;
