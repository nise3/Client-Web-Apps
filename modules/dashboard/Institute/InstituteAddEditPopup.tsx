import * as yup from 'yup';
import {Grid} from '@material-ui/core';
import {
  createInstitute,
  getInstitute,
  updateInstitute,
} from '../../../services/instituteManagement/InstituteService';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useCallback, useEffect, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {
  DOMAIN_REGEX,
  MOBILE_NUMBER_REGEX,
  TEXT_REGEX_BANGLA,
} from '../../../@softbd/common/patternRegex';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import {
  getObjectArrayFromValueArray,
  getValuesFromObjectArray,
  isResponseSuccess,
} from '../../../@softbd/common/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconInstitute from '../../../@softbd/icons/IconInstitute';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import CustomFieldArray from '../../../@softbd/elements/input/CustomFieldArray';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {getAllDistricts} from '../../../services/locationManagement/DistrictService';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {getAllUpazilas} from '../../../services/locationManagement/UpazilaService';
import {getAllDivisions} from '../../../services/locationManagement/DivisionService';

interface InstituteAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const nonRequiredValidationSchema = yup.object().shape(
  {
    value: yup
      .string()
      .nullable()
      .notRequired()
      .when('value', {
        is: (value: any) => value && value.length > 0,
        then: (rule: any) =>
          rule.matches(MOBILE_NUMBER_REGEX, 'Number is not valid'),
      }),
  },
  [['value', 'value']],
);

const validationSchema = yup.object().shape({
  title_en: yup.string().trim().required().label('Title (En)'),
  title_bn: yup
    .string()
    .trim()
    .required()
    .matches(TEXT_REGEX_BANGLA, 'Enter valid text')
    .label('Title (Bn)'),
  domain: yup
    .string()
    .trim()
    .required()
    .matches(DOMAIN_REGEX, 'Domain is not valid')
    .label('Domain'),
  code: yup.string().required().label('Code'),
  primary_phone: yup
    .string()
    .trim()
    .required()
    .matches(MOBILE_NUMBER_REGEX, 'Number is not valid')
    .label('Phone Number'),
  phone_numbers: yup.array().of(nonRequiredValidationSchema),
  primary_mobile: yup
    .string()
    .trim()
    .required()
    .matches(MOBILE_NUMBER_REGEX, 'Number is not valid')
    .label('Mobile Number'),
  mobile_numbers: yup.array().of(nonRequiredValidationSchema),
  address: yup.string().trim().required().label('Address'),
  google_map_src: yup.string(),
  email: yup.string().required().email('Enter valid email').label('Email'),
  loc_division_id: yup.string().trim().required().label('Division'),
  loc_district_id: yup.string().trim().required().label('District'),
  loc_upazila_id: yup.string().trim().required().label('Upazila'),
});

const initialValues = {
  title_en: '',
  title_bn: '',
  domain: '',
  code: '',
  address: '',
  primary_phone: '',
  phone_numbers: [{value: ''}],
  primary_mobile: '',
  mobile_numbers: [{value: ''}],
  loc_division_id: '',
  loc_district_id: '',
  loc_upazila_id: '',
  google_map_src: '',
  email: '',
  row_status: '1',
};

