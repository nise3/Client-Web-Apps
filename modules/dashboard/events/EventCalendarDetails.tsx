import React from 'react';
import {Grid} from '@mui/material';
import {useIntl} from 'react-intl';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import moment from 'moment';
import {DATE_FORMAT, TIME_FORMAT} from '../../../@softbd/utilities/DateTime';
import {ICalendar} from '../../../shared/Interface/common.interface';


type Props = {
  itemData: ICalendar;
};

const EventCalendarDetails = ({itemData, ...props}: Props) => {
  const eventStart = itemData?.start_time
    ? `${itemData.start_date}T${itemData.start_time}`
    : itemData?.start_date;
  const eventEnd = itemData?.end_time
    ? `${itemData.end_date}T${itemData.end_time}`
    : itemData?.end_date;
  const start_date = eventStart ? moment(eventStart).format(DATE_FORMAT) : null;
  const end_date = eventEnd ? moment(eventEnd).format(DATE_FORMAT) : null;
  const start_time = eventStart ? moment(eventStart).format(TIME_FORMAT) : null;
  const end_time = eventEnd ? moment(eventEnd).format(TIME_FORMAT) : null;
  const {messages} = useIntl();
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <DetailsInputView
            label={messages['common.title']}
            value={itemData?.title}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DetailsInputView
            label={messages['common.event_start_date']}
            value={start_date}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DetailsInputView
            label={messages['common.event_end_date']}
            value={end_date}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DetailsInputView
            label={messages['common.start_time']}
            value={start_time}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DetailsInputView
            label={messages['common.end_time']}
            value={end_time}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default EventCalendarDetails;
