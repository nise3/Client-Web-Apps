import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {momentLocalizer, View} from 'react-big-calendar';
import Calendar from '../../../@softbd/calendar/Calendar';
import {useFetchCalenderEvents} from '../../../services/cmsManagement/hooks';
import {Box, Card, CardContent, CardHeader, Grid} from '@mui/material';
import EventCalendarDetails from './EventCalendarDetails';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {H3} from '../../../@softbd/elements/common';
import {useIntl} from 'react-intl';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {addStartEndPropsToList, eventsDateTimeMap, getCalenderViewFilter} from '../../../services/global/globalService';
import {ICalendar, ICalendarQuery} from '../../../shared/Interface/common.interface';

const localizer = momentLocalizer(moment);

const YouthEventCalendarView = () => {
  const {messages} = useIntl();
  const authUser = useAuthUser<YouthAuthUser>();

  const [selectedItem, setSelectedItem] = useState<ICalendar>();
  const [viewFilters, setViewFilters] = useState<ICalendarQuery>({
    type: 'month',
  });
  const [eventsList, setEventsList] = useState<Array<ICalendar>>([]);

  const [isOpenDetailsView, setIsOpenDetailsView] = useState(false);

  let {data: events} = useFetchCalenderEvents(viewFilters);

  useEffect(() => {
    if (authUser?.isYouthUser){
      setViewFilters((prev)=>{
        return {...prev, ...{youth_id: authUser?.youthId}}
      })
    }
  }, [authUser]);

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
  const onViewEvent = (view: View) => {
    setViewFilters((prev) => {
      return getCalenderViewFilter(view, prev);
    })
  }

  return (
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
              onView={onViewEvent}
              onSelectEvent={onSelectEvent}
            />
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default YouthEventCalendarView;
