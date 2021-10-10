import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';
import YouthFrontPage from '../../../@softbd/layouts/hoc/YouthFrontPage';

const YouthEnterBkashPinPage = asyncComponent(
  () => import('../../../modules/youth/enterBkashPin'),
);
export default YouthFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.enter_bkash_pin'] as string} />
      <YouthEnterBkashPinPage />
    </>
  );
});
