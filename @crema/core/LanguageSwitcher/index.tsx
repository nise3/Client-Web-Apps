import React, {useContext} from 'react';
import languageData, {LanguageProps} from './data';
import Menu from '@mui/material/Menu';
import AppContext from '../../utility/AppContext';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';
import {Fonts} from '../../../shared/constants/AppEnums';
import AppContextPropsType, {
  CremaTheme,
} from '../../../redux/types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => ({
  langBtn: {
    justifyContent: 'flex-start',
    width: '100%',
    height: 56,
    fontSize: 16,
    borderRadius: 0,
    paddingTop: '0.25rem',
    paddingBottom: '0.25rem',
    marginTop: '-10px',
    color: theme.palette.text.primary,
    '&:hover, &:focus': {
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.up('sm')]: {
      minHeight: 70,
    },
    [theme.breakpoints.up('md')]: {
      fontWeight: Fonts.MEDIUM,
      justifyContent: 'center',
      width: 'auto',
      borderLeft: 'solid 1px',
      borderLeftColor: theme.palette.grey[200],
      textTransform: 'uppercase',
      marginTop: 0,
      color: theme.palette.text.primary,
      '&:hover, &:focus': {
        color: theme.palette.text.primary,
      },
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
      height: 56,
      borderLeft: '0 none',
      borderRadius: '50%',
      [theme.breakpoints.up('sm')]: {
        height: 70,
      },
      [theme.breakpoints.up('xl')]: {
        paddingLeft: '12px',
        paddingRight: '12px',
        width: '100%',
      },
    },
  },
  overflowHidden: {
    overflow: 'hidden',
  },
  alignMiddle: {
    verticalAlign: 'middle',
    display: 'inline-block',
  },
  textUppercase: {
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

  const onClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElLng(event.currentTarget);
  };
  const changeLanguage = (language: LanguageProps) => {
    if (rtlLocale.indexOf(language.locale) !== -1) {
      setRTL!(true);
    } else {
      setRTL!(false);
    }
    changeLocale!(language);
    setAnchorElLng(null);
  };

  const classes = useStyles();

  return (
    <Box>
      <IconButton
        className={clsx(
          classes.langBtn,
          {
            langIconOnly: iconOnly,
          },
          'langBtn',
        )}
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
              mr={{xs: 2}}
              height={48}
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
              fontFamily='Poppins'
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
      </IconButton>
      <Menu
        anchorEl={anchorElLng}
        id='language-switcher'
        keepMounted
        open={Boolean(anchorElLng)}
        onClose={() => setAnchorElLng(null)}>
        {languageData.map((language: LanguageProps, index) => (
          <MenuItem key={index} onClick={() => changeLanguage(language)}>
            <Box display='flex' flexDirection='row' alignItems='center'>
              <i className={`flag flag-24 flag-${language.icon}`} />
              <Box
                component='h4'
                ml={2}
                fontSize={{xs: 14, xl: 16}}
                fontWeight={Fonts.MEDIUM}>
                {language.name}
              </Box>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageSwitcher;
