import React, {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {getOccupation} from '../../../services/organaizationManagement/OccupationService';
import CancelButton from '../../../@softbd/elements/Button/CancelButton';
import EditButton from '../../../@softbd/elements/Button/EditButton';
import Box from '@material-ui/core/Box';
import {Grid} from '@material-ui/core';
import DetailsInputView from '../../../@softbd/elements/DetailsInputView';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal';

type Props = {
  title: string;
  itemId: number | null;
  open: boolean;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const OccupationDetailsPopup = ({itemId, title, ...props}: Props) => {
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
    let occupation = await getOccupation(itemId);
    if (occupation) {
      setItemData(occupation);
    }
    setIsLoading(false);
  };

  return (
    <CustomDetailsViewMuiModal
      {...props}
      title={title}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <EditButton
            onClick={() => props.openEditModal(itemData.id)}
            isLoading={isLoading}
            variant={'contained'}
          />
        </>
      }>
      <Box py={5} px={{xs: 5, lg: 8, xl: 10}}>
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
              label={messages['occupations.job_sector_title']}
              value={itemData?.job_sector_title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <DetailsInputView
              label={messages['common.status']}
              value={
                itemData?.row_status == 1
                  ? (messages['common.active'] as string)
                  : (messages['common.inactive'] as string)
              }
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </Box>
    </CustomDetailsViewMuiModal>
  );
};

export default OccupationDetailsPopup;
