import React, { useCallback, useEffect, useState } from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import moment from 'moment';
import { momentLocalizer, View } from 'react-big-calendar';
import IconEvents from '../../../@softbd/icons/IconEvents';
import { useIntl } from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import { isResponseSuccess } from '../../../@softbd/utilities/helpers';
import { deleteEvent } from '../../../services/cmsManagement/EventService';
import Calendar from '../../../@softbd/calendar/Calendar';
import { useFetchCalenderEvents } from '../../../services/cmsManagement/hooks';
import CalendarAddEditPopup from './EventCalendarAddEditPopup';
import { useAuthUser } from '../../../@crema/utility/AppHooks';
import EventCalendarDetailsPopup from './EventCalendarDetailsPopupup';
const localizer = momentLocalizer(moment);
// const toDate = moment().toDate();
// // const chkDate = new Date('2021-11-11');
// console.log('chkDate ', toDate);
interface IQuery{
  type: string;
  youth_id?: number;
  institute_id?: number;
}
// const events1 = [
//   {
//     id: "1",
//     start: new Date('2021-11-08'),
//     end: new Date('2021-11-08'),
//     title: 'Partners'
//   },
//   // {
//   //   id: "2",
//   //   start: '2021-11-09',
//   //   end: '2021-11-11',
//   //   title: 'Event Project'
//   // }
// ];

const EventCalendar = ({calendarFor, editable}) => {
  const { messages } = useIntl();
  const { successStack } = useNotiStack();
  const authUser = useAuthUser();
  const isEditable = editable ? editable : false;
  /*const authUser = useAuthUser();*/
  // console.log('from component ', calendarFor);
  let requestQuery: IQuery = {
    type: 'month'
  }
  switch (calendarFor) {
    case 'youth':
      requestQuery.youth_id = authUser.youthId;
      break;
    case 'institute':
      requestQuery.institute_id = authUser.institute_id;
      break
    default:
      break;
  }


  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
  const [viewFilters, setViewFilters] = useState<any>(requestQuery);
  const [eventsList, setEventsList] = useState(null);

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
          values={{ subject: <IntlMessages id='user.label' /> }}
        />,
      );
    }
  };

  // refreshCalendar();

  let { data: events, isLoading: isLoadingEvents } = useFetchCalenderEvents(viewFilters);
  // events = addPropToEventlist(events);


  const refreshDataTable = useCallback((event, item) => {
    // console.log('refresh calendar', e);
    // setIsToggleTable((previousToggle) => !previousToggle);
    // console.log(eventsList)
    switch (event) {
      case 'delete':
        const newList = eventsList.filter(e => e.id != item);
        setEventsList(newList);
        break;
      case 'create':
        setEventsList([item, ...eventsList]);
        break;
      default:
      case 'update':
        const excludeItemFromList = eventsList.filter(e => e.id != item.id);
        setEventsList([item, ...excludeItemFromList]);
        break;
    }
    // events = events.filter(el=> e.id !== e)
    // const newList = eventsList.filter(e=> e.id != e);
    // setEventsList(newList);
    // console.log(event , item);

  }, [eventsList]);

  useEffect(() => {

    if (events) {
      events
        .map(e => {
          e.start_date = new Date(e.start_date)
          e.end_date = new Date(e.end_date)
          return e;
        })
      setEventsList(events);
    }

  }, [events])

  const onSelectSlot = (e: any) => {
    setSelectedStartDate(e.start);
    setSelectedEndDate(e.end);
    openAddEditModal(e.id);
  };
  const onSelectEvent = (e: any) => {
    // console.log('onSelectEvent ', e);
    // openAddEditModal(e.id);
    openDetailsModal(e.id);
  };

  return (
    <>
      <PageBlock
        title={
          <>
            <IconEvents /> <IntlMessages id='menu.events' />
          </>
        }>


        <Calendar
          events={eventsList}
          // events={events1}
          selectable={isEditable}
          localizer={localizer}
          style={{ height: '100vh' }}
          startAccessor="start_date"
          endAccessor="end_date"
          defaultDate={moment().toDate()}
          onView={(view: View) => setViewFilters( {...requestQuery, ...{ type: view }})}
          onNavigate={(e: any) => console.log('onNavigate ', e)}
          onSelectEvent={onSelectEvent}
          onSelectSlot={onSelectSlot}
        // messages={{ showMore: (target) => <span className="ml-2" role="presentation" onClick={() => setViewFilters({ type: 'day' })}> ...{target} more</span> }}

        />


        {isOpenAddEditModal && (
          <CalendarAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            startDate={selectedStartDate}
            endDate={selectedEndDate}
            refreshDataTable={refreshDataTable}
          />
        )}
        {isOpenDetailsModal && selectedItemId && (
          <EventCalendarDetailsPopup
            key={1}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
            openEditModal={openAddEditModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default EventCalendar;
