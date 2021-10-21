import {Theme} from '@mui/system';
import {TypographyOptions} from '@mui/material/styles/createTypography';

export default function typography(theme: Theme) {
  const customTypography: TypographyOptions = {
    fontFamily: ['NotoSerifBangla', 'Poppins', 'sans-serif'].join(','),
    subtitle1: {
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
    },
  };

  return customTypography;
}
