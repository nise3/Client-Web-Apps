import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {
  useFetchRoles,
  useFetchUser,
} from '../../../services/userManagement/hooks';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {useFetchInstitutes} from '../../../services/instituteManagement/hooks';
import {useFetchOrganizations} from '../../../services/organaizationManagement/hooks';
import yup from '../../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  isResponseSuccess,
  isValidationError,
} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {Grid} from '@material-ui/core';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import {
  createUser,
  updateUser,
} from '../../../services/userManagement/UserService';
import IconUser from '../../../@softbd/icons/IconUser';
import {setServerValidationErrors} from '../../../@softbd/utilities/validationErrorHandler';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import {MOBILE_NUMBER_REGEX} from '../../../@softbd/common/patternRegex';

interface UserAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  name_en: '',
  name_bn: '',
  username: '',
  password: '',
  email: '',
  mobile: '',
  user_type: '1',
  role_id: '',
  organization_id: '',
  institute_id: '',
  row_status: '1',
};

const UserAddEditPopup: FC<UserAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const isEdit = itemId != null;
  const {data: itemData, isLoading, mutate: mutateUser} = useFetchUser(itemId);
  const [roleFilters] = useState({row_status: RowStatus.ACTIVE});

  const {data: roles, isLoading: isLoadingRoles} = useFetchRoles(roleFilters);

  const [instituteFilters] = useState({row_status: RowStatus.ACTIVE});

  const {data: institutes, isLoading: isLoadingInstitute} =
    useFetchInstitutes(instituteFilters);

  const [organizationFilters] = useState({row_status: RowStatus.ACTIVE});

  const {data: organizations, isLoading: isLoadingOrganizations} =
    useFetchOrganizations(organizationFilters);
  const [userType, setUserType] = useState<number>(1);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      name_en: yup
        .string()
        .title('en')
        .label(messages['common.name_en'] as string),
      name_bn: yup
        .string()
        .title('bn')
        .label(messages['common.name_bn'] as string),
      username: yup
        .string()
        .trim()
        .required()
        .label(messages['user.username'] as string),
      email: yup
        .string()
        .trim()
        .required()
        .email()
        .label(messages['common.email'] as string),
      mobile: yup
        .string()
        .trim()
        .required()
        .matches(MOBILE_NUMBER_REGEX)
        .label(messages['common.mobile'] as string),
      password:
        isEdit && itemId
          ? yup
              .string()
              .trim()
              .label(messages['common.password'] as string)
          : yup
              .string()
              .trim()
              .required()
              .label(messages['common.password'] as string),
      retype_password: yup
        .string()
        .oneOf([yup.ref('password')])
        .label(messages['common.password'] as string),
      user_type: yup
        .string()
        .trim()
        .required()
        .label(messages['user.user_type'] as string),
      organization_id:
        userType == 2
          ? yup
              .string()
              .required()
              .label(messages['organization.label'] as string)
          : yup.string().label(messages['organization.label'] as string),
      institute_id:
        userType == 3
          ? yup
              .string()
              .required()
              .label(messages['institute.label'] as string)
          : yup.string().label(messages['institute.label'] as string),
    });
  }, [itemId, messages, userType]);

  const {
    register,
    control,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<User>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        name_en: itemData?.name_en,
        name_bn: itemData?.name_bn,
        username: itemData?.username,
        password: '',
        email: itemData?.email,
        mobile: itemData?.mobile,
        user_type: String(itemData?.user_type),
        role_id: itemData?.role_id,
        organization_id: itemData?.organization_id,
        institute_id: itemData?.institute_id,
        row_status: String(itemData?.row_status),
      });
      setUserType(Number(itemData?.user_type));
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onUserTypeChange = useCallback((userTypeId: number) => {
    setUserType(userTypeId);
  }, []);

  const onSubmit: SubmitHandler<User> = async (data: User) => {
    const response =
      isEdit && itemId
        ? await updateUser(itemId, data)
        : await createUser(data);
    if (isResponseSuccess(response) && !isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_created_successfully'
          values={{subject: <IntlMessages id='user.label' />}}
        />,
      );
      props.onClose();
      refreshDataTable();
    } else if (isResponseSuccess(response) && isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='user.label' />}}
        />,
      );
      mutateUser();
      props.onClose();
      refreshDataTable();
    } else if (isValidationError(response)) {
      setServerValidationErrors(response.errors, setError, validationSchema);
    }
  };
  console.log('rr', errors);

  return (
    <HookFormMuiModal
      open={true}
      {...props}
      title={
        <>
          <IconUser />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='user.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='user.label' />}}
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
        <Grid item xs={12}>
          <FormRadioButtons
            id='user_type'
            label={'user.user_type'}
            radios={[
              {
                key: '1',
                label: messages['user.type.system'],
              },
              {
                key: '2',
                label: messages['user.type.organization'],
              },
              {
                key: '3',
                label: messages['user.type.institute'],
              },
            ]}
            control={control}
            defaultValue={initialValues.user_type}
            isLoading={isLoading}
            onChange={onUserTypeChange}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='name_en'
            label={messages['common.name_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='name_bn'
            label={messages['common.name_bn']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='username'
            label={messages['user.username']}
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
            id='mobile'
            label={messages['common.mobile']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='role_id'
            label={messages['role.label']}
            isLoading={isLoadingRoles}
            control={control}
            options={roles}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
          />
        </Grid>
        {userType && userType == 2 && (
          <Grid item xs={6}>
            <CustomFormSelect
              id='organization_id'
              label={messages['organization.label']}
              isLoading={isLoadingOrganizations}
              control={control}
              options={organizations}
              optionValueProp={'id'}
              optionTitleProp={['title_en', 'title_bn']}
              errorInstance={errors}
            />
          </Grid>
        )}
        {userType && userType == 3 && (
          <Grid item xs={6}>
            <CustomFormSelect
              id='institute_id'
              label={messages['institute.label']}
              isLoading={isLoadingInstitute}
              control={control}
              options={institutes}
              optionValueProp={'id'}
              optionTitleProp={['title_en', 'title_bn']}
              errorInstance={errors}
            />
          </Grid>
        )}
        {!(isEdit && itemId) && (
          <>
            <Grid item xs={6}>
              <CustomTextInput
                id='password'
                label={messages['common.password']}
                type={'password'}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                id='retype_password'
                label={messages['common.retypePassword']}
                type={'password'}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
          </>
        )}
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

export default UserAddEditPopup;
