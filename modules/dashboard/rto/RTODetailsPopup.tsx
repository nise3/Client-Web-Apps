import React from 'react';
import {Grid} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconInstitute from '../../../@softbd/icons/IconInstitute';
import DecoratedRowStatus from '../../../@softbd/elements/display/DecoratedRowStatus/DecoratedRowStatus';
import {useFetchRTO} from '../../../services/CertificateAuthorityManagement/hooks';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {InstituteTypes} from '../../../@softbd/utilities/InstituteTypes';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const ERPLInstituteDetailsPopup = ({
  itemId,
  openEditModal,
  ...props
}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetchRTO(itemId);

  return (
    <>
      <CustomDetailsViewMuiModal
        {...props}
        open={true}
        title={
          <>
            <IconInstitute />
            <IntlMessages id='rto.details' />
          </>
        }
        maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
            <EditButton
              variant={'contained'}
              onClick={() => openEditModal(itemData.id)}
              isLoading={isLoading}
            />
          </>
        }>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.title_en']}
              value={itemData?.title_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.title']}
              value={itemData?.title}
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
              label={messages['common.code']}
              value={itemData?.code}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['institute.type']}
              value={
                itemData?.institute_type_id == InstituteTypes.GOVERNMENT
                  ? messages['common.government']
                  : messages['common.non_government']
              }
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['rto_country.label']}
              value={itemData?.country_title_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.phone']}
              value={itemData?.primary_phone}
              isLoading={isLoading}
            />
          </Grid>
          {itemData?.phone_numbers &&
            Array.isArray(itemData.phone_numbers) &&
            itemData.phone_numbers.map((phone: any, index: any) => {
              return (
                <Grid item xs={12} md={6} key={index}>
                  <DetailsInputView
                    label={messages['common.phone'] + ' #' + (index + 1)}
                    value={phone}
                    isLoading={isLoading}
                  />
                </Grid>
              );
            })}
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['divisions.label']}
              value={itemData?.division_title_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['districts.label']}
              value={itemData?.district_title_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['upazilas.label']}
              value={itemData?.upazila_title_en}
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
              label={messages['common.mobile']}
              value={itemData?.primary_mobile}
              isLoading={isLoading}
            />
          </Grid>
          {itemData?.mobile_numbers &&
            Array.isArray(itemData.mobile_numbers) &&
            itemData.mobile_numbers.map((mobile: any, index: any) => {
              return (
                <Grid item xs={12} md={6} key={index}>
                  <DetailsInputView
                    label={messages['common.mobile'] + ' #' + (index + 1)}
                    value={mobile}
                    isLoading={isLoading}
                  />
                </Grid>
              );
            })}
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.google_map_src']}
              value={itemData?.google_map_src}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
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
export default ERPLInstituteDetailsPopup;
