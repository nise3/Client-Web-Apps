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
import ImageView from '../../../@softbd/elements/display/ImageView/ImageView';
import {isBreakPointUp} from '../../../@crema/utility/Utils';

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
        maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
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
              label={messages['common.title_en']}
              value={itemData?.title_en}
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
              label={messages['common.industry_association_sub_trade']}
              value={(itemData?.sub_trades || [])
                .map((subTrade: any) => subTrade?.title)
                .join(', ')}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.memberId']}
              value={itemData?.id}
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
              label={messages['common.fax_no']}
              value={itemData?.fax_no}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.name_of_the_office_head']}
              value={itemData?.name_of_the_office_head}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.name_of_the_office_head_en']}
              value={itemData?.name_of_the_office_head_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.name_of_the_office_head_designation']}
              value={itemData?.name_of_the_office_head_designation}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.name_of_the_office_head_designation_en']}
              value={itemData?.name_of_the_office_head_designation_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.contact_person_name']}
              value={itemData?.contact_person_name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.contact_person_name_en']}
              value={itemData?.contact_person_name_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.contact_person_mobile']}
              value={itemData?.contact_person_mobile}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.contact_person_email']}
              value={itemData?.contact_person_email}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.contact_person_designation']}
              value={itemData?.contact_person_designation}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.contact_person_designation_en']}
              value={itemData?.contact_person_designation_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.description']}
              value={itemData?.description}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.description_en']}
              value={itemData?.description_en}
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
              label={messages['upazilas.label']}
              value={itemData?.loc_upazila_title}
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
            <DetailsInputView
              label={messages['common.address_en']}
              value={itemData?.address_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.location_latitude']}
              value={itemData?.location_latitude}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.location_longitude']}
              value={itemData?.location_longitude}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.google_map_src']}
              value={itemData?.google_map_src}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ImageView
              label={messages['common.logo']}
              imageUrl={itemData?.logo}
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
