import React from "react";
import { Grid } from "@mui/material";
import CancelButton from "../../../@softbd/elements/button/CancelButton/CancelButton";
import CustomDetailsViewMuiModal from "../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal";
import EditButton from "../../../@softbd/elements/button/EditButton/EditButton";
import DetailsInputView from "../../../@softbd/elements/display/DetailsInputView/DetailsInputView";
import { useIntl } from "react-intl";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import { isBreakPointUp } from "../../../@crema/utility/Utils";
import IconCountry from "../../../@softbd/icons/IconCountry";
import { useFetchCountries } from "../../../services/locationManagement/hooks";

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const CountryDetailsPopup = ({itemId, openEditModal, ...props}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetchCountries(itemId);

  return (
    <>
      <CustomDetailsViewMuiModal
      open={true}
        {...props}
        title={
          <>
            <IconCountry />
            <IntlMessages id='country.label' />
          </>
        }
        maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
            {itemData && (
              <EditButton
                variant='contained'
                onClick={() => openEditModal(itemData.id)}
                isLoading={isLoading}
              />
            )}
          </>
        }>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <DetailsInputView
              label={messages['common.title']}
              value={itemData?.title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <DetailsInputView
              label={messages['common.title_en']}
              value={itemData?.title_en}
              isLoading={isLoading}
            />
          </Grid>

          {/*<Grid item xs={12}>*/}
          {/*  <CustomChipRowStatus*/}
          {/*    label={messages['common.active_status']}*/}
          {/*    value={itemData?.row_status}*/}
          {/*    isLoading={isLoading}*/}
          {/*  />*/}
          {/*</Grid>*/}
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default CountryDetailsPopup;
