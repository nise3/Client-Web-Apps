import React, {FC, useCallback, useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import {useIntl} from 'react-intl';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {Typography} from '@mui/material';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {
  useFetchDistricts,
  useFetchDivisions,
  useFetchUpazilas,
} from '../../../services/locationManagement/hooks';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {
  filterDistrictsByDivisionId,
  filterUpazilasByDistrictId,
} from '../../../services/locationManagement/locationUtils';
import CustomCheckbox from '../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';

interface AddressFormProps {
  register: any;
  errors: any;
  control: any;
  getValues: any;
  onChangeSameAsPresentCheck: (checked: boolean) => void;
}

const AddressForm: FC<AddressFormProps> = ({
  register,
  errors,
  control,
  getValues,
  onChangeSameAsPresentCheck,
}) => {
  const {messages} = useIntl();
  const [filters] = useState({});
  const {data: divisions, isLoading: isLoadingDivisions}: any =
    useFetchDivisions(filters);

  const [districtsFilter] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: districts} = useFetchDistricts(districtsFilter);

  const [upazilasFilter] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: upazilas} = useFetchUpazilas(upazilasFilter);

  const [presentDistricts, setPresentDistricts] = useState<
    Array<District> | []
  >([]);
  const [permanentDistricts, setPermanentDistricts] = useState<
    Array<District> | []
  >([]);
  const [presentUpazilas, setPresentUpazilas] = useState<Array<Upazila> | []>(
    [],
  );
  const [permanentUpazilas, setPermanentUpazilas] = useState<
    Array<Upazila> | []
  >([]);
  const [disabledPermanentAddress, setDisabledPermanentAddress] =
    useState<boolean>(false);

  useEffect(() => {
    if (getValues) {
      const presentAddress: any = getValues('present_address');
      const permanentAddress: any = getValues('permanent_address');
      const isPermanentAddress: any = getValues('is_permanent_address');

      if (presentAddress.loc_division_id) {
        onPresentDivisionChange(presentAddress.loc_division_id);
      }

      if (presentAddress.loc_district_id) {
        onPresentDistrictChange(presentAddress.loc_district_id);
      }

      setDisabledPermanentAddress(isPermanentAddress);

      if (permanentAddress.loc_division_id) {
        onPermanentDivisionChange(permanentAddress.loc_division_id);
      }

      if (permanentAddress.loc_district_id) {
        onPermanentDistrictChange(permanentAddress.loc_district_id);
      }
    }
  }, [getValues, districts, upazilas]);

  const onPresentDivisionChange = useCallback(
    (divisionId: number) => {
      let presentDistrict = filterDistrictsByDivisionId(districts, divisionId);
      setPresentDistricts(presentDistrict);
    },
    [districts],
  );

  const onPermanentDivisionChange = useCallback(
    (divisionId: number) => {
      let permanentDistrict = filterDistrictsByDivisionId(
        districts,
        divisionId,
      );
      setPermanentDistricts(permanentDistrict);
    },
    [districts],
  );

  const onPresentDistrictChange = useCallback(
    (districtId: number) => {
      let presentUpazila = filterUpazilasByDistrictId(upazilas, districtId);
      setPresentUpazilas(presentUpazila);
    },
    [upazilas],
  );

  const onPermanentDistrictChange = useCallback(
    (districtId: number) => {
      let permanentUpazila = filterUpazilasByDistrictId(upazilas, districtId);
      setPermanentUpazilas(permanentUpazila);
    },
    [upazilas],
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <CustomFormSelect
          id='present_address[loc_division_id]'
          label={messages['divisions.label']}
          isLoading={isLoadingDivisions}
          control={control}
          options={divisions}
          optionValueProp={'id'}
          optionTitleProp={['title_en', 'title']}
          errorInstance={errors}
          onChange={onPresentDivisionChange}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomFormSelect
          id='present_address[loc_district_id]'
          label={messages['districts.label']}
          isLoading={false}
          control={control}
          options={presentDistricts}
          optionValueProp={'id'}
          optionTitleProp={['title_en', 'title']}
          errorInstance={errors}
          onChange={onPresentDistrictChange}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomFormSelect
          id='present_address[loc_upazila_id]'
          label={messages['upazilas.label']}
          isLoading={false}
          control={control}
          options={presentUpazilas}
          optionValueProp={'id'}
          optionTitleProp={['title_en', 'title']}
          errorInstance={errors}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='present_address[zip_or_postal_code]'
          label={messages['common.zip_or_postal_code']}
          register={register}
          errorInstance={errors}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='present_address[village_or_area]'
          label={messages['common.village_or_area_bn']}
          register={register}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='present_address[village_or_area_en]'
          label={messages['common.village_or_area_en']}
          register={register}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='present_address[house_n_road]'
          label={messages['common.house_n_road_bn']}
          register={register}
          errorInstance={errors}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='present_address[house_n_road_en]'
          label={messages['common.house_n_road_en']}
          register={register}
          errorInstance={errors}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant={'h6'}>
          {messages['common.permanent_address']}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <CustomCheckbox
          id='is_permanent_address'
          label={messages['common.same_as_present']}
          register={register}
          errorInstance={errors}
          checked={disabledPermanentAddress}
          onChange={() => {
            onChangeSameAsPresentCheck(!disabledPermanentAddress);
            setDisabledPermanentAddress((prev) => !prev);
          }}
          isLoading={false}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomFormSelect
          id='permanent_address[loc_division_id]'
          label={messages['divisions.label']}
          isLoading={isLoadingDivisions}
          control={control}
          options={divisions}
          optionValueProp={'id'}
          optionTitleProp={['title_en', 'title']}
          errorInstance={errors}
          defaultValue={1}
          onChange={onPermanentDivisionChange}
          isDisabled={disabledPermanentAddress}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomFormSelect
          id='permanent_address[loc_district_id]'
          label={messages['districts.label']}
          isLoading={false}
          control={control}
          options={permanentDistricts}
          optionValueProp={'id'}
          optionTitleProp={['title_en', 'title']}
          errorInstance={errors}
          onChange={onPermanentDistrictChange}
          isDisabled={disabledPermanentAddress}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomFormSelect
          id='permanent_address[loc_upazila_id]'
          label={messages['upazilas.label']}
          isLoading={false}
          control={control}
          options={permanentUpazilas}
          optionValueProp={'id'}
          optionTitleProp={['title_en', 'title']}
          errorInstance={errors}
          isDisabled={disabledPermanentAddress}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='permanent_address[zip_or_postal_code]'
          label={messages['common.zip_or_postal_code']}
          register={register}
          errorInstance={errors}
          inputProps={{
            disabled: disabledPermanentAddress,
          }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='permanent_address[village_or_area]'
          label={messages['common.village_or_area_bn']}
          register={register}
          errorInstance={errors}
          inputProps={{
            disabled: disabledPermanentAddress,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='permanent_address[village_or_area_en]'
          label={messages['common.village_or_area_en']}
          register={register}
          errorInstance={errors}
          inputProps={{
            disabled: disabledPermanentAddress,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='permanent_address[house_n_road]'
          label={messages['common.house_n_road_bn']}
          register={register}
          errorInstance={errors}
          inputProps={{
            disabled: disabledPermanentAddress,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextInput
          id='permanent_address[house_n_road_en]'
          label={messages['common.house_n_road_en']}
          register={register}
          errorInstance={errors}
          inputProps={{
            disabled: disabledPermanentAddress,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default AddressForm;
