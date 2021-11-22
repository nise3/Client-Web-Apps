import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {momentLocalizer, View} from 'react-big-calendar';
import Calendar from '../../../@softbd/calendar/Calendar';
import {useFetchCalenderEvents} from '../../../services/cmsManagement/hooks';
import {Box, CardContent, Grid} from '@mui/material';
import EventCalendarDetails from './EventCalendarDetails';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';

const localizer = momentLocalizer(moment);

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
  // start?: Date  | string;
  // end?: Date  | string;
  start_time?: any;
  end_time?: any;
  color: string;
  created_at: Date;
  updated_at: Date;
}

interface IQuery {
  type: string;
  youth_id?: string | number;
}

interface IComProps {
  calendarFor: string;
}

const YouthEventCalendarView = (comProps: IComProps) => {
  let requestQuery: IQuery = {
    type: 'month'
  };

  const [selectedItem, setSelectedItem] = useState<ICalenderEvents>();
  const [viewFilters, setViewFilters] = useState<IQuery>(requestQuery);
  const [eventsList, setEventsList] = useState<Array<ICalenderEvents>>([]);

  const [isOpenDetailsView, setIsOpenDetailsView] = useState(false);

  let {data: events} = useFetchCalenderEvents(viewFilters);

  useEffect(() => {
    if (events) {
      events.forEach((element: any) => {
        element['start'] = element.start_date;
        element['end'] = element.start_date;
      });
    }
  }, [events]);

  useEffect(() => {
    if (events) {
      events.map((e: any) => {
        const start = e.start_time
          ? `${e.start}T${e.start_time}`
          : `${e.start}`;
        const end = e.end_time ? `${e.end}T${e.end_time}` : `${e.end}`;
        e.start = new Date(start);
        e.end = new Date(end);
        return e;
      });
      setEventsList(events);
    }
  }, [events]);

  const onSelectEvent = (e: any) => {
    setIsOpenDetailsView(true);
    const item = eventsList.find((ev) => ev.id === e.id) as ICalenderEvents;
    setSelectedItem(item);
  };
  const onClose = () => {
    setIsOpenDetailsView(false);
  };

  return (
    <>
      <CardContent>
        <Grid item xs={12} md={12} style={{paddingTop: 20}}>
          {isOpenDetailsView ? (
            <div>
              <EventCalendarDetails itemData={selectedItem} />
              <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Box style={{paddingTop: 20}}>
                  <CancelButton onClick={onClose} isLoading={false} />
                </Box>
              </Box>
            </div>
          ) : (
            <Calendar
              events={eventsList}
              localizer={localizer}
              selectable={true}
              style={{height: '100vh'}}
              startAccessor='start'
              endAccessor='end'
              defaultDate={moment().toDate()}
              onView={(view: View) =>
                setViewFilters({...requestQuery, ...{type: view}})
              }
              onSelectEvent={onSelectEvent}
            />
          )}
        </Grid>
      </CardContent>
    </>
  );
};

export default YouthEventCalendarView;
