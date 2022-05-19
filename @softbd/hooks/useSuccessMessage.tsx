import IntlMessages from '../../@crema/utility/IntlMessages';
import React from 'react';
import useNotiStack from './useNotifyStack';

export default function useSuccessMessage() {
  const {successStack} = useNotiStack();

  const createSuccessMessage = (messageId: string) => {
    successStack(
      <IntlMessages
        id='common.subject_created_successfully'
        values={{subject: <IntlMessages id={messageId} />}}
      />,
    );
  };

  const updateSuccessMessage = (messageId: string) => {
    successStack(
      <IntlMessages
        id='common.subject_updated_successfully'
        values={{subject: <IntlMessages id={messageId} />}}
      />,
    );
  };

  const selectSuccessMessage = (messageId: string) => {
    successStack(
      <IntlMessages
        id='common.subject_selected_successfully'
        values={{subject: <IntlMessages id={messageId} />}}
      />,
    );
  };

  return {
    createSuccessMessage,
    updateSuccessMessage,
    selectSuccessMessage
  };
}
