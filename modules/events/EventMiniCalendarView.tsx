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
} from '../../services/global/globalService';
import CustomFormSelect from '../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {useForm} from 'react-hook-form';

const localizer = momentLocalizer(moment);
const EventMiniCalendarView = () => {
  const {
    control,
    reset,
    formState: {errors},
  } = useForm<any>();

  const [selectedItem, setSelectedItem] = useState<ICalendar>();
  const [viewFilters, setViewFilters] = useState<ICalendarQuery>({
    type: 'month',
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

  useEffect(() => {
    reset({
      inst_id: '1',
    });
  }, []);

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

  return (
    <Card>
      <Grid style={{padding: 20}} xs={6} md={6}>
        <CustomFormSelect
          id='inst_id'
          // label={'Institute Calendar'}
          isLoading={false}
          control={control}
          options={[{id: 1, name: 'Institute Calendar'}]}
          optionValueProp={'id'}
          optionTitleProp={['name']}
          errorInstance={errors}
        />
      </Grid>
      <CardContent>
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
                  return {...prev, ...{type: view}};
                })
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
