import yup from '../../../@softbd/libs/yup';
import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo} from 'react';
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
import {useFetch4IROneProjectContribution} from '../../../services/4IRManagement/hooks';
import {createOrUpdateContribution} from '../../../services/4IRManagement/ContributionServies';
import TextEditor from '../../../@softbd/components/editor/TextEditor';

interface ContributionAddEditPopupProps {
  initiativeId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
  memberId: number;
}

const initialValues = {
  contribution: '',
};

const FourIRContributionAddEditPopup: FC<ContributionAddEditPopupProps> = ({
  initiativeId,
  refreshDataTable,
  memberId,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const isEdit = initiativeId != null;

  const {data: itemData, isLoading} =
    useFetch4IROneProjectContribution(memberId);

  const {updateSuccessMessage} = useSuccessMessage();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      contribution: yup
        .string()
        .required()
        .label(messages['common.file'] as string),
    });
  }, [messages]);

  const {
    // control,
    register,
    reset,
    setError,
    clearErrors,
    setValue,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      let data: any = {
        contribution: itemData?.contribution?.contribution,
      };
      reset(data);
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
      let payload = {
        four_ir_initiative_id: initiativeId,
        ...data,
      };
      if (initiativeId) {
        await createOrUpdateContribution(payload);
        updateSuccessMessage('4IR.contribution');
        // mutateContribution();
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
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='4IR.contribution' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='4IR.contribution' />}}
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
        <Grid item xs={12} md={12}>
          <TextEditor
            id={'contribution'}
            label={messages['common.contributions']}
            errorInstance={errors}
            value={itemData?.contribution?.contribution}
            height={'300px'}
            key={1}
            register={register}
            setValue={setValue}
            clearErrors={clearErrors}
            setError={setError}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default FourIRContributionAddEditPopup;
