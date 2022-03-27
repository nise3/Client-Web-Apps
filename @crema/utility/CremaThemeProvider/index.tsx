import React, {useContext, useEffect} from 'react';
import {createTheme, ThemeProvider, Theme} from '@mui/material/styles';

import AppContext from '../AppContext';
import AppLocale from '../../../shared/localization';
import {responsiveFontSizes} from '@mui/material';
import {useBreakPointDown} from '../Utils';
import {
  NavStyle,
  ThemeMode,
  ThemeStyle,
} from '../../../shared/constants/AppEnums';
import {
  InitialType,
  TypesType,
  useUrlSearchParams,
} from 'use-url-search-params';
import AppContextPropsType from '../../../redux/types/AppContextPropsType';

//import {InitialType, TypesType} from 'use-url-search-params/dist/typedefs';

declare module '@mui/material/styles' {
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
            theme.components.MuiCard.styleOverrides.root.borderRadius = 20;
            theme.components.MuiToggleButton.styleOverrides.root.borderRadius = 20;
          } else {
            theme.components.MuiCard.styleOverrides.root.borderRadius = 30;
            theme.components.MuiToggleButton.styleOverrides.root.borderRadius = 30;
          }
          theme.components.MuiButton.styleOverrides.root.borderRadius = 30;
        } else {
          theme.components.MuiCard.styleOverrides.root.borderRadius = 4;
          theme.components.MuiToggleButton.styleOverrides.root.borderRadius = 4;
          theme.components.MuiButton.styleOverrides.root.borderRadius = 4;
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

  return (
    <ThemeProvider theme={responsiveFontSizes(createTheme(theme, muiLocale))}>
      {props.children}
    </ThemeProvider>
  );
};

export default React.memo(CremaThemeProvider);
