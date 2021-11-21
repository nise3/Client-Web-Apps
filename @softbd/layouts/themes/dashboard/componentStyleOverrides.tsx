import {Theme} from '@mui/system';
import {Components} from '@mui/material/styles/components';
import {ThemeStyleRadius} from '../../../../shared/constants/AppEnums';

const cardRadius = ThemeStyleRadius.STANDARD;

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
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: cardRadius,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: cardRadius,
          boxShadow: '0px 5px 6px rgba(0, 0, 0, 0.04)',
          '& .MuiCardContent-root:last-child': {
            paddingBottom: 16,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: cardRadius,
          boxShadow: '0px 5px 6px rgba(0, 0, 0, 0.04)',
          [theme.breakpoints.down('md')]: {
            paddingTop: '8px !important',
            paddingBottom: '8px !important',
          },
        },
      },
    },
  };

  return overrideRules;
}
