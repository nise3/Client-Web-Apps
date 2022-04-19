import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {momentLocalizer, View} from 'react-big-calendar';
import Calendar from '../../@softbd/calendar/Calendar';
import {useFetchPublicCalenderEvents} from '../../services/cmsManagement/hooks';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
} from '@mui/material';
import EventCalendarDetails from './EventCalendarDetails';
import CancelButton from '../../@softbd/elements/button/CancelButton/CancelButton';
import {H1} from '../../@softbd/elements/common';
import {createIntl, useIntl} from 'react-intl';
import {
  ICalendar,
  ICalendarQuery,
} from '../../shared/Interface/common.interface';
import {
  addStartEndPropsToList,
  eventsDateTimeMap,
  getCalenderViewFilter,
  getNavigationFilter,
} from '../../services/global/globalService';
import {createIntlCache} from '@formatjs/intl';
import { calendarService } from '../../services/CalendarService/CalendarService';

const localizer = momentLocalizer(moment);

const EventCalendarView = () => {
  const intlOpt = useIntl();
  // const dateFormat = 'YYYY-MM-DD';
  // const cache = createIntlCache();
  // const intl = createIntl(
  //   {
  //     locale: locale,
  //     messages: {},
  //   },
  //   cache,
  // );

  const [selectedItem, setSelectedItem] = useState<ICalendar>();
  const [viewFilters, setViewFilters] = useState<ICalendarQuery>({
    type: 'month',
  });
  const [eventsList, setEventsList] = useState<Array<ICalendar>>([]);

  const [isOpenDetailsView, setIsOpenDetailsView] = useState(false);

  let {data: events} = useFetchPublicCalenderEvents(viewFilters);

  // const startDates = eventsList.map((e) =>
  //   moment(e.start).format(dateFormat),
  // ) as string[];
  // const hasEvent = (currentDate: string, allDates: string[]): boolean =>
  //   allDates.find((e) => e == currentDate) != undefined;
  // const parsDate = (datevalue: any): string =>
  //   moment(datevalue).format(dateFormat);

  useEffect(() => {
    addStartEndPropsToList(events);
  }, [events]);

  useEffect(() => {
    if (events) {
      setEventsList(eventsDateTimeMap(events));
    }
  }, [events]);

  const onSelectEvent = (e: any) => {
    const item = eventsList.find(
      (ev: ICalendar) => ev.id === e.id,
    ) as ICalendar;
    setSelectedItem(item);
    setIsOpenDetailsView(true);
    // console.log(item);
  };
  const onClose = () => {
    setIsOpenDetailsView(false);
  };

  const onNavigateEvent = (e: any) => {
    setViewFilters((prev) => {
      return getNavigationFilter(e, prev);
    });
  };
  const onViewEvent = (view: View) => {
    setViewFilters((prev) => {
      return getCalenderViewFilter(view, prev);
    });
  };

  const calendarServiceOpt = calendarService(eventsList, intlOpt)

  // const customDateCellWrap = (e: any) => {
  //   const dateNumber = intl.formatNumber(e.label);
  //   const dateFontSize = {fontSize: '1.5rem'};
  //   const dateSpan = <span style={dateFontSize}>{dateNumber}</span>;
  //   return (
  //     <div>
  //       {hasEvent(parsDate(e.date), startDates) ? (
  //         <div style={{position: 'relative'}}>{dateSpan}</div>
  //       ) : (
  //         dateSpan
  //       )}
  //     </div>
  //   );
  // };

  // const componentObject = {
  //   month: {
  //     dateHeader: customDateCellWrap,
  //     header: (e: any) => {
  //       const lbl = messages[`calendar.${e.label}`];
  //       return <span>{lbl}</span>;
  //     },
  //   },
  //   week: {
  //     header: (e: any) => {
  //       const labelArr = e.label.split(' ');
  //       const lbl = messages[`calendar.${labelArr[1]}`];
  //       return <span>{lbl}</span>;
  //     },
  //   },
  // };

  return (
    <Container maxWidth={'lg'} sx={{mt: 5, mb: 5}}>
      <Card>
        <CardHeader
          title={
            <H1 style={{fontSize: '2.25rem'}}>{intlOpt.messages['menu.calendar']}</H1>
          }
        />
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
                onNavigate={onNavigateEvent}
                onSelectEvent={onSelectEvent}
                components={calendarServiceOpt.componentObject}
                formats={calendarServiceOpt.calendarFormatOption}
              />
            )}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EventCalendarView;
