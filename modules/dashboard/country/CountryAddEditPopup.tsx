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

import IconCountry from "../../../@softbd/icons/IconCountry";
import { processServerSideErrors } from "../../../@softbd/utilities/validationErrorHandler";
import { useAuthUser } from "../../../@crema/utility/AppHooks";
import { isBreakPointUp } from "../../../@crema/utility/Utils";
import { useFetchCountries } from "../../../services/locationManagement/hooks";
import CustomSelectAutoComplete from "../../youth/registration/CustomSelectAutoComplete";
import { ICountry } from "../../../shared/Interface/country.interface";

interface CountryAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

// const initialValues = {
//   countries: []
// };

const CountryAddEditPopup: FC<CountryAddEditPopupProps> = ({
                                                             itemId,
                                                             refreshDataTable,
                                                             ...props
                                                           }) => {
  const { messages } = useIntl();
  const { errorStack } = useNotiStack();
  const isEdit = itemId != null;
  const authUser = useAuthUser();


  // const { createSuccessMessage, updateSuccessMessage } = useSuccessMessage();

  const {
    data: countryData,
    isLoading
    // mutate: mutateCountry,
  } = useFetchCountries(itemId);

  const [countryFilters] = useState<any>({});
  const { data: countries, isLoading: isCountriesLoading } =
    useFetchCountries(countryFilters);

  const [countryList, setCountryList] = useState<any>([]);
  //console.log('countries: ', countryList);
  useEffect(() => {
    if (countryData && countries) {
      const filteredData = isEdit
        ? countries.filter(
          (cntry: any) => cntry.id != countryData.id
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

  //let [selCountry,setSelCountry] = useState<any>([])
  const onSubmit: SubmitHandler<any> = async (data: any) => {


    try {
      if (itemId) {
        //await updateCountry(itemId, data);
        //updateSuccessMessage("country.label");
        //mutateCountry();
        //console.log(itemId,'updated to',data);
        // <CountryPage c={data}/>
        data.country.map((c: any) => {
          console.log(c.title);
        });
        console.log(data);


      } else {
        //await createCountry(data);
        //createSuccessMessage("country.label");
        //setSelCountry([...data])
        // <CountryPage c={data}/>
        data.country.map((c: any) => {
          console.log(c.title);
        });
        console.log(data);

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
          <IconCountry />
          {isEdit ? (
            <IntlMessages
              id="common.edit"
              values={{ subject: <IntlMessages id="country.label" /> }}
            />
          ) : (
            <IntlMessages
              id="common.add_new"
              values={{ subject: <IntlMessages id="country.label" /> }}
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
            optionValueProp={"id"}
            optionTitleProp={["title"]}
            errorInstance={errors}
            //defaultValue={selCountry}
            // onChange={onCountriesChange}
          />
        </Grid>


      </Grid>
    </HookFormMuiModal>
  );
};
export default CountryAddEditPopup;
