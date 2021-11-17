import {Theme} from '@mui/system';
import {Components} from '@mui/material/styles/components';
import {ThemeMode} from '../../../../shared/constants/AppEnums';

export default function componentStyleOverrides(theme: Theme) {
  const overrideRules: Components = {
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
          color:
            theme.palette.mode === ThemeMode.DARK
              ? theme.palette.grey['50']
              : theme.palette.grey['700'],
        },
      },
    },
  };

  return overrideRules;
}
