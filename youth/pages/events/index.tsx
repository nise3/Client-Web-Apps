import React from 'react';
import YouthFrontPage from '../../../@softbd/layouts/hoc/YouthFrontPage';
import PageMeta from '../../../@crema/core/PageMeta';
import asyncComponent from '../../../@crema/utility/asyncComponent';
import {useIntl} from 'react-intl';

const YouthCalendarPage = asyncComponent(
  () => import('../../../modules/youth/feed/YouthCalendar'),
);


export default YouthFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['menu.calendar'] as string} />
      <YouthCalendarPage/>
    </>
  );
});
