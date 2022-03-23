import { styled } from '@mui/material/styles';
import {
  Card,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Fade } from 'react-awesome-reveal';
import UnderlinedHeading from '../../@softbd/elements/common/UnderlinedHeading';
import { H4 } from '../../@softbd/elements/common';
import { useIntl } from 'react-intl';
import NoDataFoundComponent from '../youth/common/NoDataFoundComponent';
import React, { Children, useEffect, useState } from 'react';
import DateRangeIcon from '@mui/icons-material/DateRange';
import moment from 'moment';
import { momentLocalizer, View } from 'react-big-calendar';
import Calendar from '../../@softbd/calendar/Calendar';
import {
  ICalendar,
  ICalendarQuery,
} from '../../shared/Interface/common.interface';
import { useFetchPublicCalenderEvents } from '../../services/cmsManagement/hooks';
import {
  addStartEndPropsToList,
  eventsDateTimeMap,
} from '../../services/global/globalService';

const localizer = momentLocalizer(moment);
const PREFIX = 'EventSection';

const classes = {
  boxItem: `${PREFIX}-boxItem`,
  button: `${PREFIX}-button`,
  dateHeader: `${PREFIX}-dateHeader`,
  gridContainer: `${PREFIX}-gridContainer`,
  listIcon: `${PREFIX}-listIcon`,
};

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: '60px',
  [`& .${classes.boxItem}`]: {
    background: theme.palette.background.paper,
    borderRadius: 4 * parseInt(theme.shape.borderRadius.toString()),
    padding: '20px 15px 30px 15px',
    margin: 0,
    [theme.breakpoints.down('xl')]: {
      padding: '20px 10px 30px 10px',
    },
  },
  [`& .${classes.button}`]: {
    borderRadius: 40,
  },
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

const EventSection = () => {
  const { messages, formatDate } = useIntl();
  const dateFormat = 'YYYY-MM-DD';

  const [selectedItems, setSelectedItems] = useState<Array<ICalendar>>();
  const [viewFilters, setViewFilters] = useState<ICalendarQuery>({
    type: 'month',
  });
  const [eventsList, setEventsList] = useState<Array<ICalendar>>([]);
  const [currentDate, setCurrentDate] = useState<any>(
    moment(Date.now()).format(dateFormat),
  );

  let { data: events } = useFetchPublicCalenderEvents(viewFilters);

  useEffect(() => { }, [currentDate]);

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
    // console.log('onSelectSlot >>', e, eventsList);
    setCurrentDate(moment(e.start).format(dateFormat));
    setSelectedDateItems(e.start);
  };

  const startDates = eventsList.map(e => moment(e.start).format(dateFormat)) as string[];
  const hasEvent = (currentDate: string, allDates: string[]): boolean => allDates.find(e => e == currentDate) != undefined;
  const parsDate = (datevalue: any): string => moment(datevalue).format(dateFormat);
  const eventsByDate = (currentDate: string, allDates: string[]): string[] => allDates.filter(e => e == currentDate);

  // example implementation of a wrapper
  const ColoredDateCellWrapper = (evnt: any) => {
    const { children, value } = evnt;
    // console.log('check ColoredDateCellWrapper ', children);
    const currentDate = parsDate(value);
    let _backgroundColor = '';
    if (hasEvent(currentDate, startDates)) {
      _backgroundColor = '#671688';
    }
    return React.cloneElement(Children.only(children), {
      style: {
        ...children.style,
        ...{
          backgroundColor: _backgroundColor
        }
      },
    })
  }

  const customDateCellWrap = (e: any) => {
    return <div>
      {
        hasEvent(parsDate(e.date), startDates) ?
          <div style={{ color: '#fff', position: 'relative' }}>
            <span>{e.label}</span>
            <div style={{ position: 'absolute', backgroundColor: '#fff', color: '#671688', padding: '3px', borderRadius: '5px' }}>{eventsByDate(parsDate(e.date), startDates).length}</div>
          </div> :
          <span>{e.label}</span>
      }

    </div>
  }

  return (
    <StyledContainer maxWidth='lg'>
      <Fade direction='up'>
        <UnderlinedHeading>{messages['menu.events']}</UnderlinedHeading>
        <Card className={classes.gridContainer}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <H4 centered className={classes.dateHeader}>
                {formatDate(currentDate, { dateStyle: 'full' })}
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
                  messageType={messages['menu.events']}
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
                style={{ height: 500 }}
                startAccessor='start'
                endAccessor='end'
                defaultDate={moment().toDate()}
                views={['month']}
                onView={(view: View) =>
                  setViewFilters((prev) => ({
                    ...prev,
                    ...{ type: view === 'agenda' ? 'schedule' : view },
                  }))
                }
                onSelectSlot={onSelectSlot}
                onNavigate={(e: any) => {
                  const year = moment(e).year();
                  const month = moment(e).month() + 1;
                  setViewFilters((prev) => {
                    return { ...prev, month, year };
                  });
                }}
                components={{
                  dateCellWrapper: ColoredDateCellWrapper,
                  month: {
                    dateHeader: customDateCellWrap,
                    header: (e) => {
                      const lbl = messages[`calendar.${e.label}`];
                      return <span>{lbl}</span>
                    }
                  }
                }}
              />
            </Grid>
          </Grid>
        </Card>
      </Fade>
    </StyledContainer>
  );
};
export default EventSection;
