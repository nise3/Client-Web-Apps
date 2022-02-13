import yup from '../../../@softbd/libs/yup';
import {Grid} from '@mui/material';
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
  createHumanResourceTemplate,
  updateHumanResourceTemplate,
} from '../../../services/organaizationManagement/HumanResourceTemplateService';
import IconHumanResourceTemplate from '../../../@softbd/icons/IconHumanResourceTemplate';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {
  useFetchHumanResourceTemplate,
  useFetchHumanResourceTemplates,
  useFetchOrganizationUnitType,
  useFetchRanks,
} from '../../../services/organaizationManagement/hooks';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {IHumanResourceTemplate} from '../../../shared/Interface/humanResourceTemplates.interface';
import {isBreakPointUp} from '../../../@crema/utility/Utils';

interface HumanResourceTemplateAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
  isEdit: boolean;
  organizationUnitTypeId: number;
}

const initialValues = {
  title_en: '',
  title: '',
  organization_id: '',
  parent_id: '',
  rank_id: '',
  display_order: '',
  is_designation: '2',
  organization_unit_type_id: '',
  status: '',
  row_status: '1',
};

const HumanResourceTemplateAddEditPopup: FC<
  HumanResourceTemplateAddEditPopupProps
> = ({
  itemId,
  refreshDataTable,
  isEdit,
  organizationUnitTypeId: orgUnitTypeId,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const {
    data: humanResourceTemplateData,
    isLoading: isHumanResourceTemplateLoading,
    mutate: mutateHumanResourceTemplate,
  } = useFetchHumanResourceTemplate(itemId);

  const [humanResourceTemplateFilter] = useState({
    row_status: RowStatus.ACTIVE,
    organization_unit_type_id: orgUnitTypeId,
  });
  const [rankFilter, setRankFilter] = useState({
    row_status: RowStatus.ACTIVE,
  });
  const [organization, setOrganization] = useState<any | {}>({});
  const [organizationUnitType, setOrganizationUnitType] = useState<any | {}>(
    {},
  );
  const [organizationUnitTypeId, setOrganizationUnitTypeId] = useState<
    number | null
  >(null);

  const {
    data: organizationUnitTypeData,
    isLoading: isOrganizationUnitTypeLoading,
  } = useFetchOrganizationUnitType(orgUnitTypeId);

  const {data: ranks, isLoading: isRanksLoading} = useFetchRanks(rankFilter);

  useEffect(() => {
    if (humanResourceTemplateData?.organization_id) {
      setRankFilter((prev: any) => {
        return {
          ...prev,
          organization_id: humanResourceTemplateData.organization_id,
        };
      });
    }
  }, [humanResourceTemplateData]);

  const {
    data: humanResourceTemplates,
    isLoading: isHumanResourceTemplatesLoading,
  } = useFetchHumanResourceTemplates(humanResourceTemplateFilter);

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
      display_order: yup
        .string()
        .required()
        .label(messages['organization.label'] as string),
      is_designation: yup
        .string()
        .required()
        .label(messages['human_resource_template.is_designation'] as string),
      organization_unit_type_id: yup
        .string()
        .required()
        .label(messages['organization_unit_type.label'] as string),
    });
  }, [messages]);
  const {
    control,
    register,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (isEdit && humanResourceTemplateData) {
      //edit action setup
      setOrganizationUnitTypeId(
        humanResourceTemplateData?.organization_unit_type_id,
      );
      setOrganization({
        id: humanResourceTemplateData?.organization_id,
        title_en: humanResourceTemplateData?.organization_title_en,
        title: humanResourceTemplateData?.organization_title,
      });
      setOrganizationUnitType({
        id: humanResourceTemplateData?.organization_unit_type_id,
        title_en: humanResourceTemplateData?.organization_unit_type_title_en,
        title: humanResourceTemplateData?.organization_unit_type_title,
      });

      reset({
        title_en: humanResourceTemplateData?.title_en,
        title: humanResourceTemplateData?.title,
        organization_id: humanResourceTemplateData?.organization_id,
        organization_unit_type_id:
          humanResourceTemplateData?.organization_unit_type_id,
        parent_id: humanResourceTemplateData?.parent_id
          ? humanResourceTemplateData?.parent_id
          : '',
        rank_id: humanResourceTemplateData?.rank_id,
        display_order: humanResourceTemplateData?.display_order,
        is_designation: String(humanResourceTemplateData?.is_designation),
        row_status: String(humanResourceTemplateData?.row_status),
      });
    } else if (humanResourceTemplateData) {
      // add action setup
      setOrganization({
        id: humanResourceTemplateData.organization_id,
        title_en: humanResourceTemplateData.organization_title_en,
        title: humanResourceTemplateData.organization_title,
      });
      setOrganizationUnitType({
        id: humanResourceTemplateData.organization_unit_type_id,
        title_en: humanResourceTemplateData.organization_unit_type_title_en,
        title: humanResourceTemplateData.organization_unit_type_title,
      });
      setOrganizationUnitTypeId(
        humanResourceTemplateData.organization_unit_type_id,
      );
      initialValues.organization_id = humanResourceTemplateData.organization_id;
      initialValues.organization_unit_type_id =
        humanResourceTemplateData.organization_unit_type_id;
      initialValues.parent_id = humanResourceTemplateData.id;
      reset(initialValues);
    } else if (orgUnitTypeId && organizationUnitTypeData) {
      // when hierarchy tree is empty
      console.log('tree empty action', humanResourceTemplateData);
      setOrganizationUnitTypeId(organizationUnitTypeId);
      setOrganization({
        id: organizationUnitTypeData.organization_id,
        title_en: organizationUnitTypeData.organization_title_en,
        title: organizationUnitTypeData.organization_title,
      });
      setOrganizationUnitType({
        id: organizationUnitTypeData.id,
        title_en: organizationUnitTypeData.title_en,
        title: organizationUnitTypeData.title,
      });
      initialValues.organization_id = organizationUnitTypeData.organization_id;
      initialValues.organization_unit_type_id = organizationUnitTypeData.id;
      initialValues.parent_id = '';
      reset(initialValues);
    }
  }, [itemId, humanResourceTemplateData, organizationUnitTypeData]);

  const onSubmit: SubmitHandler<IHumanResourceTemplate> = async (
    data: IHumanResourceTemplate,
  ) => {
    data.parent_id = data.parent_id ?? null;
    data.status = 1; // TODO::fix it

    try {
      if (itemId && isEdit) {
        await updateHumanResourceTemplate(itemId, data);
        updateSuccessMessage('human_resource_template.label');
        mutateHumanResourceTemplate();
      } else {
        await createHumanResourceTemplate(data);
        createSuccessMessage('human_resource_template.label');
      }
      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({
        error,
        setError,
        validationSchema,
        errorStack,
      });
    }
  };

  return (
    <HookFormMuiModal
      open={true}
      {...props}
      title={
        <>
          <IconHumanResourceTemplate />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{
                subject: <IntlMessages id='human_resource_template.label' />,
              }}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{
                subject: <IntlMessages id='human_resource_template.label' />,
              }}
            />
          )}
        </>
      }
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton
            onClick={props.onClose}
            isLoading={isOrganizationUnitTypeLoading}
          />
          <SubmitButton
            isSubmitting={isSubmitting}
            isLoading={isOrganizationUnitTypeLoading}
          />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <CustomTextInput
            required
            id='title'
            label={messages['common.title']}
            register={register}
            errorInstance={errors}
            isLoading={isOrganizationUnitTypeLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='title_en'
            label={messages['common.title_en']}
            register={register}
            errorInstance={errors}
            isLoading={isOrganizationUnitTypeLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='organization_id'
            label={messages['organization.label']}
            isLoading={
              isOrganizationUnitTypeLoading && isHumanResourceTemplateLoading
            }
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
            id='organization_unit_type_id'
            label={messages['organization_unit_type.label']}
            isLoading={
              isOrganizationUnitTypeLoading && isHumanResourceTemplateLoading
            }
            control={control}
            options={[
              {
                id: organizationUnitType?.id,
                title_en: organizationUnitType?.title_en,
                title: organizationUnitType?.title,
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
            isLoading={isHumanResourceTemplatesLoading}
            control={control}
            options={humanResourceTemplates}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
            inputProps={{readOnly: true}}
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
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            required
            id='display_order'
            label={messages['human_resource_template.display_order']}
            register={register}
            errorInstance={errors}
            isLoading={
              isOrganizationUnitTypeLoading && isHumanResourceTemplateLoading
            }
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
            isLoading={
              isOrganizationUnitTypeLoading && isHumanResourceTemplateLoading
            }
          />
        </Grid>
        <Grid item xs={12}>
          <FormRowStatus
            id='row_status'
            control={control}
            defaultValue={initialValues.row_status}
            isLoading={
              isOrganizationUnitTypeLoading && isHumanResourceTemplateLoading
            }
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default HumanResourceTemplateAddEditPopup;
