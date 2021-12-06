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
import {ICalendar, ICalendarQuery} from '../../../shared/Interface/common.interface';
import {addStartEndPropsToList, eventsDateTimeMap} from '../../../services/global/globalService';

const localizer = momentLocalizer(moment);

const InstituteEventCalendarView = () => {
  const {messages} = useIntl();
  const vendor = useVendor();
  // let requestQuery: ICalendarQuery = {
  //   type: 'month',
  //   institute_id: vendor?.id,
  // };

  const [selectedItem, setSelectedItem] = useState<ICalendar>();
  const [viewFilters, setViewFilters] = useState<ICalendarQuery>({
    type: 'month',
    institute_id: vendor?.id,
});
  const [eventsList, setEventsList] = useState<Array<ICalendar>>([]);

  const [isOpenDetailsView, setIsOpenDetailsView] = useState(false);

  let {data: events} = useFetchCalenderEvents(viewFilters);

  useEffect(() => {
    addStartEndPropsToList(events);
  }, [events]);

  useEffect(() => {
    if (events) {
      setEventsList(eventsDateTimeMap(events));
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
                  setViewFilters((prev)=>{
                    return {...prev, ...{type: view === 'agenda' ? 'schedule' : view}}
                  })
                }
                onNavigate={(e: any) => {
                  const monthNumber = moment(e).month() + 1;
                  const yearNumber = moment(e).year();
                  setViewFilters((prev)=>{
                    return {...prev, ...{ month: monthNumber, year: yearNumber }}
                  })
                }}
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
