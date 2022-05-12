import yup from '../../../@softbd/libs/yup';
import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
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
  createTrainingCenter,
  updateTrainingCenter,
} from '../../../services/instituteManagement/TrainingCenterService';
import IconTrainingCenter from '../../../@softbd/icons/IconTrainingCenter';
import {
  useFetchBranches,
  useFetchInstitute,
  useFetchTrainingCenter,
} from '../../../services/instituteManagement/hooks';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {
  useFetchDistricts,
  useFetchDivisions,
  useFetchUpazilas,
} from '../../../services/locationManagement/hooks';
import {
  filterDistrictsByDivisionId,
  filterUpazilasByDistrictId,
} from '../../../services/locationManagement/locationUtils';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {ITrainingCenter} from '../../../shared/Interface/institute.interface';
import {District, Upazila} from '../../../shared/Interface/location.interface';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {
  FORM_PLACEHOLDER,
  isLatLongValid,
} from '../../../@softbd/common/constants';

interface ProgrammeAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const center_location_type = [
  {id: 1, title: 'On Institute Premises'},
  {id: 2, title: 'On Branch Premises'},
  {id: 3, title: 'On Training Center Premises'},
];

const initialValues = {
  title_en: '',
  title: '',
  institute_id: '',
  industry_association_id: '',
  branch_id: '',
  loc_division_id: '',
  loc_district_id: '',
  loc_upazila_id: '',
  location_latitude: '',
  location_longitude: '',
  address_en: '',
  center_location_type: '',
  address: '',
  google_map_src: '',
  row_status: '1',
};

