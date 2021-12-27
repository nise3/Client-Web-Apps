import {Theme} from '@mui/system';
import {TypographyOptions} from '@mui/material/styles/createTypography';
import {LocaleTheme} from './Locale';
import {Fonts} from '../../../../shared/constants/AppEnums';

export default function typography(theme: Theme, locale: string) {
  const localeFont = LocaleTheme[locale]?.fontFamily;
  const localeFontSizeMultiplier = LocaleTheme[locale]?.fontSizeMultiplier || 1;
  const customTypography: TypographyOptions = {
    fontFamily: localeFont,
    htmlFontSize: 16,
    fontSize: 14,
    fontWeightLight: Fonts.LIGHT,
    fontWeightRegular: Fonts.REGULAR,
    fontWeightMedium: Fonts.MEDIUM,
    fontWeightBold: Fonts.BOLD,
    h1: {
      fontFamily: localeFont,
      fontWeight: Fonts.LIGHT,
      lineHeight: 1.167,
      letterSpacing: '-0.01562em',
      fontSize: '2.75rem 2.75rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: `2.5rem`,
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: `2.5rem`,
      },
      [theme.breakpoints.up('md')]: {
        fontSize: `2.75rem`,
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: `3rem`,
      },
    },
    h2: {
      fontFamily: localeFont,
      fontWeight: Fonts.LIGHT,
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
      fontSize: '2.25rem 2.25rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: `2rem`,
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: `2rem`,
      },
      [theme.breakpoints.up('md')]: {
        fontSize: `2.25rem`,
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: `2.5rem`,
      },
    },
    h3: {
      fontFamily: localeFont,
      fontWeight: Fonts.REGULAR,
      lineHeight: 1.167,
      letterSpacing: '0em',
      fontSize: '2rem 2rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: `1.75rem`,
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: `1.75rem`,
      },
      [theme.breakpoints.up('md')]: {
        fontSize: `2rem`,
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: `2.25rem`,
      },
    },
    h4: {
      fontFamily: localeFont,
      fontWeight: Fonts.REGULAR,
      lineHeight: 1.235,
      letterSpacing: '0.00735em',
      fontSize: '1.75rem 1.75rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: `${localeFontSizeMultiplier * 1.625}rem`,
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: `${localeFontSizeMultiplier * 1.625}rem`,
      },
      [theme.breakpoints.up('md')]: {
        fontSize: `${localeFontSizeMultiplier * 1.75}rem`,
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: `${localeFontSizeMultiplier * 1.875}rem`,
      },
    },
    h5: {
      fontFamily: localeFont,
      fontWeight: Fonts.REGULAR,
      lineHeight: 1.334,
      letterSpacing: '0em',
      fontSize: '1.5rem 1.5rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: `${localeFontSizeMultiplier * 1.375}rem`,
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: `${localeFontSizeMultiplier * 1.375}rem`,
      },
      [theme.breakpoints.up('md')]: {
        fontSize: `${localeFontSizeMultiplier * 1.5}rem`,
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: `${localeFontSizeMultiplier * 1.625}rem`,
      },
    },
    h6: {
      fontFamily: localeFont,
      fontWeight: Fonts.MEDIUM,
      lineHeight: 1.6,
      letterSpacing: '0.0075em',
      fontSize: '1.25rem 1.25rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: `${localeFontSizeMultiplier * 1.125}rem`,
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: `${localeFontSizeMultiplier * 1.125}rem`,
      },
      [theme.breakpoints.up('md')]: {
        fontSize: `${localeFontSizeMultiplier * 1.25}rem`,
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: `${localeFontSizeMultiplier * 1.375}rem`,
      },
    },
    subtitle1: {
      fontFamily: localeFont,
      fontWeight: Fonts.REGULAR,
      lineHeight: 1.75,
      letterSpacing: '0.00938em',
      fontSize: '1.25rem 1.25rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: `${localeFontSizeMultiplier * 1.125}rem`,
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: `${localeFontSizeMultiplier * 1.125}rem`,
      },
      [theme.breakpoints.up('md')]: {
        fontSize: `${localeFontSizeMultiplier * 1.25}rem`,
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: `${localeFontSizeMultiplier * 1.375}rem`,
      },
    },
    subtitle2: {
      fontFamily: localeFont,
      fontWeight: Fonts.MEDIUM,
      lineHeight: 1.57,
      letterSpacing: '0.00714em',
      fontSize: '1rem 1rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: `${localeFontSizeMultiplier * 0.875}rem`,
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: `${localeFontSizeMultiplier * 0.875}rem`,
      },
      [theme.breakpoints.up('md')]: {
        fontSize: `${localeFontSizeMultiplier * 1}rem`,
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: `${localeFontSizeMultiplier * 1.125}rem`,
      },
    },
    body1: {
      fontFamily: localeFont,
      fontWeight: Fonts.REGULAR,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
      fontSize: '1rem 1rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: `${localeFontSizeMultiplier * 0.875}rem`,
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: `${localeFontSizeMultiplier * 0.875}rem`,
      },
      [theme.breakpoints.up('md')]: {
        fontSize: `${localeFontSizeMultiplier * 1}rem`,
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: `${localeFontSizeMultiplier * 1.125}rem`,
      },
    },
    body2: {
      fontFamily: localeFont,
      fontWeight: Fonts.REGULAR,
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
      fontSize: '0.875rem 0.875rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: `${localeFontSizeMultiplier * 0.75}rem`,
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: `${localeFontSizeMultiplier * 0.75}rem`,
      },
      [theme.breakpoints.up('md')]: {
        fontSize: `${localeFontSizeMultiplier * 0.875}rem`,
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: `${localeFontSizeMultiplier * 1}rem`,
      },
    },
    caption: {
      fontFamily: localeFont,
      fontWeight: Fonts.REGULAR,
      lineHeight: 1.66,
      letterSpacing: '0.03333em',
      fontSize: '0.75rem 0.75rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: `${localeFontSizeMultiplier * 0.625}rem`,
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: `${localeFontSizeMultiplier * 0.625}rem`,
      },
      [theme.breakpoints.up('md')]: {
        fontSize: `${localeFontSizeMultiplier * 0.75}rem`,
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: `${localeFontSizeMultiplier * 0.875}rem`,
      },
    },
    button: {
      fontFamily: localeFont,
      fontWeight: Fonts.MEDIUM,
      textTransform: 'uppercase',
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      fontSize: '1.25rem 1.25rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: `${localeFontSizeMultiplier * 1}rem`,
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: `${localeFontSizeMultiplier * 1}rem`,
      },
      [theme.breakpoints.up('md')]: {
        fontSize: `${localeFontSizeMultiplier * 1}rem`,
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: `${localeFontSizeMultiplier * 1}rem`,
      },
    },
    overline: {
      fontFamily: localeFont,
      fontWeight: Fonts.REGULAR,
      textTransform: 'uppercase',
      lineHeight: 2.66,
      letterSpacing: '0.08333em',
      fontSize: '0.75rem 0.75rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: `${localeFontSizeMultiplier * 0.625}rem`,
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: `${localeFontSizeMultiplier * 0.625}rem`,
      },
      [theme.breakpoints.up('md')]: {
        fontSize: `${localeFontSizeMultiplier * 0.75}rem`,
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: `${localeFontSizeMultiplier * 0.875}rem`,
      },
    },
  };

  return customTypography;
}
