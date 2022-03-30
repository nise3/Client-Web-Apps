import React from 'react';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconInstitute from '../../../@softbd/icons/IconInstitute';
import {useFetchCalendarEvent} from '../../../services/cmsManagement/hooks';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import {deleteEvent} from '../../../services/cmsManagement/EventService';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import EventCalendarDetails from './EventCalendarDetails';
import {ICalendar} from '../../../shared/Interface/common.interface';
import {isBreakPointUp} from '../../../@crema/utility/Utils';

type Props = {
  itemId: number;
  onClose: () => void;
  openEditModal: (id: number) => void;
  refreshDataTable: (events: string, item?: ICalendar | number) => void;
};

const EventCalendarDetailsPopup = ({
  itemId,
  openEditModal,
  refreshDataTable,
  ...props
}: Props) => {
  const {messages} = useIntl();
  const {data: itemData, isLoading} = useFetchCalendarEvent(itemId);
  const {updateSuccessMessage} = useSuccessMessage();

  const onDelete = async () => {
    if (itemId) {
      await deleteEvent(itemId);
      updateSuccessMessage('menu.events');
      props.onClose();
      refreshDataTable('delete', itemId);
    }
  };

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
        maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
            <EditButton
              variant={'contained'}
              onClick={() => openEditModal(itemData.id)}
              isLoading={isLoading}
            />
            {itemId && (
              <DeleteButton
                deleteAction={onDelete}
                deleteTitle={messages['common.delete_confirm'] as string}
              />
            )}
          </>
        }>
        {itemData && <EventCalendarDetails itemData={itemData} />}
      </CustomDetailsViewMuiModal>
    </>
  );
};
export default EventCalendarDetailsPopup;
