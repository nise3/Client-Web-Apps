import {Card, CardContent} from '@mui/material';
import CardHeader from './CardHeader';
import {BorderColor} from '@mui/icons-material';
import Reference from './Reference';
import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {useFetchYouthReferences} from '../../../services/youthManagement/hooks';
import {deleteReference} from '../../../services/youthManagement/ReferenceService';
import ReferenceAddEditPage from './ReferenceAddEditPage';

const ReferenceSection = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const {data: references, mutate: mutateReferences} =
    useFetchYouthReferences();
  const [referenceId, setReferenceId] = useState<number | null>(null);

  const [isOpenReferenceAddEditForm, setIsOpenReferenceAddEditForm] =
    useState<boolean>(false);

  const openReferenceAddEditForm = useCallback(
    (itemId: number | null = null) => {
      setReferenceId(itemId);
      setIsOpenReferenceAddEditForm(true);
    },
    [],
  );
  const closeReferenceAddEditForm = useCallback(() => {
    setReferenceId(null);
    setIsOpenReferenceAddEditForm(false);
    mutateReferences();
  }, []);

  const deleteReferenceItem = async (itemId: number) => {
    let response = await deleteReference(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='reference.label' />}}
        />,
      );
      mutateReferences();
    }
  };

  return isOpenReferenceAddEditForm ? (
    <ReferenceAddEditPage
      itemId={referenceId}
      onClose={closeReferenceAddEditForm}
    />
  ) : (
    <Card>
      <CardContent>
        <CardHeader
          headerTitle={messages['reference.label'] as string}
          buttons={[
            {
              label: messages['references.add_new_reference'] as string,
              icon: <BorderColor />,
              onclick: () => openReferenceAddEditForm(null),
            },
          ]}
        />
        {(references || []).map((reference: any) => (
          <Reference
            key={reference?.id}
            reference={reference}
            openReferenceAddEditForm={() =>
              openReferenceAddEditForm(reference?.id)
            }
            onDelete={() => deleteReferenceItem(reference?.id)}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default ReferenceSection;
