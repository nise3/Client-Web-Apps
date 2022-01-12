import React, {FC, useMemo, useState} from 'react';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {Grid, Typography} from '@mui/material';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import {SubmitHandler, useForm} from 'react-hook-form';
import yup from '../../../@softbd/libs/yup';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {useIntl} from 'react-intl';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {
  useFetchDistricts,
  useFetchDivisions,
  useFetchUpazilas,
} from '../../../services/locationManagement/hooks';
import {District, Upazila} from '../../../shared/Interface/location.interface';
import {useFetchBranch} from '../../../services/instituteManagement/hooks';

interface AssociationProfileEditPopupProps {
  onClose: () => void;
}

const AssociationProfileEditPopup: FC<AssociationProfileEditPopupProps> = ({
  ...props
}) => {
  const {messages} = useIntl();

  const {
    data: itemData,
    isLoading,
    mutate: mutateBranch,
  } = useFetchBranch(itemId);

  const [divisionsFilter] = useState({row_status: RowStatus.ACTIVE});
  const [districtsFilter] = useState({row_status: RowStatus.ACTIVE});
  const [upazilasFilter] = useState({row_status: RowStatus.ACTIVE});

  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const {data: divisions, isLoading: isLoadingDivisions} =
    useFetchDivisions(divisionsFilter);
  const {data: districts, isLoading: isLoadingDistricts} =
    useFetchDistricts(districtsFilter);
  const {data: upazilas, isLoading: isLoadingUpazilas} =
    useFetchUpazilas(upazilasFilter);

  const [districtsList, setDistrictsList] = useState<Array<District> | []>([]);
  const [upazilasList, setUpazilasList] = useState<Array<Upazila> | []>([]);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title()
        .label(messages['association.association_name'] as string),
      name_of_the_office_head: yup
        .string()
        .trim()
        .required()
        .label(messages['association.head_of_office_or_chairman'] as string),
      name_of_the_office_head_designation: yup
        .string()
        .trim()
        .required()
        .label(messages['association.designation'] as string),
      contact_person_name: yup
        .string()
        .trim()
        .required()
        .label(messages['common.contact_person_name_en'] as string),
      address: yup
        .string()
        .trim()
        .required()
        .label(messages['association.association_address'] as string),
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
      contact_person_designation: yup
        .string()
        .trim()
        .required()
        .label(messages['common.contact_person_designation'] as string),
    });
  }, []);
  const {
    control,
    register,
    handleSubmit,
    setValue,
    // setError,
    formState: {errors, isSubmitting},
  } = useForm<any>({resolver: yupResolver(validationSchema)});

  // Todo: waiting for api
  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log('submit->', data);
    props.onClose();
  };

  return (
    <HookFormMuiModal
      open={true}
      {...props}
      title={
        <>
          <IntlMessages
            id='common.edit'
            values={{
              subject: <IntlMessages id='common.profile' />,
            }}
          />
        </>
      }
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={false} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={false} />
        </>
      }>
      <Grid container spacing={3} sx={{overflow: 'hidden'}}>
        <Grid item xs={12}>
          <Typography variant={'h6'}>
            {messages['association.association_information']}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <FileUploadComponent
            id='profile_image'
            defaultFileUrl={''}
            errorInstance={errors}
            setValue={setValue}
            register={register}
            label={messages['common.image_path']}
            required={false}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='title'
            label={messages['association.association_name']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            required
            id='loc_division_id'
            label={messages['divisions.label']}
            isLoading={isLoadingDivisions}
            control={control}
            options={divisions}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
            onChange={onDivisionChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            required
            id='loc_district_id'
            label={messages['districts.label']}
            isLoading={false}
            control={control}
            options={districtList}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
            onChange={onDistrictChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            id='loc_upazila_id'
            label={messages['upazilas.label']}
            isLoading={false}
            control={control}
            options={upazilaList}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='name_of_the_office_head'
            label={messages['association.head_of_office_or_chairman']}
            register={register}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='name_of_the_office_head_designation'
            label={messages['association.designation']}
            register={register}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12}>
          <CustomTextInput
            required
            id='address'
            label={messages['association.association_address']}
            register={register}
            errorInstance={errors}
            multiline={true}
            rows={3}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant={'h6'}>
            {messages['common.userInfoText']}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='contact_person_name'
            label={messages['common.contact_person_name_bn']}
            register={register}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='contact_person_designation'
            label={messages['common.contact_person_designation']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default AssociationProfileEditPopup;
