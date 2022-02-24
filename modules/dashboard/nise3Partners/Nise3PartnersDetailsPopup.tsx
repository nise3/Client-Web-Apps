import React from 'react';
import {Grid} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import {
  useFetchCMSGlobalConfig,
  useFetchPartner,
} from '../../../services/cmsManagement/hooks';
import {getLanguageLabel} from '../../../@softbd/utilities/helpers';
import LanguageCodes from '../../../@softbd/utilities/LanguageCodes';
import ImageView from '../../../@softbd/elements/display/ImageView/ImageView';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import IconNise3Partner from '../../../@softbd/icons/IconNise3Partner';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const Nise3PartnersDetailsPopup = ({
  itemId,
  openEditModal,
  ...props
}: Props) => {
  const {messages} = useIntl();

  const {data: itemData, isLoading} = useFetchPartner(itemId);
  const {data: cmsGlobalConfig} = useFetchCMSGlobalConfig();

  return (
    <>
      <CustomDetailsViewMuiModal
        open={true}
        {...props}
        title={
          <>
            <IconNise3Partner />
            <IntlMessages id='nise.partners' />
          </>
        }
        maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
            <EditButton
              onClick={() => openEditModal(itemData.id)}
              isLoading={isLoading}
            />
          </>
        }>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.domain']}
              value={itemData?.domain}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ImageView
              label={messages['common.main_image_path']}
              imageUrl={itemData?.main_image_path}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ImageView
              label={messages['common.thumb_image_path']}
              imageUrl={itemData?.thumb_image_path}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ImageView
              label={messages['common.grid_image_path']}
              imageUrl={itemData?.grid_image_path}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12}>
            <fieldset>
              <legend>
                {getLanguageLabel(
                  cmsGlobalConfig?.language_configs,
                  LanguageCodes.BANGLA,
                )}
              </legend>
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
                    label={messages['common.image_alt_title']}
                    value={itemData?.image_alt_title}
                    isLoading={isLoading}
                  />
                </Grid>
              </Grid>
            </fieldset>
          </Grid>

          {Object.keys(itemData?.other_language_fields || {}).map(
            (key: string) => (
              <Grid item xs={12} key={key}>
                <fieldset>
                  <legend>
                    {getLanguageLabel(cmsGlobalConfig?.language_configs, key)}
                  </legend>
                  <Grid container spacing={5}>
                    <Grid item xs={12} md={6}>
                      <DetailsInputView
                        label={messages['common.title']}
                        value={itemData.other_language_fields[key]?.title}
                        isLoading={isLoading}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <DetailsInputView
                        label={messages['common.image_alt_title']}
                        value={
                          itemData.other_language_fields[key]?.image_alt_title
                        }
                        isLoading={isLoading}
                      />
                    </Grid>
                  </Grid>
                </fieldset>
              </Grid>
            ),
          )}

          <Grid item xs={12}>
            <CustomChipRowStatus
              label={messages['common.status']}
              value={itemData?.row_status}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};
export default Nise3PartnersDetailsPopup;
