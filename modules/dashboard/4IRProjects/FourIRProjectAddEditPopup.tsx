import yup from '../../../@softbd/libs/yup';
import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import IconBranch from '../../../@softbd/icons/IconBranch';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';

import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {getAll4IROccupations} from '../../../services/4IRManagement/OccupationService';
import {IProject} from '../../../shared/Interface/4IR.interface';
import {
  createProject,
  updateProject,
} from '../../../services/4IRManagement/ProjectService';
import {useFetch4IRProject} from '../../../services/4IRManagement/hooks';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import CustomCheckbox from '../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';

interface ProjectAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  project_name: '',
  project_name_en: '',
  organization_name: '',
  organization_name_en: '',
  occupation_id: '',
  project_start_date: '',
  project_details: '',
  project_budget: '0',
  project_check_list: [],
  row_status: '1',
};

const FourIRProjectAddEditPopup: FC<ProjectAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const isEdit = itemId != null;

  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const [isProjectFinalized, setIsProjectFinalized] = useState<boolean>(false);
  const [isProjectReviewed, setIsProjectReviewed] = useState<boolean>(false);
  const [isProjectApproved, setIsProjectApproved] = useState<boolean>(false);
  const [occupation, setOccupation] = useState<Array<any>>([]);
  const [isLoadingOccupation, setIsLoadingOccupation] =
    useState<boolean>(false);

  const {
    data: itemData,
    isLoading,
    mutate: mutateProject,
  } = useFetch4IRProject(itemId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title()
        .label(messages['common.title'] as string),
    });
  }, [messages]);

  const {
    control,
    register,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<IProject>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    setIsLoadingOccupation(true);
    (async () => {
      try {
        let response = await getAll4IROccupations({
          row_status: RowStatus.ACTIVE,
        });

        setIsLoadingOccupation(false);
        if (response && response?.data) {
          setOccupation(response.data);
        }
      } catch (e) {}
    })();
  }, []);

  useEffect(() => {
    if (itemData) {
      reset({
        project_name: itemData?.project_name,
        project_name_en: itemData?.project_name_en,
        organization_name: itemData?.organization_name,
        organization_name_en: itemData?.organization_name_en,
        occupation_id: itemData?.occupation_id,
        project_start_date: itemData?.project_start_date,
        project_details: itemData?.project_details,
        project_budget: itemData?.project_budget,
        project_check_list: itemData?.project_check_list,
        row_status: itemData?.row_status,
      });

      setIsProjectFinalized(itemData?.roadmap_finalized);
      setIsProjectReviewed(itemData?.projects_reviewed);
      setIsProjectApproved(itemData?.projects_approved);
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<IProject> = async (data: IProject) => {
    try {
      if (itemId) {
        await updateProject(itemId, data);
        updateSuccessMessage('4ir_project.label');
        mutateProject();
      } else {
        await createProject(data);
        createSuccessMessage('4ir_project.label');
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
              values={{subject: <IntlMessages id='4ir_project.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='4ir_project.label' />}}
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
            id='project_name'
            label={messages['project.name']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='project_name_en'
            label={messages['project.name_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='organization_name'
            label={messages['common.organization_name']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='organization_name_en'
            label={messages['common.organization_name_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            required
            id='four_ir_occupation_id'
            label={messages['menu.occupations']}
            isLoading={isLoadingOccupation}
            options={occupation}
            optionValueProp={'id'}
            optionTitleProp={['title', 'title_en']}
            control={control}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CustomTextInput
            id='project_details'
            label={messages['project.details']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={3}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CustomTextInput
            id='project_details_en'
            label={messages['project.details_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={3}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomDateTimeField
            id='project_start_date'
            label={messages['project.start_date']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='project_budget'
            label={messages['project.project_budget']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomCheckbox
            id='roadmap_finalized'
            label={messages['project.roadmap_finalized']}
            register={register}
            errorInstance={errors}
            checked={isProjectFinalized}
            onChange={() => {
              setIsProjectFinalized((prev) => !prev);
            }}
            isLoading={false}
          />
          <CustomCheckbox
            id='projects_reviewed'
            label={messages['project.projects_reviewed']}
            register={register}
            errorInstance={errors}
            checked={isProjectReviewed}
            onChange={() => {
              setIsProjectReviewed((prev) => !prev);
            }}
            isLoading={false}
          />
          <CustomCheckbox
            id='projects_approved'
            label={messages['project.projects_approved']}
            register={register}
            errorInstance={errors}
            checked={isProjectApproved}
            onChange={() => {
              setIsProjectApproved((prev) => !prev);
            }}
            isLoading={false}
          />
        </Grid>

        <Grid item xs={12}>
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
export default FourIRProjectAddEditPopup;
