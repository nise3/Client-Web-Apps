import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import FrontPage from '../../../@crema/hoc/FrontPage';
import React from 'react';
import {useIntl} from 'react-intl';

const YouthEnterBkashPinPage = asyncComponent(
  () => import('../../../modules/youth/enterBkashPin'),
);
export default FrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.enter_bkash_pin'] as string} />
      <YouthEnterBkashPinPage />
    </>
  );
});
