import {Add} from '@mui/icons-material';
import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';
import {isResponseSuccess} from '../../../../@softbd/utilities/helpers';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import EducationAddEditPage from './EducationAddEditPage';
import {useFetchEducations} from '../../../../services/youthManagement/hooks';
import {deleteEducation} from '../../../../services/youthManagement/EducationService';
import Educations from './Educations';
import CustomParabolaButton from '../component/CustomParabolaButton';
import ContentLayout from '../component/ContentLayout';
import HorizontalLine from '../component/HorizontalLine';
import {Avatar, Box, Typography} from '@mui/material';
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
    <ContentLayout
      title={messages['education.label']}
      isLoading={isLoading}
      actions={
        <CustomParabolaButton
          buttonVariant={'outlined'}
          title={messages['common.add_new_education'] as string}
          icon={<Add />}
          onClick={() => openEducationAddEditForm(null)}
        />
      }>
      {!educations || educations?.length == 0 ? (
        <>
          <HorizontalLine />
          <Box sx={{display: 'flex'}}>
            <Avatar>C</Avatar>
            <Typography style={{marginLeft: '15px'}}>
              {messages['common.no_data_found']}
            </Typography>
          </Box>
        </>
      ) : (
        <Educations
          educations={educations || []}
          onEditClick={openEducationAddEditForm}
          onDeleteClick={(educationId) => {
            (async () => {
              await deleteEducationItem(educationId);
            })();
          }}
        />
      )}
    </ContentLayout>
  );
};

export default EducationSection;
