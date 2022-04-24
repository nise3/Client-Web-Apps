import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {
  useFetchRoles,
  useFetchUser,
} from '../../../services/userManagement/hooks';
import RowStatus from './RowStatus';
import yup from '../../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {Grid} from '@mui/material';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {
  createUser,
  updateUser,
} from '../../../services/userManagement/UserService';
import IconUser from '../../../@softbd/icons/IconUser';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {
  MOBILE_NUMBER_REGEX,
  TEXT_REGEX_PASSWORD,
} from '../../../@softbd/common/patternRegex';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {
  useFetchDistricts,
  useFetchDivisions,
  useFetchUpazilas,
} from '../../../services/locationManagement/hooks';
import {
  filterDistrictsByDivisionId,
  filterUpazilasByDistrictId,
} from '../../../services/locationManagement/locationUtils';
import {IUser} from '../../../shared/Interface/userManagement.interface';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import {getUserType} from '../../../@softbd/utilities/helpers';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {
  useFetchBranches,
  useFetchTrainingCenters,
} from '../../../services/instituteManagement/hooks';
import {isBreakPointUp} from '../../../@crema/utility/Utils';

interface UserAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const userTypes = [
  {key: 'institute', label: 'Institute'},
  {key: 'branch', label: 'Branch'},
  {key: 'training center', label: 'Training Center'},
];

const initialValues = {
  name_en: '',
  name: '',
  username: '',
  password: '',
  email: '',
  mobile: '',
  role_id: '',
  loc_division_id: '',
  loc_district_id: '',
  loc_upazila_id: '',
  row_status: '1',
  institute_user_type: 'institute',
  branch_id: '',
  training_center_id: '',
};

