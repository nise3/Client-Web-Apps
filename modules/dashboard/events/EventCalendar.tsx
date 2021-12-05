import React, {useCallback, useEffect, useState} from 'react';
import moment from 'moment';
import {momentLocalizer, View} from 'react-big-calendar';
import Calendar from '../../../@softbd/calendar/Calendar';
import {useFetchCalenderEvents} from '../../../services/cmsManagement/hooks';
import CalendarAddEditPopup from './EventCalendarAddEditPopup';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import EventCalendarDetailsPopup from './EventCalendarDetailsPopupup';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import {ICalendar, ICalendarQuery} from '../../../shared/Interface/common.interface';
import {addStartEndPropsToList, eventsDateTimeMap} from '../../../services/global/globalService';

const localizer = momentLocalizer(moment);

const EventCalendar = () => {
  const {messages} = useIntl();
  const authUser = useAuthUser();

  // const isEditable = comProps.editable ? comProps.editable : false;

  let requestQuery: ICalendarQuery = {
    type: 'month',
  };
  if (authUser?.isInstituteUser) {
    requestQuery.institute_id = authUser.institute_id;
  }

  const [selectedItemId, setSelectedItemId] = useState<number | null>();
  const [selectedStartDate, setSelectedStartDate] = useState<
    string | undefined
  >(undefined);
  const [selectedEndDate, setSelectedEndDate] = useState<string | undefined>(
    undefined,
  );
  const [viewFilters, setViewFilters] = useState<ICalendarQuery>(requestQuery);
  const [eventsList, setEventsList] = useState<Array<ICalendar>>([]);

  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  // const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
    setSelectedItemId(undefined);
  }, []);

  const openAddEditModal = useCallback((itemId: number | undefined) => {
    setIsOpenDetailsModal(false);
    setIsOpenAddEditModal(true);
    setSelectedItemId(itemId);
  }, []);

  const openDetailsModal = useCallback((itemId: number | undefined) => {
    setIsOpenDetailsModal(true);
    setSelectedItemId(itemId);
  }, []);

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);

  let {data: events} = useFetchCalenderEvents(viewFilters);

  const refreshDataTable = useCallback(
    (event, item) => {
      switch (event) {
        case 'delete':
          const newList = eventsList.filter(
            (e) => e.id != item,
          ) as Array<ICalendar>;
          setEventsList(newList);
          break;
        case 'create':
          setEventsList([item, ...eventsList]);
          break;
        default:
        case 'update':
          const excludeItemFromList = eventsList.filter((e) => e.id != item.id);
          setEventsList([item, ...excludeItemFromList]);
          break;
      }
    },
    [eventsList],
  );

  useEffect(() => {
    addStartEndPropsToList(events);
  }, [events]);

  useEffect(() => {
    if (events) {
      events = eventsDateTimeMap(events);
      // events.map((e: ICalendar) => {
      //   let start = e.start_time ? `${e.start}T${e.start_time}` : `${e.start}`;
      //   let end = e.end_time ? `${e.end}T${e.end_time}` : `${e.end}`;
      //   e.start = new Date(start);
      //   e.end = new Date(end);
      //   return e;
      // });
      // console.log(events);
      setEventsList(events);
    }
  }, [events]);

  const onSelectSlot = (slotInfo: any) => {
    setSelectedStartDate(slotInfo.start as string);
    setSelectedEndDate(slotInfo.end as string);
    openAddEditModal(slotInfo.id);
    // console.log(slotInfo)
  };
  const onSelectEvent = (e: any) => {
    openDetailsModal(e.id as number);
  };

  return (
    <>
      <PageBlock title={messages['menu.calendar']}>
        <Calendar
          events={eventsList}
          // events={events1}
          selectable={true}
          localizer={localizer}
          style={{height: '100vh'}}
          startAccessor='start'
          endAccessor='end'
          defaultDate={moment().toDate()}
          onView={(view: View) =>
            setViewFilters({...requestQuery, ...{type: view === 'agenda' ? 'schedule' : view}})
          }
          onNavigate={(e: any) => console.log('onNavigate ', e)}
          onSelectEvent={onSelectEvent}
          onSelectSlot={onSelectSlot}
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
            refreshDataTable={refreshDataTable}
          />
        )}
      </PageBlock>
    </>
  );
};

export default EventCalendar;
