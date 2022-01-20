import React from 'react';
import {Button, Grid} from '@mui/material';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import IconList from '../../../@softbd/icons/IconList';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import {useFetchOrganization} from '../../../services/organaizationManagement/hooks';

type Props = {
  itemId: number;
  onClose: () => void;
  onApprove: (id: any) => void;
};

const MemberListDetailsPopup = ({itemId, ...props}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetchOrganization(itemId);
  return (
    <>
      <CustomDetailsViewMuiModal
        open={true}
        {...props}
        title={
          <>
            <IconList />
            <IntlMessages id='common.industry_details' />
          </>
        }
        maxWidth={'md'}
        actions={
          <>
            <Button
              color={'primary'}
              variant={'contained'}
              startIcon={<DoneIcon />}
              onClick={() => props.onApprove(itemData?.id)}>
              {messages['common.accept']}
            </Button>

            <Button
              variant={'contained'}
              startIcon={<DeleteIcon />}
              color={'secondary'}
              onClick={props.onClose}>
              {messages['common.reject']}
            </Button>
          </>
        }>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.title']}
              value={itemData?.title}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['menu.organization_type']}
              value={itemData?.organization_type_title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.mobile']}
              value={itemData?.mobile}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.email']}
              value={itemData?.email}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['divisions.label']}
              value={itemData?.loc_division_title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['districts.label']}
              value={itemData?.loc_district_title}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.address']}
              value={itemData?.address}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomChipRowStatus
              label={messages['common.active_status']}
              value={itemData?.row_status}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default MemberListDetailsPopup;
