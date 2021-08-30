import React, {useEffect, useState} from 'react';
import {Grid} from '@material-ui/core';
import CancelButton from '../../../@softbd/elements/Button/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/Button/EditButton';
import DetailsInputView from '../../../@softbd/elements/DetailsInputView';
import {getRankType} from '../../../services/instituteManagement/RankTypeService';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChipRowStatus from '../../../@softbd/elements/CustomChipRowStatus';
import IconRankType from '../../../@softbd/icons/IconRankType';

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
            <IconRankType />
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
              <CustomChipRowStatus
                value={itemData?.row_status}
                isLoading={isLoading}
                label={messages['common.active_status']}
              />
            </Grid>
          </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};
export default RankTypeDetailsPopup;
