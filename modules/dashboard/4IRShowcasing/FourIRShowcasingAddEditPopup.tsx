import React, {useEffect, useMemo, useState} from 'react';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {Grid} from '@mui/material';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import yup from '../../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useIntl} from 'react-intl';
import CustomTimePicker from '../../../@softbd/elements/input/TimePicker';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';

import {useFetchTagline} from '../../../services/organaizationManagement/hooks';
import {getAllInitiatives} from '../../../services/4IRManagement/InitiativeService';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import {useFetchShowcase} from '../../../services/instituteManagement/hooks';
import {
  createShowcasing,
  updateShowcasing,
} from '../../../services/4IRManagement/ShowcasingServices';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';

const initiativeValues = {
  four_ir_initiative_id: '',
  organization_name: '',
  organization_name_en: '',
  invite_other_organization: '',
  invite_other_organization_en: '',
  venue: '',
  start_time: '',
  end_time: '',
  event_description: '',
  file_path: '',
  row_status: '1',
};

interface Props {
  onClose: () => void;
  itemId: number | null;
  fourIRInitiativeId: number;
  refreshDataTable: () => void;
}

const FourIRShowcasingAddEditPopUP = ({
  itemId,
  fourIRInitiativeId,
  refreshDataTable,
  ...props
}: Props) => {
  const isEdit = itemId != null;

  const {errorStack} = useNotiStack();
  const {messages} = useIntl();

  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      four_ir_initiative_id: yup
        .string()
        .required()
        .label(messages['showcasing.initiative_name'] as string),
      organization_name: yup
        .string()
        .title('bn', true, messages['common.special_character_error'] as string)
        .label(messages['common.organization_name'] as string),
      organization_name_en: yup
        .string()
        .title(
          'en',
          false,
          messages['common.special_character_error'] as string,
        )
        .label(messages['common.organization_name_en'] as string)
        .nullable(),
      invite_other_organization: yup
        .string()
        .required()
        .label(messages['showcasing.invite_other_organization'] as string),
      invite_other_organization_en: yup
        .string()
        .label(messages['showcasing.invite_other_organization_en'] as string)
        .nullable(),
      venue: yup
        .string()
        .required()
        .label(messages['common.venue'] as string),
      start_time: yup
        .string()
        .required()
        .label(messages['common.start_time'] as string),
      end_time: yup
        .string()
        .required()
        .label(messages['common.end_time'] as string),
      event_description: yup
        .string()
        .label(messages['common.event_description'] as string)
        .nullable(),
      file_path: yup
        .string()
        .label(messages['common.file_path'] as string)
        .nullable(),
    });
  }, [messages]);

  const {data: taglineData, isLoading: isTaglineLoading} = useFetchTagline();

  const [selectedTagline, setSelectedTagline] = useState<number | null>(null);
  const [isInitativeLoading, setIsInitiativeLoading] = useState<boolean>(false);
  const [initiativeData, setInitiativeData] = useState<any>([]);
  // const [selectedInitiative, setSelectedInitative] = useState<number | null>(
  //   null,
  // );

  const onTaglineChangeHandler = (option: number | null) => {
    setSelectedTagline(option);
  };

  useEffect(() => {
    if (!selectedTagline) {
      setInitiativeData([]);
      return;
    }
    const fetchInitiative = async () => {
      setIsInitiativeLoading(true);
      const response = await getAllInitiatives({
        four_ir_tagline_id: selectedTagline,
      });
      setInitiativeData(response.data);
      setIsInitiativeLoading(false);
    };
    fetchInitiative();
  }, [selectedTagline]);

  const {
    data: itemData,
    isLoading,
    mutate: mutateShowcasing,
  } = useFetchShowcase(itemId);

  useEffect(() => {
    if (itemData) {
      reset({
        four_ir_initiative_id: itemData?.four_ir_initiative_id,
        organization_name: itemData?.organization_name,
        organization_name_en: itemData?.organization_name_en,
        invite_other_organization: itemData?.invite_other_organization,
        invite_other_organization_en: itemData?.invite_other_organization_en,
        venue: itemData?.venue,
        start_time: itemData?.start_time,
        end_time: itemData?.end_time,
        event_description: itemData?.event_description,
        file_path: itemData?.file_path,
        row_status: itemData?.row_status,
      });
    } else {
      reset(initiativeValues);
    }
  }, [itemData]);

  const {
    control,
    register,
    setValue,
    reset,
    setError,
    handleSubmit,
    formState: {errors},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      if (isEdit) {
        await updateShowcasing(itemId, data);
        updateSuccessMessage('4ir_showcasing.label');
        mutateShowcasing();
      } else {
        await createShowcasing(data);
        createSuccessMessage('4ir_showcasing.label');
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
              values={{subject: <IntlMessages id='4ir_showcasing.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{
                subject: <IntlMessages id='4ir_showcasing.label' />,
              }}
            />
          )}
        </>
      }
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={false} />
          <SubmitButton isSubmitting={isLoading} isLoading={isLoading} />
        </>
      }>
      <Grid container spacing={5} mt={1}>
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            required
            id='four_ir_tagline_id'
            label={messages['menu.tagline']}
            isLoading={isTaglineLoading}
            options={taglineData}
            optionValueProp={'id'}
            optionTitleProp={['name']}
            control={control}
            errorInstance={errors}
            onChange={onTaglineChangeHandler}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            required
            id='four_ir_initiative_id'
            label={messages['menu.initiative']}
            isLoading={isInitativeLoading}
            options={initiativeData}
            optionValueProp={'id'}
            optionTitleProp={['name']}
            control={control}
            errorInstance={errors}
            // onChange={onInitiativeChangeHandler}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='organization_name'
            label={messages['common.organization_name']}
            register={register}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='organization_name_en'
            label={messages['common.organization_name_en']}
            register={register}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='invite_other_organization'
            label={messages['showcasing.invite_other_organization']}
            register={register}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='invite_other_organization_en'
            label={messages['showcasing.invite_other_organization_en']}
            register={register}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={3}>
          <CustomTimePicker
            required
            id='start_time'
            label={messages['common.start_time']}
            register={register}
          />
        </Grid>
        <Grid item xs={3}>
          <CustomTimePicker
            required
            id='end_time'
            label={messages['common.end_time']}
            register={register}
          />
        </Grid>

        {/* //  info: date is not in design    */}
        {/**/}
        {/*<Grid item xs={12} md={6}>*/}
        {/*  <CustomDateTimeField*/}
        {/*    id='date'*/}
        {/*    label={messages['common.date']}*/}
        {/*    register={register}*/}
        {/*    errorInstance={errors}*/}
        {/*    //isLoading={isLoading}*/}
        {/*  />*/}
        {/*</Grid>*/}

        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='venue'
            label={messages['common.venue']}
            register={register}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='event_description'
            label={messages['common.event_description']}
            register={register}
            errorInstance={errors}
            multiline={true}
            rows={3}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FileUploadComponent
            id='file_path'
            defaultFileUrl={itemData?.file_path}
            errorInstance={errors}
            setValue={setValue}
            register={register}
            sizeLimitText={'3MB'}
            label={messages['common.file_upload']}
            required={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormRowStatus
            id='row_status'
            control={control}
            defaultValue={itemData?.row_status || initiativeValues.row_status}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default FourIRShowcasingAddEditPopUP;
