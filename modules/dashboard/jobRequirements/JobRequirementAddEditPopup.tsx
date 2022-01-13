import {Button, Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
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
import HrDemandAddField from './HrDemandAddField';
import {Box} from '@mui/system';

interface JobRequirementAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {};

const JobRequirementAddEditPopup: FC<JobRequirementAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const defaultValue: any = {
    institute_id: '',
    skill_id: '',
    vacancy: '',
    requirement: '',
  };

  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const [hrDemandFields, setHrDemandFields] = useState<Array<string>>([
    defaultValue,
  ]);
  console.log('hrDemandFields', hrDemandFields);
  const isEdit = itemId != null;
  const {
    data: itemData,
    isLoading,
    mutate: mutateJobRequirement,
  } = useFetchJobRequirement(itemId);

  const [schemaState, setSchemaState] = useState({
    /*  hrDemand1: yup.object().shape({
      institute_id: yup
        .array()
        .of(yup.object())
        .min(1)
        .label(messages['common.industry_association'] as string),
      skill_id: yup
        .string()
        .trim()
        .required()
        .label(messages['common.skills'] as string),
      vacancy: yup
        .string()
        .trim()
        .required()
        .label(messages['common.vacancy'] as string),
      requirement: yup
        .string()
        .trim()
        .required()
        .label(messages['common.requirement'] as string),
    }),*/
  });
  const [organizationFilter] = useState({});
  const {data: organizations, isLoading: isLoadingOrganizations} =
    useFetchOrganizations(organizationFilter);

  const [instituteFilter] = useState({});
  const {data: institutes, isLoading: isLoadingInstitute} =
    useFetchInstitutes(instituteFilter);

  const [skillFilter] = useState({});
  const {data: skills, isLoading: isLoadingSkills} =
    useFetchSkills(skillFilter);

  let fieldCount: any;
  const onAddHrDemand = useCallback(() => {
    setHrDemandFields((prev: any) => {
      return [...prev, defaultValue];
    });

    let validation: any = {...schemaState};

    hrDemandFields.forEach((item, index) => {
      validation['hr_demand'][index] = yup.object().shape({
        institute_id: yup
          .array()
          .of(yup.object())
          .min(1)
          .label(messages['common.institute'] as string),
        skill_id: yup
          .string()
          .trim()
          .required()
          .label(messages['common.skills'] as string),
        vacancy: yup
          .string()
          .trim()
          .required()
          .label(messages['common.vacancy'] as string),
        requirement: yup
          .string()
          .trim()
          .required()
          .label(messages['common.requirement'] as string),
      });
    });
    setSchemaState(validation);
  }, []);

  const onRemoveHrDemand = () => {
    let array = [...hrDemandFields];
    if (hrDemandFields.length > 1) {
      fieldCount = fieldCount - 1;
      array.splice(hrDemandFields.length - 1, 1);
      setHrDemandFields(array);
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      ...{
        organization_id: yup
          .string()
          .trim()
          .required()
          .label(messages['organization.label'] as string),
      },
      ...schemaState,
    });
  }, [messages, schemaState]);

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
  console.log('errors', errors);
  useEffect(() => {
    if (itemData) {
      reset({});
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  console.log('errors', errors);
  const onSubmit: SubmitHandler<any> = async (data: any) => {
    console.log('data--', data);
    let formData = data;

    /*    let hrDemands: Array<string> = [];
    hrDemandFields.map((item) => {
      console.log('item', item);
      hrDemands.push(formData.item);
    });
    formData.hr_demands = hrDemands;
    console.log('hr_demands', hrDemands);*/

    try {
      formData.industry_association_id = 30;
      if (itemId) {
        await updateJobRequirement(itemId, formData);
        updateSuccessMessage('job_requirement.label');
        mutateJobRequirement();
      } else {
        await createJobRequirement(formData);
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
        <Grid item xs={12}>
          <CustomFilterableFormSelect
            id='organization_id'
            label={messages['organization.label']}
            isLoading={isLoadingOrganizations}
            options={organizations}
            optionValueProp={'id'}
            optionTitleProp={['title', 'title_en']}
            control={control}
            errorInstance={errors}
          />
        </Grid>
        {hrDemandFields.length ? (
          hrDemandFields.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <HrDemandAddField
                  item={item}
                  index={index}
                  control={control}
                  instituteOptions={institutes}
                  skillOptions={skills}
                  isLoadingInstitute={isLoadingInstitute}
                  isLoadingSkill={isLoadingSkills}
                  register={register}
                  errorInstance={errors}
                />
              </React.Fragment>
            );
          })
        ) : (
          <></>
        )}
        <Grid item xs={12}>
          <Box display={'flex'} justifyContent={'flex-end'}>
            <Button
              variant={'contained'}
              color={'primary'}
              sx={{marginRight: '10px'}}
              onClick={onAddHrDemand}>
              Add
            </Button>
            <Button
              variant={'contained'}
              color={'primary'}
              onClick={onRemoveHrDemand}>
              Remove
            </Button>
          </Box>
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default JobRequirementAddEditPopup;
