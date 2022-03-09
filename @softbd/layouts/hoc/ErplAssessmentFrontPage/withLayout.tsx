import React from 'react';
import ErplDefaultLayout from '../../frontEnd/ErplDefaultLayout';
import {responsiveFontSizes, useTheme} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';
import theme from '../../themes/instituteDefault';

const withLayout = (ComposedComponent: any) => (props: any) => {
  const defaultTheme = useTheme();
  return (
    <ThemeProvider theme={responsiveFontSizes(theme(defaultTheme))}>
      <ErplDefaultLayout>
        <ComposedComponent {...props} />
      </ErplDefaultLayout>
    </ThemeProvider>
  );
};
export default withLayout;
