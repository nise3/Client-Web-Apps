import React from "react";
import { Grid } from "@mui/material";
import CancelButton from "../../../@softbd/elements/button/CancelButton/CancelButton";
import CustomDetailsViewMuiModal from "../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal";
import EditButton from "../../../@softbd/elements/button/EditButton/EditButton";
import { useIntl } from "react-intl";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import DetailsInputView from "../../../@softbd/elements/display/DetailsInputView/DetailsInputView";
import { isBreakPointUp } from "../../../@crema/utility/Utils";
import { useFetchRPLOccupation, useFetchRTOCountries } from "../../../services/CertificateAuthorityManagement/hooks";
import IconOccupation from "../../../@softbd/icons/IconOccupation";

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const RPLOccupationsDetailsPopup = ({
  itemId,
  openEditModal,
  ...props
}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetchRPLOccupation(itemId);

  const {data: countries} = useFetchRTOCountries();

  const getCountryLabel = (country_id: number | string) => {
    let label: string = '';
    countries?.map((country: any) => {
      if (country.country_id == country_id) {
        label = country.title;
      }
    });
    return label;
  };

  return (
    <>
      <CustomDetailsViewMuiModal
        {...props}
        open={true}
        title={
          <>
            <IconOccupation />
            <IntlMessages id='rpl_occupation.label' />
          </>
        }
        maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
            <EditButton
              variant={'contained'}
              onClick={() => openEditModal(itemData.id)}
              isLoading={isLoading}
            />
          </>
        }>
        <Grid container spacing={5}>
          <Grid item xs={12} md={12}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <DetailsInputView
                  label={messages['rpl_sector.name']}
                  value={itemData?.rpl_sector_title}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={12}>
                <DetailsInputView
                  label={messages['rpl_occupation.name']}
                  value={itemData?.title}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={12}>
                <DetailsInputView
                  label={messages['rpl_occupation.name_en']}
                  value={itemData?.title_en}
                  isLoading={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>

          {countries &&
            Object.keys(itemData?.translations || {}).map(
              (country_id: string) => (
                <Grid item xs={12} md={12} key={country_id}>
                  <fieldset>
                    <legend>{getCountryLabel(country_id)}</legend>
                    <Grid container spacing={5}>
                      <Grid item xs={12}>
                        <DetailsInputView
                          label={messages['rpl_occupation.name']}
                          value={itemData?.translations[country_id]?.title}
                          isLoading={isLoading}
                        />
                      </Grid>
                    </Grid>
                  </fieldset>
                </Grid>
              ),
            )}
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};
export default RPLOccupationsDetailsPopup;
