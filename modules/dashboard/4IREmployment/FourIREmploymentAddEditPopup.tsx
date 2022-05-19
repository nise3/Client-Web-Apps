import yup from '../../../@softbd/libs/yup';
import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
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
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import {createFourIREmployment} from '../../../services/4IRManagement/EmploymentServices';
//import {useFetch4IRCS} from '../../../services/4IRManagement/hooks';
//import FileUploadComponent from '../../filepond/FileUploadComponent';
//import {createCS, updateCS} from '../../../services/4IRManagement/CSService';

interface CSAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  fourIRInitiativeId: number;
  refreshDataTable: () => void;
}

const initialValues = {
  employment_status: '1',
  name: '',
  name_en: '',
  contact_number: '',
  email: '',
  designation: '',
  industry_name: '',
  industry_name_en: '',
  starting_salary: 0,
  job_starting_date: '',
  medium_of_job: '',
};

const employmentOptions = [
  {id: 1, title: 'Self Employed'},
  {id: 2, title: 'Employed'},
  {id: 3, title: 'Not Applicable'},
];

const FourIREmploymentAddEditPopup: FC<CSAddEditPopupProps> = ({
  itemId,
  fourIRInitiativeId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const isEdit = itemId != null;

  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const [employmentStatus, setEmploymentStatus] = useState<number>(1);

  const onEmploymentChange = (e: any) => {
    setEmploymentStatus(e);
  };

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
    return employmentStatus != 2
      ? yup.object().shape({})
      : yup.object().shape({
          name: yup
            .string()
            .title()
            .label(messages['common.name_bn'] as string),
          name_en: yup
            .string()
            .title('en', false)
            .label(messages['common.name_bn'] as string),
          contact_number: yup
            .string()
            .required()
            .label(messages['common.contact'] as string),
          email: yup
            .string()
            .email()
            .required()
            .label(messages['common.email'] as string),
          designation: yup
            .string()
            .required()
            .label(messages['common.designation'] as string),
          industry_name: yup
            .string()
            .required()
            .label(messages['common.industry_name'] as string),
          industry_name_en: yup
            .string()
            .label(messages['common.industry_name_en'] as string),
          starting_salary: yup
            .number()
            .integer()
            .required()
            .positive()
            .label(messages['common.starting_salary'] as string),
          job_starting_date: yup
            .string()
            .required()
            .label(messages['common.job_starting_date'] as string),
          medium_of_job: yup
            .string()
            .required()
            .label(messages['common.job_medium'] as string),
        });
  }, [messages, employmentStatus]);

  const {
    control,
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
        ...initialValues,
        contact_number: itemData.contact_number,
        name: itemData.name,
        name_en: itemData?.name_en,
        email: itemData.email,
        designation: itemData.designation,
        industry_name: itemData.industry_name,
        industry_name_en: itemData.industry_name_en,
        starting_salary: itemData.starting_salary,
        job_starting_date: itemData.job_starting_date,
        medium_of_job: itemData.medium_of_job,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      let payload = {};
      if (employmentStatus === 2) {
        payload = {
          four_ir_initiative_id: fourIRInitiativeId,
          ...data,
        };
      } else {
        payload = {
          four_ir_initiative_id: fourIRInitiativeId,
          employment_status: data?.employment_status,
        };
      }
      console.log(payload);
      if (itemId) {
        // await createFourIREmployment(payload);
        updateSuccessMessage('4ir.employment');
        mutateProject();
      } else {
        // todo -> api call here
        // info: we will not gonna create a job,
        // we will just update employment everytime.
        createSuccessMessage('4ir.employment');
      }
      // props.onClose();
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
          <CustomFilterableFormSelect
            required
            id={'employment_status'}
            label={messages['4ir.employment_status']}
            isLoading={false}
            control={control}
            options={employmentOptions}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            onChange={(e: any) => onEmploymentChange(e)}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12} md={6}></Grid>

        {employmentStatus === 2 && (
          <>
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
                id='industry_name_en'
                label={messages['common.industry_name_en']}
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
                id='job_starting_date'
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
          </>
        )}
      </Grid>
    </HookFormMuiModal>
  );
};
export default FourIREmploymentAddEditPopup;
