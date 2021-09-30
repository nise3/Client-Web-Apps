import React, {useContext, useEffect} from 'react';
import {createTheme, StyledEngineProvider, Theme} from '@mui/material/styles';

import AppContext from '../AppContext';
import AppLocale from '../../../shared/localization';
import {responsiveFontSizes} from '@mui/material';
import {useBreakPointDown} from '../Utils';
import {
  NavStyle,
  ThemeMode,
  ThemeStyle,
} from '../../../shared/constants/AppEnums';
import {useUrlSearchParams} from 'use-url-search-params';
import AppContextPropsType from '../../../types/AppContextPropsType';
import ThemeProvider from '@mui/styles/ThemeProvider';

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

const CremaThemeProvider: React.FC<React.ReactNode> = (props) => {
  const {
    theme,
    locale,
    updateThemeMode,
    changeNavStyle,
    updateThemeStyle,
    updateTheme,
  } = useContext<AppContextPropsType>(AppContext);
  const {muiLocale} = AppLocale[locale.locale];
  const isBelowMd = useBreakPointDown('md');

  const initailValue: InitialType = {};
  const types: TypesType = {};
  const [params] = useUrlSearchParams(initailValue, types);

  useEffect(() => {
    const updateQuerySetting = () => {
      if (params.theme_mode) {
        updateThemeMode!(params.theme_mode as ThemeMode);
      }
    };
    updateQuerySetting();
  }, [params.theme_mode, updateThemeMode]);

  useEffect(() => {
    const updateQuerySetting = () => {
      if (params.nav_style) {
        changeNavStyle?.(params.nav_style as NavStyle);
      }
    };
    updateQuerySetting();
  }, [changeNavStyle, params.nav_style]);

  useEffect(() => {
    const updateQuerySetting = () => {
      if (params.theme_style) {
        if (params.theme_style === ThemeStyle.MODERN) {
          if (isBelowMd) {
            theme.overrides.MuiCard.root.borderRadius = 20;
            theme.overrides.MuiToggleButton.root.borderRadius = 20;
          } else {
            theme.overrides.MuiCard.root.borderRadius = 30;
            theme.overrides.MuiToggleButton.root.borderRadius = 30;
          }
          theme.overrides.MuiButton.root.borderRadius = 30;
          theme.overrides.MuiCardLg.root.borderRadius = 50;
        } else {
          theme.overrides.MuiCard.root.borderRadius = 4;
          theme.overrides.MuiToggleButton.root.borderRadius = 4;
          theme.overrides.MuiButton.root.borderRadius = 4;
          theme.overrides.MuiCardLg.root.borderRadius = 4;
        }
        updateTheme?.(theme);
        if (
          params.theme_style === ThemeStyle.MODERN ||
          params.theme_style === ThemeStyle.STANDARD
        ) {
          updateThemeStyle?.(params.theme_style as ThemeStyle);
        }
      }
    };
    updateQuerySetting();
  }, [params.theme_style, theme, isBelowMd, updateTheme, updateThemeStyle]);

  /* Inject emotion before JSS */
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={responsiveFontSizes(createTheme(theme, muiLocale))}>
        {props.children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default React.memo(CremaThemeProvider);
