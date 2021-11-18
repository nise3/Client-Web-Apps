import React from 'react';
import NiseLayout from '../../frontEnd/NiseLayout';
import {responsiveFontSizes, useTheme} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';
import theme from '../../themes/nise';

const withLayout = (ComposedComponent: any) => (props: any) => {
  const defaultTheme = useTheme();
  return (
    <ThemeProvider theme={responsiveFontSizes(theme(defaultTheme))}>
      <NiseLayout>
        <ComposedComponent {...props} />
      </NiseLayout>
    </ThemeProvider>
  );
};
export default withLayout;
