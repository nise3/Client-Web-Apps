import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {momentLocalizer, View} from 'react-big-calendar';
import Calendar from '../../../@softbd/calendar/Calendar';
import {useFetchCalenderEvents} from '../../../services/cmsManagement/hooks';
import {Box, Card, CardContent, CardHeader, Container, Grid} from '@mui/material';
import EventCalendarDetails from './EventCalendarDetails';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {useVendor} from '../../../@crema/utility/AppHooks';
import {H3} from '../../../@softbd/elements/common';
import {useIntl} from 'react-intl';
import {ICalendar, ICalendarQuery} from '../../../shared/Interface/interface';
import {addStartEndPropsToList} from '../../../services/global/CalendarService';

const localizer = momentLocalizer(moment);

const InstituteEventCalendarView = () => {
  const {messages} = useIntl();
  const vendor = useVendor();
  let requestQuery: ICalendarQuery = {
    type: 'month',
    institute_id: vendor?.id,
  };

  const [selectedItem, setSelectedItem] = useState<ICalendar>();
  const [viewFilters, setViewFilters] = useState<ICalendarQuery>(requestQuery);
  const [eventsList, setEventsList] = useState<Array<ICalendar>>([]);

  const [isOpenDetailsView, setIsOpenDetailsView] = useState(false);

  let {data: events} = useFetchCalenderEvents(viewFilters);

  useEffect(() => {
    addStartEndPropsToList(events);
    // if (events) {
    //   events.forEach((element: any) => {
    //     element['start'] = element.start_date;
    //     element['end'] = element.start_date;
    //   });
    // }
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
    const item = eventsList.find((ev) => ev.id === e.id) as ICalendar;
    setSelectedItem(item);
  };
  const onClose = () => {
    setIsOpenDetailsView(false);
  };

  return (
    <Container maxWidth={'lg'} sx={{mt: 5, mb: 5}}>
      <Card>
        {/*<CardHeader title={<H3>Calendar</H3>} />*/}
        <CardHeader title={<H3>{messages['menu.calendar']}</H3>} />
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
      </Card>
    </Container>
  );
};

export default InstituteEventCalendarView;
