import React from 'react';
import { Grid } from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import { useIntl } from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconInstitute from '../../../@softbd/icons/IconInstitute';
import { useFetchFAQ } from '../../../services/instituteManagement/hooks';
import { useFetchCalendarEvent, useFetchCMSGlobalConfig } from '../../../services/cmsManagement/hooks';
import { getLanguageLabel } from '../../../@softbd/utilities/helpers';
import LanguageCodes from '../../../@softbd/utilities/LanguageCodes';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import ShowInTypes from '../../../@softbd/utilities/ShowInTypes';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import { deleteEvent } from '../../../services/cmsManagement/EventService';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import EventCalendarDetails from './EventCalendarDetails';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
  refreshDataTable: (events: string, item?:any) => void;
};

const EventCalendarDetailsPopup = ({ itemId, openEditModal, refreshDataTable, ...props }: Props) => {
  const { messages } = useIntl();
  const { data: itemData, isLoading } = useFetchCalendarEvent(itemId);
  const { updateSuccessMessage } = useSuccessMessage();
  const { data: cmsGlobalConfig } = useFetchCMSGlobalConfig();

  const onDelete = async () => {
    // console.log('delete this: ', itemId)
    if (itemId) {
      await deleteEvent(itemId);
      updateSuccessMessage('menu.events');
      props.onClose();
      refreshDataTable('delete', itemId);
      // mutateBranch();
    }
  }
  
  return (
    <>
      <CustomDetailsViewMuiModal
        {...props}
        open={true}
        title={
          <>
            <IconInstitute />
            <IntlMessages id='menu.calendar' />
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
            {
            itemId && <DeleteButton
              deleteAction={onDelete}
              deleteTitle={messages['common.delete_confirm'] as string}
            />
          }
          </>
        }>
          <EventCalendarDetails itemData={itemData}/>
        
      </CustomDetailsViewMuiModal>
    </>
  );
};
export default EventCalendarDetailsPopup;
