import asyncComponent from '../../@crema/utility/asyncComponent';
import InstituteDefaultFrontPage from '../../@softbd/layouts/hoc/InstituteDefaultFrontPage';
import React from 'react';
import {useIntl} from 'react-intl';
import PageMeta from '../../@crema/core/PageMeta';

const Institute = asyncComponent(() => import('../../modules/institute'));

export default InstituteDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['institute.label'] as string} />
      <Institute />
    </>
  );
});
