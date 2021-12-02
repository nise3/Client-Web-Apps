import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {momentLocalizer, View} from 'react-big-calendar';
import Calendar from '../../@softbd/calendar/Calendar';
import {useFetchCalenderEvents} from '../../services/cmsManagement/hooks';
import {Box, Card, CardContent, CardHeader, Grid} from '@mui/material';
import EventCalendarDetails from './EventCalendarDetails';
import CancelButton from '../../@softbd/elements/button/CancelButton/CancelButton';
import {ICalendar, ICalendarQuery} from '../../shared/Interface/common.interface';
import {addStartEndPropsToList, eventsDateTimeMap} from '../../services/global/globalService';

const localizer = momentLocalizer(moment);
const EventMiniCalendarView = () => {
  // const {messages} = useIntl();
  let requestQuery: ICalendarQuery = {
    type: 'month',
  };

  const [selectedItem, setSelectedItem] = useState<ICalendar>();
  const [viewFilters, setViewFilters] = useState<ICalendarQuery>(requestQuery);
  const [eventsList, setEventsList] = useState<Array<ICalendar>>([]);

  const [isOpenDetailsView, setIsOpenDetailsView] = useState(false);

  let {data: events} = useFetchCalenderEvents(viewFilters);

  useEffect(() => {
    addStartEndPropsToList(events);
  }, [events]);

  useEffect(() => {
    if (events) {
      events = eventsDateTimeMap(events);
      setEventsList(events);
    }
  }, [events]);

  const onSelectEvent = (e: any) => {
    const item = eventsList.find((ev: ICalendar) => ev.id === e.id) as ICalendar;
    setSelectedItem(item);
    setIsOpenDetailsView(true);
    // console.log(item);
  };
  const onClose = () => {
    setIsOpenDetailsView(false);
  };

  return (
      <Card>
        <CardHeader title={'Institute Calendar'} />
        {/*<CardHeader title={<H3>{messages['menu.calendar']}</H3>} />*/}
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
                style={{height: 500}}
                startAccessor='start'
                endAccessor='end'
                defaultDate={moment().toDate()}
                views={['month']}
                onView={(view: View) =>
                  setViewFilters({...requestQuery, ...{type: view}})
                }
                onSelectEvent={onSelectEvent}
              />
            )}
          </Grid>
        </CardContent>
      </Card>
  );
};

export default EventMiniCalendarView;
