import References from './References';
import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import {isResponseSuccess} from '../../../../@softbd/utilities/helpers';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {useFetchYouthReferences} from '../../../../services/youthManagement/hooks';
import {deleteReference} from '../../../../services/youthManagement/ReferenceService';
import ReferenceAddEditPage from './ReferenceAddEditPage';
import CustomParabolaButton from '../component/CustomParabolaButton';
import ContentLayout from '../component/ContentLayout';
import {Add} from '@mui/icons-material';
import HorizontalLine from '../component/HorizontalLine';
import {Avatar, Box, Typography} from '@mui/material';
import NoDataFoundComponent from '../../common/NoDataFoundComponent';

const ReferenceSection = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const {
    data: references,
    isLoading,
    mutate: mutateReferences,
  } = useFetchYouthReferences();
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

  const deleteReferenceItem = useCallback(async (itemId: number) => {
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
  }, []);

  return isOpenReferenceAddEditForm ? (
    <ReferenceAddEditPage
      itemId={referenceId}
      onClose={closeReferenceAddEditForm}
    />
  ) : (
    <ContentLayout
      title={messages['reference.label']}
      isLoading={isLoading}
      actions={
        <CustomParabolaButton
          buttonVariant={'outlined'}
          title={messages['references.add_new_reference'] as string}
          icon={<Add />}
          onClick={() => openReferenceAddEditForm(null)}
        />
      }>
      {!references || references?.length == 0 ? (
        <>
          <HorizontalLine />
          <Box sx={{display: 'flex'}}>
            <Avatar>C</Avatar>
            <Typography style={{marginLeft: '15px'}}>
              <NoDataFoundComponent
                messageType={messages['reference.label']}
                messageTextType={'inherit'}
              />
            </Typography>
          </Box>
        </>
      ) : (
        <References
          references={references}
          openReferenceAddEditForm={openReferenceAddEditForm}
          onDeleteReference={deleteReferenceItem}
        />
      )}
    </ContentLayout>
  );
};

export default ReferenceSection;
