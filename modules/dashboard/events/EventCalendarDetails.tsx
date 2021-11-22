import React from 'react';
import {Grid} from '@mui/material';
import {useIntl} from 'react-intl';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import moment from 'moment';
import {DATE_FORMAT, TIME_FORMAT} from '../../../@softbd/utilities/DateTime';

type Props = {
  itemData: any;
};

const EventCalendarDetails = ({itemData, ...props}: Props) => {
  if (itemData) {
    console.log(itemData);
    // const start_date = moment(itemData.start).format(DATE_FORMAT);
    // const end_date = moment(itemData.end).format(DATE_FORMAT);
    // const start_time = moment(itemData.start).format(TIME_FORMAT);
    // const end_time = moment(itemData.end).format(TIME_FORMAT);
  }
  const eventStart = `${itemData.start_date}T${itemData.start_time}`;
  const eventEnd = `${itemData.end_date}T${itemData.end_time}`;
  const start_date = itemData ? moment(eventStart).format(DATE_FORMAT) : null;
  const end_date = itemData ? moment(eventEnd).format(DATE_FORMAT) : null;
  const start_time = itemData ? moment(eventStart).format(TIME_FORMAT) : null;
  const end_time = itemData ? moment(eventEnd).format(TIME_FORMAT) : null;
  // console.log(itemData.start, itemData.end);
  //
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
