import yup from '../../../@softbd/libs/yup';
import Grid from '@mui/material/Grid';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {WorkOutline} from '@mui/icons-material';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {
  useFetchJobSector,
  useFetchOrganizations,
} from '../../../services/organaizationManagement/hooks';
import {useIntl} from 'react-intl';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {
  createSlider,
  updateSlider,
} from '../../../services/cmsManagement/SliderService';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {useFetchInstitutes} from '../../../services/instituteManagement/hooks';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';

interface SliderAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title_en: '',
  title: '',
  sub_title: '',
  link: '',
  button_text: '',
  alt_title: '',
  is_button_available: '1',
  row_status: '1',
};

const SliderAddEditPopup: FC<SliderAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const isEdit = itemId != null;
  const authUser = useAuthUser();

  const {
    data: itemData,
    isLoading,
    mutate: mutateJobSector,
  } = useFetchJobSector(itemId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title()
        .label(messages['common.title'] as string),
      sub_title: yup
        .string()
        .required()
        .label(messages['common.sub_title'] as string),
      institute_id: yup.string(),
      organization_id: yup.string(),
      is_button_available: yup
        .string()
        .required()
        .label('common.is_button_available'),
      link: yup.string(),
      button_text: yup.string(),
      slider_images: yup.string().required().label('common.slider_images'),
      alt_title: yup.string(),
      row_status: yup.string().trim().required(),
    });
  }, [messages]);
  const {
    register,
    reset,
    control,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const [organizationFilters] = useState({row_status: RowStatus.ACTIVE});
  const [instituteFilters] = useState({row_status: RowStatus.ACTIVE});

  const {data: organizations, isLoading: isLoadingOrganizations} =
    useFetchOrganizations(organizationFilters);

  const {data: institutes, isLoading: isLoadingInstitutes} =
    useFetchInstitutes(instituteFilters);

  useEffect(() => {
    if (itemData) {
      reset({
        title: itemData?.title,
        sub_title: itemData?.sub_title,
        organization_id: itemData?.organization_id,
        institute_id: itemData?.institute_id,
        is_button_available: itemData?.is_button_available,
        button_text: itemData?.button_text,
        link: itemData?.link,
        alt_title: itemData?.alt_title,
        row_status: String(itemData?.row_status),
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<JobSector> = async (data: any) => {
    try {
      if (itemId) {
        await updateSlider(itemId, data);
        updateSuccessMessage('slider.label');
        mutateJobSector();
      } else {
        await createSlider(data);
        createSuccessMessage('slider.label');
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
          <WorkOutline />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='slider.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='slider.label' />}}
            />
          )}
        </>
      }
      maxWidth={'md'}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
        </>
      }>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CustomTextInput
            required
            id='title'
            label={messages['common.title']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='sub_title'
            label={messages['common.sub_title']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        {authUser && authUser.isSystemUser && (
          <Grid item xs={6}>
            <CustomFormSelect
              id='organization_id'
              label={messages['organization.label']}
              isLoading={isLoadingOrganizations}
              control={control}
              options={organizations}
              optionValueProp={'id'}
              optionTitleProp={['title_en', 'title']}
              errorInstance={errors}
            />
          </Grid>
        )}

        {authUser && authUser.isSystemUser && (
          <Grid item xs={6}>
            <CustomFormSelect
              id='institute_id'
              label={messages['institute.label']}
              isLoading={isLoadingInstitutes}
              control={control}
              options={institutes}
              optionValueProp={'id'}
              optionTitleProp={['title_en', 'title']}
              errorInstance={errors}
            />
          </Grid>
        )}

        <Grid item xs={6}>
          <FormRadioButtons
            id='is_button_available'
            label={'common.is_button_available'}
            control={control}
            radios={[
              {
                label: messages['common.yes'],
                key: 1,
              },
              {
                label: messages['common.no'],
                key: 2,
              },
            ]}
            defaultValue={initialValues.is_button_available}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            id='link'
            label={messages['common.link']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            id='button_text'
            label={messages['common.button_text']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            id='alt_title'
            label={messages['common.alt_title']}
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

export default SliderAddEditPopup;
