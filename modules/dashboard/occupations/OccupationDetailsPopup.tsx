import React, {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {getOccupation} from '../../../services/organaizationManagement/OccupationService';
import CancelButton from '../../../@softbd/elements/Button/CancelButton/CancelButton';
import EditButton from '../../../@softbd/elements/Button/EditButton';
import Box from '@material-ui/core/Box';
import {Grid} from '@material-ui/core';
import DetailsInputView from '../../../@softbd/elements/DetailsInputView';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal';
import {BusinessCenter} from '@material-ui/icons';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import DecoratedRowStatus from '../../../@softbd/elements/DecoratedRowStatus';

type Props = {
  itemId: number | null;
  open: boolean;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const OccupationDetailsPopup = ({itemId, ...props}: Props) => {
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
      title={
        <>
          <BusinessCenter />
          <IntlMessages id='occupations.label' />
        </>
      }
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
              label={messages['job_sectors.label']}
              value={itemData?.job_sector_title}
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
      </Box>
    </CustomDetailsViewMuiModal>
  );
};

export default OccupationDetailsPopup;
