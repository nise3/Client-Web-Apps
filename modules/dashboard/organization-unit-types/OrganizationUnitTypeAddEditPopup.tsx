import * as yup from 'yup';
import {Grid} from '@material-ui/core';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/Input/CustomTextInput';
import {TEXT_REGEX_BANGLA} from '../../../@softbd/common/patternRegex';
import SubmitButton from '../../../@softbd/elements/Button/SubmitButton';
import FormRowStatus from '../../../@softbd/elements/FormRowStatus';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {
  createOrganizationUnitType,
  getOrganizationUnitType,
  updateOrganizationUnitType,
} from '../../../services/organaizationManagement/OrganizationUnitTypeService';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconOrganizationUnitType from '../../../@softbd/icons/IconOrganizationUnitType';
import {RowStatus} from '../../../@softbd/enums/RowStatus';
import {getAllOrganizations} from '../../../services/organaizationManagement/OrganizationService';
import CustomFormSelect from '../../../@softbd/elements/Select/CustomFormSelect';
import CancelButton from '../../../@softbd/elements/Button/CancelButton/CancelButton';

interface OrganizationUnitTypeAddEditPopupProps {
  itemId: number | null;
  open: boolean;
  onClose: () => void;
  refreshDataTable: () => void;
}

const validationSchema = yup.object().shape({
  title_en: yup.string().trim().required().label('Title(En)'),
  title_bn: yup
    .string()
    .trim()
    .required()
    .matches(TEXT_REGEX_BANGLA, 'Enter valid text')
    .label('Title(Bn)'),
  organization_id: yup.string().required().label('Organization'),
});

const initialValues = {
  title_en: '',
  title_bn: '',
  organization_id: '',
  row_status: '1',
};

const OrganizationUnitTypeAddEditPopup: FC<OrganizationUnitTypeAddEditPopupProps> =
  ({itemId, refreshDataTable, ...props}) => {
    const {messages} = useIntl();
    const {successStack} = useNotiStack();
    const isEdit = itemId != null;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [organizations, setOrganizations] = useState<Array<Organization>>([]);

    const {
      control,
      register,
      reset,
      handleSubmit,
      formState: {errors, isSubmitting},
    } = useForm({
      resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
      (async () => {
        setIsLoading(true);
        if (itemId) {
          let item = await getOrganizationUnitType(itemId);
          reset({
            title_en: item.title_en,
            title_bn: item.title_bn,
            organization_id: item.organization_id,
            row_status: String(item.row_status),
          });
        } else {
          reset(initialValues);
        }
        setIsLoading(false);
      })();
    }, [itemId]);

    useEffect(() => {
      (async () => {
        setIsLoading(true);
        let organizations = await getAllOrganizations({
          row_status: RowStatus.ACTIVE,
        });
        if (organizations) {
          setOrganizations(organizations);
        }
        setIsLoading(false);
      })();
    }, []);

    const onSubmit: SubmitHandler<OrganizationUnitType> = async (
      data: OrganizationUnitType,
    ) => {
      if (itemId) {
        let response = await updateOrganizationUnitType(itemId, data);
        if (response) {
          successStack(
            <IntlMessages
              id='common.subject_updated_successfully'
              values={{
                subject: <IntlMessages id='organization_unit_type.label' />,
              }}
            />,
          );
          props.onClose();
          refreshDataTable();
        }
      } else {
        let response = await createOrganizationUnitType(data);
        if (response) {
          successStack(
            <IntlMessages
              id='common.subject_created_successfully'
              values={{
                subject: <IntlMessages id='organization_unit_type.label' />,
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
        {...props}
        title={
          <>
            <IconOrganizationUnitType />
            {isEdit ? (
              <IntlMessages
                id='common.edit'
                values={{
                  subject: <IntlMessages id='organization_unit_type.label' />,
                }}
              />
            ) : (
              <IntlMessages
                id='common.add_new'
                values={{
                  subject: <IntlMessages id='organization_unit_type.label' />,
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
          <Grid item xs={12}>
            <CustomTextInput
              id='title_en'
              label={messages['common.title_en']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextInput
              id='title_bn'
              label={messages['common.title_bn']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomFormSelect
              id='organization_id'
              label={messages['organization.label']}
              isLoading={isLoading}
              control={control}
              options={organizations}
              optionValueProp='id'
              optionTitleProp={['title_en', 'title_bn']}
              errorInstance={errors}
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
export default OrganizationUnitTypeAddEditPopup;
