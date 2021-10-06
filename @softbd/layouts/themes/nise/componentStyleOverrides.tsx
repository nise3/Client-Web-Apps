import {Theme} from '@mui/system';
import {Components} from '@mui/material/styles/components';

export default function componentStyleOverrides(theme: Theme) {
  const overrideRules: Components = {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          textTransform: 'capitalize',
          borderRadius: '4px',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: `10px`,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          color: '#fff',
          padding: '24px',
        },
        title: {
          fontSize: '1.125rem',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: theme.palette.primary.main,
          paddingTop: '10px',
          paddingBottom: '10px',
          '&.Mui-selected': {
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
            },
            '& .MuiListItemIcon-root': {
              color: theme.palette.primary.main,
            },
          },
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            '& .MuiListItemIcon-root': {
              color: theme.palette.primary.main,
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: theme.palette.primary.main,
          minWidth: '36px',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: theme.palette.primary.main,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: theme.palette.primary.main,
          '&::placeholder': {
            color: theme.palette.primary.main,
            fontSize: '0.875rem',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: theme.palette.primary.main,
          borderRadius: `20px`,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
          },
          '&:hover $notchedOutline': {
            borderColor: theme.palette.primary.main,
          },
          '&.MuiInputBase-multiline': {
            padding: 1,
          },
        },
        input: {
          fontWeight: 500,
          background: theme.palette.primary.main,
          padding: '15.5px 14px',
          borderRadius: `20px`,
          '&.MuiInputBase-inputSizeSmall': {
            padding: '10px 14px',
            '&.MuiInputBase-inputAdornedStart': {
              paddingLeft: 0,
            },
          },
        },
        inputAdornedStart: {
          paddingLeft: 4,
        },
        notchedOutline: {
          borderRadius: `20px`,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: theme.palette.primary.main,
          },
        },
        mark: {
          backgroundColor: theme.palette.primary.main,
          width: '4px',
        },
        valueLabel: {
          color: theme.palette.primary.main,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: theme.palette.primary.main,
          opacity: 1,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: theme.palette.primary.main,
          background: theme.palette.primary.main,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-deletable .MuiChip-deleteIcon': {
            color: 'inherit',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: theme.palette.primary.main,
          background: theme.palette.primary.main,
        },
      },
    },
  };

  return overrideRules;
}