const InstituteAddEditPopup: FC<InstituteAddEditPopupProps> = ({
  itemId,
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const isEdit = itemId != null;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [divisions, setDivisions] = useState<Array<Division>>([]);
  const [districts, setDistricts] = useState<Array<District>>([]);
  const [upazilas, setUpazilas] = useState<Array<Upazila>>([]);

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (isEdit && itemId) {
        let response = await getInstitute(itemId);
        if (response) {
          let {data: item} = response;
          reset({
            title_en: item?.title_en,
            title_bn: item?.title_bn,
            domain: item?.domain,
            code: item?.code,
            primary_phone: item?.primary_phone,
            phone_numbers: getObjectArrayFromValueArray(item?.phone_numbers),
            primary_mobile: item?.primary_mobile,
            mobile_numbers: getObjectArrayFromValueArray(item?.mobile_numbers),
            loc_division_id: item?.loc_division_id,
            loc_district_id: item?.loc_district_id,
            loc_upazila_id: item?.loc_upazila_id,
            address: item?.address,
            google_map_src: item?.google_map_src,
            email: item?.email,
            row_status: String(item?.row_status),
          });
          loadDistrictsDataByDivision(item?.loc_division_id);
          loadUpazilasDataByDistrict(item?.loc_district_id);
        }
      } else {
        reset(initialValues);
      }
      setIsLoading(false);
    })();
  }, [itemId]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let response = await getAllDivisions({row_status: RowStatus.ACTIVE});
      if (response) setDivisions(response.data);
      setIsLoading(false);
    })();
  }, []);

  const loadDistrictsDataByDivision = async (divisionId: number) => {
    setIsLoading(true);
    if (divisionId) {
      let response = await getAllDistricts({
        row_status: RowStatus.ACTIVE,
        division_id: divisionId,
      });
      if (response) {
        setDistricts(response.data);
      } else {
        setDistricts([]);
      }
    } else {
      setDistricts([]);
    }
    setIsLoading(false);
  };

  const changeDivisionAction = useCallback((value: number) => {
    (async () => {
      await loadDistrictsDataByDivision(value);
    })();
  }, []);

  const loadUpazilasDataByDistrict = async (districtId: number) => {
    setIsLoading(true);
    if (districtId) {
      let response = await getAllUpazilas({
        row_status: RowStatus.ACTIVE,
        district_id: districtId,
      });
      if (response) {
        setUpazilas(response.data);
      } else {
        setUpazilas([]);
      }
    } else {
      setUpazilas([]);
    }
    setIsLoading(false);
  };

  const changeDistrictAction = useCallback((value: number) => {
    (async () => {
      await loadUpazilasDataByDistrict(value);
    })();
  }, []);

  const onSubmit: SubmitHandler<Institute> = async (data: Institute) => {
    data.phone_numbers = getValuesFromObjectArray(data.phone_numbers);
    data.mobile_numbers = getValuesFromObjectArray(data.mobile_numbers);
    if (isEdit && itemId) {
      let response = await updateInstitute(itemId, data);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_updated_successfully'
            values={{subject: <IntlMessages id='institute.label' />}}
          />,
        );
        props.onClose();
        props.refreshDataTable();
      }
    } else {
      let response = await createInstitute(data);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_created_successfully'
            values={{subject: <IntlMessages id='institute.label' />}}
          />,
        );
        props.onClose();
        props.refreshDataTable();
      }
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
              values={{subject: <IntlMessages id='institute.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='institute.label' />}}
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
                id='email'
                label={messages['common.email']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                id='primary_phone'
                label={messages['common.phone']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
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
                id='address'
                label={messages['common.address']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomFormSelect
                id='loc_division_id'
                label={messages['divisions.label']}
                isLoading={isLoading}
                control={control}
                options={divisions}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title_bn']}
                errorInstance={errors}
                onChange={changeDivisionAction}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomFormSelect
                id='loc_upazila_id'
                label={messages['upazilas.label']}
                isLoading={isLoading}
                control={control}
                options={upazilas}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title_bn']}
                errorInstance={errors}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={5}>
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
              <CustomTextInput
                id='code'
                label={messages['common.code']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                id='primary_mobile'
                label={messages['common.mobile']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
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
              <CustomTextInput
                id='domain'
                label={messages['common.domain']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomFormSelect
                id='loc_district_id'
                label={messages['districts.label']}
                isLoading={isLoading}
                control={control}
                options={districts}
                optionValueProp={'id'}
                optionTitleProp={['title_en', 'title_bn']}
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
export default InstituteAddEditPopup;
