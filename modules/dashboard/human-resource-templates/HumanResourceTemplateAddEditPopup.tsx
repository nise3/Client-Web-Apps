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
import {
  createBranch,
  getBranch,
  updateBranch,
} from '../../../services/instituteManagement/BranchService';
import {getAllInstitutes} from '../../../services/instituteManagement/InstituteService';
import {isResponseSuccess} from '../../../@softbd/common/helpers';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {
  createHumanResourceTemplate,
  getAllHumanResourceTemplates,
  getHumanResourceTemplate,
  updateHumanResourceTemplate,
} from '../../../services/organaizationManagement/HumanResourceTemplateService';
import {getAllOrganizations} from '../../../services/organaizationManagement/OrganizationService';
import IconHumanResourceTemplate from '../../../@softbd/icons/IconHumanResourceTemplate';
import {getAllOrganizationUnitTypes} from '../../../services/organaizationManagement/OrganizationUnitTypeService';

interface HumanResourceTemplateAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const validationSchema = yup.object().shape({
  title_en: yup.string().trim().required().label('Title[En]'),
  title_bn: yup
    .string()
    .trim()
    .required()
    .label('Title[Bn]')
    .matches(TEXT_REGEX_BANGLA, 'Enter valid text'),
  organization_id: yup.string().trim().required(),
  parent_id: yup.string(),
  rank_id: yup.string(),
  display_order: yup.string(),
  is_designation: yup.string().required().label('Designation'),
  organization_unit_type_id: yup.string().required(),
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
  organization_unit_type_id: 0,
  status: '',
  row_status: '1',
};

const HumanResourceTemplateAddEditPopup: FC<HumanResourceTemplateAddEditPopupProps> =
  ({itemId, refreshDataTable, ...props}) => {
    const {messages} = useIntl();
    const {successStack} = useNotiStack();
    const isEdit = itemId != null;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [organizations, setOrganizations] = useState<
      Array<Organization> | []
    >([]);
    const [selectedOrganizationId, setSelectedOrganizationId] = useState<
      null | number
    >(null);
    const [organizationUnitTypes, setOrganizationUnitTypes] = useState<
      Array<OrganizationUnitType> | []
    >([]);
    const [humanResourceTemplates, setHumanResourceTemplates] = useState<
      Array<HumanResourceTemplate> | []
    >([]);

    const {
      control,
      register,
      reset,
      handleSubmit,
      formState: {errors, isSubmitting},
    } = useForm<HumanResourceTemplate>({
      resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
      (async () => {
        setIsLoading(true);
        if (isEdit && itemId) {
          let response = await getHumanResourceTemplate(itemId);
          if (response) {
            const {data: item} = response;
            reset({
              title_en: item.title_en,
              title_bn: item.title_bn,
              organization_id: item.organization_id,
              organization_unit_type_id: item.organization_unit_type_id,
              parent_id: item.parent_id,
              rank_id: item?.rank_id,
              display_order: item?.display_order,
              row_status: String(item.row_status),
            });
          }
        } else {
          reset(initialValues);
        }
        loadOrganizations();
        loadHumanResourceTemplates();
        setIsLoading(false);
      })();
    }, [itemId]);

    useEffect(() => {
      loadOrganizationUnitTypes();
    }, [selectedOrganizationId]);

    const loadOrganizationUnitTypes = async () => {
      let response = await getAllOrganizationUnitTypes({
        organization_id: selectedOrganizationId,
      });
      response && setOrganizationUnitTypes(response.data);
    };

    const loadHumanResourceTemplates = async () => {
      let response = await getAllHumanResourceTemplates();
      response && setHumanResourceTemplates(response.data);
    };

    const loadOrganizations = async () => {
      const response = await getAllOrganizations();
      response && setOrganizations(response.data);
    };

    const handleOrganizationChange = (organizationId: any) => {
      setSelectedOrganizationId(organizationId);
    };

    const onSubmit: SubmitHandler<HumanResourceTemplate> = async (
      data: HumanResourceTemplate,
    ) => {
      if (isEdit && itemId) {
        let response = await updateHumanResourceTemplate(itemId, data);
        if (isResponseSuccess(response)) {
          successStack(
            <IntlMessages
              id='common.subject_updated_successfully'
              values={{
                subject: <IntlMessages id='human_resource_template.label' />,
              }}
            />,
          );
          props.onClose();
          refreshDataTable();
        }
      } else {
        let response = await createHumanResourceTemplate(data);
        if (isResponseSuccess(response)) {
          successStack(
            <IntlMessages
              id='common.subject_created_successfully'
              values={{
                subject: <IntlMessages id='human_resource_template.label' />,
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
        maxWidth={'sm'}
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
              id='title_en'
              label={messages['common.title_en']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id='title_bn'
              label={messages['common.title_bn']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomFormSelect
              id='organization_id'
              label={messages['organization.label']}
              isLoading={isLoading}
              control={control}
              options={organizations}
              optionValueProp={'id'}
              optionTitleProp={['title_en', 'title_bn']}
              errorInstance={errors}
              onChange={handleOrganizationChange}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomFormSelect
              id='organization_unit_type_id'
              label={messages['organization_unit_type.label']}
              isLoading={isLoading}
              control={control}
              options={organizationUnitTypes}
              optionValueProp={'id'}
              optionTitleProp={['title_en', 'title_bn']}
              errorInstance={errors}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomFormSelect
              id='parent_id'
              label={messages['human_resource_template.parent']}
              isLoading={isLoading}
              control={control}
              options={humanResourceTemplates}
              optionValueProp={'id'}
              optionTitleProp={['title_en', 'title_bn']}
              errorInstance={errors}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id='parent_id'
              label={messages['human_resource_template.parent']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id='google_map_src'
              label={messages['common.google_map_src']}
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
export default HumanResourceTemplateAddEditPopup;
