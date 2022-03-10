import {Button, Container, FormLabel, Grid} from '@mui/material';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import React, {useCallback, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import {SubmitHandler, useForm} from 'react-hook-form';
import {IUser} from '../../../shared/Interface/userManagement.interface';
import {yupResolver} from '@hookform/resolvers/yup';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {createUser} from '../../../services/userManagement/UserService';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import yup from '../../../@softbd/libs/yup';
import {Body1, H3, H4} from '../../../@softbd/elements/common';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import CustomCheckbox from '../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import JobExperienceFieldArray from './JobExperienceFieldArray';
import AcademicQualificationFieldArray from './AcademicQualificationFieldArray';
import {
  useFetchCountries,
  useFetchDistricts,
  useFetchUnions,
  useFetchUpazilas,
} from '../../../services/locationManagement/hooks';
import {
  filterUnionsByUpazilaId,
  filterUpazilasByDistrictId,
} from '../../../services/locationManagement/locationUtils';

const RPLApplication = () => {
  const {messages, locale} = useIntl();
  const {errorStack} = useNotiStack();

  const {createSuccessMessage} = useSuccessMessage();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      registration_number: yup
        .string()
        .required()
        .label(messages['common.registration_number'] as string),
    });
  }, [locale]);
  const isLoading = false;

  const {
    register,
    control,
    setError,
    handleSubmit,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const [districtsFilter] = useState({});
  const [upazilasFilter] = useState({});
  const [unionsFilter] = useState({});
  const [countriesFilter] = useState({});

  const {data: districts, isLoading: isLoadingDistricts} =
    useFetchDistricts(districtsFilter);
  const {data: upazilas, isLoading: isLoadingUpazilas} =
    useFetchUpazilas(upazilasFilter);
  const {data: unions, isLoading: isLoadingUnions} =
    useFetchUnions(unionsFilter);
  const {data: countries} = useFetchCountries(countriesFilter);

  const [presentAddressUplazilaList, setPresentAddressUplazilaList] = useState<
    Array<any> | []
  >([]);
  const [presentAddressUnionList, setPresentAddressUnionList] = useState<
    Array<any> | []
  >([]);

  const [permanentAddressUpazilaList, setPermanentAddressUpazilaList] =
    useState<Array<any> | []>([]);
  const [permanentAddressUnionList, setPermanentAddressUnionList] = useState<
    Array<any> | []
  >([]);

  const handlePresentAddressDistrictChange = useCallback(
    (districtId: number) => {
      setPresentAddressUplazilaList(
        filterUpazilasByDistrictId(upazilas, districtId),
      );
    },
    [upazilas],
  );

  const handlePermanentAddressDistrictChange = useCallback(
    (districtId: number) => {
      setPermanentAddressUpazilaList(
        filterUpazilasByDistrictId(upazilas, districtId),
      );
    },
    [upazilas],
  );

  const handlePresentAddressUpazilaChange = useCallback(
    (upazilaId: number) => {
      setPresentAddressUnionList(filterUnionsByUpazilaId(unions, upazilaId));
    },
    [unions],
  );

  const handlePermanentAddressUpazilaChange = useCallback(
    (upazilaId: number) => {
      setPermanentAddressUnionList(
        filterUpazilasByDistrictId(upazilas, upazilaId),
      );
    },
    [unions],
  );

  const [isCurrentlyEmployed, setIsCurrentlyEmployed] =
    useState<boolean>(false);

  const onSubmit: SubmitHandler<any> = async (data: IUser) => {
    try {
      await createUser(data);
      createSuccessMessage('user.label');
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <Container maxWidth={'md'}>
      <Grid container spacing={2} my={2} justifyContent={'center'}>
        <Grid item xs={12}>
          <Grid container justifyContent={'center'}>
            <img
              src='http://rpl.skills.gov.bd/assets/logo/bteb_logo.jpg'
              alt='RPL logo'
              height={75}
              width={75}
            />
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <H3 centered={true}>বাংলাদেশ কারিগরি শিক্ষা বোর্ড, ঢাকা</H3>
          <H4 centered={true}>
            জাতীয় কারিগরি ও বৃত্তিমূলক যোগ্যতা কাঠামোর (NTVQF) আওতায়
            প্রশিক্ষণার্থী ভর্তির আবেদনপত্র
          </H4>
          <Body1 centered={true}>
            (শিক্ষাগত যোগ্যতার সনদ অনুসারে স্বহস্তে পূরণ করতে হবে)
          </Body1>
        </Grid>
      </Grid>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextInput
              id='registration_number'
              type={'number'}
              label={messages['common.registration_number']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={6}>
            <CustomTextInput
              required
              id='candidate_name_en'
              label={messages['common.candidate_name_en']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              required
              id='candidate_name_bn'
              label={messages['common.candidate_name_bn']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={6}>
            <CustomTextInput
              required
              id='father_name_en'
              label={messages['common.father_name_en']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              required
              id='father_name_bn'
              label={messages['common.father_name_bn']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={6}>
            <CustomTextInput
              required
              id='mother_name_en'
              label={messages['common.mother_name_en']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              required
              id='mother_name_bn'
              label={messages['common.mother_name_bn']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={6}>
            <CustomTextInput
              required
              id='guardian_name'
              label={
                messages['common.guardian_name'] +
                '(' +
                messages['common.in_the_absence_of_father'] +
                ')'
              }
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={6}>
            <CustomTextInput
              required
              id='guardian_mobile'
              label={messages['common.guardian_mobile']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} my={2}>
            <FormLabel required={true}>
              {messages['common.present_address']}
            </FormLabel>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <CustomFormSelect
                  required
                  id='present_address[loc_district_id]'
                  label={messages['districts.label']}
                  isLoading={isLoadingDistricts}
                  control={control}
                  options={districts}
                  optionValueProp={'id'}
                  optionTitleProp={['title_en', 'title']}
                  errorInstance={errors}
                  onChange={handlePresentAddressDistrictChange}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomFormSelect
                  required
                  id='present_address[loc_upazila_id]'
                  label={messages['upazilas.label']}
                  isLoading={isLoadingUpazilas}
                  control={control}
                  options={presentAddressUplazilaList}
                  optionValueProp={'id'}
                  optionTitleProp={['title_en', 'title']}
                  errorInstance={errors}
                  onChange={handlePresentAddressUpazilaChange}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomFormSelect
                  required
                  id='present_address[loc_union_id]'
                  label={messages['union.label']}
                  isLoading={isLoadingUnions}
                  control={control}
                  options={presentAddressUnionList || []}
                  optionValueProp={'id'}
                  optionTitleProp={['title_en', 'title']}
                  errorInstance={errors}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextInput
                  required
                  id={'present_address[village]'}
                  label={messages['common.village_or_area_bn']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} mb={2}>
            <FormLabel required={true}>
              {messages['common.permanent_address']}
            </FormLabel>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <CustomFormSelect
                  required
                  id='permanent_address[loc_district_id]'
                  label={messages['districts.label']}
                  isLoading={isLoadingDistricts}
                  control={control}
                  options={districts}
                  optionValueProp={'id'}
                  optionTitleProp={['title_en', 'title']}
                  errorInstance={errors}
                  onChange={handlePermanentAddressDistrictChange}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomFormSelect
                  required
                  id='permanent_address[loc_upazila_id]'
                  label={messages['upazilas.label']}
                  isLoading={isLoadingUpazilas}
                  control={control}
                  options={permanentAddressUpazilaList}
                  optionValueProp={'id'}
                  optionTitleProp={['title_en', 'title']}
                  errorInstance={errors}
                  onChange={handlePermanentAddressUpazilaChange}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomFormSelect
                  required
                  id='permanent_address[loc_union_id]'
                  label={messages['union.label']}
                  isLoading={isLoadingUnions}
                  control={control}
                  options={permanentAddressUnionList || []}
                  optionValueProp={'id'}
                  optionTitleProp={['title_en', 'title']}
                  errorInstance={errors}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextInput
                  required
                  id={'permanent_address[village]'}
                  label={messages['common.village_or_area_bn']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <CustomTextInput
              required
              id='nationality'
              label={messages['common.nationality']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={6}>
            <CustomDateTimeField
              required
              id='date_of_birth'
              label={messages['common.date_of_birth']}
              register={register}
              errorInstance={errors}
            />
          </Grid>

          <Grid item xs={6}>
            <CustomFormSelect
              required
              id='religion'
              label={messages['common.religion']}
              isLoading={false}
              control={control}
              options={[]}
              optionValueProp={'id'}
              optionTitleProp={['title_en', 'title']}
              errorInstance={errors}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              <FormLabel required={true}>
                {
                  ((messages['user.academic_qualification'] as string) +
                    messages['academic_qualification.fill_up_hint']) as string
                }
              </FormLabel>
              <Grid item xs={12}>
                <AcademicQualificationFieldArray
                  id={'academic_qualifications'}
                  register={register}
                  errors={errors}
                  control={control}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              <FormLabel>{messages['common.job_experience']}</FormLabel>
              <Grid item xs={12}>
                <JobExperienceFieldArray
                  id={'job_experience'}
                  register={register}
                  errors={errors}
                  control={control}
                  countries={countries}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <CustomCheckbox
              id='is_currently_employed'
              label={messages['common.currently_working'] + '?'}
              register={register}
              errorInstance={errors}
              checked={isCurrentlyEmployed}
              onChange={() => {
                setIsCurrentlyEmployed((prev) => !prev);
              }}
              isLoading={false}
            />
          </Grid>

          {isCurrentlyEmployed && (
            <>
              <Grid item xs={4}>
                <CustomFormSelect
                  required
                  id='currently_employer[type]'
                  label={messages['common.institute_type']}
                  isLoading={false}
                  control={control}
                  options={[]}
                  optionValueProp={'id'}
                  optionTitleProp={['title_en', 'title']}
                  errorInstance={errors}
                />
              </Grid>

              <Grid item xs={4}>
                <CustomTextInput
                  required
                  id='currently_employer[designation]'
                  label={messages['common.designation']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>

              <Grid item xs={4}>
                <CustomTextInput
                  required
                  id='currently_employer[name]'
                  label={messages['common.institute_name']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <FormLabel required={true}>
              {messages['common.interested_sector_occupation_to_register']}
            </FormLabel>

            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <CustomFormSelect
                  required
                  id={'interested_registration_sector[sector]'}
                  label={messages['common.sector']}
                  isLoading={false}
                  control={control}
                  options={[]}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <CustomFormSelect
                  required
                  id={'interested_registration_sector[occupation]'}
                  label={messages['common.occupation']}
                  isLoading={false}
                  control={control}
                  options={[]}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <CustomFormSelect
                  required
                  id={'interested_registration_sector[level]'}
                  label={messages['common.level']}
                  isLoading={false}
                  control={control}
                  options={[]}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <CustomFormSelect
              required
              id={'registered_training_center_id'}
              label={
                messages[
                  'common.registered_training_center_institute_assessment_center'
                ]
              }
              isLoading={false}
              control={control}
              options={[]}
              optionValueProp={'id'}
              optionTitleProp={['title']}
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel required={true}>
              {messages['common.identity_number'] +
                '(' +
                messages['common.any_one_must_be_fill_up'] +
                ')'}
            </FormLabel>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <CustomTextInput
                  id='national_identity'
                  label={messages['common.national_identity']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTextInput
                  id='birth_certificate'
                  label={messages['common.identity_type_birth_cert']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={4}>
                <CustomTextInput
                  id='passport_number'
                  label={messages['common.passport_number']}
                  register={register}
                  errorInstance={errors}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <FileUploadComponent
              required
              id={'candidate_photo'}
              errorInstance={errors}
              setValue={setValue}
              register={register}
              label={messages['common.candidate_photo']}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container justifyContent={'center'}>
              <Button
                type={'submit'}
                disabled={isSubmitting}
                variant='contained'>
                {messages['common.submit']}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default RPLApplication;
