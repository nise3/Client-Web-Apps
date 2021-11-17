import {Theme} from '@mui/system';
import {TypographyOptions} from '@mui/material/styles/createTypography';
import {LocaleFonts} from './Locale';
import {Fonts} from '../../../../shared/constants/AppEnums';

export default function typography(theme: Theme, locale: string) {
  const localeFont = LocaleFonts[locale];
  console.log('LOCALE >>', localeFont);
  const customTypography: TypographyOptions = {
    fontFamily: localeFont,
    htmlFontSize: 16,
    fontSize: 16,
    fontWeightLight: Fonts.LIGHT,
    fontWeightRegular: Fonts.REGULAR,
    fontWeightMedium: Fonts.MEDIUM,
    fontWeightBold: Fonts.EXTRA_BOLD,
    ////////////////////////
    /*subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: theme.palette.primary.main,
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 400,
    },
    caption: {
      fontSize: '0.75rem',
      color: theme.palette.primary.main,
      fontWeight: 400,
    },
    body1: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1.334em',
    },
    body2: {
      letterSpacing: '0em',
      fontWeight: 400,
      lineHeight: '1.5em',
      color: theme.palette.primary.main,
    },*/
    ////////////////////////
    h1: {
      fontFamily: localeFont,
      fontWeight: Fonts.LIGHT,
      fontSize: '2.75rem',
      lineHeight: 1.167,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontFamily: localeFont,
      fontWeight: Fonts.LIGHT,
      fontSize: '2.25rem',
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontFamily: localeFont,
      fontWeight: Fonts.REGULAR,
      fontSize: '2rem',
      lineHeight: 1.167,
      letterSpacing: '0em',
    },
    h4: {
      fontFamily: localeFont,
      fontWeight: Fonts.REGULAR,
      fontSize: '1.75rem',
      lineHeight: 1.235,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontFamily: localeFont,
      fontWeight: Fonts.REGULAR,
      fontSize: '1.5rem',
      lineHeight: 1.334,
      letterSpacing: '0em',
    },
    h6: {
      fontFamily: localeFont,
      fontWeight: Fonts.MEDIUM,
      fontSize: '1.25rem',
      lineHeight: 1.6,
      letterSpacing: '0.0075em',
    },
    subtitle1: {
      fontFamily: localeFont,
      fontWeight: Fonts.REGULAR,
      fontSize: '1.25rem',
      lineHeight: 1.75,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontFamily: localeFont,
      fontWeight: Fonts.MEDIUM,
      fontSize: '1rem',
      lineHeight: 1.57,
      letterSpacing: '0.00714em',
    },
    body1: {
      fontFamily: localeFont,
      fontWeight: Fonts.REGULAR,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontFamily: localeFont,
      fontWeight: Fonts.REGULAR,
      fontSize: '0.875rem',
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
    },
    caption: {
      fontFamily: localeFont,
      fontWeight: Fonts.REGULAR,
      fontSize: '0.75rem',
      lineHeight: 1.66,
      letterSpacing: '0.03333em',
    },
    button: {
      fontFamily: localeFont,
      fontWeight: Fonts.MEDIUM,
      fontSize: '1.25rem',
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'uppercase',
    },
    overline: {
      fontFamily: localeFont,
      fontWeight: Fonts.REGULAR,
      fontSize: '0.75rem',
      lineHeight: 2.66,
      letterSpacing: '0.08333em',
      textTransform: 'uppercase',
    },
  };

  return customTypography;
}
