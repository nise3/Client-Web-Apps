import yup from "../../../@softbd/libs/yup";
import { Grid } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { FC, useEffect, useMemo, useState } from "react";
import HookFormMuiModal from "../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal";
import SubmitButton from "../../../@softbd/elements/button/SubmitButton/SubmitButton";
import useNotiStack from "../../../@softbd/hooks/useNotifyStack";
import { useIntl } from "react-intl";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import CancelButton from "../../../@softbd/elements/button/CancelButton/CancelButton";

import IconBranch from "../../../@softbd/icons/IconBranch";
import { processServerSideErrors } from "../../../@softbd/utilities/validationErrorHandler";

import useSuccessMessage from "../../../@softbd/hooks/useSuccessMessage";
import { useAuthUser } from "../../../@crema/utility/AppHooks";
import { IBranch } from "../../../shared/Interface/institute.interface";
import { isBreakPointUp } from "../../../@crema/utility/Utils";
import { useFetchCountries } from "../../../services/locationManagement/hooks";
import CustomSelectAutoComplete from "../../youth/registration/CustomSelectAutoComplete";
// import { createCountry, updateCountry } from "../../../services/CertificateAuthorityManagement/CountryService";
// import { ICountry } from "../../../shared/Interface/country.interface";

interface BranchAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

// const initialValues = {
//   countries: []
// };

const CountryAddEditPopup: FC<BranchAddEditPopupProps> = ({
                                                            itemId,
                                                            refreshDataTable,
                                                            ...props
                                                          }) => {
  const { messages } = useIntl();
  const { errorStack } = useNotiStack();
  const isEdit = itemId != null;
  const authUser = useAuthUser();


  const { createSuccessMessage, updateSuccessMessage } = useSuccessMessage();

  const {
    data: countryData,
    isLoading,
    //mutate: mutateCountry,
  } = useFetchCountries(itemId);

  const [countryFilters] = useState<any>({});
  const {data: countries, isLoading: isCountriesLoading} =
    useFetchCountries(countryFilters);

  const [countryList, setCountryList] = useState<any>([]);
  //console.log('countries: ', countryList);
  useEffect(() => {
    if (countryData && countries) {
      const filteredData = isEdit
        ? countries.filter(
          (cntry: any) => cntry.id != countryData.id,
        )
        : countries;
      setCountryList(filteredData);
    }
  }, [countryData, countries]);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      country: yup
        .array()
        .of(yup.object())
    });
  }, [messages, authUser]);

  // const onCountriesChange = useCallback((options) => {
  //   setCountryList(options);
  // }, []);

  const {
    control,
    // register,
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<IBranch>({
    resolver: yupResolver(validationSchema)
  });


  useEffect(() => {
    if (countryData) {
      reset({
        title_en: countryData?.title_en,
        title: countryData?.title,
        row_status: String(countryData?.row_status)
      });

    }
    // else {
    //   reset(initialValues);
    // }
  }, [countryData]);


  const onSubmit: SubmitHandler<any> = async (data: any) => {


    try {
      if (itemId) {
        //await updateCountry(itemId, data);
        updateSuccessMessage("branch.label");
        // mutateCountry();
        console.log(itemId,'updated to',data);
      } else {
        //await createCountry(data);
        createSuccessMessage("branch.label");
        console.log('created',data);
      }
      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({ error, setError, validationSchema, errorStack });
    }
  };

  return (
    <HookFormMuiModal
      open={true}
      {...props}
      title={
        <>
          <IconBranch />
          {isEdit ? (
            <IntlMessages
              id="common.edit"
              values={{ subject: <IntlMessages id="branch.label" /> }}
            />
          ) : (
            <IntlMessages
              id="common.add_new"
              values={{ subject: <IntlMessages id="branch.label" /> }}
            />
          )}
        </>
      }
      maxWidth={isBreakPointUp("xl") ? "lg" : "md"}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
        </>
      }>
      <Grid container spacing={5}>

        <Grid item xs={6}>
          <CustomSelectAutoComplete
            id="country"
            label="Countries"
            control={control}
            isLoading={isCountriesLoading}
            options={countryList}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            errorInstance={errors}
            // onChange={onCountriesChange}
          />
        </Grid>


      </Grid>
    </HookFormMuiModal>
  );
};
export default CountryAddEditPopup;
