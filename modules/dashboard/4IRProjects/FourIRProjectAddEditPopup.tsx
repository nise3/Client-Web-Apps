import yup from '../../../@softbd/libs/yup';
import {FormHelperText, Grid} from '@mui/material';
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
import {ProjectStatus} from '../../../shared/constants/AppEnums';
import SuccessPopup from '../../../@softbd/modals/SuccessPopUp/SuccessPopUp';

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
  four_ir_occupation_id: '',
  start_date: '',
  budget: '0',
  details: '',
  tasks: [],
  row_status: '1',
  completion_step: '1',
  form_step: '1',
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
  const [showSuccessPopUp, setShowSuccessPopUp] = useState<boolean>(false);
  const [projectId, setProjectId] = useState<any>(null);
  const [completionStep, setCompletionStep] = useState<any>(1);
  const [formStep, setFormStep] = useState<any>(1);
  const [tasks, setTasks] = useState<any>([]);
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
      project_name: yup
        .string()
        .title()
        .label(messages['project.name'] as string),
      organization_name: yup
        .string()
        .required()
        .label(messages['common.organization_name'] as string),
      start_date: yup
        .string()
        .required()
        .label(messages['project.start_date'] as string),
      four_ir_occupation_id: yup
        .string()
        .trim()
        .required()
        .label(messages['menu.occupations'] as string),
      tasks: yup
        .array()
        .of(yup.boolean())
        .min(1)
        .required()
        .test(
          'at_least_one_validation',
          messages['4ir_showcasing.task'] as string,
          (value: any) => {
            let isTrue;
            value?.map((val: any) => {
              if (val) {
                isTrue = true;
              }
            });
            return !!isTrue;
          },
        )
        .label(messages['4ir_showcasing.task'] as string),
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

  const isChecked = (event: any, value: any) => {
    const checked = event.target.checked;
    if (checked) {
      tasks.push(value);
      setTasks((prevState: any) => prevState);
    } else if (tasks.includes(value)) {
      const index = tasks?.indexOf(value);
      if (index > -1) {
        tasks.splice(index, 1);
      }
    }
  };

  useEffect(() => {
    if (itemData) {
      reset({
        project_name: itemData?.project_name,
        project_name_en: itemData?.project_name_en,
        organization_name: itemData?.organization_name,
        organization_name_en: itemData?.organization_name_en,
        four_ir_occupation_id: itemData?.four_ir_occupation_id,
        start_date: itemData?.start_date,
        budget: itemData?.budget,
        details: itemData?.details,
        row_status: itemData?.row_status,
      });

      itemData?.tasks?.map((task: any) => {
        if (tasks?.indexOf(task) == -1) {
          tasks.push(task);
        }
        if (task == ProjectStatus.PROJECT_FINALIZED) {
          setIsProjectFinalized(true);
        } else if (task == ProjectStatus.PROJECT_REVIEWED) {
          setIsProjectReviewed(true);
        } else if (task == ProjectStatus.PROJECT_APPROVED) {
          setIsProjectApproved(true);
        }
      });

      setTasks(tasks);
      setFormStep(itemData?.form_step);
      setCompletionStep(itemData?.completion_step);
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const closeAction = async () => {
    props.onClose();
    refreshDataTable();
  };

  const onSubmit: SubmitHandler<IProject> = async (data: IProject) => {
    try {
      if (itemId) {
        data.completion_step = completionStep;
        data.form_step = formStep;
        data.tasks = tasks;
        await updateProject(itemId, data);
        updateSuccessMessage('4ir_project.label');
        mutateProject();
      } else {
        data.completion_step = completionStep;
        data.form_step = formStep;
        data.tasks = tasks;
        const response = await createProject(data);
        createSuccessMessage('4ir_project.label');
        setShowSuccessPopUp(true);
        setProjectId(response?.data?.id);
      }
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
            id='project_name_en'
            label={messages['project.name_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
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
            id='details'
            label={messages['project.details']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={3}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomDateTimeField
            required
            id='start_date'
            label={messages['project.start_date']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='budget'
            label={messages['project.project_budget']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomCheckbox
            id='tasks[0]'
            label={messages['project.roadmap_finalized']}
            register={register}
            errorInstance={errors}
            checked={isProjectFinalized}
            onChange={(event: any) => {
              isChecked(event, ProjectStatus.PROJECT_FINALIZED);
              setIsProjectFinalized((prev) => !prev);
            }}
            isLoading={false}
          />
          <CustomCheckbox
            id='tasks[1]'
            label={messages['project.projects_reviewed']}
            register={register}
            errorInstance={errors}
            checked={isProjectReviewed}
            onChange={(event: any) => {
              isChecked(event, ProjectStatus.PROJECT_REVIEWED);
              setIsProjectReviewed((pre) => !pre);
            }}
            isLoading={false}
          />
          <CustomCheckbox
            id='tasks[2]'
            label={messages['project.projects_approved']}
            register={register}
            errorInstance={errors}
            checked={isProjectApproved}
            onChange={(event: any) => {
              isChecked(event, ProjectStatus.PROJECT_APPROVED);
              setIsProjectApproved((pre) => !pre);
            }}
            isLoading={false}
          />
          {errors?.tasks && (
            <FormHelperText sx={{color: 'error.main'}}>
              {messages['4ir_showcasing.task'] as string}
            </FormHelperText>
          )}
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
      {showSuccessPopUp && projectId && (
        <SuccessPopup
          closeAction={closeAction}
          stepNo={1}
          projectId={projectId}
          completionStep={1}
          formStep={1}
        />
      )}
    </HookFormMuiModal>
  );
};
export default FourIRProjectAddEditPopup;
