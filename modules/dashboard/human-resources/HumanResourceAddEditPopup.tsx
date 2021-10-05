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
import { Grid } from '@mui/material';

interface HumanResourceAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
  isEdit: boolean;
  organizationUnitId: number;
}

const initialValues = {
  title_en: '',
  title_bn: '',
  organization_id: '',
  parent_id: '',
  rank_id: '',
  display_order: '',
  is_designation: '2',
  organization_unit_id: '',
  status: '',
  row_status: '1',
};

const HumanResourceAddEditPopup: FC<HumanResourceAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const isEdit = props.isEdit;

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title_en: yup
        .string()
        .title('en')
        .label(messages['common.title_en'] as string),
      title_bn: yup
        .string()
        .title('bn')
        .label(messages['common.title_bn'] as string),
      organization_id: yup
        .string()
        .trim()
        .required()
        .label(messages['organization.label'] as string),
      parent_id: yup.string(),
      rank_id: yup.string(),
      display_order: yup.string(),
      is_designation: yup
        .string()
        .required()
        .label(messages['human_resource_template.is_designation'] as string),
      organization_unit_id: yup
        .string()
        .required()
        .label(messages['organization_unit_type.label'] as string),
      status: yup.string(),
      row_status: yup.string(),
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
    useFetchOrganizationUnit(props.organizationUnitId);
  const [rankFilter] = useState({});
  const [humanResourceFilter] = useState({});
  const {data: ranks, isLoading: isRanksLoading} = useFetchRanks(rankFilter);
  const {data: humanResources, isLoading: isHumanResourcesLoading} =
    useFetchHumanResources(humanResourceFilter);

  useEffect(() => {
    if (isEdit && humanResourceData) {
      //edit action setup
      setOrganizationUnitId(humanResourceData.organization_unit_type_id);
      setOrganization({
        id: humanResourceData.organization_id,
        title_en: humanResourceData.organization_title_en,
        title_bn: humanResourceData.organization_title_bn,
      });
      setOrganizationUnit({
        id: humanResourceData.organization_unit_id,
        title_en: humanResourceData.organization_unit_title_en,
        title_bn: humanResourceData.organization_unit_title_bn,
      });

      reset({
        title_en: humanResourceData.title_en,
        title_bn: humanResourceData.title_bn,
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
        title_bn: humanResourceData.organization_title_bn,
      });
      setOrganizationUnit({
        id: humanResourceData.organization_unit_id,
        title_en: humanResourceData.organization_unit_title_en,
        title_bn: humanResourceData.organization_unit_title_bn,
      });
      setOrganizationUnitId(humanResourceData.organization_unit_id);
      initialValues.organization_id = humanResourceData.organization_id;
      initialValues.organization_unit_id =
        humanResourceData.organization_unit_id;
      initialValues.parent_id = humanResourceData.id;
      reset(initialValues);
    } else if (props.organizationUnitId && organizationUnitData) {
      // when hierarchy tree is empty
      setOrganizationUnitId(organizationUnitId);
      setOrganization({
        id: organizationUnitData.organization_id,
        title_en: organizationUnitData.organization_title_en,
        title_bn: organizationUnitData.organization_title_bn,
      });
      setOrganizationUnit({
        id: organizationUnitData.id,
        title_en: organizationUnitData.title_en,
        title_bn: organizationUnitData.title_bn,
      });
      initialValues.organization_id = organizationUnitData.organization_id;
      initialValues.organization_unit_id = organizationUnitData.id;
      initialValues.parent_id = '';
      reset(initialValues);
    }
  }, [itemId]);

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
            id='title_bn'
            label={messages['common.title_bn']}
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
                title_bn: organization?.title_bn,
              },
            ]}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title_bn']}
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
                title_bn: organizationUnit?.title_bn,
              },
            ]}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title_bn']}
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
            optionTitleProp={['title_en', 'title_bn']}
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
            optionTitleProp={['title_en', 'title_bn']}
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
