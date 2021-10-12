import {Card, CardContent} from '@mui/material';
import CardHeader from './CardHeader';
import {Add} from '@mui/icons-material';
import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import EducationAddEditPage from './EducationAddEditPage';
import {useFetchEducations} from '../../../services/youthManagement/hooks';
import {deleteEducation} from '../../../services/youthManagement/EducationService';
import ContentWithImageSkeleton from './component/ContentWithImageSkeleton';
import EducationComponent from './component/EducationComponent';

const EducationSection = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const {
    data: educations,
    isLoading,
    mutate: mutateEducations,
  } = useFetchEducations();
  const [isOpenEducationAddEditForm, setIsOpenEducationAddEditForm] =
    useState<boolean>(false);
  const [educationItemId, setEducationItemId] = useState<number | null>(null);

  const openEducationAddEditForm = useCallback(
    (itemId: number | null = null) => {
      setEducationItemId(itemId);
      setIsOpenEducationAddEditForm(true);
    },
    [],
  );

  const closeEducationAddEditForm = useCallback(() => {
    setEducationItemId(null);
    setIsOpenEducationAddEditForm(false);
    mutateEducations();
  }, []);

  const deleteEducationItem = async (itemId: number) => {
    let response = await deleteEducation(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='education.label' />}}
        />,
      );
      mutateEducations();
    }
  };

  return isOpenEducationAddEditForm ? (
    <EducationAddEditPage
      itemId={educationItemId}
      onClose={closeEducationAddEditForm}
    />
  ) : (
    <Card>
      <CardContent>
        <CardHeader
          headerTitle={messages['education.label'] as string}
          buttons={[
            {
              label: messages['common.add_new_education'] as string,
              icon: <Add />,
              onclick: () => openEducationAddEditForm(null),
            },
          ]}
        />
        {isLoading ? (
          <ContentWithImageSkeleton />
        ) : (
          <EducationComponent
            educations={educations}
            onEditClick={openEducationAddEditForm}
            onDeleteClick={(educationId) => {
              (async () => {
                await deleteEducationItem(educationId);
              })();
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default EducationSection;
