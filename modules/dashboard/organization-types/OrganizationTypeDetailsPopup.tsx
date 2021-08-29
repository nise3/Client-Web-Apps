import React, {useEffect, useState} from 'react';
import {Grid} from '@material-ui/core';
import CancelButton from '../../../@softbd/elements/Button/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/Button/EditButton';
import DetailsInputView from '../../../@softbd/elements/DetailsInputView';
import {getOrganizationType} from '../../../services/organaizationManagement/OrganizationTypeService';
import {useIntl} from 'react-intl';
import CustomChipRowStatus from '../../../@softbd/elements/CustomChipRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconOrganizationType from '../../../@softbd/icons/IconOrganizationType';

type Props = {
  itemId: number | null;
  open: boolean;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const OrganizationTypeDetailsPopup = ({itemId, ...props}: Props) => {
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
    let organizationType = await getOrganizationType(itemId);
    if (organizationType) {
      setItemData(organizationType);
    }
    setIsLoading(false);
  };

  return (
    <>
      <CustomDetailsViewMuiModal
        {...props}
        title={
          <>
            <IconOrganizationType />
            <IntlMessages id='organization_type.label' />
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
              label={messages['organization_type.is_government']}
              value={
                itemData?.is_government == 1
                  ? (messages['common.yes'] as string)
                  : (messages['common.no'] as string)
              }
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomChipRowStatus
              value={itemData?.row_status}
              label={messages['common.status']}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};
export default OrganizationTypeDetailsPopup;
