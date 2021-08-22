import React, {useEffect, useState} from 'react';
import {getInstitute} from '../../../services/instituteManagement/InstituteService';
import Box from '@material-ui/core/Box';
import {Grid} from '@material-ui/core';
import CancelButton from '../../../@softbd/elements/Button/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/Button/EditButton';
import DetailsInputView from '../../../@softbd/DetailsInputView';
import {sleep} from '../../../@softbd/common/helpers';

type Props = {
  title: string;
  itemId: number | null;
  open: boolean;
  onClose: () => void;
  openEditModal: (id: number) => void;
}

const InstituteDetailsPopup = ({itemId, ...props}: Props) => {

  const [itemData, setItemData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (itemId) {
      setItemState(itemId);
    }
  }, [itemId]);

  const setItemState = async (itemId: number) => {
    setIsLoading(true);
    let institute = await getInstitute(itemId);
    await sleep(3000);
    if (institute) {
      setItemData(institute);
    }
    setIsLoading(false);
  };

  return (
    <>
      <CustomDetailsViewMuiModal
        {...props}
        title={'View institute'}
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading}/>
            <EditButton variant={'contained'} onClick={() => props.openEditModal(itemData.id)} isLoading={isLoading}/>
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
              <DetailsInputView label={'email'} value={itemData?.email} isLoading={isLoading} />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView label={'code'} value={itemData?.code} isLoading={isLoading} />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView label={'domain'} value={itemData?.domain} isLoading={isLoading} />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView label={'primary_phone'} value={itemData?.primary_phone} isLoading={isLoading} />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView label={'primary_mobile'} value={itemData?.primary_mobile} isLoading={isLoading} />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView label={'address'} value={itemData?.address} isLoading={isLoading} />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView label={'google_map_src'} value={itemData?.google_map_src} isLoading={isLoading} />
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
export default InstituteDetailsPopup;