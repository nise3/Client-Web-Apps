import {Box, Card, CardContent} from '@mui/material';
import CardHeader from './CardHeader';
import {Add} from '@mui/icons-material';
import CustomContentCard from './CustomContentCard';
import React from 'react';
import {useIntl} from 'react-intl';
import {deleteRankType} from '../../services/organaizationManagement/RankTypeService';
import {isResponseSuccess} from '../../@softbd/utilities/helpers';
import IntlMessages from '../../@crema/utility/IntlMessages';
import useNotiStack from '../../@softbd/hooks/useNotifyStack';

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

type EducationSectionProp = {
  onclick: (itemId: number | null) => void;
};

const EducationSection = ({onclick}: EducationSectionProp) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();

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

  return (
    <Box mt={4}>
      <Card>
        <CardContent>
          <CardHeader
            headerTitle={messages['common.education'] as string}
            buttons={[
              {
                label: messages['common.add_new_education'] as string,
                icon: <Add />,
                onclick: () => onclick(null),
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
                  contentEditButton={onclick}
                  contentDeleteButton={() => deleteEducationItem(education.id)}
                />
              </React.Fragment>
            );
          })}
        </CardContent>
      </Card>
    </Box>
  );
};

export default EducationSection;
