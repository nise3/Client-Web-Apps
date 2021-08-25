import React, {useEffect, useState} from 'react';
import Box from '@material-ui/core/Box';
import {Grid} from '@material-ui/core';
import CancelButton from '../../../@softbd/elements/Button/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/Button/EditButton';
import DetailsInputView from '../../../@softbd/DetailsInputView';
import {getRankType} from '../../../services/instituteManagement/RankTypeService';

type Props = {
  title: string;
  itemId: number | null;
  open: boolean;
  onClose: () => void;
  openEditModal: (id: number) => void;
}

const RankTypeDetailsPopup = ({itemId, ...props}: Props) => {

  const [itemData, setItemData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (itemId) {
      setItemState(itemId);
    }
  }, [itemId]);

  const setItemState = async (itemId: number) => {
    setIsLoading(true);
    let rankType = await getRankType(itemId);
    if (rankType) {
      setItemData(rankType);
    }
    setIsLoading(false);
  };

  return (
    <>
      <CustomDetailsViewMuiModal
        {...props}
        title={'View Rank Type'}
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
            {
              itemData && <EditButton variant="contained" onClick={() => props.openEditModal(itemData.id)} isLoading={isLoading} />
            }
          </>
        }>
        <Box py={5} px={{xs: 5, lg: 8, xl: 10}}>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <DetailsInputView label={'title_en'} value={itemData?.title_en} isLoading={isLoading} />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView label={'title_bn'} value={itemData?.title_bn} isLoading={isLoading} />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView label={'email'} value={itemData?.description} isLoading={isLoading} />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView label={'code'} value={itemData?.organization_id} isLoading={isLoading} />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView label={'active_status'} value={itemData?.row_status == 1 ? 'active' : 'inactive'}
                                isLoading={isLoading} />
            </Grid>
          </Grid>
        </Box>
      </CustomDetailsViewMuiModal>
    </>
  );
};
export default RankTypeDetailsPopup;