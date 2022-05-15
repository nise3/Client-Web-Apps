import yup from '../../../@softbd/libs/yup';
import {FormHelperText, Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
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

import {useFetch4IInitiative} from '../../../services/4IRManagement/hooks';
import CustomCheckbox from '../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';
import {ProjectStatus} from '../../../shared/constants/AppEnums';
import SuccessPopup from '../../../@softbd/modals/SuccessPopUp/SuccessPopUp';
import {updateInitiative} from '../../../services/4IRManagement/InitiativeService';

interface ProjectAddEditPopupProps {
  initiativeId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  is_skill_provide: 0,
  tasks: [],
};

const FourIRProjectActivationPopup: FC<ProjectAddEditPopupProps> = ({
  initiativeId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();

  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const [isSillProvide, setIsSillProvide] = useState<boolean>(false);
  const [isProjectFinalized, setIsProjectFinalized] = useState<boolean>(false);
  const [isProjectReviewed, setIsProjectReviewed] = useState<boolean>(false);
  const [isProjectApproved, setIsProjectApproved] = useState<boolean>(false);
  const [showSuccessPopUp, setShowSuccessPopUp] = useState<boolean>(false);
  const [tasks, setTasks] = useState<any>([]);

  const {
    data: itemData,
    isLoading,
    mutate: mutateInitiative,
  } = useFetch4IInitiative(initiativeId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
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
    register,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

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
      data.is_skill_provide = Number(isSillProvide);

      const response = await updateInitiative(initiativeId, {
        four_ir_tagline_id: fourIRTaglineId,
        ...data,
      });
      updateSuccessMessage('4ir.initiated');

      if (response?.tasks?.lenght == 3) {
        setShowSuccessPopUp(true);
      } else {
        mutateInitiative();
        await closeAction();
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
            checked={isSillProvide}
            onChange={(event: any) => {
              setIsSillProvide((prev) => !prev);
            }}
            isLoading={false}
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
