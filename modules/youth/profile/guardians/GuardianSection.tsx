import {Avatar, Box, Typography} from '@mui/material';
import {BorderColor} from '@mui/icons-material';
import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';
import GuardianAddEditPage from './GuardianAddEditPage';
import GuardianViewPage from './GuardianViewPage';
import CustomParabolaButton from '../component/CustomParabolaButton';
import ContentLayout from '../component/ContentLayout';
import HorizontalLine from '../component/HorizontalLine';
import {useFetchGuardians} from '../../../../services/youthManagement/hooks';
import {Guardian} from '../../../../services/youthManagement/typing';
import TextPrimary from '../component/TextPrimary';
import VerticalLine from '../component/VerticalLine';

const GuardianSection = () => {
  const {messages} = useIntl();
  const {
    data: guardians,
    isLoading,
    mutate: mutateGuardians,
  } = useFetchGuardians();

  const [isOpenGuardianAddEditForm, setIsOpenGuardianAddEditForm] =
    useState<boolean>(false);
  const [isOpenGuardianView, setIsOpenGuardianView] =
    useState<boolean>(false);
  const [guardianId, setGuardianId] = useState<number | null>(null);

  const openGuardianAddEditForm = useCallback(
    (itemId: number | null = null) => {
      setGuardianId(itemId);
      setIsOpenGuardianAddEditForm(true);
    },
    [],
  );
  const closeGuardianAddEditForm = useCallback(() => {
    setGuardianId(null);
    setIsOpenGuardianAddEditForm(false);
    mutateGuardians();
  }, []);

  const openGuardianView = useCallback(() => {
    setIsOpenGuardianView(true);
  }, []);

  const closeGuardianView = useCallback(() => {
    setIsOpenGuardianAddEditForm(false);
    setIsOpenGuardianView(false);
  }, []);

  return (
    <React.Fragment>
      {isOpenGuardianView && (
        <GuardianViewPage
          onEdit={openGuardianAddEditForm}
          onClose={closeGuardianView}
        />
      )}
      {isOpenGuardianAddEditForm && (
        <GuardianAddEditPage
          itemId={guardianId}
          onClose={closeGuardianAddEditForm}
        />
      )}
      {!isOpenGuardianView && !isOpenGuardianAddEditForm && (
        <ContentLayout
          title={messages['guardian.title']}
          isLoading={isLoading}
          actions={
            <CustomParabolaButton
              buttonVariant={'outlined'}
              title={messages['guardian.add'] as string}
              icon={<BorderColor />}
              onClick={() => openGuardianAddEditForm(null)}
            />
          }>
          <HorizontalLine />
          <Box sx={{display: 'flex'}}>
            <Avatar>G</Avatar>
            <Box sx={{marginLeft: '15px'}}>
              {(!guardians || guardians?.length == 0) && (
                <Typography>{messages['guardian.no_data']}</Typography>
              )}
              {guardians && (
                <React.Fragment>
                  <Box sx={{display: 'flex'}}>
                    {guardians.map((guardian: Guardian, index: number) => (
                      <React.Fragment key={guardian.id}>
                        {index != 0 && <VerticalLine />}
                        <TextPrimary text={guardian.name} />
                      </React.Fragment>
                    ))}
                  </Box>
                  <Typography
                    variant={'caption'}
                    onClick={() => {
                      openGuardianView();
                    }}
                    sx={{cursor: 'pointer'}}>
                    {messages['guardian.view']}
                  </Typography>
                </React.Fragment>
              )}
            </Box>
          </Box>
        </ContentLayout>
      )}
    </React.Fragment>
  );
};

export default GuardianSection;
