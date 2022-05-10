import yup from '../../../@softbd/libs/yup';
import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField/';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
//import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';

import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {IEmployment} from '../../../shared/Interface/4IR.interface';
//import {useFetch4IRCS} from '../../../services/4IRManagement/hooks';
//import FileUploadComponent from '../../filepond/FileUploadComponent';
//import {createCS, updateCS} from '../../../services/4IRManagement/CSService';

interface CSAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  name: '',
  contact_number: '',
  email: '',
  designation: '',
  industry_name: '',
  starting_salary: 0,
  job_starting_data: '',
  medium_of_job: '',
};

const FourIREmploymentAddEditPopup: FC<CSAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const isEdit = itemId != null;

  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const {
    data: itemData,
    isLoading,
    mutate: mutateProject,
  } = {
    data: initialValues,
    isLoading: false,
    mutate: () => null,
  };

  //useFetch4IRCS(itemId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      name: yup
        .string()
        .title()
        .label(messages['common.name_bn'] as string),
      contact_number: yup.string().label(messages['common.contact'] as string),
      email: yup
        .string()
        .email()
        .label(messages['common.email'] as string),
      designation: yup.string().label(messages['common.designation'] as string),
      industry_name: yup
        .string()
        .label(messages['common.industry_name'] as string),
      starting_salary: yup
        .number()
        .integer()
        .positive()
        .label(messages['common.starting_salary'] as string),
      job_starting_data: yup
        .string()
        .label(messages['common.job_starting_date'] as string),
      medium_of_job: yup
        .string()
        .label(messages['common.job_medium'] as string),
    });
  }, [messages]);

  const {
    //control,
    register,
    reset,
    setError,
    // setValue,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<IEmployment>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        contact_number: itemData.contact_number,
        name: itemData.name,
        email: itemData.email,
        designation: itemData.designation,
        industry_name: itemData.industry_name,
        starting_salary: itemData.starting_salary,
        job_starting_data: itemData.job_starting_data,
        medium_of_job: itemData.medium_of_job,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<IEmployment> = async (data: IEmployment) => {
    try {
      if (itemId) {
        // todo -> api call here
        updateSuccessMessage('4ir.employment');
        mutateProject();
      } else {
        // todo -> api call here
        createSuccessMessage('4ir.employment');
      }
      //props.onClose();
      //refreshDataTable();
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
              values={{subject: <IntlMessages id='4ir.employment' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='4ir.employment' />}}
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
            required
            id='contact_number'
            label={messages['common.contact_number']}
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
            id='designation'
            label={messages['common.designation']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='industry_name'
            label={messages['common.industry_name']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='starting_salary'
            label={messages['common.starting_salary']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomDateTimeField
            required
            id='job_starting_data'
            label={messages['common.job_starting_date']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='medium_of_job'
            label={messages['common.job_medium']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default FourIREmploymentAddEditPopup;
