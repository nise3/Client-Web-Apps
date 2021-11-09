import yup from '../../../@softbd/libs/yup';
import Grid from '@mui/material/Grid';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
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

interface StaticPageAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title: '',
  sub_title: '',
  show_in: '',
  content_slug_or_id: '',
  institute_id: '',
  organization_id: '',
  organization_association_id: '',
  content_type: '',
  contents: '',
  row_status: '1',
};

const StaticPageAddEditPopup: FC<StaticPageAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const isEdit = itemId != null;
  const authUser = useAuthUser();
  const [selectedModule, setSelectedModule] = useState<number | null>(null);

  const {
    data: itemData,
    isLoading,
    mutate: mutateJobSector,
  } = useFetchJobSector(itemId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      show_in: yup
        .string()
        .required()
        .label(messages['common.show_in'] as string),
      content_slug_or_id: yup
        .string()
        .required()
        .label(messages['common.content_slug_or_id'] as string),
      title: yup
        .string()
        .title()
        .label(messages['common.title'] as string),
      sub_title: yup.string(),
      institute_id: yup
        .string()
        .label(messages['common.institute'] as string)
        .when('show_in', {
          is: (val: number) => {
            return val == 3;
          },
          then: yup.string().required(),
        }),
      organization_id: yup
        .string()
        .label(messages['common.organization_bn'] as string)
        .when('show_in', {
          is: (val: number) => {
            return val == 4;
          },
          then: yup.string().required(),
        }),
      organization_association_id: yup.string(),
      content_type: yup
        .string()
        .required()
        .label(messages['common.content_type'] as string),
      contents: yup.string(),
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
        show_in: itemData?.show_in,
        content_slug_or_id: itemData?.content_slug_or_id,
        title_en: itemData?.title_en,
        sub_title: itemData?.sub_title,
        organization_id: itemData?.organization_id,
        institute_id: itemData?.institute_id,
        content_type: itemData?.content_type,
        content: itemData?.content,
        organization_association: itemData?.organization_association,
        row_status: String(itemData?.row_status),
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const MODULES = useMemo(
    () => [
      {id: 1, title: 'NISE3', title_en: 'NISE3'},
      {id: 2, title: 'Youth', title_en: 'Youth'},
      {id: 3, title: 'TSP', title_en: 'TSP'},
      {id: 4, title: 'Industry', title_en: 'Industry'},
      {id: 5, title: 'Industry Association', title_en: 'Industry Association'},
    ],
    [],
  );

  const CONTENT_TYPES = useMemo(
    () => [
      {id: 1, title: 'Image', title_en: 'Image'},
      {id: 2, title: 'Video', title_en: 'Video'},
      {id: 3, title: 'Youtube', title_en: 'Youtube'},
    ],
    [],
  );

  const onchangeModule = useCallback((moduleId: number | null) => {
    setSelectedModule(moduleId);
  }, []);

  const onSubmit: SubmitHandler<JobSector> = async (data: JobSector) => {
    try {
      if (itemId) {
        await updateSlider(itemId, data);
        updateSuccessMessage('static_page.label');
        mutateJobSector();
      } else {
        await createSlider(data);
        createSuccessMessage('static_page.label');
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
              values={{subject: <IntlMessages id='static_page.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='static_page.label' />}}
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
          <CustomFormSelect
            id='show_in'
            label={messages['common.show_in']}
            control={control}
            isLoading={false}
            options={MODULES}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
            onChange={onchangeModule}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            required
            id='content_slug_or_id'
            label={messages['common.content_slug_or_id']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

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

        {authUser && authUser.isSystemUser && selectedModule == 4 && (
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

        {authUser && authUser.isSystemUser && selectedModule == 3 && (
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
          <CustomTextInput
            id='organization_association_id'
            label={messages['organization_association.label']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomFormSelect
            id='content_type'
            label={messages['common.content_type']}
            isLoading={isLoading}
            control={control}
            options={CONTENT_TYPES}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            id='contents'
            label={messages['common.contents']}
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

export default StaticPageAddEditPopup;
