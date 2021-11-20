import {Theme} from '@mui/system';
import {Components} from '@mui/material/styles/components';

export default function componentStyleOverrides(theme: Theme) {
  const overrideRules: Components = {
    MuiDialog: {
      styleOverrides: {
        root: {
          padding: '0px !important',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: '#db3131',
          '&$error': {
            color: '#db3131',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          background: theme.palette.grey['50'],
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: ['NotoSerifBangla', 'Poppins', 'sans-serif'].join(','),
        },
        h1: {
          fontSize: 22,
        },
        h2: {
          fontSize: 20,
        },
        h3: {
          fontSize: 18,
        },
        h4: {
          fontSize: 16,
        },
        h5: {
          fontSize: 14,
        },
        h6: {
          fontSize: 14,
        },
        subtitle1: {
          fontSize: 14,
        },
        subtitle2: {
          fontSize: 16,
        },
        body1: {
          fontSize: 14,
        },
        body2: {
          fontSize: 12,
        },
      },
    },
  };

  return overrideRules;
}
