import asyncComponent from '../../@crema/utility/asyncComponent';
import PageMeta from '../../@crema/core/PageMeta';
import FrontPage from '../../@crema/hoc/FrontPage';
import React from 'react';
import {useIntl} from 'react-intl';

const MyCVPage = asyncComponent(() => import('../../modules/my-cv'));
export default FrontPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['common.my_cv']} />
      <MyCVPage />
    </>
  );
});
