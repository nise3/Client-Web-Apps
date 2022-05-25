import {FormHelperText, Grid} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';

import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import CustomCheckbox from '../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';
import {ProjectStatus} from '../../../shared/constants/AppEnums';
import SuccessPopup from '../../../@softbd/modals/SuccessPopUp/SuccessPopUp';
import {updateProjectActivation} from '../../../services/4IRManagement/InitiativeService';
import {useFetch4IRInitiative} from '../../../services/4IRManagement/hooks';

interface ProjectAddEditPopupProps {
  initiativeId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

//TODO:: change this one 'is_skill_provide: 1,' to 'is_skill_provide: 0,' when working with 'initiative cell' requirements

const initialValues = {
  is_skill_provide: 1,
  tasks: [],
};

const FourIRProjectActivationPopup: FC<ProjectAddEditPopupProps> = ({
  initiativeId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();

  //TODO:: change initial value: setIsSkillProvide(false)  when working with 'initiative cell' requirements
  const [isSkillProvide, setIsSkillProvide] = useState<boolean>(true);
  const [isProjectFinalized, setIsProjectFinalized] = useState<boolean>(false);
  const [isProjectReviewed, setIsProjectReviewed] = useState<boolean>(false);
  const [isProjectApproved, setIsProjectApproved] = useState<boolean>(false);
  const [showSuccessPopUp, setShowSuccessPopUp] = useState<boolean>(false);
  const [tasks, setTasks] = useState<any>([]);
  const {updateSuccessMessage} = useSuccessMessage();

  const {
    data: itemData,
    isLoading,
    mutate: mutateInitiativeTasks,
  } = useFetch4IRInitiative(initiativeId);

  const {
    register,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>();

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
        is_skill_provide: itemData?.is_skill_provide,
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
      //setIsSkillProvide(itemData?.is_skill_provide);
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const closeAction = async () => {
    props.onClose();
    refreshDataTable();
  };

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      data.tasks = tasks;
      data.is_skill_provide = Number(isSkillProvide);

      const response = await updateProjectActivation(initiativeId, data);
      updateSuccessMessage('4ir.initiated');

      if (response?.data?.tasks?.length == 3) {
        setShowSuccessPopUp(true);
      } else {
        mutateInitiativeTasks();
        await closeAction();
      }
    } catch (error: any) {
      processServerSideErrors({error, setError, errorStack});
    }
  };

  return (
    <HookFormMuiModal
      open={true}
      {...props}
      title={
        <>
          <IconBranch />
          <IntlMessages
            id='common.edit'
            values={{subject: <IntlMessages id='4ir.initiate_project' />}}
          />
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
          <CustomCheckbox
            id='is_skill_provide'
            label={messages['initiative.is_skill_provided']}
            register={register}
            errorInstance={errors}
            checked={isSkillProvide}
            onChange={(event: any) => {
              setIsSkillProvide((prev) => !prev);
            }}
            isLoading={false}
            isDisabled={isSkillProvide}
          />
          <CustomCheckbox
            id='tasks[0]'
            label={messages['initiative.roadmap_finalized']}
            register={register}
            errorInstance={errors}
            checked={isProjectFinalized}
            onChange={(event: any) => {
              isChecked(event, ProjectStatus.PROJECT_FINALIZED);
              setIsProjectFinalized((prev) => !prev);
            }}
            isLoading={false}
            isDisabled={isProjectFinalized}
          />
          <CustomCheckbox
            id='tasks[1]'
            label={messages['initiative.initiatives_reviewed']}
            register={register}
            errorInstance={errors}
            checked={isProjectReviewed}
            onChange={(event: any) => {
              isChecked(event, ProjectStatus.PROJECT_REVIEWED);
              setIsProjectReviewed((pre) => !pre);
            }}
            isLoading={false}
            isDisabled={isProjectReviewed}
          />
          <CustomCheckbox
            id='tasks[2]'
            label={messages['initiative.initiatives_approved']}
            register={register}
            errorInstance={errors}
            checked={isProjectApproved}
            onChange={(event: any) => {
              isChecked(event, ProjectStatus.PROJECT_APPROVED);
              setIsProjectApproved((pre) => !pre);
            }}
            isLoading={false}
            isDisabled={isProjectApproved}
          />
          {errors?.tasks && (
            <FormHelperText sx={{color: 'error.main'}}>
              {messages['4ir_showcasing.task'] as string}
            </FormHelperText>
          )}
        </Grid>
      </Grid>
      {showSuccessPopUp && initiativeId && (
        <SuccessPopup
          closeAction={closeAction}
          stepNo={1}
          initiativeId={initiativeId}
          completionStep={1}
          formStep={1}
        />
      )}
    </HookFormMuiModal>
  );
};
export default FourIRProjectActivationPopup;
