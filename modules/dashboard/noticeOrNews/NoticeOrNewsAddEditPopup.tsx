import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {useFetchNoticeOrNews} from '../../../services/cmsManagement/hooks';
import yup from '../../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {
  createNoticeOrNews,
  updateNoticeOrNews,
} from '../../../services/cmsManagement/NoticeOrNewsService';
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

interface NoticeOrNewsAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const type = [
  {
    id: 1,
    label: 'Notice',
  },
  {
    id: 2,
    label: 'News',
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

const initialValues = {
  type: '',
  title: '',
  institute_id: '',
  organization_id: '',
  details: '',
  main_image_path: '',
  grid_image_path: '',
  thumb_image_path: '',
  file_path: '',
  image_alt_title: '',
  show_in: '',
  file_alt_title: '',
  row_status: '',
  other_language_fields: '',
};

const NoticeOrNewsAddEditPopup: FC<NoticeOrNewsAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const isEdit = itemId != null;
  const textEditorRef = useRef<any>(null);

  const {
    data,
    isLoading: noticeIsLoading,
    mutate: mutateNoticeOrNews,
  } = useFetchNoticeOrNews(itemId);

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
      type: yup
        .string()
        .required()
        .label(messages['common.type'] as string),
      show_in: yup
        .string()
        .required()
        .label(messages['common.show_in'] as string),
    });
  }, [itemId, messages]);

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
    if (data) {
      reset({
        type: data?.type,
        title: data?.title,
        institute_id: data?.institute_id,
        organization_id: data?.organization_id,
        details: data?.details,
        main_image_path: data?.main_image_path,
        grid_image_path: data?.grid_image_path,
        thumb_image_path: data?.thumb_image_path,
        file_path: data?.file_path,
        image_alt_title: data?.image_alt_title,
        show_in: data?.show_in,
        file_alt_title: data?.file_alt_title,
        row_status: data?.row_status,
        other_language_fields: data?.other_language_fields,
      });
    } else {
      reset(initialValues);
    }
  }, [data, reset]);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    data.itemId = data.itemId ? data.itemId : null;
    data.other_language_fields = '';

    data.details = textEditorRef.current?.editor?.getContent();

    data.main_image_path = 'http://lorempixel.com/400/200/';
    data.thumb_image_path = 'http://lorempixel.com/400/200/';
    data.grid_image_path = 'http://lorempixel.com/400/200/';

    try {
      if (itemId) {
        await updateNoticeOrNews(itemId, data);
        updateSuccessMessage('common.notice_or_news');
        mutateNoticeOrNews();
      } else {
        await createNoticeOrNews(data);
        createSuccessMessage('common.notice_or_news');
        mutateNoticeOrNews();
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
                subject: <IntlMessages id='common.notice_or_news' />,
              }}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{
                subject: <IntlMessages id='common.notice_or_news' />,
              }}
            />
          )}
        </>
      }
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={noticeIsLoading} />
          <SubmitButton
            isSubmitting={isSubmitting}
            isLoading={noticeIsLoading}
          />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <CustomTextInput
            required
            id='title'
            label={messages['common.title']}
            control={control}
            register={register}
            errorInstance={errors}
            isLoading={noticeIsLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            required
            isLoading={false}
            id='type'
            label={messages['common.type']}
            control={control}
            options={type}
            optionValueProp={'id'}
            optionTitleProp={['label']}
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
          <CustomTextInput
            id='main_image_path'
            label={messages['common.main_image_path']}
            control={control}
            register={register}
            errorInstance={errors}
            isLoading={noticeIsLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='grid_image_path'
            label={messages['common.grid_image_path']}
            control={control}
            register={register}
            errorInstance={errors}
            isLoading={noticeIsLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='thumb_image_path'
            label={messages['common.thumb_image_path']}
            control={control}
            register={register}
            errorInstance={errors}
            isLoading={noticeIsLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='file_path'
            label={messages['common.file_path']}
            control={control}
            register={register}
            errorInstance={errors}
            isLoading={noticeIsLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='image_alt_title'
            label={messages['common.image_alt_title']}
            control={control}
            register={register}
            errorInstance={errors}
            isLoading={noticeIsLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='file_alt_title'
            label={messages['common.file_alt_title']}
            control={control}
            register={register}
            errorInstance={errors}
            isLoading={noticeIsLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <FormRowStatus
            id='row_status'
            control={control}
            defaultValue={initialValues.row_status}
            isLoading={noticeIsLoading}
          />
        </Grid>
        {/*<Grid item xs={6}>*/}
        {/*  <CustomTextInput*/}
        {/*    id='details'*/}
        {/*    label={messages['common.details']}*/}
        {/*    control={control}*/}
        {/*    register={register}*/}
        {/*    errorInstance={errors}*/}
        {/*    isLoading={noticeIsLoading}*/}
        {/*  />*/}
        {/*</Grid>*/}
        <Grid item xs={12}>
          <TextEditor
            ref={textEditorRef}
            initialValue={''}
            height={'300px'}
            key={1}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default NoticeOrNewsAddEditPopup;
