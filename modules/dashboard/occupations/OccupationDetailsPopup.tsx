import React, {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {getOccupation} from '../../../services/organaizationManagement/OccupationService';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import {Grid} from '@material-ui/core';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import DecoratedRowStatus from '../../../@softbd/elements/display/DecoratedRowStatus/DecoratedRowStatus';
import IconOccupation from '../../../@softbd/icons/IconOccupation';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const OccupationDetailsPopup = ({itemId, openEditModal, ...props}: Props) => {
  const {messages} = useIntl();
  const [itemData, setItemData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (itemId) {
      setItemState(itemId);
    }
  }, [itemId]);

  const setItemState = async (itemId: number) => {
    setIsLoading(true);
    let response = await getOccupation(itemId);
    if (response) {
      setItemData(response.data);
    }
    setIsLoading(false);
  };

  return (
    <CustomDetailsViewMuiModal
      {...props}
      open={true}
      maxWidth={'sm'}
      title={
        <>
          <IconOccupation />
          <IntlMessages id='occupations.label' />
        </>
      }
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <EditButton
            onClick={() => openEditModal(itemData.id)}
            isLoading={isLoading}
            variant={'contained'}
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
            label={messages['job_sectors.label']}
            value={itemData?.job_sector_title_en}
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
  );
};

export default OccupationDetailsPopup;
