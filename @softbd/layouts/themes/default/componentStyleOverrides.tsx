import {Theme} from '@mui/system';
import {Components} from '@mui/material/styles/components';

export default function componentStyleOverrides(theme: Theme, locale: string) {
  const overrideRules: Components = {
    MuiButton: {},
    MuiFormLabel: {
      styleOverrides: {},
    },
    MuiTextField: {
      styleOverrides: {},
    },
    MuiTypography: {
      styleOverrides: {},
    },
  };

  return overrideRules;
}
