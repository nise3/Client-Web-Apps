import yup from '../../../@softbd/libs/yup';
import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';

import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {ICell} from '../../../shared/Interface/4IR.interface';
import {useFetch4IRCell} from '../../../services/4IRManagement/hooks';
import {
  createCell,
  updateCell,
} from '../../../services/4IRManagement/CellService';

interface ProjectAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  name: '',
  name_en: '',
  email: '',
  mobile_number: '',
  address: '',
  designation: '',
  designation_en: '',
  row_status: '1',
};

const FourIRCellAddEditPopup: FC<ProjectAddEditPopupProps> = ({
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
  } = useFetch4IRCell(itemId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      name: yup
        .string()
        .title()
        .label(messages['common.name'] as string),
    });
  }, [messages]);

  const {
    control,
    register,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<ICell>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        name: itemData?.name,
        name_en: itemData?.name_en,
        email: itemData?.email,
        mobile_number: itemData?.mobile_number,
        address: itemData?.address,
        designation: itemData?.designation,
        designation_en: itemData?.designation_en,
        row_status: itemData?.row_status,
      });

      /*setIsProjectFinalized(itemData?.roadmap_finalized);
      setIsProjectReviewed(itemData?.projects_reviewed);
      setIsProjectApproved(itemData?.projects_approved);*/
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<ICell> = async (data: ICell) => {
    try {
      if (itemId) {
        await updateCell(itemId, data);
        updateSuccessMessage('4ir_cell.label');
        mutateProject();
      } else {
        await createCell(data);
        createSuccessMessage('4ir_cell.label');
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
              values={{subject: <IntlMessages id='4ir_cell.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='4ir_cell.label' />}}
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
            id='name'
            label={messages['common.name']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='name_en'
            label={messages['common.name_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='designation'
            label={messages['common.designation']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='designation_en'
            label={messages['common.designation_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='email'
            label={messages['common.email']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='address'
            label={messages['common.address']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='mobile_number'
            label={messages['common.mobile']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
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
export default FourIRCellAddEditPopup;
