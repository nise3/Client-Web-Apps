import {styled} from '@mui/material/styles';
import {
  Card,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {Fade} from 'react-awesome-reveal';
import {H4} from '../../@softbd/elements/common';
import {useIntl} from 'react-intl';
import NoDataFoundComponent from '../youth/common/NoDataFoundComponent';
import React, {useEffect, useState} from 'react';
import DateRangeIcon from '@mui/icons-material/DateRange';
import moment from 'moment';
import {momentLocalizer, View} from 'react-big-calendar';
import Calendar from '../../@softbd/calendar/Calendar';
import {
  ICalendar,
  ICalendarQuery,
} from '../../shared/Interface/common.interface';
import {useFetchPublicCalenderEvents} from '../../services/cmsManagement/hooks';
import {
  addStartEndPropsToList,
  eventsDateTimeMap,
} from '../../services/global/globalService';
import UnderlinedHeading from '../../@softbd/elements/common/UnderlinedHeading';

const localizer = momentLocalizer(moment);
const PREFIX = 'EventSection';

const classes = {
  dateHeader: `${PREFIX}-dateHeader`,
  gridContainer: `${PREFIX}-gridContainer`,
  listIcon: `${PREFIX}-listIcon`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  marginTop: '60px',
  [`& .${classes.listIcon}`]: {
    transform: 'translateY(5px)',
    marginRight: '12px',
  },
  [`& .${classes.gridContainer}`]: {
    borderRadius: 8,
    padding: '24px',
  },
  [`& .${classes.dateHeader}`]: {
    borderRadius: 8,
    padding: '12px',
    paddingTop: '16px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  '.rbc-month-row,.rbc-row-content,.rbc-row-content>.rbc-row,.rbc-date-cell': {
    padding: 0,
    position: 'relative',
    height: '100%',
  },
  '& .rbc-date-cell': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  '& .rbc-date-cell>a': {
    pointerEvents: 'none',
  },
  '& .rbc-toolbar .rbc-btn-group>button:first-of-type': {
    display: 'none',
  },
  '& .rbc-toolbar .rbc-btn-group>button:first-of-type+button': {
    borderBottomLeftRadius: '4px',
    borderTopLeftRadius: '4px',
  },
}));

const NoticeAndEventSection = () => {
  const {messages, formatDate} = useIntl();
  const dateFormat = 'YYYY-MM-DD';

  const [selectedItems, setSelectedItems] = useState<Array<ICalendar>>();
  const [viewFilters, setViewFilters] = useState<ICalendarQuery>({
    type: 'month',
  });
  const [eventsList, setEventsList] = useState<Array<ICalendar>>([]);
  const [currentDate, setCurrentDate] = useState<any>(
    moment(Date.now()).format(dateFormat),
  );

  let {data: events} = useFetchPublicCalenderEvents(viewFilters);

  useEffect(() => {}, [currentDate]);

  useEffect(() => {
    addStartEndPropsToList(events);
  }, [events]);

  useEffect(() => {
    if (events) {
      const evts = eventsDateTimeMap(events);
      setEventsList(evts);
      setSelectedDateItems(new Date(), evts);
    }
  }, [events]);
  const setSelectedDateItems = (date: Date, evtList?: any) => {
    const list: Array<ICalendar> = Array.isArray(evtList)
      ? evtList
      : eventsList;
    const items = list.filter(
      (ev: ICalendar) =>
        moment(ev.start).format(dateFormat) === moment(date).format(dateFormat),
    );
    setSelectedItems(items);
  };

  const onSelectSlot = (e: any) => {
    setCurrentDate(moment(e.start).format(dateFormat));
    setSelectedDateItems(e.start);
  };

  return (
    <StyledContainer maxWidth='lg'>
      <Fade direction='up'>
        <UnderlinedHeading>
          {messages['industry.notice_and_events']}
        </UnderlinedHeading>
        <Card className={classes.gridContainer}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <H4 centered className={classes.dateHeader}>
                {formatDate(currentDate, {dateStyle: 'full'})}
              </H4>
              {selectedItems && selectedItems.length ? (
                <List>
                  {selectedItems
                    .slice(0, 4)
                    .map((selectedItem: any, i: number) => (
                      <ListItem key={i}>
                        <ListItemText
                          primary={selectedItem.title}
                          secondary={
                            <>
                              <DateRangeIcon className={classes.listIcon} />
                              {formatDate(selectedItem.start_date)}
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                </List>
              ) : (
                <NoDataFoundComponent
                  messageType={messages['industry.notice_and_events']}
                  messageTextType={'h6'}
                />
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Calendar
                getNow={() => currentDate}
                events={[]}
                localizer={localizer}
                selectable={true}
                style={{height: 500}}
                startAccessor='start'
                endAccessor='end'
                defaultDate={moment().toDate()}
                views={['month']}
                onView={(view: View) =>
                  setViewFilters((prev) => ({
                    ...prev,
                    ...{type: view === 'agenda' ? 'schedule' : view},
                  }))
                }
                onSelectSlot={onSelectSlot}
                onNavigate={(e: any) => {
                  const year = moment(e).year();
                  const month = moment(e).month() + 1;
                  setViewFilters((prev) => {
                    return {...prev, month, year};
                  });
                }}
              />
            </Grid>
          </Grid>
        </Card>
      </Fade>
    </StyledContainer>
  );
};
export default NoticeAndEventSection;
