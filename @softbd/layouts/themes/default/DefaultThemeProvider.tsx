import {ThemeProvider} from '@mui/material';
import AppContextPropsType from '../../../../redux/types/AppContextPropsType';
import AppLocale from '../../../../shared/localization';
import AppContext from '../../../../@crema/utility/AppContext';
import React, {ReactNode, useContext} from 'react';
import theme from './index';
import {Global, css} from '@emotion/react';
import {LocaleTheme} from './Locale';
interface DefaultThemeProviderProps {
  children: ReactNode | any;
  [x: string]: any;
}

const DefaultThemeProvider: React.FC<DefaultThemeProviderProps> = ({
  children,
}) => {
  const {locale} = useContext<AppContextPropsType>(AppContext);
  const currentAppLocale = AppLocale[locale.locale];

  return (
    <ThemeProvider theme={theme(currentAppLocale.locale)}>
      <Global
        styles={css`
          html {
            scroll-behavior: smooth;
          }
          @media (prefers-reduced-motion: reduce) {
            html {
              scroll-behavior: auto;
            }
          }
          [class*='MuiTypography'],
          * {
            font-family: ${LocaleTheme[currentAppLocale.locale]?.fontFamily};
          }
          body {
            margin: 0;
          }
          body,
          div {
            box-sizing: border-box;
          }
          a {
            text-decoration: none;
            color: inherit;
          }
        `}
      />
      {children}
    </ThemeProvider>
  );
};

export default DefaultThemeProvider;
