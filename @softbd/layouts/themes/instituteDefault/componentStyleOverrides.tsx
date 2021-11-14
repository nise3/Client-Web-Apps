import {Theme} from '@mui/system';
import {Components} from '@mui/material/styles/components';

export default function componentStyleOverrides(theme: Theme) {
  const overrideRules: Components = {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: ['NotoSerifBangla', 'Poppins', 'sans-serif'].join(','),
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
  };

  return overrideRules;
}
