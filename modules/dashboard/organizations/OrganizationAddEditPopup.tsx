import * as yup from 'yup';
import {Grid} from '@material-ui/core';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/Input/CustomTextInput';
import {
  MOBILE_NUMBER_REGEX,
  TEXT_REGEX_BANGLA,
} from '../../../@softbd/common/patternRegex';
import CancelButton from '../../../@softbd/elements/Button/CancelButton';
import SubmitButton from '../../../@softbd/elements/Button/SubmitButton';
import FormRowStatus from '../../../@softbd/elements/FormRowStatus';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {
  createOrganization,
  getOrganization,
  updateOrganization,
} from '../../../services/organaizationManagement/OrganizationService';
import {useIntl} from 'react-intl';
import CustomFormSelect from '../../../@softbd/elements/Select/CustomFormSelect';
import {getAllOrganizationTypes} from '../../../services/organaizationManagement/OrganizationTypeService';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {Business} from '@material-ui/icons';

interface OrganizationAddEditPopupProps {
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
    .label('Title(Bn)')
    .matches(TEXT_REGEX_BANGLA, 'Enter valid text'),
  domain: yup.string().trim().required().label('Domain'),
  email: yup
    .string()
    .email('Enter valid email')
    .trim()
    .required()
    .label('Email'),
  mobile: yup
    .string()
    .trim()
    .required()
    .label('Mobile Number')
    .matches(MOBILE_NUMBER_REGEX, 'Enter valid mobile number'),
  contact_person_name: yup
    .string()
    .trim()
    .required()
    .label('Contact person name'),
  contact_person_mobile: yup
    .string()
    .trim()
    .required()
    .label('Contact person mobile'),
  contact_person_email: yup
    .string()
    .trim()
    .required()
    .label('Contact person email'),
  contact_person_designation: yup
    .string()
    .trim()
    .required()
    .label('Contact person designation'),
  organization_type_id: yup
    .number()
    .required()
    .label('Organization type designation'),
  address: yup.string().trim().required().label('Address'),
  row_status: yup.string().trim().required(),
});

const initialValues = {
  title_en: '',
  title_bn: '',
  domain: '',
  email: '',
  mobile: '',
  fax_no: '',
  contact_person_name: '',
  contact_person_mobile: '',
  contact_person_email: '',
  contact_person_designation: '',
  organization_type_id: '',
  address: '',
  description: '',
};

const OrganizationAddEditPopup: FC<OrganizationAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const isEdit = itemId != null;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [organizationTypes, setOrganizationTypes] = useState<
    Array<OrganizationType>
  >([]);
  const [currentRowStatus, setCurrentRowStatus] = useState<string>('1');

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
        let item = await getOrganization(itemId);
        reset({
          title_en: item.title_en,
          title_bn: item.title_bn,
          domain: item.domain,
          email: item.email,
          mobile: item.mobile,
          fax_no: item.fax_no,
          contact_person_name: item.contact_person_name,
          contact_person_mobile: item.contact_person_mobile,
          contact_person_email: item.contact_person_email,
          contact_person_designation: item.contact_person_designation,
          organization_type_id: item.organization_type_id,
          address: item.address,
          description: item.description,
        });
        setCurrentRowStatus(item.row_status);
      } else {
        reset(initialValues);
        setCurrentRowStatus('1');
      }
      setIsLoading(false);
    })();
  }, [itemId]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let organizationTypes = await getAllOrganizationTypes();
      if (organizationTypes) {
        setOrganizationTypes(organizationTypes);
      }
      setIsLoading(false);
    })();
  }, []);

  const onSubmit: SubmitHandler<Organization> = async (data: Organization) => {
    if (itemId) {
      let response = await updateOrganization(itemId, data);
      if (response) {
        successStack('Organization Updated Successfully');
        props.onClose();
        refreshDataTable();
      }
    } else {
      let response = await createOrganization(data);
      if (response) {
        successStack('Organization Created Successfully');
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
          <Business />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='organization.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='organization.label' />}}
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
            id='organization_type_id'
            label={messages['common.organization_type']}
            isLoading={isLoading}
            control={control}
            options={organizationTypes}
            optionValueProp='id'
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='domain'
            label={messages['common.domain']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='email'
            label={messages['common.email']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='fax_no'
            label={messages['common.fax_no']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='mobile'
            label={messages['common.mobile']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='contact_person_name'
            label={messages['common.contact_person_name']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='contact_person_mobile'
            label={messages['common.contact_person_mobile']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='contact_person_email'
            label={messages['common.contact_person_email']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextInput
            id='contact_person_designation'
            label={messages['common.contact_person_designation']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextInput
            id='description'
            label={messages['common.description']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextInput
            id='address'
            label={messages['common.address']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={4}
          />
        </Grid>

        <Grid item xs={12}>
          <FormRowStatus
            id='row_status'
            control={control}
            defaultValue={currentRowStatus}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default OrganizationAddEditPopup;
