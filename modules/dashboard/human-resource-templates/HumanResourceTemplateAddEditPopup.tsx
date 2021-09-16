import yup from '../../../@softbd/libs/yup';
import {Grid} from '@material-ui/core';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
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
  isResponseSuccess,
  isValidationError,
} from '../../../@softbd/utilities/helpers';
import {
  createHumanResourceTemplate,
  getAllHumanResourceTemplates,
  getHumanResourceTemplate,
  updateHumanResourceTemplate,
} from '../../../services/organaizationManagement/HumanResourceTemplateService';
import IconHumanResourceTemplate from '../../../@softbd/icons/IconHumanResourceTemplate';
import {getAllRanks} from '../../../services/organaizationManagement/RankService';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import {getOrganizationUnitType} from '../../../services/organaizationManagement/OrganizationUnitTypeService';
import {setServerValidationErrors} from '../../../@softbd/utilities/validationErrorHandler';

interface HumanResourceTemplateAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
  isEdit: boolean;
  organizationUnitTypeId: number;
}

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
    /**
     * itemId = "m25" transform it 25 as integer
     */
    if (itemId) {
      itemId = Number(itemId?.toString().substring(1));
    }

    const {messages} = useIntl();
    const {successStack} = useNotiStack();
    const isEdit = props.isEdit;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [humanResourceTemplates, setHumanResourceTemplates] = useState<
      Array<HumanResourceTemplate> | []
    >([]);
    const [humanResourceTemplate, setHumanResourceTemplate] =
      useState<HumanResourceTemplate | null>(null);

    const [ranks, setRanks] = useState<Array<Rank> | []>([]);
    const [organizationId, setOrganizationId] = useState<number | null>(null);
    const [organization, setOrganization] = useState<any | {}>({});
    const [organizationUnitType, setOrganizationUnitType] = useState<any | {}>(
      {},
    );
    const [organizationUnitTypeId, setOrganizationUnitTypeId] = useState<
      number | null
    >(null);

    const validationSchema = useMemo(() => {
      return yup.object().shape({
        title_en: yup
          .string()
          .trim()
          .required()
          .title('en')
          .label(messages['common.title_en'] as string),
        title_bn: yup
          .string()
          .trim()
          .required()
          .title('bn')
          .label(messages['common.title_bn'] as string)
          .matches(TEXT_REGEX_BANGLA),
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
        organization_unit_type_id: yup
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
    } = useForm<HumanResourceTemplate>({
      resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
      (async () => {
        setIsLoading(true);

        if (isEdit && itemId) {
          let response = await getHumanResourceTemplate(itemId);
          setHumanResourceTemplate(response.data);
          if (response) {
            const {data: item} = response;
            setOrganizationId(item.organization_id);
            setOrganizationUnitTypeId(item.organization_unit_type_id);
            setOrganization({
              id: item.organization_id,
              title_en: item.organization_title_en,
              title_bn: item.organization_title_bn,
            });
            setOrganizationUnitType({
              id: item.organization_unit_type_id,
              title_en: item.organization_unit_type_title_en,
              title_bn: item.organization_unit_type_title_bn,
            });

            reset({
              title_en: item.title_en,
              title_bn: item.title_bn,
              organization_id: item.organization_id,
              organization_unit_type_id: item.organization_unit_type_id,
              parent_id: item?.parent_id ? item.parent_id : '',
              rank_id: item?.rank_id,
              display_order: item?.display_order,
              is_designation: String(item.is_designation),
              row_status: String(item.row_status),
            });
          }
        } else if (itemId) {
          let response = await getHumanResourceTemplate(itemId);
          setHumanResourceTemplate(response.data);
          const {data: item} = response;

          setOrganization({
            id: item.organization_id,
            title_en: item.organization_title_en,
            title_bn: item.organization_title_bn,
          });
          setOrganizationUnitType({
            id: item.organization_unit_type_id,
            title_en: item.organization_unit_type_title_en,
            title_bn: item.organization_unit_type_title_bn,
          });
          setOrganizationId(item.organization_id);
          setOrganizationUnitTypeId(item.organization_unit_type_id);
          initialValues.organization_id = item.organization_id;
          initialValues.organization_unit_type_id =
            item.organization_unit_type_id;
          initialValues.parent_id = item.id;
          reset(initialValues);
        } else if (props.organizationUnitTypeId) {
          const response = await getOrganizationUnitType(
            props.organizationUnitTypeId,
          );
          const {data: item} = response;
          setOrganizationId(item.organization_id);
          setOrganizationUnitTypeId(organizationUnitTypeId);
          setOrganization({
            id: item.organization_id,
            title_en: item.organization_title_en,
            title_bn: item.organization_title_bn,
          });
          setOrganizationUnitType({
            id: item.id,
            title_en: item.title_en,
            title_bn: item.title_bn,
          });
          initialValues.organization_id = item.organization_id;
          initialValues.organization_unit_type_id = item.id;
          initialValues.parent_id = '';
          reset(initialValues);
        }

        setIsLoading(false);
      })();
    }, [itemId]);

    const loadRanks = async () => {
      let response = await getAllRanks({});
      response && setRanks(response.data);
    };

    useEffect(() => {
      setIsLoading(true);
      loadHumanResourceTemplates();
      loadRanks();
      setIsLoading(false);
    }, []);

    const loadHumanResourceTemplates = async () => {
      let response = await getAllHumanResourceTemplates({
        organization_id: organizationId,
        organization_unit_type_id: organizationUnitTypeId,
      });
      response && setHumanResourceTemplates(response.data);
    };

    const onSubmit: SubmitHandler<HumanResourceTemplate> = async (
      data: HumanResourceTemplate,
    ) => {
      data.parent_id = data.parent_id ? data.parent_id : null;

      const response = itemId
        ? await updateHumanResourceTemplate(itemId, data)
        : await createHumanResourceTemplate(data);

      if (isResponseSuccess(response) && isEdit) {
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
      } else if (isResponseSuccess(response) && !isEdit) {
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
        } else if (isValidationError(response)) {
          setServerValidationErrors(
            response.errors,
            setError,
            validationSchema,
          );
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
              id='organization_unit_type_id'
              label={messages['organization_unit_type.label']}
              isLoading={isLoading}
              control={control}
              options={[
                {
                  id: organizationUnitType?.id,
                  title_en: organizationUnitType?.title_en,
                  title_bn: organizationUnitType?.title_bn,
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
              isLoading={isLoading}
              control={control}
              options={humanResourceTemplates}
              optionValueProp={'id'}
              optionTitleProp={['title_en', 'title_bn']}
              errorInstance={errors}
              inputProps={{readOnly: !humanResourceTemplate?.parent_id}}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomFormSelect
              id='rank_id'
              label={messages['rank.label']}
              isLoading={isLoading}
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
              isLoading={isLoading}
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
