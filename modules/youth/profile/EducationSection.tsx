import {Card, CardContent} from '@mui/material';
import CardHeader from './CardHeader';
import {Add} from '@mui/icons-material';
import CustomContentCard from './CustomContentCard';
import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';
import {deleteRankType} from '../../../services/organaizationManagement/RankTypeService';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import EducationAddEditPage from './EducationAddEditPage';

const educations = [
  {
    id: 1,
    name: 'ssc',
    institute: 's.x college',
    board: 'dhaka',
    passingYear: '2017',
    logo: '/image/',
  },
  {
    id: 2,
    name: 'hsc',
    institute: 's.x college',
    board: 'dhaka',
    passingYear: '2019',
    logo: '/image/',
  },
];

const EducationSection = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
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
  }, []);

  const deleteEducationItem = async (itemId: number) => {
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

  return isOpenEducationAddEditForm ? (
    <EducationAddEditPage
      itemId={educationItemId}
      onClose={closeEducationAddEditForm}
    />
  ) : (
    <Card>
      <CardContent>
        <CardHeader
          headerTitle={messages['common.education'] as string}
          buttons={[
            {
              label: messages['common.add_new_education'] as string,
              icon: <Add />,
              onclick: () => openEducationAddEditForm(null),
            },
          ]}
        />
        {educations.map((education) => {
          return (
            <React.Fragment key={education.id}>
              <CustomContentCard
                contentTitle={education.name}
                contentLogo={education.logo}
                contentServiceProvider={education.institute}
                date={education.passingYear}
                location={education.board}
                contentEditButton={() => {
                  openEducationAddEditForm(education.id);
                }}
                contentDeleteButton={() => deleteEducationItem(education.id)}
              />
            </React.Fragment>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default EducationSection;
