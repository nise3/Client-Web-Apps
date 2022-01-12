import React from 'react';
import {Grid} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import {useFetchSlider} from '../../../services/cmsManagement/hooks';
import IconSlider from '../../../@softbd/icons/IconSlider';
import ShowInTypes from '../../../@softbd/utilities/ShowInTypes';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const SliderDetailsPopup = ({itemId, openEditModal, ...props}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetchSlider(itemId);

  return (
    <>
      <CustomDetailsViewMuiModal
        maxWidth={'sm'}
        open={true}
        {...props}
        title={
          <>
            <IconSlider />
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
          <Grid item xs={12}>
            <DetailsInputView
              label={messages['faq.show_in']}
              value={itemData?.show_in_label}
              isLoading={isLoading}
            />
          </Grid>

          {itemData?.show_in && itemData.show_in == ShowInTypes.TSP && (
            <Grid item xs={12}>
              <DetailsInputView
                label={messages['common.institute_name']}
                value={itemData?.institute_title}
                isLoading={isLoading}
              />
            </Grid>
          )}

          {itemData?.show_in && itemData.show_in == ShowInTypes.INDUSTRY && (
            <Grid item xs={12}>
              <DetailsInputView
                label={messages['organization.label']}
                value={itemData?.organization_title}
                isLoading={isLoading}
              />
            </Grid>
          )}

          {itemData?.show_in &&
            itemData.show_in == ShowInTypes.INDUSTRY_ASSOCIATION && (
              <Grid item xs={12}>
                <DetailsInputView
                  label={messages['common.industry_association']}
                  value={itemData?.industry_association_title}
                  isLoading={isLoading}
                />
              </Grid>
            )}

          <Grid item xs={12}>
            <DetailsInputView
              label={messages['common.title']}
              value={itemData?.title}
              isLoading={isLoading}
            />
          </Grid>

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
