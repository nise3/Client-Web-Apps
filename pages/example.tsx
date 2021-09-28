import FrontPage from '../@crema/hoc/FrontPage';
import {useIntl} from 'react-intl';
import PageMeta from '../@crema/core/PageMeta';
import React from 'react';

export default FrontPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['batches.label']} />
      <h1>Hello world</h1>
    </>
  );
});
