import React, {FC, useEffect, useMemo, useState} from 'react';
import IconBranch from '../../../@softbd/icons/IconBranch';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import {SubmitHandler, useForm} from 'react-hook-form';
import Grid from '@mui/material/Grid';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {useFetchTrainers} from '../../../services/instituteManagement/hooks';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import {useIntl} from 'react-intl';
import {Division} from '../../../shared/Interface/location.interface';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {createAssignAssessor} from '../../../services/CertificateAuthorityManagement/CABatchService';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import {yupResolver} from '@hookform/resolvers/yup';
import yup from '../../../@softbd/libs/yup';

interface CABatchManagePopupProps {
  onClose: () => void;
  itemId: number | string | null;
  refreshDataTable: () => void;
}
const CaBatchManagePopup: FC<CABatchManagePopupProps> = ({
  onClose,
  itemId,
  refreshDataTable,
  ...props
}) => {
  const authUser = useAuthUser();
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage} = useSuccessMessage();
  const [assessorFilter, setAssessorFilter] = useState<any>(null);
  const {data: assessors, isLoading: isLoadingAssessors} =
    useFetchTrainers(assessorFilter);

  useEffect(() => {
    if (authUser) {
      setAssessorFilter({
        institute_id: authUser?.institute_id,
        service_type: 2,
      });
    }
  }, [authUser]);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      assessor_id: yup
        .string()
        .trim()
        .required()
        .label(messages['common.assessor'] as string),
      assessment_date: yup
        .string()
        .trim()
        .required()
        .label(messages['common.exam_date'] as string),
    });
  }, []);

  const onSubmit: SubmitHandler<Division> = async (data: any) => {
    try {
      await createAssignAssessor(itemId, data);
      createSuccessMessage('common.assign_assessor');
      onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({error, setError, errorStack});
    }
  };

  const {
    control,
    handleSubmit,
    setError,
    register,
    formState: {errors, isSubmitting},
  } = useForm<any>({resolver: yupResolver(validationSchema)});
  return (
    <HookFormMuiModal
      open={true}
      onClose={onClose}
      {...props}
      title={
        <>
          <IconBranch />

          <IntlMessages
            id='common.add_new'
            values={{subject: <IntlMessages id='common.assign_assessor' />}}
          />
        </>
      }
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={onClose} />
          <SubmitButton isSubmitting={isSubmitting} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <CustomFilterableFormSelect
            required
            id={'assessor_id'}
            label={messages['common.assessor']}
            isLoading={isLoadingAssessors}
            control={control}
            options={assessors}
            optionValueProp={'id'}
            optionTitleProp={['trainer_name']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomDateTimeField
            required
            id='assessment_date'
            label={messages['common.exam_date']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default CaBatchManagePopup;
