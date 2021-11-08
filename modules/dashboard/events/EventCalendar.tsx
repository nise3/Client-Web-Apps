import React from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconInstitute from '../../../@softbd/icons/IconInstitute';
import Calendar from '../../../@softbd/calendar/Calendar';

const EventCalendar = () => {
  return (
    <>
      <PageBlock
        title={
          <>
            <IconInstitute /> <IntlMessages id='menu.faq' />
          </>
        }>
        <Calendar />
      </PageBlock>
    </>
  );
};

export default EventCalendar;
