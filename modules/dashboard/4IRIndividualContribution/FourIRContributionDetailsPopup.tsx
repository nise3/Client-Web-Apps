import React from 'react';
import {Grid} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {useFetch4IROneProjectContribution} from '../../../services/4IRManagement/hooks';
type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: any;
  memberId: number;
};

const FourIRContributionDetailsPopup = ({
  itemId,
  openEditModal,
  memberId,
  ...props
}: Props) => {
  const {messages} = useIntl();

  const {data: itemData, isLoading} =
    useFetch4IROneProjectContribution(memberId);

  return (
    <>
      <CustomDetailsViewMuiModal
        open={true}
        {...props}
        title={
          <>
            <IconBranch />
            <IntlMessages id='common.contributions' />
          </>
        }
        maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
            {itemData && (
              <EditButton
                variant='contained'
                onClick={() =>
                  openEditModal(itemData.four_ir_initiative_id, itemData.id)
                }
                isLoading={isLoading}
              />
            )}
          </>
        }>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <DetailsInputView
              label={messages['common.contributions']}
              value={
                <div
                  dangerouslySetInnerHTML={{
                    __html: itemData?.contribution?.contribution,
                  }}
                />
              }
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default FourIRContributionDetailsPopup;
