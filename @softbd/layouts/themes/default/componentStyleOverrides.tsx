import {Theme} from '@mui/system';
import {Components} from '@mui/material/styles/components';

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
  };

  return overrideRules;
}
