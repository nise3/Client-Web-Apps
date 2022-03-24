import {Avatar, Box, Typography} from '@mui/material';
import {Add} from '@mui/icons-material';
import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';
import GuardianAddEditPage from './GuardianAddEditPage';
import GuardianViewPage from './GuardianViewPage';
import CustomParabolaButton from '../component/CustomParabolaButton';
import ContentLayout from '../component/ContentLayout';
import HorizontalLine from '../component/HorizontalLine';
import {useFetchGuardians} from '../../../../services/youthManagement/hooks';
import {Guardian} from '../../../../services/youthManagement/typing';
import VerticalLine from '../component/VerticalLine';
import {styled} from '@mui/material/styles';
import {Fonts, ThemeMode} from '../../../../shared/constants/AppEnums';
import {H3} from '../../../../@softbd/elements/common';
import {useCustomStyle} from '../../../../@softbd/hooks/useCustomStyle';
import NoDataFoundComponent from '../../common/NoDataFoundComponent';

const PREFIX = 'GuardianSection';
const classes = {
  textStyle: `${PREFIX}-textStyle`,
};

const StyledBox = styled(Box)(({theme}) => ({
  [`& .${classes.textStyle}`]: {
    color:
      theme.palette.mode === ThemeMode.DARK
        ? theme.palette.common.white
        : theme.palette.common.black,
    fontWeight: Fonts.BOLD,
  },
}));

const GuardianSection = () => {
  const {messages} = useIntl();
  const result = useCustomStyle();

  const {
    data: guardians,
    isLoading,
    mutate: mutateGuardians,
  } = useFetchGuardians();

  const [isOpenGuardianAddEditForm, setIsOpenGuardianAddEditForm] =
    useState<boolean>(false);
  const [isOpenGuardianView, setIsOpenGuardianView] = useState<boolean>(false);
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
          guardians={guardians}
          mutateGuardians={mutateGuardians}
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
              icon={<Add />}
              onClick={() => openGuardianAddEditForm(null)}
            />
          }>
          <HorizontalLine />
          <Box sx={{display: 'flex'}}>
            <Avatar>G</Avatar>
            <Box sx={{marginLeft: '15px'}}>
              {!guardians || guardians?.length == 0 ? (
                <NoDataFoundComponent
                  messageType={messages['guardian.title']}
                  messageTextType={'inherit'}
                  sx={{marginTop: '10px'}}
                />
              ) : (
                <React.Fragment>
                  <StyledBox sx={{display: 'flex'}}>
                    {guardians.map((guardian: Guardian, index: number) => (
                      <React.Fragment key={guardian.id}>
                        {index != 0 && <VerticalLine />}
                        <H3
                          sx={{...result.body1}}
                          className={classes.textStyle}>
                          {guardian.name}
                        </H3>
                      </React.Fragment>
                    ))}
                  </StyledBox>
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
