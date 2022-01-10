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
import {
  useFetchOrganizations,
  useFetchSkills,
} from '../../../services/organaizationManagement/hooks';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';

interface JobRequirementAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title_en: '',
  title: '',
};

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

  const [industryAssociationFilter] = useState({});
  const {data: industryAssociations, isLoading: isLoadingIndustryAssociation} =
    useFetchInstitutes(industryAssociationFilter);

  const [organizationFilter] = useState({});
  const {data: organizations, isLoading: isLoadingOrganization} =
    useFetchOrganizations(organizationFilter);

  const [instituteFilter] = useState({});
  const {data: institutes, isLoading: isLoadingInstitute} =
    useFetchInstitutes(instituteFilter);

  const [skillFilter] = useState({});
  const {data: skills, isLoading: isLoadingSkills} =
    useFetchSkills(skillFilter);

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
      data.industry_association_id = 30;
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
            id='industry_association_id'
            label={messages['common.industry_association']}
            isLoading={isLoadingIndustryAssociation}
            options={industryAssociations}
            optionValueProp={'id'}
            optionTitleProp={['title', 'title_en']}
            control={control}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            id='organization_id'
            label={messages['common.organization_en']}
            isLoading={isLoadingOrganization}
            options={organizations}
            optionValueProp={'id'}
            optionTitleProp={['title', 'title_en']}
            control={control}
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
        <Grid item xs={12} md={6}>
          <CustomDateTimeField
            id='end_date'
            label={messages['common.end_date']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            id='skill_id'
            label={messages['common.skills']}
            isLoading={isLoadingSkills}
            options={skills}
            optionValueProp={'id'}
            optionTitleProp={['title', 'title_en']}
            control={control}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='requirement'
            label={messages['common.requirements']}
            register={register}
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
      </Grid>
    </HookFormMuiModal>
  );
};
export default JobRequirementAddEditPopup;
