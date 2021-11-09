import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {useFetchRecentActivity} from '../../../services/cmsManagement/hooks';
import yup from '../../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  createRecentActivities,
  updateRecentActivity,
} from '../../../services/cmsManagement/RecentActivityService';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {Grid} from '@mui/material';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {useFetchOrganizations} from '../../../services/organaizationManagement/hooks';
import {useFetchInstitutes} from '../../../services/instituteManagement/hooks';
import TextEditor from '../../../@softbd/components/editor/TextEditor';

interface RecentActivitiesAddEditPopupProps {
  recentActivityId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const contentType = [
  {
    id: 1,
    label: 'Image',
  },
  {
    id: 2,
    label: 'Video',
  },
  {
    id: 3,
    label: 'Youtube Source',
  },
];

const showIn = [
  {
    id: 1,
    label: 'Nise3',
  },
  {
    id: 2,
    label: 'Youth',
  },
  {
    id: 3,
    label: 'TSP',
  },
  {
    id: 4,
    label: 'Industry',
  },
];

const collagePosition = [
  {
    id: 1,
    label: '1.1',
  },
  {
    id: 2,
    label: '1.2.1',
  },
  {
    id: 2,
    label: '1.2.2.1',
  },
  {
    id: 4,
    label: '1.2.2.2',
  },
];

const initialValues = {
  title: '',
  institute_id: '',
  organization_id: '',
  show_in: '',
  description: '',
  content_type: '',
  collage_image_path: '',
  collage_position: '',
  thumb_image_path: '',
  grid_image_path: '',
  image_alt_title: '',
  content_path: '',
  content_properties: '',
  embedded_id: '',
  embedded_url: '',
  row_status: '1',
  other_language_fields: {},
};

const RecentActivitiesAddEditPopup: FC<RecentActivitiesAddEditPopupProps> = ({
  recentActivityId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const isEdit = recentActivityId != null;
  const textEditorRef = useRef<any>(null);

  const {
    data: recentActivityItem,
    isLoading,
    mutate: mutateRecentActivity,
  } = useFetchRecentActivity(recentActivityId);

  const [organizationFilters] = useState({row_status: RowStatus.ACTIVE});
  const {data: organizations, isLoading: isLoadingOrganizations} =
    useFetchOrganizations(organizationFilters);

  const [instituteFilters] = useState({row_status: RowStatus.ACTIVE});
  const {data: institutes, isLoading: isLoadingInstitutes} =
    useFetchInstitutes(instituteFilters);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title()
        .required()
        .label(messages['common.title'] as string),
      content_type: yup
        .string()
        .required()
        .label(messages['common.content_type'] as string),
      show_in: yup
        .string()
        .required()
        .label(messages['common.show_in'] as string),
    });
  }, [recentActivityId, messages]);

  const {
    register,
    control,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (recentActivityItem) {
      reset({
        title: recentActivityItem?.title,
        institute_id: recentActivityItem?.institute_id,
        organization_id: recentActivityItem?.organization_id,
        show_in: recentActivityItem?.show_in,
        description: recentActivityItem?.description,
        content_type: recentActivityItem?.content_type,
        collage_image_path: recentActivityItem?.collage_image_path,
        collage_position: recentActivityItem?.collage_position,
        thumb_image_path: recentActivityItem?.thumb_image_path,
        grid_image_path: recentActivityItem?.grid_image_path,
        image_alt_title: recentActivityItem?.image_alt_title,
        content_path: recentActivityItem?.content_path,
        content_properties: recentActivityItem?.content_properties,
        embedded_id: recentActivityItem?.embedded_id,
        embedded_url: recentActivityItem?.embedded_url,
        row_status: recentActivityItem?.row_status,
        other_language_fields: recentActivityItem?.other_language_fields,
      });
    } else {
      reset(initialValues);
    }
  }, [recentActivityItem, reset]);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    data.recentActivityId = data.recentActivityId
      ? data.recentActivityId
      : null;

    data.other_language_fields = '';

    data.description = textEditorRef.current?.editor?.getContent();

    data.collage_image_path = 'http://lorempixel.com/400/200/';
    data.thumb_image_path = 'http://lorempixel.com/400/200/';
    data.grid_image_path = 'http://lorempixel.com/400/200/';

    try {
      if (recentActivityId) {
        await updateRecentActivity(recentActivityId, data);
        updateSuccessMessage('recent_activities.institute');
        mutateRecentActivity();
      } else {
        await createRecentActivities(data);
        createSuccessMessage('recent_activities.institute');
        mutateRecentActivity();
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
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{
                subject: <IntlMessages id='recent_activities.institute' />,
              }}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{
                subject: <IntlMessages id='recent_activities.institute' />,
              }}
            />
          )}
        </>
      }
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <CustomTextInput
            id='title'
            label={messages['common.title']}
            control={control}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='institute_id'
            label={messages['institute.label']}
            isLoading={isLoadingInstitutes}
            control={control}
            options={institutes}
            optionValueProp='id'
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
          />
        </Grid>
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
        <Grid item xs={6}>
          <CustomFormSelect
            required
            isLoading={false}
            id='show_in'
            label={messages['common.show_in']}
            control={control}
            options={showIn}
            optionValueProp={'id'}
            optionTitleProp={['label']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            required
            id='content_type'
            isLoading={false}
            label={messages['common.content_type']}
            control={control}
            options={contentType}
            optionValueProp={'id'}
            optionTitleProp={['label']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='collage_image_path'
            label={messages['common.collage_image_path']}
            control={control}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='collage_position'
            label={messages['common.collage_position']}
            isLoading={false}
            control={control}
            options={collagePosition}
            optionValueProp={'label'}
            optionTitleProp={['label']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='thumb_image_path'
            label={messages['common.thumb_image_path']}
            control={control}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='grid_image_path'
            label={messages['common.grid_image_path']}
            control={control}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            required
            id='image_alt_title'
            label={messages['common.image_alt_title']}
            control={control}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='content_path'
            label={messages['common.content_path']}
            control={control}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='content_properties'
            label={messages['common.content_properties']}
            control={control}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='embedded_id'
            label={messages['common.embedded_id']}
            control={control}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='embedded_url'
            label={messages['common.embedded_url']}
            control={control}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <FormRowStatus
            id='row_status'
            control={control}
            defaultValue={initialValues.row_status}
            isLoading={isLoading}
          />
        </Grid>
        {/*<Grid item xs={6}>
          <CustomTextInput
            id='description'
            label={messages['common.description']}
            control={control}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>*/}
        <Grid item xs={12}>
          <TextEditor
            ref={textEditorRef}
            initialValue={initialValues.description}
            height={'300px'}
            key={1}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default RecentActivitiesAddEditPopup;
