import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';
import YouthFrontPage from '../../../@softbd/layouts/hoc/YouthFrontPage';

const RPLApplicationForm = asyncComponent(
  () => import('../../../modules/youth/RPLApplication'),
);
export default YouthFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.confirm_email'] as string} />
      <RPLApplicationForm />
    </>
  );
});
