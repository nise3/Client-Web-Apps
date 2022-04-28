import React, {useCallback, useContext} from 'react';
import {styled} from '@mui/material/styles';
import languageData, {LanguageProps} from './data';
import AppContext from '../../utility/AppContext';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import {Fonts} from '../../../shared/constants/AppEnums';
import AppContextPropsType from '../../../redux/types/AppContextPropsType';
import {setBrowserCookie} from '../../../@softbd/libs/cookieInstance';
import {COOKIE_KEY_APP_CURRENT_LANG} from '../../../shared/constants/AppConst';
import {Card} from '@mui/material';

const PREFIX = 'LanguageSwitcher';

const classes = {
  langBtn: `${PREFIX}-langBtn`,
  overflowHidden: `${PREFIX}-overflowHidden`,
  alignMiddle: `${PREFIX}-alignMiddle`,
  textUppercase: `${PREFIX}-textUppercase`,
};

const StyledIconButton = styled(IconButton)(({theme}) => ({
  [`&.${classes.langBtn}`]: {
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    fontSize: 16,
    borderRadius: 0,
    [`&:hover`]: {
      background: 'none',
      transition: 'all .7s ease',
      transform: 'scale(1.1)',
    },
    [theme.breakpoints.up('md')]: {
      fontWeight: Fonts.MEDIUM,
      justifyContent: 'center',
      width: 'auto',
      textTransform: 'uppercase',
      marginTop: 0,
      marginRight: '10px',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 14,
      paddingTop: '0.75rem',
      paddingBottom: '0.75rem',
    },
    '&.langIconOnly': {
      paddingLeft: '0.8rem',
      paddingRight: '0.8rem',
      paddingTop: '0.25rem',
      paddingBottom: '0.25rem',
      borderLeft: '0 none',
      borderRadius: '50%',
      [theme.breakpoints.up('sm')]: {
        height: 70,
      },
      [theme.breakpoints.up('xl')]: {
        paddingLeft: '12px',
        paddingRight: '12px',
      },
    },
  },

  [`& .${classes.overflowHidden}`]: {
    overflow: 'hidden',
  },

  [`& .${classes.alignMiddle}`]: {
    verticalAlign: 'middle',
    display: 'inline-block',
  },

  [`& .${classes.textUppercase}`]: {
    textTransform: 'uppercase',
  },
}));

interface LanguageSwitcherProps {
  iconOnly?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  iconOnly = false,
}) => {
  const {changeLocale, rtlLocale, locale, setRTL} =
    useContext<AppContextPropsType>(AppContext);
  const [anchorElLng, setAnchorElLng] =
    React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorElLng);

  const onClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElLng(event.currentTarget);
  };

  const handleClose = useCallback(() => {
    setAnchorElLng(null);
  }, []);
  const changeLanguage = (language: LanguageProps) => {
    if (rtlLocale.indexOf(language.locale) !== -1) {
      setRTL!(true);
    } else {
      setRTL!(false);
    }
    setBrowserCookie(COOKIE_KEY_APP_CURRENT_LANG, language.locale);
    changeLocale!(language);
    setAnchorElLng(null);
  };

  return (
    <Box height={'100%'}>
      <StyledIconButton
        className={clsx(
          classes.langBtn,
          {
            langIconOnly: iconOnly,
          },
          'langBtn',
        )}
        title={'Language switch'}
        aria-label='account of current user'
        aria-controls='language-switcher'
        aria-haspopup='true'
        onClick={onClickMenu}
        color='inherit'
        size='large'>
        {!iconOnly ? (
          <>
            <Box
              component='span'
              mr={{xs: 1}}
              display='flex'
              alignItems='center'
              justifyContent='center'
              borderRadius='50%'
              className={classes.overflowHidden}>
              <i className={`flag flag-24 flag-${locale.icon}`} />
            </Box>
            <Box
              component='span'
              fontSize={16}
              fontWeight={Fonts.REGULAR}
              display='inline-block'>
              {locale.name}
            </Box>
          </>
        ) : (
          <Box>
            <i className={`flag flag-24 flag-${locale.icon}`} />
          </Box>
        )}
      </StyledIconButton>
      {open && (
        <div
          style={{
            background: '#8880',
            position: 'fixed',
            zIndex: 999999,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          onClick={() => handleClose()}
          onWheel={() => handleClose()}>
          {''}
        </div>
      )}
      {open && (
        <Card
          id='my-profile-menu'
          sx={{
            position: 'absolute',
            marginTop: '10px',
            boxShadow:
              '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
            zIndex: 9999999,
          }}>
          <div
            style={{
              background: 'none',
              padding: 0,
              margin: 0,
              border: 0,
              outline: 0,
              appearance: 'none',
              textAlign: 'unset',
            }}>
            {languageData.map((language: LanguageProps, index) => (
              <MenuItem key={index} onClick={() => changeLanguage(language)}>
                <Box display='flex' flexDirection='row' alignItems='center'>
                  <i className={`flag flag-24 flag-${language.icon}`} />
                  <Box
                    component='span'
                    ml={1}
                    fontSize={{xs: 14, xl: 16}}
                    fontWeight={Fonts.MEDIUM}>
                    {language.name}
                  </Box>
                </Box>
              </MenuItem>
            ))}
          </div>
        </Card>
      )}
    </Box>
  );
};

export default LanguageSwitcher;
