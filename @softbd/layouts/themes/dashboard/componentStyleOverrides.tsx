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
    MuiChip: {
      styleOverrides: {
        root: {
          borderColor: 'transparent',
          padding: '0 !important',
        },
        icon: {
          fontSize: '1rem',
        },
        label: {
          fontSize: '1rem',
        },
      },
    },
  };

  return overrideRules;
}
