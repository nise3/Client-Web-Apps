import React, {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal';
import {RoomOutlined} from '@material-ui/icons';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/Button/CancelButton';
import EditButton from '../../../@softbd/elements/Button/EditButton';
import {Grid} from '@material-ui/core';
import DetailsInputView from '../../../@softbd/elements/DetailsInputView';
import {getUpazila} from '../../../services/locationManagement/UpazilaService';
import DecoratedRowStatus from '../../../@softbd/elements/DecoratedRowStatus';

type Props = {
  itemId: number | null;
  open: boolean;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const UpazilaDetailsPopup = ({itemId, ...props}: Props) => {
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
    let upazila = await getUpazila(itemId);
    if (upazila) {
      setItemData(upazila);
    }
    setIsLoading(false);
  };

  return (
    <>
      <CustomDetailsViewMuiModal
        maxWidth={'sm'}
        {...props}
        title={
          <>
            <RoomOutlined />
            <IntlMessages id='upazilas.label' />
          </>
        }
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
            <EditButton
              onClick={() => props.openEditModal(itemData.id)}
              isLoading={isLoading}
            />
          </>
        }>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <DetailsInputView
              label={messages['divisions.label']}
              value={itemData?.division_title_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <DetailsInputView
              label={messages['districts.label']}
              value={itemData?.district_title_en}
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
          <Grid item xs={12}>
            <DetailsInputView
              label={messages['common.title_bn']}
              value={itemData?.title_bn}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <DetailsInputView
              label={messages['common.bbs_code']}
              value={itemData?.bbs_code}
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

export default UpazilaDetailsPopup;