import {Theme} from '@mui/system';
import {Components} from '@mui/material/styles/components';
import {ThemeMode} from '../../../../shared/constants/AppEnums';

export default function componentStyleOverrides(theme: Theme, locale: string) {
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
    MuiInputBase: {
      styleOverrides: {
        root: {
          background:
            theme.palette.mode === ThemeMode.LIGHT
              ? theme.palette.grey['50']
              : theme.palette.grey['900'],
        },
      },
    },
  };

  return overrideRules;
}
