import React from 'react';
import {Grid} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {
  useFetchRPLLevel,
  useFetchRTOCountries,
} from '../../../services/CertificateAuthorityManagement/hooks';
import IconRplLevel from '../../../@softbd/icons/IconRplLevel';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const LevelDetailsPopup = ({itemId, openEditModal, ...props}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetchRPLLevel(itemId);

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
            <IconRplLevel />
            <IntlMessages id='rpl_level.label' />
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
              <Grid item xs={12} md={6}>
                <DetailsInputView
                  label={messages['common.title']}
                  value={itemData?.title}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DetailsInputView
                  label={messages['common.title_en']}
                  value={itemData?.title_en}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DetailsInputView
                  label={messages['occupations.label']}
                  value={itemData?.rpl_occupation_title}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DetailsInputView
                  label={messages['rpl_sector.label']}
                  value={itemData?.rpl_sector_title}
                  isLoading={isLoading}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DetailsInputView
                  label={messages['rpl_level.sequence_order']}
                  value={itemData?.sequence_order}
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
                          label={messages['common.title']}
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
export default LevelDetailsPopup;
