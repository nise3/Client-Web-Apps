import React, {FC, useCallback, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import yup from '../../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  Button,
  Container,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {MOBILE_NUMBER_REGEX} from '../../../@softbd/common/patternRegex';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {
  useFetchDistricts,
  useFetchDivisions,
  useFetchUnions,
  useFetchUpazilas,
} from '../../../services/locationManagement/hooks';
import {
  filterDistrictsByDivisionId,
  filterUpazilasByDistrictId,
} from '../../../services/locationManagement/locationUtils';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import {styled} from '@mui/material/styles';
import {Gender} from './constants/GenderEnums';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import CustomChipTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomChipTextInput';
import FormFiller from './constants/FormFiller';
import HasWorkshopConstant from './constants/HasWorkshopConstant';
import CustomCheckboxTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomCheckboxTextInput';
import BusinessType from './constants/BusinessTypes';
import TradeLicensingAuthority from './constants/TradeLicensingAuthority';
import Boolean from './constants/Boolean';
import BusinessOwnership from './constants/BusinessOwnership';
import {Body1, H1, H2} from '../../../@softbd/elements/common';
import CustomCheckbox from '../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';
import ImportExportType from './constants/ImportExportType';
import RegistrationSuccessBox from '../memberRegistration/RegistrationSuccessBox';
import {useFetchSMEFMemberStaticData} from '../../../services/IndustryAssociationManagement/hooks';
import {registerSMEFMember} from '../../../services/IndustryManagement/SMEFMemberRegistrationService';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';

interface SMEFMemberRegistrationFormProps {}

const PREFIX = 'SMEFMemberRegistrationForm';

const classes = {
  headerText: `${PREFIX}-headerText`,
  totalEmployeeFields: `${PREFIX}-totalEmployeeFields`,
  PaperBox: `${PREFIX}-PaperBox`,
};

const StyledHeader = styled(Grid)(({theme}) => ({
  background: theme.palette.primary.main,
  padding: '10px!important',
  color: '#fff',

  [`& .${classes.headerText}`]: {
    margin: '0 0 0 16px',
  },
}));

const CustomContainer = styled(Container)(({theme}) => ({
  [`& .${classes.totalEmployeeFields}`]: {
    paddingTop: '0 !important',
  },
  [`& .${classes.PaperBox}`]: {
    // padding: 40,
    margin: '20px auto',
  },
}));

const SMEFMemberRegistrationForm: FC<SMEFMemberRegistrationFormProps> = ({
  ...props
}) => {
  const {messages, locale} = useIntl();
  const {errorStack} = useNotiStack();

  const {createSuccessMessage} = useSuccessMessage();
  const isLoading = false;
  const [districtsFilter] = useState({});
  const [upazilasFilter] = useState({});
  const [unionsFilter] = useState({});

  const {data: divisions, isLoading: isLoadingDivisions} =
    useFetchDivisions(districtsFilter);
  const {data: districts, isLoading: isLoadingDistricts} =
    useFetchDistricts(districtsFilter);
  const {data: upazilas, isLoading: isLoadingUpazilas} =
    useFetchUpazilas(upazilasFilter);
  const {data: unions, isLoading: isLoadingUnions} =
    useFetchUnions(unionsFilter);
  const {data: memberStaticData, isLoading: isLoadingMemberStaticData} =
    useFetchSMEFMemberStaticData();

  const [districtsList, setDistrictsList] = useState<Array<any> | []>([]);
  const [upazilasList, setUpazilasList] = useState<Array<any> | []>([]);
  const [formFiller, setFormFiller] = useState<any>(null);
  const [hasWorkshop, setHasWorkshop] = useState<boolean>(false);

  const [factoryDistrictsList, setFactoryDistrictsList] = useState<
    Array<any> | []
  >([]);
  const [factoryUpazilasList, setFactoryUpazilasList] = useState<
    Array<any> | []
  >([]);

  const [checkedRegisteredAuthority, setCheckedRegisteredAuthority] = useState<
    Array<string>
  >([]);

  const [checkedAuthorizedAuthority, setCheckedAuthorizedAuthority] = useState<
    Array<any>
  >([]);

  const [checkedSpecializedArea, setCheckedSpecializedArea] = useState<
    Array<string>
  >([]);

  const [hasAuthorizedAuthority, setHasAuthorizedAuthority] =
    useState<boolean>(false);

  const [isIndustryUnderSpecializedArea, setIsIndustryUnderSpecializedArea] =
    useState<boolean>(false);

  const [hasRegisteredAuthority, setHasRegisteredAuthority] =
    useState<boolean>(false);

  const [isUnderSMECluster, setIsUnderSMECluster] = useState<boolean>(false);
  const [isAssociationMember, setIsAssociationMember] =
    useState<boolean>(false);

  const [isIndustryDoExport, setIsIndustryDoExport] = useState<boolean>(false);

  const [isIndustryDoImport, setIsIndustryDoImport] = useState<boolean>(false);
  const [hasBankAccount, setHasBankAccount] = useState<boolean>(false);
  const [isOpenSectorOtherName, setIsOpenSectorOtherName] =
    useState<boolean>(false);
  const [bankAccountTypes, setBankAccountTypes] = useState<Array<boolean>>([
    false,
    false,
  ]);

  const [importTypes, setImportTypes] = useState<Array<boolean>>([
    false,
    false,
  ]);
  const [exportTypes, setExportTypes] = useState<Array<boolean>>([
    false,
    false,
  ]);
  const [isSuccessRegistration, setIsSuccessRegistration] = useState(false);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      form_fill_up_by: yup
        .string()
        .required()
        .label(messages['common.form_filler'] as string),
      smef_cluster_name:
        formFiller == FormFiller.SME_CLUSTER
          ? yup
              .string()
              .required()
              .label(messages['smef.sme_cluster_name'] as string)
          : yup.string(),
      smef_cluster_loc_district_id:
        formFiller == FormFiller.SME_CLUSTER
          ? yup
              .string()
              .required()
              .label(messages['districts.label'] as string)
          : yup.string(),
      smef_cluster_union_id:
        formFiller == FormFiller.SME_CLUSTER
          ? yup
              .string()
              .required()
              .label(messages['union.label'] as string)
          : yup.string(),
      smef_cluster_code:
        formFiller == FormFiller.SME_CLUSTER
          ? yup
              .string()
              .required()
              .label(messages['common.code'] as string)
          : yup.string(),

      chamber_or_association_name:
        formFiller == FormFiller.CHAMBER_ASSOCIATION
          ? yup
              .string()
              .required()
              .label(messages['common.name'] as string)
          : yup.string(),
      chamber_or_association_loc_district_id:
        formFiller == FormFiller.CHAMBER_ASSOCIATION
          ? yup
              .string()
              .required()
              .label(messages['districts.label'] as string)
          : yup.string(),
      /*chamber_or_association_union_id:
                                                                                formFiller == FormFiller.CHAMBER_ASSOCIATION
                                                                                  ? yup
                                                                                      .string()
                                                                                      .required()
                                                                                      .label(messages['union.label'] as string)
                                                                                  : yup.string(),*/
      chamber_or_association_code:
        formFiller == FormFiller.CHAMBER_ASSOCIATION
          ? yup
              .string()
              .required()
              .label(messages['common.code'] as string)
          : yup.string(),
      entrepreneur_name: yup
        .string()
        .required()
        .label(messages['common.name'] as string),
      entrepreneur_gender: yup
        .string()
        .required()
        .label(messages['common.gender'] as string),
      entrepreneur_date_of_birth: yup
        .string()
        .required()
        .label(messages['common.date_of_birth'] as string),
      entrepreneur_educational_qualification: yup
        .string()
        .required()
        .label(messages['user.academic_qualification'] as string),
      entrepreneur_nid: yup
        .string()
        .required()
        .label(messages['common.identity_type_nid'] as string),
      entrepreneur_nid_file_path: yup
        .string()
        .required()
        .label(messages['common.national_identity'] as string),
      entrepreneur_email: yup
        .string()
        .trim()
        .email()
        .required()
        .label(messages['common.email'] as string),
      entrepreneur_mobile: yup
        .string()
        .trim()
        .required()
        .matches(MOBILE_NUMBER_REGEX)
        .label(messages['common.mobile'] as string),
      entrepreneur_photo_path: yup
        .string()
        .required()
        .label(messages['common.entrepreneur_pic'] as string),
      trade_license_no: yup
        .string()
        .required()
        .label(messages['institute.trade_licence_number'] as string),
      title: yup
        .string()
        .required()
        .min(2)
        .label(messages['common.institute'] as string),
      title_en: yup
        .string()
        .nullable()
        .label(messages['common.name'] as string),
      address: yup
        .string()
        .required()
        .label(messages['common.institute_address'] as string),
      loc_division_id: yup
        .string()
        .required()
        .label(messages['divisions.label'] as string),
      loc_district_id: yup
        .string()
        .required()
        .label(messages['districts.label'] as string),
      loc_upazila_id: yup.string().label(messages['upazilas.label'] as string),
      domain: yup.string().label(messages['common.domain'] as string),
      have_factory: yup
        .string()
        .required()
        .label(messages['common.workshop'] as string),
      factory_address: hasWorkshop
        ? yup
            .string()
            .required()
            .label(messages['common.address'] as string)
        : yup.string(),
      factory_loc_division_id: hasWorkshop
        ? yup
            .string()
            .required()
            .label(messages['divisions.label'] as string)
        : yup.string().label(messages['divisions.label'] as string),
      factory_loc_district_id: hasWorkshop
        ? yup
            .string()
            .required()
            .label(messages['districts.label'] as string)
        : yup.string().label(messages['districts.label'] as string),
      factory_loc_upazila_id: hasWorkshop
        ? yup
            .string()
            .required()
            .label(messages['upazilas.label'] as string)
        : yup.string().label(messages['upazilas.label'] as string),
      factory_web_site: yup
        .string()
        .label(messages['common.website'] as string),
      have_office_or_showroom: hasWorkshop
        ? yup
            .string()
            .required()
            .label(messages['common.website'] as string)
        : yup.string(),
      have_own_land: hasWorkshop
        ? yup
            .string()
            .required()
            .label(messages['factory.factory_land_own_or_rented'] as string)
        : yup.string(),
      is_proprietorship: yup
        .string()
        .required()
        .label(messages['common.proprietorship'] as string),
      date_of_establishment: yup
        .string()
        .required()
        .label(messages['institute.establish_year'] as string),
      trade_licensing_authority: yup
        .string()
        .required()
        .label(
          messages['institute.trade_license_provider_authority'] as string,
        ),
      trade_license_path: yup
        .string()
        .required()
        .label(messages['trade_license.label'] as string),
      trade_license_last_renew_year: yup
        .string()
        .required()
        .label(messages['institute.last_renewal_year'] as string),
      have_tin: yup
        .string()
        .required()
        .label(messages['common.tin'] as string),
      investment_amount: yup
        .string()
        .required()
        .label(messages['invested_amount_in_institute.label'] as string),
      current_total_asset: yup.string(),
      is_registered_under_authority: yup
        .string()
        .required()
        .label(messages['institute.is_registered_under_authority'] as string),
      registered_authority: hasRegisteredAuthority
        ? yup.array().of(
            yup.object({
              id: yup.string(),
              value: yup
                .mixed()
                .label(messages['common.registered_no'] as string)
                .when('id', {
                  is: (value: string) => {
                    return checkedRegisteredAuthority.includes(value);
                  },
                  then: yup.string().required(),
                }),
            }),
          )
        : yup.array(),
      is_authorized_under_authority: yup
        .string()
        .required()
        .label(messages['institute.is_under_any_approved_authority'] as string),
      authorized_authority: hasAuthorizedAuthority
        ? yup.array().of(
            yup.object({
              id: yup.string(),
              value: yup
                .mixed()
                .label(messages['common.registered_no'] as string)
                .when('id', {
                  is: (value: string) => {
                    return checkedAuthorizedAuthority.includes(value);
                  },
                  then: yup.string().required(),
                }),
              name: yup
                .mixed()
                .label(messages['common.name'] as string)
                .when('id', {
                  is: (value: string) => {
                    return (
                      checkedAuthorizedAuthority.includes(value) &&
                      value == 'other_authority'
                    );
                  },
                  then: yup.string().required(),
                }),
            }),
          )
        : yup.array(),
      have_specialized_area: yup
        .string()
        .required()
        .label(messages['institute.is_under_any_special_region'] as string),
      specialized_area: isIndustryUnderSpecializedArea
        ? yup
            .array()
            .of(yup.object({id: yup.string()}))
            .required()
            .test({
              message: messages[
                'specialized_area.select_at_least_one'
              ] as string,
              test: () => checkedSpecializedArea.length > 0,
            })
            .label(messages['industry.specialized_areas'] as string)
        : yup.array(),
      is_under_sme_cluster: yup
        .string()
        .required()
        .label(messages['institute.is_under_any_sme_cluster'] as string),
      under_sme_cluster_id: isUnderSMECluster
        ? yup
            .string()
            .required()
            .label(messages['institute.under_sme_cluster_name'] as string)
        : yup.string(),
      is_under_of_association_or_chamber: yup
        .string()
        .required()
        .label(messages['institute.is_association_member'] as string),
      under_association_or_chamber_name: isAssociationMember
        ? yup
            .string()
            .required()
            .label(
              messages[
                'institute.member_of_association_or_chamber_name'
              ] as string,
            )
        : yup.string(),
      sector_id: yup
        .string()
        .required()
        .label(messages['institute.sector'] as string),
      other_sector_name: isOpenSectorOtherName
        ? yup
            .string()
            .required()
            .label(messages['institute.sector_other_name'] as string)
        : yup.string(),
      other_sector_name_en: yup.string(),
      business_type: yup
        .string()
        .required()
        .label(messages['business_type.label'] as string),
      main_product_name: yup
        .string()
        .required()
        .label(messages['institute.main_product'] as string),
      main_material_description: yup
        .string()
        .required()
        .label(messages['institute.raw_materials_details'] as string),
      is_import: yup
        .string()
        .required()
        .label(messages['institute.is_import_product'] as string),
      import_by: yup.string(),
      is_export: yup
        .string()
        .required()
        .label(messages['institute.is_export_product'] as string),
      export_abroad_by: yup.string(),
      industry_irc_no: isIndustryDoImport
        ? yup
            .string()
            .required()
            .label(messages['industry.import_export_irc_no'] as string)
        : yup.string(),
      salaried_manpower: yup.object(),
      have_bank_account: yup
        .string()
        .required()
        .label(messages['institute.has_bank_account'] as string),
      bank_account_type: hasBankAccount
        ? yup
            .object()
            .required()
            .label(messages['bank_account_type.label'] as string)
        : yup.string(),
      have_daily_accounting_system: yup
        .string()
        .required()
        .label(messages['institute.is_keep_daily_debit_credit'] as string),
      use_computer: yup
        .string()
        .required()
        .label(messages['institute.is_use_computer'] as string),
      have_internet_connection: yup
        .string()
        .required()
        .label(messages['institute.has_internet_connection'] as string),
      have_online_business: yup
        .string()
        .required()
        .label(messages['institute.has_online_business'] as string),
      info_provider_name:
        formFiller != FormFiller.SELF
          ? yup
              .string()
              .required()
              .label(messages['institute.info_provider_name'] as string)
          : yup.string(),
      info_provider_mobile: yup
        .string()
        .trim()
        .required()
        .matches(MOBILE_NUMBER_REGEX)
        .label(messages['institute.info_provider_mobile'] as string),
      info_collector_name:
        formFiller != FormFiller.SELF
          ? yup
              .string()
              .required()
              .label(messages['institute.info_collector_name'] as string)
          : yup.string(),
      info_collector_mobile: yup
        .string()
        .trim()
        .required()
        .matches(MOBILE_NUMBER_REGEX)
        .label(messages['institute.info_collector_mobile'] as string),
    });
  }, [
    locale,
    messages,
    formFiller,
    hasBankAccount,
    hasWorkshop,
    isAssociationMember,
    isIndustryUnderSpecializedArea,
    isUnderSMECluster,
    isOpenSectorOtherName,
    hasRegisteredAuthority,
    hasAuthorizedAuthority,
    isIndustryDoImport,
    checkedRegisteredAuthority,
    checkedAuthorizedAuthority,
    checkedSpecializedArea,
  ]);

  const {
    register,
    control,
    setError,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  console.log('the form errors man: ', errors);

  const YesNoArray = useMemo(() => {
    return [
      {
        key: Boolean.YES,
        label: messages['common.yes'],
      },
      {
        key: Boolean.NO,
        label: messages['common.no'],
      },
    ];
  }, []);

  const changeDivisionAction = useCallback(
    (divisionId: number) => {
      setDistrictsList(filterDistrictsByDivisionId(districts, divisionId));
    },
    [districts],
  );

  const changeDistrictAction = useCallback(
    (districtId: number) => {
      setUpazilasList(filterUpazilasByDistrictId(upazilas, districtId));
    },
    [upazilas],
  );

  const onChangeFactoryDivision = useCallback(
    (divisionId: number) => {
      setFactoryDistrictsList(
        filterDistrictsByDivisionId(districts, divisionId),
      );
    },
    [districts],
  );

  const onChangeFactoryDistrict = useCallback(
    (districtId: number) => {
      setFactoryUpazilasList(filterUpazilasByDistrictId(upazilas, districtId));
    },
    [upazilas],
  );

  const onChangeFormFiller = useCallback(
    (key: number) => {
      setFormFiller(key);
    },
    [formFiller],
  );

  const onChangeHasWorkshop = useCallback(
    (key: number) => {
      setHasWorkshop(key == HasWorkshopConstant.YES);
    },
    [hasWorkshop],
  );

  const handleRegisteredAuthorityCheck = useCallback(
    (checked: boolean, registeredAuthorityId: string, index: number) => {
      const formFieldName = 'registered_authority';
      let newAuthority: any = [...checkedRegisteredAuthority];

      if (checked && !newAuthority.includes(registeredAuthorityId)) {
        newAuthority.push(String(registeredAuthorityId));
      } else if (!checked && newAuthority.includes(registeredAuthorityId)) {
        newAuthority = newAuthority.filter(
          (item: any) => item != registeredAuthorityId,
        );
      }

      //clean the associated text field on uncheck
      if (!newAuthority.includes(registeredAuthorityId)) {
        let tmpValue: any = [...getValues(formFieldName)];
        tmpValue[index].value = undefined;
        setValue(formFieldName, tmpValue);
      }

      setCheckedRegisteredAuthority(newAuthority);
    },
    [checkedRegisteredAuthority],
  );

  const handleAuthorizedAuthorityCheck = useCallback(
    (checked: boolean, authorizedAuthorityId: string, index: number) => {
      const formFieldName = 'authorized_authority';
      let newAuthorityArr: any = [...checkedAuthorizedAuthority];

      if (checked && !newAuthorityArr.includes(authorizedAuthorityId)) {
        newAuthorityArr.push(String(authorizedAuthorityId));
      } else if (!checked && newAuthorityArr.includes(authorizedAuthorityId)) {
        newAuthorityArr = newAuthorityArr.filter(
          (item: any) => item != authorizedAuthorityId,
        );
      }

      //clean the associated text field on uncheck
      if (!newAuthorityArr.includes(authorizedAuthorityId)) {
        let tmpValue = getValues(formFieldName);
        tmpValue[index].value = undefined;
        tmpValue[index].name = undefined;
        setValue(formFieldName, tmpValue);
      }

      setCheckedAuthorizedAuthority(newAuthorityArr);
    },
    [checkedAuthorizedAuthority],
  );

  const handleSpecializedAreaCheck = useCallback(
    (checked: boolean, areaId: string, index: number) => {
      let newSpecializedAreaArr = [...checkedSpecializedArea];

      if (checked && !newSpecializedAreaArr.includes(areaId)) {
        newSpecializedAreaArr.push(String(areaId));
      } else if (!checked && newSpecializedAreaArr.includes(areaId)) {
        newSpecializedAreaArr = newSpecializedAreaArr.filter(
          (item: any) => item != areaId,
        );
      }

      setCheckedSpecializedArea(newSpecializedAreaArr);
    },
    [checkedSpecializedArea],
  );

  const handleHasRegisteredAuthorityChange = useCallback(
    (key: number | string) => {
      setHasRegisteredAuthority(key == Boolean.YES);
    },
    [hasRegisteredAuthority],
  );

  const handleHasAuthorizedAuthorityCheck = useCallback(
    (key: number | string) => {
      setHasAuthorizedAuthority(key == Boolean.YES);
    },
    [hasAuthorizedAuthority],
  );

  const handleInstituteIsUnderSpecializedArea = useCallback(
    (key: number | string) => {
      setIsIndustryUnderSpecializedArea(key == Boolean.YES);
    },
    [isIndustryUnderSpecializedArea],
  );

  const handleIsUnderSMECluster = useCallback(
    (key: number | string) => {
      setIsUnderSMECluster(key == Boolean.YES);
    },
    [isUnderSMECluster],
  );

  const handleIsAssociationMember = useCallback(
    (key: number | string) => {
      setIsAssociationMember(key == Boolean.YES);
    },
    [isAssociationMember],
  );

  const handleIsIndustryDoExport = useCallback(
    (key: number | string) => {
      setIsIndustryDoExport(key == Boolean.YES);
    },
    [isIndustryDoExport],
  );

  const handleIsIndustryDoImport = useCallback(
    (key: number | string) => {
      setIsIndustryDoImport(key == Boolean.YES);
    },
    [isIndustryDoImport],
  );

  const handleHasBankAccount = useCallback(
    (key: number | string) => {
      setHasBankAccount(key == Boolean.YES);
    },
    [hasBankAccount],
  );

  const handleSectorChange = useCallback(
    (sectorId: any) => {
      if (sectorId == 'other_sector') {
        setIsOpenSectorOtherName(true);
      } else {
        setIsOpenSectorOtherName(false);
      }
    },
    [memberStaticData],
  );

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    if (hasRegisteredAuthority) {
      data.registered_authority = data?.registered_authority
        .filter((item: any) => item.value)
        .map((item: any) => {
          return {authority_type: item.id, registration_number: item.value};
        });
    } else {
      delete data.registered_authority;
    }

    //change bank account types true false to 0, 1
    if (hasBankAccount) {
      data.bank_account_type.personal = data.bank_account_type.personal ? 0 : 1;
      data.bank_account_type.industry = data.bank_account_type.industry ? 0 : 1;
    }

    if (isIndustryDoImport) {
      data.import_type.direct = data.import_type.direct
        ? ImportExportType.DIRECT
        : delete data.import_type.direct;
      data.import_type.indirect = data.import_type.indirect
        ? ImportExportType.INDIRECT
        : delete data.import_type.indirect;
    }

    if (isIndustryDoExport) {
      data.export_type.direct = data.export_type.direct
        ? ImportExportType.DIRECT
        : delete data.export_type.direct;
      data.export_type.indirect = data.export_type.indirect
        ? ImportExportType.INDIRECT
        : delete data.export_type.indirect;
    }

    if (hasAuthorizedAuthority) {
      let otherAuthority = data?.authorized_authority
        .map((item: any) => {
          return {
            authority_type: 'other_authority',
            authority_name: item?.name,
            registration_number: item?.value,
          };
        })
        .filter((item: any) => item.id == 'other_authority');

      data.authorized_authority = data?.authorized_authority
        .filter((item: any) => item.id != 'other_authority' && item?.value)
        .map((item: any) => {
          return {
            authority_type: item.id,
            registration_number: item?.value,
          };
        });

      if (otherAuthority && otherAuthority.length > 0)
        data.other_authority = otherAuthority[0];
    } else {
      delete data.authorized_authority;
    }

    if (formFiller == FormFiller.UDC_ENTREPRENEUR) {
      data.udc_union = 1;
    }
    if (formFiller == FormFiller.CHAMBER_ASSOCIATION) {
      data.chamber_or_association_union_id = 1;
    }

    console.log('data: ', data);
    try {
      await registerSMEFMember(data);
      createSuccessMessage('smef_member.label');
      setIsSuccessRegistration(true);
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <CustomContainer maxWidth={'xl'}>
      {isSuccessRegistration ? (
        <RegistrationSuccessBox />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
          <Paper className={classes.PaperBox}>
            <Grid container py={2}>
              <Grid item xs={12}>
                <Grid container mb={2}>
                  <Grid item xs={12}>
                    <H1 centered={true} sx={{color: 'red'}}>
                      {messages['industry.sme_header_main']}
                    </H1>
                  </Grid>
                  <Grid item xs={12}>
                    <H2 centered={true}>
                      {messages['industry.sme_header_second']}
                    </H2>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container justifyContent={'center'}>
                      <Grid item xs={10}>
                        <Body1 centered={true}>
                          {messages['industry.sme_header_body_text']}
                        </Body1>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <StyledHeader item xs={12}>
                <Typography variant={'body1'} className={classes.headerText}>
                  {messages['common.who_will_fill_form']}
                </Typography>
              </StyledHeader>

              <Grid item xs={12}>
                <Grid container p={2}>
                  <Grid item xs={12}>
                    <FormRadioButtons
                      required
                      id={'form_fill_up_by'}
                      label={'form_filler'}
                      radios={[
                        {
                          key: FormFiller.SELF,
                          label: messages['common.self'],
                        },
                        {
                          key: FormFiller.CHAMBER_ASSOCIATION,
                          label: messages['common.chamber_association'],
                        },
                        {
                          key: FormFiller.SME_CLUSTER,
                          label: messages['common.sme_cluster'],
                        },
                      ]}
                      control={control}
                      onChange={onChangeFormFiller}
                      errorInstance={errors}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {formFiller == FormFiller.SME_CLUSTER && (
                <>
                  <StyledHeader item xs={12}>
                    <p className={classes.headerText}>
                      {messages['institute.SME_cluster_information']}
                    </p>
                  </StyledHeader>
                  <Grid item xs={12}>
                    <Grid container spacing={2} p={2}>
                      <Grid item xs={6}>
                        <CustomTextInput
                          required
                          id='smef_cluster_name'
                          label={messages['smef.sme_cluster_name']}
                          register={register}
                          errorInstance={errors}
                          isLoading={isLoading}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <CustomFilterableFormSelect
                          required
                          id='smef_cluster_loc_district_id'
                          label={messages['districts.label']}
                          isLoading={isLoadingDistricts}
                          control={control}
                          options={districts}
                          optionValueProp={'id'}
                          optionTitleProp={['title_en', 'title']}
                          errorInstance={errors}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <CustomFilterableFormSelect
                          required
                          id='smef_cluster_union_id'
                          label={messages['union.label']}
                          isLoading={isLoadingUnions}
                          control={control}
                          options={unions}
                          optionValueProp={'id'}
                          optionTitleProp={['title_en', 'title']}
                          errorInstance={errors}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <CustomTextInput
                          required
                          id='smef_cluster_code'
                          label={messages['common.code']}
                          register={register}
                          errorInstance={errors}
                          isLoading={isLoading}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}

              {formFiller == FormFiller.CHAMBER_ASSOCIATION && (
                <>
                  <StyledHeader item xs={12}>
                    <p className={classes.headerText}>
                      {messages['institute.chamber_association_information']}
                    </p>
                  </StyledHeader>
                  <Grid item xs={12}>
                    <Grid container spacing={2} p={2}>
                      <Grid item xs={6}>
                        <CustomTextInput
                          required
                          id='chamber_or_association_name'
                          label={messages['common.name']}
                          register={register}
                          errorInstance={errors}
                          isLoading={isLoading}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <CustomFormSelect
                          required
                          id='chamber_or_association_loc_district_id'
                          label={messages['districts.label']}
                          isLoading={isLoadingDistricts}
                          control={control}
                          options={districts}
                          optionValueProp={'id'}
                          optionTitleProp={['title_en', 'title']}
                          errorInstance={errors}
                        />
                      </Grid>
                      {/*<Grid item xs={6}>
                          <CustomFormSelect
                            required
                            id='chamber_or_association_union_id'
                            label={messages['union.label']}
                            isLoading={false}
                            control={control}
                            options={[{id: 1, title: 'Boidonath union'}]}
                            optionValueProp={'id'}
                            optionTitleProp={['title_en', 'title']}
                            errorInstance={errors}
                          />
                        </Grid>*/}
                      <Grid item xs={6}>
                        <CustomTextInput
                          required
                          id='chamber_or_association_code'
                          label={messages['common.code']}
                          register={register}
                          errorInstance={errors}
                          isLoading={isLoading}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}

              <StyledHeader item xs={12}>
                <p className={classes.headerText}>
                  {messages['entrepreneur_introduction.label']}
                </p>
              </StyledHeader>
              <Grid item xs={12}>
                <Grid container spacing={2} p={2}>
                  <Grid item xs={6}>
                    <CustomTextInput
                      required
                      id='entrepreneur_name'
                      label={messages['common.name']}
                      register={register}
                      errorInstance={errors}
                      isLoading={isLoading}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextInput
                      id='entrepreneur_name_en'
                      label={messages['common.name_en']}
                      register={register}
                      errorInstance={errors}
                      isLoading={isLoading}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormRadioButtons
                      required
                      id={'entrepreneur_gender'}
                      radios={[
                        {
                          key: Gender.MALE,
                          label: messages['common.male'],
                        },
                        {
                          key: Gender.FEMALE,
                          label: messages['common.female'],
                        },
                        {
                          key: Gender.OTHERS,
                          label: messages['common.third_gender'],
                        },
                      ]}
                      control={control}
                      label={'common.gender'}
                      errorInstance={errors}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomDateTimeField
                      required
                      id='entrepreneur_date_of_birth'
                      label={messages['common.date_of_birth']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextInput
                      required
                      id='entrepreneur_educational_qualification'
                      label={messages['user.academic_qualification']}
                      register={register}
                      errorInstance={errors}
                      isLoading={isLoading}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextInput
                      required
                      id='entrepreneur_nid'
                      label={messages['common.identity_type_nid']}
                      register={register}
                      errorInstance={errors}
                      isLoading={isLoading}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FileUploadComponent
                      required
                      id={'entrepreneur_nid_file_path'}
                      errorInstance={errors}
                      setValue={setValue}
                      register={register}
                      label={messages['common.national_identity']}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextInput
                      required
                      id='entrepreneur_mobile'
                      label={messages['common.mobile']}
                      register={register}
                      errorInstance={errors}
                      isLoading={isLoading}
                      placeholder='017XXXXXXXX'
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextInput
                      required
                      id='entrepreneur_email'
                      label={messages['common.email']}
                      register={register}
                      errorInstance={errors}
                      isLoading={isLoading}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FileUploadComponent
                      required
                      id={'entrepreneur_photo_path'}
                      errorInstance={errors}
                      setValue={setValue}
                      register={register}
                      label={messages['common.entrepreneur_pic']}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <StyledHeader item xs={12}>
                <p className={classes.headerText}>
                  {messages['common.institute_information']}
                </p>
              </StyledHeader>

              <Grid container spacing={2} p={2}>
                <Grid item xs={6}>
                  <CustomTextInput
                    required
                    id='trade_license_no'
                    label={messages['institute.trade_licence_number']}
                    register={register}
                    errorInstance={errors}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={6}>
                  <CustomTextInput
                    required
                    id='title'
                    label={messages['common.institute_name']}
                    register={register}
                    errorInstance={errors}
                    isLoading={isLoading}
                  />
                </Grid>

                <Grid item xs={6}>
                  <CustomTextInput
                    id='title_en'
                    label={messages['common.institute_name_en']}
                    register={register}
                    errorInstance={errors}
                    isLoading={isLoading}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomTextInput
                    required
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

                <Grid item xs={6}>
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
                    id='domain'
                    label={messages['common.website']}
                    register={register}
                    errorInstance={errors}
                    isLoading={isLoading}
                  />
                </Grid>
                <Grid item xs={6} />

                <Grid item xs={6}>
                  <FormRadioButtons
                    required
                    id='have_factory'
                    label={'common.has_workshop'}
                    radios={YesNoArray}
                    control={control}
                    onChange={onChangeHasWorkshop}
                    errorInstance={errors}
                  />
                </Grid>

                {hasWorkshop && (
                  <>
                    <Grid item xs={6} />
                    <Grid item xs={6}>
                      <CustomTextInput
                        required
                        id='factory_address'
                        label={messages['common.factory_address']}
                        register={register}
                        errorInstance={errors}
                        isLoading={isLoading}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <CustomTextInput
                        id='factory_address_en'
                        label={messages['common.factory_address_en']}
                        register={register}
                        errorInstance={errors}
                        isLoading={isLoading}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <CustomFormSelect
                        required
                        id='factory_loc_division_id'
                        label={messages['divisions.label']}
                        isLoading={isLoadingDivisions}
                        control={control}
                        options={divisions}
                        optionValueProp={'id'}
                        optionTitleProp={['title_en', 'title']}
                        errorInstance={errors}
                        onChange={onChangeFactoryDivision}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <CustomFormSelect
                        required
                        id='factory_loc_district_id'
                        label={messages['districts.label']}
                        isLoading={isLoadingDivisions}
                        control={control}
                        options={factoryDistrictsList}
                        optionValueProp={'id'}
                        optionTitleProp={['title_en', 'title']}
                        errorInstance={errors}
                        onChange={onChangeFactoryDistrict}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomFormSelect
                        required
                        id='factory_loc_upazila_id'
                        label={messages['upazilas.label']}
                        isLoading={isLoadingUpazilas}
                        control={control}
                        options={factoryUpazilasList}
                        optionValueProp={'id'}
                        optionTitleProp={['title_en', 'title']}
                        errorInstance={errors}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <CustomTextInput
                        id='factory_web_site'
                        label={messages['common.website']}
                        register={register}
                        errorInstance={errors}
                        isLoading={isLoading}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <FormRadioButtons
                        required
                        id={'have_office_or_showroom'}
                        label={'factory.office_or_showroom'}
                        radios={YesNoArray}
                        control={control}
                        errorInstance={errors}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <FormRadioButtons
                        required
                        id={'have_own_land'}
                        label={'factory.factory_land_own_or_rented'}
                        radios={[
                          {
                            key: 1,
                            label: messages['common.own'],
                          },
                          {
                            key: 2,
                            label: messages['common.rented'],
                          },
                        ]}
                        control={control}
                        errorInstance={errors}
                      />
                    </Grid>
                  </>
                )}
              </Grid>

              <StyledHeader item xs={12}>
                <Typography variant={'body1'} className={classes.headerText}>
                  {messages['common.institute_others_info']}
                </Typography>
              </StyledHeader>

              <Grid item xs={12}>
                <Grid container spacing={2} p={2}>
                  <Grid item xs={6}>
                    <FormRadioButtons
                      required
                      id={'is_proprietorship'}
                      radios={[
                        {
                          key: BusinessOwnership.SINGLE,
                          label: messages['business_ownership.single'],
                        },
                        {
                          key: BusinessOwnership.PARTNERSHIP,
                          label: messages['business_ownership.partnership'],
                        },
                        {
                          key: BusinessOwnership.JOINT,
                          label: messages['business_ownership.joint'],
                        },
                      ]}
                      control={control}
                      errorInstance={errors}
                      label={'common.business_ownership'}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormRadioButtons
                      required
                      id={'trade_licensing_authority'}
                      label={'institute.trade_license_provider_authority'}
                      radios={[
                        {
                          key: TradeLicensingAuthority.MUNICIPALITY,
                          label: messages['municipality.label'],
                        },
                        {
                          key: TradeLicensingAuthority.UNION_COUNCIL,
                          label: messages['union_council.label'],
                        },
                        {
                          key: TradeLicensingAuthority.CITY_CORPORATION,
                          label: messages['city_corporation.label'],
                        },
                      ]}
                      control={control}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <CustomDateTimeField
                      required
                      id='date_of_establishment'
                      label={messages['institute.establish_year']}
                      register={register}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FileUploadComponent
                      required
                      id={'trade_license_path'}
                      errorInstance={errors}
                      setValue={setValue}
                      register={register}
                      label={messages['upload_and_upload_type.upload']}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextInput
                      required
                      id={'trade_license_last_renew_year'}
                      label={messages['institute.last_renewal_year']}
                      type={'number'}
                      register={register}
                      errorInstance={errors}
                      isLoading={isLoading}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormRadioButtons
                      required
                      id={'have_tin'}
                      radios={YesNoArray}
                      control={control}
                      label={'institute.is_tin'}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <CustomTextInput
                      required
                      id='investment_amount'
                      type={'number'}
                      label={messages['invested_amount_in_institute.label']}
                      register={register}
                      errorInstance={errors}
                      isLoading={isLoading}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextInput
                      id='current_total_asset'
                      label={messages['institute.total_asset_amount']}
                      register={register}
                      errorInstance={errors}
                      isLoading={isLoading}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormRadioButtons
                      required
                      id={'is_registered_under_authority'}
                      label={'institute.is_registered_under_authority'}
                      radios={YesNoArray}
                      control={control}
                      errorInstance={errors}
                      onChange={handleHasRegisteredAuthorityChange}
                    />
                    {hasRegisteredAuthority && (
                      <CustomCheckboxTextInput
                        required
                        id={'registered_authority'}
                        data={memberStaticData?.registered_authority || []}
                        label={messages['industry.registered_authority']}
                        checkedDataArray={checkedRegisteredAuthority}
                        onChange={handleRegisteredAuthorityCheck}
                        register={register}
                        errors={errors}
                        isLoading={isLoading}
                        textFieldPlaceholder={messages['common.registered_no']}
                      />
                    )}
                  </Grid>

                  <Grid item xs={6}>
                    <FormRadioButtons
                      required
                      id={'is_authorized_under_authority'}
                      label={'institute.is_under_any_approved_authority'}
                      radios={YesNoArray}
                      control={control}
                      errorInstance={errors}
                      onChange={handleHasAuthorizedAuthorityCheck}
                    />

                    {hasAuthorizedAuthority && (
                      <CustomCheckboxTextInput
                        required
                        id={'authorized_authority'}
                        data={memberStaticData?.authorized_authority || []}
                        label={messages['industry.authorized_authority']}
                        checkedDataArray={checkedAuthorizedAuthority}
                        onChange={handleAuthorizedAuthorityCheck}
                        register={register}
                        errors={errors}
                        isLoading={isLoading}
                        textFieldPlaceholder={messages['common.approved_no']}
                      />
                    )}
                  </Grid>

                  <Grid item xs={6}>
                    <FormRadioButtons
                      required
                      id={'have_specialized_area'}
                      label={'institute.is_under_any_special_region'}
                      radios={YesNoArray}
                      control={control}
                      errorInstance={errors}
                      onChange={handleInstituteIsUnderSpecializedArea}
                    />
                    {isIndustryUnderSpecializedArea && (
                      <CustomCheckboxTextInput
                        required
                        id={'specialized_area'}
                        data={memberStaticData?.specialized_area || []}
                        label={messages['industry.specialized_areas']}
                        checkedDataArray={checkedSpecializedArea}
                        onChange={handleSpecializedAreaCheck}
                        register={register}
                        errors={errors}
                        isLoading={isLoading}
                        isTextFieldExist={false}
                      />
                    )}
                  </Grid>

                  <Grid item xs={6}>
                    <FormRadioButtons
                      required
                      id={'is_under_sme_cluster'}
                      label={'institute.is_under_any_sme_cluster'}
                      radios={YesNoArray}
                      control={control}
                      errorInstance={errors}
                      onChange={handleIsUnderSMECluster}
                    />
                    {isUnderSMECluster && (
                      <CustomFormSelect
                        required
                        id='under_sme_cluster_id'
                        label={messages['institute.under_sme_cluster_name']}
                        isLoading={false}
                        control={control}
                        options={memberStaticData?.smef_clusters || []}
                        optionValueProp={'id'}
                        optionTitleProp={['title_en', 'title']}
                        errorInstance={errors}
                      />
                    )}
                  </Grid>

                  <Grid item xs={6}>
                    <FormRadioButtons
                      required
                      id={'is_under_of_association_or_chamber'}
                      label={'institute.is_association_member'}
                      radios={YesNoArray}
                      control={control}
                      errorInstance={errors}
                      onChange={handleIsAssociationMember}
                    />
                    {isAssociationMember && (
                      <>
                        <CustomTextInput
                          required
                          id='under_association_or_chamber_name'
                          label={
                            messages[
                              'institute.member_of_association_or_chamber_name'
                            ]
                          }
                          register={register}
                          errorInstance={errors}
                        />
                        <CustomTextInput
                          id='under_association_or_chamber_name_en'
                          label={
                            messages[
                              'institute.member_of_association_or_chamber_name_en'
                            ]
                          }
                          register={register}
                          errorInstance={errors}
                          sx={{marginTop: '5px'}}
                        />
                      </>
                    )}
                  </Grid>

                  <Grid item xs={6}>
                    <CustomFormSelect
                      required
                      id='sector_id'
                      label={messages['institute.sector']}
                      isLoading={isLoadingMemberStaticData}
                      control={control}
                      options={memberStaticData?.sector || []}
                      optionValueProp={'id'}
                      optionTitleProp={['title_en', 'title']}
                      errorInstance={errors}
                      onChange={handleSectorChange}
                    />

                    {isOpenSectorOtherName && (
                      <Grid container spacing={2} mt={1}>
                        <Grid item xs={6}>
                          <CustomTextInput
                            required
                            id='other_sector_name'
                            label={messages['institute.sector_other_name']}
                            register={register}
                            errorInstance={errors}
                            isLoading={isLoadingMemberStaticData}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <CustomTextInput
                            id='other_sector_name_en'
                            label={messages['institute.sector_other_name_en']}
                            register={register}
                            errorInstance={errors}
                            isLoading={isLoadingMemberStaticData}
                          />
                        </Grid>
                      </Grid>
                    )}
                  </Grid>

                  <Grid item xs={6}>
                    <FormRadioButtons
                      required
                      id={'business_type'}
                      label={'business_type.label'}
                      radios={[
                        {
                          key: BusinessType.MANUFACTURING,
                          label: messages['business_type.manufacturing'],
                        },
                        {
                          key: BusinessType.SERVICE,
                          label: messages['business_type.service'],
                        },
                        {
                          key: BusinessType.TRADING,
                          label: messages['business_type.trading'],
                        },
                      ]}
                      control={control}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <CustomTextInput
                      required
                      id='main_product_name'
                      label={messages['institute.main_product']}
                      register={register}
                      errorInstance={errors}
                      isLoading={isLoading}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextInput
                      id='main_product_name_en'
                      label={messages['institute.main_product_name_en']}
                      register={register}
                      errorInstance={errors}
                      isLoading={isLoading}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <CustomTextInput
                      required
                      multiline={true}
                      rows={3}
                      id='main_material_description'
                      label={messages['institute.raw_materials_details']}
                      register={register}
                      errorInstance={errors}
                      isLoading={isLoading}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <CustomTextInput
                      multiline={true}
                      rows={3}
                      id='main_material_description_en'
                      label={messages['institute.raw_materials_details_en']}
                      register={register}
                      errorInstance={errors}
                      isLoading={isLoading}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormRadioButtons
                      required
                      id={'is_export'}
                      label={'institute.is_export_product'}
                      radios={[
                        {
                          key: Boolean.YES,
                          label: messages['common.yes'],
                        },
                        {
                          key: Boolean.NO,
                          label: messages['common.no'],
                        },
                      ]}
                      control={control}
                      errorInstance={errors}
                      onChange={handleIsIndustryDoExport}
                    />
                    {isIndustryDoExport && (
                      <>
                        <CustomCheckbox
                          id={'export_type.direct'}
                          label={messages['common.direct']}
                          checked={exportTypes[0]}
                          onChange={() => {
                            return setExportTypes([
                              !exportTypes[0],
                              exportTypes[1],
                            ]);
                          }}
                          register={register}
                          errorInstance={errors}
                          isLoading={false}
                        />
                        <CustomCheckbox
                          id={'export_types.indirect'}
                          label={messages['common.indirect']}
                          checked={exportTypes[1]}
                          onChange={() => {
                            return setExportTypes([
                              exportTypes[0],
                              !exportTypes[1],
                            ]);
                          }}
                          register={register}
                          errorInstance={errors}
                          isLoading={false}
                        />
                      </>
                    )}
                    {/*{isIndustryDoExport && (*/}
                    {/*  <CustomTextInput*/}
                    {/*    required*/}
                    {/*    id='export_abroad_by'*/}
                    {/*    label={messages['institute.exporter']}*/}
                    {/*    register={register}*/}
                    {/*    errorInstance={errors}*/}
                    {/*    isLoading={isLoading}*/}
                    {/*  />*/}
                    {/*)}*/}
                  </Grid>

                  <Grid item xs={6}>
                    <FormRadioButtons
                      required
                      id={'is_import'}
                      label={'institute.is_import_product'}
                      radios={[
                        {
                          key: Boolean.YES,
                          label: messages['common.yes'],
                        },
                        {
                          key: Boolean.NO,
                          label: messages['common.no'],
                        },
                      ]}
                      control={control}
                      onChange={handleIsIndustryDoImport}
                      errorInstance={errors}
                    />
                    {isIndustryDoImport && (
                      <Grid container>
                        <Grid item xs={6}>
                          <CustomCheckbox
                            id={'import_type.direct'}
                            label={messages['common.direct']}
                            checked={importTypes[0]}
                            onChange={() => {
                              return setImportTypes([
                                !importTypes[0],
                                importTypes[1],
                              ]);
                            }}
                            register={register}
                            errorInstance={errors}
                            isLoading={false}
                          />
                          <CustomCheckbox
                            id={'import_types.indirect'}
                            label={messages['common.indirect']}
                            checked={importTypes[1]}
                            onChange={() => {
                              return setImportTypes([
                                importTypes[0],
                                !importTypes[1],
                              ]);
                            }}
                            register={register}
                            errorInstance={errors}
                            isLoading={false}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <CustomTextInput
                            required
                            id='industry_irc_no'
                            label={messages['industry.import_export_irc_no']}
                            register={register}
                            errorInstance={errors}
                            isLoading={isLoading}
                          />
                        </Grid>
                        {/*<Grid item>*/}
                        {/*  <CustomTextInput*/}
                        {/*    required*/}
                        {/*    id='import_by'*/}
                        {/*    label={messages['institute.importer']}*/}
                        {/*    register={register}*/}
                        {/*    errorInstance={errors}*/}
                        {/*    isLoading={isLoading}*/}
                        {/*  />*/}
                        {/*</Grid>*/}
                      </Grid>
                    )}
                  </Grid>

                  <Grid item xs={12} m={0}>
                    <FormLabel>
                      {messages['institute.total_employee']}
                    </FormLabel>
                  </Grid>

                  <Grid item xs={4} className={classes.totalEmployeeFields}>
                    <CustomChipTextInput
                      fields={[
                        {
                          id: 'salaried_manpower.temporary_worker.male',
                          label: messages['common.male'],
                        },
                        {
                          id: 'salaried_manpower.temporary_worker.female',
                          label: messages['common.female'],
                        },
                      ]}
                      chipLabel={messages['total_employee.temporary']}
                      type={'number'}
                      register={register}
                      errorInstance={errors}
                      isLoading={isLoading}
                    />
                  </Grid>

                  <Grid item xs={4} className={classes.totalEmployeeFields}>
                    <CustomChipTextInput
                      fields={[
                        {
                          id: 'salaried_manpower.permanent_worker.male',
                          label: messages['common.male'],
                        },
                        {
                          id: 'salaried_manpower.permanent_worker.female',
                          label: messages['common.female'],
                        },
                      ]}
                      chipLabel={messages['total_employee.permanent']}
                      type={'number'}
                      register={register}
                      errorInstance={errors}
                      isLoading={isLoading}
                    />
                  </Grid>

                  <Grid item xs={4} className={classes.totalEmployeeFields}>
                    <CustomChipTextInput
                      fields={[
                        {
                          id: 'salaried_manpower.seasonal_worker.male',
                          label: messages['common.male'],
                        },
                        {
                          id: 'salaried_manpower.seasonal_worker.female',
                          label: messages['common.female'],
                        },
                      ]}
                      chipLabel={messages['total_employee.seasonal']}
                      type={'number'}
                      register={register}
                      errorInstance={errors}
                      isLoading={isLoading}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormRadioButtons
                      required
                      id={'have_bank_account'}
                      label={'institute.has_bank_account'}
                      radios={YesNoArray}
                      control={control}
                      errorInstance={errors}
                      onChange={handleHasBankAccount}
                    />

                    {hasBankAccount && (
                      <Grid item xs={6}>
                        <FormControlLabel
                          control={<></>}
                          label={messages['bank_account_type.label'] as string}
                        />
                        <CustomCheckbox
                          id={'bank_account_type.personal'}
                          label={messages['bank_account_type.personal']}
                          checked={bankAccountTypes[0]}
                          onChange={() => {
                            return setBankAccountTypes([
                              !bankAccountTypes[0],
                              bankAccountTypes[1],
                            ]);
                          }}
                          register={register}
                          errorInstance={errors}
                          isLoading={false}
                        />
                        <CustomCheckbox
                          id={'bank_account_type.industry'}
                          label={
                            messages['bank_account_type.of_the_organization']
                          }
                          checked={bankAccountTypes[1]}
                          onChange={() => {
                            return setBankAccountTypes([
                              bankAccountTypes[0],
                              !bankAccountTypes[1],
                            ]);
                          }}
                          register={register}
                          errorInstance={errors}
                          isLoading={false}
                        />
                      </Grid>
                    )}
                  </Grid>

                  <Grid item xs={6}>
                    <FormRadioButtons
                      required
                      id={'have_daily_accounting_system'}
                      label={'institute.is_keep_daily_debit_credit'}
                      radios={YesNoArray}
                      control={control}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormRadioButtons
                      required
                      id={'use_computer'}
                      label={'institute.is_use_computer'}
                      radios={YesNoArray}
                      control={control}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormRadioButtons
                      required
                      id={'have_internet_connection'}
                      label={'institute.has_internet_connection'}
                      radios={YesNoArray}
                      control={control}
                      errorInstance={errors}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormRadioButtons
                      required
                      id={'have_online_business'}
                      label={'institute.has_online_business'}
                      radios={YesNoArray}
                      control={control}
                      errorInstance={errors}
                    />
                  </Grid>
                  <Grid item xs={6} />

                  {formFiller != FormFiller.SELF && (
                    <>
                      <Grid item xs={6}>
                        <CustomTextInput
                          required
                          id='info_provider_name'
                          label={messages['institute.info_provider_name']}
                          register={register}
                          errorInstance={errors}
                          isLoading={isLoading}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <CustomTextInput
                          required
                          id='info_provider_mobile'
                          label={messages['institute.info_provider_mobile']}
                          register={register}
                          errorInstance={errors}
                          isLoading={isLoading}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <CustomTextInput
                          required
                          id='info_collector_name'
                          label={messages['institute.info_collector_name']}
                          register={register}
                          errorInstance={errors}
                          isLoading={isLoading}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <CustomTextInput
                          required
                          id='info_collector_mobile'
                          label={messages['institute.info_collector_mobile']}
                          register={register}
                          errorInstance={errors}
                          isLoading={isLoading}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
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
          </Paper>
        </form>
      )}
    </CustomContainer>
  );
};

export default SMEFMemberRegistrationForm;
