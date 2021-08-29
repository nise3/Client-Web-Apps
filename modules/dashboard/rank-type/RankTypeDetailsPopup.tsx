import React, {useEffect, useState} from 'react';
import Box from '@material-ui/core/Box';
import {Grid} from '@material-ui/core';
import CancelButton from '../../../@softbd/elements/Button/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/Button/EditButton';
import DetailsInputView from '../../../@softbd/elements/DetailsInputView';
import {getRankType} from '../../../services/instituteManagement/RankTypeService';
import {useIntl} from 'react-intl';
import {WorkOutline} from '@material-ui/icons';
import IntlMessages from '../../../@crema/utility/IntlMessages';

type Props = {
  itemId: number | null;
  open: boolean;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const RankTypeDetailsPopup = ({itemId, ...props}: Props) => {
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
        title={
          <>
            <WorkOutline />
            <IntlMessages id='rank_types.label' />
          </>
        }
        maxWidth={'sm'}
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
            {itemData && (
              <EditButton
                variant='contained'
                onClick={() => props.openEditModal(itemData.id)}
                isLoading={isLoading}
              />
            )}
          </>
        }>
        <Box py={5} px={{xs: 5, lg: 8, xl: 10}}>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['common.title_en']}
                value={itemData?.title_en}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['common.title_bn']}
                value={itemData?.title_bn}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['organization.label']}
                value={itemData?.organization_title_en}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['common.description']}
                value={itemData?.description}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['common.active_status']}
                value={itemData?.row_status == 1 ? messages['common.active'] : messages['common.inactive']}
                isLoading={isLoading}
              />
            </Grid>
          </Grid>
        </Box>
      </CustomDetailsViewMuiModal>
    </>
  );
};
export default RankTypeDetailsPopup;
