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
import { Grid } from '@mui/material';
const localizer = momentLocalizer(moment);
// const toDate = moment().toDate();
// // const chkDate = new Date('2021-11-11');
// console.log('chkDate ', toDate);
interface ICalenderEvents {
  id: number;
  title: string;
  title_en: string;
  youth_id?: any;
  batch_id?: any;
  institute_id?: any;
  organization_id?: any;
  start_date: Date | string;
  end_date: Date | string;
  start?: Date  | string;
  end?: Date  | string;
  start_time?: any;
  end_time?: any;
  color: string;
  created_at: Date;
  updated_at: Date;
}
interface IQuery {
  type: string;
  youth_id?: string | number;
  institute_id?: string | number;
}
interface IComProps {
  calendarFor: string;
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

// const EventCalendar = ({calendarFor: string, editable: boolean}) => {
const EventCalendarView = (comProps: IComProps) => {
  const { messages } = useIntl();
  const { successStack } = useNotiStack();
  const authUser = useAuthUser();
  // console.log('useAuthUser ', authUser);
  // const isEditable = comProps.editable ? comProps.editable : false;
  /*const authUser = useAuthUser();*/
  // console.log('from component ', comProps.calendarFor);
  let requestQuery: IQuery = {
    type: 'month'
  }
  
  switch (comProps.calendarFor) {
    case 'youth':
      // requestQuery.youth_id = authUser?.youthId;
      break;
    case 'institute':
      requestQuery.institute_id = authUser?.institute_id;
      break
    default:
      break;
  }


  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  // const [selectedStartDate, setSelectedStartDate] = useState<string | null>(null);
  // const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
  const [viewFilters, setViewFilters] = useState<IQuery>(requestQuery);
  const [eventsList, setEventsList] = useState<Array<ICalenderEvents>>([]);

  // const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  // const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  // const closeAddEditModal = useCallback(() => {
  //   setIsOpenAddEditModal(false);
  //   setSelectedItemId(null);
  // }, []);

  // const openAddEditModal = useCallback((itemId: number | null = null) => {
  //   setIsOpenDetailsModal(false);
  //   setIsOpenAddEditModal(true);
  //   setSelectedItemId(itemId);
  // }, []);

  const openDetailsModal = useCallback((itemId: number) => {
    setIsOpenDetailsModal(true);
    setSelectedItemId(itemId);
  }, []);

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);

  // const deleteEventItem = async (itemId: number) => {
  //   let response = await deleteEvent(itemId);
  //   if (isResponseSuccess(response)) {
  //     successStack(
  //       <IntlMessages
  //         id='common.subject_deleted_successfully'
  //         values={{ subject: <IntlMessages id='user.label' /> }}
  //       />,
  //     );
  //   }
  // };


  let { data: events } = useFetchCalenderEvents(viewFilters);
  // events = addPropToEventlist(events);


  // const refreshDataTable = useCallback((event, item) => {
  //   switch (event) {
  //     case 'delete':
  //       const newList = eventsList.filter(e => e.id != item) as Array<ICalenderEvents>;
  //       setEventsList(newList);
  //       break;
  //     case 'create':
  //       setEventsList([item, ...eventsList]);
  //       break;
  //     default:
  //     case 'update':
  //       const excludeItemFromList = eventsList.filter(e => e.id != item.id);
  //       setEventsList([item, ...excludeItemFromList]);
  //       break;
  //   }

  // }, [eventsList]);

  useEffect(() => {
    if(events){
      events.forEach((element: any) => {
        element['start'] = element.start_date;
        element['end'] = element.start_date;
      });
    }
  }, [events])

  useEffect(() => {
    if (events) {
      events
        .map((e: ICalenderEvents) => {
          const start = e.start_time ? `${e.start}T${e.start_time}` : `${e.start}`;
          const end = e.end_time ? `${e.end}T${e.end_time}` : `${e.end}`;
          e.start = new Date(start);
          e.end = new Date(end);
          return e;
        });
      console.log(events);
      setEventsList(events);
    }

  }, [events])

  const onSelectEvent = (e: any) => {
    openDetailsModal(e.id);
  };

  return (
    <>
      <Grid item xs={12} md={12} style={{paddingTop: 20}}>
        <Calendar
          events={eventsList}
          localizer={localizer}
          style={{ height: '100vh' }}
          startAccessor="start"
          endAccessor="end"
          defaultDate={moment().toDate()}
          onView={(view: View) => setViewFilters({ ...requestQuery, ...{ type: view } })}
          onSelectEvent={onSelectEvent}
        />
      </Grid>
    </>
  );
};

export default EventCalendarView;
