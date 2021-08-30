import React, {useEffect, useState} from 'react';
import {Grid} from '@material-ui/core';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {getOrganizationUnitType} from '../../../services/organaizationManagement/OrganizationUnitTypeService';
import {useIntl} from 'react-intl';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconOrganizationUnitType from '../../../@softbd/icons/IconOrganizationUnitType';

type Props = {
  itemId: number | null;
  open: boolean;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const OrganizationUnitTypeDetailsPopup = ({itemId, ...props}: Props) => {
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
    let organizationUnitType = await getOrganizationUnitType(itemId);
    if (organizationUnitType) {
      setItemData(organizationUnitType);
    }
    setIsLoading(false);
  };

  return (
    <>
      <CustomDetailsViewMuiModal
        {...props}
        title={
          <>
            <IconOrganizationUnitType />
            <IntlMessages id='organization_unit_type.label' />
          </>
        }
        maxWidth={'sm'}
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
              label={messages['common.organization.label']}
              value={itemData?.organization_name}
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
export default OrganizationUnitTypeDetailsPopup;
