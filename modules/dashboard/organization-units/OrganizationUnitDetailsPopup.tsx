import React, {useCallback, useEffect, useState} from 'react';
import {Grid} from '@material-ui/core';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconOrganization from '../../../@softbd/icons/IconOrganization';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import {getOrganizationUnit} from '../../../services/organaizationManagement/OrganizationUnitService';

type Props = {
  itemId: number | null;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const OrganizationUnitDetailsPopup = ({
  itemId,
  openEditModal,
  ...props
}: Props) => {
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
    let organizationUnit = await getOrganizationUnit(itemId);
    if (organizationUnit) {
      setItemData(organizationUnit);
    }
    setIsLoading(false);
  };

  const getServicesName = useCallback(
    (services: any = []) => {
      let namesArray = services.map((item: Service) => item.title_en);
      return namesArray.join();
    },
    [itemId],
  );

  return (
    <>
      <CustomDetailsViewMuiModal
        {...props}
        open={true}
        title={
          <>
            <IconOrganization />
            <IntlMessages id='organization_unit.label' />
          </>
        }
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
            <EditButton
              onClick={() => openEditModal(itemData.id)}
              isLoading={isLoading}
              variant={'contained'}
            />
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
              label={messages['organization_unit_type.label']}
              value={itemData?.organization_unit_type_title_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['divisions.label']}
              value={itemData?.loc_division_title_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['districts.label']}
              value={itemData?.loc_district_title_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['upazilas.label']}
              value={itemData?.loc_upazila_title_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.email']}
              value={itemData?.email}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.fax_no']}
              value={itemData?.fax_no}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.mobile']}
              value={itemData?.mobile}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.contact_person_name']}
              value={itemData?.contact_person_name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.contact_person_mobile']}
              value={itemData?.contact_person_mobile}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.contact_person_mobile']}
              value={itemData?.contact_person_mobile}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.contact_person_designation']}
              value={itemData?.contact_person_designation}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['organization_unit.employee_size']}
              value={itemData?.employee_size}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['service.label']}
              value={getServicesName(itemData?.services)}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
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
export default OrganizationUnitDetailsPopup;
