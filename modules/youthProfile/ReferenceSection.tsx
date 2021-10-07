import {Box, Card, CardContent} from '@mui/material';
import CardHeader from './CardHeader';
import {BorderColor} from '@mui/icons-material';
import Reference from './Reference';
import React from 'react';
import referencePeopleAvatar from '../../public/images/youth/avatar.png';
import {useIntl} from 'react-intl';
import useNotiStack from '../../@softbd/hooks/useNotifyStack';
import {deleteRankType} from '../../services/organaizationManagement/RankTypeService';
import {isResponseSuccess} from '../../@softbd/utilities/helpers';
import IntlMessages from '../../@crema/utility/IntlMessages';

type ReferenceSectionProp = {
  openReferenceAddEditForm: (itemId: number | null) => void;
};

const references = [
  {
    id: 1,
    name: 'Istiak',
    position: 'Ui/UX designer',
    image: referencePeopleAvatar,
    email: 'istiak@gmail.com',
    phone: '037583838',
    location: 'mirpur 292010',
  },
  {
    id: 2,
    name: 'Md. Istiak Ahmen',
    position: 'Software Engineer',
    image: referencePeopleAvatar,
    email: 'istiak@gmail.com',
    phone: '037583838',
    location: 'Mirpur 292010',
  },
];

const ReferenceSection = ({openReferenceAddEditForm}: ReferenceSectionProp) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();

  const deleteReferenceItem = async (itemId: number) => {
    let response = await deleteRankType(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='rank_types.label' />}}
        />,
      );
    }
  };

  return (
    <Box mt={4}>
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

          {references.map((reference: any, key: number) => (
            <Reference
              key={key}
              name={reference.name}
              image={reference.image}
              position={reference.position}
              phone={reference.phone}
              email={reference.email}
              location={reference.location}
              onclick={() => openReferenceAddEditForm(reference.id)}
              onDelete={() => deleteReferenceItem(reference.id)}
            />
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReferenceSection;
