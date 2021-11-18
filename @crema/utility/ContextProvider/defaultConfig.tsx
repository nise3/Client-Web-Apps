import {createTheme} from '@mui/material/styles';
import {
  FooterType,
  HeaderType,
  LayoutType,
  NavStyle,
  RouteTransition,
  ThemeMode,
  ThemeStyle,
  ThemeStyleRadius,
} from '../../../shared/constants/AppEnums';
import {Theme} from '@mui/system';

const cardRadius = ThemeStyleRadius.STANDARD;

const theme = createTheme();

// @ts-ignore
const muiThemeConfig: Theme = {
  direction: 'ltr', //ltr, rtl
  palette: {
    mode: ThemeMode.LIGHT,
    background: {
      paper: '#FFFFFF',
      //default: '#F4F7FE',
      default: '#FFF',
    },
    primary: {
      main: '#0A8FDC',
      contrastText: '#fff',
    },
    secondary: {
      main: '#F04F47',
    },
    gray: {
      50: '#fafafa',
      100: '#f7fafc',
      200: '#edf2f7',
      300: '#E0E0E0',
      400: '#c5c6cb',
      500: '#A8A8A8',
      600: '#666666',
      700: '#4a5568',
      800: '#201e21',
      900: '#1a202c',
      A100: '#d5d5d5',
      A200: '#aaaaaa',
      A400: '#303030',
      A700: '#616161',
    },
    text: {
      primary: '#495057',
      secondary: '#74788d',
      disabled: '#909098',
      hint: '#aeafb8',
      white: '#fff',
    },
  },
  typography: {
    fontFamily: ['NotoSerifBangla', 'Poppins', 'sans-serif'].join(','),
  },
  components: {
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
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: cardRadius,
        },
      },
    },
    MuiCardLg: {
      styleOverrides: {
        root: {
          borderRadius:
            cardRadius === ThemeStyleRadius.STANDARD
              ? ThemeStyleRadius.STANDARD
              : ThemeStyleRadius.MODERN + 20,
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
  },
};

const defaultConfig: any = {
  themeStyle: ThemeStyle.STANDARD,
  themeMode: ThemeMode.SEMI_DARK,
  navStyle: NavStyle.STANDARD,
  layoutType: LayoutType.FULL_WIDTH,
  footerType: FooterType.FLUID,
  headerType: HeaderType.LIGHT,
  rtAnim: RouteTransition.SLIDE_DOWN,
  footer: false,
  locale: {
    languageId: 'bangla',
    locale: 'bn',
    name: 'BN',
    icon: 'bd',
  },
  rtlLocale: ['ar'],
};
export default defaultConfig;
