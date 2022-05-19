import yup from '../../../@softbd/libs/yup';
import {Grid, Typography} from '@mui/material';
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
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';

import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {
  useFetch4IRCBLM,
  useFetch4IRSectors,
} from '../../../services/4IRManagement/hooks';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import {MOBILE_NUMBER_REGEX} from '../../../@softbd/common/patternRegex';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import SuccessPopup from '../../../@softbd/modals/SuccessPopUp/SuccessPopUp';
import CustomExpertFieldArray from '../4IRCS/CustomExpertFieldArray';
import {
  createCBLM,
  updateCBLM,
} from '../../../services/4IRManagement/CBLMServices';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import TextEditor from '../../../@softbd/components/editor/TextEditor';

interface CBLMAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  fourIRInitiativeId: number | string;
  refreshDataTable: () => void;
}

const initialValues = {
  experts: [{}],
  approved_by: '',
  approve_date: '',
  developed_organization_name: '',
  developed_organization_name_en: '',
  sector_name: '',
  supported_organization_name: '',
  supported_organization_name_en: '',
  comments: '',
  file_path: '',
  row_status: 1,
};

const FourIRContributionAddEditPopup: FC<CBLMAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  fourIRInitiativeId,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const isEdit = itemId != null;

  const [showSuccessPopUp, setShowSuccessPopUp] = useState<boolean>(false);
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const {
    data: itemData,
    isLoading,
    mutate: mutateCBLM,
  } = useFetch4IRCBLM(itemId);
  // const {data: sectors, isLoading: isLoadingSectors} = useFetch4IRSectors();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      contribution: yup
        .string()
        .trim()
        .required()
        .label(messages['common.file'] as string),
    });
  }, [messages]);

  const {
    control,
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
        approved_by: itemData?.contributon,
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
        four_ir_initiative_id: fourIRInitiativeId,
        ...data,
      };

      if (itemId) {
        await updateCBLM(itemId, payload);
        updateSuccessMessage('4ir.CBLM');
        mutateCBLM();
        await closeAction();
      } else {
        await createCBLM(payload);
        createSuccessMessage('4ir.CBLM');
        setShowSuccessPopUp(true);
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
              values={{subject: <IntlMessages id='common.contributions' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='common.contributions' />}}
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
            label={messages['common.contribution']}
            errorInstance={errors}
            value={itemData?.content}
            height={'300px'}
            key={1}
            register={register}
            setValue={setValue}
            clearErrors={clearErrors}
            setError={setError}
          />
        </Grid>
        <Grid item xs={12}>
          <FormRowStatus
            id='row_status'
            control={control}
            defaultValue={initialValues?.row_status}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default FourIRContributionAddEditPopup;
