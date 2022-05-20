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
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconSkill from '../../../@softbd/icons/IconSkill';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import {useFetchFourIRTagline} from '../../../services/4IRManagement/hooks';
import {ITagLine} from '../../../shared/Interface/4IR.interface';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import {
  createTagline,
  updateTagline,
} from '../../../services/4IRManagement/TaglineService';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';

interface FourIRTaglineAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  name: '',
  name_en: '',
  start_date: '',
  row_status: 1,
};

const FourIRTagLineAddEditPopup: FC<FourIRTaglineAddEditPopupProps> = ({
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
    mutate: mutateTagline,
  } = useFetchFourIRTagline(itemId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      name: yup
        .string()
        .required()
        .title()
        .label(messages['common.name'] as string),
      name_en: yup
        .string()
        .title('en', false)
        .label(messages['common.name_en'] as string),
      start_date: yup
        .string()
        .trim()
        .required()
        .label(messages['common.start_date'] as string),
      row_status: yup
        .number()
        .label(messages['common.active_status'] as string),
    });
  }, [messages]);

  const {
    register,
    control,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<ITagLine>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        name: itemData?.name ?? '',
        name_en: itemData?.name_en ?? '',
        start_date: itemData?.start_date ?? '',
        row_status: itemData?.row_status ?? 0,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<ITagLine> = async (data: ITagLine) => {
    try {
      if (itemId) {
        await updateTagline(itemId, data);
        updateSuccessMessage('menu.tagline');
        mutateTagline();
      } else {
        await createTagline(data);
        createSuccessMessage('menu.tagline');
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
          <IconSkill />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='menu.tagline' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='menu.tagline' />}}
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
        <Grid item xs={12}>
          <CustomTextInput
            required
            id='name'
            label={messages['common.name']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextInput
            id='name_en'
            label={messages['common.name_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomDateTimeField
            required
            id='start_date'
            label={messages['common.start_date']}
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
export default FourIRTagLineAddEditPopup;
