import {
  FooterType,
  HeaderType,
  LayoutType,
  NavStyle,
  RouteTransition,
  ThemeMode,
  ThemeStyle,
} from '../../../shared/constants/AppEnums';

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
