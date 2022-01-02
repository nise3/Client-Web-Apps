import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import yup from '../../../@softbd/libs/yup';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {useFetchJobRequirement} from '../../../services/IndustryManagement/hooks';
import IconJobRequirement from '../../../@softbd/icons/JobRequirement';
import {
  createJobRequirement,
  updateJobRequirement,
} from '../../../services/IndustryManagement/JobRequirementService';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import {useFetchInstitutes} from '../../../services/instituteManagement/hooks';
import CustomAddFilterableFormSelect from '../jobLists/jobPost/steps/components/CustomAddFilterableFormSelect';

interface JobRequirementAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title_en: '',
  title: '',
};
const demoOptions = [
  {id: 1, title: 'BGC Trust'},
  {id: 2, title: 'Test 1'},
  {id: 3, title: 'Test 2'},
  {id: 4, title: 'Test 3'},
];
const JobRequirementAddEditPopup: FC<JobRequirementAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const isEdit = itemId != null;
  const {
    data: itemData,
    isLoading,
    mutate: mutateJobRequirement,
  } = useFetchJobRequirement(itemId);

  const [instituteFilter] = useState({});
  const {data: institutes, isLoading: isLoadingInstitute} =
    useFetchInstitutes(instituteFilter);

  const [industryFilter] = useState({});
  const {data: industries, isLoading: isLoadingIndustry} =
    useFetchInstitutes(industryFilter);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title()
        .label(messages['common.title'] as string),
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
    if (itemData) {
      reset({
        title_en: itemData?.title_en,
        title: itemData?.title,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      if (itemId) {
        await updateJobRequirement(itemId, data);
        updateSuccessMessage('job_requirement.label');
        mutateJobRequirement();
      } else {
        await createJobRequirement(data);
        createSuccessMessage('job_requirement.label');
      }
      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <HookFormMuiModal
      {...props}
      open={true}
      title={
        <>
          <IconJobRequirement />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='job_requirement.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='job_requirement.label' />}}
            />
          )}
        </>
      }
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
            id='industry_id'
            isLoading={isLoadingIndustry}
            label={messages['common.industry']}
            options={industries}
            optionValueProp={'id'}
            optionTitleProp={['title', 'title_en']}
            control={control}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomAddFilterableFormSelect
            id={'skills'}
            label={messages['common.skills']}
            isLoading={false}
            control={control}
            optionTitleProp={['title']}
            options={demoOptions}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='vacancy'
            label={messages['common.vacancy']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            id='institute_id'
            label={messages['common.institute']}
            isLoading={isLoadingInstitute}
            options={institutes}
            optionValueProp={'id'}
            optionTitleProp={['title', 'title_en']}
            control={control}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextInput
            id='description'
            label={messages['common.description']}
            register={register}
            errorInstance={errors}
            multiline={true}
            rows={3}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default JobRequirementAddEditPopup;