const UserAddEditPopup: FC<UserAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const authUser = useAuthUser();

  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const isEdit = itemId != null;
  const {data: itemData, isLoading, mutate: mutateUser} = useFetchUser(itemId);

  const [roleFilters, setRoleFilters] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const [divisionsFilter] = useState({});
  const [districtsFilter] = useState({});
  const [upazilasFilter] = useState({});

  const {data: roles, isLoading: isLoadingRoles} = useFetchRoles(roleFilters);
  const {data: divisions, isLoading: isLoadingDivisions} =
    useFetchDivisions(divisionsFilter);
  const {data: districts, isLoading: isLoadingDistricts} =
    useFetchDistricts(districtsFilter);
  const {data: upazilas, isLoading: isLoadingUpazilas} =
    useFetchUpazilas(upazilasFilter);

  const [branchFilters, setBranchFilters] = useState<any>(null);

  const [trainingCenterFilters, setTrainingCenterFilters] = useState<any>(null);

  const {data: branchList, isLoading: isBranchListLoading} =
    useFetchBranches(branchFilters);

  const {data: trainingCenterList, isLoading: isTrainingCenterLoading} =
    useFetchTrainingCenters(trainingCenterFilters);

  const [districtsList, setDistrictsList] = useState<Array<any> | []>([]);
  const [upazilasList, setUpazilasList] = useState<Array<any> | []>([]);

  const [filterUserSelection, setFilterUserSelection] = useState<string>('');
  useEffect(() => {
    if (authUser?.isInstituteUser) {
      setBranchFilters({
        institute_id: authUser?.institute_id,
        row_status: RowStatus.ACTIVE,
      });
      setTrainingCenterFilters({
        institute_id: authUser?.institute_id,
        row_status: RowStatus.ACTIVE,
      });
    }
  }, [authUser]);

  const rowStatusArr = useMemo(() => {
    return [
      {
        key: RowStatus.PENDING,
        label: messages['common.pending'],
        disabled: true,
      },
      {
        key: RowStatus.CANCEL,
        label: messages['common.cancel'],
        disabled: true,
      },
      {
        key: RowStatus.ACTIVE,
        label: messages['common.active'],
      },
      {
        key: RowStatus.INACTIVE,
        label: messages['common.inactive'],
      },
    ];
  }, []);

  const getPossibleRowStatus = useCallback(() => {
    if (isEdit) {
      return rowStatusArr;
    } else {
      return [rowStatusArr[2], rowStatusArr[3]];
    }
  }, [isEdit]);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      name_en: yup
        .string()
        .title('en', true, messages['common.special_character_error'] as string)
        .min(2)
        .label(messages['common.name_en'] as string),
      name: yup
        .string()
        .title('bn', true, messages['common.special_character_error'] as string)
        .min(2)
        .label(messages['common.name'] as string),
      username: yup
        .string()
        .trim()
        .required()
        .min(3)
        .label(messages['common.user_id'] as string),
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
          ? yup.string()
          : yup
              .string()
              .trim()
              .required()
              .min(8)
              .matches(TEXT_REGEX_PASSWORD)
              .label(messages['common.password'] as string),
      password_confirmation: yup
        .string()
        .label(messages['common.password'] as string)
        .oneOf(
          [yup.ref('password'), null],
          messages['password.not_matched'] as string,
        ),
      institute_user_type:
        !isEdit && authUser && authUser.isInstituteUser
          ? yup.string().required()
          : yup.string(),
      branch_id: yup
        .mixed()
        .label(messages['branch.label'] as string)
        .when('institute_user_type', {
          is: (value: string) => value == 'branch',
          then: yup.string().required(),
        }),
      training_center_id: yup
        .mixed()
        .label(messages['common.training_center'] as string)
        .when('institute_user_type', {
          is: (value: string) => value == 'training center',
          then: yup.string().required(),
        }),
      row_status: yup
        .string()
        .required()
        .label(messages['common.status'] as string),
    });
  }, [itemId, messages, isEdit]);

  const {
    register,
    control,
    reset,
    setError,
    handleSubmit,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm<IUser>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (authUser) {
      if (authUser?.isInstituteUser && authUser.institute_id) {
        setRoleFilters({
          institute_id: authUser.institute_id,
          row_status: RowStatus.ACTIVE,
        });
      } else if (authUser?.isOrganizationUser && authUser.organization_id) {
        setRoleFilters({
          organization_id: authUser.organization_id,
          row_status: RowStatus.ACTIVE,
        });
      }
    }
  }, [authUser]);

  useEffect(() => {
    if (itemData) {
      reset({
        name_en: itemData?.name_en,
        name: itemData?.name,
        username: itemData?.username,
        password: '',
        email: itemData?.email,
        mobile: itemData?.mobile,
        role_id: itemData?.role_id,
        loc_division_id: itemData?.loc_division_id,
        loc_district_id: itemData?.loc_district_id,
        loc_upazila_id: itemData?.loc_upazila_id,
        row_status: String(itemData?.row_status),
        branch_id: itemData?.branch_id,
        training_center_id: itemData?.training_center_id,
      });

      setDistrictsList(
        filterDistrictsByDivisionId(districts, itemData?.loc_division_id),
      );
      setUpazilasList(
        filterUpazilasByDistrictId(upazilas, itemData?.loc_district_id),
      );
    } else {
      reset(initialValues);
    }
  }, [itemData, districts, upazilas]);

  const changeDivisionAction = useCallback(
    (divisionId: number) => {
      setDistrictsList(filterDistrictsByDivisionId(districts, divisionId));
      setUpazilasList([]);
    },
    [districts],
  );

  const changeDistrictAction = useCallback(
    (districtId: number) => {
      setUpazilasList(filterUpazilasByDistrictId(upazilas, districtId));
    },
    [upazilas],
  );

  const changeUserTypes = useCallback(
    (userSection: string) => {
      if (userSection == 'institute') {
        setFilterUserSelection(userSection);
        setValue('branch_id', '');
        setValue('training_center_id', '');
      }

      if (userSection == 'branch') {
        setFilterUserSelection(userSection);
        setValue('training_center_id', '');
        setTrainingCenterFilters({
          institute_id: authUser?.institute_id,
          row_status: RowStatus.ACTIVE,
        });
      }

      if (userSection == 'training center') {
        setTrainingCenterFilters({
          institute_id: authUser?.institute_id,
          row_status: RowStatus.ACTIVE,
        });
        setFilterUserSelection(userSection);
      }
    },
    [filterUserSelection],
  );

  const changeBranch = useCallback((branchId: any) => {
    setTrainingCenterFilters({
      institute_id: authUser?.institute_id,
      row_status: RowStatus.ACTIVE,
      branch_id: branchId,
    });
  }, []);

  const onSubmit: SubmitHandler<IUser> = async (data: IUser) => {
    /**Todo
     * this if else section will be removed after backend refactor user creation
     */
    if (authUser?.isInstituteUser) {
      data.user_type = String(getUserType(authUser));
      data.institute_id = authUser?.institute_id;
    } else if (authUser?.isOrganizationUser) {
      data.organization_id = authUser?.organization_id;
    }

    try {
      if (itemId) {
        data.user_type = String(itemData?.user_type); //this will be removed after backend refactor user creation
        await updateUser(itemId, data);
        updateSuccessMessage('user.label');
        mutateUser();
      } else {
        data.user_type = String(getUserType(authUser)); //this will be removed after backend refactor user creation
        await createUser(data);
        createSuccessMessage('user.label');
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
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
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
            required
            id='name'
            label={messages['common.name']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            required
            id='name_en'
            label={messages['common.name_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            required
            id='username'
            label={messages['common.user_id']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            required
            id='email'
            label={messages['common.email']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            placeholder='example@gmail.com'
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            required
            id='mobile'
            label={messages['common.mobile']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            placeholder='017xxxxxxxx'
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='loc_division_id'
            label={messages['divisions.label']}
            isLoading={isLoadingDivisions}
            control={control}
            options={divisions}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
            onChange={changeDivisionAction}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='loc_district_id'
            label={messages['districts.label']}
            isLoading={isLoadingDistricts}
            control={control}
            options={districtsList}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
            onChange={changeDistrictAction}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='loc_upazila_id'
            label={messages['upazilas.label']}
            isLoading={isLoadingUpazilas}
            control={control}
            options={upazilasList}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
          />
        </Grid>

        {authUser?.isInstituteUser && !isEdit && (
          <Grid item xs={12}>
            <FormRadioButtons
              id='institute_user_type'
              control={control}
              defaultValue={initialValues.institute_user_type}
              isLoading={false}
              label={'user.user_type'}
              radios={userTypes}
              onChange={changeUserTypes}
            />
          </Grid>
        )}
        {filterUserSelection &&
          (filterUserSelection == 'branch' ||
            filterUserSelection == 'training center') && (
            <Grid item xs={6}>
              <CustomFormSelect
                required={filterUserSelection == 'branch'}
                id='branch_id'
                label={messages['branch.label']}
                isLoading={isBranchListLoading}
                control={control}
                options={branchList}
                optionValueProp={'id'}
                optionTitleProp={['title']}
                errorInstance={errors}
                onChange={changeBranch}
              />
            </Grid>
          )}

        {filterUserSelection && filterUserSelection == 'training center' && (
          <Grid item xs={6}>
            <CustomFormSelect
              required
              id='training_center_id'
              label={messages['common.training_center']}
              isLoading={isTrainingCenterLoading}
              control={control}
              options={trainingCenterList}
              optionValueProp={'id'}
              optionTitleProp={['title']}
              errorInstance={errors}
            />
          </Grid>
        )}
        <Grid item xs={6}>
          <CustomFormSelect
            id='role_id'
            label={messages['role.label']}
            isLoading={isLoadingRoles}
            control={control}
            options={roles}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
          />
        </Grid>
        {!(isEdit && itemId) && (
          <>
            <Grid item xs={6}>
              <CustomTextInput
                required
                id='password'
                label={messages['common.password']}
                helperText={messages['common.passwordHint']}
                type={'password'}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
                placeholder='xxxxXXXX123'
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                required
                id='password_confirmation'
                label={messages['common.retype_password']}
                type={'password'}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
                placeholder='xxxxXXXX123'
              />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <FormRadioButtons
            id={'row_status'}
            label={'common.status'}
            radios={getPossibleRowStatus()}
            control={control}
            defaultValue={RowStatus.ACTIVE}
            errorInstance={errors}
          />
        </Grid>

        {authUser &&
          authUser.isInstituteUser &&
          itemData?.branch_id == null &&
          itemData?.training_center_id == null &&
          isEdit && (
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['user.user_type']}
                value={messages['user.institute_user']}
                isLoading={isLoading}
              />
            </Grid>
          )}
        {authUser &&
          authUser.isInstituteUser &&
          isEdit &&
          itemData &&
          itemData?.branch_id != null &&
          !itemData?.training_center_id && (
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['user.user_type']}
                value={messages['user.branch_user']}
                isLoading={isLoading}
              />
            </Grid>
          )}
        {authUser &&
          authUser.isInstituteUser &&
          isEdit &&
          itemData &&
          itemData?.training_center_id != null && (
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['user.user_type']}
                value={messages['user.training_center_user']}
                isLoading={isLoading}
              />
            </Grid>
          )}
      </Grid>
    </HookFormMuiModal>
  );
};

export default UserAddEditPopup;
