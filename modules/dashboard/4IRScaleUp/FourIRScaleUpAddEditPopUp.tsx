import yup from '../../../@softbd/libs/yup';
import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useMemo, useEffect} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import {useFetch4IRScaleUp} from '../../../services/4IRManagement/hooks';
import {IScaleUp} from '../../../shared/Interface/4IR.interface';
import {
  updateScaleUp,
  createScaleUp,
} from '../../../services/4IRManagement/ScaleUpService';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';

interface ScaleUpAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  project_advancement: '',
  project_budget: '0',
  previous_budget: '0',
  scale_up: '',
  project_details: '',
};

const FourIRScaleUpAddEditPopUp: FC<ScaleUpAddEditPopupProps> = ({
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
  } = useFetch4IRScaleUp(itemId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      project_advancement: yup
        .string()
        .title()
        .required()
        .label(messages['4ir.project_advancement'] as string),
      project_budget: yup
        .number()
        .required()
        .label(messages['4ir.project_budget'] as string),
      previous_budget: yup
        .number()
        .required()
        .label(messages['4ir.previous_budget'] as string),
      project_details: yup
        .string()
        .title()
        .required()
        .label(messages['4ir.project_details'] as string),
      scale_up: yup
        .string()
        .title()
        .required()
        .label(messages['4ir.scale_up'] as string),
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
  } = useForm<IScaleUp>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        project_advancement: itemData?.project_advancement,
        project_budget: itemData?.project_budget,
        previous_budget: itemData?.previous_budget,
        project_details: itemData?.project_details,
        scale_up: itemData?.scale_up,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);
  const onSubmit: SubmitHandler<IScaleUp> = async (data: IScaleUp) => {
    try {
      if (itemId) {
        await updateScaleUp(itemId, data);
        updateSuccessMessage('4ir_scaleUp.label');
        mutateProject();
      } else {
        await createScaleUp(data);
        createSuccessMessage('4ir_scaleUp.label');
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
              values={{subject: <IntlMessages id='4ir.scale_up' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{
                subject: <IntlMessages id='4ir.scale_up' />,
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
            id=' project_advancement'
            label={messages['4ir.project_advancement']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='project_budget'
            label={messages['4ir.project_budget']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='previous_budget'
            label={messages['4ir.previous_budget']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='scale_up'
            label={messages['4ir.scale_up']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} alignSelf='center'>
          <CustomTextInput
            required
            id='project_details'
            label={messages['4ir.project_details']}
            register={register}
            errorInstance={errors}
            multiline={true}
            isLoading={false}
            rows={3}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default FourIRScaleUpAddEditPopUp;
