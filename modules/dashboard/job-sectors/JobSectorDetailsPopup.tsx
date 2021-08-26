import React, {useEffect, useState} from 'react';
import {getJobSector} from '../../../services/organaizationManagement/JobSectorService';
import {Grid} from '@material-ui/core';
import CancelButton from '../../../@softbd/elements/Button/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/Button/EditButton';
import DetailsInputView from '../../../@softbd/elements/DetailsInputView';
import {useIntl} from 'react-intl';
import DecoratedRowStatus from '../../../@softbd/elements/DecoratedRowStatus';
import {WorkOutline} from '@material-ui/icons';

type Props = {
  title: string;
  itemId: number | null;
  open: boolean;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const JobSectorDetailsPopup = ({itemId, ...props}: Props) => {
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
    let institute = await getJobSector(itemId);
    if (institute) {
      setItemData(institute);
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
            <WorkOutline />
            {'View Job Sector'}
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
export default JobSectorDetailsPopup;
