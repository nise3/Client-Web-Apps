import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {momentLocalizer, View} from 'react-big-calendar';
import Calendar from '../../@softbd/calendar/Calendar';
import {useFetchCalenderEvents} from '../../services/cmsManagement/hooks';
import {Box, Card, CardContent, Grid} from '@mui/material';
import EventCalendarDetails from './EventCalendarDetails';
import CancelButton from '../../@softbd/elements/button/CancelButton/CancelButton';
import {ICalendar, ICalendarQuery} from '../../shared/Interface/common.interface';
import {addStartEndPropsToList, eventsDateTimeMap} from '../../services/global/globalService';
import {useForm} from 'react-hook-form';
import {useFetchTrainingCenters} from '../../services/instituteManagement/hooks';
import CustomFilterableSelect from '../youth/training/components/CustomFilterableSelect';
import {useIntl} from 'react-intl';
import {useAuthUser, useVendor} from '../../@crema/utility/AppHooks';

const localizer = momentLocalizer(moment);
const EventMiniCalendarView = () => {
  const {
    reset,
    formState: {errors},
  } = useForm<any>();
  const {messages} = useIntl();
  const [selectedItem, setSelectedItem] = useState<ICalendar>();
  const [viewFilters, setViewFilters] = useState<ICalendarQuery>({
    type: 'month'
  });
  const vendor = useVendor();
  const authUser = useAuthUser();
  if (authUser?.isInstituteUser) {
    viewFilters.institute_id = vendor?.id;
  }


  const [eventsList, setEventsList] = useState<Array<ICalendar>>([]);
  const [isOpenDetailsView, setIsOpenDetailsView] = useState(false);
  let {data: events} = useFetchCalenderEvents(viewFilters);

  const [trainingCenterFilters] = useState({});
  const {data: trainingCenters, isLoading: isLoadingTrainingCenter} =
    useFetchTrainingCenters(trainingCenterFilters);

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
        inst_id: vendor?.id
      });
  }, []);

  const onSelectEvent = (e: any) => {
    const item = eventsList.find((ev: ICalendar) => ev.id === e.id) as ICalendar;
    setSelectedItem(item);
    setIsOpenDetailsView(true);
    // console.log(item);
  };
  const onClose = () => {
    setIsOpenDetailsView(false);
  };

  // const changeCalendar = (e) => {
  //   console.log(e);
  // }

  return (
      <Card>
        <Grid style={{padding: 20}} xs={12} md={12}>
          <CustomFilterableSelect
            id='institute_id'
            label={messages['common.training_center']}
            isLoading={isLoadingTrainingCenter}
            options={trainingCenters}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            errorInstance={errors}
            // onChange={(e)=> {
            //   changeCalendar(e)
            // }}
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
                  setViewFilters((prev)=>{
                   return {...prev, ...{type: view === 'agenda' ? 'schedule' : view}}
                  })
                }
                onNavigate={(e: any) => {
                  const monthNumber = moment(e).month() + 1;
                  setViewFilters((prev)=>{
                    return {...prev, ...{ month: monthNumber }}
                  })
                }}
                onSelectEvent={onSelectEvent}
              />
            )}
          </Grid>
        </CardContent>
      </Card>
  );
};

export default EventMiniCalendarView;
