import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';
import PageMeta from '../../@crema/core/PageMeta';
import useNotiStack from '../../@softbd/hooks/useNotifyStack';

export default AppPage(() => {
  const {successStack} = useNotiStack();

  const onShowMessage = () => {
    successStack(Math.random());
  };

  return (
    <React.Fragment>
      <PageMeta title='Dashboard' />
      <h1 onClick={() => onShowMessage()}>Welcome to Nise-3</h1>
    </React.Fragment>
  );
});
