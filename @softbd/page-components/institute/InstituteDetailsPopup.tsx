import React, {useEffect, useState} from 'react';
import {getInstitute} from '../../../services/instituteManagement/InstituteService';
import CancelButton from '../../elements/Button/CancelButton';
import Box from '@material-ui/core/Box';
import {Grid} from '@material-ui/core';
import CustomDetailsViewMuiModal from '../../CustomDetailsViewMuiModal';
import EditButton from '../../elements/Button/EditButton';
import DetailsInputView from '../../utilities/DetailsInputView';

type Props = {
  title: string;
  itemId: number | null;
  open: boolean;
  onClose: () => void;
  openEditModal: (id: number) => void;
}

const InstituteDetailsPopup = ({itemId, ...props}: Props) => {

  const [itemData, setItemData] = useState<any>(null);

  useEffect(() => {
    if (itemId) {
      setItemState(itemId);
    }
  }, [itemId]);

  const setItemState = async (itemId: number) => {
    let institute = await getInstitute(itemId);
    if (institute) {
      setItemData(institute);
    }
  };

  return (
    <>
      <CustomDetailsViewMuiModal
        {...props}
        title={'View institute'}
        actions={
          <>
            <CancelButton onClick={props.onClose} />
            <EditButton onClick={() => props.openEditModal(itemData.id)} />
          </>
        }>
        <Box py={5} px={{xs: 5, lg: 8, xl: 10}}>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <DetailsInputView label={'title_en'} value={itemData?.title_en} />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView label={'title_bn'} value={itemData?.title_bn} />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView label={'email'} value={itemData?.email} />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView label={'code'} value={itemData?.code} />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView label={'domain'} value={itemData?.domain} />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView label={'primary_phone'} value={itemData?.primary_phone} />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView label={'primary_mobile'} value={itemData?.primary_mobile} />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView label={'address'} value={itemData?.address} />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView label={'google_map_src'} value={itemData?.google_map_src} />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView label={'active_status'} value={itemData?.row_status == 1 ? 'active' : 'inactive'} />
            </Grid>
          </Grid>
        </Box>
      </CustomDetailsViewMuiModal>
    </>
  );
};
export default InstituteDetailsPopup;