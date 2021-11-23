export enum ThemeStyle {
  MODERN = 'modern',
  STANDARD = 'standard',
}

export enum ThemeStyleRadius {
  MODERN = 30,
  STANDARD = 4,
}

export enum ThemeMode {
  LIGHT = 'light',
  SEMI_DARK = 'semi-dark',
  DARK = 'dark',
}

export enum LayoutType {
  FULL_WIDTH = 'full-width',
  BOXED = 'boxed',
}

export enum NavStyle {
  DEFAULT = 'default',
  MINI = 'mini',
  MINI_SIDEBAR_TOGGLE = 'mini-sidebar-toggle',
  STANDARD = 'standard',
  HEADER_USER = 'user-header',
  HEADER_USER_MINI = 'user-mini-header',
  DRAWER = 'drawer',
  BIT_BUCKET = 'bit-bucket',
  H_DEFAULT = 'h-default',
  HOR_LIGHT_NAV = 'hor-light-nav',
  HOR_DARK_LAYOUT = 'hor-dark-layout',
}

export enum FooterType {
  FIXED = 'fixed',
  FLUID = 'fluid',
}

export enum HeaderType {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum RouteTransition {
  NONE = 'none',
  FADE = 'fade',
  SLIDE_LEFT = 'slideLeft',
  SLIDE_RIGHT = 'slideRight',
  SLIDE_UP = 'slideUp',
  SLIDE_DOWN = 'slideDown',
}

export enum Fonts {
  LIGHT = 300,
  REGULAR = 400,
  MEDIUM = 500,
  BOLD = 700,
  EXTRA_BOLD = 900,
}

export enum AuthType {
  /**
   * @deprecated
   */
  FIREBASE = 'firebase',
  /**
   * @deprecated
   */
  AWS_COGNITO = 'aws_cognito',
  /**
   * @deprecated
   */
  AUTH0 = 'auth0',
  /**
   * @deprecated
   */
  JWT_AUTH = 'jwt_auth',
  AUTH2 = 'auth2.0',
}
