import React from 'react';
import {Grid} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import {WorkOutline} from '@mui/icons-material';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import {
  useFetchCMSGlobalConfig,
  useFetchSlider,
} from '../../../services/cmsManagement/hooks';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const SliderDetailsPopup = ({itemId, openEditModal, ...props}: Props) => {
  const {data: itemData, isLoading} = useFetchSlider(itemId);
  const {messages} = useIntl();

  const {data: cmsGlobalConfig} = useFetchCMSGlobalConfig();

  const languageLabel = (key: string) => {
    let label: string = '';
    cmsGlobalConfig?.language_configs.map((lang: any) => {
      if (lang.code === key) {
        label = lang.native_name;
      }
    });
    return label;
  };

  return (
    <>
      <CustomDetailsViewMuiModal
        maxWidth={'md'}
        open={true}
        {...props}
        title={
          <>
            <WorkOutline />
            <IntlMessages id='slider.label' />
          </>
        }
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
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.title']}
              value={itemData?.title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.sub_title']}
              value={itemData?.sub_title}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={6}>
            <DetailsInputView
              label={messages['faq.show_in']}
              value={itemData?.show_in_label}
              isLoading={isLoading}
            />
          </Grid>

          {itemData?.institute_title && (
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['common.institute_name']}
                value={itemData?.institute_title}
                isLoading={isLoading}
              />
            </Grid>
          )}

          {itemData?.organization_title && (
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['organization.label']}
                value={itemData?.organization_title}
                isLoading={isLoading}
              />
            </Grid>
          )}

          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.is_button_available']}
              value={itemData?.is_button_available ? 'Yes' : 'No'}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.link']}
              value={itemData?.link}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.button_text']}
              value={itemData?.button_text}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.alt_title']}
              value={itemData?.alt_title}
              isLoading={isLoading}
            />
          </Grid>

          {itemData?.slider_images?.length > 0 &&
            itemData?.slider_images.map((image: string) => {
              return (
                <Grid item xs={6} key={new Date().getTime()}>
                  <DetailsInputView
                    label={messages['slider.images']}
                    value={image}
                    isLoading={isLoading}
                  />
                </Grid>
              );
            })}

          {Object.keys(itemData?.other_language_fields || {}).map(
            (key: string) =>
              itemData?.other_language_fields.hasOwnProperty(key) && (
                <Grid item xs={12} md={12}>
                  <fieldset>
                    {<legend>{languageLabel(key)}</legend>}
                    <p>
                      {messages['common.title']}: <br />
                      {itemData?.other_language_fields[key].title}
                    </p>
                    <p>
                      {messages['common.sub_title']}: <br />
                      {itemData?.other_language_fields[key].sub_title}
                    </p>
                    <p>
                      {messages['common.button_text']}: <br />
                      {itemData?.other_language_fields[key].button_text}
                    </p>
                    <p>
                      {messages['common.alt_title']}: <br />
                      {itemData?.other_language_fields[key].alt_title}
                    </p>
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
export default SliderDetailsPopup;
