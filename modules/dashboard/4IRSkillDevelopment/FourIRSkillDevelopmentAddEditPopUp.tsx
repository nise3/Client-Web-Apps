import yup from '../../../@softbd/libs/yup';
import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
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
import {ISkillDevelopment} from '../../../shared/Interface/4IR.interface';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import SuccessPopup from '../../../@softbd/modals/SuccessPopUp/SuccessPopUp';

interface FourIRSkillDevelopmentAddEditPopUpProps {
  fourIRInitiativeId: number;
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  traning_center: '',
  batch_start_date: '',
  batch_end_date: '',
  batch_number: 0,
};

const FourIRSkillDevelopmentAddEditPopUp: FC<
  FourIRSkillDevelopmentAddEditPopUpProps
> = ({fourIRInitiativeId, itemId, refreshDataTable, ...props}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const isEdit = itemId != null;
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const [showSuccessPopUp, setShowSuccessPopUp] = useState<boolean>(false);
  const {data: itemData, isLoading, mutate: muteSkillDevelopment} =
    // todo -> api is not ready
    //useFetch4IRScaleUp(itemId);
    {
      data: initialValues,
      isLoading: false,
      mutate: () => null,
    };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      traning_center: yup
        .string()
        .required()
        .label(messages['4ir.skill_development_traning_center'] as string),
      batch_start_date: yup
        .string()
        .required()
        .label(messages['4ir.skill_development_batch_start_date'] as string),
      batch_end_date: yup
        .string()
        .required()
        .label(messages['4ir.skill_development_batch_end_date'] as string),
      batch_number: yup
        .number()
        .required()
        .label(messages['4ir.skill_development_batch_number'] as string),
    });
  }, [messages]);

  const {
    //control,
    register,
    reset,
    setError,
    //setValue,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<ISkillDevelopment>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        traning_center: itemData?.traning_center,
        batch_start_date: itemData?.batch_start_date,
        batch_end_date: itemData?.batch_end_date,
        batch_number: itemData?.batch_number,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const closeAction = async () => {
    props.onClose();
    refreshDataTable();
  };

  const onSubmit: SubmitHandler<ISkillDevelopment> = async (
    data: ISkillDevelopment,
  ) => {
    console.log(data);
    try {
      if (itemId) {
        // todo -> api is not ready
        //await updateScaleUp(itemId, data);
        updateSuccessMessage('4ir_skill_development');
        muteSkillDevelopment();
      } else {
        // todo -> api is not ready
        // const response = await createScaleUp(data);

        createSuccessMessage('4ir_skill_development');
        setShowSuccessPopUp(true);
      }
      //props.onClose();
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
              values={{subject: <IntlMessages id='4ir.skill_development' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{
                subject: <IntlMessages id='4ir.skill_development' />,
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
            id='traning_center'
            label={messages['4ir.skill_development_traning_center']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomDateTimeField
            id='batch_start_date'
            label={messages['4ir.skill_development_batch_start_date']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomDateTimeField
            id='batch_end_date'
            label={messages['4ir.skill_development_batch_end_date']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='batch_number'
            label={messages['4ir.skill_development_batch_number']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
      {showSuccessPopUp && fourIRInitiativeId && (
        <SuccessPopup
          closeAction={closeAction}
          stepNo={1}
          initiativeId={fourIRInitiativeId}
          completionStep={1}
          formStep={1}
        />
      )}
    </HookFormMuiModal>
  );
};
export default FourIRSkillDevelopmentAddEditPopUp;
