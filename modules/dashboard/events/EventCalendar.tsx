import React, {useCallback, useEffect, useState} from 'react';
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
import {useFetchBranches} from '../../../services/instituteManagement/hooks';
import {useFetchCalenderEvents} from '../../../services/cmsManagement/hooks';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import CalendarAddEditPopup from './EventCalendarAddEditPopup';

const localizer = momentLocalizer(moment);
// const toDate = moment().toDate();
// // const chkDate = new Date('2021-11-11');
// console.log('chkDate ', toDate);

const events1 = [
  {
    id: "1",
    start: '2021-11-08',
    end: '2021-11-08',
    title: 'Partners'
  },
  {
    id: "2",
    start: '2021-11-09',
    end: '2021-11-11',
    title: 'Event Project'
  }
];

const EventCalendar = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  /*const authUser = useAuthUser();*/

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
  const [viewFilters, setViewFilters] = useState<any>({
    type: 'month',
  });
  const [eventsList, setEventsList] = useState([]);
  
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
    }
  };

  // refreshCalendar();

  let {data: events, isLoading: isLoadingEvents} = useFetchCalenderEvents(viewFilters);
  
    

  const refreshDataTable = useCallback((e) => {
    // console.log('refresh calendar', e);
    // setIsToggleTable((previousToggle) => !previousToggle);
    // events = events.filter(el=> e.id !== e)
  }, []);

  // // console.log('events ', events);
  if (events) {
    events = events.map((e:any)=> {
      return {
        ...e,
        start: e.start_date,
        end: e.end_date,
        // title: e.title
      }
    })
    // console.log('events ', events);
  }

  useEffect(()=> {
    setEventsList(events);
  }, [events])

  const onSelectSlot = (e: any) => {
    setSelectedStartDate(e.start);
    setSelectedEndDate(e.end);
    openAddEditModal(e.id);
  };
  const onSelectEvent = (e: any) => {
    // console.log('onSelectEvent ', e);
    openAddEditModal(e.id);
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
          selectable='true'
          localizer={localizer}
          style={{height: '100vh'}}
          onView={(view: View) => setViewFilters({type: view})}
          onNavigate={(e: any) => console.log('onNavigate ', e) }
          onSelectEvent={ onSelectEvent }
          onSelectSlot={ onSelectSlot }
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
      </PageBlock>
    </>
  );
};

export default EventCalendar;
