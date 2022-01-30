import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo} from 'react';
import HookFormMuiModal from '../../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import SubmitButton from '../../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import yup from '../../../../@softbd/libs/yup';
import {processServerSideErrors} from '../../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../../@softbd/hooks/useSuccessMessage';
import IconHumanResourceDemand from '../../../../@softbd/icons/HumanResourceDemand';
import {approveJobRequirement} from '../../../../services/IndustryManagement/HrDemandService';
import CustomTextInput from '../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';

interface JobRequirementApprovedByIndustryAssociationProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  vacancy_approved_by_industry_association: '',
};

const JobRequirementApproveByIndustryAssocPopUp: FC<
  JobRequirementApprovedByIndustryAssociationProps
> = ({itemId, refreshDataTable, ...props}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {updateSuccessMessage} = useSuccessMessage();
  const isEdit = itemId != null;

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      vacancy_approved_by_industry_association: yup
        .string()
        .trim()
        .required()
        .label(messages['organization.label'] as string),
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

  useEffect(() => {
    reset(initialValues);
  }, []);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      if (itemId) {
        await approveJobRequirement(itemId, data);
        updateSuccessMessage('job_requirement.label');
      }

      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({
        error,
        setError,
        validationSchema,
        errorStack,
      });
    }
  };

  return (
    <HookFormMuiModal
      {...props}
      open={true}
      title={
        <>
          <IconHumanResourceDemand />
          {isEdit && (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='common.vacancy_approval' />}}
            />
          )}
        </>
      }
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <SubmitButton isSubmitting={isSubmitting} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id={'vacancy_approved_by_industry_association'}
            label={messages['common.approved_vacancy']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default JobRequirementApproveByIndustryAssocPopUp;
