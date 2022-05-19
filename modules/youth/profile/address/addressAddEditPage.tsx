import {useIntl} from 'react-intl';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import useSuccessMessage from '../../../../@softbd/hooks/useSuccessMessage';
import {useFetchYouthAddress} from '../../../../services/youthManagement/hooks';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import yup from '../../../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {IAddressAddEdit} from '../../../../services/youthManagement/typing';
import {
  createAddress,
  updateAddress,
} from '../../../../services/youthManagement/AddressService';
import {processServerSideErrors} from '../../../../@softbd/utilities/validationErrorHandler';
import {Box, Grid, Zoom} from '@mui/material';
import CustomFilterableFormSelect from '../../../../@softbd/elements/input/CustomFilterableFormSelect';
import {
  useFetchLocalizedDistricts,
  useFetchLocalizedDivisions,
  useFetchLocalizedUpazilas,
} from '../../../../services/locationManagement/hooks';
import RowStatus from '../../../../@softbd/utilities/RowStatus';
import CustomHookForm from '../component/CustomHookForm';
import CancelButton from '../../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {
  filterDistrictsByDivisionId,
  filterUpazilasByDistrictId,
} from '../../../../services/locationManagement/locationUtils';
import {
  District,
  Upazila,
} from '../../../../shared/Interface/location.interface';
import CustomTextInput from '../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';

interface Porps {
  itemId: number | null;
  onClose: () => void;
}

const initialValues: any = {
  address_type: '',
  loc_division_id: '',
  loc_district_id: '',
  loc_upazila_id: '',
  village_or_area: '',
  village_or_area_en: '',
  house_n_road: '',
  house_n_road_en: '',
  zip_or_postal_code: '',
};

const AddressAddEditPage = ({
  itemId,
  onClose: closeAddressAddEditPage,
}: Porps) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const [divisionsFilters] = useState({});
  const [districtsFilter] = useState({
    row_status: RowStatus.ACTIVE,
  });
  const [upazilasFilter] = useState({
    row_status: RowStatus.ACTIVE,
  });
  const [districtsData, setDistrictsData] = useState<Array<District> | []>([]);
  const [upazilasData, setUpazilasData] = useState<Array<Upazila> | []>([]);

  const {data: divisions, isLoading: isLoadingDivisions}: any =
    useFetchLocalizedDivisions(divisionsFilters);
  const {data: districts, isLoading: isLoadingDistricts} =
    useFetchLocalizedDistricts(districtsFilter);
  const {data: upazilas, isLoading: isLoadingUpazilas} =
    useFetchLocalizedUpazilas(upazilasFilter);

  const addressType = [
    {
      id: 1,
      label: messages['common.present_address'],
    },
    {
      id: 2,
      label: messages['common.permanent_address'],
    },
    {
      id: 3,
      label: messages['common.others'],
    },
  ];

  const {
    data: itemData,
    mutate: addressMutate,
    isLoading,
  } = useFetchYouthAddress(itemId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      address_type: yup
        .string()
        .required()
        .label(messages['label.address_type'] as string),
      loc_division_id: yup
        .string()
        .required()
        .label(messages['divisions.label'] as string),
      loc_district_id: yup
        .string()
        .required()
        .label(messages['districts.label'] as string),
    });
  }, [messages]);

  const {
    control,
    handleSubmit,
    register,
    reset,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<IAddressAddEdit>({resolver: yupResolver(validationSchema)});

  useEffect(() => {
    if (itemData) {
      reset({
        address_type: itemData.address_type,
        loc_division_id: itemData.loc_division_id,
        loc_district_id: itemData.loc_district_id,
        loc_upazila_id: itemData?.loc_upazila_id,
        village_or_area: itemData?.village_or_area,
        village_or_area_en: itemData?.village_or_area_en,
        house_n_road: itemData?.house_n_road,
        house_n_road_en: itemData?.house_n_road_en,
        zip_or_postal_code: itemData?.zip_or_postal_code,
      });

      setDistrictsData(
        filterDistrictsByDivisionId(districts, itemData?.loc_division_id),
      );
      setUpazilasData(
        filterUpazilasByDistrictId(upazilas, itemData?.loc_district_id),
      );
    } else {
      reset(initialValues);
    }
  }, [itemData, districts, upazilas]);

  const onSubmit: SubmitHandler<IAddressAddEdit> = async (data) => {
    try {
      if (itemId) {
        await updateAddress(itemId, data);
        updateSuccessMessage('common.address');
      } else {
        await createAddress(data);
        createSuccessMessage('common.address');
      }
      addressMutate();
      closeAddressAddEditPage();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  const onDivisionChange = useCallback(
    (divisionId: number) => {
      let district = filterDistrictsByDivisionId(districts, divisionId);
      setDistrictsData(district);
      setUpazilasData([]);
    },
    [districts],
  );

  const onDistrictChange = useCallback(
    (districtId: number) => {
      let upazila = filterUpazilasByDistrictId(upazilas, districtId);
      setUpazilasData(upazila);
    },
    [upazilas],
  );

  return (
    <Zoom in={true}>
      <Box>
        <CustomHookForm
          title={messages['common.address']}
          handleSubmit={handleSubmit(onSubmit)}
          actions={
            <>
              <CancelButton
                onClick={closeAddressAddEditPage}
                isLoading={isLoading}
              />
              <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
            </>
          }
          onClose={closeAddressAddEditPage}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CustomFilterableFormSelect
                required
                id='loc_division_id'
                label={messages['divisions.label']}
                isLoading={isLoadingDivisions}
                control={control}
                options={divisions}
                optionValueProp={'id'}
                optionTitleProp={['title']}
                errorInstance={errors}
                onChange={onDivisionChange}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomFilterableFormSelect
                required
                id='loc_district_id'
                label={messages['districts.label']}
                isLoading={isLoadingDistricts}
                control={control}
                options={districtsData}
                optionValueProp={'id'}
                optionTitleProp={['title']}
                errorInstance={errors}
                onChange={onDistrictChange}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomFilterableFormSelect
                id='loc_upazila_id'
                label={messages['upazilas.label']}
                isLoading={isLoadingUpazilas}
                control={control}
                options={upazilasData}
                optionValueProp={'id'}
                optionTitleProp={['title']}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomFilterableFormSelect
                required
                id='address_type'
                label={messages['label.address_type']}
                isLoading={false}
                control={control}
                options={addressType}
                optionValueProp={'id'}
                optionTitleProp={['label']}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='village_or_area'
                label={messages['common.village_or_area_bn']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='village_or_area_en'
                label={messages['common.village_or_area_en']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='house_n_road'
                label={messages['common.house_n_road_bn']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='house_n_road_en'
                label={messages['common.house_n_road_en']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='zip_or_postal_code'
                label={messages['common.zip_or_postal_code']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
          </Grid>
        </CustomHookForm>
      </Box>
    </Zoom>
  );
};

export default AddressAddEditPage;
