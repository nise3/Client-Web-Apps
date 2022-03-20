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
    data: serverSelectedCountries,
    isLoading,
    mutate: mutateCountry
  } = useFetchRTOCountries();


  const [countryFilters] = useState<any>({});
  const { data: allCountries, isLoading: isCountriesLoading } =
    useFetchCountries(countryFilters);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      country: yup
        .array()
        .of(yup.object())
    });
  }, [messages]);

  const onCountriesChange = useCallback((options) => {
    setSelectedCountry(options);
  }, []);

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ICountry>({
    resolver: yupResolver(validationSchema)
  });


  useEffect(() => {
      serverSelectedCountries?.map((single_country_server: any) => single_country_server.id = single_country_server.country_id);
      setSelectedCountry(serverSelectedCountries);
    }, [serverSelectedCountries]
  );

  let [selectedCountry, setSelectedCountry] = useState<any>([]);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      const countriesId = data.country.map((singleCountry: any) => singleCountry.id);
      delete data["country"];
      data.country_ids = countriesId;
      await createRTOCountry(data);
      createSuccessMessage("country.label");
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
            values={{ subject: <IntlMessages id="rto_country.label" /> }}
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
          {selectedCountry && (
            <CustomSelectAutoComplete
              id="country"
              label="Countries"
              control={control}
              isLoading={isCountriesLoading}
              options={allCountries}
              optionValueProp={"id"}
              optionTitleProp={["title"]}
              errorInstance={errors}
              defaultValue={selectedCountry}
              onChange={onCountriesChange}
            />
          )}
        </Grid>

      </Grid>
    </HookFormMuiModal>
  );
};
export default RTOCountryAddEditPopup;
