import React, {useCallback, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import moment from 'moment';
import {momentLocalizer, View} from 'react-big-calendar';
import IconEvents from '../../../@softbd/icons/IconEvents';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import {deleteEvent} from '../../../services/cmsManagement/EventService';
import Calendar from '../../../@softbd/calendar/Calendar';

const localizer = momentLocalizer(moment);
const toDate = moment().toDate();
// const chkDate = new Date('2021-11-11');
console.log('chkDate ', toDate);

const events = [
  {
    start: toDate,
    end: moment().add(1, 'days').toDate(),
    title: 'Some title',
  }
];

const EventCalendar = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  /*const authUser = useAuthUser();*/

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [calenderView, setCalenderView] = useState<string>('month');
  console.log('view: ', calenderView);

  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
    setSelectedItemId(null);
  }, []);

  const openAddEditModal = useCallback((itemId: number | null = null) => {
    setIsOpenDetailsModal(false);
    setIsOpenAddEditModal(true);
    setSelectedItemId(itemId);
  }, []);

  const openDetailsModal = useCallback((itemId: number) => {
    setIsOpenDetailsModal(true);
    setSelectedItemId(itemId);
  }, []);

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);

  const deleteEventItem = async (itemId: number) => {
    let response = await deleteEvent(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='user.label' />}}
        />,
      );

      refreshDataTable();
    }
  };

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((previousToggle) => !previousToggle);
  }, [isToggleTable]);
console.log('event calendar ', events);
  return (  

    <>
      <PageBlock
        title={
          <>
            <IconEvents /> <IntlMessages id='menu.events' />
          </>
        }>
        <Calendar
          events={events}
          localizer={localizer}
          style={{height: '100vh'}}
          onView={(view: View) => setCalenderView(view)}
        />
      </PageBlock>
    </>
  );
};

export default EventCalendar;
