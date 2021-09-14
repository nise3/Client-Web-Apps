import * as yup from 'yup';
import {Grid} from '@material-ui/core';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {TEXT_REGEX_BANGLA} from '../../../@softbd/common/patternRegex';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {useIntl} from 'react-intl';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {isResponseSuccess} from '../../../@softbd/common/helpers';
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

interface HumanResourceAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
  isEdit: boolean;
  organizationUnitId: number;
}

const validationSchema = yup.object().shape({
  title_en: yup.string().trim().required().label('Title[En]'),
  title_bn: yup
    .string()
    .trim()
    .required()
    .label('Title[Bn]')
    .matches(TEXT_REGEX_BANGLA, 'Enter valid text'),
  organization_id: yup.string().trim().required().label('Organization'),
  parent_id: yup.string(),
  rank_id: yup.string(),
  display_order: yup.string(),
  is_designation: yup.string().required().label('Designation'),
  organization_unit_id: yup.string().required().label('Organization Unit'),
  status: yup.string(),
  row_status: yup.string(),
});

const initialValues = {
  id: 0,
  title_en: '',
  title_bn: '',
  organization_id: 0,
  parent_id: '',
  rank_id: '',
  display_order: '',
  is_designation: '',
  organization_unit_id: 0,
  status: '',
  row_status: '1',
};

const HumanResourceAddEditPopup: FC<HumanResourceAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  /**
   * itemId = "m25" transform it 25 as integer
   */
  if (itemId) {
    itemId = Number(itemId?.toString().substring(1));
  }

  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const isEdit = props.isEdit;

  const [organization, setOrganization] = useState<any | {}>({});
  const [organizationUnit, setOrganizationUnit] = useState<any | {}>({});
  const [organizationUnitId, setOrganizationUnitId] = useState<number | null>(
    null,
  );

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<HumanResource>({
    resolver: yupResolver(validationSchema),
  });

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
      setOrganization({
        id: humanResourceData.organization_id,
        title_en: humanResourceData.organization_title_en,
        title_bn: humanResourceData.organization_title_bn,
      });
      setOrganizationUnit({
        id: humanResourceData.organization_unit_type_id,
        title_en: humanResourceData.organization_unit_type_title_en,
        title_bn: humanResourceData.organization_unit_type_title_bn,
      });
      setOrganizationUnitId(humanResourceData.organization_unit_id);
      initialValues.organization_id = humanResourceData.organization_id;
      initialValues.organization_unit_id =
        humanResourceData.organization_unit_type_id;
      initialValues.parent_id = humanResourceData.id;
      reset(initialValues);
    } else if (props.organizationUnitId && organizationUnitData) {
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
  }, [organizationUnitData, humanResourceData]);

  const onSubmit: SubmitHandler<HumanResource> = async (
    data: HumanResource,
  ) => {
    data.parent_id = data.parent_id ? data.parent_id : null;
    if (isEdit && itemId) {
      let response = await updateHumanResource(itemId, data);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_updated_successfully'
            values={{
              subject: <IntlMessages id='human_resource.label' />,
            }}
          />,
        );
        props.onClose();
        mutateHumanResource();
        refreshDataTable();
      }
    } else {
      let response = await createHumanResource(data);
      if (isResponseSuccess(response)) {
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
      }
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