const TrainingCenterAddEditPopup: FC<ProgrammeAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const isEdit = itemId != null;
  const authUser = useAuthUser<CommonAuthUser>();

  const [instituteFilters, setInstituteFilters] = useState<any>(null);
  const {data: institutes, isLoading: isLoadingInstitutes} =
    useFetchInstitute(instituteFilters);

  const [divisionsFilter] = useState({row_status: RowStatus.ACTIVE});
  const [districtsFilter] = useState({row_status: RowStatus.ACTIVE});
  const [upazilasFilter] = useState({row_status: RowStatus.ACTIVE});

  const {data: divisions, isLoading: isLoadingDivisions} =
    useFetchDivisions(divisionsFilter);
  const {data: districts, isLoading: isLoadingDistricts} =
    useFetchDistricts(districtsFilter);
  const {data: upazilas, isLoading: isLoadingUpazilas} =
    useFetchUpazilas(upazilasFilter);

  const [branchFilters, setBranchFilters] = useState<any>(null);
  const {data: branches, isLoading: isLoadingBranches} =
    useFetchBranches(branchFilters);
  const [districtsList, setDistrictsList] = useState<Array<District> | []>([]);
  const [upazilasList, setUpazilasList] = useState<Array<Upazila> | []>([]);

  const {
    data: itemData,
    isLoading,
    mutate: mutateTrainingCenter,
  } = useFetchTrainingCenter(itemId);

  useEffect(() => {
    if (authUser?.isSystemUser) {
      setInstituteFilters({row_status: RowStatus.ACTIVE});
    }

    if (!authUser?.isIndustryAssociationUser) {
      setBranchFilters({
        row_status: RowStatus.ACTIVE,
      });
    }
  }, [authUser]);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title('bn', true, messages['common.special_character_error'] as string)
        .label(messages['common.title'] as string),
      title_en: yup
        .string()
        .title(
          'en',
          false,
          messages['common.special_character_error'] as string,
        )
        .label(messages['common.title_en'] as string),

      institute_id:
        authUser?.isInstituteUser || authUser?.isIndustryAssociationUser
          ? yup.string().nullable()
          : yup
              .string()
              .trim()
              .required()
              .label(messages['institute.label'] as string),
      center_location_type: yup
        .string()
        .trim()
        .required()
        .label(messages['training_center.centerLocationType'] as string),
      location_latitude: yup
        .string()
        .nullable()
        .test(
          'lat-err',
          `${messages['common.location_latitude']} ${messages['common.not_valid']}`,
          (value) => isLatLongValid(value as string),
        ),
      location_longitude: yup
        .string()
        .nullable()
        .test(
          'long-err',
          `${messages['common.location_longitude']} ${messages['common.not_valid']}`,
          (value) => isLatLongValid(value as string),
        ),
    });
  }, [messages, authUser]);

  const {
    control,
    register,
    reset,
    setError,
    // getValues,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<ITrainingCenter>({
    resolver: yupResolver(validationSchema),
  });

  // console.log('form getValues ',getValues())
  // console.log('form errors ', errors);

  useEffect(() => {
    if (itemData) {
      reset({
        title_en: itemData?.title_en,
        title: itemData?.title,
        institute_id: itemData?.institute_id,
        industry_association_id: itemData?.industry_association_id,
        branch_id: itemData?.branch_id,
        loc_division_id: itemData?.loc_division_id,
        loc_district_id: itemData?.loc_district_id,
        loc_upazila_id: itemData?.loc_upazila_id,
        location_latitude: itemData?.location_latitude,
        location_longitude: itemData?.location_longitude,
        address_en: itemData?.address_en,
        center_location_type: itemData?.center_location_type,
        address: itemData?.address,
        google_map_src: itemData?.google_map_src,
        row_status: String(itemData?.row_status),
      });

      setDistrictsList(
        filterDistrictsByDivisionId(districts, itemData?.loc_division_id),
      );
      setUpazilasList(
        filterUpazilasByDistrictId(upazilas, itemData?.loc_district_id),
      );
      if (!authUser?.isIndustryAssociationUser) {
        setBranchFilters({
          institute_id: itemData?.institute_id,
          row_status: RowStatus.ACTIVE,
        });
      }
    } else {
      reset(initialValues);
    }
  }, [itemData, districts, upazilas]);

  /** Methods called on changing the division and districts in dropdown */
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

  const handleInstituteChange = useCallback((instituteId: number) => {
    setBranchFilters({
      institute_id: instituteId,
      row_status: RowStatus.ACTIVE,
    });
  }, []);

  const onSubmit: SubmitHandler<ITrainingCenter> = async (
    data: ITrainingCenter,
  ) => {
    if (!authUser?.isSystemUser) {
      delete data.institute_id;
      delete data.industry_association_id;
    }

    try {
      if (itemId) {
        await updateTrainingCenter(itemId, data);
        updateSuccessMessage('training_center.label');
        mutateTrainingCenter();
      } else {
        await createTrainingCenter(data);
        createSuccessMessage('training_center.label');
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
          <IconTrainingCenter />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='training_center.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='training_center.label' />}}
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
            id='title'
            label={messages['common.title']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='title_en'
            label={messages['common.title_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        {authUser?.isSystemUser && (
          <Grid item xs={6}>
            <CustomFormSelect
              required
              id='institute_id'
              label={messages['institute.label']}
              isLoading={isLoadingInstitutes}
              control={control}
              options={institutes}
              optionValueProp={'id'}
              optionTitleProp={['title_en', 'title']}
              errorInstance={errors}
              onChange={handleInstituteChange}
            />
          </Grid>
        )}
        {!authUser?.isIndustryAssociationUser && (
          <Grid item xs={6}>
            <CustomFormSelect
              id='branch_id'
              label={messages['branch.label']}
              isLoading={isLoadingBranches}
              control={control}
              options={branches}
              optionValueProp={'id'}
              optionTitleProp={['title_en', 'title']}
              errorInstance={errors}
            />
          </Grid>
        )}
        <Grid item xs={6}>
          <CustomFormSelect
            required
            id='center_location_type'
            label={messages['training_center.centerLocationType']}
            isLoading={isLoading}
            control={control}
            options={center_location_type}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='address'
            label={messages['common.address']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='address_en'
            label={messages['common.address_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
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
        <Grid item xs={6}>
          <CustomTextInput
            id='location_latitude'
            label={messages['common.location_latitude']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            placeholder={FORM_PLACEHOLDER.LATITUDE}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='location_longitude'
            label={messages['common.location_longitude']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            placeholder={FORM_PLACEHOLDER.LONGITUDE}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='google_map_src'
            label={messages['common.google_map_src']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            placeholder={FORM_PLACEHOLDER.MAP_SOURCE}
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
export default TrainingCenterAddEditPopup;
