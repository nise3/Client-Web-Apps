import yup from "../../../@softbd/libs/yup";
import { Grid } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { FC, useEffect, useMemo, useState, useCallback } from "react";
import HookFormMuiModal from "../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal";
import SubmitButton from "../../../@softbd/elements/button/SubmitButton/SubmitButton";
import useNotiStack from "../../../@softbd/hooks/useNotifyStack";
import { useIntl } from "react-intl";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import CancelButton from "../../../@softbd/elements/button/CancelButton/CancelButton";

import IconCountry from "../../../@softbd/icons/IconCountry";
import { processServerSideErrors } from "../../../@softbd/utilities/validationErrorHandler";
import { isBreakPointUp } from "../../../@crema/utility/Utils";
import { useFetchCountries } from "../../../services/locationManagement/hooks";
import CustomSelectAutoComplete from "../../youth/registration/CustomSelectAutoComplete";
import { ICountry } from "../../../shared/Interface/country.interface";
import { createRTOCountry } from "../../../services/CertificateAuthorityManagement/RTOCountryService";
import { useFetchRTOCountries } from "../../../services/CertificateAuthorityManagement/hooks";
import useSuccessMessage from "../../../@softbd/hooks/useSuccessMessage";

interface CountryAddEditPopupProps {
  onClose: () => void;
  refreshDataTable: () => void;
}

const RTOCountryAddEditPopup: FC<CountryAddEditPopupProps> = ({ refreshDataTable, ...props }) => {
  const { messages } = useIntl();
  const { errorStack } = useNotiStack();

  const { createSuccessMessage } = useSuccessMessage();

  const {
    data: countryData,
    isLoading,
    mutate: mutateCountry
  } = useFetchRTOCountries();

  /** only this one will come from location hooks, all others should be from your own service */
  const [countryFilters] = useState<any>({});
  const { data: countries, isLoading: isCountriesLoading } =
    useFetchCountries(countryFilters);

  const [countryList, setCountryList] = useState<any>([]);
  //console.log('countries: ', countryList);

  useEffect(() => {
    if (countryData && countries) {
      const filteredData = countries.filter((cntry: any) => cntry.id != countryData.id);
      setCountryList(filteredData);
    }
  }, [countryData, countries]);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      country: yup
        .array()
        .of(yup.object())
    });
  }, [messages]);

  const onCountriesChange = useCallback((options) => {
    setCountryList(options);
  }, []);

  const {
    control,
    //register,
    //reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ICountry>({
    resolver: yupResolver(validationSchema)
  });


  // useEffect(() => {
  //   if (countryData) {
  //     reset({
  //       title_en: countryData?.title_en,
  //       title: countryData?.title,
  //       row_status: String(countryData?.row_status)
  //     });
  //
  //   }
  //   // else {
  //   //   reset(initialValues);
  //   // }
  // }, [countryData]);

  let [selectedCountry,setSelectedCountry] = useState<any>([])

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      const idArr = data.country.map((c: any) => c.id);
      delete data["country"];
      data.country_ids = idArr;
      await createRTOCountry(data);
      createSuccessMessage("country.label");
      console.log(data);
      mutateCountry();
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
          <IconCountry />
            <IntlMessages
              id="common.add_new"
              values={{ subject: <IntlMessages id="country.label" /> }}
            />
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

        <Grid item xs={12}>
          <CustomSelectAutoComplete
            id="country"
            label="Countries"
            control={control}
            isLoading={isCountriesLoading}
            options={countryList}
            optionValueProp={"id"}
            optionTitleProp={["title"]}
            errorInstance={errors}
            defaultValue={countryData}
            // onChange={onCountriesChange}
          />
        </Grid>


      </Grid>
    </HookFormMuiModal>
  );
};
export default RTOCountryAddEditPopup;
