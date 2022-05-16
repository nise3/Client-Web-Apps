import yup from '../../../@softbd/libs/yup';
import {Grid} from '@mui/material';
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
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';

import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {getAll4IROccupations} from '../../../services/4IRManagement/OccupationService';
import {IInitiative} from '../../../shared/Interface/4IR.interface';

import {useFetch4IInitiative} from '../../../services/4IRManagement/hooks';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import {
  createInitiative,
  updateInitiative,
} from '../../../services/4IRManagement/InitiativeService';
import FileUploadComponent from '../../filepond/FileUploadComponent';

interface ProjectAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  fourIRTaglineId: number;
  refreshDataTable: () => void;
}

const initialValues = {
  name: '',
  name_en: '',
  organization_name: '',
  organization_name_en: '',
  four_ir_occupation_id: '',
  start_date: '',
  budget: 0,
  designation: '',
  end_date: '',
  file_path: '',
  details: '',
  tasks: [],
  row_status: '1',
};

const FourIRInitiativeAddEditPopup: FC<ProjectAddEditPopupProps> = ({
  itemId,
  fourIRTaglineId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const isEdit = itemId != null;

  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const [tasks, setTasks] = useState<any>([]);
  const [occupation, setOccupation] = useState<Array<any>>([]);
  const [isLoadingOccupation, setIsLoadingOccupation] =
    useState<boolean>(false);

  const {
    data: itemData,
    isLoading,
    mutate: mutateInitiative,
  } = useFetch4IInitiative(itemId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      name: yup
        .string()
        .title()
        .label(messages['initiative.name'] as string),
      organization_name: yup
        .string()
        .required()
        .label(messages['common.organization_name'] as string),
      start_date: yup
        .string()
        .required()
        .label(messages['initiative.start_date'] as string),
      designation: yup
        .string()
        .required()
        .label(messages['common.designation'] as string),
      end_date: yup
        .string()
        .required()
        .label(messages['initiative.end_date'] as string),
      budget: yup
        .number()
        .positive()
        .label(messages['initiative.budget'] as string),
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
    setValue,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<IInitiative>({
    resolver: yupResolver(validationSchema),
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
        name: itemData?.name,
        name_en: itemData?.name_en,
        organization_name: itemData?.organization_name,
        organization_name_en: itemData?.organization_name_en,
        four_ir_occupation_id: itemData?.four_ir_occupation_id,
        start_date: itemData?.start_date,
        budget: itemData?.budget,
        details: itemData?.details,
        row_status: itemData?.row_status,
        designation: itemData?.designation,
        is_skill_provide: itemData?.is_skill_provide,
        end_date: itemData?.end_date,
        file_path: itemData?.file_path,
      });

      setTasks(tasks);
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<IInitiative> = async (data: IInitiative) => {
    try {
      data.tasks = tasks;

      if (itemId) {
        await updateInitiative(itemId, {
          four_ir_tagline_id: fourIRTaglineId,
          ...data,
        });
        updateSuccessMessage('4ir_initiative.label');
        mutateInitiative();
      } else {
        await createInitiative({
          four_ir_tagline_id: fourIRTaglineId,
          ...data,
        });
        createSuccessMessage('4ir_initiative.label');
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
              values={{subject: <IntlMessages id='4ir_initiative.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='4ir_initiative.label' />}}
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
            label={messages['initiative.name']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='name_en'
            label={messages['initiative.name_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='organization_name'
            label={messages['common.organization_name']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='organization_name_en'
            label={messages['common.organization_name_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
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
        <Grid item xs={12} sm={6} md={6}>
          <CustomTextInput
            required
            id='designation'
            label={messages['common.designation']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomDateTimeField
            required
            id='start_date'
            label={messages['initiative.start_date']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomDateTimeField
            required
            id='end_date'
            label={messages['initiative.end_date']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CustomTextInput
            id='details'
            label={messages['initiative.details']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={3}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='budget'
            label={messages['initiative.initiative_budget']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FileUploadComponent
            required={false}
            id='file_path'
            defaultFileUrl={itemData?.file_path}
            errorInstance={errors}
            setValue={setValue}
            register={register}
            label={messages['initiative.file_path']}
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
export default FourIRInitiativeAddEditPopup;
