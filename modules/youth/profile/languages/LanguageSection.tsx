import {Avatar, Box, Typography} from '@mui/material';
import {Add} from '@mui/icons-material';
import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';
import LanguageAddEditPage from './LanguageAddEditPage';
import LanguageProficiencyViewPage from './LanguageProficiencyViewPage';
import CustomParabolaButton from '../component/CustomParabolaButton';
import ContentLayout from '../component/ContentLayout';
import HorizontalLine from '../component/HorizontalLine';
import {useFetchLanguageProficiencies} from '../../../../services/youthManagement/hooks';
import {YouthLanguageProficiency} from '../../../../services/youthManagement/typing';
import VerticalLine from '../component/VerticalLine';
import {styled} from '@mui/material/styles';
import {Fonts, ThemeMode} from '../../../../shared/constants/AppEnums';
import {getYouthProfile} from '../../../../services/youthManagement/YouthService';
import {isResponseSuccess} from '../../../../@softbd/utilities/helpers';
import {UPDATE_AUTH_USER} from '../../../../redux/types/actions/Auth.actions';
import {getYouthAuthUserObject} from '../../../../redux/actions';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../../redux/types/models/CommonAuthUser';
import {useDispatch} from 'react-redux';
import {H3} from '../../../../@softbd/elements/common';
import {useCustomStyle} from '../../../../@softbd/hooks/useCustomStyle';
import NoDataFoundComponent from '../../common/NoDataFoundComponent';

const PREFIX = 'LanguageSection';
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

const LanguageSection = () => {
  const {messages} = useIntl();
  const result = useCustomStyle();

  const authUser = useAuthUser<YouthAuthUser>();
  const dispatch = useDispatch();
  const {
    data: languageProficiencies,
    isLoading,
    mutate: mutateLanguageProficiencies,
  } = useFetchLanguageProficiencies();

  const [isOpenLanguageAddEditForm, setIsOpenLanguageAddEditForm] =
    useState<boolean>(false);
  const [isOpenLanguageProficiencyView, setIsOpenLanguageProficiencyView] =
    useState<boolean>(false);
  const [languageId, setLanguageId] = useState<number | null>(null);
  const updateProfile = () => {
    (async () => {
      const response = await getYouthProfile();
      if (isResponseSuccess(response) && response.data) {
        dispatch({
          type: UPDATE_AUTH_USER,
          payload: getYouthAuthUserObject({...authUser, ...response.data}),
        });
      }
    })();
  };
  const openLanguageAddEditForm = useCallback(
    (itemId: number | null = null) => {
      setLanguageId(itemId);
      setIsOpenLanguageAddEditForm(true);
    },
    [],
  );
  const closeLanguageAddEditForm = useCallback(() => {
    setLanguageId(null);
    setIsOpenLanguageAddEditForm(false);
    updateProfile();
    mutateLanguageProficiencies();
  }, []);

  const openLanguageProficiencyView = useCallback(() => {
    setIsOpenLanguageProficiencyView(true);
  }, []);

  const closeLanguageProficiencyView = useCallback(() => {
    setIsOpenLanguageAddEditForm(false);
    setIsOpenLanguageProficiencyView(false);
  }, []);

  return (
    <React.Fragment>
      {isOpenLanguageProficiencyView && (
        <LanguageProficiencyViewPage
          onEdit={openLanguageAddEditForm}
          onClose={closeLanguageProficiencyView}
          languageProficiencies={languageProficiencies}
          mutateLanguageProficiencies={mutateLanguageProficiencies}
        />
      )}
      {isOpenLanguageAddEditForm && (
        <LanguageAddEditPage
          itemId={languageId}
          onClose={closeLanguageAddEditForm}
        />
      )}
      {!isOpenLanguageProficiencyView && !isOpenLanguageAddEditForm && (
        <ContentLayout
          title={messages['language_proficiency.title']}
          isLoading={isLoading}
          actions={
            <CustomParabolaButton
              buttonVariant={'outlined'}
              title={messages['language_proficiency.add'] as string}
              icon={<Add />}
              onClick={() => openLanguageAddEditForm(null)}
            />
          }>
          <HorizontalLine />
          <Box sx={{display: 'flex'}}>
            <Avatar>L</Avatar>
            <Box sx={{marginLeft: '15px'}}>
              {(!languageProficiencies ||
                languageProficiencies?.length == 0) && (
                <NoDataFoundComponent
                  messageType={messages['language_proficiency.title']}
                  messageTextType={'inherit'}
                  sx={{marginTop: '10px'}}
                />
              )}
              {languageProficiencies && (
                <React.Fragment>
                  <StyledBox sx={{display: 'flex'}}>
                    {languageProficiencies.map(
                      (language: YouthLanguageProficiency, index: number) => (
                        <React.Fragment key={language.id}>
                          {index != 0 && <VerticalLine />}
                          {/*<TextPrimary text={language.language_title} />*/}
                          <H3
                            sx={{...result.body1}}
                            className={classes.textStyle}>
                            {language.language_title}
                          </H3>
                        </React.Fragment>
                      ),
                    )}
                  </StyledBox>
                  <Typography
                    variant={'caption'}
                    onClick={() => {
                      openLanguageProficiencyView();
                    }}
                    sx={{cursor: 'pointer'}}>
                    {messages['language_proficiency.view']}
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

export default LanguageSection;
