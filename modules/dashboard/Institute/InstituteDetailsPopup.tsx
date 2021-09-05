import React, {useEffect, useState} from 'react';
import {getInstitute} from '../../../services/instituteManagement/InstituteService';
import {Grid} from '@material-ui/core';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconInstitute from '../../../@softbd/icons/IconInstitute';
import DecoratedRowStatus from '../../../@softbd/elements/display/DecoratedRowStatus/DecoratedRowStatus';

type Props = {
  itemId: number | null;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const InstituteDetailsPopup = ({itemId, ...props}: Props) => {
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
    let response = await getInstitute(itemId);
    if (response) {
      setItemData(response.data);
    }
    setIsLoading(false);
  };

  return (
    <>
      <CustomDetailsViewMuiModal
        {...props}
        open={true}
        title={
          <>
            <IconInstitute />
            <IntlMessages id='institute.label' />
          </>
        }
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
            <EditButton
              variant={'contained'}
              onClick={() => props.openEditModal(itemData.id)}
              isLoading={isLoading}
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
              label={messages['common.email']}
              value={itemData?.email}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.code']}
              value={itemData?.code}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
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
                <Grid item xs={6}>
                  <DetailsInputView
                    label={messages['common.phone'] + ' #' + index}
                    value={phone}
                    isLoading={isLoading}
                  />
                </Grid>
              );
            })}

          <Grid item xs={6}>
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
                <Grid item xs={6}>
                  <DetailsInputView
                    label={messages['common.mobile'] + ' #' + index}
                    value={mobile}
                    isLoading={isLoading}
                  />
                </Grid>
              );
            })}

          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.domain']}
              value={itemData?.domain}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['divisions.label']}
              value={itemData?.division_title_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['districts.label']}
              value={itemData?.district_title_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['upazilas.label']}
              value={itemData?.upazila_title_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.address']}
              value={itemData?.address}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <DetailsInputView
              label={messages['common.google_map_src']}
              value={itemData?.google_map_src}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
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
export default InstituteDetailsPopup;
