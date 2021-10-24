import yup from '../../../@softbd/libs/yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {useIntl} from 'react-intl';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {
  isResponseSuccess,
  isValidationError,
} from '../../../@softbd/utilities/helpers';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import {
  useFetchHumanResource,
  useFetchHumanResources,
  useFetchOrganizationUnit,
  useFetchRanks,
} from '../../../services/organaizationManagement/hooks';
import {
  createHumanResource,
  updateHumanResource,
} from '../../../services/organaizationManagement/HumanResourceService';
import IconHumanResource from '../../../@softbd/icons/IconHumanResource';
import {setServerValidationErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {Grid} from '@mui/material';
import RowStatus from '../../../@softbd/utilities/RowStatus';

interface HumanResourceAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
  isEdit: boolean;
  organizationUnitId: number;
}

const initialValues = {
  title_en: '',
  title: '',
  organization_id: '',
  parent_id: '',
  rank_id: '',
  display_order: '',
  is_designation: '2',
  organization_unit_id: '',
  status: '1',
  row_status: '1',
};

const HumanResourceAddEditPopup: FC<HumanResourceAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  isEdit,
  organizationUnitId: orgUnitId,
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title()
        .label(messages['common.title'] as string),
      organization_id: yup
        .string()
        .trim()
        .required()
        .label(messages['organization.label'] as string),
      organization_unit_id: yup
        .string()
        .required()
        .label(messages['organization_unit_type.label'] as string),
      display_order: yup
        .string()
        .required()
        .label(messages['organization.label'] as string),
      is_designation: yup
        .string()
        .required()
        .label(messages['human_resource_template.is_designation'] as string),
    });
  }, [messages]);
  const {
    control,
    register,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<HumanResource>({
    resolver: yupResolver(validationSchema),
  });

  const [organization, setOrganization] = useState<any | {}>({});
  const [organizationUnit, setOrganizationUnit] = useState<any | {}>({});
  const [organizationUnitId, setOrganizationUnitId] = useState<number | null>(
    null,
  );
  const {
    data: humanResourceData,
    isLoading: isHumanResourceLoading,
    mutate: mutateHumanResource,
  } = useFetchHumanResource(itemId);

  const {data: organizationUnitData, isLoading: isOrganizationUnitLoading} =
    useFetchOrganizationUnit(orgUnitId);
  const [rankFilter] = useState({
    row_status: RowStatus.ACTIVE,
  });
  const [humanResourceFilter] = useState({
    row_status: RowStatus.ACTIVE,
  });
  const {data: ranks, isLoading: isRanksLoading} = useFetchRanks(rankFilter);
  const {data: humanResources, isLoading: isHumanResourcesLoading} =
    useFetchHumanResources(humanResourceFilter);

  useEffect(() => {
    if (isEdit && humanResourceData) {
      //edit action setup
      setOrganizationUnitId(humanResourceData.organization_unit_type_id);
      setOrganization({
        id: humanResourceData?.organization_id,
        title_en: humanResourceData?.organization_title_en,
        title: humanResourceData?.organization_title,
      });
      setOrganizationUnit({
        id: humanResourceData.organization_unit_id,
        title_en: humanResourceData.organization_unit_title_en,
        title: humanResourceData.organization_unit_title,
      });

      reset({
        title_en: humanResourceData.title_en,
        title: humanResourceData.title,
        organization_id: humanResourceData.organization_id,
        organization_unit_id: humanResourceData.organization_unit_id,
        parent_id: humanResourceData?.parent_id
          ? humanResourceData.parent_id
          : '',
        rank_id: humanResourceData?.rank_id,
        display_order: humanResourceData?.display_order,
        is_designation: String(humanResourceData.is_designation),
        row_status: String(humanResourceData.row_status),
      });
    } else if (humanResourceData) {
      // add action setup
      setOrganization({
        id: humanResourceData.organization_id,
        title_en: humanResourceData.organization_title_en,
        title: humanResourceData.organization_title,
      });
      setOrganizationUnit({
        id: humanResourceData.organization_unit_id,
        title_en: humanResourceData.organization_unit_title_en,
        title: humanResourceData.organization_unit_title,
      });
      setOrganizationUnitId(humanResourceData.organization_unit_id);
      initialValues.organization_id = humanResourceData.organization_id;
      initialValues.organization_unit_id =
        humanResourceData.organization_unit_id;
      initialValues.parent_id = humanResourceData.id;
      reset(initialValues);
    } else if (orgUnitId && organizationUnitData) {
      // when hierarchy tree is empty
      setOrganizationUnitId(organizationUnitId);
      setOrganization({
        id: organizationUnitData.organization_id,
        title_en: organizationUnitData.organization_title_en,
        title: organizationUnitData.organization_title,
      });
      setOrganizationUnit({
        id: organizationUnitData.id,
        title_en: organizationUnitData.title_en,
        title: organizationUnitData.title,
      });
      initialValues.organization_id = organizationUnitData.organization_id;
      initialValues.organization_unit_id = organizationUnitData.id;
      initialValues.parent_id = '';
      reset(initialValues);
    }
  }, [itemId, humanResourceData, organizationUnitData]);

  const onSubmit: SubmitHandler<HumanResource> = async (
    data: HumanResource,
  ) => {
    data.parent_id = data.parent_id ? data.parent_id : null;
    const response =
      isEdit && itemId
        ? await updateHumanResource(itemId, data)
        : await createHumanResource(data);

    if (isResponseSuccess(response) && isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{
            subject: <IntlMessages id='human_resource.label' />,
          }}
        />,
      );
      mutateHumanResource();
      props.onClose();
      refreshDataTable();
    } else if (isResponseSuccess(response) && !isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_created_successfully'
          values={{
            subject: <IntlMessages id='human_resource.label' />,
          }}
        />,
      );
      props.onClose();
      refreshDataTable();
    } else if (isValidationError(response)) {
      setServerValidationErrors(response.errors, setError, validationSchema);
    }
  };

  return (
    <HookFormMuiModal
      open={true}
      {...props}
      title={
        <>
          <IconHumanResource />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{
                subject: <IntlMessages id='human_resource.label' />,
              }}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{
                subject: <IntlMessages id='human_resource.label' />,
              }}
            />
          )}
        </>
      }
      maxWidth={'sm'}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton
            onClick={props.onClose}
            isLoading={isOrganizationUnitLoading && isHumanResourceLoading}
          />
          <SubmitButton
            isSubmitting={isSubmitting}
            isLoading={isOrganizationUnitLoading}
          />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <CustomTextInput
            id='title_en'
            label={messages['common.title_en']}
            register={register}
            errorInstance={errors}
            isLoading={isOrganizationUnitLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='title'
            label={messages['common.title']}
            register={register}
            errorInstance={errors}
            isLoading={isOrganizationUnitLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='organization_id'
            label={messages['organization.label']}
            isLoading={isOrganizationUnitLoading && isHumanResourceLoading}
            control={control}
            options={[
              {
                id: organization?.id,
                title_en: organization?.title_en,
                title: organization?.title,
              },
            ]}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
            inputProps={{readOnly: true}}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='organization_unit_id'
            label={messages['organization_unit.label']}
            isLoading={isOrganizationUnitLoading && isHumanResourceLoading}
            control={control}
            options={[
              {
                id: organizationUnit?.id,
                title_en: organizationUnit?.title_en,
                title: organizationUnit?.title,
              },
            ]}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
            inputProps={{readOnly: true}}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='parent_id'
            label={messages['human_resource_template.parent']}
            isLoading={isHumanResourcesLoading}
            control={control}
            options={humanResources}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
            inputProps={{readOnly: !humanResourceData?.parent_id}}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='rank_id'
            label={messages['rank.label']}
            isLoading={isRanksLoading}
            control={control}
            options={ranks}
            optionValueProp={'id'}
            optionTitleProp={['title', 'title_en']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='display_order'
            label={messages['human_resource_template.display_order']}
            register={register}
            errorInstance={errors}
            isLoading={isOrganizationUnitLoading && isHumanResourceLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <FormRadioButtons
            id='is_designation'
            label={'human_resource_template.is_designation'}
            radios={[
              {
                key: '1',
                label: messages['common.yes'],
              },
              {
                key: '2',
                label: messages['common.no'],
              },
            ]}
            control={control}
            defaultValue={initialValues.is_designation}
            isLoading={isOrganizationUnitLoading && isHumanResourceLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <FormRowStatus
            id='row_status'
            control={control}
            defaultValue={initialValues.row_status}
            isLoading={isOrganizationUnitLoading && isHumanResourceLoading}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default HumanResourceAddEditPopup;
