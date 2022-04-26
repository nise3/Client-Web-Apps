import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {momentLocalizer, View} from 'react-big-calendar';
import Calendar from '../../@softbd/calendar/Calendar';
import {useFetchCalenderEvents} from '../../services/cmsManagement/hooks';
import {Box, Card, CardContent, Grid} from '@mui/material';
import EventCalendarDetails from './EventCalendarDetails';
import CancelButton from '../../@softbd/elements/button/CancelButton/CancelButton';
import {
  ICalendar,
  ICalendarQuery,
} from '../../shared/Interface/common.interface';
import {
  addStartEndPropsToList,
  eventsDateTimeMap,
  getNavigationFilter,
} from '../../services/global/globalService';
import {useFetchTrainingCenters} from '../../services/instituteManagement/hooks';
import CustomFilterableSelect from '../youth/training/components/CustomFilterableSelect';
import {useIntl} from 'react-intl';
import {calendarService} from '../../services/CalendarService/CalendarService';

const localizer = momentLocalizer(moment);
const EventMiniCalendarView = () => {
  const {messages} = useIntl();
  const [selectedItem, setSelectedItem] = useState<ICalendar>();
  const [viewFilters, setViewFilters] = useState<ICalendarQuery>({
    type: 'month',
  });

  const [eventsList, setEventsList] = useState<Array<ICalendar>>([]);
  const [isOpenDetailsView, setIsOpenDetailsView] = useState(false);
  let {data: events} = useFetchCalenderEvents(viewFilters);

  const [trainingCenterFilters] = useState({});
  const {data: trainingCenters, isLoading: isLoadingTrainingCenter} =
    useFetchTrainingCenters(trainingCenterFilters);
  const [selectedTrainingCenter, setSelectedTrainingCenter] = useState<any>('');

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
  const intlOpt = useIntl();
  const calendarServiceOpt = calendarService(eventsList, intlOpt);
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <CustomFilterableSelect
              id='training_center_id'
              label={messages['common.training_center']}
              isLoading={isLoadingTrainingCenter}
              options={trainingCenters}
              optionValueProp={'id'}
              optionTitleProp={['title']}
              defaultValue={selectedTrainingCenter}
              onChange={(value: any) => {
                setSelectedTrainingCenter(value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
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
                events={eventsList || null}
                localizer={localizer}
                selectable={true}
                style={{height: 500}}
                startAccessor='start'
                endAccessor='end'
                defaultDate={moment().toDate()}
                views={['month']}
                onView={(view: View) =>
                  setViewFilters((prev) => {
                    return {
                      ...prev,
                      ...{type: view === 'agenda' ? 'schedule' : view},
                    };
                  })
                }
                onNavigate={onNavigateEvent}
                onSelectEvent={onSelectEvent}
                components={calendarServiceOpt.componentObject}
                formats={calendarServiceOpt.calendarFormatOption}
              />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EventMiniCalendarView;
