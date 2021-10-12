import {Card, CardContent} from '@mui/material';
import CardHeader from './CardHeader';
import {Add} from '@mui/icons-material';
import CustomContentCard from './CustomContentCard';
import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import EducationAddEditPage from './EducationAddEditPage';
import {useFetchEducations} from '../../../services/youthManagement/hooks';
import {YouthEducation} from '../../../services/youthManagement/typing';
import {deleteEducation} from '../../../services/youthManagement/EducationService';
import ContentWithImageSkeleton from './component/ContentWithImageSkeleton';

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
          (educations || []).map((education: YouthEducation) => {
            return (
              <React.Fragment key={education.id}>
                <CustomContentCard
                  contentTitle={education?.institute_name}
                  contentLogo={'E'}
                  contentServiceProvider={education?.institute_name}
                  date={education?.passing_year}
                  location={''}
                  contentEditButton={() => {
                    openEducationAddEditForm(education.id);
                  }}
                  contentDeleteButton={() => deleteEducationItem(education.id)}
                />
              </React.Fragment>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};

export default EducationSection;
