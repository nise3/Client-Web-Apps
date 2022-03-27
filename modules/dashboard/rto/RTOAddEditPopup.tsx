import {Chip, Grid, Typography} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {
  MOBILE_NUMBER_REGEX,
  PHONE_NUMBER_REGEX,
} from '../../../@softbd/common/patternRegex';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import {
  getObjectArrayFromValueArray,
  getValuesFromObjectArray,
} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconInstitute from '../../../@softbd/icons/IconInstitute';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import CustomFieldArray from '../../../@softbd/elements/input/CustomFieldArray';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {
  useFetchDistricts,
  useFetchDivisions,
  useFetchUpazilas,
} from '../../../services/locationManagement/hooks';
import yup from '../../../@softbd/libs/yup';
import {
  filterDistrictsByDivisionId,
  filterUpazilasByDistrictId,
} from '../../../services/locationManagement/locationUtils';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {
  useFetchPermissionGroups,
  useFetchPermissionSubGroups,
} from '../../../services/userManagement/hooks';
import {PERMISSION_GROUP_REGISTERED_TRAINING_ORGANIZATION_KEY} from '../../../@softbd/common/constants';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {IInstitute} from '../../../shared/Interface/institute.interface';
import {District, Upazila} from '../../../shared/Interface/location.interface';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import {
  useFetchPublicRPLOccupations,
  useFetchPublicRPLSectors,
  useFetchPublicRTOCountries,
  useFetchRTO,
} from '../../../services/CertificateAuthorityManagement/hooks';
import {
  createRTO,
  updateRTO,
} from '../../../services/CertificateAuthorityManagement/RTOService';
import CustomSelectAutoComplete from '../../youth/registration/CustomSelectAutoComplete';
import {Box} from '@mui/system';
import {cloneDeep} from 'lodash';

interface InstituteAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title_en: '',
  title: '',
  country_id: '0',
  code: '',
  address: '',
  primary_phone: '',
  phone_numbers: [{value: ''}],
  primary_mobile: '',
  mobile_numbers: [{value: ''}],
  permission_sub_group_id: '',
  loc_division_id: '',
  loc_district_id: '',
  loc_upazila_id: '',
  google_map_src: '',
  email: '',
  row_status: '1',
  name_of_the_office_head: '',
  name_of_the_office_head_en: '',
  name_of_the_office_head_designation: '',
  name_of_the_office_head_designation_en: '',
  contact_person_name: '',
  contact_person_name_en: '',
  contact_person_designation: '',
  contact_person_designation_en: '',
  contact_person_email: '',
  contact_person_mobile: '',
  rto_occupation_exceptions: [],
};

