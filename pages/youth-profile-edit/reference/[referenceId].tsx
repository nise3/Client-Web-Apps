import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import FrontPage from '../../../@crema/hoc/FrontPage';
import React from 'react';
import {useIntl} from 'react-intl';

const ReferencePage = asyncComponent(
  () => import('../../../modules/youthProfile/ReferenceAddEditPage'),
);
export default FrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['reference.label']} />
      <ReferencePage />
    </>
  );
});
