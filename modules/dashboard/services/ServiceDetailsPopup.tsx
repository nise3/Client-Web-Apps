import React, {useEffect, useState} from 'react';
import {Grid} from '@material-ui/core';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {getService} from "../../../services/organaizationManagement/OrganizationServiceService";
import IconService from "../../../@softbd/icons/IconService";
import DecoratedRowStatus from "../../../@softbd/elements/display/DecoratedRowStatus/DecoratedRowStatus";

type Props = {
  itemId: number | null;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const ServiceDetailsPopup = ({itemId, openEditModal, ...props}: Props) => {
  const [itemData, setItemData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {messages} = useIntl();

  useEffect(() => {
    if (itemId) {
      setItemState(itemId);
    }
  }, [itemId]);

  const setItemState = async (itemId: number) => {
    setIsLoading(true);
    let response = await getService(itemId);
    if (response) {
      setItemData(response.data);
    }
    setIsLoading(false);
  };

  return (
      <>
        <CustomDetailsViewMuiModal
            maxWidth={'sm'}
            open={true}
            {...props}
            title={
              <>
                <IconService />
                <IntlMessages id='services.label' />
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
                  label={messages['common.title_en']}
                  value={itemData?.title_en}
                  isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <DetailsInputView
                  label={messages['common.title_bn']}
                  value={itemData?.title_bn}
                  isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <DetailsInputView
                  label={messages['common.status']}
                  value={<DecoratedRowStatus rowStatus={itemData?.row_status} />}
                  isLoading={isLoading}
              />
            </Grid>
          </Grid>
        </CustomDetailsViewMuiModal>
      </>
  );
};
export default ServiceDetailsPopup;
