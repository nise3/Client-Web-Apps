import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';
import ErplDefaultFrontPage from '../../../@softbd/layouts/hoc/ErplDefaultFrontPage';

const RPLApplicationForm = asyncComponent(
  () => import('../../../modules/erpl/rplApplication'),
);
export default ErplDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.application'] as string} />
      <RPLApplicationForm />
    </>
  );
});