const ERPLInstituteAddEditPopup: FC<InstituteAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const isEdit = itemId != null;
  const {data: itemData, isLoading, mutate: mutateRTO} = useFetchRTO(itemId);

  const [countryFilters] = useState<any>({});
  const {data: countries, isLoading: isLoadingCountries} =
    useFetchPublicRTOCountries(countryFilters);

  const [permissionGroupFilters] = useState({
    row_status: RowStatus.ACTIVE,
    key: PERMISSION_GROUP_REGISTERED_TRAINING_ORGANIZATION_KEY,
  });

  const [permissionSubGroupFilters, setPermissionSubGroupFilters] =
    useState<any>(null);

  const [divisionsFilter] = useState({row_status: RowStatus.ACTIVE});
  const [districtsFilter] = useState({row_status: RowStatus.ACTIVE});
  const [upazilasFilter] = useState({row_status: RowStatus.ACTIVE});

  const {data: divisions, isLoading: isLoadingDivisions} =
    useFetchDivisions(divisionsFilter);
  const {data: districts, isLoading: isLoadingDistricts} =
    useFetchDistricts(districtsFilter);
  const {data: upazilas, isLoading: isLoadingUpazilas} =
    useFetchUpazilas(upazilasFilter);

  const [districtsList, setDistrictsList] = useState<Array<District> | []>([]);
  const [upazilasList, setUpazilasList] = useState<Array<Upazila> | []>([]);

  const [selectedAllRplOccupations, setSelectedAllRplOccupations] =
    useState<any>([]);
  const [selectedRtoSectorId, setSelectedRtoSectorId] = useState<any>(null);

  const {data: permissionGroups} = useFetchPermissionGroups(
    permissionGroupFilters,
  );

  const [rplSectorFilter] = useState<any>({});
  const {data: rplSectors, isLoading: isFetchingRPLSectors} =
    useFetchPublicRPLSectors(rplSectorFilter);

  const [rplOccupationFilters, setRplOccupationFilters] = useState<any>({});
  const {data: rplOccupations, isLoading: isLoadingOccupations} =
    useFetchPublicRPLOccupations(rplOccupationFilters);

  const {data: permissionSubGroups, isLoading: isLoadingPermissionSubGroups} =
    useFetchPermissionSubGroups(permissionSubGroupFilters);

  const nonRequiredPhoneValidationSchema = useMemo(() => {
    return yup.object().shape({
      value: yup
        .mixed()
        .test(
          'mobile_number_validation',
          messages['common.invalid_mobile'] as string,
          (value) => !value || Boolean(value.match(PHONE_NUMBER_REGEX)),
        ),
    });
  }, [messages]);

  const nonRequiredMobileValidationSchema = useMemo(() => {
    return yup.object().shape({
      value: yup
        .mixed()
        .test(
          'mobile_number_validation',
          messages['common.invalid_phone'] as string,
          (value) => !value || Boolean(value.match(MOBILE_NUMBER_REGEX)),
        ),
    });
  }, [messages]);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title()
        .label(messages['common.title'] as string),
      country_id: yup
        .string()
        .trim()
        .required()
        .label(messages['rto_country.label'] as string),
      phone_numbers: yup.array().of(nonRequiredPhoneValidationSchema),
      primary_mobile: yup
        .string()
        .trim()
        .required()
        .matches(MOBILE_NUMBER_REGEX)
        .label(messages['common.mobile'] as string),
      mobile_numbers: yup.array().of(nonRequiredMobileValidationSchema),
      address: yup
        .string()
        .trim()
        .required()
        .label(messages['common.address'] as string),
      code: yup
        .string()
        .trim()
        .required()
        .label(messages['common.code'] as string),
      email: yup
        .string()
        .required()
        .email()
        .label(messages['common.email'] as string),
      permission_sub_group_id: isEdit
        ? yup.string().nullable()
        : yup
            .string()
            .required()
            .label(messages['permission_sub_group.label'] as string),
      name_of_the_office_head: yup
        .string()
        .trim()
        .required()
        .label(messages['institute.name_of_the_office_head'] as string),
      name_of_the_office_head_designation: yup
        .string()
        .trim()
        .required()
        .label(
          messages['institute.name_of_the_office_head_designation'] as string,
        ),
      contact_person_name: yup
        .string()
        .trim()
        .required()
        .label(messages['common.contact_person_name'] as string),
      contact_person_designation: yup
        .string()
        .trim()
        .required()
        .label(messages['common.contact_person_designation'] as string),
      contact_person_email: yup
        .string()
        .trim()
        .required()
        .email()
        .label(messages['common.contact_person_email'] as string),
      loc_division_id: yup
        .string()
        .trim()
        .required()
        .label(messages['divisions.label'] as string),
      loc_district_id: yup
        .string()
        .trim()
        .required()
        .label(messages['districts.label'] as string),
      contact_person_mobile: yup
        .string()
        .trim()
        .matches(MOBILE_NUMBER_REGEX)
        .required()
        .label(messages['common.contact_person_mobile'] as string),
    });
  }, [messages]);

  const {
    register,
    control,
    reset,
    setError,
    getValues,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (!isEdit && permissionGroups && permissionGroups.length > 0) {
      setPermissionSubGroupFilters({
        permission_group_id: permissionGroups[0]?.id,
        row_status: RowStatus.ACTIVE,
      });
    }
  }, [isEdit, permissionGroups]);

  useEffect(() => {
    if (itemData) {
      reset({
        title_en: itemData?.title_en,
        title: itemData?.title,
        // domain: itemData?.domain,
        country_id: itemData?.country_id,
        code: itemData?.code,
        primary_phone: itemData?.primary_phone,
        phone_numbers: getObjectArrayFromValueArray(itemData?.phone_numbers),
        primary_mobile: itemData?.primary_mobile,
        mobile_numbers: getObjectArrayFromValueArray(itemData?.mobile_numbers),
        loc_division_id: itemData?.loc_division_id,
        loc_district_id: itemData?.loc_district_id,
        loc_upazila_id: itemData?.loc_upazila_id,
        address: itemData?.address,
        google_map_src: itemData?.google_map_src,
        email: itemData?.email,
        name_of_the_office_head: itemData?.name_of_the_office_head,
        name_of_the_office_head_en: itemData?.name_of_the_office_head_en,
        name_of_the_office_head_designation:
          itemData?.name_of_the_office_head_designation,
        name_of_the_office_head_designation_en:
          itemData?.name_of_the_office_head_designation_en,
        contact_person_name: itemData?.contact_person_name,
        contact_person_name_en: itemData?.contact_person_name_en,
        contact_person_designation: itemData?.contact_person_designation,
        contact_person_designation_en: itemData?.contact_person_designation_en,
        contact_person_email: itemData?.contact_person_email,
        contact_person_mobile: itemData?.contact_person_mobile,
        row_status: String(itemData?.row_status),
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

  const onRplSectorChange = useCallback(
    (rtoSectorId: number) => {
      let selectedForRplSectors: Array<any> = [...selectedAllRplOccupations];

      if (rtoSectorId) {
        selectedForRplSectors = selectedAllRplOccupations.filter(
          (occupation: any) => occupation.rpl_sector_id == rtoSectorId,
        );

        reset({
          ...getValues(),
          rto_occupation_exceptions: selectedForRplSectors,
        });

        setRplOccupationFilters({
          rpl_sector_id: rtoSectorId,
        });
        setSelectedRtoSectorId(rtoSectorId);
      } else {
        reset({
          ...getValues(),
          rto_occupation_exceptions: selectedForRplSectors,
        });

        setRplOccupationFilters({});

        setSelectedRtoSectorId(null);
      }
    },
    [selectedAllRplOccupations],
  );

  const onRplOccupationChange = useCallback(
    (options: any) => {
      let selectedOccupations: Array<any> = [...selectedAllRplOccupations];

      if (selectedRtoSectorId) {
        selectedOccupations = selectedOccupations.filter(
          (occupation: any) => occupation.rpl_sector_id != selectedRtoSectorId,
        );

        selectedOccupations = [...selectedOccupations, ...options];

        reset({
          ...getValues(),
          rto_occupation_exceptions: selectedOccupations,
        });
      } else {
        reset({
          ...getValues(),
          rto_occupation_exceptions: options,
        });
        selectedOccupations = options;
      }

      setSelectedAllRplOccupations(selectedOccupations);
    },
    [selectedRtoSectorId, selectedAllRplOccupations],
  );

  const onOccupationDelete = useCallback(
    (deletedOccupation) => () => {
      if (deletedOccupation) {
        let selectedOccupations: Array<any> = [...selectedAllRplOccupations];
        selectedOccupations = selectedOccupations.filter(
          (occupation: any) => occupation.id != deletedOccupation.id,
        );
        setSelectedAllRplOccupations(selectedOccupations);

        if (selectedRtoSectorId) {
          let occupations = selectedOccupations.filter(
            (occupation: any) =>
              occupation.rpl_sector_id == selectedRtoSectorId,
          );
          reset({
            ...getValues(),
            rto_occupation_exceptions: occupations,
          });
        } else {
          reset({
            ...getValues(),
            rto_occupation_exceptions: selectedOccupations,
          });
        }
      }
    },
    [selectedAllRplOccupations, selectedRtoSectorId],
  );

  const onSubmit: SubmitHandler<IInstitute> = async (data: IInstitute) => {
    const formData = cloneDeep(data);

    formData.rto_occupation_exceptions = (selectedAllRplOccupations || []).map(
      (occupation: any) => occupation.id,
    );

    try {
      formData.phone_numbers = getValuesFromObjectArray(formData.phone_numbers);
      formData.mobile_numbers = getValuesFromObjectArray(
        formData.mobile_numbers,
      );

      if (itemId) {
        await updateRTO(itemId, formData);
        updateSuccessMessage('rto.label');
        mutateRTO();
      } else {
        await createRTO(formData);
        createSuccessMessage('rto.label');
      }
      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <HookFormMuiModal
      {...props}
      open={true}
      title={
        <>
          <IconInstitute />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{
                subject: <IntlMessages id='rto.label' />,
              }}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{
                subject: <IntlMessages id='rto.label' />,
              }}
            />
          )}
        </>
      }
      handleSubmit={handleSubmit(onSubmit)}
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextInput
                required
                id='title'
                label={messages['common.title']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
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

            {!isEdit && (
              <Grid item xs={12}>
                <CustomFormSelect
                  required
                  id='permission_sub_group_id'
                  label={messages['permission_sub_group.label']}
                  isLoading={isLoadingPermissionSubGroups}
                  control={control}
                  options={permissionSubGroups}
                  optionValueProp='id'
                  optionTitleProp={['title_en', 'title']}
                  errorInstance={errors}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <CustomTextInput
                id='primary_phone'
                label={messages['common.phone']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
                placeholder='xxx-xxx-xxxx'
              />
            </Grid>
            <Grid item container xs={12}>
              <CustomFieldArray
                id='phone_numbers'
                labelLanguageId={'common.phone'}
                isLoading={isLoading}
                control={control}
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                required
                id='address'
                label={messages['common.address']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomFormSelect
                required
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
            <Grid item xs={12}>
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

            {/** working */}
            <Grid item xs={12}>
              <CustomTextInput
                required
                id='name_of_the_office_head'
                label={messages['institute.name_of_the_office_head']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                required
                id='name_of_the_office_head_designation'
                label={
                  messages['institute.name_of_the_office_head_designation']
                }
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                required
                id='contact_person_name'
                label={messages['common.contact_person_name']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                required
                id='contact_person_designation'
                label={messages['common.contact_person_designation']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                required
                id='contact_person_email'
                label={messages['common.contact_person_email']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
                placeholder='example@gmail.com'
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomFormSelect
                id='rto_sector_exceptions'
                label={messages['common.rto_sector_exceptions']}
                isLoading={isFetchingRPLSectors}
                control={control}
                options={rplSectors}
                optionValueProp='id'
                optionTitleProp={['title']}
                errorInstance={errors}
                onChange={onRplSectorChange}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomSelectAutoComplete
                id='rto_occupation_exceptions'
                label={messages['common.rto_occupation_exceptions']}
                isLoading={isLoadingOccupations}
                control={control}
                options={rplOccupations}
                optionValueProp='id'
                optionTitleProp={['title']}
                errorInstance={errors}
                onChange={onRplOccupationChange}
              />
            </Grid>

            {selectedAllRplOccupations.length > 0 && (
              <Grid item xs={12}>
                <Typography>Selected occupation</Typography>
                <Box>
                  {selectedAllRplOccupations.map((occupation: any) => {
                    return (
                      <React.Fragment key={occupation.id}>
                        <Chip
                          label={occupation.title}
                          sx={{marginLeft: '5px', marginBottom: '5px'}}
                          onDelete={onOccupationDelete(occupation)}
                        />
                      </React.Fragment>
                    );
                  })}
                </Box>
              </Grid>
            )}
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
                required
                id='code'
                label={messages['common.code']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomFilterableFormSelect
                required
                id={'country_id'}
                label={messages['rto_country.label']}
                isLoading={isLoadingCountries}
                control={control}
                options={countries}
                optionValueProp={'country_id'}
                optionTitleProp={['title']}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                required
                id='primary_mobile'
                label={messages['common.mobile']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
                placeholder='017xxxxxxxx'
              />
            </Grid>
            <Grid item container xs={12}>
              <CustomFieldArray
                id='mobile_numbers'
                labelLanguageId={'common.mobile'}
                isLoading={isLoading}
                control={control}
                register={register}
                errors={errors}
              />
            </Grid>

            <Grid item xs={12}>
              <CustomFormSelect
                required
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
            <Grid item xs={12}>
              <CustomTextInput
                id='google_map_src'
                label={messages['common.google_map_src']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>

            {/** working */}
            <Grid item xs={12}>
              <CustomTextInput
                id='name_of_the_office_head_en'
                label={messages['institute.name_of_the_office_head_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                id='name_of_the_office_head_designation_en'
                label={
                  messages['institute.name_of_the_office_head_designation_en']
                }
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                id='contact_person_name_en'
                label={messages['common.contact_person_name_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                id='contact_person_designation_en'
                label={messages['common.contact_person_designation_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                required
                id='contact_person_mobile'
                label={messages['common.contact_person_mobile']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
                placeholder='017xxxxxxxx'
              />
            </Grid>
          </Grid>
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
export default ERPLInstituteAddEditPopup;
