import React, {useState} from 'react';
import {Grid} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import ImageView from '../../../@softbd/elements/display/ImageView/ImageView';
import {useFetch4IRProjectContribution} from '../../../services/4IRManagement/hooks';

type Props = {
  itemId: number;
  initiativeId: number | null;
  onClose: () => void;
  // openEditModal: (id: number) => void;
};

const FourIRInitiativeUserDetailsPopup = ({
  itemId,
  initiativeId,
  ...props
}: Props) => {
  const {messages} = useIntl();
  const [contributionFilter] = useState<any>({
    four_ir_initiative_id: initiativeId,
    user_id: itemId,
  });

  console.log(itemId, initiativeId);
  const {data: itemData, isLoading} =
    useFetch4IRProjectContribution(contributionFilter);

  console.log(itemData);
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
          </>
        }>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <ImageView
              label={messages['common.file']}
              imageUrl={itemData && itemData[0] && itemData[0]?.file_path}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.name']}
              value={itemData && itemData[0] && itemData[0]?.team_member_name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.organization']}
              value={itemData && itemData[0] && itemData[0]?.organization}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.contact_number']}
              value={
                itemData && itemData[0] && itemData[0]?.team_member_phone_number
              }
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.designation']}
              value={
                itemData && itemData[0] && itemData[0]?.team_member_designation
              }
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.email']}
              value={itemData && itemData[0] && itemData[0]?.team_member_email}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['4ir.role_or_responsibility']}
              value={
                itemData && itemData[0] && itemData[0]?.role_responsibility
              }
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12}>
            <DetailsInputView
              label={messages['common.contribution']}
              value={
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      itemData && itemData[0] && itemData[0]?.contribution,
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

export default FourIRInitiativeUserDetailsPopup;
