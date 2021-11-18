import {Theme} from '@mui/system';
import {TypographyOptions} from '@mui/material/styles/createTypography';
import {LocaleFonts} from './Locale';
import {Fonts} from '../../../../shared/constants/AppEnums';

export default function typography(theme: Theme, locale: string) {
  const localeFont = LocaleFonts[locale];
  const customTypography: TypographyOptions = {
    fontFamily: localeFont,
    htmlFontSize: 16,
    fontSize: 14,
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
      lineHeight: 1.167,
      letterSpacing: '-0.01562em',
      fontSize: '2.75rem 2.75rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '2.5rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '2.75rem',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '3rem',
      },
    },
    h2: {
      fontFamily: localeFont,
      fontWeight: Fonts.LIGHT,
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
      fontSize: '2.25rem 2.25rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '2rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '2.25rem',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '2.5rem',
      },
    },
    h3: {
      fontFamily: localeFont,
      fontWeight: Fonts.REGULAR,
      lineHeight: 1.167,
      letterSpacing: '0em',
      fontSize: '2rem 2rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '1.75rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '2rem',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '2.25rem',
      },
    },
    h4: {
      fontFamily: localeFont,
      fontWeight: Fonts.REGULAR,
      lineHeight: 1.235,
      letterSpacing: '0.00735em',
      fontSize: '1.75rem 1.75rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '1.625rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '1.75rem',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '1.875rem',
      },
    },
    h5: {
      fontFamily: localeFont,
      fontWeight: Fonts.REGULAR,
      lineHeight: 1.334,
      letterSpacing: '0em',
      fontSize: '1.5rem 1.5rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '1.375rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '1.5rem',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '1.625rem',
      },
    },
    h6: {
      fontFamily: localeFont,
      fontWeight: Fonts.MEDIUM,
      lineHeight: 1.6,
      letterSpacing: '0.0075em',
      fontSize: '1.25rem 1.25rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '1.125rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '1.25rem',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '1.375rem',
      },
    },
    subtitle1: {
      fontFamily: localeFont,
      fontWeight: Fonts.REGULAR,
      lineHeight: 1.75,
      letterSpacing: '0.00938em',
      fontSize: '1.25rem 1.25rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '1.125rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '1.25rem',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '1.375rem',
      },
    },
    subtitle2: {
      fontFamily: localeFont,
      fontWeight: Fonts.MEDIUM,
      lineHeight: 1.57,
      letterSpacing: '0.00714em',
      fontSize: '1rem 1rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '0.875rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '1rem',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '1.125rem',
      },
    },
    body1: {
      fontFamily: localeFont,
      fontWeight: Fonts.REGULAR,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
      fontSize: '1rem 1rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '0.875rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '1rem',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '1.125rem',
      },
    },
    body2: {
      fontFamily: localeFont,
      fontWeight: Fonts.REGULAR,
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
      fontSize: '0.875rem 0.875rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '0.75rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '0.875rem',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '1rem',
      },
    },
    caption: {
      fontFamily: localeFont,
      fontWeight: Fonts.REGULAR,
      lineHeight: 1.66,
      letterSpacing: '0.03333em',
      fontSize: '0.75rem 0.75rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '0.625rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '0.75rem',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '0.875rem',
      },
    },
    button: {
      fontFamily: localeFont,
      fontWeight: Fonts.MEDIUM,
      textTransform: 'uppercase',
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      fontSize: '1.25rem 1.25rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '1.125rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '1.25rem',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '1.375rem',
      },
    },
    overline: {
      fontFamily: localeFont,
      fontWeight: Fonts.REGULAR,
      textTransform: 'uppercase',
      lineHeight: 2.66,
      letterSpacing: '0.08333em',
      fontSize: '0.75rem 0.75rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '0.625rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '0.75rem',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '0.875rem',
      },
    },
  };

  return customTypography;
}
