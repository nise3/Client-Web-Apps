import React from 'react';
import {Grid} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconInstitute from '../../../@softbd/icons/IconInstitute';
import {useFetchFAQ} from '../../../services/instituteManagement/hooks';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const FAQDetailsPopup = ({itemId, openEditModal, ...props}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetchFAQ(itemId);

  return (
    <>
      <CustomDetailsViewMuiModal
        {...props}
        open={true}
        title={
          <>
            <IconInstitute />
            <IntlMessages id='menu.faq' />
          </>
        }
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
        <h3 style={{textAlign: 'center'}}>{itemData?.show_in_label}</h3>
        <h4>Language: Bangla</h4>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <fieldset>
              <legend>{messages['faq.question']}</legend>
              <p>{itemData?.question}</p>
            </fieldset>
          </Grid>
          <Grid item xs={12} md={6}>
            <fieldset>
              <legend>{messages['faq.answer']}</legend>
              <p>{itemData?.answer}</p>
            </fieldset>
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};
export default FAQDetailsPopup;
