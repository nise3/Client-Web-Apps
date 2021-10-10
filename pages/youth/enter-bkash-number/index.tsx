import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';
import YouthFrontPage from '../../../@softbd/layouts/hoc/YouthFrontPage';

const YouthEnterBkashNumberPage = asyncComponent(
  () => import('../../../modules/youth/enterBkashNumber'),
);
export default YouthFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.enter_bkash_number'] as string} />
      <YouthEnterBkashNumberPage />
    </>
  );
});
