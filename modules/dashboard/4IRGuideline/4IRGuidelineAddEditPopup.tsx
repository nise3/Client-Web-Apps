import React, {FC, useEffect, useMemo, useState} from 'react';
import yup from '../../../@softbd/libs/yup';
import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {useIntl} from 'react-intl';

import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useFetchGuideline} from '../../../services/instituteManagement/hooks';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import {getAll4IROccupations} from '../../../services/4IRManagement/OccupationService';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {IGuideline} from '../../../shared/Interface/4IR.interface';
import {
  createGuideline,
  updateGuideline,
} from '../../../services/4IRManagement/GuidelineService';

interface FourIRGuideLineAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  four_ir_occupation_id: '',
  file_path: '',
  guideline_details: '',
  row_status: 1,
};

const FourIRGuideLineAddEditPopup: FC<FourIRGuideLineAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const isEdit = itemId != null;
  const [occupation, setOccupation] = useState<Array<any>>([]);
  const [isLoadingOccupation, setIsLoadingOccupation] =
    useState<boolean>(false);

  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const {
    data: itemData,
    isLoading,
    mutate: mutateGuideline,
  } = useFetchGuideline(itemId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      four_ir_occupation_id: yup
        .string()
        .trim()
        .required()
        .label(messages['menu.occupations'] as string),
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
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    setIsLoadingOccupation(true);
    (async () => {
      try {
        let response = await getAll4IROccupations({
          row_status: RowStatus.ACTIVE,
        });

        setIsLoadingOccupation(false);
        if (response && response?.data) {
          setOccupation(response.data);
        }
      } catch (e) {}
    })();
  }, []);

  useEffect(() => {
    if (itemData) {
      reset({
        four_ir_occupation_id: itemData?.four_ir_occupation_id,
        file_path: itemData?.file_path,
        guideline_details: itemData?.filguideline_detailse_path,
        row_status: itemData?.row_status,
      });
    } else reset(initialValues);
  }, [itemData]);

  const onSubmit: SubmitHandler<IGuideline> = async (data: IGuideline) => {
    try {
      if (itemId !== null) {
        await updateGuideline(itemId, data);
        updateSuccessMessage('4ir.guideline');
        mutateGuideline();
      } else {
        await createGuideline(data);
        createSuccessMessage('4ir.guideline');
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
              values={{subject: <IntlMessages id='4ir.guideline' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{
                subject: <IntlMessages id='4ir.guideline' />,
              }}
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
          <CustomFilterableFormSelect
            required
            id='four_ir_occupation_id'
            label={messages['menu.occupations']}
            isLoading={isLoadingOccupation}
            options={occupation}
            optionValueProp={'id'}
            optionTitleProp={['title', 'title_en']}
            control={control}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FileUploadComponent
            id='file_path'
            errorInstance={errors}
            setValue={setValue}
            register={register}
            sizeLimitText={'3MB'}
            label={messages['common.guideline_upload']}
            required={false}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <CustomTextInput
            id='guideline_details'
            label={messages['common.write_here']}
            register={register}
            errorInstance={errors}
            multiline
            rows={5}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default FourIRGuideLineAddEditPopup;
